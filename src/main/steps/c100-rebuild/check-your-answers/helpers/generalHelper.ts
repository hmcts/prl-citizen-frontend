import { genderChose, getYesNoTranslation } from '../mainUtil';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const nameAndGenderParser = (personalDetails, keys, HTML, language) => {
  let changeNameInformation = '';
  const hasNameChanged = personalDetails['hasNameChanged'];
  switch (hasNameChanged) {
    case 'dontKnow': {
      changeNameInformation += keys['dontKnow'];
      break;
    }
    case 'yes': {
      changeNameInformation += getYesNoTranslation(language, hasNameChanged, 'doTranslation');
      changeNameInformation += HTML.RULER;
      changeNameInformation += HTML.H4;
      changeNameInformation += keys['details'];
      changeNameInformation += HTML.H4_CLOSE;
      changeNameInformation += HTML.BOTTOM_PADDING_3;
      changeNameInformation += personalDetails['previousFullName'];
      changeNameInformation += HTML.BOTTOM_PADDING_CLOSE;
      break;
    }
    case 'no': {
      changeNameInformation += getYesNoTranslation(language, personalDetails['hasNameChanged'], 'doTranslation');
      break;
    }
  }
  let childGender = '';
  childGender += genderChose(personalDetails['gender'], language);
  if (personalDetails['otherGenderDetails'] !== '') {
    childGender +=
      HTML.BREAK +
      HTML.RULER +
      keys['otherGender'] +
      HTML.H4 +
      keys['details'] +
      HTML.H4_CLOSE +
      HTML.BREAK +
      personalDetails['otherGenderDetails'];
  }

  return { changeNameInformation, childGender };
};
