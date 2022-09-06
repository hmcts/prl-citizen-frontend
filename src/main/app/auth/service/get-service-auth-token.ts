import { Logger } from '@hmcts/nodejs-logging';
import Axios from 'axios';
import config from 'config';
import { authenticator } from 'otplib';

const logger = Logger.getLogger('service-auth-token');
let token;

export const getTokenFromApi = async (): Promise<string> => {
  logger.info('Refreshing service auth token');

  const url: string = config.get('services.authProvider.url') + '/lease';
  const microservice: string = config.get('services.authProvider.microservice');
  const secret: string = config.get('services.authProvider.secret');
  const oneTimePassword = authenticator.generate(secret);
  const body = { microservice, oneTimePassword };

  console.log('s2s url ' + url);
  console.log('s2s microservice ' + microservice);
  console.log('s2s secret ' + secret);

  try {
    const response = await Axios.post(url, body);
    logger.info('Service auth token refreshed');
    token = response.data;
  } catch (err) {
    logger.error('Error in refreshing service auth token ', err.message, err.response?.status, err.response?.data);
  }
  console.log('s2sToken ' + token);
  return token;
};

export const initAuthToken = (): void => {
  getTokenFromApi();
  setInterval(getTokenFromApi, 1000 * 60 * 60);
};

export const getServiceAuthToken = (): string => {
  return token;
};
