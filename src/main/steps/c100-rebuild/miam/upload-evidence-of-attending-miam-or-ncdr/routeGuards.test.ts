import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CaseApi } from '../../../../app/case/CaseApi';

import { routeGuard } from './routeGuard';

const deleteDocumentMock = jest.spyOn(CaseApi.prototype, 'deleteDocument');

describe('C100-rebuild > MIAM > miam_previousAttendanceEvidenceDoc > upload-evidence > routeGuard', () => {
  let req;
  let res;
  const next = jest.fn();

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  test('should delete document', async () => {
    req.params.removeFileId = '1234';
    req.session.userCase.miam_previousAttendanceEvidenceDoc = [
      {
        document_url: 'test2/1234',
        document_binary_url: 'binary/test2/1234',
        document_filename: 'test_document_2',
        document_hash: '1234',
        document_creation_date: '1/1/2024',
      },
    ];

    deleteDocumentMock.mockResolvedValue();
    await routeGuard.get(req, res, next);

    expect(req.session.save).toHaveBeenCalled();
    expect(req.session.userCase.miam_previousAttendanceEvidenceDoc).toStrictEqual(undefined);
    expect(req.session.errors).toStrictEqual([]);
  });

  test('should catch error when deleting document', async () => {
    req.params.removeFileId = '1234';
    req.session.userCase.miam_previousAttendanceEvidenceDoc = [
      {
        document_url: 'test2/1234',
        document_binary_url: 'binary/test2/1234',
        document_filename: 'test_document_2',
        document_hash: '1234',
        document_creation_date: '1/1/2024',
      },
    ];

    deleteDocumentMock.mockRejectedValue({ status: 'Error' });
    await routeGuard.get(req, res, next);

    expect(res.redirect).toHaveBeenCalledWith('/c100-rebuild/miam/upload-evidence-of-attending-miam-or-ncdr');
    expect(req.session.userCase.miam_previousAttendanceEvidenceDoc).toStrictEqual([
      {
        document_url: 'test2/1234',
        document_binary_url: 'binary/test2/1234',
        document_filename: 'test_document_2',
        document_hash: '1234',
        document_creation_date: '1/1/2024',
      },
    ]);
    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'deleteFile',
        propertyName: 'miam_previousAttendanceEvidenceDoc',
      },
    ]);
  });

  test('should call next if no removeFileId present', async () => {
    await routeGuard.get(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
