/* eslint-disable import/order */
import axios from 'axios';
import config from 'config';

jest.retryTimes(20);
jest.setTimeout(15000);

const servicesToCheck = [
  { name: 'Private Law', url: process.env.TEST_URL },
  { name: 'IDAM Web', url: config.get('services.idam.authorizationURL') },
  { name: 'IDAM API', url: config.get('services.idam.tokenURL') },
  { name: 'Auth Provider', url: config.get('services.authProvider.url') },
  { name: 'CCD Data Store', url: config.get('services.case.url') },
  { name: 'COS', url: config.get('services.cos.url') },
  { name: 'Document Management', url: config.get('services.documentManagement.url') },
  {
    name: 'Postcode Lookup',
    url: config.get('services.postcodeLookup.url'),
    healthEndpoint: '/search/places/v1',
    externalService: true,
  },
];

const checkService = async (url: string) => {
  const response = await axios.get(url);
  if (response.status !== 200 || response.data?.status !== 'UP') {
    throw new Error(`Status: ${response.status} Data: '${JSON.stringify(response.data)}'`);
  }
};

const checkExternalService = async (url: string) => {
  const response = await axios.get(url);
  if (response.status !== 200) {
    throw new Error(`Status: ${response.status} Data: '${JSON.stringify(response.data)}'`);
  }
};

describe.each(servicesToCheck)(
  '$name should return 200 status UP',
  ({ name, url, healthEndpoint, externalService }) => {
    const parsedUrl = new URL(healthEndpoint || '/health', url as string).toString();

    test(`${name}: ${parsedUrl}`, async () => {
      let checkServiceHealth;
      if (externalService) {
        checkServiceHealth = checkExternalService;
      } else {
        checkServiceHealth = checkService;
      }
      await expect(checkServiceHealth(parsedUrl)).resolves.not.toThrow();
    });
  }
);
