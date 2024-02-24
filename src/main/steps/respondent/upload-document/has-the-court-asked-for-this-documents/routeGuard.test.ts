import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('has-the-court-asked-for-this-documents routeGuard', () => {
  const userCase = {
    id: '1234',
    hasCourtAskedForThisDoc: 'No',
    reasonForDocumentCantBeShared: 'test reason',
    haveReasonForDocNotToBeShared: 'Yes',
    reasonsToNotSeeTheDocument: ['test reason'],
    reasonsToRestrictDocument: 'test reason restrict document',
    declarationCheck: 'declaration',
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
  };

  test('should delete data when hasCourtAskedForThisDoc is no', async () => {
    const req = mockRequest({
      userCase,
    });
    const res = mockResponse();
    const next = jest.fn();
    req.session.save = jest.fn();

    await routeGuard.post(req, res, next);
    expect(req.session.save).toHaveBeenCalledWith(next);
    expect(req.session.userCase.reasonForDocumentCantBeShared).toBeUndefined();
    expect(req.session.userCase.haveReasonForDocNotToBeShared).toBeUndefined();
    expect(req.session.userCase.reasonsToRestrictDocument).toBeUndefined();
    expect(req.session.userCase.declarationCheck).toBeUndefined();
    expect(req.session.userCase.reasonsToNotSeeTheDocument).toStrictEqual([]);
    expect(req.session.userCase.respondentUploadFiles).toStrictEqual([]);
  });

  test('should not delete data when hasCourtAskedForThisDoc is yes', async () => {
    userCase.hasCourtAskedForThisDoc = 'Yes';
    const req = mockRequest({
      userCase,
    });
    const res = mockResponse();
    const next = jest.fn();
    req.session.save = jest.fn();

    await routeGuard.post(req, res, next);
    expect(req.session.save).not.toHaveBeenCalled();
    expect(req.session.userCase).toStrictEqual(userCase);
    expect(next).toHaveBeenCalled();
  });
});
