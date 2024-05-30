import { AxiosError } from 'axios';
import config from 'config';
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { REASONABLE_ADJUSTMENTS_ERROR } from '../../steps/urls';

import { PCQProvider } from './index';

export class PcqController {
  protected static handleError(error: string | AxiosError, res: Response): void {
    PCQProvider.log('error', error);
    return res.redirect(REASONABLE_ADJUSTMENTS_ERROR);
  }

  async launch(req: AppRequest, res: Response, returnUrl: string): Promise<void> {
    try {
      const url = config.get('services.equalityAndDiversity.url');
      const path: string = config.get('services.equalityAndDiversity.path');
      const status = await PCQProvider.service.getPcqHealthStatus(`${url}/health`);

      if (status === 'UP') {
        try {
          const params = PCQProvider.buildRequestParams(req, returnUrl);

          const qs = Object.keys(params)
            .map(key => `${key}=${params[key]}`)
            .join('&');
          const pcqServiceUrl = PCQProvider.buildPcqServiceUrl(url as string, path, qs);
          return await PCQProvider.service.launchPcqService(req, res, pcqServiceUrl);
        } catch (error) {
          return PcqController.handleError(error, res);
        }
      } else {
        PCQProvider.log('error', 'PCQ service is down');
        return res.redirect(returnUrl);
      }
    } catch (error) {
      PcqController.handleError(error, res);
    }
  }
}

export const PCQController = new PcqController();
