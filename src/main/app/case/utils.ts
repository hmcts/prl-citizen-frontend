import { AxiosError } from 'axios';
import { LoggerInstance } from 'winston';

export const logError = (error: AxiosError, logger: LoggerInstance): void => {
  if (error.response) {
    logger.error(`API Error ${error.config?.method} ${error.config?.url} ${error.response.status}`);
    const responseData = error.response.data;
    const responseText = Buffer.isBuffer(responseData)
      ? responseData.toString('utf8')
      : typeof responseData === 'string'
      ? responseData
      : JSON.stringify(responseData);

    logger.info(`Response: ${responseText}`);
  } else if (error.request) {
    logger.error(`API Error ${error.config?.method} ${error.config?.url}`);
  } else {
    logger.error('API Error', error.message);
  }
};
