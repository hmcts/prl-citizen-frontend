/* eslint-disable @typescript-eslint/no-unused-vars */

import { C100_OTHER_PROCEEDINGS_ORDER_DETAILS } from '../../../../steps/urls';
import { DATE_FORMATTOR } from '../../../common/dateformatter';
import { applyParms } from '../../../common/url-parser';
import { cy, en } from '../../other-proceedings/current-previous-proceedings/content';
import { cy as opDetailsCyContents, en as opDetailsEnContents } from '../../other-proceedings/order-details/content';
import { HTML } from '../common/htmlSelectors';
import { getYesNoTranslation } from '../mainUtil';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const IndividualOrderFieldsParser = (keys, order, language) => {
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
  };
  let Val = '';
  Object.entries(newOrders).forEach((entry, index) => {
    const key = entry[0];
    const value = entry[1];
    const rulerForLastElement = Object.entries(newOrders).length > index + 1 ? HTML.RULER : '<br>';
    if (key !== 'id' && key !== 'orderDocument') {
      if (typeof entry[1] === 'object' && entry[1] !== null) {
        const keyDetails = HTML.H4 + Mapper[key]?.question + HTML.H4_CLOSE;
        const valueDetails = HTML.P + DATE_FORMATTOR(value, language) + HTML.P_CLOSE;
        Val += keyDetails + valueDetails + rulerForLastElement;
      } else {
        const keyDetails = HTML.H4 + Mapper[key]?.question + HTML.H4_CLOSE;
        let valueDetails = '';
        if (key === 'currentOrder') {
          valueDetails = HTML.P + getYesNoTranslation(language, value, 'ieTranslation') + HTML.P_CLOSE;
        } else if (key === 'orderCopy') {
          valueDetails = HTML.P + getYesNoTranslation(language, value, 'oesTranslation') + HTML.P_CLOSE;
        } else {
          valueDetails = HTML.P + value + HTML.P_CLOSE;
        }
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
export const OPotherProceedingsSessionParserUtil = (UserCase, keys, sessionKey, language) => {
  if (UserCase.hasOwnProperty(sessionKey)) {
    const orderSessionStorage = [] as { key: string; valueHtml: string; changeUrl: string }[];
    UserCase[sessionKey].forEach(order => {
      if (
        UserCase['op_otherProceedings']?.['order'].hasOwnProperty(`${order}s`) ||
        UserCase['op_otherProceedings']?.['order'].hasOwnProperty('contactOrdersForDivorce') ||
        UserCase['op_otherProceedings']?.['order'].hasOwnProperty('contactOrdersForAdoption')
      ) {
        let orderDetails;
        switch (order) {
          case 'contactOrderForDivorce':
            orderDetails = UserCase['op_otherProceedings']?.['order']['contactOrdersForDivorce'];
            break;
          case 'contactOrderForAdoption':
            orderDetails = UserCase['op_otherProceedings']?.['order']['contactOrdersForAdoption'];
            break;
          default:
            orderDetails = UserCase['op_otherProceedings']?.['order'][`${order}s`];
            break;
        }
        orderDetails.forEach((nestedOrder, index) => {
          const IndexNumber = index > 0 ? index + 1 : '';
          orderSessionStorage.push({
            key: `${keys[order + 'Label']} ${IndexNumber}`,
            valueHtml: IndividualOrderFieldsParser(keys, nestedOrder, language),
            changeUrl: applyParms(C100_OTHER_PROCEEDINGS_ORDER_DETAILS, { orderType: order }),
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
      return { ...en(), ...opDetailsEnContents(), optitle: opDetailsEnContents().title };
    },
    cy: () => {
      delete cy['errors'];
      delete opDetailsCyContents['errors'];
      return { ...cy(), ...opDetailsCyContents(), optitle: opDetailsCyContents().title };
    },
  };
  return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
};
