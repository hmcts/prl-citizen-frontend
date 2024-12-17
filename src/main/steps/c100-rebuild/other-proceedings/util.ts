import { Case, CaseWithId } from '../../../app/case/case';
import {
  C100OrderInterface,
  C100OrderTypeInterface,
  C100OrderTypeKeyMapper,
  C100OrderTypes,
  ProceedingsOrderTypeKeyMapper,
  YesNoEmpty,
  YesOrNo,
} from '../../../app/case/definition';

interface C100AllOrdersInterface extends C100OrderInterface {
  orderType: C100OrderTypes;
}

const getAllOrders = (orders: C100OrderTypeInterface | Record<string, never> = {}): C100AllOrdersInterface[] => {
  return Object.entries(orders).reduce((allOrders: C100AllOrdersInterface[], [orderType, _orders]) => {
    allOrders = [
      ...allOrders,
      ..._orders.map(order => ({
        orderType: Object.keys(C100OrderTypeKeyMapper).find(
          _orderType => C100OrderTypeKeyMapper[_orderType] === orderType
        ),
        ...order,
      })),
    ];
    return allOrders;
  }, []);
};

export const isAnyOrderWithOrderCopy = (orders: C100OrderTypeInterface | Record<string, never> = {}): boolean => {
  return !!getAllOrders(orders).find(order => order.orderCopy === YesNoEmpty.YES);
};

export const isAnyOrderWithDocument = (orders: C100OrderTypeInterface | Record<string, never> = {}): boolean => {
  return !!getAllOrders(orders).find(order => order.orderCopy === YesNoEmpty.YES && order.orderDocument?.id);
};

export const isValidOrderType = (orderType: C100OrderTypes, caseData: Partial<Case>): boolean => {
  return !!(
    Object.values(C100OrderTypes).includes(orderType) && caseData?.op_courtProceedingsOrders?.includes(orderType)
  );
};

export const getAllOrderDocuments = (
  orders: C100OrderTypeInterface | Record<string, never> = {}
): C100OrderInterface[] | [] => {
  return getAllOrders(orders).filter(order => order.orderDocument?.id);
};

export const cleanCurrentPreviousProceedings = (
  caseData: CaseWithId,
  childrenInvolvedCourtCase: YesOrNo | undefined,
  courtOrderProtection: YesOrNo | undefined
): CaseWithId => {
  if (childrenInvolvedCourtCase === YesOrNo.NO && courtOrderProtection === YesOrNo.NO) {
    delete caseData.op_otherProceedings;
    delete caseData.op_courtProceedingsOrders;
  }

  return caseData;
};

export const cleanProceedingDetails = (
  caseData: CaseWithId,
  courtProceedingsOrders: C100OrderTypes[] | undefined
): CaseWithId => {
  Object.values(C100OrderTypes).forEach(order => {
    if (!courtProceedingsOrders?.includes(order)) {
      delete caseData.op_otherProceedings?.order?.[ProceedingsOrderTypeKeyMapper[`${order}`]];
    }
  });

  return caseData;
};
