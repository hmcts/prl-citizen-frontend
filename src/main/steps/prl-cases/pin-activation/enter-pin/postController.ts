import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getSystemUser } from '../../../../app/auth/user/oidc';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { CaseWithId } from '../../../../app/case/case';
import { State } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { PIN_ACTIVATION_CASE_ACTIVATED_URL } from '../../../../steps/urls';

@autobind
export default class PinActivationPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase, req) : this.fields;
    const form = new Form(fields);
    const formData = form.getParsedBody(req.body);
    req.session.errors = form.getErrors(formData);

    try {
      if (!req.session.errors.length) {
        await this.checkAccessCode(req, formData);
        if (!req.session.errors.length) {
          const client = new CosApiClient(req.session.user.accessToken, req.locals.logger);
          if (req.session.userCase.caseCode && req.session.userCase.accessCode) {
            const caseReference = req.session.userCase.caseCode;
            const accessCode = req.session.userCase.accessCode;

            const linkCaseToCitizenData = await client.linkCaseToCitizen(caseReference, accessCode);
            req.session.userCase = linkCaseToCitizenData.data;
            req.session.save(() => {
              res.redirect(PIN_ACTIVATION_CASE_ACTIVATED_URL);
            });
          }
        } else {
          this.redirect(req, res);
        }
      } else {
        this.redirect(req, res);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  private async checkAccessCode(req: AppRequest, formData: Partial<CaseWithId>): Promise<void> {
    const caseworkerUser = await getSystemUser();
    const caseReference = formData.caseCode?.replace(/-/g, '');
    const accessCode = formData.accessCode?.replace(/-/g, '');

    try {
      const client = new CosApiClient(caseworkerUser.accessToken, req.locals.logger);
      const accessCodeValidated = await client.validateAccessCode(
        caseReference as string,
        accessCode as string,
        caseworkerUser
      );
      if (accessCodeValidated === 'Linked') {
        req.session.errors?.push({ errorType: 'accesscodeAlreadyLinked', propertyName: 'accessCode' });
      } else if (accessCodeValidated !== 'Valid') {
        req.session.errors?.push(
          { errorType: 'invalidCaseCode', propertyName: 'caseCode' },
          { errorType: 'invalidAccessCode', propertyName: 'accessCode' }
        );
      }
    } catch (err) {
      req.locals.logger.error('Retrieving case failed with error: ' + err);
      req.session.errors?.push(
        { errorType: 'invalidCaseCode', propertyName: 'caseCode' },
        { errorType: 'invalidAccessCode', propertyName: 'accessCode' }
      );
    }

    if (!req.session.errors?.length) {
      if (req?.session?.userCase) {
        Object.assign(req?.session?.userCase, formData);
      } else {
        const initData = {
          id: caseReference as string,
          state: State.successAuthentication,
          serviceType: '',
          ...formData,
        };
        req.session.userCase = initData;
      }
    }
  }
}
