import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CaseWithId } from '../../../app/case/case';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormError, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { CosApiClient } from '../../../app/case/CosApiClient';
import _ from 'lodash';
import { getMOJForkingScreenUrl } from '../../../steps/urls';

@autobind
export default class C100ChildPostCodePostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  private signoutAndRedirectToMOJ(req: AppRequest, res: Response): void {
    req.session.destroy(() =>
      res.redirect(getMOJForkingScreenUrl(_.get(req.session, 'userCase.testingSupport', false)))
    );
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

  public async post(req: AppRequest, res: Response): Promise<void> {
    const { user } = req.session;
    const client = new CosApiClient(user.accessToken, req.locals.logger);
    const allowedCourts = ['swansea-civil-justice-centre', 'southampton-combined-court-centre'];
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

      if (!allowedCourts.includes('*')) {
        const courtDetails = await client.findCourtByPostCodeAndService(formData.c100RebuildChildPostCode!);
        if (courtDetails?.message) {
          req.session.errors = this.handleError(req.session.errors, 'invalid');
          return this.redirect(req, res);
        }
        courtNames = courtDetails?.courts?.length ? _.map(courtDetails.courts, 'slug') : [];
      }

      if (
        allowedCourts.includes('*') ||
        (courtNames.length && allowedCourts.some(court => courtNames.includes(court)))
      ) {
        const {
          id: caseId,
          caseTypeOfApplication,
          state,
          noOfDaysRemainingToSubmitCase,
        } = await req.locals.C100Api.createCase();

        req.session.userCaseList = [];
        req.session.userCase = {
          caseId,
          caseTypeOfApplication,
          state,
          noOfDaysRemainingToSubmitCase,
        } as CaseWithId;

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
