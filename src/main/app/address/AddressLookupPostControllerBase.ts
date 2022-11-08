import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../../app/case/case';
import { APPLICANT_ADDRESS_LOOKUP, RESPONDENT_ADDRESS_LOOKUP } from '../../steps/urls';
import { AppRequest } from '../controller/AppRequest';
import { AnyObject, PostController } from '../controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../form/Form';
import { getAddressesFromPostcode } from '../postcode/postcode-lookup-api';

@autobind
export default class AddressLookupPostControllerBase extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn, protected readonly fieldPrefix: FieldPrefix) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const postcode = req.body['citizenUserAddressPostcode'] as string;

    let addresses;

    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    Object.assign(req.session.userCase, formData);

    const redirectUrl = this.setRedirectUrl();

    if (!req.body.citizenUserAddressPostcode) {
      req.session.errors = [];
      req.session.errors?.push({
        propertyName: 'citizenUserAddressPostcode',
        errorType: 'required',
      });
      req.session.save(() => res.redirect(redirectUrl));
    } else if (!(req.body.citizenUserAddressPostcode as string).match(/^[A-Z]{1,2}\d[A-Z0-9]? ?\d[A-Z]{2}$/i)) {
      req.session.errors = [];
      req.session.errors?.push({
        propertyName: 'citizenUserAddressPostcode',
        errorType: 'invalid',
      });
      req.session.save(() => res.redirect(redirectUrl));
    } else {
      req.session.errors = [];
      if (postcode) {
        addresses = await getAddressesFromPostcode(postcode, req.locals.logger);
      }
      req.session.addresses = addresses;

      this.redirect(req, res);
    }
  }

  private setRedirectUrl() {
    let redirectUrl;
    if (this.fieldPrefix === FieldPrefix.RESPONDENT) {
      redirectUrl = RESPONDENT_ADDRESS_LOOKUP;
    } else {
      redirectUrl = APPLICANT_ADDRESS_LOOKUP;
    }
    return redirectUrl;
  }
}
