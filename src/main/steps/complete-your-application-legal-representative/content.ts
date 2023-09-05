import { YesOrNo } from '../../app/case/definition';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';
import { getMOJForkingScreenUrl } from '../../steps/urls';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Do you want your legal representative to complete the application for you?',
  yes: 'Yes',
  no: 'No',
  cancel: 'Cancel',
  errors: {
    legalRepresentativeForApplication: {
      required: 'Please select an answer to the below question',
    },
  },
});

const cy = () => ({
  title: "Ydych chi eisiau i’ch cynrychiolydd cyfreithiol gwblhau'r cais ar eich rhan?",
  yes: 'Ydw',
  no: 'Nac ydw',
  cancel: 'Canslo',
  errors: {
    legalRepresentativeForApplication: {
      required: 'Dewiswch ateb i’r cwestiwn isod',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    legalRepresentativeForApplication: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
        },
        {
          label: l => l.no,
          value: YesOrNo.NO,
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.onlycontinue,
  },
  link: {
    classes: 'govuk-!-margin-left-3',
    href: '#',
    text: l => l.cancel,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const testingSupport = content.additionalData?.req?.session?.testingSupport;

  return {
    ...translations,
    form: {
      ...form,
      link: {
        ...form.link,
        href: getMOJForkingScreenUrl(testingSupport),
      },
    },
  };
};
