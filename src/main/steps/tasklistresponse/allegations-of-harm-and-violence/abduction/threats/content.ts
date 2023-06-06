// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { generateContent as parentContent } from '../content';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  caption: 'Safety concerns',
  title: 'Have the children been abducted or kept outside the UK without your consent before?',
  one: 'Yes',
  two: 'No',
  errors: {
    PRL_c1A_childAbductedBefore: {
      required: 'Select yes if the children have been abducted or kept outside the UK without your consent before',
    },
  },
});
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = () => ({
  caption: 'Pryderon diogelwch',
  title: "Ydy'r plant wedi cael eu herwgydio neu eu cadw y tu allan i'r DU heb eich caniatâd o'r blaen?",
  one: 'Ydyn',
  two: 'Nac ydyn',
  errors: {
    PRL_c1A_childAbductedBefore: {
      required:
        "Dewiswch ydyn os yw'r plant wedi cael eu herwgydio neu eu cadw y tu allan i'r DU heb eich caniatâd o'r blaen",
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    PRL_c1A_childAbductedBefore: {
      type: 'radios',
      classes: 'govuk-radios',

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

  onlyContinue: {
    text: l => l.onlyContinue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    ...parentContent(content),
    form,
  };
};
