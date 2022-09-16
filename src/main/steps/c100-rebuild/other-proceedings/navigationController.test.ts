import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import {
  C100_OTHER_PROCEEDINGS_DETAILS,
  C100_OTHER_PROCEEDINGS_DOCUMENT_SUMMARY,
  C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
  C100_OTHER_PROCEEDINGS_ORDER_DETAILS,
} from '../../urls';

import OtherProceedingsNavigationController from './navigationController';

const dummyRequest = mockRequest({
  query: {},
  session: {
    userCase: {
      courtProceedingsOrders: ['careOrder', 'emergencyProtectionOrder', 'otherOrder', 'supervisionOrder'],
      otherProceedings: {
        order: {
          careOrders: [
            {
              orderCopy: '',
            },
            {
              orderCopy: 'Yes',
            },
            {
              orderCopy: 'No',
            },
            {
              orderCopy: 'Yes',
            },
          ],
          emergencyProtectionOrders: [
            {
              orderCopy: '',
            },
          ],
          otherOrders: [
            {
              orderCopy: 'Yes',
            },
          ],
          supervisionOrders: [
            {
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
      dummyRequest.query
    );
    expect(nextUrl).toBe(`${C100_OTHER_PROCEEDINGS_ORDER_DETAILS}?orderType=careOrder`);
  });

  test('From care order screen -> navigate to the care order document upload screen for orderId 2', async () => {
    dummyRequest.query = {
      orderType: 'careOrder',
    };
    const nextUrl = OtherProceedingsNavigationController.getNextUrl(
      C100_OTHER_PROCEEDINGS_ORDER_DETAILS,
      dummyRequest.session.userCase,
      dummyRequest.query
    );
    expect(nextUrl).toBe(`${C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD}?orderType=careOrder&orderId=2`);
  });

  test('From care order doc uplaod screen for orderId 2 -> navigate to the care order document upload screen for orderId 4', async () => {
    dummyRequest.query = {
      orderType: 'careOrder',
      orderId: 2,
    };
    const nextUrl = OtherProceedingsNavigationController.getNextUrl(
      C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
      dummyRequest.session.userCase,
      dummyRequest.query
    );
    expect(nextUrl).toBe(`${C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD}?orderType=careOrder&orderId=4`);
  });

  test('From care order doc uplaod screen for orderId 4 -> navigate to the emergency protection order screen', async () => {
    dummyRequest.query = {
      orderType: 'careOrder',
      orderId: 4,
    };
    const nextUrl = OtherProceedingsNavigationController.getNextUrl(
      C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
      dummyRequest.session.userCase,
      dummyRequest.query
    );
    expect(nextUrl).toBe(`${C100_OTHER_PROCEEDINGS_ORDER_DETAILS}?orderType=emergencyProtectionOrder`);
  });

  test('From emergency protection order screen -> navigate to the other order screen', async () => {
    dummyRequest.query = {
      orderType: 'emergencyProtectionOrder',
    };
    const nextUrl = OtherProceedingsNavigationController.getNextUrl(
      C100_OTHER_PROCEEDINGS_ORDER_DETAILS,
      dummyRequest.session.userCase,
      dummyRequest.query
    );
    expect(nextUrl).toBe(`${C100_OTHER_PROCEEDINGS_ORDER_DETAILS}?orderType=otherOrder`);
  });

  test('From other order screen -> navigate to the other order document upload screen for orderId 1', async () => {
    dummyRequest.query = {
      orderType: 'otherOrder',
    };
    const nextUrl = OtherProceedingsNavigationController.getNextUrl(
      C100_OTHER_PROCEEDINGS_ORDER_DETAILS,
      dummyRequest.session.userCase,
      dummyRequest.query
    );
    expect(nextUrl).toBe(`${C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD}?orderType=otherOrder&orderId=1`);
  });

  test('From other order document upload screen for orderId 1 -> navigate to document uploaded summary screen', async () => {
    dummyRequest.query = {
      orderType: 'otherOrder',
      orderId: 1,
    };
    const nextUrl = OtherProceedingsNavigationController.getNextUrl(
      C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
      dummyRequest.session.userCase,
      dummyRequest.query
    );
    expect(nextUrl).toBe(`${C100_OTHER_PROCEEDINGS_ORDER_DETAILS}?orderType=supervisionOrder`);
  });

  test('From supervision order screen -> navigate to document uploaded summary screen', async () => {
    dummyRequest.query = {
      orderType: 'supervisionOrder',
    };
    const nextUrl = OtherProceedingsNavigationController.getNextUrl(
      C100_OTHER_PROCEEDINGS_ORDER_DETAILS,
      dummyRequest.session.userCase,
      dummyRequest.query
    );
    expect(nextUrl).toBe(C100_OTHER_PROCEEDINGS_DOCUMENT_SUMMARY);
  });
});
