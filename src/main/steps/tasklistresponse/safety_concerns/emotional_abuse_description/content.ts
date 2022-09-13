import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

const en = {
  section: 'Safety concerns',
  title: 'About the emotional abuse',
  description: 'Briefly describe what happened and who was involved, if you feel able to',
  descriptionHint:
    'We will treat your information sensitively, and you will have a chance to give further details to the court later in the proceedings.',
  behaviour: 'When did this behaviour start?',
  behaviourHint: 'Add an approximate date (the closest date you can remember) if you are not sure.',
  ongoingBehaviour: 'Is the behaviour still ongoing?',
  help: 'Have you ever asked for help?',
  helpHint: 'For example, speaking to your local GP.',
  one: 'Yes',
  two: 'No',
  summaryText: 'Contacts for help',
  continue: 'Save and continue',
  errors: {
    'respondentSafetyConcerns.emotionalAbuseDescription.explainWhoWasInvolved': {
      required: 'Please describe what happened and who was involved? ',
    },
    'respondentSafetyConcerns.emotionalAbuseDescription.whenDidBehaviourStart': {
      required: 'Please explain when did this behaviour start? ',
    },
    'respondentSafetyConcerns.emotionalAbuseDescription.isBehaviourStillGoingOn': {
      required: 'Please explain is nehaviour still going on? ',
    },
    'respondentSafetyConcerns.emotionalAbuseDescription.haveYouEverAskedForHelp': {
      required: 'Please mention if you ever asked for help ',
    },
  },
};

const cy: typeof en = {
  section: 'Safety concerns',
  title: 'About the emotional abuse',
  description: 'Briefly describe what happened and who was involved, if you feel able to',
  descriptionHint:
    'We will treat your information sensitively, and you will have a chance to give further details to the court later in the proceedings.',
  behaviour: 'When did this behaviour start?',
  behaviourHint: 'Add an approximate date (the closest date you can remember) if you are not sure.',
  ongoingBehaviour: 'Is the behaviour still ongoing?',
  help: 'Have you ever asked for help?',
  helpHint: 'For example, speaking to your local GP.',
  one: 'Yes',
  two: 'No',
  summaryText: 'Contacts for help',
  continue: 'Save and continue',
  errors: {
    'respondentSafetyConcerns.emotionalAbuseDescription.explainWhoWasInvolved': {
      required: 'Please describe what happened and who was involved? ',
    },
    'respondentSafetyConcerns.emotionalAbuseDescription.whenDidBehaviourStart': {
      required: 'Please explain when did this behaviour start? ',
    },
    'respondentSafetyConcerns.emotionalAbuseDescription.isBehaviourStillGoingOn': {
      required: 'Please explain is nehaviour still going on? ',
    },
    'respondentSafetyConcerns.emotionalAbuseDescription.haveYouEverAskedForHelp': {
      required: 'Please mention if you ever asked for help ',
    },
  },
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    'respondentSafetyConcerns.emotionalAbuseDescription.explainWhoWasInvolved': {
      type: 'textarea',
      label: l => l.description,
      hint: l => l.descriptionHint,
      labelSize: 'm',
      validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
    },
    'respondentSafetyConcerns.emotionalAbuseDescription.whenDidBehaviourStart': {
      type: 'text',
      classes: 'govuk-label',
      label: l => l.behaviour,
      hint: l => l.behaviourHint,
      labelSize: 'm',
      validator: value => isFieldFilledIn(value),
    },
    'respondentSafetyConcerns.emotionalAbuseDescription.isBehaviourStillGoingOn': {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.ongoingBehaviour,
      section: l => l.section,
      labelSize: 'm',
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
        },
        {
          label: l => l.two,
          value: YesOrNo.NO,
        },
      ],
      validator: isFieldFilledIn,
    },
    'respondentSafetyConcerns.emotionalAbuseDescription.haveYouEverAskedForHelp': {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.help,
      section: l => l.section,
      labelSize: 'm',
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
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
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  return {
    ...translations,
    form,
  };
};
