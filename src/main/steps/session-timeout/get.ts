import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { GetController } from '../../app/controller/GetController';

import { generateContent } from './content';

@autobind
export class SessionTimeoutGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    res.locals['lang'] = req.session?.lang;

    super.get(req, res);

    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          console.error('Error destroying session after timeout:', err);
        }
      });
    }
  }
}
