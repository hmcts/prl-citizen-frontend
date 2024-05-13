import autobind from 'autobind-decorator';
import config from 'config';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../app/form/Form';
import PCQGetController from '../../common/equality/get';
import { RESPONDENT_TO_APPLICATION_SUMMARY_REDIRECT } from '../../urls';

@autobind
export default class ResponseSummaryConfirmationPcqPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase, req) : this.fields;
    const form = new Form(fields);
    const { _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.userCase = {
      ...req.session.userCase,
      declarationCheck: formData.declarationCheck,
    };
    req.session.errors = form.getErrors(formData);

    if (req.session.errors.length) {
      return this.redirect(req, res);
    }
    const protocol = req.app.locals.developmentMode ? 'http://' : '';
    const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';
    const returnUrl = `${protocol}${res.locals.host}${port}${RESPONDENT_TO_APPLICATION_SUMMARY_REDIRECT}`;
    new PCQGetController().get(req, res, returnUrl);
  }
}
