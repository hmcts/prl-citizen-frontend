import autobind from 'autobind-decorator';
import { Response } from 'express';
import _ from 'lodash';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { CaseWithId } from '../../../app/case/case';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormError, FormFields } from '../../../app/form/Form';
import { getMOJForkingScreenUrl } from '../../../steps/urls';

@autobind
export default class C100ChildPostCodePostController extends PostController<AnyObject> {
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

    try {
      const formData = this.parseAndValidateForm(req);

      if (req.session.errors?.length) {
        return this.redirect(req, res);
      }

      const court = await client.findCourtByPostCodeViaCosApi(formData.c100RebuildChildPostCode as string, user);
      if (!court?.epimmsId?.trim() || typeof court.onboarded !== 'boolean') {
        req.session.errors = this.handleError(req.session.errors, 'invalid');
        return this.redirect(req, res);
      }

      req.locals.logger.info(
        `C100 court onboarding decision: epimmsId=${court.epimmsId}, ` +
          `courtName=${JSON.stringify(court.courtName)}, onboarded=${court.onboarded}`
      );

      if (court.onboarded) {
        await this.ensureCaseExists(req, client);
        return this.redirect(req, res);
      }

      this.signoutAndRedirectToMOJ(req, res);
    } catch (error) {
      client.logError(error);
      req.session.errors = this.handleError(
        req.session.errors,
        error?.response?.status === 404 ? 'invalid' : 'generic'
      );
      this.redirect(req, res);
    }
  }

  private parseAndValidateForm(req: AppRequest): Record<string, unknown> {
    const form = new Form(this.fields as FormFields);
    const { _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.userCase = {
      ...req.session.userCase,
      c100RebuildChildPostCode: formData.c100RebuildChildPostCode,
    };
    req.session.errors = form.getErrors(formData);

    return formData;
  }

  private async ensureCaseExists(req: AppRequest, client: CosApiClient): Promise<void> {
    if (!req.session?.userCase?.caseId) {
      await this.createCaseAndSaveDataInSession(req, client);
    }
  }
}
