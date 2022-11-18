import { Case } from '../../../app/case/case';
import {
  ProceedingsOrderInterface,
  ProceedingsOrderTypeInterface,
  ProceedingsOrderTypeKeyMapper,
  ProceedingsOrderTypes,
  YesNoEmpty,
} from '../../../app/case/definition';

interface C100AllOrdersInterface extends ProceedingsOrderInterface {
  orderType: ProceedingsOrderTypes;
}

const getAllOrders = (orders: ProceedingsOrderTypeInterface | Record<string, never> = {}): C100AllOrdersInterface[] => {
  return Object.entries(orders).reduce((allOrders: C100AllOrdersInterface[], [orderType, _orders]) => {
    allOrders = [
      ...allOrders,
      ..._orders.map(order => ({
        orderType: Object.keys(ProceedingsOrderTypeKeyMapper).find(
          _orderType => ProceedingsOrderTypeKeyMapper[_orderType] === orderType
        ),
        ...order,
      })),
    ];
    return allOrders;
  }, []);
};

export const isAnyOrderWithOrderCopy = (
  orders: ProceedingsOrderTypeInterface | Record<string, never> = {}
): boolean => {
  return !!getAllOrders(orders).find(order => order.orderCopy === YesNoEmpty.YES);
};

export const isAnyOrderWithDocument = (orders: ProceedingsOrderTypeInterface | Record<string, never> = {}): boolean => {
  return !!getAllOrders(orders).find(order => order.orderCopy === YesNoEmpty.YES && order.orderDocument?.id);
};

export const isValidOrderType = (orderType: ProceedingsOrderTypes, caseData: Partial<Case>): boolean => {
  return !!(
    Object.values(ProceedingsOrderTypes).includes(orderType) && caseData?.courtProceedingsOrders?.includes(orderType)
  );
};

export const getAllOrderDocuments = (
  orders: ProceedingsOrderTypeInterface | Record<string, never> = {}
): ProceedingsOrderInterface[] | [] => {
  return getAllOrders(orders).filter(order => order.orderDocument?.id);
};

export const getSelectedOrders = (
  orders: ProceedingsOrderTypeInterface | Record<string, never> = {}
): ProceedingsOrderInterface[] | [] => {
  return  getAllOrders(orders).filter( order => order.orderType);
};
