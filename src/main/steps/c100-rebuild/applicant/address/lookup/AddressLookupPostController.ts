import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { AnyType } from '../../../../../app/form/validation';
import { getAddressesFromPostcode } from '../../../../../app/postcode/postcode-lookup-api';

import { getUpdatedForm } from './content';

@autobind
export default class AddressLookupPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const postcode = req.body['addressPostcode'] as string;
    const { applicantId } = req.query;
    const applicantId1: AnyType | undefined = applicantId;

    let addresses;

    const form = new Form(getUpdatedForm().fields as FormFields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    const applicantIndex = req.session.userCase?.appl_allApplicants?.findIndex(i => i.id === applicantId1) as number;
    req.session.userCase!.appl_allApplicants![applicantIndex] = {
      ...req.session.userCase?.appl_allApplicants?.[applicantIndex],
      applicantAddressPostcode: req.body['addressPostcode'] as string,
    };

    if (req.session.errors.length === 0) {
      addresses = await getAddressesFromPostcode(postcode, req.locals.logger);
    }
    req.session.addresses = addresses;

    this.redirect(req, res);
  }
}
