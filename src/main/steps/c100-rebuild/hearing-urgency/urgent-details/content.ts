/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import {
  atLeastOneFieldIsChecked,
  isAlphaNumeric,
  isFieldFilledIn,
  isTextAreaValid,
} from '../../../../app/form/validation';

export const en = () => ({
  title: 'Tell us about your situation',
  reasonForUrgentHearing: 'Reason you are asking for an urgent hearing',
  riskOfSafety: "Risk to my safety or the children's safety",
  riskOfChildAbduction: 'Risk that the children will be abducted',
  overseasLegalProceeding: 'Legal proceedings taking place overseas',
  otherRisks: 'Other risks',
  giveDetailsOtherRisks: 'Give details of the risk in your case',
  giveDetailsOtherRisksHint:
    'The court will only give you an earlier hearing date if there are risk factors in your case. Otherwise, your request will be rejected.',
  timeOfHearing: 'How soon do you need the hearing to take place?',
  hearingWithNext48Hrs: 'Do you need a hearing within the next 48 hours?',
  hearingWithNext48HrsDetails: 'What have you done to inform the respondents of your application?',
  hearingWithNext48HrsDetailsHint:
    'If you have not told the respondents, please explain why. The court will need you to give a good reason.',
  one: 'Yes',
  two: 'No',

  errors: {
    hu_reasonOfUrgentHearing: {
      required: 'Select the reason why you are asking for an urgent hearing',
    },
    hu_otherRiskDetails: {
      required: 'Give details of the risk in your case that support your need for an urgent hearing',
    },
    hu_timeOfHearingDetails: {
      required: 'Enter how soon you need the hearing to take place',
      invalid: 'You have entered an invalid character. Enter using letters and numbers only.',
    },
    hu_hearingWithNext48HrsDetails: {
      required: 'Select yes if you need a hearing within the next 48 hours',
    },
    hu_hearingWithNext48HrsMsg: {
      required: 'Provide details of what you have done to inform the respondents of your application',
    },
  },
});

export const cy = () => ({
  title: 'Tell us about your situation - Welsh',
  reasonForUrgentHearing: 'Rheswm eich bod yn gofyn am wrandawiad brys',
  riskOfSafety: "Risg i'm diogelwch fy hun neu ddiogelwch y plant ",
  riskOfChildAbduction: 'Perygl y bydd y plant yn cael eu herwgipio',
  overseasLegalProceeding: 'Achosion cyfreithiol yn digwydd dramor',
  otherRisks: 'Risgiau eraill',
  giveDetailsOtherRisks: 'Give details of the risk in your case - Welsh',
  giveDetailsOtherRisksHint:
    'The court will only give you an earlier hearing date if there are risk factors in your case. Otherwise, your request will be rejected. - Welsh',
  timeOfHearing: 'How soon do you need the hearing to take place? - Welsh',
  hearingWithNext48Hrs: 'Do you need a hearing within the next 48 hours? - Welsh',
  hearingWithNext48HrsDetails: 'What have you done to inform the respondents of your application? - Welsh',
  hearingWithNext48HrsDetailsHint:
    'If you have not told the respondents, please explain why. The court will need you to give a good reason. - Welsh',
  one: 'Yes - Welsh',
  two: 'No - Welsh',

  errors: {
    hu_reasonOfUrgentHearing: {
      required: 'Dewiswch y rhesymau pam rydych yn gofyn am wrandawiad brys',
    },
    hu_otherRiskDetails: {
      required: "Rhowch fanylion y risg sy'n cefnogi'ch angen am wrandawiad brys",
    },
    hu_timeOfHearingDetails: {
      required: "Nodwch pa mor fuan y mae angen i'r gwrandawiad gael ei gynnal",
      invalid: 'You have entered an invalid character. Enter using letters and numbers only.(Welsh)',
    },
    hu_hearingWithNext48HrsDetails: {
      required: 'Dewiswch oes os oes angen gwrandawiad arnoch o fewn y 48 awr nesaf',
    },
    hu_hearingWithNext48HrsMsg: {
      required: "Darparwch fanylion yr hyn rydych chi wedi'i wneud i hysbysu’r atebwyr yn eich cais",
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    hu_reasonOfUrgentHearing: {
      type: 'checkboxes',
      labelHidden: true,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'hu_reasonOfUrgentHearing',
          label: l => l.riskOfSafety,
          value: 'riskOfSafety',
        },
        {
          name: 'hu_reasonOfUrgentHearing',
          label: l => l.riskOfChildAbduction,
          value: 'riskOfChildAbduction',
        },
        {
          name: 'hu_reasonOfUrgentHearing',
          label: l => l.overseasLegalProceeding,
          value: 'overseasLegalProceeding',
        },
        {
          name: 'hu_reasonOfUrgentHearing',
          label: l => l.otherRisks,
          value: 'otherRisks',
        },
      ],
    },
    hu_otherRiskDetails: {
      type: 'textarea',
      name: 'hu_otherRiskDetails',
      label: l => l.giveDetailsOtherRisks,
      hint: l => l.giveDetailsOtherRisksHint,
      validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
    },
    hu_timeOfHearingDetails: {
      type: 'text',
      name: 'hu_timeOfHearingDetails',
      classes: 'govuk-input',
      label: l => l.timeOfHearing,
      validator: value => isFieldFilledIn(value) || isAlphaNumeric(value),
    },
    hu_hearingWithNext48HrsDetails: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.hearingWithNext48Hrs,
      labelSize: 'm',
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
          subFields: {
            hu_hearingWithNext48HrsMsg: {
              type: 'textarea',
              label: l => l.hearingWithNext48HrsDetails,
              labelSize: null,
              hint: l => l.hearingWithNext48HrsDetailsHint,
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
