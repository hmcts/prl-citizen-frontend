import axios from 'axios';
import config from 'config';
import { LoggerInstance } from 'winston';

import { getServiceAuthToken } from '../../app/auth/service/get-service-auth-token';
import { UserDetails } from '../controller/AppRequest';

const https = require('https');

export const getFeesForC100ApplicationSubmission = async (
  userDetails: UserDetails,
  logger: LoggerInstance
): Promise<FeesResponse> => {
  try {
    const url: string = config.get('services.cos.url') + '/fees-and-payment-apis/getC100ApplicationFees';
    const response = await axios.get<FeesResponse>(url, {
      headers: {
        Authorization: 'Bearer ' + userDetails.accessToken,
        serviceAuthorization: 'Bearer ' + getServiceAuthToken(),
        'Content-Type': 'application/json',
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });
    return response.data;
  } catch (err) {
    logger.error(err.message);
    throw new Error('Fee could not be fetched.');
  }
};

export interface FeesResponse {
  feeAmountForC100Application: string;
  errorRetrievingResponse: string;
}
