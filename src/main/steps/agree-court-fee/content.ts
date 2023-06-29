import { YesOrNo } from '../../app/case/definition';
import { TranslationFn } from '../../app/controller/GetController';
import { FormContent } from '../../app/form/Form';
import { isFieldFilledIn } from '../../app/form/validation';
import { getMOJForkingScreenUrl } from '../../steps/urls';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Do you agree to pay the court fee online using a debit or credit card?',
  paragraph:
    "If you've applied for help with paying court fees, you'll be given a reference number. You can provide this at the end of the process instead of making a payment.",
  yes: 'Yes',
  no: 'No',
  cancel: 'Cancel',
  errors: {
    applicationPayOnline: {
      required: 'Please select an answer to the below question',
    },
  },
});

const cy = () => ({
  title: 'Ydych chi’n cytuno i dalu ffi’r llys ar-lein gan ddefnyddio cerdyn debyd neu gredyd?',
  paragraph:
    'Os ydych wedi gwneud cais am help i dalu ffioedd llys, fe roddir cyfeirnod i chi.Gallwch ei nodi ar ddiwedd y broses yn hytrach na gwneud taliad.',
  yes: 'Ydw',
  no: 'Nac ydw',
  cancel: 'Canslo',
  errors: {
    applicationPayOnline: {
      required: 'Please select an answer to the below question - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    applicationPayOnline: {
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
