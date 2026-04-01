import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CaseApi } from '../../../../app/case/CaseApi';
import { CaseWithId } from '../../../../app/case/case';

import { routeGuard } from './routeGuard';

const deleteDocumentMock = jest.spyOn(CaseApi.prototype, 'deleteDocument');

describe('c100 > screening questions > permissions why > route guard', () => {
  let res;
  let req;
  const next = jest.fn();

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  test('should clean permissions why subfields and call next', async () => {
    req.body.sq_permissionsWhy = [];
    req.session.userCase = {
      sq_permissionsWhy: ['doNotHaveParentalResponsibility', 'courtOrderPrevent', 'anotherReason'],
      sq_doNotHaveParentalResponsibility_subfield: 'test',
      sq_courtOrderPrevent_subfield: 'test',
      sq_anotherReason_subfield: 'test',
      sq_uploadDocument_subfield: { id: 'file123', document_filename: 'test.docx' },
    } as unknown as CaseWithId;

    await routeGuard.post(req, res, next);

    expect(req.session.userCase).toStrictEqual({
      sq_permissionsWhy: ['doNotHaveParentalResponsibility', 'courtOrderPrevent', 'anotherReason'],
    });
    expect(req.session.save).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  test('should call next when no file provided', async () => {
    req.body.sq_permissionsWhy = [];
    req.session.userCase = {
      sq_permissionsWhy: ['doNotHaveParentalResponsibility', 'courtOrderPrevent', 'anotherReason'],
      sq_doNotHaveParentalResponsibility_subfield: 'test',
      sq_courtOrderPrevent_subfield: 'test',
      sq_anotherReason_subfield: 'test',
      sq_uploadDocument_subfield: undefined,
    } as unknown as CaseWithId;

    await routeGuard.get(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test('should keep upload document undefined if not present', async () => {
    req.body.sq_permissionsWhy = [];

    req.session.userCase = {
      sq_permissionsWhy: ['anotherReason'],
      sq_uploadDocument_subfield: undefined,
    } as unknown as CaseWithId;

    await routeGuard.post(req, res, next);

    expect(req.session.userCase?.sq_uploadDocument_subfield).toBeUndefined();
    expect(req.session.save).toHaveBeenCalledWith(next);
  });

  test('should handle empty userCase object', async () => {
    req.body.sq_permissionsWhy = [];

    req.session.userCase = {} as CaseWithId;

    await routeGuard.post(req, res, next);

    expect(req.session.userCase).toBeDefined();
    expect(req.session.save).toHaveBeenCalledWith(next);
  });

  test('should delete document', async () => {
    req.params.removeFileId = '1234';
    req.session.userCase.sq_uploadDocument_subfield = [
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
    expect(req.session.userCase.sq_uploadDocument_subfield).toStrictEqual(undefined);
    expect(req.session.errors).toStrictEqual([]);
  });
});
