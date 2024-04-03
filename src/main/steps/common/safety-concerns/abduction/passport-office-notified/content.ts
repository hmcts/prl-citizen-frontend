/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseWithId } from '../../../../../app/case/case';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../../app/form/validation';
import { generateContentForLocalComponent } from '../../util';
import { generateContent as parentContent } from '../content';


export const en = () => ({
  caption: 'Safety concerns',
  title: 'Has the passport office been notified? ',
  Yes: 'Yes',
  No: 'No',
  errors: {
    c1A_abductionPassportOfficeNotified: {
      required: 'Select yes if the passport office has been notified',
    },
  },
});

export const cy = () => ({
  caption: 'Pryderon diogelwch',
  title: "Ydy'r swyddfa basbort wedi cael gwybod?",
  Yes: 'Ydy',
  No: 'Nac ydy',
  errors: {
    c1A_abductionPassportOfficeNotified: {
      required: "Dewiswch ydy os yw'r swyddfa basbort wedi cael ei hysbysu",
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields:(userCase: Partial<CaseWithId>, req: AppRequest): FormFields => { return  {
    c1A_abductionPassportOfficeNotified: {
      id: 'c1A_abductionPassportOfficeNotified',
      type: 'radios',
      classes: 'govuk-radios',
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'c1A_abductionPassportOfficeNotified',
          label: l => l.Yes,
          value: YesOrNo.YES,
        },
        {
          name: 'c1A_abductionPassportOfficeNotified',
          label: l => l.No,
          value: YesOrNo.NO,
        },
      ],
    },
  }},
  onlycontinue: {
    text: l => l.onlycontinue,
  },
};

export const generateContent: TranslationFn = content => {
  return generateContentForLocalComponent(content, languages, form,parentContent);
};
