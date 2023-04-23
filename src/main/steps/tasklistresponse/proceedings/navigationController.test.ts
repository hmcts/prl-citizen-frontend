import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { applyParms } from '../../common/url-parser';
import {
  OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
  PROCEEDINGS_COURT_PROCEEDINGS,
  PROCEEDINGS_ORDER_DETAILS,
  PROCEEDINGS_SUMMARY,
} from '../../urls';

import OtherProceedingsNavigationController from './navigationController';

const dummyRequest = mockRequest({
  params: {},
  session: {
    userCase: {
      courtProceedingsOrders: ['careOrder', 'emergencyProtectionOrder', 'otherOrder', 'supervisionOrder'],
      otherProceedings: {
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
      PROCEEDINGS_COURT_PROCEEDINGS,
      dummyRequest.session.userCase,
      dummyRequest.params
    );
    expect(nextUrl).toBe(applyParms(PROCEEDINGS_ORDER_DETAILS, { orderType: 'careOrder' }));
  });

  test('From care order screen -> navigate to the care order document upload screen for orderId 2', async () => {
    dummyRequest.params = {
      orderType: 'careOrder',
    };
    const nextUrl = OtherProceedingsNavigationController.getNextUrl(
      PROCEEDINGS_ORDER_DETAILS,
      dummyRequest.session.userCase,
      dummyRequest.params
    );
    expect(nextUrl).toBe(applyParms(OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, { orderType: 'careOrder', orderId: '2' }));
  });

  test('From care order doc uplaod screen for orderId 2 -> navigate to the care order document upload screen for orderId 4', async () => {
    dummyRequest.params = {
      orderType: 'careOrder',
      orderId: 2,
    };
    const nextUrl = OtherProceedingsNavigationController.getNextUrl(
      OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
      dummyRequest.session.userCase,
      dummyRequest.params
    );
    expect(nextUrl).toBe(applyParms(OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, { orderType: 'careOrder', orderId: '4' }));
  });

  test('From care order doc uplaod screen for orderId 4 -> navigate to the emergency protection order screen', async () => {
    dummyRequest.params = {
      orderType: 'careOrder',
      orderId: 4,
    };
    const nextUrl = OtherProceedingsNavigationController.getNextUrl(
      OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
      dummyRequest.session.userCase,
      dummyRequest.params
    );
    expect(nextUrl).toBe(applyParms(PROCEEDINGS_ORDER_DETAILS, { orderType: 'emergencyProtectionOrder' }));
  });

  test('From emergency protection order screen -> navigate to the other order screen', async () => {
    dummyRequest.params = {
      orderType: 'emergencyProtectionOrder',
    };
    const nextUrl = OtherProceedingsNavigationController.getNextUrl(
      PROCEEDINGS_ORDER_DETAILS,
      dummyRequest.session.userCase,
      dummyRequest.params
    );
    expect(nextUrl).toBe(applyParms(PROCEEDINGS_ORDER_DETAILS, { orderType: 'otherOrder' }));
  });

  test('From other order screen -> navigate to the other order document upload screen for orderId 1', async () => {
    dummyRequest.params = {
      orderType: 'otherOrder',
    };
    const nextUrl = OtherProceedingsNavigationController.getNextUrl(
      PROCEEDINGS_ORDER_DETAILS,
      dummyRequest.session.userCase,
      dummyRequest.params
    );
    expect(nextUrl).toBe(applyParms(OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, { orderType: 'otherOrder', orderId: '1' }));
  });

  test('From other order document upload screen for orderId 1 -> navigate to supervision order screen', async () => {
    dummyRequest.params = {
      orderType: 'otherOrder',
      orderId: 1,
    };
    const nextUrl = OtherProceedingsNavigationController.getNextUrl(
      OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
      dummyRequest.session.userCase,
      dummyRequest.params
    );
    expect(nextUrl).toBe(applyParms(PROCEEDINGS_ORDER_DETAILS, { orderType: 'supervisionOrder' }));
  });

  test('From supervision order screen -> navigate to document uploaded summary screen', async () => {
    dummyRequest.params = {
      orderType: 'supervisionOrder',
    };
    const nextUrl = OtherProceedingsNavigationController.getNextUrl(
      PROCEEDINGS_ORDER_DETAILS,
      dummyRequest.session.userCase,
      dummyRequest.params
    );
    expect(nextUrl).toBe(PROCEEDINGS_SUMMARY);
  });
});
