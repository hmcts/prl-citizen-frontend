/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = {
  caption: 'Case number',
  title: 'Case added to your account',
  content: 'The case can now be seen on your child arrangements and family injunction account.',
};

export const cy = {
  caption: 'Rhif yr achos',
  title: 'Achos wedi’i ychwanegu i’ch cyfrif',
  content: 'Gallwch nawr weld yr achos yn eich cyfrif trefniadau plant a gwaharddeb teulu.',
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  onlyContinue: {
    text: l => l.onlyContinue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];

  return {
    ...translations,
    form,
  };
};
