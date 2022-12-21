import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { C100OrderTypes } from '../../../app/case/definition';

import { getAllOrderDocuments, isAnyOrderWithDocument, isAnyOrderWithOrderCopy, isValidOrderType } from './util';

const dummyRequest = mockRequest({
  params: {},
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

// const dummyRequestTwo = mockRequest({
//   params: {},
//   session: {
//     userCase: {
//       op_courtProceedingsOrders: ['careOrder', 'emergencyProtectionOrder', 'otherOrder', 'supervisionOrder'],
//       op_otherProceedings: {
//         order: {},
//       },
//     },
//   },
// });

describe('OtherProceedingsNavigationController', () => {
  test('isAnyOrderWithOrderCopy should return true as there is an order with order copy set to yes', async () => {
    expect(isAnyOrderWithOrderCopy(dummyRequest.session.userCase.op_otherProceedings.order)).toBe(true);
  });

  test('isAnyOrderWithDocument should return true as there is an order with order copy having document informaation', async () => {
    expect(isAnyOrderWithDocument(dummyRequest.session.userCase.op_otherProceedings.order)).toBe(true);
  });

  test('isAnyOrderWithDocument > empty order', async () => {
    expect(isAnyOrderWithDocument()).toBe(false);
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

  test('getAllOrderDocuments  > empty object', async () => {
    expect(getAllOrderDocuments()).toEqual([]);
  });
});
