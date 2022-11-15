/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HTML } from '../common/htmlSelectors';

export const courtOrderSubFieldParser = (userCase, keys, userKey, originalListItem) => {
  if (userCase.hasOwnProperty(userKey)) {
    let returnAbleString = HTML.NESTED_LIST_ITEM + originalListItem + HTML.NESTED_LIST_ITEM_END;
    returnAbleString += HTML.UNORDER_LIST;
    returnAbleString += userCase[userKey]
      .filter(field => field !== '')
      .map(item => {
        return HTML.NESTED_LIST_ITEM + keys[item] + HTML.NESTED_LIST_ITEM_END;
      });
    returnAbleString += HTML.UNORDER_LIST_END;
    return returnAbleString;
  }
};
export const courtOrderParentAndChildFieldParser = (userCase, keys, sessionKey) => {
  if (userCase.hasOwnProperty(sessionKey)) {
    const mappedVals = userCase[sessionKey]
      .filter(val => val !== '')
      .map(courtConsideration => {
        if (userCase.hasOwnProperty(`too_${courtConsideration}_subFields`)) {
          return courtOrderSubFieldParser(
            userCase,
            keys,
            `too_${courtConsideration}_subFields`,
            keys[courtConsideration]
          );
        } else {
          return HTML.LIST_ITEM + keys[courtConsideration] + HTML.LIST_ITEM_END;
        }
      });
    return (HTML.UNORDER_LIST + mappedVals + HTML.UNORDER_LIST_END).split(',').join('');
  }
};

export const courtTypeOfOrder = (userCase, keys, sessionKey) => {
  if (userCase.hasOwnProperty(sessionKey)) {
    const mappedVals = userCase[sessionKey]
      .filter(val => val !== '')
      .map(courtConsideration => {
        if (userCase.hasOwnProperty(`too_${courtConsideration}SubField`)) {
          return courtOrderSubFieldParser(
            userCase,
            keys,
            `too_${courtConsideration}SubField`,
            keys[courtConsideration]
          );
        } else {
          return HTML.LIST_ITEM + keys[courtConsideration] + HTML.LIST_ITEM_END;
        }
      });
    return (HTML.UNORDER_LIST + mappedVals + HTML.UNORDER_LIST_END).split(',').join('');
  }
};

export const courtTypeOfOrderHelper = (userCase, keys, sessionKey) => {
  return courtTypeOfOrder(userCase, keys, sessionKey);
};

export const CourtOrderParserHelper = (userCase, keys, sessionKey) => {
  return courtOrderParentAndChildFieldParser(userCase, keys, sessionKey);
};
