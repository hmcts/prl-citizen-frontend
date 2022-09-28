import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { C100OrderTypes } from '../../../app/case/definition';
import {
  C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS,
  C100_OTHER_PROCEEDINGS_DOCUMENT_SUMMARY,
  C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
  C100_OTHER_PROCEEDINGS_ORDER_DETAILS,
} from '../../urls';

import {
  getAllOrderDocuments,
  isAnyOrderWithDocument,
  isAnyOrderWithOrderCopy,
  isValidOrderType,
  sanitizeOtherProceedingsQueryString,
} from './util';

const dummyRequest = mockRequest({
  query: {},
  session: {
    userCase: {
      op_courtProceedingsOrders: ['careOrder', 'emergencyProtectionOrder', 'otherOrder', 'supervisionOrder'],
      op_otherProceedings: {
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
              orderDocument: {
                id: 'doc1',
              },
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
  test('isAnyOrderWithOrderCopy should return true as there is an order with order copy set to yes', async () => {
    expect(isAnyOrderWithOrderCopy(dummyRequest.session.userCase.op_otherProceedings.order)).toBe(true);
  });

  test('isAnyOrderWithDocument should return true as there is an order with order copy having document informaation', async () => {
    expect(isAnyOrderWithDocument(dummyRequest.session.userCase.op_otherProceedings.order)).toBe(true);
  });

  test('isValidOrderType should return true as the order type is chosen', async () => {
    expect(isValidOrderType(C100OrderTypes.CARE_ORDER, dummyRequest.session.userCase)).toBe(true);
  });

  test('getAllOrderDocuments should retrive all the orders containing document information', async () => {
    expect(getAllOrderDocuments(dummyRequest.session.userCase.op_otherProceedings.order)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          orderCopy: 'Yes',
          orderDocument: {
            id: 'doc1',
          },
        }),
      ])
    );
  });

  test('sanitizeOtherProceedingsQueryString method should remove unnecssary query string on page navigation', async () => {
    expect(
      sanitizeOtherProceedingsQueryString(C100_OTHER_PROCEEDINGS_ORDER_DETAILS, C100_OTHER_PROCEEDINGS_ORDER_DETAILS, {
        orderId: '1',
        orderType: 'careOrder',
        lng: 'cy',
      })
    ).toEqual(
      expect.objectContaining({
        orderType: 'careOrder',
        lng: 'cy',
      })
    );

    expect(
      sanitizeOtherProceedingsQueryString(
        C100_OTHER_PROCEEDINGS_ORDER_DETAILS,
        C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
        {
          orderId: '1',
          orderType: 'careOrder',
          lng: 'cy',
        }
      )
    ).toEqual(
      expect.objectContaining({
        orderId: '1',
        orderType: 'careOrder',
        lng: 'cy',
      })
    );

    expect(
      sanitizeOtherProceedingsQueryString(
        C100_OTHER_PROCEEDINGS_ORDER_DETAILS,
        C100_OTHER_PROCEEDINGS_DOCUMENT_SUMMARY,
        {
          orderId: '1',
          orderType: 'careOrder',
          lng: 'cy',
        }
      )
    ).toEqual(
      expect.objectContaining({
        lng: 'cy',
      })
    );

    expect(
      sanitizeOtherProceedingsQueryString(
        C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
        C100_OTHER_PROCEEDINGS_ORDER_DETAILS,
        {
          orderId: '1',
          orderType: 'careOrder',
          lng: 'cy',
        }
      )
    ).toEqual(
      expect.objectContaining({
        orderType: 'careOrder',
        lng: 'cy',
      })
    );

    expect(
      sanitizeOtherProceedingsQueryString(
        C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
        C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
        {
          orderId: '1',
          orderType: 'careOrder',
          lng: 'cy',
        }
      )
    ).toEqual(
      expect.objectContaining({
        orderId: '1',
        orderType: 'careOrder',
        lng: 'cy',
      })
    );

    expect(
      sanitizeOtherProceedingsQueryString(
        C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
        C100_OTHER_PROCEEDINGS_DOCUMENT_SUMMARY,
        {
          orderId: '1',
          orderType: 'careOrder',
          lng: 'cy',
        }
      )
    ).toEqual(
      expect.objectContaining({
        lng: 'cy',
      })
    );

    expect(
      sanitizeOtherProceedingsQueryString(
        C100_OTHER_PROCEEDINGS_DOCUMENT_SUMMARY,
        C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS,
        {
          orderId: '1',
          orderType: 'careOrder',
          lng: 'cy',
        }
      )
    ).toEqual(
      expect.objectContaining({
        lng: 'cy',
      })
    );
  });
});
