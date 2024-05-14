import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';
//import { YesOrNo } from '../../../app/case/definition';

import ConsentPostController from './postController';

//const setConsentDetailsMock = jest.spyOn(consentMapper, 'setConsentDetails');
const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCaseData');
let respondents;

describe('ConsentPostController', () => {
  let fields;
  const consentPostController = new ConsentPostController(fields);
  const req = mockRequest();
  const res = mockResponse();
  beforeEach(() => {
    respondents = [
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
            legalRepresentation: 'No',
          },
        },
      },
    ];
    updateCaserMock.mockResolvedValue(req.session.userCase);
  });

  afterEach(() => {
    updateCaserMock.mockClear();
  });

  test('Should update the consent details if user id matches with respondent', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.respondents = respondents;
    req.session.userCase.doYouConsent = 'Yes';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.userCase.applicationReceivedDate = {
      year: '2022',
      month: '12',
      day: '12',
    };
    req.session.userCase.caseInvites = [
      {
        id: 'string',
        value: {
          partyId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          caseInviteEmail: 'string',
          accessCode: 'string',
          invitedUserId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          expiryDate: 'string',
          isApplicant: 'No',
        },
      },
    ];
    await consentPostController.post(req, res);
    expect(req.session.userCase.respondents[0].value.response.consent.consentToTheApplication).toEqual('Yes');
  });
});
