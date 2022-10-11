import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Are you asking for a without notice hearing?',
  line1:
    'Hearings which take place without notice to the other people will only be justified where your case is exceptionally urgent, or there is good reason not to tell the other people about your application (either because they could take steps to obstruct the application or because doing so may expose you or the children to a risk of harm).',
  warningText: {
    text: 'If you ask for a without notice hearing, the court may require you to attend on the same day as you submit your application. They will contact you to tell you when you need to go to the court.',
    iconFallbackText: 'Warning',
  },
  one: 'Yes',
  two: 'No',
  errors: {
    hwn_hearingPart1: {
      required: "Select yes if you're asking for a without notice",
    },
  },
});

const cy = () => ({
  title: 'Are you asking for a without notice hearing? - welsh',
  line1:
    'Hearings which take place without notice to the other people will only be justified where your case is exceptionally urgent, or there is good reason not to tell the other people about your application (either because they could take steps to obstruct the application or because doing so may expose you or the children to a risk of harm). - welsh',
  warningText: {
    text: 'If you ask for a without notice hearing, the court may require you to attend on the same day as you submit your application. They will contact you to tell you when you need to go to the court. - welsh',
    iconFallbackText: 'Warning',
  },
  one: 'Yes - welsh',
  two: 'No - welsh',
  errors: {
    hwn_hearingPart1: {
      required: "Select yes if you're asking for a without notice - welsh",
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    hwn_hearingPart1: {
      type: 'radios',
      classes: 'govuk-radios',
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
