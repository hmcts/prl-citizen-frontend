/* eslint-disable @typescript-eslint/no-unused-vars */

import { RootContext } from '../../../app/case/definition';
import { IndividualOrderFieldsParser } from '../../../steps/common/otherProceeding/utils';
import { PROCEEDINGS_ORDER_DETAILS } from '../../../steps/urls';
import { applyParms } from '../../common/url-parser';

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
      valueHtml: IndividualOrderFieldsParser(keys, nestedOrder, language, RootContext.RESPONDENT),
      changeUrl: applyParms(PROCEEDINGS_ORDER_DETAILS, { orderType: order }),
    });
  });
}
