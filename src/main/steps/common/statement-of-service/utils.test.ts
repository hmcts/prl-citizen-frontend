import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { CaseWithId } from '../../../app/case/case';
import { en as commonContentEn } from '../common.content';

import { languages as uploadSOSLang } from './upload/content';
import { deleteDocument, handleError, prepareSummaryList, removeErrors } from './utils';
import { languages as whoWasServedLang } from './who-was-served/content';

const deleteDocumentMock = jest.spyOn(CosApiClient.prototype, 'deleteDocument');

describe('statement-of-service > utils', () => {
  describe('removeErrors', () => {
    test('should not return statementOfServiceDoc errors', () => {
      expect(
        removeErrors([
          {
            errorType: 'multipleFiles',
            propertyName: 'statementOfServiceDoc',
          },
          {
            errorType: 'uploadError',
            propertyName: 'statementOfServiceDoc',
          },
          { errorType: 'required', propertyName: 'needsResolution' },
        ])
      ).toStrictEqual([{ errorType: 'required', propertyName: 'needsResolution' }]);
    });
  });

  describe('handleError', () => {
    test('should return existing statementOfServiceDoc and add new error if omitOtherErrors false', () => {
      expect(
        handleError([{ errorType: 'uploadError', propertyName: 'statementOfServiceDoc' }], 'multipleFiles', false)
      ).toStrictEqual([
        { errorType: 'uploadError', propertyName: 'statementOfServiceDoc' },
        {
          errorType: 'multipleFiles',
          propertyName: 'statementOfServiceDoc',
        },
      ]);
    });

    test('should remmove existing statementOfServiceDoc errors and add new error if omitOtherErrors true', () => {
      expect(
        handleError([{ errorType: 'uploadError', propertyName: 'statementOfServiceDoc' }], 'multipleFiles', true)
      ).toStrictEqual([
        {
          errorType: 'multipleFiles',
          propertyName: 'statementOfServiceDoc',
        },
      ]);
    });
  });

  describe('deleteDocument', () => {
    let req;
    let res;

    beforeEach(() => {
      req = mockRequest();
      res = mockResponse();
    });

    test('should delete document with no errors', async () => {
      req.params = { context: 'context', removeFileId: '1234' };
      req.session.userCase.sos_document = {
        document_url: 'test2/1234',
        document_binary_url: 'binary/test2/1234',
        document_filename: 'test_document_2',
        document_hash: '1234',
        document_creation_date: '1/1/2024',
      };
      deleteDocumentMock.mockResolvedValue('SUCCESS');

      await deleteDocument(req, res);

      expect(req.session.save).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('/applicant/statement-of-service/upload/context');
      expect(req.session.userCase.sos_document).toBe(undefined);
      expect(req.session.errors).toStrictEqual([]);
    });

    test('should catch error when deleting document', async () => {
      req.params = { context: 'context', removeFileId: '1234' };
      req.session.userCase.sos_document = {
        document_url: 'test2/1234',
        document_binary_url: 'binary/test2/1234',
        document_filename: 'test_document_2',
        document_hash: '1234',
        document_creation_date: '1/1/2024',
      };
      deleteDocumentMock.mockRejectedValue('Failure');

      await deleteDocument(req, res);

      expect(req.session.save).toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('/applicant/statement-of-service/upload/context');
      expect(req.session.userCase.sos_document).toStrictEqual({
        document_binary_url: 'binary/test2/1234',
        document_creation_date: '1/1/2024',
        document_filename: 'test_document_2',
        document_hash: '1234',
        document_url: 'test2/1234',
      });
      expect(req.session.errors).toStrictEqual([
        {
          errorType: 'deleteError',
          propertyName: 'statementOfServiceDoc',
        },
      ]);
    });
  });

  describe('prepareSummaryList', () => {
    test('should return correct summary list', () => {
      const userCase = {
        sos_respondentsServed: ['123', '1234'],
        respondents: [
          {
            id: '123',
            value: {
              firstName: 'first',
              lastName: 'respondent',
              user: {
                idamId: '123',
              },
            },
          },
          {
            id: '1234',
            value: {
              firstName: 'second',
              lastName: 'respondent',
              user: {
                idamId: '1234',
              },
            },
          },
        ],
        sos_respondentsServedDate: {
          day: '1',
          month: '1',
          year: '2024',
        },
        sos_document: {
          document_url: 'test2/1234',
          document_binary_url: 'binary/test2/1234',
          document_filename: 'test_document_2',
          document_hash: '1234',
          document_creation_date: '1/1/2024',
        },
      } as unknown as Partial<CaseWithId>;

      expect(
        prepareSummaryList(
          {
            whoWasServedLabel: whoWasServedLang.en.whoWasServedLabel,
            servedDateLabel: whoWasServedLang.en.servedDateLabel,
            filesUploadedLabel: uploadSOSLang.en.filesUploadedLabel,
            change: commonContentEn.change,
          },
          'personal-service',
          userCase
        )
      ).toStrictEqual([
        {
          actions: {
            items: [
              {
                href: '/applicant/statement-of-service/who-was-served/personal-service',
                text: 'Change',
                visuallyHiddenText: 'Change',
              },
            ],
          },
          key: {
            text: 'Who was served?',
          },
          value: {
            html: 'first respondent<br/>second respondent',
          },
        },
        {
          actions: {
            items: [
              {
                href: '/applicant/statement-of-service/who-was-served/personal-service',
                text: 'Change',
                visuallyHiddenText: 'Change',
              },
            ],
          },
          key: {
            text: 'When were they served?',
          },
          value: {
            html: '01 Jan 2024',
          },
        },
        {
          actions: {
            items: [
              {
                href: '/applicant/statement-of-service/upload/personal-service',
                text: 'Change',
                visuallyHiddenText: 'Change',
              },
            ],
          },
          key: {
            text: 'Files uploaded',
          },
          value: {
            html: 'test_document_2',
          },
        },
      ]);
    });
  });
});
