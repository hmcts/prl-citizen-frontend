import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../case/case';
import { AppRequest } from '../controller/AppRequest';
import { AnyObject, PostController } from '../controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../form/Form';

@autobind
export default class SelectAddressPostControllerBase extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn, protected readonly fieldPrefix: FieldPrefix) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    Object.assign(req.session.userCase, formData);

<<<<<<< HEAD
    const selectedAddressIndex = Number(formData['citizenUserSelectAddress']);
    if (selectedAddressIndex >= 0) {
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      const selectedAddress = req.session.addresses[selectedAddressIndex] as any;

      req.session.userCase.citizenUserAddress1 = selectedAddress.street1;
      req.session.userCase.citizenUserAddress2 = selectedAddress.street2;
      req.session.userCase.citizenUserAddressTown = selectedAddress.town;
      req.session.userCase.citizenUserAddressCounty = selectedAddress.county;
      req.session.userCase.citizenUserAddressPostcode = selectedAddress.postcode;
=======
    if (req.session.errors.length === 0) {
      const selectedAddressIndex = Number(formData[`${this.fieldPrefix}SelectAddress`]);
      if (selectedAddressIndex >= 0) {
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        const selectedAddress = req.session.addresses[selectedAddressIndex] as any;

        req.session.userCase[`${this.fieldPrefix}Address1`] = selectedAddress.street1;
        req.session.userCase[`${this.fieldPrefix}Address2`] = selectedAddress.street2;
        req.session.userCase[`${this.fieldPrefix}AddressTown`] = selectedAddress.town;
        req.session.userCase[`${this.fieldPrefix}AddressCounty`] = selectedAddress.county;
        req.session.userCase[`${this.fieldPrefix}AddressPostcode`] = selectedAddress.postcode;

        formData[`${this.fieldPrefix}Address1`] = selectedAddress.street1;
        formData[`${this.fieldPrefix}Address2`] = selectedAddress.street2;
        formData[`${this.fieldPrefix}AddressTown`] = selectedAddress.town;
        formData[`${this.fieldPrefix}AddressCounty`] = selectedAddress.county;
        formData[`${this.fieldPrefix}AddressPostcode`] = selectedAddress.postcode;
      }
>>>>>>> 8ad9db31f60b12982b5ee2662499becf9de2655f
    }

    this.redirect(req, res);
  }
}
