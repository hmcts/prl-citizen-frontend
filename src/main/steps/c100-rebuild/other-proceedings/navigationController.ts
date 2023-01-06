import { Case } from '../../../app/case/case';
import {
  C100OrderInterface,
  C100OrderTypeKeyMapper,
  C100OrderTypes,
  YesNoEmpty,
  YesOrNo,
} from '../../../app/case/definition';
import { applyParms } from '../../../steps/common/url-parser';
import {
  C100_C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE,
  C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS,
  C100_OTHER_PROCEEDINGS_DETAILS,
  C100_OTHER_PROCEEDINGS_DOCUMENT_SUMMARY,
  C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
  C100_OTHER_PROCEEDINGS_ORDER_DETAILS,
  C100_TYPE_ORDER_SELECT_COURT_ORDER,
  PageLink,
} from '../../urls';

import { isAnyOrderWithOrderCopy } from './util';
class OtherProceedingsNavigationController {
  private selectedOrderTypes: C100OrderTypes[] | [] = [];
  private orders: C100OrderInterface[] | [] = [];
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
  private getNextOrderType(): C100OrderTypes | '' {
    const currentSelectedOrderIndex = this.getCurrentOrderTypeIndex();
    return this.selectedOrderTypes[currentSelectedOrderIndex + 1] ?? '';
  }

  private getOrdersByType(caseData): C100OrderInterface[] | [] {
    return caseData?.op_otherProceedings?.order[C100OrderTypeKeyMapper[this.orderType]] ?? [];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getNextUrl(currentPage: PageLink, caseData: Partial<Case>, params?: Record<string, any>): PageLink {
    this.selectedOrderTypes = caseData?.op_courtProceedingsOrders ?? [];
    this.orderType = params?.orderType as C100OrderTypes;
    this.orderId = params?.orderId;
    this.orders = this.getOrdersByType(caseData);
    let nextUrl;

    switch (currentPage) {
      case C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS: {
        const nextUrl1 =
          caseData.sq_writtenAgreement === YesOrNo.NO && caseData.miam_otherProceedings === YesOrNo.YES
            ? C100_TYPE_ORDER_SELECT_COURT_ORDER
            : C100_C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE;
        nextUrl =
          caseData.op_childrenInvolvedCourtCase === YesOrNo.YES || caseData.op_courtOrderProtection === YesOrNo.YES
            ? C100_OTHER_PROCEEDINGS_DETAILS
            : nextUrl1;
        break;
      }
      case C100_OTHER_PROCEEDINGS_DETAILS:
        nextUrl = applyParms(C100_OTHER_PROCEEDINGS_ORDER_DETAILS, { orderType: this.selectedOrderTypes[0] });
        break;
      case C100_OTHER_PROCEEDINGS_ORDER_DETAILS: {
        nextUrl = this.getNextUrlOtherProceedingDetails(caseData);
        break;
      }
      case C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD: {
        nextUrl = this.getNextUrlOtherProceedingDocument();
        break;
      }
      case C100_OTHER_PROCEEDINGS_DOCUMENT_SUMMARY: {
        nextUrl =
          caseData.sq_writtenAgreement === YesOrNo.NO && caseData.miam_otherProceedings === YesOrNo.YES
            ? C100_TYPE_ORDER_SELECT_COURT_ORDER
            : C100_C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE;
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
      url = applyParms(C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, { orderType: this.orderType, orderId });
    } else {
      // none of the orders in the current order type have order copy to be uploaded
      const nextOrderType = this.getNextOrderType();
      if (nextOrderType) {
        url = applyParms(C100_OTHER_PROCEEDINGS_ORDER_DETAILS, { orderType: nextOrderType });
      } else {
        // there is no other order type present
        if (isAnyOrderWithOrderCopy(caseData?.op_otherProceedings?.order)) {
          // check at last if there were any previous order types having at least an order with order copy
          url = C100_OTHER_PROCEEDINGS_DOCUMENT_SUMMARY;
        } else {
          url =
            caseData.sq_writtenAgreement === YesOrNo.NO && caseData.miam_otherProceedings === YesOrNo.YES
              ? C100_TYPE_ORDER_SELECT_COURT_ORDER
              : C100_C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE;
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
      url = applyParms(C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, {
        orderType: this.orderType,
        orderId: nextOrderId,
      });
    } else {
      // none of the orders in the current order type have order copy to be uploaded
      const nextOrderType = this.getNextOrderType();
      if (nextOrderType) {
        url = applyParms(C100_OTHER_PROCEEDINGS_ORDER_DETAILS, { orderType: nextOrderType });
      } else {
        url = C100_OTHER_PROCEEDINGS_DOCUMENT_SUMMARY;
      }
    }
    return url;
  }
}

export default new OtherProceedingsNavigationController();
