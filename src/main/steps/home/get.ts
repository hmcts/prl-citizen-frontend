import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { DASHBOARD_URL } from '../urls';

export class HomeGetController {
  public get(req: AppRequest, res: Response): void {
    res.redirect(DASHBOARD_URL);
  }
}
