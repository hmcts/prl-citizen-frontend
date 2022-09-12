import autobind from 'autobind-decorator';
import { Response } from 'express';

import { YesOrNo } from '../../../../app/case/definition';
//import { FieldPrefix } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { LEGAL_REPRESENTATION_SOLICITOR_DIRECT, LEGAL_REPRESENTATION_SOLICITOR_NOT_DIRECT } from '../../../urls';

@autobind
export default class LegalRepresentationPostControllerBase extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    //const postcode = req.body[`${this.fieldPrefix}AddressPostcode`] as string; , protected readonly fieldPrefix: FieldPrefix
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);
    console.log('form : ' + JSON.stringify(form));
    console.log('fields : ' + JSON.stringify(fields));
    console.log('form Data : ' + JSON.stringify(formData));
    if (formData.legalrepresentation) {
      req.session.userCase.legalrepresentation = formData.legalrepresentation;
      let returnUrl = LEGAL_REPRESENTATION_SOLICITOR_NOT_DIRECT;
      console.log('1' + returnUrl);
      console.log('1' + formData.legalrepresentation);

      if (formData.legalrepresentation === YesOrNo.YES) {
        console.log('2' + returnUrl);

        returnUrl = LEGAL_REPRESENTATION_SOLICITOR_DIRECT;
      }
      console.log('3' + returnUrl);
      res.redirect(returnUrl);
    }
    req.session.errors = [];
    this.redirect(req, res);
  }
}
