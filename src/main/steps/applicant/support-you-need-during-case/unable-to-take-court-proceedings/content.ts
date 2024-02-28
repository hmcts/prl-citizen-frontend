import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

console.info('** FOR SONAR **');

const en = {
  section: 'Reasonable adjustments',
  title: 'Is there a reason you are unable to take part in the court proceedings?',
  courtcommunication: 'For example, do you have a disability that would prevent you from attending court in person?',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  provideDetails: 'Provide details',
  one: 'Yes',
  two: 'No',
  continue: 'Continue',
  errors: {
    unableForCourtProceedings: {
      required: 'Please select an answer',
    },
    courtProceedingProvideDetails: {
      required: 'Please provide the details',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy: typeof en = {
  section: 'Addasiadau rhesymol',
  title: 'Rwyf angen rhywbeth i wneud i mi deimlo’n gyfforddus yn ystod gwrandawiad llys',
  courtcommunication:
    'Meddyliwch am yr hyn y byddwch ei angen os bydd eich gwrandawiad yn un wyneb yn wyneb, trwy fideo neu dros y ffôn.',
  optionHint: 'Dogfennau mewn lliw penodol',
  summaryText: 'Cysylltiadau am gymorth',
  provideDetails: 'Rhowch fanylion',
  one: 'Yes',
  two: 'No',
  continue: 'Parhau',
  errors: {
    unableForCourtProceedings: {
      required: 'Dewiswch ateb, os gwelwch yn dda',
    },
    courtProceedingProvideDetails: {
      required: 'Rhowch fanylion',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    unableForCourtProceedings: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      hint: l => l.twoHint,
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
          subFields: {
            courtProceedingProvideDetails: {
              type: 'textarea',
              label: l => l.provideDetails,
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
