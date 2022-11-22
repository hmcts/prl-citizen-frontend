import { YesOrNo } from 'app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
//import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';

const en = {
  section: 'Safety concerns',
  title: 'Briefly describe the physical abuse if you feel able to',
  behaviourDetailsLabel: 'Describe the behaviours you would like the court to be aware of. (optional)',
  behaviourDetailsHintText:
    'Keep your answer brief. You will have a chance to give more detail to the court later in the proceedings.',
  behaviourStartDateLabel: 'When did this behaviour start and how long did it continue? (optional)',
  behaviourStartDateHintText: 'This does not need to be an exact date.',
  isOngoingBehaviourLabel: 'Is the behaviour ongoing? (optional)',
  isOngoingBehaviourHint:
    '<p class="govuk-body" for="respabuseongoing-hint">Contact 999 if there is an emergency. If it\'s not an emergency, <a href="https://www.gov.uk/report-domestic-abuse" class="govuk-link" rel="external" target="_blank">contact one of the suggested agencies</a> to get help or report the behaviour with <a href="https://www.police.uk/" class="govuk-link" rel="external" target="_blank">your local policing team</a>.</p>',
  YesOptionLabel: 'Yes',
  NoOptionLabel: 'No',
  seekHelpFromPersonOrAgencyLabel: 'Have you ever asked for help from a professional person or agency? (optional)',
  seekHelpFromPersonOrAgencyHintText: 'For example, speaking to your local GP.',
  seekHelpDetailsYesHint: `<p class="govuk-body">Indicate who you sought help from, and what they did to help (optional). </p>
  <p class="govuk-body">Do not include personal details such as names and addresses.</p>`,
  seekHelpDetailsNoHint:
    '<p class="govuk-body">See the <a href="https://www.gov.uk/guidance/domestic-abuse-how-to-get-help" class="govuk-link" rel="external" target="_blank">GOV.UK guidance</a> if you are unsure how to get help.</p>',
  onlycontinue: 'Continue ',
  saveAndComeLater:'Save and come back later'
};

const cy: typeof en = {
    section: 'Safety concerns - in welsh',
    title: 'Briefly describe the physical abuse if you feel able to - in welsh',
    behaviourDetailsLabel: 'Describe the behaviours you would like the court to be aware of. (optional) - in welsh',
    behaviourDetailsHintText:
      'Keep your answer brief. You will have a chance to give more detail to the court later in the proceedings. - in welsh',
    behaviourStartDateLabel: 'When did this behaviour start and how long did it continue? (optional) - in welsh',
    behaviourStartDateHintText: 'This does not need to be an exact date. - in welsh',
    isOngoingBehaviourLabel: 'Is the behaviour ongoing? (optional) - in welsh',
    isOngoingBehaviourHint:
      '<p class="govuk-body" for="respabuseongoing-hint">Contact 999 if there is an emergency. If it\'s not an emergency, <a href="https://www.gov.uk/report-domestic-abuse" class="govuk-link" rel="external" target="_blank">contact one of the suggested agencies</a> to get help or report the behaviour with <a href="https://www.police.uk/" class="govuk-link" rel="external" target="_blank">your local policing team</a>.</p>',
    YesOptionLabel: 'Yes - in welsh',
    NoOptionLabel: 'No - in welsh',
    seekHelpFromPersonOrAgencyLabel: 'Have you ever asked for help from a professional person or agency? (optional) - in welsh',
    seekHelpFromPersonOrAgencyHintText: 'For example, speaking to your local GP. - in welsh',
    seekHelpDetailsYesHint: `<p class="govuk-body">Indicate who you sought help from, and what they did to help (optional). </p>
    <p class="govuk-body">Do not include personal details such as names and addresses.</p>`,
    seekHelpDetailsNoHint:
      '<p class="govuk-body">See the <a href="https://www.gov.uk/guidance/domestic-abuse-how-to-get-help" class="govuk-link" rel="external" target="_blank">GOV.UK guidance</a> if you are unsure how to get help.</p>',
    onlycontinue: 'Continue - in welsh', 
    saveAndComeLater:'Save and come back later - in welsh'
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    selfphysicalbehaviourDetails: {
        type: 'textarea',
        labelSize: 's',
        label: l => l.behaviourDetailsLabel,
        hint: l => l.behaviourDetailsHintText,
        //value: data.behaviourDetails,
        attributes: {
          rows: 4,
        },
      },
      selfphysicalbehaviourStartDate: {
        type: 'textarea',
        labelSize: 's',
        label: l => l.behaviourStartDateLabel,
        hint: l => l.behaviourStartDateHintText,
        //value: data.behaviourStartDate,
        attributes: {
          rows: 2,
        },
      },
      selfphysicalisOngoingBehaviour: {
        type: 'radios',
        classes: 'govuk-radios',
        label: l => l.isOngoingBehaviourLabel,
        labelSize: 's',
        values: [
          {
            label: l => l.YesOptionLabel,
            value: YesOrNo.YES,
            conditionalText: l => l.isOngoingBehaviourHint,
          },
          {
            label: l => l.NoOptionLabel,
            value: YesOrNo.NO,
          },
        ],
      },
      selfphysicalseekHelpFromPersonOrAgency: {
        type: 'radios',
        classes: 'govuk-radios',
        label: l => l.seekHelpFromPersonOrAgencyLabel,
        hint: l => l.seekHelpFromPersonOrAgencyHintText,
        labelSize: 's',
        values: [
          {
            label: l => l.YesOptionLabel,
            value: YesOrNo.YES,
            subFields: {
                selfphysicalseekHelpDetails: {
                type: 'textarea',
                //value: data.seekHelpDetails,
                hint: l => l.seekHelpDetailsYesHint,
              },
            },
          },
          {
            label: l => l.NoOptionLabel,
            value: YesOrNo.NO,
            conditionalText: l => l.seekHelpDetailsNoHint,
          },
        ],
      },
  },
  onlyContinue: {
    text: l => l.onlycontinue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
