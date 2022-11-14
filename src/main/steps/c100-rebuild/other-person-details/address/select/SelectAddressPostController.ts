import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100Address, C100RebuildPartyDetails } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { getPartyDetails, updatePartyDetails } from '../../../people/util';

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

    if (!req.session.errors.length) {
      const selectedAddressIndex = Number(formData['selectAddress']);
      if (selectedAddressIndex >= 0) {
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        const selectedAddress = req.session.addresses[selectedAddressIndex] as any;
        const otherPersonsDetails = getPartyDetails(
          otherPersonId,
          req.session.userCase.oprs_otherPersons!
        ) as C100RebuildPartyDetails;

        req.session.userCase.oprs_otherPersons = updatePartyDetails(
          {
            ...otherPersonsDetails,
            address: {
              ...otherPersonsDetails.address,
              AddressLine1: selectedAddress.street1,
              AddressLine2: selectedAddress.street2,
              PostTown: selectedAddress.town,
              County: selectedAddress.county,
              Country: 'United Kingdom',
            } as C100Address,
          },
          req.session.userCase.oprs_otherPersons as C100RebuildPartyDetails[]
        ) as C100RebuildPartyDetails[];
      }
    }
    this.redirect(req, res);
  }
}
