import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormError, FormFields } from '../../../../app/form/Form';
import { mapDataInSession } from '../../../../steps/tasklistresponse/utils';

@autobind
export default class LinkCaseToAccountPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields) {
    super(fields);
  }

  private removeErrors = (req: AppRequest): FormError[] => {
    return req.session.errors?.length
      ? req.session.errors.filter(error => !['caseCode', 'accessCode'].includes(error.propertyName))
      : [];
  };

  private handleError(errorType: string, propertyName: string, req: AppRequest): FormError[] {
    const _errors: FormError[] = req.session.errors?.length ? req.session.errors : [];

    return [..._errors, { errorType, propertyName }];
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const client = new CosApiClient(req.session.user.accessToken, req.locals.logger);

    try {
      const form = new Form(this.fields);
      const { _csrf, ...formData } = form.getParsedBody(req.body);

      req.session.errors = this.removeErrors(req);

      req.session.userCase = {
        ...req.session.userCase,
        caseCode: formData.caseCode,
        accessCode: formData.accessCode,
      };
      req.session.errors = [...req.session.errors, ...form.getErrors(formData)];

      if (req.session.errors.length) {
        return this.redirect(req, res);
      }

      const accessCode = await client.validateAccessCode(
        formData.caseCode as string,
        formData.accessCode as string,
        req.session.user
      );

      if (accessCode === 'Linked' || accessCode === 'Invalid') {
        if (accessCode === 'Linked') {
          req.session.errors = this.handleError('accesscodeAlreadyLinked', 'accessCode', req);
        } else {
          req.session.errors = this.handleError('invalidCaseCode', 'caseCode', req);
          req.session.errors = this.handleError('invalidAccessCode', 'accessCode', req);
        }
        return this.redirect(req, res);
      }

      const { caseData, hearingData } = await client.linkCaseToCitizen(
        formData.caseCode as string,
        formData.accessCode as string
      );

      req.session.userCase = {
        ...caseData,
        hearingCollection: hearingData?.caseHearings ?? [],
      };
      mapDataInSession(req.session.userCase, req.session.user.id);
      this.redirect(req, res);
    } catch (error) {
      client.logError(error);
      req.session.errors = this.handleError('invalidCaseCode', 'caseCode', req);
      req.session.errors = this.handleError('invalidAccessCode', 'accessCode', req);
      this.redirect(req, res);
    }
  }
}
