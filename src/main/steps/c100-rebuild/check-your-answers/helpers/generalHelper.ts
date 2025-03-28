import { getYesNoTranslation, populateError, translation } from '../mainUtil';

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
      changeNameInformation +=
        HTML.DESCRIPTION_LIST +
        HTML.ROW_START +
        HTML.DESCRIPTION_TERM_DETAIL +
        getYesNoTranslation(language, hasNameChanged, 'doTranslation') +
        HTML.DESCRIPTION_TERM_DETAIL_END +
        HTML.ROW_END +
        HTML.ROW_START_NO_BORDER +
        HTML.DESCRIPTION_TERM_ELEMENT;
      changeNameInformation += keys['details'];
      changeNameInformation +=
        HTML.DESCRIPTION_TERM_ELEMENT_END +
        HTML.ROW_END +
        HTML.BREAK +
        HTML.ROW_START_NO_BORDER +
        HTML.DESCRIPTION_TERM_DETAIL;
      changeNameInformation += populateError(
        personalDetails['previousFullName'],
        personalDetails['previousFullName'],
        language
      );
      changeNameInformation += HTML.DESCRIPTION_TERM_DETAIL_END + HTML.ROW_END + HTML.DESCRIPTION_LIST_END;
      break;
    }
    case 'no': {
      changeNameInformation += getYesNoTranslation(language, personalDetails['hasNameChanged'], 'doTranslation');
      break;
    }
  }
  let childGender =
    personalDetails['otherGenderDetails'] !== ''
      ? HTML.DESCRIPTION_LIST + HTML.ROW_START + HTML.DESCRIPTION_TERM_DETAIL
      : '';
  childGender += translation(personalDetails['gender'], language);
  if (personalDetails['otherGenderDetails'] !== '') {
    childGender +=
      HTML.DESCRIPTION_TERM_DETAIL_END +
      HTML.ROW_END +
      HTML.ROW_START_NO_BORDER +
      HTML.DESCRIPTION_TERM_DETAIL +
      keys['otherGender'] +
      HTML.DESCRIPTION_TERM_DETAIL_END +
      HTML.ROW_END +
      HTML.ROW_START_NO_BORDER +
      HTML.DESCRIPTION_TERM_ELEMENT +
      keys['details'] +
      HTML.DESCRIPTION_TERM_ELEMENT_END +
      HTML.ROW_END +
      HTML.BREAK +
      HTML.ROW_START_NO_BORDER +
      HTML.DESCRIPTION_TERM_DETAIL +
      personalDetails['otherGenderDetails'] +
      HTML.DESCRIPTION_TERM_DETAIL_END +
      HTML.ROW_END +
      HTML.DESCRIPTION_LIST_END;
  }

  return { changeNameInformation, childGender };
};
