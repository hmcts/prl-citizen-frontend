import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { ProceedingsOrderTypes, YesOrNo } from '../../../app/case/definition';

import {
  getDisplayDate,
  getDocumentInfo,
  getNextId,
  mapProceedingDetails,
  prepareProceedingDetailsRequest,
} from './ProceedingDetailsMapper';
//import { getProceedingDetails, setProceedingDetails } from './ProceedingDetailsMapper';
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
          response: {},
        },
      },
    ];
  });

  test('Should set Proceeding details from session data', async () => {
    req.session.userCase.proceedingsStart = 'No';
    req.session.userCase.proceedingsStartOrder = 'Yes';
    req.session.userCase.courtProceedingsOrders = ['childArrangementOrder', 'emergencyProtectionOrder'];
    req.session.userCase.otherProceedings = {
      order: {
        childArrangementOrders: [
          {
            id: 'string',
            orderDetail: 'string',
            caseNo: 'string',
            orderDate: {
              year: '2022',
              month: '03',
              day: '01',
            },
            currentOrder: 'Yes',
            orderEndDate: {
              year: '2022',
              month: '03',
              day: '01',
            },
            orderCopy: 'No',
            orderDocument: {
              id: 'dsf',
              url: 'string',
              filename: 'string',
              binaryUrl: 'string',
            },
          },
        ],
        emergencyProtectionOrders: [
          {
            id: 'string',
            orderDetail: 'string',
            caseNo: 'string',
            orderDate: {
              year: '2022',
              month: '03',
              day: '01',
            },
            currentOrder: 'Yes',
            orderEndDate: {
              year: '2022',
              month: '03',
              day: '01',
            },
            orderCopy: 'No',
            orderDocument: {},
          },
        ],
      },
    };
    expect(prepareProceedingDetailsRequest(req.session.userCase).courtOrderMadeForProtection).toEqual('Yes');
  });

  test('Should set Proceeding details from session data for contactOrdersForDivorce', async () => {
    req.session.userCase.proceedingsStart = 'No';
    req.session.userCase.proceedingsStartOrder = 'Yes';
    req.session.userCase.courtProceedingsOrders = ['contactOrderForDivorce', 'contactOrderForAdoption'];
    req.session.userCase.otherProceedings = {
      order: {
        contactOrdersForDivorce: [
          {
            id: 'string',
            orderDetail: 'string',
            caseNo: 'string',
            orderDate: {
              year: '2022',
              month: '03',
              day: '01',
            },
            currentOrder: 'Yes',
            orderEndDate: {
              year: '2022',
              month: '03',
              day: '01',
            },
            orderCopy: 'No',
            orderDocument: {
              id: 'dsf',
              url: 'string',
              filename: 'string',
              binaryUrl: 'string',
            },
          },
        ],
        contactOrdersForAdoption: [
          {
            id: 'string',
            orderDetail: 'string',
            caseNo: 'string',
            orderDate: {
              year: '2022',
              month: '03',
              day: '01',
            },
            currentOrder: 'Yes',
            orderEndDate: {
              year: '2022',
              month: '03',
              day: '01',
            },
            orderCopy: 'No',
            orderDocument: {},
          },
        ],
      },
    };
    expect(prepareProceedingDetailsRequest(req.session.userCase).courtOrderMadeForProtection).toEqual('Yes');
  });

  test('Should set Proceeding details from session data for setProceedingDetails', async () => {
    req.session.userCase.proceedingsStart = 'No';
    req.session.userCase.proceedingsStartOrder = 'Yes';
    req.session.userCase.courtProceedingsOrders = ['childArrangementOrder', 'emergencyProtectionOrder'];
    req.session.userCase.otherProceedings = {
      order: {
        childArrangementOrders: [
          {
            id: 'string',
            orderDetail: 'string',
            caseNo: 'string',
            orderDate: {
              year: '2022',
              month: '03',
              day: '01',
            },
            currentOrder: '',
            orderEndDate: {
              year: '2022',
              month: '03',
              day: '01',
            },
            orderCopy: '',
          },
        ],
        emergencyProtectionOrders: [
          {
            id: 'string',
            orderDetail: 'string',
            caseNo: 'string',
            orderDate: {
              year: '2022',
              month: '03',
              day: '01',
            },
            currentOrder: 'Yes',
            orderEndDate: {
              year: '2022',
              month: '03',
              day: '01',
            },
            orderCopy: 'No',
          },
        ],
      },
    };
    expect(prepareProceedingDetailsRequest(req.session.userCase).courtOrderMadeForProtection).toEqual('Yes');
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
    await prepareProceedingDetailsRequest(req.session.userCase);
    expect(respondents[0].value.response.currentOrPreviousProceedings.haveChildrenBeenInvolvedInCourtCase).toEqual(
      'No'
    );
    // expect(respondents[0].value.response.currentOrPreviousProceedings.courtOrderMadeForProtection).toEqual('No');
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
    await prepareProceedingDetailsRequest(req.session.userCase);
    expect(respondents[0].value.response.currentOrPreviousProceedings.haveChildrenBeenInvolvedInCourtCase).toEqual(
      'No'
    );
    // expect(respondents[0].value.response.currentOrPreviousProceedings.courtOrderMadeForProtection).toEqual('No');
  });

  test('Should get data from response data to session', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      currentOrPreviousProceedings: {
        haveChildrenBeenInvolvedInCourtCase: 'No',
        courtOrderMadeForProtection: 'Yes',
        proceedingsList: [
          {
            id: 'string',
            value: {
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
          },
          {
            id: 'string',
            value: {
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
          },
        ],
      },
    };
    respondents[0].value.response = response;
    const expected = {
      courtProceedingsOrders: ['emergencyProtectionOrder', 'careOrder'],
      otherProceedings: {
        order: {
          careOrders: [
            {
              caseNo: undefined,
              currentOrder: undefined,
              id: '1',
              orderCopy: undefined,
              orderDate: { day: '', month: '', year: '' },
              orderDetail: undefined,
              orderEndDate: { day: '', month: '', year: '' },
            },
          ],
          emergencyProtectionOrders: [
            {
              caseNo: undefined,
              currentOrder: undefined,
              id: '1',
              orderCopy: undefined,
              orderDate: { day: '', month: '', year: '' },
              orderDetail: undefined,
              orderEndDate: { day: '', month: '', year: '' },
            },
          ],
        },
      },
      proceedingsStart: 'No',
      proceedingsStartOrder: 'Yes',
    };
    expect(mapProceedingDetails(respondents[0])).toEqual(expected);
  });

  test('Should get data from response data to session with ordercopy and current order not populated and along with doc value provided', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      currentOrPreviousProceedings: {
        haveChildrenBeenInvolvedInCourtCase: 'No',
        courtOrderMadeForProtection: 'Yes',
        proceedingsList: [
          {
            id: 'string',
            value: {
              orderType: 'contactOrderForAdoption',
              proceedingDetails: [
                {
                  id: 'string',
                  value: {
                    caseNo: 'test',
                    orderDate: '2021-02-02',
                    currentOrder: null,
                    orderEndDate: '2021-02-02',
                    orderCopy: null,
                    orderDocument: {
                      document_url: 'string',
                      document_filename: 'string',
                      document_binary_url: 'string',
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    };
    respondents[0].value.response = response;
    expect(mapProceedingDetails(respondents[0]).courtProceedingsOrders).toEqual(['contactOrderForAdoption']);
  });

  test('Should get data from response data to session with ordercopy and current order not populated and along with doc value provided1', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      currentOrPreviousProceedings: {
        haveChildrenBeenInvolvedInCourtCase: 'No',
        courtOrderMadeForProtection: 'Yes',
        proceedingsList: [
          {
            id: 'string',
            value: {
              orderType: 'contactOrderForDivorce',
              proceedingDetails: [
                {
                  id: 'string',
                  value: {
                    caseNo: 'test',
                    orderDate: '2021-02-02',
                    currentOrder: null,
                    orderEndDate: '2021-02-02',
                    orderCopy: null,
                    orderDocument: {
                      document_url: 'string',
                      document_filename: 'string',
                      document_binary_url: 'string',
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    };
    respondents[0].value.response = response;
    expect(mapProceedingDetails(respondents[0]).courtProceedingsOrders).toEqual(['contactOrderForDivorce']);
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
    await mapProceedingDetails(respondents[0]);

    expect(req.session.userCase.proceedingsStart).toEqual('No');
    expect(req.session.userCase.proceedingsStartOrder).toEqual('Yes');
  });

  test('Should return value for providing a date for getDisplayDate', () => {
    const retunrn_date = { day: undefined, month: undefined, year: 'May' };
    expect(getDisplayDate(new Date())).toEqual(retunrn_date);
  });

  test('Should return undefined for providing a date for getDisplayDate', () => {
    const retunrn_date = { day: '', month: '', year: '' };
    expect(getDisplayDate(undefined)).toEqual(retunrn_date);
  });

  test('Should return string number for providing a value for getNextId', () => {
    const num = 1;
    expect(getNextId(num)).toEqual('2');
  });

  test('Should return order doc info for providing a docs related value for getDocumentInfo', () => {
    const doc = {
      document_url: 'string',
      document_filename: 'string',
      document_binary_url: 'string',
    };
    const expected = {
      binaryUrl: 'string',
      filename: 'string',
      id: ' ',
      url: 'string',
    };
    expect(getDocumentInfo(doc)).toEqual(expected);
  });
});
