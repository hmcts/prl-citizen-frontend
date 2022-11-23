/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HTML } from '../common/htmlSelectors';

const htmlValParser = (selection, subText, keys) => {
  selection = selection || '';
  subText = subText || '';
  const addDetails = subText
    ? HTML.RULER + HTML.H4 + keys['details'] + HTML.H4_CLOSE + HTML.P + subText + HTML.P_CLOSE
    : '';
  return HTML.P + selection + HTML.P_CLOSE + addDetails;
};

export const InternationElementHelper = (userCase, keys, Urls) => {
  const summaryData = [
    {
      key: keys['liveOutSideUk'],
      valueHtml: htmlValParser(userCase['ie_internationalStart'], userCase['ie_provideDetailsStart'], keys),
      changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_START'],
    },
    {
      key: keys['basedOutSideEnglandOrWales'],
      valueHtml: htmlValParser(userCase['ie_internationalParents'], userCase['ie_provideDetailsParents'], keys),
      changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_PARENTS'],
    },
    {
      key: keys['anotherPersonSameOrder'],
      valueHtml: htmlValParser(
        userCase['ie_internationalJurisdiction'],
        userCase['ie_provideDetailsJurisdiction'],
        keys
      ),
      changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_JURISDICTION'],
    },
    {
      key: keys['otherCountryRequestInfo'],
      valueHtml: htmlValParser(userCase['ie_internationalRequest'], userCase['ie_provideDetailsRequest'], keys),
      changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_REQUEST'],
    },
  ];

  return summaryData;
};
