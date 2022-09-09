import { YesOrNo } from 'app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

const en = {
  section: 'Safety concerns',
  title: 'Have you ever been sexually abused?',
  example: 'Physical abuse includes actions such as:',
  punch: 'punching',
  choke: 'choking',
  kick: 'kicking',
  hitting: 'hitting with an object',
  one: 'Yes',
  two: 'No',
  summaryText: 'Contacts for help',
  continue: 'Save and continue',
  errors: {
    'respondentSafetyConcerns.isPhysicallyAbused': {
      required: 'Please choose one of the following options ',
    },
  },
};

const cy: typeof en = {
  section: 'Safety concerns',
  title: 'Have you ever been sexually abused?',
  example: 'Physical abuse includes actions such as:',
  punch: 'punching',
  choke: 'choking',
  kick: 'kicking',
  hitting: 'hitting with an object',
  one: 'Yes',
  two: 'No',
  summaryText: 'Contacts for help',
  continue: 'Save and continue',
  errors: {
    'respondentSafetyConcerns.isPhysicallyAbused': {
      required: 'Please choose one of the following options ',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    'respondentSafetyConcerns.isPhysicallyAbused': {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
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
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
