import { YesOrNo } from 'app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

const en = {
  section: 'Safety concerns',
  title: 'Have you ever been sexually abused?',
  example: 'Examples of sexual abuse include:',
  line1: 'being forced or pressured to have sex without consent',
  line2: 'being threatened into an unwanted sexual activity',
  line3: 'unwanted touching or groping',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
  threeHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
  continue: 'Save and continue',
  errors: {
    'respondentSafetyConcerns.isSexuallyAbused': {
      required: 'Please choose one of the following options ',
    },
  },
};

const cy: typeof en = {
  section: 'Safety concerns',
  title: 'Have you ever been sexually abused?',
  example: 'Examples of sexual abuse include:',
  line1: 'being forced or pressured to have sex without consent',
  line2: 'being threatened into an unwanted sexual activity',
  line3: 'unwanted touching or groping',
  one: 'Yes',
  two: 'No',
  three: "I don't know",
  threeHint: 'This is a 8 character code',
  summaryText: 'Contacts for help',
  continue: 'Save and continue',
  errors: {
    'respondentSafetyConcerns.isSexuallyAbused': {
      required: 'Please choose one of the following options ',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    'respondentSafetyConcerns.isSexuallyAbused': {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
        },
        {
          label: l => l.two,
          value: YesOrNo.NO,
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
