import { AxiosError } from 'axios';
import config from 'config';
import { Response } from 'express';

import { FormFieldsFn } from '../../../main/app/form/Form';
import { AppRequest } from '../../app/controller/AppRequest';
import PayAndSubmitPostController from '../../steps/c100-rebuild/check-your-answers/PayAndSubmitPostController';
import ResponseSummaryConfirmationPostController from '../../steps/tasklistresponse/summary/postController';

import { PCQProvider } from './index';

export class PcqController {
  protected static handleError(error: string | AxiosError, res: Response, redirectUrl: string): void {
    PCQProvider.log('error', error);
    return res.redirect(redirectUrl);
  }

  async launch(req: AppRequest, res: Response, returnUrl: string): Promise<void> {
    try {
      PCQProvider.initialiseLogger(req);
      const url = config.get('services.equalityAndDiversity.url');
      const path: string = config.get('services.equalityAndDiversity.path');
      await PCQProvider.service.getPcqHealthStatus(`${url}/health`);
      const pcqServiceUrl = await PCQProvider.getPcqServiceUrl(url as string, path, req, returnUrl);
      req.session.save(err => {
        if (err) {
          req.locals.logger.error('Error', err);
          throw err;
        }
        return res.redirect(pcqServiceUrl);
      });
    } catch (error) {
      PcqController.handleError(error, res, returnUrl);
    }
  }

  async onPcqCompletion(req: AppRequest, res: Response): Promise<void> {
    if (req.params.context === 'c100-rebuild') {
      return new PayAndSubmitPostController({} as FormFieldsFn).handlePayment(req, res);
    } else {
      return new ResponseSummaryConfirmationPostController({} as FormFieldsFn).submitC7Response(req, res);
    }
  }
}

export const PCQController = new PcqController();
