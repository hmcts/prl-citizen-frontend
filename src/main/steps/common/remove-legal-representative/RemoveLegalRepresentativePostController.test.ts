import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { CaseType } from '../../../app/case/definition';
import {
  APPLICANT_REMOVE_LEGAL_REPRESENTATIVE_CONFIRM,
  RESPONDENT_REMOVE_LEGAL_REPRESENTATIVE_CONFIRM,
} from '../../urls';

import { RemoveLegalRepresentativePostController } from './RemoveLegalRepresentativePostController';

const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCaseData');
const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');
let partyDetails;

describe('RemoveLegalRepresentativePostController', () => {
  let fields;
  const controller = new RemoveLegalRepresentativePostController(fields);
  const req = mockRequest();
  const res = mockResponse();
  beforeEach(() => {
    partyDetails = [
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
            idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            email: 'test@example.net',
          },
          response: {
            legalRepresentation: 'Yes',
          },
        },
      },
    ];
    retrieveByCaseIdMock.mockResolvedValue(req.session.userCase);
    updateCaserMock.mockResolvedValue(req.session.userCase);
  });

  afterEach(() => {
    retrieveByCaseIdMock.mockClear();
    updateCaserMock.mockClear();
  });

  test('Should update the respondent partyDetails details', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.respondents = partyDetails;
    req.session.userCase.applicants = [];
    req.session.userCase.caseTypeOfApplication = CaseType.C100;
    req.session.userCase.caseInvites = [
      {
        id: 'string',
        value: {
          partyId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          caseInviteEmail: 'string',
          accessCode: 'string',
          invitedUserId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          expiryDate: 'string',
          isApplicant: 'Yes',
        },
      },
    ];
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith(RESPONDENT_REMOVE_LEGAL_REPRESENTATIVE_CONFIRM);
  });

  test('Should update the applicant partyDetails details', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.respondents = [];
    req.session.userCase.applicants = partyDetails;
    req.session.userCase.caseTypeOfApplication = CaseType.C100;
    req.session.userCase.caseInvites = [
      {
        id: 'string',
        value: {
          partyId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          caseInviteEmail: 'string',
          accessCode: 'string',
          invitedUserId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          expiryDate: 'string',
          isApplicant: 'Yes',
        },
      },
    ];
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith(APPLICANT_REMOVE_LEGAL_REPRESENTATIVE_CONFIRM);
  });
});
