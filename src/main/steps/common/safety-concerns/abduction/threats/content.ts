/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CaseWithId } from '../../../../../app/case/case';
import { YesOrNo } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { generateContentForLocalComponent } from '../../util';
import { generateContent as parentContent } from '../content';

export const en = () => ({
  caption: 'Safety concerns',
  title: 'Have the children been abducted or kept outside the UK without your consent before?',
  one: 'Yes',
  two: 'No',
  errors: {
    c1A_childAbductedBefore: {
      required: 'Select yes if the children have been abducted or kept outside the UK without your consent before',
    },
  },
});

export const cy = () => ({
  caption: 'Pryderon diogelwch',
  title: "Ydy'r plant wedi cael eu cipio neu eu cadw y tu allan i'r DU heb eich caniatâd o'r blaen?",
  one: 'Ydyn',
  two: 'Nac ydyn',
  errors: {
    c1A_childAbductedBefore: {
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
  fields: (userCase: Partial<CaseWithId>, req: AppRequest): FormFields => {
    return {
      c1A_childAbductedBefore: {
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
    };
  },

  submit: {
    text: l => l.onlycontinue,
  },
};

export const generateContent: TranslationFn = content => {
  return generateContentForLocalComponent(content, languages, form, parentContent);
};
