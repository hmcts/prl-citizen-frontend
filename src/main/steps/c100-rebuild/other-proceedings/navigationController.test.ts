import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { applyParms } from '../../common/url-parser';
import {
  C100_C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE,
  C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS,
  C100_OTHER_PROCEEDINGS_DETAILS,
  C100_OTHER_PROCEEDINGS_DOCUMENT_SUMMARY,
  C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
  C100_OTHER_PROCEEDINGS_ORDER_DETAILS,
} from '../../urls';

import OtherProceedingsNavigationController from './navigationController';

const dummyRequest = mockRequest({
  params: {},
  session: {
    userCase: {
      op_courtProceedingsOrders: ['careOrder', 'emergencyProtectionOrder', 'otherOrder', 'supervisionOrder'],
      op_otherProceedings: {
        order: {
          careOrders: [
            {
              id: '1',
              orderCopy: '',
            },
            {
              id: '2',
              orderCopy: 'Yes',
            },
            {
              id: '3',
              orderCopy: 'No',
            },
            {
              id: '4',
              orderCopy: 'Yes',
            },
          ],
          emergencyProtectionOrders: [
            {
              id: '1',
              orderCopy: '',
            },
          ],
          otherOrders: [
            {
              id: '1',
              orderCopy: 'Yes',
            },
          ],
          supervisionOrders: [
            {
              id: '1',
              orderCopy: '',
            },
          ],
        },
      },
    },
  },
});

describe('OtherProceedingsNavigationController', () => {
  test('From order selection screen -> navigate to the order details screen for capturing the first selected order', async () => {
    const nextUrl = OtherProceedingsNavigationController.getNextUrl(
      C100_OTHER_PROCEEDINGS_DETAILS,
      dummyRequest.session.userCase,
      dummyRequest.params
    );
    expect(nextUrl).toBe(applyParms(C100_OTHER_PROCEEDINGS_ORDER_DETAILS, { orderType: 'careOrder' }));
  });

  test('From other proceedings various -> navigate to safety concerns screen', async () => {
    const nextUrl = OtherProceedingsNavigationController.getNextUrl(
      C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS,
      dummyRequest.session.userCase,
      dummyRequest.params
    );
    expect(nextUrl).toBe('/c100-rebuild/safety-concerns/concern-guidance');
  });

  test('From care order screen -> navigate to the care order document upload screen for orderId 2', async () => {
    dummyRequest.params = {
      orderType: 'careOrder',
    };
    const nextUrl = OtherProceedingsNavigationController.getNextUrl(
      C100_OTHER_PROCEEDINGS_ORDER_DETAILS,
      dummyRequest.session.userCase,
      dummyRequest.params
    );
    expect(nextUrl).toBe(applyParms(C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, { orderType: 'careOrder', orderId: '2' }));
  });

  test('From care order doc uplaod screen for orderId 2 -> navigate to the care order document upload screen for orderId 4', async () => {
    dummyRequest.params = {
      orderType: 'careOrder',
      orderId: 2,
    };
    const nextUrl = OtherProceedingsNavigationController.getNextUrl(
      C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
      dummyRequest.session.userCase,
      dummyRequest.params
    );
    expect(nextUrl).toBe(applyParms(C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, { orderType: 'careOrder', orderId: '4' }));
  });

  test('From care order doc uplaod screen for orderId 4 -> navigate to the emergency protection order screen', async () => {
    dummyRequest.params = {
      orderType: 'careOrder',
      orderId: 4,
    };
    const nextUrl = OtherProceedingsNavigationController.getNextUrl(
      C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
      dummyRequest.session.userCase,
      dummyRequest.params
    );
    expect(nextUrl).toBe(applyParms(C100_OTHER_PROCEEDINGS_ORDER_DETAILS, { orderType: 'emergencyProtectionOrder' }));
  });

  test('From emergency protection order screen -> navigate to the other order screen', async () => {
    dummyRequest.params = {
      orderType: 'emergencyProtectionOrder',
    };
    const nextUrl = OtherProceedingsNavigationController.getNextUrl(
      C100_OTHER_PROCEEDINGS_ORDER_DETAILS,
      dummyRequest.session.userCase,
      dummyRequest.params
    );
    expect(nextUrl).toBe(applyParms(C100_OTHER_PROCEEDINGS_ORDER_DETAILS, { orderType: 'otherOrder' }));
  });

  test('From other order screen -> navigate to the other order document upload screen for orderId 1', async () => {
    dummyRequest.params = {
      orderType: 'otherOrder',
    };
    const nextUrl = OtherProceedingsNavigationController.getNextUrl(
      C100_OTHER_PROCEEDINGS_ORDER_DETAILS,
      dummyRequest.session.userCase,
      dummyRequest.params
    );
    expect(nextUrl).toBe(applyParms(C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, { orderType: 'otherOrder', orderId: '1' }));
  });

  test('From other order document upload screen for orderId 1 -> navigate to supervision order screen', async () => {
    dummyRequest.params = {
      orderType: 'otherOrder',
      orderId: 1,
    };
    const nextUrl = OtherProceedingsNavigationController.getNextUrl(
      C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
      dummyRequest.session.userCase,
      dummyRequest.params
    );
    expect(nextUrl).toBe(applyParms(C100_OTHER_PROCEEDINGS_ORDER_DETAILS, { orderType: 'supervisionOrder' }));
  });

  test('From supervision order screen -> navigate to document uploaded summary screen', async () => {
    dummyRequest.params = {
      orderType: 'supervisionOrder',
    };
    const nextUrl = OtherProceedingsNavigationController.getNextUrl(
      C100_OTHER_PROCEEDINGS_ORDER_DETAILS,
      dummyRequest.session.userCase,
      dummyRequest.params
    );
    expect(nextUrl).toBe(C100_OTHER_PROCEEDINGS_DOCUMENT_SUMMARY);
  });

  test('Safety concern guidance -> navigate to the other order screen', async () => {
    dummyRequest.params = {
      orderType: 'careOrder',
      orderId: 2,
    };
    const nextUrl = OtherProceedingsNavigationController.getNextUrl(
      C100_OTHER_PROCEEDINGS_DOCUMENT_SUMMARY,
      dummyRequest.session.userCase,
      dummyRequest.params
    );
    expect(nextUrl).toBe(applyParms(C100_C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE, { orderType: 'otherOrder' }));
  });

  test('Default', async () => {
    dummyRequest.params = {};
    const nextUrl = OtherProceedingsNavigationController.getNextUrl(
      C100_C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE,
      dummyRequest.session.userCase,
      dummyRequest.params
    );
    expect(nextUrl).toBe(C100_C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE);
  });
  test('C100_OTHER_PROCEEDINGS_ORDER_DETAILS with out order', async () => {
    dummyRequest.params = {};
    dummyRequest.session.userCase = {};
    const nextUrl = OtherProceedingsNavigationController.getNextUrl(
      C100_OTHER_PROCEEDINGS_ORDER_DETAILS,
      dummyRequest.session.userCase,
      dummyRequest.params
    );
    expect(nextUrl).toBe(C100_C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE);
  });
});
