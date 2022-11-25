/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  title: 'Details of without notice hearing',
  subTitle: 'Give details of why you’re asking for a without notice hearing',
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
    hwn_reasonsForApplicationWithoutNotice: {
      required: 'Enter details',
    },
    hwn_doYouNeedAWithoutNoticeHearing: {
      required: 'Select yes if the other person may obstruct',
    },
    hwn_doYouRequireAHearingWithReducedNotice: {
      required: "Select yes if there's no time to give notice",
    },
    hwn_doYouNeedAWithoutNoticeHearingDetails: {
      required: 'Enter details',
    },
    hwn_doYouRequireAHearingWithReducedNoticeDetails: {
      required: 'Enter details',
    },
  },
});

export const cy = () => ({
  title: 'Manylion y gwrandawiad heb rybudd',
  subTitle: 'Rhowch fanylion pam rydych yn gofyn am wrandawiad heb rybudd',
  hint: "Bydd angen i farnwr fod yn sicr bod rheswm da na ddylid dweud wrth bobl eraill sydd ynghlwm â’r cais am y cais cyn i'r gwrandawiad ddigwydd.",
  doYouNeedAWithoutNoticeHearingLabel:
    "Ydych chi'n gofyn am wrandawiad heb rybudd am gall yr unigolyn neu unigolion arall / eraill wneud rhywbeth a fyddai'n rhwystro'r gorchymyn rydych chi'n gofyn amdano pe bydden nhw yn gwybod am y cais?",
  doYouRequireAHearingWithReducedNoticeLabel:
    "Ydych chi'n gofyn am wrandawiad heb rybudd oherwydd, yn llythrennol, nad oes amser i chi roi hysbysiad o gais i'r unigolyn arall / unigolion eraill?",
  doYouRequireAHearingWithReducedNoticeHint:
    'Gall hyn fod yn berthnasol mewn achosion lle mae brys eithriadol a lle mae angen y gorchymyn i atal drwgweithred y bygythiwyd ei chyflawni. Mewn rhai achosion efallai y bydd disgwyl i chi fod wedi ceisio rhoi rhybudd anffurfiol er enghraifft dros y ffôn, neges destun, neu e-bost.',
  one: 'Ydw',
  two: 'Nac ydw',
  provideDetails: 'Rhowch fanylion',
  errors: {
    hwn_reasonsForApplicationWithoutNotice: {
      required: 'Enter details - welsh',
    },
    hwn_doYouNeedAWithoutNoticeHearing: {
      required: 'Select yes if the other person may obstruct - welsh',
    },
    hwn_doYouRequireAHearingWithReducedNotice: {
      required: "Select yes if there's no time to give notice - welsh",
    },
    hwn_doYouNeedAWithoutNoticeHearingDetails: {
      required: 'Enter details - welsh',
    },
    hwn_doYouRequireAHearingWithReducedNoticeDetails: {
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
    hwn_reasonsForApplicationWithoutNotice: {
      type: 'textarea',
      hint: l => l.hint,
      validator: value => isFieldFilledIn(value),
    },
    hwn_doYouNeedAWithoutNoticeHearing: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.doYouNeedAWithoutNoticeHearingLabel,
      labelSize: 'm',
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
          subFields: {
            hwn_doYouNeedAWithoutNoticeHearingDetails: {
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
    hwn_doYouRequireAHearingWithReducedNotice: {
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
            hwn_doYouRequireAHearingWithReducedNoticeDetails: {
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
