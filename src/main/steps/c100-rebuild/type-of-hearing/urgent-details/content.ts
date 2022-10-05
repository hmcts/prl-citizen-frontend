import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked, isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

const en = () => ({
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
    reasonOfUrgentHearing: {
      required: 'Select the reason why you are asking for an urgent hearing',
    },
    otherRiskDetails: {
      required: 'Give details of the risk in your ask that support your need for an urgent hearing',
    },
    timeOfHearingDetails: {
      required: 'How soon you need the hearing to take place',
    },
    hearingWithNext48HrsDetails: {
      required: 'Select yes if you need a hearing within the next 48 hours',
    },
    hearingWithNext48HrsMsg: {
      required: 'Provide details of what you have done to inform the respondents of you application',
    },
  },
});

const cy = () => ({
  title: 'Tell us about your situation - welsh  ',
  docSigned:
    'The mediator should give you a signed document to confirm you attended a MIAM, or do not need to attend. If you do not have a document, you should ask the mediator for one. - Welsh',
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  errors: {
    urgent_details: {
      required: 'Select yes if you have a document signed by the mediator - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    reasonOfUrgentHearing: {
      type: 'checkboxes',
      labelHidden: true,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'reasonOfUrgentHearing',
          label: l => l.riskOfSafety,
          value: 'risk of safety',
        },
        {
          name: 'reasonOfUrgentHearing',
          label: l => l.riskOfChildAbduction,
          value: 'risk of child abduction',
        },
        {
          name: 'reasonOfUrgentHearing',
          label: l => l.overseasLegalProceeding,
          value: 'overseas legal proceeding',
        },
        {
          name: 'reasonOfUrgentHearing',
          label: l => l.otherRisks,
          value: 'other risks',
        },
      ],
    },
    otherRiskDetails: {
      type: 'textarea',
      label: l => l.giveDetailsOtherRisks,
      hint: l => l.giveDetailsOtherRisksHint,
      validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
    },
    timeOfHearingDetails: {
      type: 'text',
      classes: 'govuk-input',
      label: l => l.timeOfHearing,
      validator: value => isFieldFilledIn(value),
    },
    hearingWithNext48HrsDetails: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.hearingWithNext48Hrs,
      labelSize: 'm',
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
          subFields: {
            hearingWithNext48HrsMsg: {
              type: 'textarea',
              label: l => l.hearingWithNext48HrsDetails,
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
