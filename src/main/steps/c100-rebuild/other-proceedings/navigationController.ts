import { Case } from '../../../app/case/case';
import { C100OrderInterface, C100OrderTypeKeyMapper, C100OrderTypes, YesNoEmpty } from '../../../app/case/definition';
import {
  C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS,
  C100_OTHER_PROCEEDINGS_DETAILS,
  C100_OTHER_PROCEEDINGS_DOCUMENT_SUMMARY,
  C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
  C100_OTHER_PROCEEDINGS_ORDER_DETAILS,
  PageLink,
} from '../../urls';

import { isAnyOrderWithOrderCopy } from './util';

class OtherProceedingsNavigationController {
  private selectedOrderTypes: C100OrderTypes[] | [] = [];
  private orders: C100OrderInterface[] | [] = [];
  private orderType = '';
  private orderId: number | undefined = undefined;

  private getOrderId(): number {
    return this.orders.findIndex(order => order.orderCopy === YesNoEmpty.YES) + 1;
  }
  private getNextOrderId(): number {
    return (
      this.orders.findIndex((order, index) => order.orderCopy === YesNoEmpty.YES && index > Number(this.orderId) - 1) +
      1
    );
  }
  private getCurrentOrderTypeIndex(): number {
    return this.selectedOrderTypes.findIndex(_orderType => _orderType === this.orderType);
  }
  private getNextOrderType(): C100OrderTypes | '' {
    const currentSelectedOrderIndex = this.getCurrentOrderTypeIndex();
    return currentSelectedOrderIndex <= this.selectedOrderTypes.length - 1
      ? this.selectedOrderTypes[currentSelectedOrderIndex + 1]
      : '';
  }

  private getOrdersByType(caseData): C100OrderInterface[] | [] {
    return caseData?.otherProceedings?.order[C100OrderTypeKeyMapper[this.orderType]] ?? [];
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getNextUrl(currentPage: PageLink, caseData: Partial<Case>, queryParams?: Record<string, any>): PageLink {
    this.selectedOrderTypes = caseData?.courtProceedingsOrders ?? [];
    this.orderType = queryParams?.orderType as C100OrderTypes;
    this.orderId = queryParams?.orderId;
    this.orders = this.getOrdersByType(caseData);
    let nextUrl;

    switch (currentPage) {
      case C100_OTHER_PROCEEDINGS_DETAILS:
        nextUrl = `${C100_OTHER_PROCEEDINGS_ORDER_DETAILS}?orderType=${this.selectedOrderTypes[0]}`;
        break;
      case C100_OTHER_PROCEEDINGS_ORDER_DETAILS: {
        const orderId = this.getOrderId();
        if (orderId) {
          // if any order has order copy to be uploaded
          nextUrl = `${C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD}?orderType=${this.orderType}&orderId=${orderId}`;
        } else {
          // none of the orders in the current order type have order copy to be uploaded
          const nextOrderType = this.getNextOrderType();
          if (nextOrderType) {
            nextUrl = `${C100_OTHER_PROCEEDINGS_ORDER_DETAILS}?orderType=${nextOrderType}`;
          } else {
            // there is no other order type present
            if (isAnyOrderWithOrderCopy(caseData?.otherProceedings?.order)) {
              // check at last if there were any previous order types having at least an order with order copy
              nextUrl = C100_OTHER_PROCEEDINGS_DOCUMENT_SUMMARY;
            } else {
              nextUrl = C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS;
            }
          }
        }
        break;
      }
      case C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD: {
        const nextOrderId = this.getNextOrderId();
        if (nextOrderId) {
          // if there are any more orders with order copy
          nextUrl = `${C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD}?orderType=${this.orderType}&orderId=${nextOrderId}`;
        } else {
          // none of the orders in the current order type have order copy to be uploaded
          const nextOrderType = this.getNextOrderType();
          if (nextOrderType) {
            nextUrl = `${C100_OTHER_PROCEEDINGS_ORDER_DETAILS}?orderType=${nextOrderType}`;
          } else {
            nextUrl = C100_OTHER_PROCEEDINGS_DOCUMENT_SUMMARY;
          }
        }
        break;
      }
      default:
        nextUrl = currentPage;
        break;
    }

    return nextUrl;
  }
}

export default new OtherProceedingsNavigationController();
