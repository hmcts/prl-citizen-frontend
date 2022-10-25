/* eslint-disable @typescript-eslint/no-unused-vars */

import { cy, en } from '../../other-proceedings/current-previous-proceedings/content';
import { cy as opDetailsCyContents, en as opDetailsEnContents } from '../../other-proceedings/order-details/content';

/**
 * It takes a date object and returns a string
 * @param date - The date object that you want to format.
 * @returns A string
 */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const DATE_FORMATTOR = (date): string => {
  if (date['year'] !== '' && date['month'] !== '' && date['day'] !== '') {
    const formated_Date = new Date(date['year'], date['month'], date['day']);
    const month = formated_Date.toLocaleString('default', { month: 'long' });
    return formated_Date.getDate() + ' ' + month + ' ' + formated_Date.getFullYear();
  } else {
    return Object.values(date)
      .map(item => item + ' ')
      .toString()
      .split(',')
      .join('');
  }
};

/**
 * It takes in an object and returns a string
 * @param keys - This is the object that contains the labels for the fields.
 * @param order - This is the object that contains the data that you want to display.
 * @returns A string
 */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const IndividualOrderFieldsParser = (keys, order) => {
  delete order['id'];
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
  const divider = '<hr class="govuk-section-break govuk-section-break--visible">';
  Object.entries(order).forEach(entry => {
    const key = entry[0];
    const value = entry[1];
    if (typeof entry[1] === 'object' && entry[1] !== null) {
      const keyDetails = '<h4>' + Mapper[key]?.question + '</h4>';
      const valueDetails = '<p>' + DATE_FORMATTOR(value) + '</p>';
      Val += keyDetails + valueDetails + divider;
    } else {
      const keyDetails = '<h4>' + Mapper[key]?.question + '</h4>';
      const valueDetails = '<p>' + value + '</p>';
      Val += keyDetails + valueDetails + divider;
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
      if (UserCase['op_otherProceedings']?.['order'].hasOwnProperty(`${order}s`)) {
        const orderDetails = UserCase['op_otherProceedings']?.['order'][`${order}s`];
        orderDetails.forEach((nestedOrder, index) => {
          const IndexNumber = index > 0 ? index + 1 : '';
          orderSessionStorage.push({
            key: `${keys[`${order}Label`]} ${IndexNumber}`,
            valueHtml: IndividualOrderFieldsParser(keys, nestedOrder),
            changeUrl: URLS['C100_OTHER_PROCEEDINGS_ORDER_DETAILS'] + `?orderType=${order}`,
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
      delete opDetailsCyContents['errors'];
      return { ...en(), ...opDetailsEnContents() };
    },
    cy: () => {
      delete cy['errors'];
      delete opDetailsEnContents['errors'];
      return { ...cy(), ...opDetailsCyContents() };
    },
  };
  return SystemLanguage === 'en' ? opContents.en() : opContents.cy();
};
