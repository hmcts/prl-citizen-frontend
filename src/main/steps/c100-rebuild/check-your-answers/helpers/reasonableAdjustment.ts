/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HTML } from '../common/htmlSelectors';

export const resonableAdjustmentHelper = (userCase, keys, sessionKey) => {
  if (userCase.hasOwnProperty(sessionKey)) {
    let html = '';
    userCase[sessionKey].forEach(item => {
      if (userCase.hasOwnProperty(`ra_${item}_subfield`)) {
        html += HTML.BOTTOM_PADDING_3;
        html += HTML.LIST_ITEM + keys[item] + HTML.LIST_ITEM_END;
        html += userCase[`ra_${item}_subfield`];
        html += HTML.BOTTOM_PADDING_CLOSE;
      } else {
        // html += HTML.BOTTOM_PADDING_3;
        html += HTML.LIST_ITEM + keys[item] + HTML.LIST_ITEM_END;
        // html += HTML.BOTTOM_PADDING_CLOSE;
      }
    });
    return html;
  }
};
