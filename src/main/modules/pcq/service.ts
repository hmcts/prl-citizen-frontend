/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosResponse } from 'axios';
import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';

import { StatusResponse } from './definitions';

import { PCQProvider } from './index';

export class PcqService {
  async getPcqHealthStatus(url: string): Promise<string | undefined> {
    try {
      const response: AxiosResponse<StatusResponse> = await axios.get(url);
      return response.data.status;
    } catch (err) {
      PCQProvider.log('error', err);
      return '';
    }
  }

  async launchPcqService(req: AppRequest, res: Response, url: string): Promise<void> {
    try {
      req.session.save(err => {
        if (err) {
          req.locals.logger.error('Error', err);
          throw err;
        }
        return res.redirect(url);
      });
    } catch (err) {
      PCQProvider.log('error', err);
    }
  }
}

export const PCQService = new PcqService();
