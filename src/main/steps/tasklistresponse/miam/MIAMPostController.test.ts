import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { CaseType } from '../../../app/case/definition';

import { MIAMPostController } from './MIAMPostController';

const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCaseData');

describe('MIAMPostController calls updatecase', () => {
  let fields;
  const miamPostController = new MIAMPostController(fields);
  const req = mockRequest();
  const res = mockResponse();
  beforeEach(() => {
    req.session.user.id = '123';
    req.session.userCase = {
      caseId: '1234',
      caseTypeOfApplication: CaseType.C100,
      caseInvites: [
        {
          id: 'string',
          value: {
            partyId: '123',
            caseInviteEmail: 'string',
            accessCode: 'string',
            invitedUserId: '123',
            expiryDate: 'string',
            isApplicant: 'Yes',
          },
        },
      ],
      applicants: [
        {
          id: '123',
          value: {
            email: 'abc',
            gender: 'male',
            address: {
              AddressLine1: '',
              AddressLine2: '',
              PostTown: '',
              County: '',
              PostCode: '',
            },
            dxNumber: '123',
            landline: '987654321',
            lastName: 'Smith',
            firstName: 'John',
            dateOfBirth: '',
            otherGender: '',
            phoneNumber: '',
            placeOfBirth: '',
            previousName: '',
            solicitorOrg: {
              OrganisationID: '',
              OrganisationName: '',
            },
            sendSignUpLink: '',
            solicitorEmail: '',
            isAddressUnknown: '',
            solicitorAddress: {
              County: '',
              Country: '',
              PostCode: '',
              PostTown: '',
              AddressLine1: '',
              AddressLine2: '',
              AddressLine3: '',
            },
            isDateOfBirthKnown: '',
            solicitorReference: '',
            solicitorTelephone: '',
            isPlaceOfBirthKnown: '',
            isDateOfBirthUnknown: '',
            isAddressConfidential: '',
            isCurrentAddressKnown: '',
            relationshipToChildren: '',
            representativeLastName: '',
            representativeFirstName: '',
            canYouProvidePhoneNumber: '',
            canYouProvideEmailAddress: '',
            isAtAddressLessThan5Years: '',
            isPhoneNumberConfidential: '',
            isEmailAddressConfidential: '',
            respondentLivedWithApplicant: '',
            doTheyHaveLegalRepresentation: '',
            addressLivedLessThan5YearsDetails: '',
            otherPersonRelationshipToChildren: [''],
            isAtAddressLessThan5YearsWithDontKnow: '',
            response: {
              miam: {},
            },
            user: {
              email: 'abc',
              idamId: '123',
            },
          },
        },
      ],
    };
    req.session.userCase.miamStart = 'No';
    req.session.userCase.miamWillingness = 'No';
    req.session.userCase.miamNotWillingExplnation = 'value';
    updateCaserMock.mockResolvedValue(req.session.userCase);
  });
  afterEach(() => {
    updateCaserMock.mockClear();
  });
  test('Should redirect', async () => {
    await miamPostController.post(req, res);
    expect(req.session.save).toHaveBeenCalled();
  });
});
