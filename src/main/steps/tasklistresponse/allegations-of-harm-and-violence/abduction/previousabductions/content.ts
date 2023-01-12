import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../../app/form/validation';
import { generateContent as parentContent } from '../content';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  caption: 'Safety concerns',
  title: 'Provide details of the previous abductions',
  line1: 'Give a short description of the previous incidents of abduction.',
  c1A_previousAbductionsShortDescHint: 'Include any previous attempts to threaten or abduct the children.',
  c1A_policeOrInvestigatorInvolved: 'Were the police, private investigators or any other organisation involved?',
  c1A_policeOrInvestigatorInvolvedHint: 'Including in the UK or overseas.',
  one: 'Yes',
  two: 'No',
  otherDetails: 'Provide more details',
  errors: {
    PRL_c1A_previousAbductionsShortDesc: {
      required: 'Briefly describe the previous incidents of abduction',
    },
    PRL_c1A_policeOrInvestigatorInvolved: {
      required: 'Select yes if the police, private investigators or any other organisation was involved',
    },
    PRL_c1A_policeOrInvestigatorOtherDetails: {
      required: 'Provide details of the police, private investigators or any other organisation involvement',
    },
  },
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cy = () => ({
  caption: 'Safety concerns - welsh',
  title: 'Provide details of the previous abductions - welsh',
  line1: 'Give a short description of the previous incidents of abduction. - welsh',
  c1A_previousAbductionsShortDescHint: 'Include any previous attempts to threaten or abduct the children. - welsh',
  c1A_policeOrInvestigatorInvolved:
    'Were the police, private investigators or any other organisation involved? - welsh',
  c1A_policeOrInvestigatorInvolvedHint: 'Including in the UK or overseas. - welsh',
  one: 'Yes - welsh',
  two: 'No - welsh',
  otherDetails: 'Provide more details - welsh',
  errors: {
    PRL_c1A_previousAbductionsShortDesc: {
      required: 'Briefly describe the previous incidents of abduction - welsh',
    },
    PRL_c1A_policeOrInvestigatorInvolved: {
      required: 'Select yes if the police, private investigators or any other organisation was involved - welsh',
    },
    PRL_c1A_policeOrInvestigatorOtherDetails: {
      required: 'Provide details of the police, private investigators or any other organisation involvement - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    PRL_c1A_previousAbductionsShortDesc: {
      type: 'textarea',
      name: 'PRL_c1A_previousAbductionsShortDesc',
      hint: l => l.c1A_previousAbductionsShortDescHint,
      validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
    },
    PRL_c1A_policeOrInvestigatorInvolved: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.c1A_policeOrInvestigatorInvolved,
      labelSize: 'm',
      hint: l => l.c1A_policeOrInvestigatorInvolvedHint,
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
          subFields: {
            PRL_c1A_policeOrInvestigatorOtherDetails: {
              type: 'textarea',
              label: l => l.otherDetails,
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
    text: l => l.onlyContinue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    ...parentContent(content),
    form,
  };
};
