import { CaseWithId } from '../../../../app/case/case';
import { C100RebuildPartyDetails, YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { interpolate } from '../../../../steps/common/string-parser';
import { getPartyDetails } from '../../../c100-rebuild/people/util';

export const en = {
  title: 'Keeping {firstName} {lastName}’s identity private',
  pageTitle: "Keeping other person's identity private",
  answersWillBeShared:
    'Unless you answer ‘Yes’ to the question below, the information you give will be shared with other people named in this application (the respondents). This will include the contact details',
  keepDetailsPrivate:
    'Do you want to keep {firstName} {lastName}’s identity private from the other people named in the application (the respondents)?',
  yes: 'Yes',
  no: 'No',
  errors: {
    confidentiality: {
      required: 'Select yes if you want to keep {firstName} {lastName}’s identity private',
    },
  },
};

export const cy: typeof en = {
  title: 'Cadw manylion cyswllt {firstName} {lastName} yn gyfrinachol',
  pageTitle: "Keeping other person's identity private",
  answersWillBeShared:
    'Bydd yr atebion a roddwch yn eich ymateb yn cael eu rhannu â’r bobl eraill a enwir yn y cais hwn(yr atebydd), bydd hyn yn cynnwys eich manylion cyswllt',
  keepDetailsPrivate:
    'Ydych chi eisiau cadw manylion cyswllt {firstName} {lastName} yn gyfrinachol oddi wrth yr unigolyn arall a enwir yn y cais(yr atebydd)',
  yes: 'Oes',
  no: 'Nac oes',
  errors: {
    confidentiality: {
      required: 'Dewiswch ydw os ydych eisiau cadw {firstName} {lastName} manylion yn gyfrinachol',
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

export const generateFormFields = (confidential: YesOrNo): GenerateDynamicFormFields => {
  const errors = {
    en: {},
    cy: {},
  };

  const fields = {
    confidentiality: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.keepDetailsPrivate,
      labelSize: 's',
      values: [
        { label: l => l.yes, value: YesOrNo.YES, selected: confidential === YesOrNo.YES },
        { label: l => l.no, value: YesOrNo.NO, selected: confidential === YesOrNo.NO },
      ],
      validator: isFieldFilledIn,
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

export const getFormFields = (
  caseData: Partial<CaseWithId>,
  otherPersonId: C100RebuildPartyDetails['id']
): FormContent => {
  const { isOtherPersonAddressConfidential } = getPartyDetails(
    otherPersonId,
    caseData?.oprs_otherPersons
  ) as C100RebuildPartyDetails;
  return updateFormFields(form, generateFormFields(isOtherPersonAddressConfidential!).fields);
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const otherPersonId = content.additionalData!.req.params.otherPersonId;
  const { firstName, lastName, isOtherPersonAddressConfidential } = getPartyDetails(
    otherPersonId,
    content.userCase!.oprs_otherPersons
  ) as C100RebuildPartyDetails;

  return {
    ...translations,
    title: interpolate(translations.title, { firstName, lastName }),
    keepDetailsPrivate: interpolate(translations.keepDetailsPrivate, { firstName, lastName }),
    errors: {
      ...translations.errors,
      confidentiality: {
        ...translations.errors.confidentiality,
        required: interpolate(translations.errors.confidentiality.required, { firstName, lastName }),
      },
    },
    form: updateFormFields(form, generateFormFields(isOtherPersonAddressConfidential!).fields),
  };
};
