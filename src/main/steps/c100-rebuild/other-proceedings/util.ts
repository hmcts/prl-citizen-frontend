import { Case } from '../../../app/case/case';
import { C100OrderInterface, C100OrderTypeInterface, C100OrderTypes, YesNoEmpty } from '../../../app/case/definition';

const getAllOrders = (orders: C100OrderTypeInterface | Record<string, never> = {}): C100OrderInterface[] => {
  return Object.entries(orders).reduce((_orders: C100OrderInterface[], [, order]) => {
    _orders = [..._orders, ...order];
    return _orders;
  }, []);
};

export const isAnyOrderWithOrderCopy = (orders: C100OrderTypeInterface | Record<string, never> = {}): boolean => {
  return !!getAllOrders(orders).find(order => order.orderCopy === YesNoEmpty.YES);
};

export const isAnyOrderWithDocument = (orders: C100OrderTypeInterface | Record<string, never> = {}): boolean => {
  return !!getAllOrders(orders).find(order => order.orderCopy === YesNoEmpty.YES && order.orderDocument?.id);
};

export const isValidOrderType = (orderType: C100OrderTypes, caseData: Partial<Case>): boolean => {
  return !!(Object.values(C100OrderTypes).includes(orderType) && caseData?.courtProceedingsOrders?.includes(orderType));
};

export const getAllOrderDocuments = (
  orders: C100OrderTypeInterface | Record<string, never> = {}
): C100OrderInterface[] | [] => {
  return getAllOrders(orders).filter(order => order.orderDocument?.id);
};
