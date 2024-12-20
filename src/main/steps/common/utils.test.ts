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
