import { LoggerInstance } from 'winston';

import { UserDetails } from '../controller/AppRequest';

import { getFeesForC100ApplicationSubmission } from './fees-lookup-api';

jest.mock('axios');

describe('getFeesForC100ApplicationSubmission', () => {
  const mockLogger = {
    error: jest.fn().mockImplementation((message: string) => message),
    info: jest.fn().mockImplementation((message: string) => message),
  } as unknown as LoggerInstance;

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should throw an error', async () => {
    const userDetails: UserDetails = {
      accessToken: '123',
      email: 'billy@bob.com',
      givenName: 'billy',
      familyName: 'bob',
      id: '1234',
    };

    try {
      await getFeesForC100ApplicationSubmission(userDetails, mockLogger);
    } catch (err) {
      //eslint-disable-next-line jest/no-conditional-expect
      expect(mockLogger.error(err.message)).toEqual('Fee could not be fetched.');
      //eslint-disable-next-line jest/no-conditional-expect
      await expect(getFeesForC100ApplicationSubmission(userDetails, mockLogger)).rejects.toThrow(
        'Fee could not be fetched.'
      );
      //eslint-disable-next-line jest/no-conditional-expect
      expect(mockLogger.error).toHaveBeenCalled();
    }
  });
});
