/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  serviceName: 'Child Arrangements',
  caption: 'Reasonable adjustments',
  headingTitle:
    'Do you have a physical, mental or learning disability or health condition that means you need support during your case?',
  line1:
    'We know some people need support to access information and use our services. We often call this a reasonable adjustment. Some reasonable adjustments need to be agreed by the judge or HMCTS. You can discuss with the court if your needs change.',
  select_all_apply: 'Select all that apply to you - specific requirements can be given next',
  documentsHelp: 'I need documents in an alternative format',
  documentsHelpHint: 'for example, braille or different colours and text sizes',
  communicationHelp: 'I need help communicating and understanding',
  communicationHelpHint: 'for example, hearing, speaking or interpretation',
  extraSupport: 'I need to bring support with me to a hearing',
  extraSupportHint: 'for example, someone you know or an assistance dog',
  feelComfortableSupport: 'I need something to feel comfortable during a hearing',
  feelComfortableSupportHint: 'for example, extra breaks or extra space',
  helpTravellingMovingBuildingSupport: 'I need help travelling to, or moving around court buildings',
  helpTravellingMovingBuildingSupportHint:
    'for example, access and mobility support if a hearing takes place in person',
  noSupportRequired: 'No, I do not need any support at this time',
  errors: {
    ra_disabilityRequirements: {
      required:
        'Select whether or not you have a physical, mental or learning disability or health condition that means you need support during your case',
    },
  },
});

export const cy = () => ({
  serviceName: 'Child Arrangements - welsh',
  caption: 'Reasonable adjustments - welsh',
  headingTitle:
    'Do you have a physical, mental or learning disability or health condition that means you need support during your case? - welsh',
  line1:
    'We know some people need support to access information and use our services. We often call this a reasonable adjustment. Some reasonable adjustments need to be agreed by the judge or HMCTS. You can discuss with the court if your needs change. - welsh',
  select_all_apply: 'Select all that apply to you - specific requirements can be given next - welsh',
  documentsHelp: 'I need documents in an alternative format - welsh',
  documentsHelpHint: 'for example, braille or different colours and text sizes - welsh',
  communicationHelp: 'I need help communicating and understanding - welsh',
  communicationHelpHint: 'for example, hearing, speaking or interpretation - welsh',
  extraSupport: 'I need to bring support with me to a hearing - welsh',
  extraSupportHint: 'for example, someone you know or an assistance dog - welsh',
  feelComfortableSupport: 'I need something to feel comfortable during a hearing - welsh',
  feelComfortableSupportHint: 'for example, extra breaks or extra space - welsh',
  helpTravellingMovingBuildingSupport: 'I need help travelling to, or moving around court buildings - welsh',
  helpTravellingMovingBuildingSupportHint:
    'for example, access and mobility support if a hearing takes place in person - welsh',
  noSupportRequired: 'No, I do not need any support at this time - welsh',
  errors: {
    ra_disabilityRequirements: {
      required:
        'Select whether or not you have a physical, mental or learning disability or health condition that means you need support during your case - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    ra_disabilityRequirements: {
      id: 'ra_disabilityRequirements',
      type: 'checkboxes',
      hint: l => l.select_all_apply,
      validator: value => atLeastOneFieldIsChecked(value),
      values: [
        {
          name: 'ra_disabilityRequirements',
          label: l => l.documentsHelp,
          value: 'documentsHelp',
          hint: l => l.documentsHelpHint,
        },
        {
          name: 'ra_disabilityRequirements',
          label: l => l.communicationHelp,
          value: 'communicationHelp',
          hint: l => l.communicationHelpHint,
        },
        {
          name: 'ra_disabilityRequirements',
          label: l => l.extraSupport,
          value: 'extraSupport',
          hint: l => l.extraSupportHint,
        },
        {
          name: 'ra_disabilityRequirements',
          label: l => l.feelComfortableSupport,
          value: 'feelComfortableSupport',
          hint: l => l.feelComfortableSupportHint,
        },
        {
          name: 'ra_disabilityRequirements',
          label: l => l.helpTravellingMovingBuildingSupport,
          value: 'helpTravellingMovingBuildingSupport',
          hint: l => l.helpTravellingMovingBuildingSupportHint,
        },
        {
          divider: l => l.divider,
        },
        {
          name: 'ra_disabilityRequirements',
          label: l => l.noSupportRequired,
          value: 'noSupportRequired',
          behaviour: 'exclusive',
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
