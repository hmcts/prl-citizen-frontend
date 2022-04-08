import { Response } from 'express';

import { cookieMaxAge } from '../../modules/session';
import { SIGN_OUT_URL } from '../../steps/urls';
import { AppRequest } from '../controller/AppRequest';

export class KeepAliveController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    if (!req.session.user) {
      return res.redirect(SIGN_OUT_URL);
    }
    req.session.cookie.expires = new Date(Date.now() + cookieMaxAge);
    req.session.cookie.maxAge = cookieMaxAge;
    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.end();
    });
  }
}
