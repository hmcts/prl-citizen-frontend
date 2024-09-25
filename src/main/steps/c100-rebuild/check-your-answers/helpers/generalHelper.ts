import { getYesNoTranslation, translation } from '../mainUtil';

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
      changeNameInformation += HTML.DESCRIPTION_LIST+HTML.NEW_ROW_START+getYesNoTranslation(language, hasNameChanged, 'doTranslation');
      changeNameInformation += HTML.ROW_END + HTML.NEW_ROW_START_NO_BORDER +HTML.DESCRIPTION_TERM_ELEMENT;
      changeNameInformation += keys['details'];
      changeNameInformation += HTML.DESCRIPTION_TERM_ELEMENT_END +HTML.ROW_END;
      changeNameInformation += HTML.BREAK + HTML.NEW_ROW_START_NO_BORDER + HTML.DESCRIPTION_TERM_DETAIL;
      changeNameInformation += personalDetails['previousFullName'];
      changeNameInformation += HTML.DESCRIPTION_TERM_DETAIL_END+
      HTML.ROW_END +
      HTML.DESCRIPTION_LIST_END;
      break;
    }
    case 'no': {
      changeNameInformation += getYesNoTranslation(language, personalDetails['hasNameChanged'], 'doTranslation');
      break;
    }
  }
  let childGender = personalDetails['otherGenderDetails'] !== ''?HTML.DESCRIPTION_LIST+HTML.NEW_ROW_START:'';
  childGender += translation(personalDetails['gender'], language);
  if (personalDetails['otherGenderDetails'] !== '') {
    childGender +=
    HTML.ROW_END + HTML.NEW_ROW_START_NO_BORDER +
      keys['otherGender'] +
      HTML.ROW_END + HTML.NEW_ROW_START_NO_BORDER +HTML.DESCRIPTION_TERM_ELEMENT+
      keys['details'] +
      HTML.DESCRIPTION_TERM_ELEMENT_END +
      HTML.ROW_END +
      HTML.BREAK +
      HTML.NEW_ROW_START_NO_BORDER +
      HTML.DESCRIPTION_TERM_DETAIL+
      personalDetails['otherGenderDetails']+
      HTML.DESCRIPTION_TERM_DETAIL_END+
      HTML.ROW_END +
      HTML.DESCRIPTION_LIST_END;
  }

  return { changeNameInformation, childGender };
};
