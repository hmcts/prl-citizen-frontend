import axios from 'axios';
import config from 'config';
import { LoggerInstance } from 'winston';

import { getServiceAuthToken } from '../../app/auth/service/get-service-auth-token';
import { UserDetails } from '../controller/AppRequest';

export const getC100ApplicationFee = async (
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
    });
    return response.data;
  } catch (err) {
    logger.error(err.message);
    throw new Error('Error occured, C100 application fee could not be fetched. - getC100ApplicationFee');
  }
};

export interface FeesResponse {
  feeAmount: string;
  errorRetrievingResponse: string;
}
