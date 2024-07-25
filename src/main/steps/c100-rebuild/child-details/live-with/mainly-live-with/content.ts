import { CaseWithId } from '../../../../../app/case/case';
import { ChildrenDetails, People } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../../app/form/validation';
import { applyParms } from '../../../../../steps/common/url-parser';
import { C100_APPLICANTS_PERSONAL_DETAILS } from '../../../../../steps/urls';
import { interpolate } from '../../../../common/string-parser';
import { getPartyDetails } from '../../../people/util';
import { getAddresses, getPeople } from '../utils';
export * from '../routeGuard';

const en = {
  title: 'Who does {firstName} {lastName} mainly live with?',
  liveWithHint: 'Select the person that the child lives with most of the time.',
  incorrectAddress:
    'If any of the addresses listed here are not correct, you must <a href={editAddressUrl} class="govuk-link" rel="external">update the address details.</a>',
  addressNotProvided: 'The address has not been provided',
  address: 'Address: ',
  errors: {
    mainlyLiveWith: {
      required: 'Select the person the child lives with most of the time',
    },
  },
};

const cy = {
  title: 'Who does {firstName} {lastName} mainly live with? (welsh)',
  liveWithHint: 'Select the person that the child lives with most of the time. (welsh)',
  incorrectAddress:
    'If any of the addresses listed here are not correct, you must <a href={editAddressUrl} class="govuk-link" rel="external">update the address details.</a> (welsh)',
  addressNotProvided: 'The address has not been provided (welsh)',
  address: 'Cyfeiriad: ',
  errors: {
    mainlyLiveWith: {
      required: 'Select the person the child lives with most of the time (welsh)',
    },
  },
};

const languages = {
  en,
  cy,
};

let updatedForm: FormContent;

const updateFormFields = (form: FormContent, formFields: FormContent['fields']): FormContent => {
  updatedForm = {
    ...form,
    fields: {
      ...formFields,
      ...(form.fields ?? {}),
    },
  };

  return updatedForm;
};

export const generateFormFields = (
  userCase: Partial<CaseWithId>,
  mainlyLiveWith: ChildrenDetails['mainlyLiveWith']
): GenerateDynamicFormFields => {
  const errors = {
    en: {},
    cy: {},
  };

  const addresses = getAddresses(userCase);

  const fields = {
    mainlyLiveWith: {
      type: 'radios',
      hint: l => l.liveWithHint,
      validator: atLeastOneFieldIsChecked,
      values: getPeople(userCase).map(person => ({
        name: 'mainlyLiveWith',
        label: `${person.firstName} ${person.lastName}`,
        hint: l => {
          const address = addresses.find(addr => addr.personId === person.id)?.address;
          return address !== '' ? l.address + address : l.addressNotProvided;
        },
        value: person.id,
        selected: mainlyLiveWith?.id === person.id,
      })),
    },
  };

  return { fields, errors };
};

export const form: FormContent = {
  fields: {},
  onlycontinue: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const getFormFields = (caseData: Partial<CaseWithId>, childId: ChildrenDetails['id']): FormContent => {
  const { mainlyLiveWith } = getPartyDetails(childId, caseData?.cd_children) as ChildrenDetails;
  return updateFormFields(form, generateFormFields(caseData, mainlyLiveWith).fields);
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const childId = content.additionalData!.req.params.childId;
  const { firstName, lastName, mainlyLiveWith } = getPartyDetails(
    childId,
    content.userCase!.cd_children
  ) as ChildrenDetails;

  return {
    ...translations,
    title: interpolate(translations.title, { firstName, lastName }),
    incorrectAddress: interpolate(translations.incorrectAddress, {
      editAddressUrl: applyParms(C100_APPLICANTS_PERSONAL_DETAILS, {
        applicantId: content.userCase?.appl_allApplicants?.[0].id ?? '',
      }),
    }),
    form: updateFormFields(form, generateFormFields(content.userCase!, mainlyLiveWith as People).fields),
  };
};
