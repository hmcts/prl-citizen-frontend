/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

export const en = () => ({
  title: 'Is there any reason that you would need permission from the court to make this application?',
  paragraphsOne: [
    'In some cases, the court will need to give permission before the application can be made.',
    'You will not need permission if you are the:',
  ],
  bulletPoints: ['parent', 'guardian', 'special guardian'],
  paragraphsTwo: [
    'If you are not sure if you need permission, see <a  target="_blank" href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1">Section C of the Form CB1 guidance</a>',
  ],
  one: 'Yes',
  two: 'No',
  errors: {
    sq_courtPermissionRequired: {
      required:
        'Select yes if there is any reason why you would need permission from the court to make this application',
    },
  },
});

export const cy = () => ({
  title: 'A oes yna unrhyw reswm pam y byddech angen caniatâd gan y llys i wneud y cais hwn?',
  paragraphsOne: [
    "Mewn rhai achosion, bydd angen i'r llys roi caniatâd cyn y gellir gwneud y cais.",
    "Ni fydd angen caniatâd arnoch os mai chi yw'r:",
  ],
  bulletPoints: ['rhiant', 'gwarcheidwad', 'gwarcheidwad arbennig'],
  paragraphsTwo: [
    'Os nad ydych yn siŵr os oes angen caniatâd arnoch, gweler <a  target="_blank" href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1"> Adran C canllawiau Ffurflen CB1</a>',
  ],
  one: 'Oes',
  two: 'Nac oes',
  errors: {
    sq_courtPermissionRequired: {
      required: 'Dewiswch ‘oes’ os oes unrhyw reswm pam y byddech angen caniatâd gan y llys i wneud y cais hwn',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    sq_courtPermissionRequired: {
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
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
