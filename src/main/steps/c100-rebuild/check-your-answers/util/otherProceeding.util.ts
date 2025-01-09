/* eslint-disable @typescript-eslint/no-unused-vars */

import { RootContext } from '../../../../app/case/definition';
import { IndividualOrderFieldsParser } from '../../../../steps/common/otherProceeding/utils';
import { C100_OTHER_PROCEEDINGS_ORDER_DETAILS } from '../../../../steps/urls';
import { applyParms } from '../../../common/url-parser';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const Mapper = (key, keys) => {
  switch (key) {
    case 'orderDetail':
      return keys['courtIssuedLabel'];
    case 'caseNo':
      return keys['caseNumberLabel'];
    case 'orderDate':
      return keys['orderDateLabel'];
    case 'currentOrder':
      return keys['isCurrentOrderLabel'];
    case 'orderCopy':
      return keys['copyOfOrderLabel'];
    case 'orderEndDate':
      return keys['orderEndDateLabel'];
    case 'orderDocument':
      return keys['copy'];
  }
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
            valueHtml: IndividualOrderFieldsParser(keys, nestedOrder, language, RootContext.C100_REBUILD),
            changeUrl: applyParms(C100_OTHER_PROCEEDINGS_ORDER_DETAILS, { orderType: order }),
          });
        });
      }
    });
    return orderSessionStorage;
  }
  return [{}];
};
