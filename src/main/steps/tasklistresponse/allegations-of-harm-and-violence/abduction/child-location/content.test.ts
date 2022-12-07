import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
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
    c1A_abductionReasonOutsideUk: {
      required: 'Explain why you think the children may be abducted or kept outside of the UK without your consent',
    },
    c1A_childsCurrentLocation: {
      required: 'Describe where the children are now',
    },
  },
};

const cy = {
  section: 'Safety concerns - welsh',
  title: 'Why do you think the children may be abducted or kept outside the UK without your consent? - welsh',
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
    c1A_abductionReasonOutsideUk: {
      required:
        'Explain why you think the children may be abducted or kept outside of the UK without your consent - welsh',
    },
    c1A_childsCurrentLocation: {
      required: 'Describe where the children are now - welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('Safety concern > abduction > child-location', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain safety concerns > abduction > child-location fields', () => {
    const c1A_abductionReasonOutsideUk = fields.c1A_abductionReasonOutsideUk as FormOptions;
    expect(c1A_abductionReasonOutsideUk.type).toBe('textarea');
    (c1A_abductionReasonOutsideUk.validator as Function)('c1A_safetyConcerns');

    const c1A_childsCurrentLocation = fields.c1A_childsCurrentLocation as FormOptions;
    expect(c1A_childsCurrentLocation.type).toBe('textarea');
    expect((c1A_childsCurrentLocation.label as LanguageLookup)(generatedContent)).toBe(en.childsCurrentLocationText);
    expect((c1A_childsCurrentLocation.hint as LanguageLookup)(generatedContent)).toBe(en.childsCurrentLocationHint);
    (c1A_childsCurrentLocation.validator as Function)('c1A_safetyConcerns');
  });

  test('should contain Save and continue button', () => {
    expect(
      (form?.onlyContinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });
});
