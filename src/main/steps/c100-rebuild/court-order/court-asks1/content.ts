import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'What are you asking the court to do?',
  select_all_apply: 'Select all that apply',
  whoChildLiveWith: 'Decide who the children live with and when',
  childTimeSpent: 'Decide how much time the children spend with each person',
  stopOtherPeopleDoingSomething: 'Stop the other people in the application doing something',
  stopOtherPeopleDoingSomethingHint: 'For example, moving abroad or abducting the children',
  resolveSpecificIssue: 'Resolve a specific issue you are concerned about',
  resolveSpecificIssueHint: 'For example, what school the children will go to',
  errors: {
    communicationHelp: {
      required: 'Select what help you need with communicating and understanding',
    },
    signLanguageInterpreterDetails: {
      required: 'Describe which Sign Language interpreter you need',
    },
    otherDetails: {
      required: 'Describe what you need to help with communicating and understanding',
    },
  },
});

const cy = () => ({
  serviceName: 'Child Arrangements - welsh',
  caption: 'Reasonable adjustments - welsh',
  headingTitle: 'I need help communicating and understanding - welsh',
  line1:
    'Think about all communications with the court, as well as what you might need at a hearing. Consider in-person, phone or video, in case your preferred hearing type is not possible - welsh',
  select_all_apply: 'Select all that apply to you - welsh',
  hearingLoop: 'Hearing loop (hearing enhancement system) - welsh',
  infraredReceiver: 'Infrared receiver (hearing enhancement system) - welsh',
  needToBeClosedWithSpeaker: 'Need to be close to who is speaking - welsh',
  lipSpeaker: 'Lip speaker - welsh',
  lipSpeakerHint: 'hearing person who has been trained to be easily lip read - welsh',
  signLanguageInterpreter: 'Sign Language interpreter - welsh',
  speechToTextReporter: 'Speech to text reporter (palantypist) - welsh',
  needExtraTime: 'Extra time to think and explain myself - welsh',
  visitCourtBeforeHearing: 'Visit to court before the hearing - welsh',
  explanationOfCourt: "Explanation of the court and who's in the room at the hearing - welsh",
  intermediary: 'Intermediary - welsh',
  intermediaryHint:
    'a person to help you if you have communication needs by providing professional support to participate in a hearing - welsh',
  other: 'Other - welsh',
  noSupportRequired: 'No, I do not need any support at this time - welsh',
  describeWhatNeeded: 'Describe what you need - welsh',
  errors: {
    communicationHelp: {
      required: 'Select what help you need with communicating and understanding - welsh',
    },
    signLanguageInterpreterDetails: {
      required: 'Describe which Sign Language interpreter you need - welsh',
    },
    otherDetails: {
      required: 'Describe what you need to help with communicating and understanding - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    courtOrder: {
      id: 'courtOrder',
      type: 'checkboxes',
      hint: l => l.select_all_apply,
      validator: value => atLeastOneFieldIsChecked(value),
      values: [
        {
          name: 'courtOrder',
          label: l => l.whoChildLiveWith,
          value: 'whoChildLiveWith',
        },
        {
          name: 'courtOrder',
          label: l => l.childTimeSpent,
          value: 'childTimeSpent',
        },
        {
          name: 'courtOrder',
          label: l => l.stopOtherPeopleDoingSomething,
          value: 'stopOtherPeopleDoingSomething',
          hint: l => l.stopOtherPeopleDoingSomethingHint,
          subFields: {
            stopOtherPeopleDoingSomethingSubField: {
              type: 'checkboxes',
              validator: value => atLeastOneFieldIsChecked(value),
              values: [
                {
                  name: 'courtOrder',
                  label: l => l.changeChildrenNameSurname,
                  value: 'changeChildrenNameSurname',
                },
                {
                  name: 'courtOrder',
                  label: l => l.allowMedicalTreatment,
                  value: 'allowMedicalTreatment',
                },
                {
                  name: 'courtOrder',
                  label: l => l.takingChildOnHoliday,
                  value: 'takingChildOnHoliday',
                },
                {
                  name: 'courtOrder',
                  label: l => l.infraredReceiver,
                  value: 'infraredReceiver',
                },
                {
                  name: 'courtOrder',
                  label: l => l.hearingLoop,
                  value: 'hearingLoop',
                }
              ]
            },
          },
        },
        {
          name: 'courtOrder',
          label: l => l.resolveSpecificIssue,
          value: 'resolveSpecificIssue',
          hint: l => l.resolveSpecificIssueHint,
        },
      ],
    },
  },
  onlycontinue: {
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
