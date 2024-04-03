import autobind from 'autobind-decorator';
import { Response } from 'express';

import {
  C100Address,
  C100Applicant,
  C100RebuildPartyDetails,
  PartyType,
  YesOrNo,
} from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { PartyDetailsVariant, getPartyDetails, transformPartyDetails, updatePartyDetails } from '../../people/util';
import { C100AddressForm, C100UrlPartyType } from '../definitions';
import { getUpdatedForm } from '../utils';

import { applicantForm as applicantManualAddressForm, form as manualAddressForm } from './address-manual';

@autobind
export default class ManualAddressPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { id, partyType } = req.params;
    const form = new Form(
      getUpdatedForm(
        req.session.userCase,
        id,
        partyType as C100UrlPartyType,
        partyType === C100UrlPartyType.APPLICANT
          ? (applicantManualAddressForm as C100AddressForm)
          : (manualAddressForm as C100AddressForm),
        null,
        YesOrNo.YES
      ).fields as FormFields
    );
    const { onlycontinue, saveAndComeLater, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);

    this.updateAddressDetails(req, id, partyType as C100UrlPartyType, formData);

    if (onlycontinue) {
      req.session.errors = form.getErrors(formData);
      return this.redirect(req, res);
    } else if (saveAndComeLater) {
      this.saveAndComeLater(req, res, req.session.userCase);
    }
  }

  private updateAddressDetails = (req: AppRequest<AnyObject>, id: string, partyType: C100UrlPartyType, formData) => {
    if (partyType === C100UrlPartyType.APPLICANT) {
      req.session.userCase.appl_allApplicants = updatePartyDetails(
        {
          ...(getPartyDetails(id, req.session.userCase.appl_allApplicants) as C100Applicant),
          applicantAddressPostcode: formData['addressPostcode'],
          applicantAddress1: formData['address1'],
          applicantAddress2: formData['address2'],
          applicantAddressTown: formData['addressTown'],
          applicantAddressCounty: formData['addressCounty'],
          applicantAddressHistory: formData['addressHistory'],
          applicantProvideDetailsOfPreviousAddresses: formData['provideDetailsOfPreviousAddresses'],
          country: formData['country'],
        },
        req.session.userCase.appl_allApplicants
      ) as C100Applicant[];
    } else if (partyType === C100UrlPartyType.RESPONDENT) {
      req.session.userCase.resp_Respondents = updatePartyDetails(
        {
          ...(getPartyDetails(id, req.session.userCase.resp_Respondents) as C100RebuildPartyDetails),
          address: transformPartyDetails(PartyType.RESPONDENT, PartyDetailsVariant.ADDRESS, formData) as C100Address,
          addressUnknown: formData['addressUnknown'],
        },
        req.session.userCase.resp_Respondents
      ) as C100RebuildPartyDetails[];
    } else if (partyType === C100UrlPartyType.OTHER_PERSON) {
      req.session.userCase.oprs_otherPersons = updatePartyDetails(
        {
          ...(getPartyDetails(id, req.session.userCase.oprs_otherPersons) as C100RebuildPartyDetails),
          address: transformPartyDetails(PartyType.OTHER_PERSON, PartyDetailsVariant.ADDRESS, formData) as C100Address,
          addressUnknown: formData['addressUnknown'],
        },
        req.session.userCase.oprs_otherPersons
      ) as C100RebuildPartyDetails[];
    }
  };
}
