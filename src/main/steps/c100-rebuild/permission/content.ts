import { YesOrNo } from '../../../app/case/definition';

import { TranslationFn } from './../../../app/controller/GetController';
import { FormContent } from './../../../app/form/Form';
import { isFieldFilledIn } from './../../../app/form/validation';

const en = {
  title: 'Is there any reason why you would need permission from the court to make this application?',
  courtPermissionLine1: 'In some cases, the court will need to give permission before the application can be made.',
  courtPermissionLine2: 'You will not need permission if you are the:',
  courtPermissionBullet1: 'parent',
  courtPermissionBullet2: 'guardian',
  courtPermissionBullet3: 'special guardian',
  courtPermissionLine3: 'You may, or may not need permission from the court.',
  courtPermissionLine4:
    'For example, you may need permission if you are in the children’s lives, but not their parent or guardian.',
  courtPermissionLine5:
    'You will need the court’s permission if you are one of the children, and the application is about you.',
  courtPermissionLine6:
    'If you are not sure if you need permission, <a  target="_blank" href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1">see Section C of the Form CB1 guidance on GOV.UK</a>',
  summaryText: 'Contacts for help',
  one: 'Yes',
  two: 'No',
  errors: {
    courtPermissionRequired: {
      required:
        'Select yes if there is any reason why you would need permission from the court to make this application',
    },
  },
};

const cy = {
  title: 'Is there any reason why you would need permission from the court to make this application?',
  courtPermissionLine1: 'In some cases, the court will need to give permission before the application can be made.',
  courtPermissionLine2: 'You will not need permission if you are the:',
  courtPermissionBullet1: 'parent',
  courtPermissionBullet2: 'guardian',
  courtPermissionBullet3: 'special guardian',
  courtPermissionLine3: 'You may, or may not need permission from the court.',
  courtPermissionLine4:
    'For example, you may need permission if you are in the children’s lives, but not their parent or guardian.',
  courtPermissionLine5:
    'You will need the court’s permission if you are one of the children, and the application is about you.',
  courtPermissionLine6:
    'If you are not sure if you need permission, <a  target="_blank" href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1">see Section C of the Form CB1 guidance on GOV.UK</a>',
  summaryText: 'Contacts for help',
  one: 'Yes',
  two: 'No',
  errors: {
    courtPermissionRequired: {
      required:
        'Select yes if there is any reason why you would need permission from the court to make this application',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    courtPermissionRequired: {
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
  onlycontinue: {
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
