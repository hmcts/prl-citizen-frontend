import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100RebuildPartyDetails } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { getOtherPersonDetails, updateOtherPersonDetails } from '../../../other-person-details/util';

import { getUpdatedForm } from './content';

@autobind
export default class SelectAddressPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const form = new Form(getUpdatedForm().fields as FormFields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);
    const { otherPersonId } = req.params;

    req.session.errors = form.getErrors(formData);

    if (req.session.errors.length === 0) {
      const selectedAddressIndex = Number(formData['selectAddress']);
      if (selectedAddressIndex >= 0) {
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        const selectedAddress = req.session.addresses[selectedAddressIndex] as any;

        const otherPersonIndex = req.session.userCase?.oprs_otherPersons?.findIndex(
          i => i.id === otherPersonId
        ) as number;

        const otherPersonsDetails = getOtherPersonDetails(
          req.session.userCase.oprs_otherPersons!,
          otherPersonId
        ) as C100RebuildPartyDetails;

        if (otherPersonIndex >= 0) {
          Object.assign(otherPersonsDetails, {
            address: {
              ...otherPersonsDetails.address,
              AddressLine1: selectedAddress.street1,
              AddressLine2: selectedAddress.street2,
              PostTown: selectedAddress.town,
              County: selectedAddress.county,
              Country: selectedAddress.country,
            },
          });
        }

        req.session.userCase.oprs_otherPersons = updateOtherPersonDetails(
          req.session.userCase.oprs_otherPersons!,
          otherPersonsDetails
        );

        formData['AddressLine1'] = selectedAddress.street1;
        formData['AddressLine2'] = selectedAddress.street2;
        formData['PostTown'] = selectedAddress.town;
        formData['County'] = selectedAddress.county;
        formData['Country'] = selectedAddress.country;
        formData['PostCode'] = selectedAddress.postcode;
      }
    }
    this.redirect(req, res);
  }
}
