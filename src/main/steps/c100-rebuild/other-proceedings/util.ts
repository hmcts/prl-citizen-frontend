import { Case } from '../../../app/case/case';
import {
  C100OrderInterface,
  C100OrderTypeInterface,
  C100OrderTypeKeyMapper,
  C100OrderTypes,
  YesNoEmpty,
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
