import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  caption: 'Safety concerns',
  title: 'What do you want the court to do to keep you and the children safe?',
  paragraph:
    'Describe what you want the court to do to keep you and the children safe. The court may be able to make a protective order.',
  detailsSummary: 'Actions the court can take',
  detailsParagraphs: [
    '<strong>Non-molestation order:</strong> The court may decide to make a non-molestation order. This requires the person served with the order not to be violent, or threaten violence. They must not harass or pester the person who applied for the order in any way. This includes harassing them over messaging apps or social media (Facebook, Twitter and so on).',
    '<strong>Prohibited Steps:</strong> this order prevents a person from taking certain actions without the permission of the court.',
    '<strong>Specific issue:</strong> this order sets out a decision on specific issues, which could include medical treatment, education or a foreign holiday.',
  ],
  errors: {
    PRL_c1A_keepingSafeStatement: {
      required: 'Describe what do you want the court to do to keep you and the children safe',
      invalidCharacters: 'The characters inputted are invalid',
    },
  },
});
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = () => ({
  caption: 'Safety concerns - welsh',
  title: 'What do you want the court to do to keep you and the children safe? - welsh',
  paragraph:
    'Describe what you want the court to do to keep you and the children safe. The court may be able to make a protective order. - welsh',
  detailsSummary: 'Actions the court can take - welsh',
  detailsParagraphs: [
    '<strong>Non-molestation order:</strong> The court may decide to make a non-molestation order. This requires the person served with the order not to be violent, or threaten violence. They must not harass or pester the person who applied for the order in any way. This includes harassing them over messaging apps or social media (Facebook, Twitter and so on). - welsh',
    '<strong>Prohibited Steps:</strong> this order prevents a person from taking certain actions without the permission of the court. - welsh',
    '<strong>Specific issue:</strong> this order sets out a decision on specific issues, which could include medical treatment, education or a foreign holiday. - welsh',
  ],
  errors: {
    PRL_c1A_keepingSafeStatement: {
      required: 'Describe what do you want the court to do to keep you and the children safe - welsh',
      invalidCharacters: 'The characters inputted are invalid (welsh)',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    PRL_c1A_keepingSafeStatement: {
      type: 'textarea',
      attributes: { rows: 10 },
      validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
    },
  },
  onlyContinue: {
    text: l => l.onlyContinue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
