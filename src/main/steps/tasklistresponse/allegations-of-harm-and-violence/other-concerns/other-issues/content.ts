import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../../app/form/validation';
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  section: 'Safety concerns',
  title: 'Do you have any other concerns about the children’s safety and wellbeing?',
  hint: 'For example, their basic needs are not being met (known as child neglect) or you’re worried about someone they may have contact with.',
  one: 'Yes',
  two: 'No',
  summaryText: 'Contacts for help',
  errors: {
    PRL_c1A_childSafetyConcerns: {
      required: 'Select yes if you have other concerns about the children’s safety and wellbeing',
    },
    PRL_c1A_childSafetyConcernsDetails: {
      required: 'Describe what concerns you have about the children’s safety and wellbeing',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
});
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = () => ({
  section: 'Pryderon diogelwch',
  title: 'A oes gennych chi unrhyw bryderon eraill am ddiogelwch a lles y plant?',
  hint: "Er enghraifft, nid yw eu hanghenion sylfaenol yn cael eu diwallu (a elwir yn esgeuluso plant) neu rydych chi'n poeni am rywun y gallai fod ganddynt gysylltiad â nhw.",
  one: 'Oes',
  two: 'Nac oes',
  summaryText: 'Cysylltiadau am gymorth',
  errors: {
    PRL_c1A_childSafetyConcerns: {
      required: 'Select yes if you have other concerns about the children’s safety and wellbeing - welsh',
    },
    PRL_c1A_childSafetyConcernsDetails: {
      required: 'Describe what concerns you have about the children’s safety and wellbeing - welsh',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed. (welsh)',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    PRL_c1A_childSafetyConcerns: {
      id: 'PRL_c1A_childSafetyConcerns',
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
            PRL_c1A_childSafetyConcernsDetails: {
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
  onlyContinue: {
    text: l => l.onlyContinue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
