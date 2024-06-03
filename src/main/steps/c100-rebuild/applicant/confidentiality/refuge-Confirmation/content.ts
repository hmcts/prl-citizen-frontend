import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = {
  title: 'Keeping your details safe',
  content1: 'We understand how important it is to feel safe, and know that your details will be kept private.',
  content2:
    'Your details will be kept confidential and will only be used by the court, as well as by Cafcass or Cafcass Cymru. They will not be shared with anyone else.',
  content3: 'To help us to keep your details safe, do not include them in any other communications during the case.',
};

const cy: typeof en = {
  title: 'Keeping your details safe -welsh',
  content1: 'We understand how important it is to feel safe, and know that your details will be kept private. -welsh',
  content2:
    'Your details will be kept confidential and will only be used by the court, as well as by Cafcass or Cafcass Cymru. They will not be shared with anyone else. -welsh',
  content3:
    'To help us to keep your details safe, do not include them in any other communications during the case. -welsh',
};

export const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  onlyContinue: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];

  return {
    ...translations,

    form,
  };
};
