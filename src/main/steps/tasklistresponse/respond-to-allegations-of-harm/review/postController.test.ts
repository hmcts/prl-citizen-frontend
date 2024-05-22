import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { YesOrNo } from '../../../../app/case/definition';

import RespondToAohReviewPostController from './postController';

const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCaseData');

describe('tasklistresponse > respond-to-allegations-of-harm > review > postController', () => {
  const controller = new RespondToAohReviewPostController({});
  const partyDetails = {
    id: '1234',
    value: {
      firstName: 'testuser',
      lastName: 'Citizen',
      email: 'abc@example.net',
      dateOfBirth: '03-20-2023',
      phoneNumber: '7755664466',
      placeOfBirth: 'BPP',
      previousName: 'test',
      isAtAddressLessThan5Years: 'No',
      addressLivedLessThan5YearsDetails: 'Hello',
      address: {
        AddressLine1: 'string',
        AddressLine2: 'string',
        AddressLine3: 'string',
        PostTown: 'string',
        County: 'string',
        PostCode: 'string',
        Country: 'string',
      },
      user: {
        idamId: '1234',
        email: 'test@example.net',
      },
      response: {},
    },
  };

  test('should call update case data and redirect if saveAndContinue present', async () => {
    const req = mockRequest({
      body: {
        saveAndContinue: true,
      },
      session: {
        userCase: {
          caseTypeOfApplication: 'C100',
          applicants: [partyDetails],
          aoh_wishToRespond: 'Yes' as YesOrNo,
          aoh_responseToAllegations: 'test data',
        },
        user: {
          id: '1234',
        },
      },
    });
    const res = mockResponse();

    updateCaserMock.mockResolvedValue(req.session.userCase);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });

  test('should catch and throw error', async () => {
    const req = mockRequest({
      body: {
        saveAndContinue: true,
      },
      session: {
        userCase: {
          caseTypeOfApplication: 'C100',
          applicants: [partyDetails],
          aoh_wishToRespond: 'Yes' as YesOrNo,
          aoh_responseToAllegations: 'test data',
        },
        user: {
          id: '1234',
        },
      },
    });
    const res = mockResponse();

    updateCaserMock.mockRejectedValue({ status: 'Error' });
    await expect(controller.post(req, res)).rejects.toThrow(
      'Error occured, failed to save response to AOH. - RespondToAohReviewPostController'
    );
  });
});
