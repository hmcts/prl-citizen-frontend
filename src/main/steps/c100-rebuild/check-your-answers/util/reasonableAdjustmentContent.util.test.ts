/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ReasonableAdjustmentElement } from './reasonableAdjustmentContent.util';

/**
 * It returns an object containing the contents of the English and Welsh versions of the page,
 * depending on the language selected
 * @returns A function that returns an object.
 */
const TestReasonableAdjustmentElement = SystemLanguage => {
  const opContents = {
    en: () => {
      return {
        yourSupport: 'Your support',
      };
    },
    cy: () => {
      return {
        yourSupport: 'Your support - welsh',
      };
    },
  };
  return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
};

describe('test cases for otherProceedingsContents', () => {
  test('english contents', () => {
    expect(ReasonableAdjustmentElement('en')).toStrictEqual(TestReasonableAdjustmentElement('en'));
  });
  test('Welsh contents', () => {
    expect(ReasonableAdjustmentElement('cy')).toStrictEqual(ReasonableAdjustmentElement('cy'));
  });
});
