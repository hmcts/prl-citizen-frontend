import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { ProceedingsOrderTypes, YesOrNo } from '../../../app/case/definition';

import { ProceedingPostController } from './ProceedingPostController';

const updateCaserMock = jest.spyOn(CosApiClient.prototype, 'updateCase');
const retrieveByCaseIdMock = jest.spyOn(CosApiClient.prototype, 'retrieveByCaseId');

let respondents;

describe('ProceedingPostController', () => {
  let fields;
  const proceedingPostController = new ProceedingPostController(fields);
  const req = mockRequest();
  const res = mockResponse();
  beforeEach(() => {
    jest.clearAllMocks;
    respondents = [
      {
        id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
        value: {
          firstName: 'TestUser',
          lastName: 'Citizen',
          email: 'test@example.net',
          user: {
            idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            email: 'test1234@example.net',
          },
          response: {},
        },
      },
    ];
    retrieveByCaseIdMock.mockResolvedValue(req.session.userCase);
    updateCaserMock.mockResolvedValue(req.session.userCase);
  });

  afterEach(() => {
    retrieveByCaseIdMock.mockClear();
    updateCaserMock.mockClear();
    jest.clearAllMocks;
  });

  test('Should update the Proceeding details if user id matches with respondent', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
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

    respondents[0].value.response = response;
    req.session.userCase.respondents = respondents;

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

    respondents[0].value.response = response;
    req.session.userCase.respondents = respondents;
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e6';
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
});
