/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../app/case/definition';
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
/* eslint-disable @typescript-eslint/no-explicit-any */
const getValueUrlByKey = (key: string, userCase: any, language: any, Urls: any, keys: any) => {
  let caseDataYesNo: YesOrNo | undefined;
  let caseDataDetail: string | undefined;
  let url: any;
  switch (key) {
    case 'liveOutSideUk':
      caseDataYesNo = userCase['ie_internationalStart'];
      caseDataDetail = userCase['ie_provideDetailsStart'];
      url = Urls['C100_INTERNATIONAL_ELEMENTS_START'];
      break;
    case 'basedOutSideEnglandOrWales':
      caseDataYesNo = userCase['ie_internationalParents'];
      caseDataDetail = userCase['ie_provideDetailsParents'];
      url = Urls['C100_INTERNATIONAL_ELEMENTS_PARENTS'];
      break;
    case 'anotherPersonSameOrder':
      caseDataYesNo = userCase['ie_internationalJurisdiction'];
      caseDataDetail = userCase['ie_provideDetailsJurisdiction'];
      url = Urls['C100_INTERNATIONAL_ELEMENTS_JURISDICTION'];
      break;
    case 'otherCountryRequestInfo':
      caseDataYesNo = userCase['ie_internationalRequest'];
      caseDataDetail = userCase['ie_provideDetailsRequest'];
      url = Urls['C100_INTERNATIONAL_ELEMENTS_REQUEST'];
      break;
  }
  return {
    valueHtml: htmlValParser(getYesNoTranslation(language, caseDataYesNo, 'ydyntTranslation'), caseDataDetail, keys),
    changeUrl: url,
  };
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
