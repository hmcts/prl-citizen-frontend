/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HTML } from '../common/htmlSelectors';

const htmlValParser = (selection, subText) => {
  return HTML.P + selection + HTML.P_CLOSE + HTML.P + subText + HTML.P_CLOSE;
};

export const InternationElementHelper = (userCase, keys, Urls) => {
  const summaryData = [
    {
      key: keys['liveOutSideUk'],
      valueHtml: htmlValParser(userCase['ie_internationalStart'], userCase['ie_provideDetailsStart']),
      changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_START'],
    },
    {
      key: keys['basedOutSideEnglandOrWales'],
      valueHtml: htmlValParser(userCase['ie_internationalParents'], userCase['ie_provideDetailsParents']),
      changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_PARENTS'],
    },
    {
      key: keys['anotherPersonSameOrder'],
      valueHtml: htmlValParser(userCase['ie_internationalJurisdiction'], userCase['ie_provideDetailsJurisdiction']),
      changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_JURISDICTION'],
    },
    {
      key: keys['otherCountryRequestInfo'],
      valueHtml: htmlValParser(userCase['ie_internationalRequest'], userCase['ie_provideDetailsRequest']),
      changeUrl: Urls['C100_INTERNATIONAL_ELEMENTS_REQUEST'],
    },
  ];

  return summaryData;
};
