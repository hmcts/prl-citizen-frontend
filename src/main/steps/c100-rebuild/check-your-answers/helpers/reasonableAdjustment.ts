/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HTML } from '../common/htmlSelectors';
import { populateError } from '../mainUtil';

export const resonableAdjustmentHelper = (userCase, keys, sessionKey, language) => {
  let html = '';

  if (userCase.hasOwnProperty(sessionKey)) {
    userCase[sessionKey].forEach(item => {
      if (userCase.hasOwnProperty(`ra_${item}_subfield`)) {
        html +=
          HTML.LIST_ITEM +
          keys[item] +
          ' : ' +
          populateError(userCase[`ra_${item}_subfield`], userCase[`ra_${item}_subfield`], language) +
          HTML.LIST_ITEM_END;
      } else {
        html += HTML.LIST_ITEM + populateError(keys[item], keys[item], language) + HTML.LIST_ITEM_END;
      }
    });
  } else {
    html += populateError(keys[sessionKey], keys[sessionKey], language);
  }
  return html;
};
