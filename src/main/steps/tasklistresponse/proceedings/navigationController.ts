import { Case } from '../../../app/case/case';
import {
  ProceedingsOrderInterface,
  ProceedingsOrderTypeKeyMapper,
  ProceedingsOrderTypes,
  YesNoEmpty,
  YesOrNo,
} from '../../../app/case/definition';
import { applyParms } from '../../../steps/common/url-parser';
import {
  COURT_PROCEEDINGS_SUMMARY,
  OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
  PROCEEDINGS_COURT_PROCEEDINGS,
  PROCEEDINGS_ORDER_DETAILS,
  PROCEEDINGS_START,
  PROCEEDINGS_SUMMARY,
  PageLink,
} from '../../urls';

import { isAnyOrderWithOrderCopy } from './util';

class OtherProceedingsNavigationController {
  private selectedOrderTypes: ProceedingsOrderTypes[] | [] = [];
  private orders: ProceedingsOrderInterface[] | [] = [];
  private orderType = '';
  private orderId: number | undefined = undefined;

  private getOrderId(): string | undefined {
    return this.orders.find(order => order.orderCopy === YesNoEmpty.YES)?.id;
  }
  private getNextOrderId(): string | undefined {
    return this.orders.find(order => Number(order.id) > Number(this.orderId) && order.orderCopy === YesNoEmpty.YES)?.id;
  }
  private getCurrentOrderTypeIndex(): number {
    return this.selectedOrderTypes.findIndex(_orderType => _orderType === this.orderType);
  }
  private getNextOrderType(): ProceedingsOrderTypes | '' {
    const currentSelectedOrderIndex = this.getCurrentOrderTypeIndex();
    return this.selectedOrderTypes[currentSelectedOrderIndex + 1] ?? '';
  }

  private getOrdersByType(caseData): ProceedingsOrderInterface[] | [] {
    return caseData?.otherProceedings?.order[ProceedingsOrderTypeKeyMapper[this.orderType]] ?? [];
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getNextUrl(currentPage: PageLink, caseData: Partial<Case>, params?: Record<string, any>): PageLink {
    this.selectedOrderTypes = caseData?.courtProceedingsOrders ?? [];
    this.orderType = params?.orderType as ProceedingsOrderTypes;
    this.orderId = params?.orderId;
    const proceedingStart = caseData?.proceedingsStart;
    const proceedingOrderType = caseData?.proceedingsStartOrder;
    this.orders = this.getOrdersByType(caseData);
    let nextUrl;

    switch (currentPage) {
      case PROCEEDINGS_START:
        if (proceedingStart === YesOrNo.YES || proceedingOrderType === YesOrNo.YES) {
          nextUrl = PROCEEDINGS_COURT_PROCEEDINGS;
        } else {
          caseData.courtProceedingsOrders = [];
          nextUrl = PROCEEDINGS_SUMMARY;
        }
        break;
      case PROCEEDINGS_COURT_PROCEEDINGS:
        nextUrl = applyParms(PROCEEDINGS_ORDER_DETAILS, { orderType: this.selectedOrderTypes[0] });
        break;
      case PROCEEDINGS_ORDER_DETAILS: {
        nextUrl = this.getNextUrlOtherProceedingDetails(caseData);
        break;
      }
      case OTHER_PROCEEDINGS_DOCUMENT_UPLOAD: {
        nextUrl = this.getNextUrlOtherProceedingDocument();
        break;
      }
      case COURT_PROCEEDINGS_SUMMARY: {
        nextUrl = PROCEEDINGS_SUMMARY;
        break;
      }
      default:
        nextUrl = currentPage;
        break;
    }
    return nextUrl;
  }

  private getNextUrlOtherProceedingDetails(caseData) {
    let url;
    const orderId = this.getOrderId();
    if (orderId) {
      // if any order has order copy to be uploaded
      url = applyParms(OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, { orderType: this.orderType, orderId });
    } else {
      // none of the orders in the current order type have order copy to be uploaded
      const nextOrderType = this.getNextOrderType();
      if (nextOrderType) {
        url = applyParms(PROCEEDINGS_ORDER_DETAILS, { orderType: nextOrderType });
      } else {
        // there is no other order type present
        if (isAnyOrderWithOrderCopy(caseData?.otherProceedings?.order)) {
          // check at last if there were any previous order types having at least an order with order copy
          url = COURT_PROCEEDINGS_SUMMARY;
        } else {
          url = PROCEEDINGS_COURT_PROCEEDINGS;
        }
      }
    }
    return url;
  }
  private getNextUrlOtherProceedingDocument() {
    const nextOrderId = this.getNextOrderId();
    let url;
    if (nextOrderId) {
      // if there are any more orders with order copy
      url = applyParms(OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, {
        orderType: this.orderType,
        orderId: nextOrderId,
      });
    } else {
      // none of the orders in the current order type have order copy to be uploaded
      const nextOrderType = this.getNextOrderType();
      if (nextOrderType) {
        url = applyParms(PROCEEDINGS_ORDER_DETAILS, { orderType: nextOrderType });
      } else {
        url = COURT_PROCEEDINGS_SUMMARY;
      }
    }
    return url;
  }
}
export default new OtherProceedingsNavigationController();
