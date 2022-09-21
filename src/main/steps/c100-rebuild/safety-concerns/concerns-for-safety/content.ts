import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

const en = () => ({
  serviceName: 'Child Arrangements',
  title: 'Safety Concerns',
  headingTitle: 'Do you have any concerns for your safety or the safety of the children?',
  paragraph1: 'You may have concerns about current, or future safety.',
  paragraph2: 'If you or the children have experienced abuse or feel unsafe, support is available. ',
  listOfOrganisationsHyperlink: 'https://www.gov.uk/guidance/domestic-abuse-how-to-get-help',
  listOfOrganisationLabel: 'See a list of organisations that can help.',
  identifySignsOfChildAbuseHyperlink: 'https://www.nspcc.org.uk/what-is-child-abuse/types-of-abuse/',
  identifySignsOfChildAbuseLabel: 'Identify signs of child abuse',
  identifySignsOfDomesticAbuseHyperlink: 'https://supportnav.org.uk/what-is-domestic-abuse',
  identifySignsOfDomesticAbuseLabel: 'Identify signs of domestic abuse',
  warningText: {
    text: 'You may find some of these questions difficult or upsetting to answer. Take your time and complete them as best you can.',
    iconFallbackText: 'Warning',
  },
  yesHaveSafetyConcerns: 'Yes',
  noHaveSafetyConcerns: 'No',
  errors: {
    haveSafetyConcerns: {
      required: 'Select yes if you have any concerns for your safety or the safety of the children',
    },
  },
});

const cy = () => ({
  serviceName: 'Child Arrangements - Welsh',
  title: 'Safety Concerns - Welsh',
  headingTitle: 'Do you have any concerns for your safety or the safety of the children? - Welsh',
  paragraph1: 'You may have concerns about current, or future safety. - Welsh',
  paragraph2: 'If you or the children have experienced abuse or feel unsafe, support is available.  - Welsh',
  listOfOrganisationsHyperlink: 'https://www.gov.uk/guidance/domestic-abuse-how-to-get-help - Welsh',
  listOfOrganisationLabel: 'See a list of organisations that can help. - Welsh',
  identifySignsOfChildAbuseHyperlink: 'https://www.nspcc.org.uk/what-is-child-abuse/types-of-abuse/ - Welsh',
  identifySignsOfChildAbuseLabel: 'Identify signs of child abuse - Welsh',
  identifySignsOfDomesticAbuseHyperlink: 'https://supportnav.org.uk/what-is-domestic-abuse - Welsh',
  identifySignsOfDomesticAbuseLabel: 'Identify signs of domestic abuse - Welsh',
  warningText: {
    text: 'You may find some of these questions difficult or upsetting to answer. Take your time and complete them as best you can. - Welsh',
    iconFallbackText: 'Warning',
  },
  yesHaveSafetyConcerns: 'Yes - Welsh',
  noHaveSafetyConcerns: 'No - Welsh',
  errors: {
    haveSafetyConcerns: {
      required: 'Select yes if you have any concerns for your safety or the safety of the children - Welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    haveSafetyConcerns: {
      type: 'radios',
      classes: 'govuk-radios',
      section: l => l.section,
      values: [
        {
          label: l => l.yesHaveSafetyConcerns,
          value: YesOrNo.YES,
        },
        {
          label: l => l.noHaveSafetyConcerns,
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
