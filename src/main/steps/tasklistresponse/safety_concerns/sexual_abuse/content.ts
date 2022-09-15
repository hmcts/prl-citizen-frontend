import { TranslationFn } from '../../../../app/controller/GetController';

const en = {
  section: 'Safety concerns',
  title: 'Have you ever been sexually abused?',
  example: 'Examples of sexual abuse include:',
  line1: 'being forced or pressured to have sex without consent',
  line2: 'being threatened into an unwanted sexual activity',
  line3: 'unwanted touching or groping',
  one: 'Yes',
  two: 'No',
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

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const sexualAbuse = content.userCase?.respondentSafetyConcerns?.isSexuallyAbused;
  return {
    ...translations,
    sexualAbuse,
  };
};
