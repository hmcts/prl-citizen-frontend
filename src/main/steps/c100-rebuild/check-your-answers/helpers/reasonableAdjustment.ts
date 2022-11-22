/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HTML } from '../common/htmlSelectors';

export const resonableAdjustmentHelper = (userCase, keys, sessionKey) => {
  if (userCase.hasOwnProperty(sessionKey)) {
    let html = '';
    userCase[sessionKey].forEach(item => {
      if (userCase.hasOwnProperty(`ra_${item}_subfield`)) {
        html += HTML.LIST_ITEM + keys[item] + ' : ' + userCase[`ra_${item}_subfield`] + HTML.LIST_ITEM_END;
      } else {
        html += HTML.LIST_ITEM + keys[item] + HTML.LIST_ITEM_END;
      }
    });
    return html;
  }
};
