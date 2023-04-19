/* eslint-disable @typescript-eslint/no-unused-vars */

import { applyParms } from '../../common/url-parser';

import { cy, en } from './courtproceedings/content';
import { DATE_FORMATTOR } from './dateformatter';
import { HTML } from './htmlSelectors';
import { cy as opDetailsCyContents, en as opDetailsEnContents } from './order-details/content';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const IndividualOrderFieldsParser = (keys, order) => {
  const newOrders = order;
  const Mapper = {
    ['orderDetail']: {
      question: keys['courtIssuedLabel'],
    },
    ['caseNo']: {
      question: keys['caseNumberLabel'],
    },
    ['orderDate']: {
      question: keys['orderDateLabel'],
    },
    ['currentOrder']: {
      question: keys['isCurrentOrderLabel'],
    },
    ['orderCopy']: {
      question: keys['copyOfOrderLabel'],
    },
    ['orderEndDate']: {
      question: keys['orderEndDateLabel'],
    },
    ['orderDocument']: {
      question: 'Copy uploaded?',
    },
  };
  let Val = '';
  Object.entries(newOrders).forEach((entry, index) => {
    const key = entry[0];
    const value = entry[1];
    const rulerForLastElement = Object.entries(newOrders).length > index + 1 ? HTML.RULER : '<br>';
    if (key !== 'id' && key !== 'orderDocument') {
      if (typeof entry[1] === 'object' && entry[1] !== null) {
        const keyDetails = HTML.H4 + Mapper[key]?.question + HTML.H4_CLOSE;
        const valueDetails = HTML.P + DATE_FORMATTOR(value) + HTML.P_CLOSE;
        Val += keyDetails + valueDetails + rulerForLastElement;
      } else {
        const keyDetails = HTML.H4 + Mapper[key]?.question + HTML.H4_CLOSE;
        const valueDetails = HTML.P + value + HTML.P_CLOSE;
        Val += keyDetails + valueDetails + rulerForLastElement;
      }
    } else if (key === 'orderDocument') {
      if (value !== 'undefined') {
        const keyDetails = HTML.H4 + Mapper[key]?.question + HTML.H4_CLOSE;
        const valueDetails = HTML.P + 'Yes' + HTML.P_CLOSE;
        Val += keyDetails + valueDetails + rulerForLastElement;
      } else {
        const keyDetails = HTML.H4 + Mapper[key]?.question + HTML.H4_CLOSE;
        const valueDetails = HTML.P + 'No' + HTML.P_CLOSE;
        Val += keyDetails + valueDetails + rulerForLastElement;
      }
    }
  });
  return Val;
};

/**
 * It takes in a UserCase object, a keys object, a URLS object and a sessionKey string. It returns an
 * array of objects with keys key, valueHtml and changeUrl
 * @param UserCase - The user case object
 * @param keys - This is an object that contains the keys for the fields that you want to display.
 * @param URLS - The URL's for the session storage
 * @param sessionKey - The key in the session storage that you want to parse.
 * @returns An array of objects with the following properties:
 *   key: string
 *   valueHtml: string
 *   changeUrl: string
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const OPotherProceedingsSessionParserUtil = (UserCase, keys, URLS, sessionKey) => {
  if (UserCase.hasOwnProperty(sessionKey)) {
    const orderSessionStorage = [] as { key: string; valueHtml: string; changeUrl: string }[];
    UserCase[sessionKey].forEach(order => {
      if (
        UserCase['otherProceedings']?.['order'].hasOwnProperty(`${order}s`) ||
        UserCase['otherProceedings']?.['order'].hasOwnProperty('contactOrdersForDivorce') ||
        UserCase['otherProceedings']?.['order'].hasOwnProperty('contactOrdersForAdoption')
      ) {
        let orderDetails;
        if (order === 'contactOrderForDivorce') {
          orderDetails = UserCase['otherProceedings']?.['order']['contactOrdersForDivorce'];
        } else if (order === 'contactOrderForAdoption') {
          orderDetails = UserCase['otherProceedings']?.['order']['contactOrdersForAdoption'];
        } else {
          orderDetails = UserCase['otherProceedings']?.['order'][`${order}s`];
        }
        orderDetails.forEach((nestedOrder, index) => {
          const IndexNumber = index > 0 ? index + 1 : '';
          orderSessionStorage.push({
            key: `${keys[order + 'Label']} ${IndexNumber}`,
            valueHtml: IndividualOrderFieldsParser(keys, nestedOrder),
            changeUrl: applyParms(URLS['PROCEEDINGS_ORDER_DETAILS'], { orderType: order }),
          });
        });
      }
    });
    return orderSessionStorage;
  }
  return [{}];
};

/**
 * It returns an object containing the contents of the English and Welsh versions of the page,
 * depending on the language selected
 * @returns A function that returns an object.
 */
export const otherProceedingsContents = SystemLanguage => {
  const opContents = {
    en: () => {
      delete en['errors'];
      delete opDetailsEnContents['errors'];
      return { ...en(), ...opDetailsEnContents(), optitle: opDetailsEnContents().pageTitle };
    },
    cy: () => {
      delete cy['errors'];
      delete opDetailsCyContents['errors'];
      return { ...cy(), ...opDetailsCyContents(), optitle: opDetailsCyContents().pageTitle };
    },
  };
  return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
};
