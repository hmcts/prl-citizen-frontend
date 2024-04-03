/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseWithId } from '../../../../../app/case/case';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { generateContentForLocalComponent } from '../../util';
import { generateContent as parentContent } from '../content';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  title: 'Do any of the children have a passport?',
  caption: 'Safety concerns',
  one: 'Yes',
  two: 'No',
  errors: {
    c1A_passportOffice: {
      required: 'Select yes if any of the children have a passport',
    },
  },
});

export const cy = () => ({
  title: "A oes gan unrhyw un o'r plant basbort?",
  caption: 'Pryderon diogelwch',
  one: 'Oes',
  two: 'Nac oes',
  errors: {
    c1A_passportOffice: {
      required: "Dewiswch oes os oes gan unrhyw un o'r plant basbort",
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields:(userCase: Partial<CaseWithId>, req: AppRequest): FormFields => { return  {
    c1A_passportOffice: {
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
  }},
  submit: {
    text: l => l.onlycontinue,
  },
};

export const generateContent: TranslationFn = content => {
  return generateContentForLocalComponent(content, languages, form,parentContent);
};
