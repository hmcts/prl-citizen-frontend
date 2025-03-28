import { Case, CaseWithId } from '../../../app/case/case';
import {
  C100OrderInterface,
  C100OrderTypeKeyMapper,
  C100OrderTypes,
  RootContext,
  YesNoEmpty,
  YesOrNo,
} from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { applyParms } from '../../../steps/common/url-parser';
import { isC100ApplicationValid } from '../../c100-rebuild/utils';
import {
  C100_CHECK_YOUR_ANSWER,
  C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS,
  C100_OTHER_PROCEEDINGS_DETAILS,
  C100_OTHER_PROCEEDINGS_DOCUMENT_SUMMARY,
  C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD,
  C100_OTHER_PROCEEDINGS_ORDER_DETAILS,
  C100_TYPE_ORDER_SELECT_COURT_ORDER,
  C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE,
  PageLink,
} from '../../urls';

import { isAnyOrderWithOrderCopy } from './util';
class PreviousProceedingsNavigationController {
  private selectedOrderTypes: C100OrderTypes[] | [] = [];
  private orders: C100OrderInterface[] | [] = [];
  private C100orderType = '';
  private C100orderId: number | undefined = undefined;

  private getC100OrderId(): string | undefined {
    return this.orders.find(order => order.orderCopy === YesNoEmpty.YES)?.id;
  }
  private getc100NextOrderId(): string | undefined {
    return this.orders.find(order => Number(order.id) > Number(this.C100orderId) && order.orderCopy === YesNoEmpty.YES)
      ?.id;
  }
  private getC100CurrentOrderTypeIndex(): number {
    return this.selectedOrderTypes.findIndex(_orderType => _orderType === this.C100orderType);
  }
  private getNextOrderType(): C100OrderTypes | '' {
    const currentSelectedOrderIndex = this.getC100CurrentOrderTypeIndex();
    return this.selectedOrderTypes[currentSelectedOrderIndex + 1] ?? '';
  }

  private getOrdersByType(caseData): C100OrderInterface[] | [] {
    return caseData?.op_otherProceedings?.order[C100OrderTypeKeyMapper[this.C100orderType]] ?? [];
  }

  public getNextUrl(
    currentPage: PageLink,
    caseData: Partial<Case>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    req?: AppRequest
  ): PageLink {
    const params = req?.params;
    this.selectedOrderTypes = caseData?.op_courtProceedingsOrders ?? [];
    this.C100orderType = params?.orderType as C100OrderTypes;
    this.C100orderId = Number(params?.orderId);
    this.orders = this.getOrdersByType(caseData);
    let nextUrl;

    switch (currentPage) {
      case C100_OTHER_PROCEEDINGS_CURRENT_PREVIOUS: {
        const nextUrl1 =
          caseData.sq_writtenAgreement === YesOrNo.NO && caseData.miam_otherProceedings === YesOrNo.YES
            ? C100_TYPE_ORDER_SELECT_COURT_ORDER
            : (applyParms(C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE, { root: RootContext.C100_REBUILD }) as PageLink);
        const cyaRedirect = isC100ApplicationValid(caseData as CaseWithId, req!) ? C100_CHECK_YOUR_ANSWER : nextUrl1;
        nextUrl =
          caseData.op_childrenInvolvedCourtCase === YesOrNo.YES || caseData.op_courtOrderProtection === YesOrNo.YES
            ? C100_OTHER_PROCEEDINGS_DETAILS
            : cyaRedirect;
        break;
      }
      case C100_OTHER_PROCEEDINGS_DETAILS:
        nextUrl = applyParms(C100_OTHER_PROCEEDINGS_ORDER_DETAILS, { orderType: this.selectedOrderTypes[0] });
        break;
      case C100_OTHER_PROCEEDINGS_ORDER_DETAILS: {
        nextUrl = this.getNextUrlOtherProceedingDetails(caseData, req);
        break;
      }
      case C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD: {
        nextUrl = this.getNextUrlOtherProceedingDocument();
        break;
      }
      case C100_OTHER_PROCEEDINGS_DOCUMENT_SUMMARY: {
        const nonCyaRedirectUrl =
          caseData.sq_writtenAgreement === YesOrNo.NO && caseData.miam_otherProceedings === YesOrNo.YES
            ? C100_TYPE_ORDER_SELECT_COURT_ORDER
            : (applyParms(C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE, { root: RootContext.C100_REBUILD }) as PageLink);
        nextUrl = isC100ApplicationValid(caseData as CaseWithId, req!) ? C100_CHECK_YOUR_ANSWER : nonCyaRedirectUrl;
        break;
      }
      default:
        nextUrl = currentPage;
        break;
    }

    return nextUrl;
  }

  private getNextUrlOtherProceedingDetails(caseData, req) {
    let url;
    const orderId = this.getC100OrderId();
    if (orderId) {
      // if any order has order copy to be uploaded
      url = applyParms(C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, { orderType: this.C100orderType, orderId });
    } else {
      // none of the orders in the current order type have order copy to be uploaded
      const nextOrderType = this.getNextOrderType();
      if (nextOrderType) {
        url = applyParms(C100_OTHER_PROCEEDINGS_ORDER_DETAILS, { orderType: nextOrderType });
      } else if (isAnyOrderWithOrderCopy(caseData?.op_otherProceedings?.order)) {
        // check at last if there were any previous order types having at least an order with order copy
        url = C100_OTHER_PROCEEDINGS_DOCUMENT_SUMMARY;
      } else {
        const nextUrl =
          caseData.sq_writtenAgreement === YesOrNo.NO && caseData.miam_otherProceedings === YesOrNo.YES
            ? C100_TYPE_ORDER_SELECT_COURT_ORDER
            : (applyParms(C1A_SAFETY_CONCERNS_CONCERN_GUIDANCE, { root: RootContext.C100_REBUILD }) as PageLink);
        url = isC100ApplicationValid(caseData as CaseWithId, req) ? C100_CHECK_YOUR_ANSWER : nextUrl;
      }
    }
    return url;
  }

  private getNextUrlOtherProceedingDocument() {
    const nextOrderId = this.getc100NextOrderId();
    let url;
    if (nextOrderId) {
      // if there are any more orders with order copy
      url = applyParms(C100_OTHER_PROCEEDINGS_DOCUMENT_UPLOAD, {
        orderType: this.C100orderType,
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

export default new PreviousProceedingsNavigationController();
