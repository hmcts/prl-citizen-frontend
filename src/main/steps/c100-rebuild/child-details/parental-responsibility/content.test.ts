//import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { TranslationFn } from '../../../../app/controller/GetController';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const LanguageAssertionForChild = (
  language: 'en' | 'cy',
  languageContent: Record<string, unknown>,
  generateFn: TranslationFn
): void => {
  const generatedContent = generateFn({ language } as CommonContent);

  Object.entries(languageContent).forEach(([key, value]) => {
    if (key !== 'hintText') {
      expect(generatedContent[key]).toEqual(value);
    }
  });
};

const en = {
  pageTitle: 'Parental responsibility for',
  labelText: 'State everyone who has parental responsibility for  and how they have parental responsibility.',
  hintText: `<p>For example 'child's mother', or 'child's father who was married to the mother when the child was born.</p>
   <p><a target="_blank" href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1">See section E of leaflet CB1 for more information</a></p>`,
  errors: {
    parentalResponsibility: {
      required: 'Enter an answer',
    },
  },
};

const cy = {
  pageTitle: 'Parental responsibility for  - welsh',
  labelText: 'State everyone who has parental responsibility for  and how they have parental responsibility. - welsh',
  hintText: `<p>For example 'child's mother', or 'child's father who was married to the mother when the child was born.</p>
    <p><a target="_blank" href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1">See section E of leaflet CB1 for more information</a></p> - welsh`,
  errors: {
    parentalResponsibility: {
      required: 'Enter an answer  - welsh',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('child details > parental-responsibility', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as unknown as CommonContent;

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    LanguageAssertionForChild('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    LanguageAssertionForChild('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
