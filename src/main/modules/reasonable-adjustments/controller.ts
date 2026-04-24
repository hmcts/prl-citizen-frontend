import { AxiosError } from 'axios';
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { REASONABLE_ADJUSTMENTS_ERROR } from '../../steps/urls';

import { RAProvider } from './index';

export class ReasonableAdjustementsController {
  protected static handleError(error: string | AxiosError, res: Response): void {
    RAProvider.log('error', error);
    return res.redirect(REASONABLE_ADJUSTMENTS_ERROR);
  }

  handleBackNavigation(req: AppRequest, res: Response): void {
    res.redirect(RAProvider.utils.getNavigationUrl(req));
  }
}

export const RAController = new ReasonableAdjustementsController();
