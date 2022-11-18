import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100Applicant } from '../../../../../app/case/definition';
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
    const { onlycontinue, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    const { applicantId } = req.params;
    const selectedAddressIndex = Number(formData['selectAddress']);

    if (selectedAddressIndex >= 0) {
      const selectedAddress = req.session.addresses[selectedAddressIndex];
      const { postcode, street1, street2, town, county } = selectedAddress;

      req.session.userCase.appl_allApplicants = updatePartyDetails(
        {
          ...(getPartyDetails(applicantId, req.session.userCase.appl_allApplicants) as C100Applicant),
          applicantAddressPostcode: postcode,
          applicantAddress1: street1,
          applicantAddress2: street2,
          applicantAddressTown: town,
          applicantAddressCounty: county,
          country: 'United Kingdom',
          applicantSelectedAddress: selectedAddressIndex,
        },
        req.session.userCase.appl_allApplicants
      ) as C100Applicant[];
    }

    if (onlycontinue) {
      req.session.errors = form.getErrors(formData);
      return this.redirect(req, res);
    }
  }
}
