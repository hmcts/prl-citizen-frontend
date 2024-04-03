import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100Address, C100Applicant, C100RebuildPartyDetails, YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { getAddressesFromPostcode } from '../../../../app/postcode/postcode-lookup-api';
import { getPartyDetails, updatePartyDetails } from '../../people/util';
import { C100AddressForm, C100UrlPartyType } from '../definitions';
import { getUpdatedForm } from '../utils';

import { applicantForm as applicantLookupAddressForm, form as lookupAddressForm } from './address-lookup';

@autobind
export default class AddressLookupPostController extends PostController<AnyObject> {
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
          ? (applicantLookupAddressForm as C100AddressForm)
          : (lookupAddressForm as C100AddressForm),
        null,
        YesOrNo.NO
      ).fields as FormFields
    );
    const { onlycontinue, saveAndComeLater, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    const postcode = partyType === C100UrlPartyType.APPLICANT ? formData['addressPostcode'] : formData['PostCode'];

    this.updateAddressDetails(req, id, partyType as C100UrlPartyType, postcode);

    if (onlycontinue) {
      req.session.errors = form.getErrors(formData);
      if (!req.session.errors.length) {
        req.session.addresses = (await getAddressesFromPostcode(postcode, req.locals.logger)) as [];
      }

      return this.redirect(req, res);
    } else if (saveAndComeLater) {
      this.saveAndComeLater(req, res, req.session.userCase);
    }
  }

  private updateAddressDetails = (
    req: AppRequest<AnyObject>,
    id: string,
    partyType: C100UrlPartyType,
    postcode: string
  ) => {
    if (partyType === C100UrlPartyType.APPLICANT) {
      req.session.userCase.appl_allApplicants = updatePartyDetails(
        {
          ...(getPartyDetails(id, req.session.userCase.appl_allApplicants) as C100Applicant),
          applicantAddressPostcode: postcode,
        },
        req.session.userCase.appl_allApplicants
      ) as C100Applicant[];
    } else if (partyType === C100UrlPartyType.RESPONDENT) {
      req.session.userCase.resp_Respondents = updatePartyDetails(
        {
          ...(getPartyDetails(id, req.session.userCase.resp_Respondents) as C100RebuildPartyDetails),
          address: {
            PostCode: postcode,
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
          } as C100Address,
        },
        req.session.userCase.oprs_otherPersons
      ) as C100RebuildPartyDetails[];
    }
  };
}
