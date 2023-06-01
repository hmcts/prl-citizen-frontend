import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { ProceedingsOrderTypes, YesOrNo } from '../../../app/case/definition';
import { RESPOND_TO_APPLICATION } from '../../urls';

import { ProceedingPostController } from './ProceedingPostController';

const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');
jest.mock('../../../app/case/CosApiClient');
const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCaseData');

describe('ProceedingPostController', () => {
  let fields;
  const proceedingPostController = new ProceedingPostController(fields);
  const req = mockRequest();
  const res = mockResponse();
  beforeEach(() => {
    jest.clearAllMocks;
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
    retrieveByCaseIdMock.mockResolvedValue(req.session.userCase);
    updateCaserMock.mockResolvedValue(req.session.userCase);
  });

  afterEach(() => {
    retrieveByCaseIdMock.mockClear();
    updateCaserMock.mockClear();
    jest.clearAllMocks;
  });

  test('Should update the Proceeding details if user id matches with respondent', async () => {
    const response = {
      currentOrPreviousProceedings: {
        haveChildrenBeenInvolvedInCourtCase: 'No',
        courtOrderMadeForProtection: 'Yes',
        proceedingsList: [
          {
            orderType: 'emergencyProtectionOrder',
            proceedingDetails: [
              {
                caseNo: 'test',
                orderDate: '2021-02-02',
                currentOrder: YesOrNo.YES,
                orderEndDate: '2021-02-02',
                orderCopy: YesOrNo.YES,
                orderDocument: 'test doc',
              },
            ],
          },
          {
            orderType: 'careOrder',
            proceedingDetails: [
              {
                caseNo: 'test',
                orderDate: '2021-02-02',
                currentOrder: YesOrNo.YES,
                orderEndDate: '2021-02-02',
                orderCopy: YesOrNo.NO,
              },
            ],
          },
        ],
      },
    };

    req.session.userCase.respondents[0].response = response;

    req.session.userCase.proceedingsStart = 'No';
    req.session.userCase.proceedingsStartOrder = 'No';
    const courtProceedingsOrders: ProceedingsOrderTypes[] = [];
    const orderType1 = 'emergencyProtectionOrder' as ProceedingsOrderTypes;
    const orderType2 = 'careOrder' as ProceedingsOrderTypes;
    courtProceedingsOrders.push(orderType1);
    courtProceedingsOrders.push(orderType2);
    req.session.userCase.courtProceedingsOrders = courtProceedingsOrders;

    await proceedingPostController.post(req, res);

    expect(
      req.session.userCase.respondents[0].value.response.currentOrPreviousProceedings
        .haveChildrenBeenInvolvedInCourtCase
    ).toEqual('No');
    expect(
      req.session.userCase.respondents[0].value.response.currentOrPreviousProceedings.courtOrderMadeForProtection
    ).toEqual('No');
  });

  test('Should update the Proceeding details if user id matches', async () => {
    const response = {
      currentOrPreviousProceedings: {
        haveChildrenBeenInvolvedInCourtCase: 'No',
        courtOrderMadeForProtection: 'No',
        proceedingsList: [
          {
            orderType: 'emergencyProtectionOrder',
            proceedingDetails: [
              {
                caseNo: 'test',
                orderDate: '2021-02-02',
                currentOrder: YesOrNo.YES,
                orderEndDate: '2021-02-02',
                orderCopy: YesOrNo.YES,
                orderDocument: 'test doc',
              },
            ],
          },
          {
            orderType: 'careOrder',
            proceedingDetails: [
              {
                caseNo: 'test',
                orderDate: '2021-02-02',
                currentOrder: YesOrNo.YES,
                orderEndDate: '2021-02-02',
                orderCopy: YesOrNo.NO,
              },
            ],
          },
        ],
      },
    };

    req.session.userCase.respondents[0].response = response;
    req.session.userCase.proceedingsStart = 'Yes';
    const courtProceedingsOrders: ProceedingsOrderTypes[] = [];
    const orderType1 = 'emergencyProtectionOrder' as ProceedingsOrderTypes;
    const orderType2 = 'careOrder' as ProceedingsOrderTypes;
    courtProceedingsOrders.push(orderType1);
    courtProceedingsOrders.push(orderType2);
    req.session.userCase.courtProceedingsOrders = courtProceedingsOrders;
    await proceedingPostController.post(req, res);
    expect(
      req.session.userCase.respondents[0].value.response.currentOrPreviousProceedings
        .haveChildrenBeenInvolvedInCourtCase
    ).toEqual('Yes');
  });

  test('Should update the userCase for proceedings when updateCaseData API is success', async () => {
    req.session.userCase.proceedingsStart = 'No';
    req.session.userCase.proceedingsStartOrder = 'No';
    updateCaserMock.mockResolvedValue(req.session.userCase);

    await proceedingPostController.post(req, res);
    expect(req.session.userCase.respondents[0].value.response.currentOrPreviousProceedings).toEqual(
      expect.objectContaining({
        haveChildrenBeenInvolvedInCourtCase: 'No',
        courtOrderMadeForProtection: 'No',
        proceedingsList: [],
      })
    );
    expect(res.redirect).toHaveBeenCalledWith(RESPOND_TO_APPLICATION);
  });

  test('Should not update the userCase for proceedings when updateCaseData API is throwing error', async () => {
    updateCaserMock.mockRejectedValue({ message: 'MOCK_ERROR', response: { status: 500, data: 'Error' } });
    await expect(proceedingPostController.post(req, res)).rejects.toThrow(
      'ProceedingPostController - Case could not be updated.'
    );
  });
});
