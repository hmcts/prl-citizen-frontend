import autobind from 'autobind-decorator';
import config from 'config';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import PCQGetController from '../../common/equality/get';
import { RESPONDENT_TO_APPLICATION_SUMMARY_REDIRECT } from '../../urls';

@autobind
export default class ResponseSummaryConfirmationPcqPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest, res: Response): Promise<void> {
    const protocol = req.app.locals.developmentMode ? 'http://' : '';
    const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';
    const returnUrl = `${protocol}${res.locals.host}${port}${RESPONDENT_TO_APPLICATION_SUMMARY_REDIRECT}`;
    new PCQGetController().get(req, res, returnUrl);
    req.session.save(() => res.redirect(RESPONDENT_TO_APPLICATION_SUMMARY_REDIRECT));
  }
}
