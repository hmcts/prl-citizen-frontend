import csurf from 'csurf';
import type { Application } from 'express';

import {
  C100_CONSENT_ORDER_UPLOAD,
  C100_MIAM_UPLOAD,
  C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
  CSRF_TOKEN_ERROR_URL,
} from '../../steps/urls';

export class CSRFToken {
  private C100CSRFRoutes = [
    C100_CONSENT_ORDER_UPLOAD,
    C100_MIAM_UPLOAD,
    C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
    CSRF_TOKEN_ERROR_URL,
  ];

  public enableFor(app: Application): void {
    app.use(csurf(), (error, req, res, next) => {
      if (
        req.method === 'POST' &&
        this.C100CSRFRoutes.includes(req.originalUrl as `/${string}`) &&
        req.headers.referer.includes(req.headers.host)
      ) {
        if (error) {
          return next();
        }
        return next();
      } else {
        res.locals.csrfToken = req.csrfToken();
        next();
      }
    });
  }
}
