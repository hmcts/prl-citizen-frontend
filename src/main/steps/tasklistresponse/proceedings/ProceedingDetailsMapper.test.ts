import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { ProceedingsOrderTypes, YesOrNo } from '../../../app/case/definition';

import { getProceedingDetails, setProceedingDetails } from './ProceedingDetailsMapper';

let respondents;

describe('ProceedingDetailsMapper', () => {
  const req = mockRequest();
  beforeEach(() => {
    respondents = [
      {
        id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
        value: {
          firstName: 'testFirstName',
          lastName: 'Citizen',
          email: 'test@example.net',
          user: {
            idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            email: 'test1234@example.net',
          },
          response: '',
        },
      },
    ];
  });

  test('Should set Proceeding details from session data', async () => {
    const response = {
      currentOrPreviousProceedings: {
        haveChildrenBeenInvolvedInCourtCase: 'No',
        courtOrderMadeForProtection: 'Yes',
        proceedingsList: {
          order: {
            childArrangementOrders: [
              {
                id: '1',
                orderDetail: '',
                caseNo: '',
                orderDate: {
                  year: '',
                  month: '',
                  day: '',
                },
                currentOrder: '',
                orderEndDate: {
                  year: '',
                  month: '',
                  day: '',
                },
                orderCopy: '',
              },
            ],
            emergencyProtectionOrders: [
              {
                id: '1',
                orderDetail: '',
                caseNo: '',
                orderDate: {
                  year: '',
                  month: '',
                  day: '',
                },
                currentOrder: '',
                orderEndDate: {
                  year: '',
                  month: '',
                  day: '',
                },
                orderCopy: '',
                orderDocument: {
                  url: '',
                  fileName: '',
                  binaryUrl: '',
                },
              },
            ],
            supervisionOrders: [
              {
                id: '1',
                orderDetail: '',
                caseNo: '',
                orderDate: {
                  year: '',
                  month: '',
                  day: '',
                },
                currentOrder: '',
                orderEndDate: {
                  year: '',
                  month: '',
                  day: '',
                },
                orderCopy: '',
              },
            ],
            careOrders: [
              {
                id: '1',
                orderDetail: '',
                caseNo: '',
                orderDate: {
                  year: '',
                  month: '',
                  day: '',
                },
                currentOrder: '',
                orderEndDate: {
                  year: '',
                  month: '',
                  day: '',
                },
                orderCopy: '',
              },
            ],
            childAbductionOrders: [
              {
                id: '1',
                orderDetail: '',
                caseNo: '',
                orderDate: {
                  year: '',
                  month: '',
                  day: '',
                },
                currentOrder: '',
                orderEndDate: {
                  year: '',
                  month: '',
                  day: '',
                },
                orderCopy: '',
              },
            ],
          },
        },
      },
    };
    respondents[0].value.response = response;
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase.proceedingsStart = 'No';
    req.session.userCase.proceedingsStartOrder = 'No';
    const courtProceedingsOrders: ProceedingsOrderTypes[] = [];
    const orderType1 = 'emergencyProtectionOrder' as ProceedingsOrderTypes;
    const orderType2 = 'careOrder' as ProceedingsOrderTypes;
    courtProceedingsOrders.push(orderType1);
    courtProceedingsOrders.push(orderType2);
    req.session.userCase.courtProceedingsOrders = courtProceedingsOrders;
    req.session.userCase.otherProceedings = respondents[0].value.response.currentOrPreviousProceedings.proceedingsList;
    await setProceedingDetails(req.session.userCase, respondents[0], req);
    expect(respondents[0].value.response.currentOrPreviousProceedings.haveChildrenBeenInvolvedInCourtCase).toEqual(
      'No'
    );
    expect(respondents[0].value.response.currentOrPreviousProceedings.courtOrderMadeForProtection).toEqual('No');
  });

  test('Should set response data wit session proceeding data', async () => {
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
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const courtProceedingsOrders: ProceedingsOrderTypes[] = [];
    const orderType1 = 'emergencyProtectionOrder' as ProceedingsOrderTypes;
    const orderType2 = 'careOrder' as ProceedingsOrderTypes;
    courtProceedingsOrders.push(orderType1);
    courtProceedingsOrders.push(orderType2);
    req.session.userCase.courtProceedingsOrders = courtProceedingsOrders;
    await setProceedingDetails(req.session.userCase, respondents[0], req);
    expect(respondents[0].value.response.currentOrPreviousProceedings.haveChildrenBeenInvolvedInCourtCase).toEqual(
      'No'
    );
    expect(respondents[0].value.response.currentOrPreviousProceedings.courtOrderMadeForProtection).toEqual('No');
  });

  test('Should set proceeding data with orderDetail', async () => {
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
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const courtProceedingsOrders: ProceedingsOrderTypes[] = [];
    const orderType1 = 'emergencyProtectionOrder' as ProceedingsOrderTypes;
    const orderType2 = 'careOrder' as ProceedingsOrderTypes;
    courtProceedingsOrders.push(orderType1);
    courtProceedingsOrders.push(orderType2);
    req.session.userCase.courtProceedingsOrders = courtProceedingsOrders;
    await setProceedingDetails(req.session.userCase, respondents[0], req);
    expect(respondents[0].value.response.currentOrPreviousProceedings.haveChildrenBeenInvolvedInCourtCase).toEqual(
      'No'
    );
    expect(respondents[0].value.response.currentOrPreviousProceedings.courtOrderMadeForProtection).toEqual('No');
  });

  test('Should get data from response data to session', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      currentOrPreviousProceedings: {
        haveChildrenBeenInvolvedInCourtCase: 'No',
        courtOrderMadeForProtection: 'Yes',
        proceedingsList: [
          {
            value: {
              orderType: 'value183',
              proceedingDetails: [
                {
                  value: {
                    orderDetail: 'value184',
                    caseNo: 'value185',
                    orderDate: 'value186',
                    currentOrder: 'value187',
                    orderEndDate: 'value188',
                    orderCopy: 'value189',
                    orderDocument: 'document',
                  },
                },
                {
                  value: {
                    orderDetail: 'value190',
                    caseNo: 'value191',
                    orderDate: 'value192',
                    currentOrder: 'value193',
                    orderEndDate: 'value194',
                    orderCopy: 'value195',
                  },
                },
                {
                  value: {
                    orderDetail: 'value196',
                    caseNo: 'value197',
                    orderDate: 'value198',
                    currentOrder: 'value199',
                    orderEndDate: 'value200',
                    orderCopy: 'value201',
                  },
                },
              ],
            },
          },
        ],
      },
    };
    respondents[0].value.response = response;
    await getProceedingDetails(respondents[0], req);
    expect(req.session.userCase.proceedingsStart).toEqual('No');
    expect(req.session.userCase.proceedingsStartOrder).toEqual('Yes');
  });

  test('Should get proceeding data from response to session', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      currentOrPreviousProceedings: {
        haveChildrenBeenInvolvedInCourtCase: 'No',
        courtOrderMadeForProtection: 'Yes',
        proceedingsList: [],
      },
    };
    respondents[0].value.response = response;
    await getProceedingDetails(respondents[0], req);

    expect(req.session.userCase.proceedingsStart).toEqual('No');
    expect(req.session.userCase.proceedingsStartOrder).toEqual('Yes');
  });
});
