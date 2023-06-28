/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../app/form/Form';

@autobind
export default class StatementOfServicePostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    console.log(req);
    console.log(res);

    //const form = new Form(req.body);
    //const { onlycontinue, saveAndComeLater, ...formFields } = req.body;
    // const { _csrf, ...formData } = form.getParsedBody(formFields);

    // if (onlycontinue) {
    //   req.session.errors = form.getErrors(formData);
    //   return super.redirect(req, res);
    // } else if (saveAndComeLater) {
    //   super.saveAndComeLater(req, res, { cd_children: req.session.userCase.cd_children });
    // }
  }
}
