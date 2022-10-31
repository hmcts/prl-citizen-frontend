import autobind from 'autobind-decorator';
import { Response } from 'express';

import { APPLICANT_MANUAL_ADDRESS, RESPONDENT_ADDRESS_MANUAL } from '../../steps/urls';
import { FieldPrefix } from '../case/case';
import { AppRequest } from '../controller/AppRequest';
import { AnyObject, PostController } from '../controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../form/Form';

@autobind
export default class ManualAddressPostControllerBase extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn, protected readonly fieldPrefix: FieldPrefix) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    const redirectUrl = this.setRedirectUrl();

    req.session.userCase.citizenUserManualAddress1 = formData['citizenUserManualAddress1'];
    req.session.userCase.citizenUserManualAddress2 = formData['citizenUserManualAddress2'];
    req.session.userCase.citizenUserManualAddressTown = formData['citizenUserManualAddressTown'];
    req.session.userCase.citizenUserManualAddressCounty = formData['citizenUserManualAddressCounty'];
    req.session.userCase.citizenUserManualAddressPostcode = formData['citizenUserManualAddressPostcode'];

    const errorOnPage = validateFields(req);

    if (!errorOnPage) {
      req.session.errors = [];
      req.session.userCase.citizenUserAddress1 = req.session.userCase.citizenUserManualAddress1;
      req.session.userCase.citizenUserAddress2 = req.session.userCase.citizenUserManualAddress2;
      req.session.userCase.citizenUserAddressTown = req.session.userCase.citizenUserManualAddressTown;
      req.session.userCase.citizenUserAddressCounty = req.session.userCase.citizenUserManualAddressCounty;
      req.session.userCase.citizenUserAddressPostcode = req.session.userCase.citizenUserManualAddressPostcode;

      req.session.userCase.citizenUserManualAddress1 = '';
      req.session.userCase.citizenUserManualAddress2 = '';
      req.session.userCase.citizenUserManualAddressTown = '';
      req.session.userCase.citizenUserManualAddressCounty = '';
      req.session.userCase.citizenUserManualAddressPostcode = '';

      this.redirect(req, res);
    } else {
      req.session.save(() => res.redirect(redirectUrl));
    }
  }

  private setRedirectUrl() {
    let redirectUrl;
    if (this.fieldPrefix === FieldPrefix.RESPONDENT) {
      redirectUrl = RESPONDENT_ADDRESS_MANUAL;
    } else {
      redirectUrl = APPLICANT_MANUAL_ADDRESS;
    }
    return redirectUrl;
  }
}
function validateFields(req: AppRequest<AnyObject>) {
  let errorOnPage = false;
  req.session.errors = [];
  if (!req.body.citizenUserManualAddress1) {
    req.session.errors?.push({
      propertyName: 'citizenUserManualAddress1',
      errorType: 'required',
    });
    errorOnPage = true;
  }
  if (!req.body.citizenUserManualAddressTown) {
    req.session.errors?.push({
      propertyName: 'citizenUserManualAddressTown',
      errorType: 'required',
    });
    errorOnPage = true;
  }
  if (!req.body.citizenUserManualAddressPostcode) {
    req.session.errors?.push({
      propertyName: 'citizenUserManualAddressPostcode',
      errorType: 'required',
    });
    errorOnPage = true;
  } else if (!(req.body.citizenUserManualAddressPostcode as string).match(/^[A-Z]{1,2}\d[A-Z0-9]? ?\d[A-Z]{2}$/i)) {
    req.session.errors?.push({
      propertyName: 'citizenUserManualAddressPostcode',
      errorType: 'invalid',
    });
    errorOnPage = true;
  }
  return errorOnPage;
}
