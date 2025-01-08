import { AxiosError } from 'axios';
import { LoggerInstance } from 'winston';

export const logError = (error: AxiosError, logger: LoggerInstance): void => {
  if (error.response) {
    logger.error(`API Error ${error.config?.method} ${error.config?.url} ${error.response.status}`);
    logger.info('Response: ', error.response.data);
  } else if (error.request) {
    logger.error(`API Error ${error.config?.method} ${error.config?.url}`);
  } else {
    logger.error('API Error', error.message);
  }
};
