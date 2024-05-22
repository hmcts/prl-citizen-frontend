import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { RESPOND_TO_APPLICATION } from '../../../../steps/urls';

export const en = {
  caption: 'Respond to allegations of harm and violence',
  title: 'Respond to the allegations',
  content1:
    'Give your response to each of the points made by the applicant. Try to explain what happened as best you can.',
  content2: 'You will have the chance to give a more detailed statement later in court.',
  content3: 'Include any evidence that is relevant to the allegations.',
  responseToAohLabel: 'Your response',
  responseToAohHint: 'Include times, dates and details of what happened.',
  errors: {
    aoh_responseToAllegations: {
      required: 'You must give details if you want to respond to the allegations',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
};

export const cy: typeof en = {
  caption: 'Ymateb i honiadau o niwed a thrais',
  title: 'Ymateb i’r honiadau',
  content1:
    'Rhowch eich ymateb i bob un o’r pwyntiau a wnaed gan y ceisydd. Ceisiwch egluro beth ddigwyddodd y gorau y gallwch chi.',
  content2: 'Cewch gyfle i roi datganiad manylach yn nes ymlaen yn y llys.',
  content3: 'Dylech gynnwys unrhyw dystiolaeth sy’n berthnasol i’r honiadau.',
  responseToAohLabel: 'Eich ymateb',
  responseToAohHint: 'Dylech gynnwys amseroedd, dyddiadau a manylion beth ddigwyddodd.',
  errors: {
    aoh_responseToAllegations: {
      required: 'Mae’n rhaid i chi roi manylion os ydych eisiau ymateb i’r honiadau',
      invalidCharacters: 'Rydych wedi defnyddio nod annilys. Ni chaniateir y nodau arbennig hyn <,>,{,}',
      invalid:
        'Rydych wedi defnyddio mwy o nodau na’r hyn a ganiateir yn y blwch testun rhydd. Defnyddiwch 5,000 neu lai o nodau.',
    },
  },
};

export const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    aoh_responseToAllegations: {
      type: 'textarea',
      label: l => l.responseToAohLabel,
      labelSize: 'm',
      hint: l => l.responseToAohHint,
      validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
    },
  },
  onlyContinue: {
    text: l => l.continue,
  },
  link: {
    classes: 'govuk-!-margin-left-3',
    href: RESPOND_TO_APPLICATION,
    text: l => l.cancel,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];

  return {
    ...translations,
    form,
  };
};
