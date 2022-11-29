import csurf from 'csurf';
import type { Application } from 'express';
import type { LoggerInstance } from 'winston';

import {
  C100_CONSENT_ORDER_UPLOAD,
  C100_MIAM_UPLOAD,
  C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
  CSRF_TOKEN_ERROR_URL,
} from '../../steps/urls';

const { Logger } = require('@hmcts/nodejs-logging');
const logger: LoggerInstance = Logger.getLogger('app');

export class CSRFToken {
  public enableFor(app: Application): void {
    app.use(csurf(), (req, res, next) => {
      res.locals.csrfToken = req.csrfToken();
      next();
    });

    app.use((error, req, res, next) => {
      if (
        error.code === 'EBADCSRFTOKEN' &&
        req.path !== (C100_CONSENT_ORDER_UPLOAD || C100_MIAM_UPLOAD || C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD)
      ) {
        logger.error(`${error.stack || error}`);
        return res.redirect(CSRF_TOKEN_ERROR_URL);
      }
      next();
    });
  }
}
