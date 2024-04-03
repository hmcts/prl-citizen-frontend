import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100Address, C100Applicant, C100RebuildPartyDetails, PartyType } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { getDataShape, getPartyDetails, updatePartyDetails } from '../../people/util';
import { C100AddressForm, C100UrlPartyType } from '../definitions';
import { getUpdatedForm } from '../utils';

import { form as selectAddressForm } from './address-select';

@autobind
export default class SelectAddressPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { id, partyType } = req.params;
    const form = new Form(
      getUpdatedForm(req.session.userCase, id, partyType as C100UrlPartyType, selectAddressForm as C100AddressForm)
        .fields as FormFields
    );
    const { onlycontinue, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    const selectedAddressIndex = Number(formData['selectAddress']);

    if (selectedAddressIndex >= 0) {
      const selectedAddress = req.session.addresses[selectedAddressIndex];
      req = this.updateAddressDetails(req, id, partyType as C100UrlPartyType, selectedAddress, selectedAddressIndex);
    }

    if (onlycontinue) {
      req.session.errors = form.getErrors(formData);
      return this.redirect(req, res);
    }
  }

  private updateAddressDetails = (
    req: AppRequest<AnyObject>,
    id: string,
    partyType: C100UrlPartyType,
    address,
    addressIndex: number
  ) => {
    const { postcode, street1, street2, town, county } = address;
    if (partyType === C100UrlPartyType.APPLICANT) {
      req.session.userCase.appl_allApplicants = updatePartyDetails(
        {
          ...(getPartyDetails(id, req.session.userCase.appl_allApplicants) as C100Applicant),
          applicantAddressPostcode: postcode,
          applicantAddress1: street1,
          applicantAddress2: street2,
          applicantAddressTown: town,
          applicantAddressCounty: county,
          country: 'United Kingdom',
          applicantSelectedAddress: addressIndex,
        },
        req.session.userCase.appl_allApplicants
      ) as C100Applicant[];
    } else if (partyType === C100UrlPartyType.RESPONDENT) {
      req.session.userCase.resp_Respondents = updatePartyDetails(
        {
          ...(getPartyDetails(id, req.session.userCase.resp_Respondents) as C100RebuildPartyDetails),
          address: {
            PostCode: postcode,
            AddressLine1: street1,
            AddressLine2: street2,
            PostTown: town,
            County: county,
            Country: (getDataShape(PartyType.RESPONDENT) as C100RebuildPartyDetails).address.Country,
            selectedAddress: addressIndex,
          } as C100Address,
        },
        req.session.userCase.resp_Respondents
      ) as C100RebuildPartyDetails[];
    } else if (partyType === C100UrlPartyType.OTHER_PERSON) {
      req.session.userCase.oprs_otherPersons = updatePartyDetails(
        {
          ...(getPartyDetails(id, req.session.userCase.oprs_otherPersons) as C100RebuildPartyDetails),
          address: {
            PostCode: postcode,
            AddressLine1: street1,
            AddressLine2: street2,
            PostTown: town,
            County: county,
            Country: (getDataShape(PartyType.OTHER_PERSON) as C100RebuildPartyDetails).address.Country,
            selectedAddress: addressIndex,
          } as C100Address,
        },
        req.session.userCase.oprs_otherPersons
      ) as C100RebuildPartyDetails[];
    }

    return req;
  };
}
