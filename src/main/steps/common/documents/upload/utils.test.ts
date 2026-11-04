import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { PartyType } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { UploadDocumentAPICategory, UploadDocumentCategory } from '../definitions';

import {
  deleteDocument,
  getDocumentCategory,
  getDocumentIdFromUrl,
  getEmptyFileErrorType,
  getUploadedFilesDataReference,
  isDocumentInSession,
  runSynchronous,
} from './utils';

const deleteDocumentMock = jest.spyOn(CosApiClient.prototype, 'deleteDocument');

describe('documents > upload > utils', () => {
  describe('getDocumentIdFromUrl', () => {
    test('should extract document id from url', () => {
      expect(
        getDocumentIdFromUrl(
          'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c'
        )
      ).toBe('c9f56483-6e2d-43ce-9de8-72661755b87c');
    });
  });

  describe('isDocumentInSession', () => {
    test('should return true when document id exists in session documents', () => {
      const documents = [
        {
          document_url:
            'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
        },
      ];
      expect(isDocumentInSession('c9f56483-6e2d-43ce-9de8-72661755b87c', documents)).toBe(true);
    });

    test('should return false when document id does not exist in session documents', () => {
      const documents = [
        {
          document_url:
            'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
        },
      ];
      expect(isDocumentInSession('tampered-document-id-1234', documents)).toBe(false);
    });

    test('should return false when documents is undefined', () => {
      expect(isDocumentInSession('c9f56483-6e2d-43ce-9de8-72661755b87c', undefined)).toBe(false);
    });
  });

  describe('deleteDocuments', () => {
    test('should remove document from upload files list', async () => {
      const req = mockRequest({
        session: {
          user: { id: '1234' },
          userCase: {
            id: '1234',
            caseType: 'FL401',
            applicantsFL401: {
              firstName: 'test',
              lastName: 'user',
            },
            applicantUploadFiles: [
              {
                document_url:
                  'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
                document_binary_url: 'string',
                document_filename: 'string',
                document_hash: 'string',
                document_creation_date: 'string',
                name: 'file_example_TIFF_1MB',
              },
            ],
          },
        },
        query: {
          documentId: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
        },
      });
      const res = mockResponse();
      deleteDocumentMock.mockResolvedValue('SUCCESS');

      await deleteDocument(req, res);
      await new Promise(process.nextTick);
      expect(req.session.userCase.applicantUploadFiles).toStrictEqual(undefined);
    });

    test('should add error to session when deleteDocument fails', async () => {
      const req = mockRequest({
        session: {
          user: { id: '1234' },
          userCase: {
            id: '1234',
            caseType: 'FL401',
            applicantsFL401: {
              firstName: 'test',
              lastName: 'user',
            },
            applicantUploadFiles: [
              {
                document_url:
                  'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
                document_binary_url: 'string',
                document_filename: 'string',
                document_hash: 'string',
                document_creation_date: 'string',
                name: 'file_example_TIFF_1MB',
              },
            ],
          },
        },
        query: {
          documentId: 'c9f56483-6e2d-43ce-9de8-72661755b87c',
        },
      });
      const res = mockResponse();
      deleteDocumentMock.mockRejectedValue('500');

      await deleteDocument(req, res);
      await new Promise(process.nextTick);
      expect(req.session.errors).toStrictEqual([
        { errorType: 'deleteError', propertyName: 'uploadDocumentFileUpload' },
      ]);
    });

    test('should reject deletion when document id does not belong to user session', async () => {
      deleteDocumentMock.mockClear();
      const req = mockRequest({
        session: {
          user: { id: '1234' },
          userCase: {
            id: '1234',
            caseType: 'FL401',
            applicantsFL401: {
              firstName: 'test',
              lastName: 'user',
            },
            applicantUploadFiles: [
              {
                document_url:
                  'http://dm-store-aat.service.core-compute-aat.internal/documents/c9f56483-6e2d-43ce-9de8-72661755b87c',
                document_binary_url: 'string',
                document_filename: 'string',
                document_hash: 'string',
                document_creation_date: 'string',
                name: 'file_example_TIFF_1MB',
              },
            ],
          },
        },
        query: {
          documentId: 'tampered-document-id-1234',
        },
      });
      const res = mockResponse();

      await deleteDocument(req, res);
      await new Promise(process.nextTick);
      expect(deleteDocumentMock).not.toHaveBeenCalled();
      expect(req.session.errors).toStrictEqual([
        { errorType: 'deleteError', propertyName: 'uploadDocumentFileUpload' },
      ]);
    });
  });

  describe('runSynchronous', () => {
    const buildReq = (): AppRequest => {
      const req = mockRequest();
      req.sessionID = 'session-1';
      req.session.reload = jest.fn((done: (err?: Error | null) => void) => done(null));
      return req;
    };

    test('should run tasks for the same session one after another', async () => {
      const order: string[] = [];
      const task = (name: string, ms: number) => async () => {
        order.push(`${name} start`);
        await new Promise(resolve => setTimeout(resolve, ms));
        order.push(`${name} end`);
      };
      const req = buildReq();
      const res = mockResponse();

      await Promise.all([runSynchronous(req, res, task('A', 20)), runSynchronous(req, res, task('B', 0))]);

      expect(order).toEqual(['A start', 'A end', 'B start', 'B end']);
    });

    test('should return a 500 and not run the task if the session reload fails', async () => {
      const req = buildReq();
      Object.assign(req.session, {
        reload: jest.fn((done: (err?: Error | null) => void) => done(new Error('failed'))),
      });
      const res = mockResponse();
      const task = jest.fn();

      await runSynchronous(req, res, task);

      expect(task).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });

    test('should not lose an update when two requests change the session at the same time', async () => {
      let store: string[] = [];

      const buildSessionReq = () => {
        const copy = { files: [] as string[] };
        const req = buildReq();
        Object.assign(req.session, {
          reload: jest.fn((done: (err?: Error | null) => void) => {
            copy.files = [...store];
            done(null);
          }),
        });
        return { req, copy };
      };

      const addFile = (copy: { files: string[] }, name: string, ms: number) => async () => {
        const files = copy.files;
        await new Promise(resolve => setTimeout(resolve, ms));
        store = [...files, name];
      };

      const a = buildSessionReq();
      const b = buildSessionReq();

      await Promise.all([
        runSynchronous(a.req, mockResponse(), addFile(a.copy, 'a.pdf', 20)),
        runSynchronous(b.req, mockResponse(), addFile(b.copy, 'b.pdf', 0)),
      ]);

      expect(store).toEqual(['a.pdf', 'b.pdf']);
    });
  });

  describe('getUploadedFilesDataReference', () => {
    test('should return the applicant upload field for an applicant', () => {
      expect(getUploadedFilesDataReference(PartyType.APPLICANT)).toBe('applicantUploadFiles');
    });

    test('should return the respondent upload field for a respondent', () => {
      expect(getUploadedFilesDataReference(PartyType.RESPONDENT)).toBe('respondentUploadFiles');
    });
  });

  describe('getEmptyFileErrorType', () => {
    test('should return noStatementOrFile for position statements', () => {
      expect(getEmptyFileErrorType(UploadDocumentCategory.POSITION_STATEMENTS)).toBe('noStatementOrFile');
    });

    test('should return noFile for other document categories', () => {
      expect(getEmptyFileErrorType(UploadDocumentCategory.MEDICAL_RECORDS)).toBe('noFile');
    });
  });

  describe('getDocumentCategory', () => {
    test('should select the applicant-specific witness statement category', () => {
      expect(getDocumentCategory(UploadDocumentCategory.WITNESS_STATEMENTS, PartyType.APPLICANT)).toBe(
        UploadDocumentAPICategory.APPLICANT_WITNESS_STATEMENTS
      );
    });

    test('should select the respondent-specific witness statement category', () => {
      expect(getDocumentCategory(UploadDocumentCategory.WITNESS_STATEMENTS, PartyType.RESPONDENT)).toBe(
        UploadDocumentAPICategory.RESPONDENT_WITNESS_STATEMENTS
      );
    });

    test('should map FM5 documents to the FM5 API category', () => {
      expect(getDocumentCategory(UploadDocumentCategory.FM5_DOCUMENT, PartyType.APPLICANT)).toBe(
        UploadDocumentAPICategory.FM5_DOCUMENT
      );
    });
  });
});
