import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../../app/form/validation';

export const en = {
  section: 'Safety concerns',
  title: 'Do you have any other concerns about the children’s safety and wellbeing?',
  hint: 'For example, their basic needs are not being met (known as child neglect) or you’re worried about someone they may have contact with.',
  one: 'Yes',
  two: 'No',
  summaryText: 'Contacts for help',
  errors: {
    c1A_childSafetyConcerns: {
      required: 'Select yes if you have other concerns about the children’s safety and wellbeing',
    },
    c1A_childSafetyConcernsDetails: {
      required: 'Describe what concerns you have about the children’s safety and wellbeing',
    },
  },
};

export const cy: typeof en = {
  section: 'Safety concerns',
  title: 'Do you have any other concerns about the children’s safety and wellbeing?',
  hint: 'For example, their basic needs are not being met (known as child neglect) or you’re worried about someone they may have contact with.',
  one: 'Yes',
  two: 'No',
  summaryText: 'Contacts for help',
  errors: {
    c1A_childSafetyConcerns: {
      required: 'Select yes if you have other concerns about the children’s safety and wellbeing - welsh',
    },
    c1A_childSafetyConcernsDetails: {
      required: 'Describe what concerns you have about the children’s safety and wellbeing - welsh',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    c1A_childSafetyConcerns: {
      id: 'c1A_childSafetyConcerns',
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      hint: l => l.hint,
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
          subFields: {
            c1A_childSafetyConcernsDetails: {
              type: 'textarea',
              label:
                'Describe in a few sentences the nature of the behaviour that you want the court to be aware of. Explain who is involved, and if the behaviour is ongoing.',
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
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
