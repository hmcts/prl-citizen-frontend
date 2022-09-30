import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  lvTitle: 'Do you have valid reasons for not attending a MIAM?',
  lvparagraph1: 'You must attend a MIAM before making an application unless you have valid reasons not to attend.',
  lvparagraph2: "If you're unsure, you can check the ",
  applyForLvrLink:
    '<a href="https://www.justice.gov.uk/courts/procedure-rules/family/practice_directions/pd_part_03a" class="govuk-link" target="_blank" aria-label="list of valid reasons">list of valid reasons</a>',
  lvparagraph3: '.',
  lvparagraph4:
    "If you're claiming that you have valid reasons not to attend a MIAM, the court will need more information from you.",
  one: 'Yes',
  two: 'No',
  errors: {
    valid_reason: {
      required: 'Select yes if you have attended a Mediation Information and Assessment Meeting(MIAM)',
    },
  },
});

const cy = () => ({
  lvTitle: 'Do you have valid reasons for not attending a MIAM? - Welsh',
  lvparagraph1:
    'You must attend a MIAM before making an application unless you have valid reasons not to attend. - Welsh',
  lvparagraph2: "If you're unsure, you can check the ",
  applyForLvrLink:
    '<a href="https://www.justice.gov.uk/courts/procedure-rules/family/practice_directions/pd_part_03a" class="govuk-link" target="_blank" aria-label="list of valid reasons">list of valid reasons</a>',
  lvparagraph3: '. - Welsh',
  lvparagraph4:
    "If you're claiming that you have valid reasons not to attend a MIAM, the court will need more information from you. - Welsh",
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  errors: {
    valid_reason: {
      required: 'Select yes if you have attended a Mediation Information and Assessment Meeting(MIAM) - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    valid_reason: {
      type: 'radios',
      classes: 'govuk-radios',
      // label: l => l.label,
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
