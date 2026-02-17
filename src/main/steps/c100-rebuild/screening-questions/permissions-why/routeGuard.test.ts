import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CaseApi } from '../../../../app/case/CaseApi';
import { CaseWithId } from '../../../../app/case/case';
import { applyParms } from '../../../../steps/common/url-parser';
import { C100_SCREENING_QUESTIONS_PERMISSIONS_WHY } from '../../../../steps/urls';

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
    } as unknown as CaseWithId;

    await routeGuard.post(req, res, next);

    expect(req.session.userCase).toStrictEqual({
      sq_permissionsWhy: ['doNotHaveParentalResponsibility', 'courtOrderPrevent', 'anotherReason'],
    });
    expect(req.session.save).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  test('should delete document and redirect when removeFileId exists', async () => {
    req.params = { removeFileId: '123' };

    req.session.userCase = {
      sq_uploadDocument: {
        id: '123',
      },
    } as unknown as CaseWithId;

    deleteDocumentMock.mockResolvedValue();

    await routeGuard.get(req, res, next);

    expect(deleteDocumentMock).toHaveBeenCalledWith('123');
    expect(req.session.userCase.sq_uploadDocument).toBeUndefined();
    expect(res.redirect).toHaveBeenCalledWith(applyParms(C100_SCREENING_QUESTIONS_PERMISSIONS_WHY));
  });

  test('should set error and redirect when delete fails', async () => {
    req.params = { removeFileId: '123' };

    req.session.userCase = {
      sq_uploadDocument: {
        id: '123',
      },
    } as unknown as CaseWithId;

    deleteDocumentMock.mockRejectedValue(new Error('fail'));

    await routeGuard.get(req, res, next);

    expect(req.session.errors).toStrictEqual([
      {
        propertyName: 'sq_uploadDocument',
        errorType: 'deleteFile',
      },
    ]);

    expect(res.redirect).toHaveBeenCalledWith(applyParms(C100_SCREENING_QUESTIONS_PERMISSIONS_WHY));
  });

  test('should call next when no removeFileId provided', async () => {
    req.params = {};

    await routeGuard.get(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test('should call next when no document in session', async () => {
    req.params = { removeFileId: '123' };
    req.session.userCase = {} as CaseWithId;

    await routeGuard.get(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
