jest.mock('../../../../app/case/CaseApi', () => ({
  caseApi: jest.fn(),
}));

jest.mock('../../../../app/form/validation', () => ({
  isValidFileFormat: jest.fn(),
  isFileSizeGreaterThanMaxAllowed: jest.fn(),
}));

import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { caseApi } from '../../../../app/case/CaseApi';
import { CaseWithId } from '../../../../app/case/case';
import { isFileSizeGreaterThanMaxAllowed, isValidFileFormat } from '../../../../app/form/validation';

import { routeGuard } from './routeGuard';

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
      sq_uploadDocument: { id: 'file123', document_filename: 'test.docx' },
    } as unknown as CaseWithId;

    await routeGuard.post(req, res, next);

    expect(req.session.userCase).toStrictEqual({
      sq_permissionsWhy: ['doNotHaveParentalResponsibility', 'courtOrderPrevent', 'anotherReason'],
      sq_uploadDocument: { id: 'file123', document_filename: 'test.docx' },
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
      sq_uploadDocument: undefined,
    } as unknown as CaseWithId;

    await routeGuard.post(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test('should upload file and store document in session', async () => {
    const uploadMock = jest.fn().mockResolvedValue({
      document: { id: 'file123', document_filename: 'test.pdf' },
    });

    (caseApi as jest.Mock).mockReturnValue({ uploadDocument: uploadMock });

    (isValidFileFormat as jest.Mock).mockReturnValue(true);
    (isFileSizeGreaterThanMaxAllowed as jest.Mock).mockReturnValue(false);

    req.files = {
      sq_uploadDocument: {
        data: Buffer.from('abc'),
        mimetype: 'application/pdf',
        name: 'test.pdf',
      },
    };

    req.session.userCase = {};

    await routeGuard.post(req, res, next);

    expect(uploadMock).toHaveBeenCalled();
    expect(req.session.userCase.sq_uploadDocument).toStrictEqual({
      id: 'file123',
      document_filename: 'test.pdf',
    });
    expect(next).toHaveBeenCalled();
  });

  test('should set invalidFileFormat error', async () => {
    (isValidFileFormat as jest.Mock).mockReturnValue(false);

    req.files = {
      sq_uploadDocument: { data: Buffer.from('a') },
    };

    await routeGuard.post(req, res, next);

    expect(req.session.errors).toStrictEqual([{ propertyName: 'sq_uploadDocument', errorType: 'invalidFileFormat' }]);

    expect(res.redirect).toHaveBeenCalled();
  });

  test('should set maxFileSize error', async () => {
    (isValidFileFormat as jest.Mock).mockReturnValue(true);
    (isFileSizeGreaterThanMaxAllowed as jest.Mock).mockReturnValue(true);

    req.files = {
      sq_uploadDocument: { data: Buffer.from('a') },
    };

    await routeGuard.post(req, res, next);

    expect(req.session.errors).toStrictEqual([{ propertyName: 'sq_uploadDocument', errorType: 'maxFileSize' }]);
  });

  test('should set multipleFiles error if document already exists', async () => {
    req.files = {
      sq_uploadDocument: { data: Buffer.from('a') },
    };

    req.session.userCase = {
      sq_uploadDocument: { id: 'old' },
    };

    await routeGuard.post(req, res, next);

    expect(req.session.errors).toStrictEqual([{ propertyName: 'sq_uploadDocument', errorType: 'multipleFiles' }]);
  });

  test('should set uploadError if api upload fails', async () => {
    const uploadMock = jest.fn().mockRejectedValue(new Error('uploadError'));

    (caseApi as jest.Mock).mockReturnValue({ uploadDocument: uploadMock });

    (isValidFileFormat as jest.Mock).mockReturnValue(true);
    (isFileSizeGreaterThanMaxAllowed as jest.Mock).mockReturnValue(false);

    req.files = {
      sq_uploadDocument: { data: Buffer.from('a'), name: 'file.pdf' },
    };

    await routeGuard.post(req, res, next);

    expect(req.session.errors).toStrictEqual([{ propertyName: 'sq_uploadDocument', errorType: 'uploadError' }]);
  });
});
