import { Logger } from '@hmcts/nodejs-logging';
import Axios from 'axios';
import config from 'config';
import { authenticator } from 'otplib';

const logger = Logger.getLogger('service-auth-token');
let token;

export const getTokenFromApi = async (): Promise<string> => {
  logger.info('Refreshing service auth token');

  const url: string = config.get('services.authProvider.url') + '/lease';
  console.log('url is:' + url);
  const microservice: string = config.get('services.authProvider.microservice');
  console.log('microservice is:' + microservice);
  const secret: string = config.get('services.authProvider.secret');
  console.log('secret is:' + secret);

  const citizenClientSecret: string = config.get('services.idam.citizenClientSecret');
  console.log('citizenClientSecret is:' + citizenClientSecret);

  const cosApiClientSecret: string = config.get('services.idam.cosApiClientSecret');
  console.log('cosApiClientSecret is:' + cosApiClientSecret);

  const uploadDocsEmail: string = config.get('services.citizen.UPLOAD_DOCUMENTS_EMAIL');
  console.log('uploadDocsEmail is:' + uploadDocsEmail);

  const oneTimePassword = authenticator.generate(secret);
  console.log('oneTimePassword is:' + oneTimePassword);
  const body = { microservice, oneTimePassword };

  try {
    const response = await Axios.post(url, body);
    logger.info('Service auth token refreshed');
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
