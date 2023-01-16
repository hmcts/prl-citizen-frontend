/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HTML } from '../common/htmlSelectors';
import { getYesNoTranslation } from '../mainUtil';

const htmlValParser = (selection, subText, keys) => {
  selection = selection || '';
  subText = subText || '';
  const addDetails = subText
    ? HTML.RULER + HTML.H4 + keys['details'] + HTML.H4_CLOSE + HTML.P + subText + HTML.P_CLOSE
    : '';
  return HTML.P + selection + HTML.P_CLOSE + addDetails;
};

export const InternationElementHelper = (userCase, keys, Urls, language) => {
  const summaryData = [
    {
      key: keys['liveOutSideUk'],
      valueHtml: htmlValParser(
        getYesNoTranslation(language, userCase['ie_internationalStart'], 'ydyntTranslation'),
        userCase['ie_provideDetailsStart'],
        keys
      ),
      changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_START'],
    },
    {
      key: keys['basedOutSideEnglandOrWales'],
      valueHtml: htmlValParser(
        getYesNoTranslation(language, userCase['ie_internationalParents'], 'ydyntTranslation'),
        userCase['ie_provideDetailsParents'],
        keys
      ),
      changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_PARENTS'],
    },
    {
      key: keys['anotherPersonSameOrder'],
      valueHtml: htmlValParser(
        getYesNoTranslation(language, userCase['ie_internationalJurisdiction'], 'gallaiTranslation'),
        userCase['ie_provideDetailsJurisdiction'],
        keys
      ),
      changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_JURISDICTION'],
    },
    {
      key: keys['otherCountryRequestInfo'],
      valueHtml: htmlValParser(
        getYesNoTranslation(language, userCase['ie_internationalRequest'], 'oesTranslation'),
        userCase['ie_provideDetailsRequest'],
        keys
      ),
      changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_REQUEST'],
    },
  ];

  return summaryData;
};
