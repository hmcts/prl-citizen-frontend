/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { C100RebuildPartyDetails, YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { getPartyDetails } from '../../../../c100-rebuild/people/util';
import { interpolate } from '../../../../common/string-parser';

export const en = {
  caption: "Keeping {firstName} {lastName}'s address private",
  headingTitle: 'Keeping address private',
  paragraph1:
    'The information you give us will be shared with the other people named in this application. This includes {firstName} {lastName}’s address, unless you ask the court to keep this private.',
  paragraph2:
    'You can request this if, for example, you believe that sharing this information may lead to unwanted contact or a risk of harm to {firstName} {lastName} or the children.',
  keepDetailsPrivate:
    'Do you want to request to keep {firstName} {lastName}’s address private from the other people named in this application?',
  one: 'Yes',
  two: 'No',
  errors: {
    startAlternative: {
      required: 'Select yes if you want to keep {firstName} {lastName} address private',
    },
  },
};

export const cy = {
  caption: 'Cadw cyfeiriad {firstName} {lastName} yn breifat',
  headingTitle: 'Cadw cyfeiriad yn breifat',
  paragraph1:
    "Bydd yr wybodaeth a roddwch i ni yn cael ei rhannu gyda'r bobl eraill a enwir yn y cais hwn.  Mae hyn yn cynnwys cyfeiriad {firstName} {lastName}, oni bai eich bod yn gofyn i'r llys gadw hyn yn breifat. ",
  paragraph2:
    "Gallwch ofyn am hyn os, er enghraifft, rydych chi'n credu y gallai rhannu'r wybodaeth hon arwain at gyswllt diangen neu risg o niwed i {firstName} {lastName} neu'r plant",
  keepDetailsPrivate:
    'Ydych chi am ofyn am gadw cyfeiriad {firstName} {lastName} yn breifat oddi wrth y bobl eraill a enwir yn y cais hwn?',
  one: 'Ydw',
  two: 'Nac ydw',
  errors: {
    startAlternative: {
      required: 'Dewiswch ydw os ydych eisiau cadw eich manylion yn gyfrinachol',
    },
  },
};

const languages = {
  en,
  cy,
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
        {
          label: l => l.one, // Points to 'Yes' in English and 'Ydw' in Welsh
          value: YesOrNo.YES,
          // selected: confidential === YesOrNo.YES,
        },
        {
          label: l => l.two, // Points to 'No' in English and 'Nac ydw' in Welsh
          value: YesOrNo.NO,
          // selected: confidential === YesOrNo.NO,
        },
      ],
      validator: isFieldFilledIn,
    },
  };

  return { fields, errors };
};

export const form: FormContent = {
  fields: {},
  onlyContinue: {
    text: l => l.onlyContinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

let updatedForm: FormContent;

// eslint-disable-next-line @typescript-eslint/no-shadow
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

export const generateContent: TranslationFn = content => {
  const { errors: originalErrors, ...translations } = languages[content.language];
  const otherPersonId = content.additionalData?.req.params.otherPersonId ?? '';

  const otherPerson = getPartyDetails(otherPersonId, content.userCase?.oprs_otherPersons) as C100RebuildPartyDetails;

  const { firstName = '', lastName = '', isOtherPersonAddressConfidential } = otherPerson || {};
  const nameData = { firstName, lastName };

  const injectName = (str: string) => interpolate(str, nameData);

  return {
    ...translations,
    caption: injectName(translations.caption),
    paragraph1: injectName(translations.paragraph1),
    paragraph2: injectName(translations.paragraph2),
    keepDetailsPrivate: injectName(translations.keepDetailsPrivate),
    errors: {
      confidentiality: {
        ...originalErrors.startAlternative,
        required: injectName(originalErrors.startAlternative.required),
      },
    },
    form: updateFormFields(form, generateFormFields(isOtherPersonAddressConfidential ?? YesOrNo.NO).fields),
  };
};
