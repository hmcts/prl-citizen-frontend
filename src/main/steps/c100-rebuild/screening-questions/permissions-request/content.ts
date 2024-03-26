/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

console.info('** FOR SONAR **');

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  title: 'Explain why the court should grant you permission to submit this application',
  line: 'Give your answer in bullet points and short sentences. Explain your relationship to the children in the case and why you should be allowed to make the application.',
  errors: {
    sq_permissionsRequest: {
      required: 'Explain why the court should grant you permission to submit this application',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
});

export const cy = () => ({
  title: "Esboniwch pam y dylai'r llys roi caniatâd i chi gyflwyno'r cais hwn",
  line: "Rhowch eich ateb mewn pwyntiau bwled a brawddegau byr. Esboniwch eich perthynas â'r plant yn yr achos a pham y dylech gael caniatâd i wneud y cais.",
  errors: {
    sq_permissionsRequest: {
      required: "Esboniwch pam y dylai'r llys roi caniatâd i chi gyflwyno'r cais hwn",
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    sq_permissionsRequest: {
      type: 'textarea',
      attributes: { rows: 10 },
      validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
    },
  },
  onlycontinue: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
