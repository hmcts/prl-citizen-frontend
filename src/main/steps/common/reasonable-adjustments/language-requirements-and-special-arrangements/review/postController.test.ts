import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../../app/case/CosApiClient';

import RALangReqSplArrangementsPostController from './postController';

const updateCaseMock = jest.spyOn(CosApiClient.prototype, 'updateCaseData');

describe('RA > language-requirements-and-special-arrangements > review > postController', () => {
  const controller = new RALangReqSplArrangementsPostController({});

  test('should save language preferences and special arrangements and redirect', async () => {
    const req = mockRequest({
      session: {
        user: {
          id: '123',
        },
        userCase: {
          applicantsFL401: {
            firstName: '',
            lastName: '',
            response: {},
            address: {
              addressLine1: '',
              AddressLine2: '',
              PostTown: '',
              County: '',
              PostCode: '',
            },
          },
          ra_languageReqAndSpecialArrangements: 'test language support notes',
        },
      },
    });
    const res = mockResponse();
    updateCaseMock.mockResolvedValue(req.session.userCase);

    await controller.post(req, res);
    expect(req.session.save).toHaveBeenCalled();
  });

  test('should redirect to error screen if updateCaseData throws', async () => {
    jest.clearAllMocks();
    const req = mockRequest({
      session: {
        user: {
          id: '123',
        },
        userCase: {
          applicantsFL401: {
            firstName: '',
            lastName: '',
            response: {},
            address: {
              addressLine1: '',
              AddressLine2: '',
              PostTown: '',
              County: '',
              PostCode: '',
            },
          },
          ra_languageReqAndSpecialArrangements: 'test language support notes',
        },
      },
    });
    const res = mockResponse();
    updateCaseMock.mockRejectedValue(new Error('update failed'));

    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/reasonable-adjustments/error');
  });

  test('should not call updateCaseData if partyDetails not found', async () => {
    jest.clearAllMocks();
    const req = mockRequest({
      session: {
        user: {
          id: 'non-existent-id',
        },
        userCase: {
          ra_languageReqAndSpecialArrangements: 'test language support notes',
        },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);
    expect(updateCaseMock).not.toHaveBeenCalled();
  });
});
