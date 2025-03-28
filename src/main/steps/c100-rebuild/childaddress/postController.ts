import autobind from 'autobind-decorator';
import config from 'config';
import { Response } from 'express';
import _ from 'lodash';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { CaseWithId } from '../../../app/case/case';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormError, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { getMOJForkingScreenUrl } from '../../../steps/urls';

@autobind
export default class C100ChildPostCodePostController extends PostController<AnyObject> {
  private readonly allowedCourts: string | string[];

  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
    this.allowedCourts = config.get('allowedCourts') ?? [];

    if (this.allowedCourts && !_.isArray(this.allowedCourts)) {
      this.allowedCourts = this.allowedCourts.split(',');
    }
  }

  private signoutAndRedirectToMOJ(req: AppRequest, res: Response): void {
    const isNonProd = _.get(req.session, 'testingSupport', false);
    req.session.destroy(() => res.redirect(getMOJForkingScreenUrl(isNonProd)));
  }

  private handleError(errors: FormError[] | undefined, errorType: string) {
    return _.isArray(errors)
      ? [
          ...errors,
          {
            propertyName: 'c100RebuildChildPostCode',
            errorType,
          },
        ]
      : [];
  }

  private async createCaseAndSaveDataInSession(req: AppRequest, client: CosApiClient): Promise<void> {
    try {
      const {
        id: caseId,
        caseTypeOfApplication,
        state,
        noOfDaysRemainingToSubmitCase,
        c100RebuildChildPostCode,
      } = await req.locals.C100Api.createCase(req);

      req.session.userCaseList = [];
      req.session.userCase = {
        caseId,
        caseTypeOfApplication,
        state,
        noOfDaysRemainingToSubmitCase,
        c100RebuildChildPostCode,
      } as CaseWithId;
    } catch (error) {
      client.logError(error);
      throw error;
    }
  }
  public async post(req: AppRequest, res: Response): Promise<void> {
    const { user } = req.session;
    const client = new CosApiClient(user.accessToken, req.locals.logger);
    let courtNames: string[] = [];

    try {
      const form = new Form(this.fields as FormFields);
      const { _csrf, ...formData } = form.getParsedBody(req.body);

      req.session.userCase = {
        ...req.session.userCase,
        c100RebuildChildPostCode: formData.c100RebuildChildPostCode,
      };
      req.session.errors = form.getErrors(formData);

      if (req.session.errors.length) {
        return this.redirect(req, res);
      }

      if (_.isArray(this.allowedCourts) && !this.allowedCourts.includes('*')) {
        const courtDetails = await client.findCourtByPostCodeAndService(formData.c100RebuildChildPostCode!);

        if (courtDetails?.message) {
          req.session.errors = this.handleError(req.session.errors, 'invalid');
          return this.redirect(req, res);
        }

        courtNames = courtDetails?.courts?.length ? _.map(courtDetails.courts, 'name') : [];
      }

      if (
        _.isArray(this.allowedCourts) &&
        (this.allowedCourts.includes('*') ||
          (courtNames.length && this.allowedCourts.some(court => courtNames.includes(court))))
      ) {
        if (!req.session?.userCase?.caseId) {
          await this.createCaseAndSaveDataInSession(req, client);
        }

        return this.redirect(req, res);
      }

      this.signoutAndRedirectToMOJ(req, res);
    } catch (error) {
      client.logError(error);
      req.session.errors = this.handleError(req.session.errors, 'generic');
      this.redirect(req, res);
    }
  }
}
