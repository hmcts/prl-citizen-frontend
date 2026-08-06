import { getUploadedDocumentErrorType, handleError, removeErrors } from './utils';

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
      handleError(
        [{ errorType: 'uploadError', propertyName: 'statementOfServiceDoc' }],
        'multipleFiles',
        'statementOfServiceDoc',
        false
      )
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
      handleError(
        [{ errorType: 'uploadError', propertyName: 'statementOfServiceDoc' }],
        'multipleFiles',
        'statementOfServiceDoc',
        true
      )
    ).toStrictEqual([
      {
        errorType: 'multipleFiles',
        propertyName: 'statementOfServiceDoc',
      },
    ]);
  });

  describe('getUploadedDocumentErrorType', () => {
    test('should return correct errorType for multiple files', () => {
      expect(
        getUploadedDocumentErrorType(
          {
            document_url: 'test2/1234',
            document_binary_url: 'binary/test2/1234',
            document_filename: 'test_document_2',
            document_hash: '1234',
          },
          'statementOfServiceDoc',
          []
        )
      ).toBe('multipleFiles');
    });

    test('should return correct errorType for no files', () => {
      expect(getUploadedDocumentErrorType(undefined, 'statementOfServiceDoc', undefined)).toBe('empty');
    });
  });
});

describe('documentBelongsToCase', () => {
  let documentBelongsToCase;

  beforeAll(async () => {
    ({ documentBelongsToCase } = await import('./utils'));
  });

  test('should return true when document_url matches', () => {
    expect(documentBelongsToCase('1234', [{ document_url: 'http://dm-store/documents/1234' }])).toBe(true);
  });

  test('should return true when url matches (single object)', () => {
    expect(documentBelongsToCase('abcd', { url: 'http://dm-store/documents/abcd' })).toBe(true);
  });

  test('should return false when ID does not match', () => {
    expect(documentBelongsToCase('tampered', [{ document_url: 'http://dm-store/documents/1234' }])).toBe(false);
  });

  test('should return false when documents undefined', () => {
    expect(documentBelongsToCase('1234', undefined)).toBe(false);
  });

  test('should return false when documentId is empty', () => {
    expect(documentBelongsToCase('', [{ document_url: 'http://dm-store/documents/1234' }])).toBe(false);
  });
});
