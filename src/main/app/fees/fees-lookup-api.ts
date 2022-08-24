import axios from 'axios';
import { LoggerInstance } from 'winston';

import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { UserDetails } from '../controller/AppRequest';

export const getFeesForC100ApplicationSubmission = async (
  userDetails: UserDetails,
  logger: LoggerInstance
): Promise<FeesResponse> => {
  try {
    const response = await axios.get<FeesResponse>(
      `https://prl-cos-pr-513.service.core-compute-preview.internal/fees-and-payment-apis/getC100ApplicationFees`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + userDetails.accessToken,
          ServiceAuthorization: getServiceAuthToken(),
          ContentType: 'application/json',
        },
      }
    );
    return response.data;
  } catch (err) {
    logger.error(err);
    throw new Error('Fee could not be fetched.');
  }
};

export interface FeesResponse {
  amount: string;
  errorRetrievingResponse: string;
}
