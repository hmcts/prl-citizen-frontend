import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Details of without notice hearing',
  line1: 'Give details of why you’re asking for a without notice hearing',
  hint: 'A judge will need to be sure that there is a good reason why the other people in the application should not be told about the application before the hearing takes place.',
  doYouNeedAWithoutNoticeHearingLabel:
    'Are you asking for a without notice hearing because the other person or people may do something that would obstruct the order you are asking for if they knew about the application?',
  doYouRequireAHearingWithReducedNoticeLabel:
    'Are you asking for a without notice hearing because there is literally no time to give notice of the application to the other person or people?',
  doYouRequireAHearingWithReducedNoticeHint:
    'This may be relevant in cases of exceptional urgency where the order is needed to prevent a threatened wrongful act. In some cases you may still be expected to have tried to give informal notice for example by telephone, text message, or email.',
  one: 'Yes',
  two: 'No',
  provideDetails: 'Provide details',
  errors: {
    reasonsForApplicationWithoutNotice: {
      required: 'Enter details',
    },
    doYouNeedAWithoutNoticeHearing: {
      required: 'Select yes if the other person may obstruct',
    },
    doYouRequireAHearingWithReducedNotice: {
      required: "Select yes if there's no time to give notice",
    },
    doYouNeedAWithoutNoticeHearingDetails: {
      required: 'Enter details',
    },
    doYouRequireAHearingWithReducedNoticeDetails: {
      required: 'Enter details',
    },
  },
});

const cy = () => ({
  title: 'Details of without notice hearing - welsh',
  line1: 'Give details of why you’re asking for a without notice hearing - welsh',
  hint: 'A judge will need to be sure that there is a good reason why the other people in the application should not be told about the application before the hearing takes place. - welsh',
  doYouNeedAWithoutNoticeHearingLabel:
    'Are you asking for a without notice hearing because the other person or people may do something that would obstruct the order you are asking for if they knew about the application? - welsh',
  doYouRequireAHearingWithReducedNoticeLabel:
    'Are you asking for a without notice hearing because there is literally no time to give notice of the application to the other person or people? - welsh',
  doYouRequireAHearingWithReducedNoticeHint:
    'This may be relevant in cases of exceptional urgency where the order is needed to prevent a threatened wrongful act. In some cases you may still be expected to have tried to give informal notice for example by telephone, text message, or email. - welsh',
  one: 'Yes - welsh',
  two: 'No - welsh',
  provideDetails: 'Provide details -welsh',
  errors: {
    reasonsForApplicationWithoutNotice: {
      required: 'Enter details - welsh',
    },
    doYouNeedAWithoutNoticeHearing: {
      required: 'Select yes if the other person may obstruct - welsh',
    },
    doYouRequireAHearingWithReducedNotice: {
      required: "Select yes if there's no time to give notice - welsh",
    },
    doYouNeedAWithoutNoticeHearingDetails: {
      required: 'Enter details - welsh',
    },
    doYouRequireAHearingWithReducedNoticeDetails: {
      required: 'Enter details - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    reasonsForApplicationWithoutNotice: {
      type: 'textarea',
      validator: value => isFieldFilledIn(value),
    },
    doYouNeedAWithoutNoticeHearing: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.doYouNeedAWithoutNoticeHearingLabel,
      labelSize: 'm',
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
          subFields: {
            doYouNeedAWithoutNoticeHearingDetails: {
              type: 'textarea',
              label: l => l.provideDetails,
              labelSize: null,
              validator: value => isFieldFilledIn(value),
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
    doYouRequireAHearingWithReducedNotice: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.doYouRequireAHearingWithReducedNoticeLabel,
      labelSize: 'm',
      hint: l => l.doYouRequireAHearingWithReducedNoticeHint,
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
          subFields: {
            doYouRequireAHearingWithReducedNoticeDetails: {
              type: 'textarea',
              label: l => l.provideDetails,
              labelSize: null,
              validator: value => isFieldFilledIn(value),
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
