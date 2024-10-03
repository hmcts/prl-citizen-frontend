/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HTML } from '../common/htmlSelectors';
import { getYesNoTranslation } from '../mainUtil';

const htmlValParser = (selection, subText, keys) => {
  selection = selection || '';
  subText = subText || '';
  const addDetails = subText
    ? HTML.ROW_START_NO_BORDER +
      HTML.DESCRIPTION_TERM_ELEMENT +
      keys['details'] +
      HTML.DESCRIPTION_TERM_ELEMENT_END +
      HTML.ROW_END +
      HTML.ROW_START_NO_BORDER +
      HTML.DESCRIPTION_TERM_DETAIL_KEY +
      subText +
      HTML.DESCRIPTION_TERM_DETAIL_END +
      HTML.ROW_END
    : '';
  const lastRow = !subText ? HTML.ROW_START_NO_BORDER : HTML.ROW_START;
  return HTML.DESCRIPTION_LIST + lastRow + selection + HTML.ROW_END + addDetails;
};
/* eslint-disable @typescript-eslint/no-explicit-any */
const getValueUrlByKey = (key: string, userCase: any, language: any, Urls: any, keys: any) => {
  switch (key) {
    case 'liveOutSideUk':
      return {
        valueHtml: htmlValParser(
          getYesNoTranslation(language, userCase['ie_internationalStart'], 'ydyntTranslation'),
          userCase['ie_provideDetailsStart'],
          keys
        ),
        changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_START'],
      };
    case 'basedOutSideEnglandOrWales':
      return {
        valueHtml: htmlValParser(
          getYesNoTranslation(language, userCase['ie_internationalParents'], 'ydyntTranslation'),
          userCase['ie_provideDetailsParents'],
          keys
        ),
        changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_PARENTS'],
      };
    case 'anotherPersonSameOrder':
      return {
        valueHtml: htmlValParser(
          getYesNoTranslation(language, userCase['ie_internationalJurisdiction'], 'gallaiTranslation'),
          userCase['ie_provideDetailsJurisdiction'],
          keys
        ),
        changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_JURISDICTION'],
      };
    case 'otherCountryRequestInfo':
      return {
        valueHtml: htmlValParser(
          getYesNoTranslation(language, userCase['ie_internationalRequest'], 'oesTranslation'),
          userCase['ie_provideDetailsRequest'],
          keys
        ),
        changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_REQUEST'],
      };
  }
};
export const InternationElementHelper = (userCase, keys, Urls, language) => {
  const summaryData = [
    {
      key: keys['liveOutSideUk'],
      ...getValueUrlByKey('liveOutSideUk', userCase, language, Urls, keys),
    },
    {
      key: keys['basedOutSideEnglandOrWales'],
      ...getValueUrlByKey('basedOutSideEnglandOrWales', userCase, language, Urls, keys),
    },
    {
      key: keys['anotherPersonSameOrder'],
      ...getValueUrlByKey('anotherPersonSameOrder', userCase, language, Urls, keys),
    },
    {
      key: keys['otherCountryRequestInfo'],
      ...getValueUrlByKey('otherCountryRequestInfo', userCase, language, Urls, keys),
    },
  ];

  return summaryData;
};
