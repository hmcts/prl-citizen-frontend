/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AppRequest } from '../../../../app/controller/AppRequest';
import { HTML } from '../common/htmlSelectors';
import { populateError } from '../mainUtil';

export const resonableAdjustmentHelper = (userCase, keys, sessionKey, language, req: AppRequest) => {
  let html = '';

  if (userCase.hasOwnProperty(sessionKey)) {
    userCase[sessionKey].forEach(item => {
      if (userCase.hasOwnProperty(`ra_${item}_subfield`)) {
        html +=
          HTML.LIST_ITEM +
          populateError(keys[item], keys[item], language, req, sessionKey) +
          ' : ' +
          userCase[`ra_${item}_subfield`] +
          HTML.LIST_ITEM_END;
      } else {
        html += HTML.LIST_ITEM + populateError(keys[item], keys[item], language, req, sessionKey) + HTML.LIST_ITEM_END;
      }
    });
  } else {
    html += populateError(keys[sessionKey], keys[sessionKey], language, req, sessionKey);
  }
  return html;
};
