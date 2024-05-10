import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

export const en = {
  section: 'Respond to allegations of harm and violence',
  title: 'Respond to the allegations',
  suggestionLabel_1:
    'Give your response to each of the points made by the applicant. Try to explain what happened as best you can.',
  suggestionLabel_2: 'You will have the chance to give a more detailed statement later in court.',
  suggestionLabel_3: 'Include any evidence that is relevant to the allegations.',
  respondToAohTitle: 'Your response',
  respondToAohHint: 'Include times, dates and details of what happened.',
  continue: 'Save and continue',
  errors: {
    detailsKnown: {
      required: 'You must give details if you want to respond to the allegations',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

export const cy: typeof en = {
  section: 'Ymateb i honiadau o niwed a thrais',
  title: 'Ymateb i’r honiadau',
  suggestionLabel_1:
    'Rhowch eich ymateb i bob un o’r pwyntiau a wnaed gan y ceisydd. Ceisiwch egluro beth ddigwyddodd y gorau y gallwch chi.',
  suggestionLabel_2: 'Cewch gyfle i roi datganiad manylach yn nes ymlaen yn y llys.',
  suggestionLabel_3: 'Dylech gynnwys unrhyw dystiolaeth sy’n berthnasol i’r honiadau.',
  respondToAohTitle: 'Eich ymateb',
  respondToAohHint: 'Dylech gynnwys amseroedd, dyddiadau a manylion beth ddigwyddodd.',
  continue: 'Cadw a pharhau',
  errors: {
    detailsKnown: {
      required: 'Mae’n rhaid i chi roi manylion os ydych eisiau ymateb i’r honiadau',
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
    your_response_to_aoh: {
      type: 'textarea',
      label: l => l.respondToAohTitle,
      labelSize:'m',
      hint: l => l.hint,
      validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
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
