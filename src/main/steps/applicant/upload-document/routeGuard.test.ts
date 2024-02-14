import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('upload document routeGuard', () => {
  test('should clear session data', async () => {
    const req = mockRequest({
      userCase: {
        start: 'Yes',
        reasonForDocumentCantBeShared: 'test reason',
        declarationCheck: 'declaration',
        applicantUploadFiles: [
          {
            document: {
              document_url: 'url',
              document_binary_url: 'binary url',
              document_filename: 'filename',
              document_hash: 'document hash',
              document_creation_date: '1/1/2023',
            },
          },
        ],
        respondentUploadFiles: [
          {
            document: {
              document_url: 'url',
              document_binary_url: 'binary url',
              document_filename: 'filename',
              document_hash: 'document hash',
              document_creation_date: '1/1/2023',
            },
          },
        ],
      },
    });
    const res = mockResponse();
    const next = jest.fn();
    req.session.save = jest.fn();

    await routeGuard.get(req, res, next);
    expect(req.session.save).toHaveBeenCalled();
    expect(req.session.userCase.hasCourtAskedForThisDoc).toBeUndefined();
    expect(req.session.userCase.reasonForDocumentCantBeShared).toBeUndefined();
    expect(req.session.userCase.haveReasonForDocNotToBeShared).toBeUndefined();
    expect(req.session.userCase.reasonsToRestrictDocument).toBeUndefined();
    expect(req.session.userCase.declarationCheck).toBeUndefined();
    expect(req.session.userCase.reasonsToNotSeeTheDocument).toStrictEqual([]);
    expect(req.session.userCase.applicantUploadFiles).toStrictEqual([]);
    expect(req.session.userCase.respondentUploadFiles).toStrictEqual([]);
  });
});
