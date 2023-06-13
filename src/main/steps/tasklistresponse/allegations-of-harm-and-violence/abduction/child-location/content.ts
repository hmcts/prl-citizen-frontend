/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../../app/form/validation';
import { generateContent as parentContent } from '../content';

export const en = () => ({
  section: 'Safety concerns',
  title: 'Why do you think the children may be abducted or kept outside the UK without your consent?',
  warningText: {
    text: 'Contact the police or social services if a child you’re responsible for is at risk of being taken out of the UK without your consent.',
    iconFallbackText: 'Warning',
  },
  safetyConcernsText: 'Briefly explain your concerns, including:',
  safetyConcernsBullet1: 'Who might take them',
  safetyConcernsBullet2: 'Where they might be taken or kept',
  childsCurrentLocationText: 'Where are the children now?',
  childsCurrentLocationHint:
    'If they’re outside England or Wales, include what country they’re in and how long they’ve been there. You don’t need to include any addresses.',
  errors: {
    PRL_c1A_abductionReasonOutsideUk: {
      required: 'Explain why you think the children may be abducted or kept outside of the UK without your consent',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
    PRL_c1A_childsCurrentLocation: {
      required: 'Describe where the children are now',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed.',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less.',
    },
  },
});

export const cy = () => ({
  section: 'Pryderon diogelwch',
  title: "Pam ydych chi'n meddwl y gallai'r plant gael eu herwgydio neu eu cadw y tu allan i'r DU heb eich caniatâd?",
  warningText: {
    text: 'Contact the police or social services if a child you’re responsible for is at risk of being taken out of the UK without your consent. - welsh',
    iconFallbackText: 'Warning - welsh',
  },
  safetyConcernsText: 'Briefly explain your concerns, including: - welsh',
  safetyConcernsBullet1: 'Who might take them - welsh',
  safetyConcernsBullet2: 'Where they might be taken or kept - welsh',
  childsCurrentLocationText: "Ble mae'r plant nawr?",
  childsCurrentLocationHint:
    'If they’re outside England or Wales, include what country they’re in and how long they’ve been there. You don’t need to include any addresses. - welsh',
  errors: {
    PRL_c1A_abductionReasonOutsideUk: {
      required:
        'Explain why you think the children may be abducted or kept outside of the UK without your consent - welsh',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed. (welsh)',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
    },
    PRL_c1A_childsCurrentLocation: {
      required: 'Describe where the children are now - welsh',
      invalidCharacters: 'You have entered an invalid character. Special characters <,>,{,} are not allowed. (welsh)',
      invalid:
        'You have exceeded the character limit accepted by the free text field. Please enter 5,000 characters or less. - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    PRL_c1A_abductionReasonOutsideUk: {
      type: 'textarea',
      labelSize: 's',
      attributes: {
        rows: 4,
      },
      validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
    },
    PRL_c1A_childsCurrentLocation: {
      type: 'textarea',
      labelSize: 's',
      label: l => l.childsCurrentLocationText,
      hint: l => l.childsCurrentLocationHint,
      attributes: {
        rows: 4,
      },
      validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
    },
  },
  onlyContinue: {
    text: l => l.onlyContinue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    ...parentContent(content),
    form,
  };
};
