import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { APPLICANT_STATEMENT_OF_SERVICE, APPLICANT_STATEMENT_OF_SERVICE_NEXT } from '../../../urls';

import StatementOfServicePostController from './StatementOfServicePostController';

const saveStatementOfServiceMock = jest.spyOn(CosApiClient.prototype, 'saveStatementOfService');
let partyDetails;

describe('StatementOfServicePostController', () => {
  let fields;
  const controller = new StatementOfServicePostController(fields);
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
            legalRepresentation: 'No',
          },
        },
      },
    ];
  });

  afterEach(() => {
    saveStatementOfServiceMock.mockClear();
  });

  test('Should not update the is sos provided flag if no party details', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.caseTypeOfApplication = 'fl401';
    req.url = 'applicant';
    await controller.post(req, res);
    expect(req.session.userCase.applicantsFL401).toEqual(undefined);
  });

  test('Should perform correct redirect to what happens next', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.userCase.applicants = partyDetails;
    req.params.caseId = '123';
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
    req.body = {
      sosConsent: [true],
    };
    saveStatementOfServiceMock.mockResolvedValueOnce('SUCCESS');
    req.url = 'applicant';
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledTimes(2);
    expect(res.redirect).toHaveBeenCalledWith(APPLICANT_STATEMENT_OF_SERVICE_NEXT);
  });

  test('Should handle exception when update sos fails', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.userCase.applicants = partyDetails;
    req.params.caseId = '123';
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
    req.body = {
      sosConsent: [true],
    };
    saveStatementOfServiceMock.mockRejectedValueOnce('FAILURE');
    req.url = 'applicant';
    let exceptionThrown = false;
    try {
      expect(await controller.post(req, res)).toThrowError;
    } catch (err) {
      exceptionThrown = true;
    }
    expect(exceptionThrown).toEqual(true);
  });

  test('Should redirect to same page', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.params.caseId = '123';
    req.url = APPLICANT_STATEMENT_OF_SERVICE;
    await controller.post(req, res);
    expect(res.redirect).toHaveBeenCalledTimes(3);
  });
});
