import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100RebuildPartyDetails } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { getAddressesFromPostcode } from '../../../../../app/postcode/postcode-lookup-api';
import { getOtherPersonDetails, transformFormData, updateOtherPersonDetails } from '../../../other-person-details/util';

import { getUpdatedForm } from './content';

@autobind
export default class AddressLookupPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const postcode = req.body['PostCode'] as string;
    const { otherPersonId } = req.params;

    let addresses;

    const form = new Form(getUpdatedForm().fields as FormFields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

    const otherPersonsDetails = getOtherPersonDetails(
      req.session.userCase.oprs_otherPersons!,
      otherPersonId
    ) as C100RebuildPartyDetails;

    Object.assign(
      otherPersonsDetails.otherPersonAddress,
      transformFormData(
        'otherPersonAddress',
        formData
        // { PostCode: formData['addressPostcode'] }
      )
    );

    req.session.userCase.oprs_otherPersons = updateOtherPersonDetails(
      req.session.userCase.oprs_otherPersons!,
      otherPersonsDetails
    );

    if (req.session.errors.length === 0) {
      console.log(postcode, 'address');
      addresses = await getAddressesFromPostcode(postcode, req.locals.logger);
      console.log(postcode, addresses, 'address');
    }
    req.session.addresses = addresses;

    this.redirect(req, res);
  }
}
