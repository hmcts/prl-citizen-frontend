import { CaseWithId } from '../../../app/case/case';
import { C100Applicant, C100RebuildPartyDetails, YesOrNo } from '../../../app/case/definition';
import { FormContent, GenerateDynamicFormFields } from '../../../app/form/Form';
import { getPartyDetails } from '../people/util';

import { AddressPartyData, C100AddressForm, C100UrlPartyType } from './definitions';

const updatedFormFields = (form: FormContent, formFields: FormContent['fields']): FormContent => {
  return {
    ...form,
    fields: {
      ...formFields,
      ...(form.fields ?? {}),
    },
  };
};

const updatedOtherPersonManualFormFields = (
  form: FormContent,
  formFields: FormContent['fields'],
  isManual?: YesOrNo
): FormContent => {
  return {
    ...form,
    fields: {
      ...formFields,
      ...(form.fields ?? {}),
      _ctx: {
        type: 'hidden',
        labelHidden: true,
        value: isManual === YesOrNo.YES ? 'opAddressManual' : 'opAddressLookup',
      },
    },
  };
};

export const getPartyData = (
  caseData: Partial<CaseWithId>,
  partyId: string,
  partyType: C100UrlPartyType
): AddressPartyData => {
  let partyData;
  let firstName;
  let lastName;

  if (partyType === C100UrlPartyType.APPLICANT) {
    partyData = caseData?.appl_allApplicants?.find(i => i.id === partyId) as C100Applicant;
    firstName = partyData.applicantFirstName;
    lastName = partyData.applicantLastName;
  } else {
    partyData = getPartyDetails(
      partyId,
      partyType === C100UrlPartyType.OTHER_PERSON ? caseData?.oprs_otherPersons : caseData?.resp_Respondents
    ) as C100RebuildPartyDetails;
    firstName = partyData.firstName;
    lastName = partyData.lastName;
  }

  return { partyData, firstName, lastName };
};

export const getUpdatedForm = (
  caseData: Partial<CaseWithId>,
  partyId: string,
  partyType: C100UrlPartyType,
  commonForm: C100AddressForm | FormContent,
  form?: C100AddressForm | FormContent | null,
  isManual?: YesOrNo
): FormContent => {
  const partyData = getPartyData(caseData, partyId, partyType) ?? {};

  if (partyType === C100UrlPartyType.OTHER_PERSON && isManual) {
    return updatedOtherPersonManualFormFields(
      (form ?? commonForm) as FormContent,
      generateFormFields(partyData, commonForm as C100AddressForm, partyType).fields,
      isManual
    );
  }

  return updatedFormFields(
    (form ?? commonForm) as FormContent,
    generateFormFields(partyData ?? {}, commonForm as C100AddressForm, partyType).fields
  );
};

const generateFormFields = (
  caseData: AddressPartyData,
  form: C100AddressForm,
  partyType: C100UrlPartyType
): GenerateDynamicFormFields => {
  return {
    fields: form(caseData.partyData, partyType).fields,
    errors: { en: {}, cy: {} },
  };
};
