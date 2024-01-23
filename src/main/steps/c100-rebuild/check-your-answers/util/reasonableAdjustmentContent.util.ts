/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * It returns an object containing the contents of the English and Welsh versions of the page,
 * depending on the language selected
 * @returns A function that returns an object.
 */
export const ReasonableAdjustmentElement = SystemLanguage => {
  const opContents = {
    en: () => {
      return {
        yourSupport: 'Your Support',
      };
    },
    cy: () => {
      return {
        yourSupport: 'Your Support - welsh',
      };
    },
  };
  return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
};
