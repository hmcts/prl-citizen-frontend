import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { saveAndRedirectContactDetailsAndPreference } from '../../confirm-contact-details/checkanswers/ConfirmContactDetailsPostController';

@autobind
export default class ReviewContactPreferencePostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase, req) : this.fields;
    const form = new Form(fields);
    const { _csrf, ...formData } = form.getParsedBody(req.body);
    Object.assign(req.session.userCase, formData);
    req.session.applicationSettings = { ...req.session.applicationSettings, navFromContactPreferences: true };
    try {
      await saveAndRedirectContactDetailsAndPreference(req, res);
    } catch (error) {
      throw new Error('ReviewContactPreferencePostController - error when saving contact preferences and redirecting');
    }
  }
}
