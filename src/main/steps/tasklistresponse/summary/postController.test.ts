import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { PCQProvider } from '../../../modules/pcq';
import { PcqController } from '../../../modules/pcq/controller';

import ResponseSummaryConfirmationPostController from './postController';

describe('ResponseSummaryConfirmationPostController', () => {
  const submitC7ResponseMock = jest.spyOn(CosApiClient.prototype, 'submitC7Response');
  const pcqGetControllerMock = jest.spyOn(PcqController.prototype, 'launch');
  test('post', async () => {
    const req = mockRequest();
    const res = mockResponse();
    req.session.userCase = {
      id: '12234567890',
      caseInvites: [
        {
          id: '1',
          value: {
            partyId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            caseInviteEmail: 'string',
            accessCode: 'string',
            invitedUserId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            expiryDate: 'string',
            isApplicant: 'No',
          },
        },
      ],
      caseTypeOfApplication: 'C100',
    };
    req.session.user = {
      id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
    };
    const partyDetails = [
      {
        id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
        value: {
          firstName: '',
          lastName: '',
          email: '',
          user: {
            idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            email: '',
          },
        },
      },
    ];
    jest.spyOn(PCQProvider, 'isComponentEnabled').mockReturnValueOnce(Promise.resolve(false));
    req.session.userCase.respondents = partyDetails;
    const controller = new ResponseSummaryConfirmationPostController({});
    await controller.post(req, res);
    expect(pcqGetControllerMock).not.toHaveBeenCalled();
  });

  test('submit C7 Response', async () => {
    const req = mockRequest();
    const res = mockResponse();
    req.session.userCase.id = '12234567890';
    const partyDetails = [
      {
        id: '1',
        value: {
          firstName: '',
          lastName: '',
          email: '',
          user: {
            idamId: '12234567890',
            email: '',
          },
        },
      },
    ];
    jest.spyOn(PCQProvider, 'isComponentEnabled').mockReturnValueOnce(Promise.resolve(true));
    jest.spyOn(PCQProvider, 'getReturnUrl').mockReturnValueOnce('http://localhost:3001/pcq/equality');
    req.session.userCase.respondents = partyDetails;
    const controller = new ResponseSummaryConfirmationPostController({});
    await controller.post(req, res);
    expect(pcqGetControllerMock).toHaveBeenCalled();
  });

  test('submit C7 Response should map data and redirect', async () => {
    const req = mockRequest({});
    const res = mockResponse();
    req.session.userCase.id = '12234567890';
    const partyDetails = [
      {
        id: '12234567890',
        value: {
          firstName: '',
          lastName: '',
          email: '',
          address: {
            addressLine1: '',
            addressLine2: '',
            PostTown: '',
            County: '',
            PostCode: '',
          },
          user: {
            idamId: '12234567890',
            email: '',
            pcqId: '1234',
          },
          phoneNumber: '1234',
          dateOfBirth: '1/1/2020',
        },
      },
    ];
    req.session.userCase.caseInvites = [
      { id: '12234567890', value: { invitedUserId: '12234567890', partyId: '12234567890' } },
    ];
    req.session.user.id = '12234567890';
    req.session.userCase.caseTypeOfApplication = 'C100';
    jest.spyOn(PCQProvider, 'isComponentEnabled').mockReturnValueOnce(Promise.resolve(true));
    jest.spyOn(PCQProvider, 'getReturnUrl').mockReturnValueOnce('http://localhost:3001/pcq/equality');
    req.session.userCase.respondents = partyDetails;
    const controller = new ResponseSummaryConfirmationPostController({});
    submitC7ResponseMock.mockReturnValueOnce(req.session.userCase);
    await controller.post(req, res);

    expect(req.session.save).toHaveBeenCalled();
    expect(req.session.userCase).toStrictEqual({
      caseInvites: [
        {
          id: '12234567890',
          value: {
            invitedUserId: '12234567890',
            partyId: '12234567890',
          },
        },
      ],
      caseTypeOfApplication: 'C100',
      citizenUserAdditionalName: undefined,
      citizenUserAddress1: undefined,
      citizenUserAddress2: undefined,
      citizenUserAddressCounty: '',
      citizenUserAddressHistory: undefined,
      citizenUserAddressPostcode: '',
      citizenUserAddressTown: '',
      citizenUserDateOfBirth: {
        day: 'NaN',
        month: 'NaN',
        year: 'NaN',
      },
      citizenUserEmailAddress: '',
      citizenUserFirstNames: '',
      citizenUserFullName: '',
      citizenUserLastNames: '',
      citizenUserPhoneNumber: '1234',
      citizenUserPlaceOfBirth: undefined,
      citizenUserSafeToCall: '',
      citizenUserSelectAddress: '',
      id: '12234567890',
      isAtAddressLessThan5Years: undefined,
      isCitizenLivingInRefuge: undefined,
      partyId: '12234567890',
      refugeDocument: undefined,
      respondents: [
        {
          id: '12234567890',
          value: {
            address: {
              County: '',
              PostCode: '',
              PostTown: '',
              addressLine1: '',
              addressLine2: '',
            },
            dateOfBirth: '1/1/2020',
            email: '',
            firstName: '',
            lastName: '',
            phoneNumber: '1234',
            user: {
              email: '',
              idamId: '12234567890',
              pcqId: '1234',
            },
          },
        },
      ],
      user: {
        email: '',
        idamId: '12234567890',
        pcqId: '1234',
      },
    });
    expect(res.redirect).toHaveBeenCalledWith('/tasklistresponse/summary-confirmation');
  });
});
