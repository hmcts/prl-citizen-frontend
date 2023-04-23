import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';

const en = () => ({
  serviceName: 'Child Arrangements',
  title: 'Safety Concerns',
  headingTitle: 'Do you have any concerns for your safety or the safety of the children?',
  paragraph1: '<p> You may have concerns about current, or future safety. </p>',
  paragraph2:
    '<p> If you or the children have experienced abuse or feel unsafe, support is available. <a href="https://www.gov.uk/guidance/domestic-abuse-how-to-get-help" class="govuk-link" target="_blank" aria-label="See a list of organisations that can help">See a list of organisations that can help</a>. </p>',
  identifySignsOfChildAbuseHyperlink: 'https://www.nspcc.org.uk/what-is-child-abuse/types-of-abuse/',
  identifySignsOfChildAbuseLabel: 'Identify signs of child abuse',
  identifySignsOfDomesticAbuseHyperlink: 'https://supportnav.org.uk/what-is-domestic-abuse',
  identifySignsOfDomesticAbuseLabel: 'Identify signs of domestic abuse',
  infoSafetyConcernsYes:
    'The information you give will be considered as part of your application. If you need to make <a href="https://www.gov.uk/injunction-domestic-violence" class="govuk-link" target="_blank" aria-label="an application for a domestic abuse injunction">an application for a domestic abuse injunction</a>. you can do this separately.',
  warningMessage:
    'You may find some of these questions difficult or upsetting to answer. Take your time and complete them as best you can.',
  yesHaveSafetyConcerns: 'Yes',
  noHaveSafetyConcerns: 'No',
  errors: {
    c1A_haveSafetyConcerns: {
      required: 'Select yes if you have any concerns for your safety or the safety of the children',
    },
  },
});

const cy = () => ({
  serviceName: 'Child Arrangements - Welsh',
  title: 'Safety Concerns - Welsh',
  headingTitle: 'Do you have any concerns for your safety or the safety of the children? - Welsh',
  paragraph1: '<p> You may have concerns about current, or future safety. </p> - Welsh',
  paragraph2:
    '<p> If you or the children have experienced abuse or feel unsafe, support is available. <a href="https://www.gov.uk/guidance/domestic-abuse-how-to-get-help" class="govuk-link" target="_blank" aria-label="See a list of organisations that can help">See a list of organisations that can help</a>. </p> - Welsh',
  listOfOrganisationsHyperlink: 'https://www.gov.uk/guidance/domestic-abuse-how-to-get-help - Welsh',
  listOfOrganisationLabel: 'See a list of organisations that can help. - Welsh',
  identifySignsOfChildAbuseHyperlink: 'https://www.nspcc.org.uk/what-is-child-abuse/types-of-abuse/ - Welsh',
  identifySignsOfChildAbuseLabel: 'Identify signs of child abuse - Welsh',
  identifySignsOfDomesticAbuseHyperlink: 'https://supportnav.org.uk/what-is-domestic-abuse - Welsh',
  identifySignsOfDomesticAbuseLabel: 'Identify signs of domestic abuse - Welsh',
  infoSafetyConcernsYes:
    'The information you give will be considered as part of your application. If you need to make <a href="https://www.gov.uk/injunction-domestic-violence" class="govuk-link" target="_blank" aria-label="an application for a domestic abuse injunction">an application for a domestic abuse injunction</a>. you can do this separately. - Welsh',
  warningMessage:
    'You may find some of these questions difficult or upsetting to answer. Take your time and complete them as best you can. - Welsh',
  yesHaveSafetyConcerns: 'Yes - Welsh',
  noHaveSafetyConcerns: 'No - Welsh',
  errors: {
    c1A_haveSafetyConcerns: {
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
    paragraph1: {
      type: 'textAndHtml',
      textAndHtml: l => l.paragraph1,
    },
    paragraph2: {
      type: 'textAndHtml',
      textAndHtml: l => l.paragraph2,
    },
    warningMessage: {
      type: 'warning',
      label: l => l.warningMessage,
    },
    c1A_haveSafetyConcerns: {
      type: 'radios',
      classes: 'govuk-radios',
      section: l => l.section,
      values: [
        {
          label: l => l.yesHaveSafetyConcerns,
          value: YesOrNo.YES,
          subFields: {
            doYouHaveSafetyConcernsYesInfo: {
              type: 'textAndHtml',
              textAndHtml: l => l.infoSafetyConcernsYes,
            },
          },
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
