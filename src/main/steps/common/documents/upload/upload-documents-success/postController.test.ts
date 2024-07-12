import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';

import UploadDocumentSuccessPostController from './postController';

describe('common > documents > upload > upload-documents-success > postController', () => {
  test('should reset upload session data and return to case view', () => {
    const req = mockRequest({
      body: {
        returnToCaseView: true,
      },
      session: {
        userCase: {
          hasCourtAskedForThisDoc: 'test',
          reasonForDocumentCantBeShared: 'test',
          haveReasonForDocNotToBeShared: 'test',
          reasonsToNotSeeTheDocument: ['test'],
          reasonsToRestrictDocument: 'test',
          applicantUploadFiles: ['test'],
          respondentUploadFiles: ['test'],
          declarationCheck: 'test',
          id: '1234',
        },
      },
    });
    const res = mockResponse();
    const controller = new UploadDocumentSuccessPostController({});
    controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/case/1234');
    expect(req.session.userCase).toStrictEqual({
      reasonsToNotSeeTheDocument: [],

      applicantUploadFiles: [],
      respondentUploadFiles: [],

      id: '1234',
    });
  });

  test('should reset upload session data and return to upload documents', () => {
    const req = mockRequest({
      body: {
        returnToUploadDoc: true,
      },
      session: {
        userCase: {
          hasCourtAskedForThisDoc: 'test',
          reasonForDocumentCantBeShared: 'test',
          haveReasonForDocNotToBeShared: 'test',
          reasonsToNotSeeTheDocument: ['test'],
          reasonsToRestrictDocument: 'test',
          applicantUploadFiles: ['test'],
          respondentUploadFiles: ['test'],
          declarationCheck: 'test',
          id: '1234',
        },
      },
    });
    const res = mockResponse();
    const controller = new UploadDocumentSuccessPostController({});
    controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/applicant/documents/upload');
    expect(req.session.userCase).toStrictEqual({
      reasonsToNotSeeTheDocument: [],
      applicantUploadFiles: [],
      respondentUploadFiles: [],
      id: '1234',
    });
  });
});
