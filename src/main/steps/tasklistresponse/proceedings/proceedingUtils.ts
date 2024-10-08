/* eslint-disable @typescript-eslint/no-unused-vars */

import { YesOrNo } from '../../../app/case/definition';
import { PROCEEDINGS_ORDER_DETAILS } from '../../../steps/urls';
import { HTML } from '../../c100-rebuild/check-your-answers/common/htmlSelectors';
import { getYesNoTranslation } from '../../c100-rebuild/check-your-answers/mainUtil';
import { DATE_FORMATTOR } from '../../common/dateformatter';
import { applyParms } from '../../common/url-parser';

import { cy, en } from './courtproceedings/content';
import { cy as opDetailsCyContents, en as opDetailsEnContents } from './order-details/content';

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
    ['orderDocument']: {
      question: keys['copy'],
    },
  };
  let Val = '';
  if (newOrders?.['orderDocument']) {
    Object.entries(newOrders).forEach((entry, index) => {
      const key = entry[0];
      const value = entry[1];

      if (key !== 'id' && key !== 'orderDocument') {
        if (typeof entry[1] === 'object' && entry[1] !== null) {
          const keyDetails =
            HTML.ROW_START_NO_BORDER +
            HTML.DESCRIPTION_TERM_ELEMENT +
            Mapper[key]?.question +
            HTML.DESCRIPTION_TERM_ELEMENT_END +
            HTML.ROW_END;
          const valueDetails =
            HTML.ROW_START +
            HTML.DESCRIPTION_TERM_DETAIL +
            DATE_FORMATTOR(value, language) +
            HTML.DESCRIPTION_TERM_DETAIL_END +
            HTML.ROW_END;
          Val += keyDetails + valueDetails;
        } else {
          const keyDetails =
            HTML.ROW_START_NO_BORDER +
            HTML.DESCRIPTION_TERM_ELEMENT +
            Mapper[key]?.question +
            HTML.DESCRIPTION_TERM_ELEMENT_END +
            HTML.ROW_END;
          const valueDetails =
            HTML.ROW_START +
            HTML.DESCRIPTION_TERM_DETAIL +
            (value === YesOrNo.YES
              ? getYesNoTranslation(language, YesOrNo.YES, 'doTranslation')
              : isValueNo(value, language)) +
            HTML.DESCRIPTION_TERM_DETAIL_END +
            HTML.ROW_END;
          Val += keyDetails + valueDetails;
        }
      } else if (key === 'orderDocument') {
        const displayValue = value?.['filename'] ? YesOrNo.YES : YesOrNo.NO;
        const keyDetails =
          HTML.ROW_START_NO_BORDER +
          HTML.DESCRIPTION_TERM_ELEMENT +
          Mapper[key]?.question +
          HTML.DESCRIPTION_TERM_ELEMENT_END +
          HTML.ROW_END;
        const valueDetails =
          HTML.ROW_START_NO_BORDER +
          HTML.DESCRIPTION_TERM_DETAIL +
          getYesNoTranslation(language, displayValue, 'doTranslation') +
          HTML.DESCRIPTION_TERM_DETAIL_END +
          HTML.ROW_END;
        Val += keyDetails + valueDetails;
      }
    });
  } else {
    Object.entries(newOrders).forEach((entry, index) => {
      const key = entry[0];
      const value = entry[1];

      if (key !== 'id' && key !== 'orderDetail') {
        if (typeof entry[1] === 'object' && entry[1] !== null) {
          const keyDetails =
            HTML.ROW_START_NO_BORDER +
            HTML.DESCRIPTION_TERM_ELEMENT +
            Mapper[key]?.question +
            HTML.DESCRIPTION_TERM_ELEMENT_END +
            HTML.ROW_END;
          const valueDetails =
            HTML.ROW_START +
            HTML.DESCRIPTION_TERM_DETAIL +
            DATE_FORMATTOR(value, language) +
            HTML.DESCRIPTION_TERM_DETAIL_END +
            HTML.ROW_END;
          Val += keyDetails + valueDetails;
        } else {
          const keyDetails =
            HTML.ROW_START_NO_BORDER +
            HTML.DESCRIPTION_TERM_ELEMENT +
            Mapper[key]?.question +
            HTML.DESCRIPTION_TERM_ELEMENT_END +
            HTML.ROW_END;
          const valueDetails =
            HTML.ROW_START +
            HTML.DESCRIPTION_TERM_DETAIL +
            (value === YesOrNo.YES
              ? getYesNoTranslation(language, YesOrNo.YES, 'doTranslation')
              : isValueNo(value, language)) +
            HTML.DESCRIPTION_TERM_DETAIL_END +
            HTML.ROW_END;
          Val += keyDetails + valueDetails;
        }
      } else if (key === 'orderDetail') {
        const keyDetails =
          HTML.ROW_START_NO_BORDER +
          HTML.DESCRIPTION_TERM_ELEMENT +
          Mapper[key]?.question +
          HTML.DESCRIPTION_TERM_ELEMENT_END +
          HTML.ROW_END;
        const valueDetails =
          HTML.ROW_START_NO_BORDER +
          HTML.DESCRIPTION_TERM_DETAIL +
          value +
          HTML.DESCRIPTION_TERM_DETAIL_END +
          HTML.ROW_END;
        Val += keyDetails + valueDetails;
      }
    });
  }
  return HTML.DESCRIPTION_LIST + Val + HTML.DESCRIPTION_LIST_END;
};

const isValueNo = (value, language) =>
  value === YesOrNo.NO ? getYesNoTranslation(language, YesOrNo.NO, 'doTranslation') : value;

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
        UserCase['otherProceedings']?.['order'].hasOwnProperty(`${order}s`) ||
        UserCase['otherProceedings']?.['order'].hasOwnProperty('contactOrdersForDivorce') ||
        UserCase['otherProceedings']?.['order'].hasOwnProperty('contactOrdersForAdoption')
      ) {
        prepareOrderDetail(order, UserCase, orderSessionStorage, keys, language);
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
/* eslint-disable @typescript-eslint/no-explicit-any*/
function prepareOrderDetail(
  order: any,
  UserCase: any,
  orderSessionStorage: { key: string; valueHtml: string; changeUrl: string }[],
  keys: any,
  language: any
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
      valueHtml: IndividualOrderFieldsParser(keys, nestedOrder, language),
      changeUrl: applyParms(PROCEEDINGS_ORDER_DETAILS, { orderType: order }),
    });
  });
}
