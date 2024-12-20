import _ from 'lodash';
import { strip } from 'node-emoji';
import sanitizeHtml from 'sanitize-html';

import { AppRequest } from '../../app/controller/AppRequest';

export class SanitizeRequest {
  private readonly formInputsToOmit = [
    '_csrf',
    'onlyContinue',
    'saveAndComeLater',
    'onlycontinue',
    'accessCodeCheck',
    'submit',
    'startNow',
    'goBack',
    'link',
  ];

  public sanitizeRequestBody(req: AppRequest): void {
    const sanitizeText = _.flow([strip, sanitizeHtml, _.unescape, _.trim]);

    Object.entries(req.body)
      .filter(([key]) => !this.formInputsToOmit.includes(key))
      .forEach(([key, value]) => {
        req.body[key] = _.isArray(value) ? value.map(item => sanitizeText(item)) : sanitizeText(value);
      });
  }
}

export const RequestSanitizer = new SanitizeRequest();
