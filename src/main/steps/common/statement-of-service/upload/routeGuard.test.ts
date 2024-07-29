import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';

import { routeGuard } from './routeGuard';

const deleteDocumentMock = jest.spyOn(CosApiClient.prototype, 'deleteDocument');

describe('statement-of-service > upload > routeGuard', () => {
  let req;
  let res;
  const next = jest.fn();

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  test('should delete document if removeFileId present', async () => {
    req.params = { context: 'context', removeFileId: '1234' };
    req.session.userCase.sos_document = {
      document_url: 'test2/1234',
      document_binary_url: 'binary/test2/1234',
      document_filename: 'test_document_2',
      document_hash: '1234',
      document_creation_date: '1/1/2024',
    };
    deleteDocumentMock.mockResolvedValue('SUCCESS');

    await routeGuard.get(req, res, next);

    expect(req.session.save).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/applicant/statement-of-service/upload/context');
    expect(req.session.userCase.sos_document).toBe(undefined);
    expect(req.session.errors).toStrictEqual([]);
  });

  test('should call next if removeFileId not present', async () => {
    await routeGuard.get(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});
