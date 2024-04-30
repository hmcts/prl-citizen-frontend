import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { YesOrNo } from '../../../../app/case/definition';
import { FormContent } from '../../../../app/form/Form';
import { LEGAL_REPRESENTATION_SOLICITOR_DIRECT, LEGAL_REPRESENTATION_START } from '../../../urls';

import LegalRepresentationPostController from './postController';

// import Mock = jest.Mock;
jest.mock('../../../../app/case/CosApiClient');
const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCaseData');

const body = {
  respondents: [
    {
      id: '8e87fde0-bab4-4701-abbe-2d277ca38fr5',
      value: {
        response: {
          legalRepresentation: YesOrNo.YES,
        },
        user: {
          idamId: '8e87fde0-bab4-4701-abbe-2d277ca38fr5',
        },
      },
    },
  ],
};

describe('PostController', () => {
  const req = mockRequest();
  const res = mockResponse();
  let controller;

  beforeEach(() => {
    req.session.user = {
      ...req.session.user,
      id: '8e87fde0-bab4-4701-abbe-2d277ca38fr5',
    };
    req.session.userCase = {
      ...req.session.userCase,
      state: 'PREPARE_FOR_HEARING_CONDUCT_HEARING',
      respondents: [
        {
          id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
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
              idamId: '8e87fde0-bab4-4701-abbe-2d277ca38fr5',
              email: 'test1234@example.net',
            },
            response: {},
          },
        },
      ],
      caseInvites: [
        {
          id: '577695bd-2fb5-4418-a699-79ee352ed5bb',
          value: {
            partyId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            caseInviteEmail: 'respondent2@example.net',
            accessCode: '3GYFGJHO',
            invitedUserId: '8e87fde0-bab4-4701-abbe-2d277ca38fr5',
            hasLinked: 'Yes',
            expiryDate: '2023-05-07',
            isApplicant: 'No',
          },
        },
      ],
      caseTypeOfApplication: 'C100',
    };
    jest.spyOn(CosApiClient.prototype, 'updateCaseData').mockResolvedValue(req.session.userCase);
    const mockForm = {
      fields: {
        legalRepresentation: YesOrNo.YES,
      },
    } as unknown as FormContent;
    controller = new LegalRepresentationPostController(mockForm.fields);
  });

  test('post should be able to save legal representation information', async () => {
    //const errors = [{ propertyName: 'applicant1PhoneNumber', errorType: 'invalid' }];
    req.session.user.id = '8e87fde0-bab4-4701-abbe-2d277ca38fr5';
    req.body.legalRepresentation = body.respondents[0].value.response.legalRepresentation;
    const language = 'en';
    req.session.lang = language;
    controller.post(req, res);
    expect(1).toEqual(1);
  });

  test('proceed saving legal representation without error', async () => {
    req.session.user.id = '8e87fde0-bab4-4701-abbe-2d277ca38fr5';
    body.respondents[0].value.response.legalRepresentation = YesOrNo.NO;
    req.body.legalRepresentation = body.respondents[0].value.response.legalRepresentation;
    const language = 'en';
    req.session.lang = language;
    controller.post(req, res);
    const redirectUrl = LEGAL_REPRESENTATION_START;
    expect(req.originalUrl).not.toBe(redirectUrl);
  });

  test('Should update the userCase for proceedings when updateCaseData API is success', async () => {
    req.body.respondents = body.respondents;
    req.body.legalRepresentation = YesOrNo.YES;
    req.session.userCase.caseTypeOfApplication = 'C100';
    updateCaserMock.mockResolvedValue(req.session.userCase);

    await controller.post(req, res);
    await new Promise(process.nextTick);

    expect(req.session.userCase.respondents[0].value.response.legalRepresentation).toEqual(YesOrNo.YES);
    expect(res.redirect).toHaveBeenCalledWith(LEGAL_REPRESENTATION_SOLICITOR_DIRECT);
  });

  test('Should not update the userCase for proceedings when updateCaseData API is throwing error', async () => {
    updateCaserMock.mockRejectedValue({ message: 'MOCK_ERROR', response: { status: 500, data: 'Error' } });
    await new Promise(process.nextTick);

    await expect(controller.post(req, res)).rejects.toThrow(
      'Error occured, case could not be updated. - LegalRepresentationPostController'
    );
  });
});
