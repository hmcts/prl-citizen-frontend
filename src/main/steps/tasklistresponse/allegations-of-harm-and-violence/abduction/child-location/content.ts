/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../../app/form/validation';
import { typeofcaseuser } from '../../../../common/typeofcaseuser';
import { generateContent as parentContent } from '../content';
export const en = () => ({
  section: 'Safety concerns',
  title: 'Why do you think the children may be abducted or kept outside the UK without your consent?',
  pagetitle: '',
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
    },
    PRL_c1A_childsCurrentLocation: {
      required: 'Describe where the children are now',
    },
  },
});

export const cy = () => ({
  section: 'Safety concerns - welsh',
  title: 'Why do you think the children may be abducted or kept outside the UK without your consent? - welsh',
  pagetitle: '',
  warningText: {
    text: 'Contact the police or social services if a child you’re responsible for is at risk of being taken out of the UK without your consent. - welsh',
    iconFallbackText: 'Warning - welsh',
  },
  safetyConcernsText: 'Briefly explain your concerns, including: - welsh',
  safetyConcernsBullet1: 'Who might take them - welsh',
  safetyConcernsBullet2: 'Where they might be taken or kept - welsh',
  childsCurrentLocationText: 'Where are the children now? - welsh',
  childsCurrentLocationHint:
    'If they’re outside England or Wales, include what country they’re in and how long they’ve been there. You don’t need to include any addresses. - welsh',
  errors: {
    PRL_c1A_abductionReasonOutsideUk: {
      required:
        'Explain why you think the children may be abducted or kept outside of the UK without your consent - welsh',
    },
    PRL_c1A_childsCurrentLocation: {
      required: 'Describe where the children are now - welsh',
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
      validator: isFieldFilledIn,
    },
    PRL_c1A_childsCurrentLocation: {
      type: 'textarea',
      labelSize: 's',
      label: l => l.childsCurrentLocationText,
      hint: l => l.childsCurrentLocationHint,
      attributes: {
        rows: 4,
      },
      validator: isFieldFilledIn,
    },
  },
  onlyContinue: {
    text: l => l.onlyContinue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  translations.pagetitle = typeofcaseuser(content.language, content.userCase?.caseTypeOfApplication, false);
  return {
    ...translations,
    ...parentContent(content),
    form,
  };
};
