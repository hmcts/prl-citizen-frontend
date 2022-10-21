import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { getAddressesFromPostcode } from '../../../../../app/postcode/postcode-lookup-api';
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../../../../../app/case/case';

@autobind
export default class AddressLookupPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const postcode = req.body[`${FieldPrefix.APPLICANT}AddressPostcode`] as string;

    let addresses;

    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    Object.assign(req.session.userCase, formData);

    if (req.session.errors.length === 0) {
      addresses = await getAddressesFromPostcode(postcode, req.locals.logger);
    }
    req.session.addresses = addresses;

    this.redirect(req, res);
  }
}
