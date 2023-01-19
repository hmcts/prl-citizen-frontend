import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { typeofcaseuser } from '../../../common/typeofcaseuser';
const en = {
  section: 'Special arrangements',
  pagetitle: '',
  title: 'Do you or the children need special arrangements at court?',
  courtcommunication:
    'You or the children may need certain arrangements when you attend the court. Some of these arrangements will need to be agreed by the judge or HMCTS. If your needs change, you can discuss this with the court.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  waitingRoom: 'Separate waiting room',
  separateExitEntry: 'Separate exits and entrances',
  screens: 'Screens so you and the other people in the case cannot see each other',
  screensHint: 'This needs to be approved by a judge',
  toilet: 'Separate toilets',
  visitToCourt: 'Visit to court before the hearing',
  videoLinks: 'Video links',
  videoLinksHint: 'This needs to be approved by a judge',
  other: 'Other',
  otherDetails: 'Provide details of what you or the children need',
  noSupport: 'No, I do not have any safety requirements at this time',
  continue: 'Continue',
  errors: {
    respondentSpecialArrangements: {
      required: 'Please select an answer',
    },
    respondentSpecialArrangementsDetails: {
      required: 'Please describe your need in detail',
    },
  },
};

const cy: typeof en = {
  section: 'Special arrangements',
  pagetitle: '',
  title: 'Do you or the children need special arrangements at court?',
  courtcommunication:
    'You or the children may need certain arrangements when you attend the court. Some of these arrangements will need to be agreed by the judge or HMCTS. If your needs change, you can discuss this with the court.',
  optionHint: 'Select all that apply to you',
  summaryText: 'Contacts for help',
  waitingRoom: 'Separate waiting room',
  separateExitEntry: 'Separate exits and entrances',
  screens: 'Screens so you and the other people in the case cannot see each other',
  screensHint: 'This needs to be approved by a judge',
  toilet: 'Separate toilets',
  visitToCourt: 'Visit to court before the hearing',
  videoLinks: 'Video links',
  videoLinksHint: 'This needs to be approved by a judge',
  other: 'Other',
  otherDetails: 'Provide details of what you or the children need',
  noSupport: 'No, I do not have any safety requirements at this time',
  continue: 'Continue',
  errors: {
    respondentSpecialArrangements: {
      required: 'Please select an answer',
    },
    respondentSpecialArrangementsDetails: {
      required: 'Please describe your need in details',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    respondentSpecialArrangements: {
      type: 'checkboxes',
      labelHidden: true,
      hint: l => l.optionHint,
      section: l => l.section,
      values: [
        {
          name: 'respondentSpecialArrangements',
          label: l => l.waitingRoom,
          value: 'separate waiting room',
        },
        {
          name: 'respondentSpecialArrangements',
          label: l => l.separateExitEntry,
          value: 'separate exits and entrances',
        },
        {
          name: 'respondentSpecialArrangements',
          label: l => l.screens,
          hint: l => l.screensHint,
          value: 'screens to separate',
        },
        {
          name: 'respondentSpecialArrangements',
          label: l => l.toilet,
          value: 'separate toilets',
        },
        {
          name: 'respondentSpecialArrangements',
          label: l => l.visitToCourt,
          value: 'visit to court',
        },
        {
          name: 'respondentSpecialArrangements',
          label: l => l.videoLinks,
          hint: l => l.videoLinksHint,
          value: 'video links',
        },
        {
          name: 'respondentSpecialArrangements',
          label: l => l.other,
          value: 'other',
          subFields: {
            respondentSpecialArrangementsDetails: {
              type: 'textarea',
              label: l => l.otherDetails,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          divider: true,
        },
        {
          name: 'respondentSpecialArrangements',
          label: l => l.noSupport,
          value: 'no need of support',
          exclusive: true,
        },
      ],
      validator: atLeastOneFieldIsChecked,
    },
  },
  onlyContinue: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  translations.pagetitle = typeofcaseuser(content.language, content.userCase?.caseTypeOfApplication, false);
  return {
    ...translations,
    form,
  };
};
