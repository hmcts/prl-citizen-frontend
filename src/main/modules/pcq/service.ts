/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios';

import { PCQProvider } from './index';

export class PcqService {
  async getPcqHealthStatus(url: string): Promise<string | undefined> {
    try {
      const response = await axios.get(url);
      return response.data.status;
    } catch (err) {
      PCQProvider.log('error', err);
      return Promise.resolve('DOWN');
    }
  }
}

export const PCQService = new PcqService();
