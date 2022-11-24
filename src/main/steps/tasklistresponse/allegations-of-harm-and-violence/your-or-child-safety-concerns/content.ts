import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

const en = {
  section: 'Safety concerns',
  title: 'Do you have any concerns for your safety or the safety of the children?',
  line1: 'You may have concerns about current, or future safety.',
  line2:
    'If you or the children have experienced abuse or feel unsafe, support is available. See a list of organisations that can help',
  warning:
    'You may find some of these questions difficult or upsetting to answer. Take your time and complete them as best you can.',
  contentunderyesp1:
    '<p class="govuk-body">The information you give will be considered as part of your application. If you need to make  <a href="https://www.gov.uk/injunction-domestic-violence" class="govuk-link">an application for a domestic abuse injunction</a>, you can do this separately.</p>',
  sidelink1: 'Identify signs of child abuse',
  sidelink2: 'Identify signs of domestic abuse',
  one: 'Yes',
  two: 'No',
  onlyContinue: 'Save and continue',
  label1: 'Test',
  errors: {
    yourchildconcernsstart: {
      required: 'Select yes if you have any concerns for your safety or the safety of the children',
    },
  },
};

const cy: typeof en = {
  section: 'Safety concerns - welsh',
  title: 'Do you have any concerns for your safety or the safety of the children? - welsh',
  line1: 'You may have concerns about current, or future safety. - welsh',
  line2:
    'If you or the children have experienced abuse or feel unsafe, support is available. See a list of organisations that can help - welsh',
  warning:
    'You may find some of these questions difficult or upsetting to answer. Take your time and complete them as best you can. - welsh',
  contentunderyesp1:
    'The information you give will be considered as part of your application. If you need to make <a href="https://www.gov.uk/injunction-domestic-violence">an application for a domestic abuse injunction</a>, you can do this separately.',
  sidelink1: 'Identify signs of child abuse - welsh',
  sidelink2: 'Identify signs of domestic abuse - welsh',
  one: 'Yes - welsh',
  two: 'No - welsh',
  onlyContinue: 'Save and continue - welsh',
  label1: 'Test',
  errors: {
    yourchildconcernsstart: {
      required: 'Select yes if you have any concerns for your safety or the safety of the children',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    yourchildconcernsstart: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,

          subFields: {
            applicationrelated: {
              type: 'hidden',
              classes: 'govuk-label',
              name: 'contentunderyes',
              hint: l => l.contentunderyesp1,
            },
          },
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
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
