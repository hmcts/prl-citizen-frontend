import { YesOrNo } from '../../../../app/case/definition';
import { PageContent } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent } from '../../../common/common.content';

const en = {
  title: 'Staying in a refuge',
  refuge:
    'A refuge is a secure place for people and their children to stay when they are escaping domestic abuse. It provides a space to feel safe and supported.',
  citizensAdvice:
    'Find out more about refuges at <a href="https://www.citizensadvice.org.uk/" class="govuk-link" target="_blank" aria-label="This link will open in a new tab for Citizen\'s Advice">Citizen\'s Advice (opens in a new tab).</a>',
  refugeLabel: 'Do you currently live in a refuge?',
  one: 'Yes',
  two: 'No',
  continue: 'Continue',
  errors: {
    citizenUserLivingInRefuge: {
      required: 'Select yes if you currently live in a refuge',
    },
  },
};

const cy: typeof en = {
  title: 'Staying in a refuge (welsh)',
  refuge:
    'A refuge is a secure place for people and their children to stay when they are escaping domestic abuse. It provides a space to feel safe and supported. (welsh)',
  citizensAdvice:
    'Find out more about refuges at <a href="https://www.citizensadvice.org.uk/" class="govuk-link" target="_blank" aria-label="This link will open in a new tab for Citizen\'s Advice">Citizen\'s Advice (opens in a new tab).</a> (welsh)',
  refugeLabel: 'Do you currently live in a refuge? (welsh)',
  one: 'Yes (welsh)',
  two: 'No (welsh)',
  continue: 'Continue (welsh)',
  errors: {
    citizenUserLivingInRefuge: {
      required: 'Select yes if you currently live in a refuge (welsh)',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    citizenUserLivingInRefuge: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.refugeLabel,
      labelSize: 'm',
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
    text: l => l.continue,
  },
};

export const generateContent = (content: CommonContent): PageContent => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
