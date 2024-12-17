import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { CaseWithId } from '../../../app/case/case';
import { C100OrderTypes, YesOrNo } from '../../../app/case/definition';

import {
  cleanCurrentPreviousProceedings,
  cleanProceedingDetails,
  getAllOrderDocuments,
  isAnyOrderWithDocument,
  isAnyOrderWithOrderCopy,
  isValidOrderType,
} from './util';

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

describe('C100 > other proceedings > utils', () => {
  let caseData: CaseWithId;
  beforeEach(() => {
    caseData = {
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
    } as unknown as CaseWithId;
  });

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

  describe('cleanCurrentPreviousProceedings', () => {
    test('should clean other proceedings data when no for both childrenInvolvedCourtCase and courtOrderProtection', () => {
      expect(cleanCurrentPreviousProceedings(caseData, YesOrNo.NO, YesOrNo.NO)).toStrictEqual({});
    });

    test('should not clean other proceedings data when no for childrenInvolvedCourtCase and yes for courtOrderProtection', () => {
      expect(cleanCurrentPreviousProceedings(caseData, YesOrNo.NO, YesOrNo.YES)).toStrictEqual(caseData);
    });

    test('should not clean other proceedings data when yes for childrenInvolvedCourtCase and no for courtOrderProtection', () => {
      expect(cleanCurrentPreviousProceedings(caseData, YesOrNo.YES, YesOrNo.NO)).toStrictEqual(caseData);
    });
  });

  describe('cleanProceedingDetails', () => {
    test('should clean other proceedings data for proceedings that are not selected', () => {
      const newlySelectedOrders = [
        'emergencyProtectionOrder',
        'otherOrder',
        'supervisionOrder',
      ] as unknown as C100OrderTypes[];
      expect(
        cleanProceedingDetails(
          {
            ...caseData,
            op_courtProceedingsOrders: newlySelectedOrders,
          },
          newlySelectedOrders
        )
      ).toStrictEqual({
        op_courtProceedingsOrders: ['emergencyProtectionOrder', 'otherOrder', 'supervisionOrder'],
        op_otherProceedings: {
          order: {
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
      });
    });
  });
});
