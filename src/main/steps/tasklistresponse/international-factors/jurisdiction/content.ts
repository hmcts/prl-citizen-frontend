import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

const en = {
  title: 'Could another person in the application apply for a similar order in a country outside England or Wales?',
  one: 'Yes',
  two: 'No',
  twoHint:
    'For example, because a court in another country has the power (jurisdiction) to make decisions or judgments.',
  continue: 'Continue',
  provideDetails: 'Provide details',
  errors: {
    jurisdiction: {
      required:
        'Select yes if another person in the application could apply for a similar order in a country outside England or Wales',
    },
    iFactorsJurisdictionProvideDetails: {
      required:
        'Provide details about another person in the application applying for a similar order in a country outside England or Wales',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

const cy: typeof en = {
  title: 'A allai rhywun arall yn y cais wneud cais am orchymyn tebyg mewn gwlad y tu allan i Gymru neu Loegr?',
  one: 'Gallai',
  two: 'Na allai',
  twoHint:
    'Er enghraifft, am fod gan lys mewn gwlad arall y pŵer (awdurdodaeth) i wneud penderfyniadau neu ddyfarniadau.',
  continue: 'Parhau',
  provideDetails: 'Rhowch fanylion',
  errors: {
    jurisdiction: {
      required:
        "Dewiswch 'Gallai' os all unigolyn arall yn y cais wneud cais am orchymyn tebyg mewn gwlad y tu allan i Gymru neu Loegr?",
    },
    iFactorsJurisdictionProvideDetails: {
      required:
        'Rhowch fanylion am rywun arall yn y cais sy’n gwneud cais am orchymyn tebyg mewn gwlad y tu allan i Gymru neu Loegr',
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
    jurisdiction: {
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
            iFactorsJurisdictionProvideDetails: {
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
