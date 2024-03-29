import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { ProceedingsOrderTypes } from '../../../app/case/definition';

import { getAllOrderDocuments, isAnyOrderWithDocument, isAnyOrderWithOrderCopy, isValidOrderType } from './util';

const dummyRequest = mockRequest({
  params: {},
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
    expect(isAnyOrderWithOrderCopy(dummyRequest.session.userCase.otherProceedings.order)).toBe(true);
  });

  test('isAnyOrderWithDocument should return true as there is an order with order copy having document informaation', async () => {
    expect(isAnyOrderWithDocument(dummyRequest.session.userCase.otherProceedings.order)).toBe(true);
  });

  test('isValidOrderType should return true as the order type is chosen', async () => {
    expect(isValidOrderType(ProceedingsOrderTypes.CARE_ORDER, dummyRequest.session.userCase)).toBe(true);
  });

  test('getAllOrderDocuments should retrive all the orders containing document information', async () => {
    expect(getAllOrderDocuments(dummyRequest.session.userCase.otherProceedings.order)).toEqual(
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
});
