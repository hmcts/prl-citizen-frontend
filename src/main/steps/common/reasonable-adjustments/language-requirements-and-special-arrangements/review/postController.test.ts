import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../../app/case/CosApiClient';

import RALangReqSplArrangementsPostController from './postController';

describe('RA > language-requirements-and-special-arrangements > review > postController', () => {
  const controller = new RALangReqSplArrangementsPostController({});

  const mockUserCase = {
    applicantsFL401: {
      firstName: '',
      lastName: '',
      response: {},
      user: {
        idamId: '123',
      },
      address: {
        addressLine1: '',
        AddressLine2: '',
        PostTown: '',
        County: '',
        PostCode: '',
      },
    },
    ra_languageReqAndSpecialArrangements: 'test language support notes',
  };

  const mockUser = { id: '123' };

  let updateCaseMock;
  let submitLanguageSupportNotesMock;

  beforeEach(() => {
    jest.clearAllMocks();
    updateCaseMock = jest.spyOn(CosApiClient.prototype, 'updateCaseData');
    submitLanguageSupportNotesMock = jest
      .spyOn(CosApiClient.prototype, 'submitLanguageSupportNotes')
      .mockResolvedValue('success');
  });

  test('should save language preferences and special arrangements and redirect', async () => {
    const req = mockRequest({ session: { user: mockUser, userCase: mockUserCase } });
    const res = mockResponse();
    updateCaseMock.mockResolvedValue(req.session.userCase);

    await controller.post(req, res);
    expect(submitLanguageSupportNotesMock).toHaveBeenCalled();
    expect(req.session.save).toHaveBeenCalled();
  });

  test('should not call submitLanguageSupportNotes if ra_languageReqAndSpecialArrangements not present', async () => {
    const req = mockRequest({
      session: {
        user: mockUser,
        userCase: { ...mockUserCase, ra_languageReqAndSpecialArrangements: undefined },
      },
    });
    const res = mockResponse();
    updateCaseMock.mockResolvedValue(req.session.userCase);

    await controller.post(req, res);
    expect(req.session.save).toHaveBeenCalled();
    expect(submitLanguageSupportNotesMock).not.toHaveBeenCalled();
  });

  test('should redirect to error screen if updateCaseData throws', async () => {
    const req = mockRequest({ session: { user: mockUser, userCase: mockUserCase } });
    const res = mockResponse();
    updateCaseMock.mockRejectedValue(new Error('update failed'));

    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/reasonable-adjustments/error');
  });

  test('should not call updateCaseData if partyDetails not found', async () => {
    const req = mockRequest({
      session: {
        user: { id: 'non-existent-id' },
        userCase: { ra_languageReqAndSpecialArrangements: 'test language support notes' },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);
    expect(updateCaseMock).not.toHaveBeenCalled();
  });
});
