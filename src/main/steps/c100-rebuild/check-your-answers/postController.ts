import autobind from 'autobind-decorator';
import config from 'config';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../app/form/Form';
import PCQGetController from '../../../steps/common/equality/get';
import { C100_CHECK_YOUR_ANSWER, C100_CHECK_YOUR_ANSWER_REDIRECT } from '../../../steps/urls';

@autobind
export default class PayAndSubmitPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    if (req.body.saveAndComeLater) {
      this.saveAndComeLater(req, res, req.session.userCase);
    } else {
      const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase, req) : this.fields;
      const form = new Form(fields);
      const { ...formData } = form.getParsedBody(req.body);
      req.session.errors = form.getErrors(formData);
      if (req.session.errors && req.session.errors.length) {
        return super.redirect(req, res, C100_CHECK_YOUR_ANSWER);
      }
      /** Invoke Pcq questionnaire
       * */
      const protocol = req.app.locals.developmentMode ? 'http://' : '';
      const port = req.app.locals.developmentMode ? `:${config.get('port')}` : '';
      const returnUrl = `${protocol}${res.locals.host}${port}${C100_CHECK_YOUR_ANSWER_REDIRECT}`;
      new PCQGetController().get(req, res, returnUrl);
    }
  }
}
