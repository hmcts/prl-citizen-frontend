import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { C100_SCREENING_QUESTIONS_LEGAL_REPRESENTATION_APPLICATION, DASHBOARD_URL } from '../../../urls';

@autobind
export default class postController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  /**
   * Invoke delete to delete the case created as applicant choose to continue with solicitor
   * @param req
   * @param res
   */
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    try {
      console.log(req.body);
      if (req.body.goBack) {
        return res.redirect(C100_SCREENING_QUESTIONS_LEGAL_REPRESENTATION_APPLICATION);
      } else {
        await req.locals.C100Api.deleteCase(req.session.userCase, req.session);
        return res.redirect(DASHBOARD_URL);
      }
    } catch (e) {
      return res.redirect(DASHBOARD_URL);
    }
  }
}
