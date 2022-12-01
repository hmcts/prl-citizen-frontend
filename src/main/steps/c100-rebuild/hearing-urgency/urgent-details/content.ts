/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

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
  reasonForUrgentHearing: 'Reason you are asking for an urgent hearing - Welsh',
  riskOfSafety: "Risk to my safety or the children's safety - Welsh",
  riskOfChildAbduction: 'Risk that the children will be abducted - Welsh',
  overseasLegalProceeding: 'Legal proceedings taking place overseas - Welsh',
  otherRisks: 'Other risks - Welsh',
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
      required: 'Select the reason why you are asking for an urgent hearing',
    },
    hu_otherRiskDetails: {
      required: 'Give details of the risk in your case that support your need for an urgent hearing',
    },
    hu_timeOfHearingDetails: {
      required: 'Enter how soon you need the hearing to take place',
    },
    hu_hearingWithNext48HrsDetails: {
      required: 'Select yes if you need a hearing within the next 48 hours',
    },
    hu_hearingWithNext48HrsMsg: {
      required: 'Provide details of what you have done to inform the respondents of your application',
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
      validator: value => isFieldFilledIn(value),
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
