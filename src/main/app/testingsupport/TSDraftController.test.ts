import axios from 'axios';
import config from 'config';
import { LoggerInstance } from 'winston';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import TSDraftController from '../../app/testingsupport/TSDraftController';
import { HOME_URL } from '../../steps/urls';
import { CaseApi } from '../case/C100CaseApi';

jest.mock('axios');
config.get = jest.fn();

const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

const mockLogger = {
  error: jest.fn().mockImplementation((message: string) => message),
  info: jest.fn().mockImplementation((message: string) => message),
} as unknown as LoggerInstance;

describe('TSDraftController', () => {
  const req = mockRequest();
  const res = mockResponse();

  beforeEach(() => {
    req.session.userCase = {
      id: '1234',
      citizenUserFirstNames: 'John',
      citizenUserLastNames: 'Smith',
      citizenUserAdditionalName: 'Johnny Smith',
      citizenUserDateOfBirth: {
        year: '2000',
        month: '11',
        day: '14',
      },
      citizenUserPlaceOfBirth: 'london',
      citizenUserPhoneNumber: '0987654321',
      citizenUserEmailAddress: 'a.b@test.com',
      citizenUserAddress1: 'Flatc1',
      citizenUserAddress2: 'Unkonwn lane',
      citizenUserAddressTown: 'Dummy Town',
      citizenUserAddressCountry: 'Dummy County',
      citizenUserAddressPostcode: 'SW13ND',
      isAtAddressLessThan5Years: 'No',
      citizenUserAddressHistory: "Don't want to state",
      applicantCaseName: 'MOCK_CASE_NAME',
      caseTypeOfApplication: 'C100',
    };
  });

  test('Should call post  > Home URL', async () => {
    await TSDraftController.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith(HOME_URL);
  });

  test('Should save and redirect for createC100Draft', async () => {
    mockedAxios.post.mockResolvedValueOnce({ data: { id: '1234' } });
    mockedAxios.get.mockResolvedValueOnce({ data: req.session.userCase });
    const mockApi = new CaseApi(mockedAxios, mockLogger);
    req.locals.C100Api = mockApi;
    await TSDraftController.createTSC100Draft(req, res);

    expect(req.session.userCase).toStrictEqual({
      caseId: '1234',
      caseTypeOfApplication: 'C100',
      c100RebuildChildPostCode: undefined,
      c100RebuildReturnUrl: undefined,
      helpWithFeesReferenceNumber: undefined,
      noOfDaysRemainingToSubmitCase: undefined,
      state: undefined,
    });
    expect(req.session.save).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/c100-rebuild/check-your-answers');
  });

  test('Should return error for createC100Draft', async () => {
    await expect(TSDraftController.createTSC100Draft(req, res)).rejects.toThrow('C100case could not be created');
  });

  // test('Should return to Home URL deleteC100Draft', async () => {
  //   const reqs = mockRequest({
  //     body: {
  //       submit: true,
  //     },
  //     session: {
  //       userCase: {
  //         caseId: '1234567890123456',
  //       },
  //     },
  //   });

  //   reqs.body['ids'] = '1234567890123456';
  //   const ress = mockResponse();

  //   await TSDraftController.deleteTSC100Draft(reqs, ress);

  //   expect(res.redirect).toHaveBeenCalledWith(HOME_URL);
  // });

  test('Should catch error for deleteC100Draft', async () => {
    const reqs = mockRequest({
      body: {
        submit: true,
      },
      session: {
        userCase: {
          caseId: '1234567890123456',
        },
      },
    });

    reqs.body['ids'] = '1234567890123456';
    const ress = mockResponse();
    mockedAxios.post.mockRejectedValueOnce;
    reqs.locals.C100Api = undefined;
    await expect(TSDraftController.deleteTSC100Draft(reqs, ress)).rejects.toThrow('C100case could not be deleted');
  });
});
