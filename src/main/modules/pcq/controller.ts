import { AxiosError } from 'axios';
import config from 'config';
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';

import { PCQProvider } from './index';

export class PcqController {
  protected static handleError(error: string | AxiosError, res: Response, redirectUrl: string): void {
    PCQProvider.log('error', error);
    return res.redirect(redirectUrl);
  }

  async launch(req: AppRequest, res: Response, returnUrl: string): Promise<void> {
    try {
      const url = config.get('services.equalityAndDiversity.url');
      const path: string = config.get('services.equalityAndDiversity.path');
      const status = await PCQProvider.service.getPcqHealthStatus(`${url}/health`);

      if (status === 'UP') {
        try {
          const pcqServiceUrl = await PCQProvider.getPcqServiceUrl(url as string, path, req, returnUrl);
          return await PCQProvider.launchPcqService(req, res, pcqServiceUrl);
        } catch (error) {
          return PcqController.handleError(error, res, returnUrl);
        }
      } else {
        PCQProvider.log('error', 'PCQ service is down');
        return res.redirect(returnUrl);
      }
    } catch (error) {
      PcqController.handleError(error, res, returnUrl);
    }
  }
}

export const PCQController = new PcqController();
