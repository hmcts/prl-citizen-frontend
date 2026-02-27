/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

export * from './routeGuard';

export const en = () => ({
  title: 'Permission to apply',
  paragraphsOne: ['You will not normally need permission if you are the child’s:'],
  bulletPoints: ['parent', 'guardian', 'special guardian'],
  paragraphsTwo: [
    "However, this does not apply if there is an order in place stating that you cannot make an application without the court's permission. For example:",
  ],
  bulletPointsTwo: [
    'an order under section 91(14) of the Children Act 1989',
    'a limited civil restraint order',
    'a general civil restraint order',
    'an extended civil restraint order',
  ],
  question: 'Is there any reason that you would need permission from the court to make this application?',
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
  title: 'Caniatâd i wneud cais',
  paragraphsOne: ["Ni fyddwch angen caniatâd fel rheol os mai chi yw'r:"],
  bulletPoints: ['rhiant', 'gwarcheidwad', 'gwarcheidwad arbennig'],
  paragraphsTwo: [
    'Fodd bynnag, nid yw hyn yn berthnasol os oes yna orchymyn yn nodi na allwch wneud cais heb ganiatâd y llys. Er enghraifft:',
  ],
  bulletPointsTwo: [
    'gorchymyn o dan adran 91(14) Deddf Plant 1989',
    'gorchymyn ataliad sifil cyfyngedig',
    'gorchymyn ataliad sifil cyffredinol',
    'gorchymyn ataliad sifil estynedig',
  ],
  question: 'Oes yna unrhyw reswm y byddech angen caniatâd gan y llys i wneud y cais hwn?',
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
      label: l => l.question,
      labelSize: 's',
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
