import autobind from 'autobind-decorator';
import { Response } from 'express';

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

    req.session.userCase.citizenUserAddress1 = formData['citizenUserManualAddress1'];
    req.session.userCase.citizenUserAddress2 = formData['citizenUserManualAddress2'];
    req.session.userCase.citizenUserAddressTown = formData['citizenUserManualAddressTown'];
    req.session.userCase.citizenUserAddressCounty = formData['citizenUserManualAddressCounty'];
    req.session.userCase.citizenUserAddressPostcode = formData['citizenUserManualAddressPostcode'];

    delete formData['citizenUserManualAddress1'];
    delete formData['citizenUserManualAddress2'];
    delete formData['citizenUserManualAddressTown'];
    delete formData['citizenUserManualAddressCounty'];
    delete formData['citizenUserManualAddressPostcode'];

    this.redirect(req, res);
  }
}
