import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100Address, C100RebuildPartyDetails, PartyType } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { getDataShape, getPartyDetails, updatePartyDetails } from '../../../people/util';

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
    const { respondentId } = req?.params;
    const selectedAddressIndex = Number(formData['selectAddress']);

    if (selectedAddressIndex >= 0) {
      const selectedAddress = req.session.addresses[selectedAddressIndex];
      const { postcode, street1, street2, town, county } = selectedAddress;

      req.session.userCase.resp_Respondents = updatePartyDetails(
        {
          ...(getPartyDetails(respondentId, req.session.userCase.resp_Respondents) as C100RebuildPartyDetails),
          address: {
            PostCode: postcode,
            AddressLine1: street1,
            AddressLine2: street2,
            PostTown: town,
            County: county,
            Country: (getDataShape(PartyType.RESPONDENT) as C100RebuildPartyDetails).address.Country,
            selectedAddress: selectedAddressIndex,
          } as C100Address,
        },
        req.session.userCase.resp_Respondents
      ) as C100RebuildPartyDetails[];
    }

    if (onlycontinue) {
      req.session.errors = form.getErrors(formData);
      return this.redirect(req, res);
    }
  }
}
