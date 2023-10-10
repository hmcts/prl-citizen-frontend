import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { CaseType, State, YesOrNo } from '../../app/case/definition';

import { CaseActivationPostController } from './CaseActivationPostController';

describe('CaseActivationPostController', () => {
  let controller;

  beforeEach(() => {
    let fields;
    controller = new CaseActivationPostController(fields);
  });

  test('should extend CaseActivationPostController', async () => {
    expect(controller).toBeInstanceOf(CaseActivationPostController);
  });

  test('redirect to c100 applicant task list', async () => {
    const req = mockRequest({
      session: {
        user: {
          accessToken: 'string',
          id: 'string',
          email: 'string',
          givenName: 'string',
          familyName: 'string',
        },
        userCase: {
          caseId: '1234',
          state: State.CASE_SUBMITTED_PAID,
          caseTypeOfApplication: CaseType.C100,
        },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/task-list/applicant');
    //expect(1).toEqual(1);
  });
  test('redirected to applicant task list', async () => {
    const req = mockRequest({
      session: {
        user: {
          accessToken: 'string',
          id: 'string',
          email: 'string',
          givenName: 'string',
          familyName: 'string',
        },
        userCase: {
          caseId: '1234',
          state: State.CASE_SUBMITTED_PAID,
        },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/applicant/task-list');
  });
  test('redirected to respondent task list', async () => {
    const req = mockRequest({
      session: {
        user: {
          accessToken: 'string',
          id: '1234',
          email: 'string',
          givenName: 'string',
          familyName: 'string',
        },
        userCase: {
          caseId: '1234',
          state: State.CASE_SUBMITTED_PAID,
          caseTypeOfApplication: CaseType.C100,
          caseInvites: [
            {
              id: '1234',
              value: {
                partyId: '1234',
                caseInviteEmail: 'string',
                accessCode: 'string',
                invitedUserId: '1234',
                expiryDate: 'string',
                isApplicant: YesOrNo.NO,
              },
            },
          ],
          respondents: [
            {
              id: '1234',
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
                response: {},
                user: {
                  email: 'abc',
                  idamId: '1234',
                },
              },
            },
          ],
        },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/task-list/respondent');
  });
  test('redirected to FL401respondent task list', async () => {
    const req = mockRequest({
      session: {
        user: {
          accessToken: 'string',
          id: '1234',
          email: 'string',
          givenName: 'string',
          familyName: 'string',
        },
        userCase: {
          caseId: '1234',
          state: State.CASE_SUBMITTED_PAID,
          caseTypeOfApplication: CaseType.FL401,
          caseInvites: [
            {
              id: '1234',
              value: {
                partyId: '1234',
                caseInviteEmail: 'string',
                accessCode: 'string',
                invitedUserId: '1234',
                expiryDate: 'string',
                isApplicant: YesOrNo.NO,
              },
            },
          ],
          respondentsFL401: 
          {
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
            response: {},
            user: {
              email: 'abc',
              idamId: '1234',
            },
          },
        },
      },
    });
    const res = mockResponse();

    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledWith('/case/undefined');
  });
});
