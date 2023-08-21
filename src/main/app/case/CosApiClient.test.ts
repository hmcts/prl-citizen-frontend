import axios, { AxiosInstance } from 'axios';

import { mockRequest } from '../../../test/unit/utils/mockRequest';

import { CosApiClient } from './CosApiClient';
import { CaseWithId } from './case';
import { CaseData, CaseEvent, CaseType, PartyType } from './definition';
import { toApiFormat } from './to-api-format';

jest.mock('axios');
jest.mock('config');
jest.mock('../auth/service/get-service-auth-token');
jest.mock('form-data');

const mockedAxios = axios as jest.Mocked<typeof axios>;
describe('CosApiClient', () => {
  const DocumentUploadReq = {
    caseId: '',
    categoryId: '',
    partyId: '',
    partyName: '',
    partyType: PartyType.APPLICANT,
    documents: [
      {
        document_url: 'abc',
        document_binary_url: 'bcd',
        document_filename: 'test',
        document_hash: 'test',
        document_creation_date: 'testDate',
      },
    ],
  };
  const partyDetails = {
    firstName: 'testuser',
    lastName: 'Citizen',
    email: 'abc@example.net',
    dateOfBirth: '03-20-2023',
    phoneNumber: '7755664466',
    placeOfBirth: 'BPP',
    previousName: 'test',
    isAtAddressLessThan5Years: 'No',
    addressLivedLessThan5YearsDetails: 'Hello',
    address: {
      AddressLine1: 'string',
      AddressLine2: 'string',
      AddressLine3: 'string',
      PostTown: 'string',
      County: 'string',
      PostCode: 'string',
      Country: 'string',
    },
    user: {
      idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
      email: 'test@example.net',
    },
    response: {
      legalRepresentation: 'No',
    },
  };
  test('connect cos api', async () => {
    const mockGet = jest.fn().mockResolvedValueOnce({ data: { mockPayment: 'data' } });
    mockedAxios.create.mockReturnValueOnce({ get: mockGet } as unknown as AxiosInstance);
    const client = new CosApiClient('abc', 'http://return-url');
    const actual = await client.get();
    expect(mockGet).toHaveBeenCalledWith('/');
    expect(actual).toEqual({ mockPayment: 'data' });
  });
  test('cannot connect cos api', async () => {
    mockedAxios.create.mockRejectedValueOnce;
    const client = new CosApiClient('abc', 'http://return-url');
    await expect(client.get()).rejects.toThrow('Could not connect to cos-api client.');
  });

  test('retrieveByCaseId', async () => {
    const response = { id: '200', state: 'SUCCESS' };
    mockedAxios.get.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const actual = await client.retrieveByCaseId('1234567', req.session.user);
    expect(actual).toEqual(response);
    expect(1).toEqual(1);
  });

  test('validateAccessCode', async () => {
    const response = { id: '200', state: 'SUCCESS' };
    mockedAxios.get.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const actual = await client.validateAccessCode('1234567', '1234', req.session.user);
    expect(actual).toEqual(response);
  });

  test('updateCaseData', async () => {
    const response = { id: '200', state: 'SUCCESS' };
    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const partyType = PartyType.APPLICANT;
    const caseType = CaseType.C100;
    const caseEvent = CaseEvent.CITIZEN_CASE_UPDATE;
    const client = new CosApiClient('abc', 'http://return-url');
    const actual = await client.updateCaseData(
      req.session.user,
      '123456',
      partyDetails,
      partyType,
      caseType,
      caseEvent
    );
    expect(actual).toEqual(response);
  });
  test('can not connect updateCaseData', async () => {
    // const response = { id: '200', state: 'SUCCESS' };
    mockedAxios.post.mockRejectedValueOnce;
    const req = mockRequest();
    const partyType = PartyType.APPLICANT;
    const caseType = CaseType.C100;
    const caseEvent = CaseEvent.CITIZEN_CASE_UPDATE;
    const client = new CosApiClient('abc', 'http://return-url');
    // const actual = await client.updateCaseData(req.session.user, '123456', partyDetails, partyType,caseType, caseEvent);
    // expect(actual).toEqual(response);
    await expect(
      client.updateCaseData(req.session.user, '123456', partyDetails, partyType, caseType, caseEvent)
    ).rejects.toThrow('Case could not be updated.');
  });
  test('updateCase', async () => {
    const response = { id: '200', state: 'SUCCESS' };
    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const caseData = toApiFormat(req?.session?.userCase);
    const actual = await client.updateCase(req.session.user, '123456', caseData, 'update');
    expect(actual).toEqual(response);
  });

  test('getHearingsByCaseID', async () => {
    const response = { id: '200', state: 'SUCCESS' };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<any>);
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const actual = await client.retrieveCaseHearingsByCaseId(req.session.user, '123456');
    expect(actual).toEqual(response);
  });

  test('submitRespondentResponse', async () => {
    const response = { id: '200', state: 'SUCCESS' };
    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const caseData = toApiFormat(req?.session?.userCase);
    const actual = await client.submitRespondentResponse(req.session.user, '123456', '123456', caseData);
    expect(actual).toEqual(response);
  });

  test('generateStatementDocument', async () => {
    const response = {
      document: {
        document_url: 'abc',
        document_binary_url: 'bcd',
        document_filename: 'test',
        document_hash: 'test',
        document_creation_date: 'testDate',
      },
      status: 200,
    };
    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const actual = await client.generateStatementDocument(req.session.user, DocumentUploadReq);
    expect(actual).toEqual(response);
  });

  test('uploadStatementDocument-with api error', async () => {
    mockedAxios.post.mockRejectedValueOnce;
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    await expect(client.uploadStatementDocument(req.session.user, DocumentUploadReq)).rejects.toThrow(
      'Upload citizen statement document failed'
    );
  });

  test('deleteCitizenStatementDocument-', async () => {
    mockedAxios.delete.mockResolvedValueOnce;
    const req = mockRequest({
      session: {
        userCase: {
          applicantUploadFiles: [
            {
              document_url:
                'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
              document_binary_url: '',
              document_filename: '',
              document_hash: '',
              document_creation_date: 'string;',
            },
          ],
        },
      },
    });
    req.params.documentId = 'c9f56483-6e2d-43ce-9de8-72661755b87c';
    const client = new CosApiClient('abc', 'http://return-url');
    const docId = 'c9f56483-6e2d-43ce-9de8-72661755b87c';
    await expect(client.deleteCitizenStatementDocument(req.session.user, docId)).rejects.toThrow(
      'Document could not be deleted.'
    );
  });
  test('submitUploadedDocuments-', async () => {
    const response = {};
    mockedAxios.post.mockReturnValueOnce;
    //mockedAxios.post.mockRejectedValueOnce
    const req = mockRequest({
      session: {
        userCase: {
          applicantUploadFiles: [
            {
              document_url:
                'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
              document_binary_url: '',
              document_filename: '',
              document_hash: '',
              document_creation_date: 'string;',
            },
          ],
        },
      },
    });
    req.params.documentId = 'c9f56483-6e2d-43ce-9de8-72661755b87c';
    const client = new CosApiClient('abc', 'http://return-url');
    const actual = await client.submitUploadedDocuments(req.session.user, req.session.userCase.applicantUploadFiles);
    expect(actual).toEqual(response);
    //await expect(client.submitUploadedDocuments(req.session.user, req.session.userCase.applicantUploadFiles[0])).toBe({});
  });
  test('linkCaseToCitizen', async () => {
    const response = { id: '1234567' };
    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const caseData = toApiFormat(req?.session?.userCase);
    let flag = false;
    try {
      await client.linkCaseToCitizen(req.session.user, '1234567', req, '123456789', caseData);
    } catch (err) {
      flag = true;
    }
    expect(flag).toBe(false);
  });

  test('updateRespondentCase', async () => {
    const response = { id: '1234567' };
    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const caseData = toApiFormat(req?.session?.userCase);
    let flag = false;
    try {
      await client.updateRespondentCase(req.session.user, '123456789', req, caseData);
    } catch (err) {
      flag = true;
    }
    expect(flag).toBe(false);
  });

  test('retrieveCasesByUserId', async () => {
    const response = {
      id: '200',
      state: 'SUCCESS',
      data: [
        {
          caseData: { id: '1234', postCode: 'xyz' },
          stateName: 'Draft',
        },
      ],
    };
    mockedAxios.get.mockReturnValueOnce(response as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const actual = await client.retrieveCasesByUserId(req.session.user);
    expect(actual).toEqual([
      {
        id: '1234',
        postCode: 'xyz',
        caseStatus: {
          state: 'Draft',
        },
      },
    ]);
  });

  test('generateC7Document', async () => {
    const response = {
      status: 'test',
      data: {
        document_binary_url: 'test',
        document_filename: 'test',
      },
    };
    const data = {} as Partial<CaseData>;
    mockedAxios.post.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const actual = await client.generateC7DraftDocument(req.session.user, '123456', '123456789', data);
    expect(actual).not.toBeUndefined;
  });

  test('generateC7Document throws exception', async () => {
    const data = {} as Partial<CaseData>;
    mockedAxios.post.mockRejectedValueOnce;
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    let flag = false;
    try {
      await client.generateC7DraftDocument(req.session.user, '123456', '123456789', data);
    } catch (error) {
      flag = true;
    }
    expect(flag).toEqual(true);
  });
});
describe('CosApiClientWithError', () => {
  test('retrieveByCaseIdWithError', async () => {
    const response = { id: '200', state: 'SUCCESS' };
    mockedAxios.get.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const id = '';
    let flag = true;
    try {
      await client.retrieveByCaseId(id, req.session.user);
    } catch {
      flag = false;
    }
    expect(flag).toEqual(false);
  });

  test('validateAccessCodeWithError', async () => {
    const response = { id: '200', state: 'SUCCESS' };
    mockedAxios.get.mockReturnValueOnce({ data: response } as unknown as Promise<CaseWithId>);
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const id = '';
    let flag = true;
    try {
      await client.validateAccessCode(id, '1234', req.session.user);
    } catch {
      flag = false;
    }
    expect(flag).toEqual(false);
  });

  test('updateCaseWithError', async () => {
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const caseData = toApiFormat(req?.session?.userCase);
    let flag = true;
    try {
      await client.updateCase(req.session.user, '123456', caseData, 'update');
    } catch {
      flag = false;
    }

    expect(flag).toEqual(false);
  });

  test('submitRespondentResponseWithError', async () => {
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const caseData = toApiFormat(req?.session?.userCase);
    let flag = true;
    try {
      await client.submitRespondentResponse(req.session.user, '123456', '123456', caseData);
    } catch {
      flag = false;
    }

    expect(flag).toEqual(false);
  });

  test('generateStatementDocument', async () => {
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const DocumentUploadReq = {
      caseId: '',
      categoryId: '',
      partyId: '',
      partyName: '',
      partyType: PartyType.APPLICANT,
      documents: [
        {
          document_url: '',
          document_binary_url: '',
          document_filename: '',
          document_hash: '',
          document_creation_date: '',
        },
      ],
    };
    let flag = true;
    try {
      await client.generateStatementDocument(req.session.user, DocumentUploadReq);
    } catch {
      flag = false;
    }

    expect(flag).toEqual(false);
  });

  test('uploadStatementDocument', async () => {
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const DocumentUploadReq = {
      caseId: '',
      categoryId: '',
      partyId: '',
      partyName: '',
      partyType: PartyType.APPLICANT,
      documents: [
        {
          document_url: '',
          document_binary_url: '',
          document_filename: '',
          document_hash: '',
          document_creation_date: '',
        },
      ],
    };
    let flag = true;
    try {
      await client.uploadStatementDocument(req.session.user, DocumentUploadReq);
    } catch {
      flag = false;
    }

    expect(flag).toEqual(false);
  });

  test('deleteCitizenStatementDocumentWithError', async () => {
    const req = mockRequest();
    const client = new CosApiClient('abc', 'http://return-url');
    const docId = '12345';
    let flag = true;
    try {
      await client.deleteCitizenStatementDocument(req.session.user, docId);
    } catch {
      flag = false;
    }

    expect(flag).toEqual(false);
  });
});

// describe('RetrieveCaseHearingsByCaseId', () => {
//   test('retrieveCaseHearingsByCaseId', async () => {
//     const req = mockRequest();
//     const client = new CosApiClient('abc', 'http://return-url');
//     const userCase: CaseWithId = {
//       id: '123445566',
//       state: State.AWAITING_SUBMISSION_TO_HMCTS,
//     };

//     const response = await client.retrieveCaseHearingsByCaseId(userCase, req.session.user);

//     expect(response.state).toEqual(State.AWAITING_SUBMISSION_TO_HMCTS);
//   });

//   test('retrieveCaseHearingsByCaseId_Error', async () => {
//     const req = mockRequest();
//     const client = new CosApiClient('abc', 'http://return-url');
//     const userCase: CaseWithId = {
//       id: '',
//       state: State.AWAITING_SUBMISSION_TO_HMCTS,
//     };
//     req.session.user = {};
//     let flag = true;
//     try {
//       await client.retrieveCaseHearingsByCaseId(userCase, req.session.user);
//     } catch {
//       flag = false;
//     }
//     expect(flag).toEqual(false);
//   });
// });
