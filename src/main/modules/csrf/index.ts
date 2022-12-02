import csurf from 'csurf';
import type { Application } from 'express';

import { CSRF_TOKEN_ERROR_URL } from '../../steps/urls';

export class CSRFToken {
  public enableFor(app: Application): void {
    app.use(csurf(), (req, res, next) => {
      res.locals.csrfToken = req.csrfToken();
      next();
    });

    app.use((error, req, res, next) => {
      if (error.code === 'EBADCSRFTOKEN') {
        console.error(`${error.stack || error}`);
        return res.redirect(CSRF_TOKEN_ERROR_URL);
      }
      next();
    });
  }
}
