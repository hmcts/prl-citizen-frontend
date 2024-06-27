import { LoggerInstance } from 'winston';

import { UserDetails } from '../controller/AppRequest';

import { getC100ApplicationFee } from './fees-lookup-api';

jest.mock('axios');

describe('getC100ApplicationFee', () => {
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
      await getC100ApplicationFee(userDetails, mockLogger);
    } catch (err) {
      //eslint-disable-next-line jest/no-conditional-expect
      expect(err.message).toBe('Error occured, C100 application fee could not be fetched. - getC100ApplicationFee');
      //eslint-disable-next-line jest/no-conditional-expect
      await expect(getC100ApplicationFee(userDetails, mockLogger)).rejects.toThrow(
        'Error occured, C100 application fee could not be fetched. - getC100ApplicationFee'
      );
      //eslint-disable-next-line jest/no-conditional-expect
      expect(mockLogger.error).toHaveBeenCalled();
    }
  });
});
