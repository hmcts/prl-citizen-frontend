import axios from 'axios';
import { LoggerInstance } from 'winston';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { UserDetails } from '../controller/AppRequest';

import { CaseApi, caseApi } from './C100CaseApi';
import { C100_CASE_EVENT, C100_CASE_TYPE, CaseData } from './definition';

jest.mock('axios');

const userDetails: UserDetails = {
  accessToken: '123',
  email: 'billy@bob.com',
  givenName: 'billy',
  familyName: 'bob',
  id: '1234',
};
const mockData = {
  caseTypeOfApplication: C100_CASE_TYPE.C100,
  c100RebuildChildPostCode: 'AB2 3BV',
  helpWithFeesReferenceNumber: 'HWF-1234',
  c100RebuildReturnUrl: 'c100-rebuild/dummyUrl',
  id: '1234',
  c100RebuildConsentOrderDetails: '{}',
  paymentReferenceNumber: undefined,
  paymentServiceRequestReferenceNumber: undefined,
  applicantPcqId: undefined,
};

describe('CaseApi', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  const mockLogger = {
    error: jest.fn().mockImplementation((message: string) => message),
    info: jest.fn().mockImplementation((message: string) => message),
  } as unknown as LoggerInstance;

  let api; // = new CaseApi(mockedAxios, mockLogger);

  beforeEach(() => {
    api = new CaseApi(mockedAxios, mockLogger);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Should create api', async () => {
    caseApi(userDetails, mockLogger);
    expect(api).toBeCalled;
  });

  test('Should create a case', async () => {
    const request = {
      caseTypeOfApplication: C100_CASE_TYPE.C100,
      caseAccessCategory: C100_CASE_TYPE.C100,
      c100RebuildReturnUrl: '/c100-rebuild/screening-questions/consent-agreement',
      c100RebuildChildPostCode: 'SA11AA',
    };

    mockedAxios.post.mockResolvedValueOnce({
      data: {
        id: '1234',
        ...request,
        state: 'AWAITING_SUBMISSION_TO_HMCTS',
        noOfDaysRemainingToSubmitCase: '28',
      },
    });
    const req = mockRequest({
      session: {
        userCase: {
          id: '1234',
          c100RebuildChildPostCode: 'SA11AA',
        },
      },
    });
    const userCase = await api.createCase(req);

    expect(userCase).toStrictEqual({
      id: '1234',
      ...request,
      state: 'AWAITING_SUBMISSION_TO_HMCTS',
      noOfDaysRemainingToSubmitCase: '28',
    });
    expect(mockedAxios.post).toHaveBeenCalledWith('/case/create', request);
  });

  test('Should throw error if there is an error in creating a case', async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        status: 500,
      },
      config: {
        method: 'POST',
      },
    });

    await expect(api.createCase()).rejects.toThrow('Case could not be created.');
    expect(mockLogger.error).toHaveBeenCalledWith('API Error POST undefined 500');
  });

  test('Should create a case using testing support', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        id: '1234',
      },
    });
    const userCase = await api.createCaseTestingSupport();

    expect(userCase.caseId).toBe('1234');
    expect(mockedAxios.post).toHaveBeenCalledWith('/testing-support/create-dummy-citizen-case');
  });

  test('Should throw error if there is an error in creating a case using testing support', async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        status: 500,
      },
      config: {
        method: 'POST',
      },
    });

    await expect(api.createCaseTestingSupport()).rejects.toThrow('Case could not be created.');
    expect(mockLogger.error).toHaveBeenCalledWith('API Error POST undefined 500');
  });

  test('Should update case if one is found', async () => {
    //mock
    const caseData = {
      ...mockData,
      miam: 'c100RebuildMaim',
    };
    mockedAxios.post.mockResolvedValueOnce({ data: caseData });
    const updatedCaseData = await api.submitC100Case(
      '1234',
      caseData,
      '{"miam":"c100RebuildMaim"}',
      'c100-rebuild/dummyUrl',
      C100_CASE_EVENT.CASE_UPDATE
    );

    expect(updatedCaseData).toStrictEqual({ data: caseData });
    expect(mockedAxios.post).toHaveBeenCalledWith('/citizen/1234/c100-rebuild/dummyUrl/submit-c100-application', {
      caseTypeOfApplication: C100_CASE_TYPE.C100,
      c100RebuildChildPostCode: 'AB2 3BV',
      helpWithFeesReferenceNumber: 'HWF-1234',
      c100RebuildMaim: '{"miam":"c100RebuildMaim"}',
      c100RebuildReturnUrl: '{"miam":"c100RebuildMaim"}',
      id: '1234',
      c100RebuildConsentOrderDetails: '{}',
      paymentReferenceNumber: undefined,
      paymentServiceRequestReferenceNumber: undefined,
      applicantPcqId: undefined,
    });
  });

  test('Should throw error if there is an error updating case', async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        status: 500,
      },
      config: {
        method: 'POST',
      },
    });

    await expect(api.submitC100Case('1234', userDetails, 'c100-rebuild/dummyUrl')).rejects.toThrow(
      'Case could not be updated.'
    );
    expect(mockLogger.error).toHaveBeenCalledWith('API Error POST undefined 500');
  });

  test('Should save c100 draft application', async () => {
    const caseData = {
      ...mockData,
      miam: 'c100RebuildMaim',
      applicantPcqId: '123',
      paymentDetails: {
        serviceRequestReference: '1234',
        payment_reference: '12345',
      },
    };
    mockedAxios.post.mockResolvedValueOnce({ data: caseData });
    const updatedCaseData = await api.saveC100DraftApplication(
      '1234',
      caseData,
      '{"miam":"c100RebuildMaim"}',
      'c100-rebuild/dummyUrl',
      C100_CASE_EVENT.CASE_UPDATE
    );

    expect(updatedCaseData).toStrictEqual({ data: caseData });
    expect(mockedAxios.post).toHaveBeenCalledWith('/citizen/1234/save-c100-draft-application', {
      applicantPcqId: '123',
      caseTypeOfApplication: C100_CASE_TYPE.C100,
      c100RebuildChildPostCode: 'AB2 3BV',
      helpWithFeesReferenceNumber: 'HWF-1234',
      c100RebuildMaim: '{"miam":"c100RebuildMaim"}',
      c100RebuildReturnUrl: '{"miam":"c100RebuildMaim"}',
      c100RebuildConsentOrderDetails: '{}',
      id: '1234',
      paymentReferenceNumber: '12345',
      paymentServiceRequestReferenceNumber: '1234',
    });
    expect(updatedCaseData.data).toStrictEqual(caseData);
  });

  test('Should throw error if there is an error saving draft application', async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        status: 500,
      },
      config: {
        method: 'POST',
      },
    });

    await expect(api.saveC100DraftApplication('1234', userDetails, 'c100-rebuild/dummyUrl')).rejects.toThrow(
      'Case could not be updated.'
    );
    expect(mockLogger.error).toHaveBeenCalledWith('API Error POST undefined 500');
  });

  test('Should throw error if there is no caseID', async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        status: 500,
      },
      config: {
        method: 'GET',
      },
    });

    await expect(api.retrieveCaseById()).rejects.toThrow('caseId cannot be empty');
  });
  test('Should retrive case', async () => {
    const response = {
      caseTypeOfApplication: C100_CASE_TYPE.C100,
      c100RebuildChildPostCode: 'AB2 3BV',
      helpWithFeesReferenceNumber: 'HWF-1234',
      c100RebuildReturnUrl: 'c100-rebuild/dummyUrl',
      applicantCaseName: 'C100 test case',
      id: '1234',
    };
    mockedAxios.get.mockReturnValueOnce({ data: response } as unknown as Promise<CaseData>);
    const actual = await api.retrieveCaseById('1234');
    expect(actual).toEqual({
      c100RebuildChildPostCode: 'AB2 3BV',
      c100RebuildReturnUrl: 'c100-rebuild/dummyUrl',
      caseId: '1234',
      caseTypeOfApplication: 'C100',
      helpWithFeesReferenceNumber: 'HWF-1234',
    });
  });

  test('Should retrieve case with detransformed data', async () => {
    const response = {
      caseTypeOfApplication: C100_CASE_TYPE.C100,
      c100RebuildChildPostCode: 'AB2 3BV',
      helpWithFeesReferenceNumber: 'HWF-1234',
      c100RebuildReturnUrl: 'c100-rebuild/dummyUrl',
      applicantCaseName: 'C100 test case',
      id: '1234',
      c100RebuildApplicantDetails: '{"applicantCaseName": "new case name", "caseId": "6789"}',
      noOfDaysRemainingToSubmitCase: '10',
      state: 'AWAITING_SUBMISSION_TO_HMCTS',
    };
    mockedAxios.get.mockReturnValueOnce({ data: response } as unknown as Promise<CaseData>);
    const actual = await api.retrieveCaseById('1234');
    expect(actual).toEqual({
      applicantCaseName: 'new case name',
      c100RebuildChildPostCode: 'AB2 3BV',
      c100RebuildReturnUrl: 'c100-rebuild/dummyUrl',
      caseId: '6789',
      caseTypeOfApplication: 'C100',
      helpWithFeesReferenceNumber: 'HWF-1234',
      noOfDaysRemainingToSubmitCase: '10',
      state: 'AWAITING_SUBMISSION_TO_HMCTS',
    });
  });

  test('Should throw error when case could not be retrieved', async () => {
    mockedAxios.get.mockRejectedValue({
      response: {
        status: 500,
      },
      config: {
        method: 'GET',
      },
    });

    await expect(api.retrieveCaseById('1234')).rejects.toThrow('Case could not be retreived');
    expect(mockLogger.error).toHaveBeenCalled();
  });

  test('Should delete a case', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        id: '1234',
      },
    });
    const req = mockRequest();
    req.session = {
      ...req.session,
      userCase: {
        id: '1234',
        caseId: '1234',
        caseTypeOfApplication: 'C100',
        c100RebuildReturnUrl: 'MOCK_URL',
        state: 'AWAITING_SUBMISSION_TO_HMCTS',
        noOfDaysRemainingToSubmitCase: '10',
      },
      save: jest.fn(),
    };
    await api.deleteCase(req.session.userCase, req.session);

    expect(req.session.userCase).toStrictEqual({});
    expect(req.session.save).toHaveBeenCalled();
    expect(mockedAxios.post).toHaveBeenCalledWith('/citizen/1234/delete-application', {
      id: '1234',
      caseId: '1234',
      caseTypeOfApplication: 'C100',
      c100RebuildReturnUrl: 'MOCK_URL',
      state: 'READY_FOR_DELETION',
      noOfDaysRemainingToSubmitCase: '10',
    });
  });

  test('Should throw error when case could not be deleted', async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        status: 500,
      },
      config: {
        method: 'POST',
      },
    });

    await expect(api.deleteCase()).rejects.toThrow('Error occured, case could not be deleted.');
    expect(mockLogger.error).toHaveBeenCalledWith('API Error', 'caseId not found so case could not be deleted.');
  });

  test('Should submit case on citizen-case-submit', async () => {
    //mock
    const caseData = {
      ...mockData,
    };
    mockedAxios.post.mockResolvedValueOnce({ data: caseData });
    const updatedCaseData = await api.submitC100Case(
      '1234',
      caseData,
      'c100-rebuild/dummyUrl',
      C100_CASE_EVENT.CASE_SUBMIT
    );

    expect(updatedCaseData).toStrictEqual({ data: caseData });
    expect(mockedAxios.post).toHaveBeenCalledWith('/citizen/1234/citizen-case-submit/submit-c100-application', {
      ...mockData,
    });
  });

  test('Should submit case on citizen-case-submit-with-hwf', async () => {
    //mock
    const caseData = {
      ...mockData,
    };
    mockedAxios.post.mockResolvedValueOnce({ data: caseData });
    const updatedCaseData = await api.submitC100Case(
      '1234',
      caseData,
      'c100-rebuild/dummyUrl',
      C100_CASE_EVENT.CASE_SUBMIT_WITH_HWF
    );

    expect(updatedCaseData).toStrictEqual({ data: caseData });
    expect(mockedAxios.post).toHaveBeenCalledWith('/citizen/1234/citizenCaseSubmitWithHWF/submit-c100-application', {
      ...mockData,
    });
  });

  test('Should download C100 application', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        id: '1234',
      },
    });
    const responseData = await api.downloadC100Application('1234');
    expect(responseData).toStrictEqual({
      id: '1234',
    });
    expect(mockedAxios.get).toHaveBeenCalledWith('/1234/download', { responseType: 'arraybuffer' });
  });

  test('Should throw error when case C100 application could not be downloaded', async () => {
    mockedAxios.get.mockRejectedValue({
      response: {
        status: 500,
      },
      config: {
        method: 'GET',
      },
    });

    await expect(api.downloadC100Application('1234')).rejects.toThrow(
      'Error occured, C100 application document could not be downloaded.'
    );
    expect(mockLogger.error).toHaveBeenCalledWith('API Error GET undefined 500');
  });

  test('logError should log method and url for error with request', async () => {
    mockedAxios.get.mockRejectedValue({
      request: {
        status: 500,
      },
      config: {
        method: 'GET',
        url: '/1234/download',
      },
    });
    await expect(api.downloadC100Application('1234')).rejects.toThrow(
      'Error occured, C100 application document could not be downloaded.'
    );
    expect(mockLogger.error).toHaveBeenCalledWith('API Error GET /1234/download');
  });

  test('withdrawCase should withdraw case', async () => {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        id: '1234',
      },
    });

    const userCase = {
      id: '1234',
      caseId: '1234',
      caseTypeOfApplication: 'C100',
      c100RebuildReturnUrl: 'MOCK_URL',
      state: 'AWAITING_SUBMISSION_TO_HMCTS',
      noOfDaysRemainingToSubmitCase: '10',
      withdrawApplication: 'Yes',
      withdrawApplicationReason: 'withdraw reason',
    };

    await api.withdrawCase('1234', userCase);

    expect(mockedAxios.post).toHaveBeenCalledWith('/citizen/1234/withdraw', {
      withDrawApplicationData: {
        withDrawApplication: 'Yes',
        withDrawApplicationReason: 'withdraw reason',
      },
    });
  });

  test('withdrawCase should throw error when no caseId given', async () => {
    await expect(api.withdrawCase(undefined, undefined)).rejects.toThrow('Error occured, case could not be withdrawn.');
    expect(mockLogger.error).toHaveBeenCalledWith('API Error', 'caseId not found so case could not be withdrawn.');
  });
});
