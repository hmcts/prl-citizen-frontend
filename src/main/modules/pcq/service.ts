/* eslint-disable @typescript-eslint/no-explicit-any */

import axios from 'axios';

import { PCQProvider } from './index';

export class PcqService {
  async getPcqHealthStatus(url: string): Promise<void> {
    try {
      const response = await axios.get(url);
      if (response?.data.status === 'UP') {
        return new Promise(resolve => resolve());
      }
      return new Promise((resolve, reject) => reject());
    } catch (err) {
      PCQProvider.log('error', err);
      throw err;
    }
  }
}

export const PCQService = new PcqService();
