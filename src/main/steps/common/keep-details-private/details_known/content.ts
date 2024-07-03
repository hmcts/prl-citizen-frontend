import { PartyType } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';

export const en = {
  section: 'Keeping your contact details private',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
  onlyContinue: 'Continue',
  errors: {
    detailsKnown: {
      required: 'Enter your details known',
    },
  },
  [PartyType.APPLICANT]: {
    title: 'Does the other person named in your application (the respondent) know any of your contact details?',
    line2:
      'Your application will be shared with the other person in the case (the respondent). This includes your contact details, unless you ask the court not to share these details.',
  },
  [PartyType.RESPONDENT]: {
    title: 'Do the other people named in this application (the applicants) know any of your contact details?',
  },
};

export const cy: typeof en = {
  section: 'Cadw eich manylion cyswllt yn breifat',
  one: 'Ydy',
  two: 'Nac ydy',
  three: 'Nid wyf yn gwybod',
  onlyContinue: 'Parhau',
  errors: {
    detailsKnown: {
      required: 'Rhowch eich manylion hysbys',
    },
  },
  [PartyType.APPLICANT]: {
    title:
      'Ydych chi eisiau cadw eich manylion cyswllt yn breifat oddi wrth y bobl eraill a enwir yn y cais (yr atebwyr)?',
    line2:
      "Bydd eich cais yn cael ei rannu gyda'r unigolyn arall yn yr achos (yr atebydd). Mae hyn yn cynnwys eich manylion cyswllt, oni bai eich bod yn gofyn i'r llys beidio â rhannu'r manylion hyn.",
  },
  [PartyType.RESPONDENT]: {
    title: 'A yw’r unigolyn a wnaeth gais i’r llys (y ceisydd) yn gwybod unrhyw rai o’ch manylion cyswllt?',
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    detailsKnown: {
      type: 'radios',
      classes: 'govuk-radios',
      section: l => l.section,
      values: [
        {
          label: l => l.one,
          value: 'yes',
        },
        {
          label: l => l.two,
          value: 'no',
        },
        {
          label: l => l.three,
          value: 'dontKnow',
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  onlyContinue: {
    text: l => l.onlyContinue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    ...translations[getCasePartyType(content.userCase!, content.userIdamId!)],
    form,
  };
};
