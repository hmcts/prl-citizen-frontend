import { Case } from '../../../app/case/case';
import {
  ProceedingsOrderInterface,
  ProceedingsOrderTypeKeyMapper,
  ProceedingsOrderTypes,
  YesNoEmpty,
} from '../../../app/case/definition';
import { applyParms } from '../../../steps/common/url-parser';
import {
  C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
  COURT_PROCEEDINGS_SUMMARY,
  PROCEEDINGS_COURT_PROCEEDINGS,
  PROCEEDINGS_ORDER_DETAILS,
  PageLink,
} from '../../urls';

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
    this.orders = this.getOrdersByType(caseData);
    let nextUrl;

    switch (currentPage) {
      case PROCEEDINGS_COURT_PROCEEDINGS:
        nextUrl = applyParms(PROCEEDINGS_ORDER_DETAILS, { orderType: this.selectedOrderTypes[0] });
        break;
      case PROCEEDINGS_ORDER_DETAILS: {
        const orderId = this.getOrderId();
        if (orderId) {
          // if any order has order copy to be uploaded
          nextUrl = applyParms(C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, { orderType: this.orderType, orderId });
        } else {
          // none of the orders in the current order type have order copy to be uploaded
          const nextOrderType = this.getNextOrderType();
          if (nextOrderType) {
            nextUrl = applyParms(PROCEEDINGS_ORDER_DETAILS, { orderType: nextOrderType });
          } else {
            // there is no other order type present
            nextUrl = COURT_PROCEEDINGS_SUMMARY;
          }
        }
        break;
      }
      case C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD: {
        const nextOrderId = this.getNextOrderId();
        if (nextOrderId) {
          // if there are any more orders with order copy
          nextUrl = applyParms(C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, {
            orderType: this.orderType,
            orderId: nextOrderId,
          });
        } else {
          // none of the orders in the current order type have order copy to be uploaded
          const nextOrderType = this.getNextOrderType();
          if (nextOrderType) {
            nextUrl = applyParms(PROCEEDINGS_ORDER_DETAILS, { orderType: nextOrderType });
          } else {
            nextUrl = COURT_PROCEEDINGS_SUMMARY;
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
