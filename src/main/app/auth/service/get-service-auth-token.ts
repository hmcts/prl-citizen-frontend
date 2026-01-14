/* eslint-disable import/no-named-as-default */
import { Logger } from '@hmcts/nodejs-logging';
import { authenticator } from '@otplib/v12-adapter';
import Axios from 'axios';
import config from 'config';

const logger = Logger.getLogger('service-auth-token');
let token;

export const getTokenFromApi = async (): Promise<string> => {
  logger.info('Refreshing service auth token');

  const url: string = config.get('services.authProvider.url') + '/lease';
  const microservice: string = config.get('services.authProvider.microservice');
  const secret: string = config.get('services.authProvider.secret');
  const oneTimePassword = authenticator.generate(secret);
  const body = { microservice, oneTimePassword };

  try {
    const response = await Axios.post(url, body);
    token = response.data;
  } catch (err) {
    logger.error('Error in refreshing service auth token ', err.message, err.response?.status, err.response?.data);
  }
  return token;
};

export const initAuthToken = (): void => {
  getTokenFromApi();
  setInterval(getTokenFromApi, 1000 * 60 * 60);
};

export const getServiceAuthToken = (): string => {
  return token;
};
