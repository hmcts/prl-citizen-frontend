import { isNull } from 'lodash';

import { CaseDate, CaseWithId } from '../../../app/case/case';
import {
  CurrentOrPreviousProceedings,
  Document,
  OrderDocumentInfo,
  OtherProceedingDetails,
  PartyDetails,
  ProceedingDetailsData,
  Proceedings,
  ProceedingsOrderDataInterface,
  ProceedingsOrderInterface,
  ProceedingsOrderTypeInterface,
  ProceedingsOrderTypes,
} from '../../../app/case/definition';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const prepareProceedingDetailsRequest = (userCase: CaseWithId): CurrentOrPreviousProceedings => {
  const currentOrPreviousProceedings: CurrentOrPreviousProceedings = {};
  const proceedingDetails: ProceedingDetailsData[] = [];
  const { proceedingsStart, proceedingsStartOrder, courtProceedingsOrders, otherProceedings } = userCase;

  if (courtProceedingsOrders) {
    courtProceedingsOrders.forEach(order => {
      if (
        otherProceedings?.['order']!.hasOwnProperty(`${order}s`) ||
        otherProceedings?.['order']!.hasOwnProperty('contactOrdersForDivorce') ||
        otherProceedings?.['order']!.hasOwnProperty('contactOrdersForAdoption')
      ) {
        const proceedingDetailsList: ProceedingsOrderDataInterface[] = [];
        let orderDetails;
        if (order === 'contactOrderForDivorce') {
          orderDetails = otherProceedings?.['order']!['contactOrdersForDivorce'];
        } else if (order === 'contactOrderForAdoption') {
          orderDetails = otherProceedings?.['order']!['contactOrdersForAdoption'];
        } else {
          orderDetails = otherProceedings?.['order']![`${order}s`];
        }
        let otherDetailsInfo: OtherProceedingDetails;
        let proceedingDetailsInfo: ProceedingsOrderDataInterface;
        orderDetails.forEach(nestedOrder => {
          const orderDocumentDetails: Document = {
            document_url: nestedOrder?.orderDocument?.url,
            document_filename: nestedOrder?.orderDocument?.filename,
            document_binary_url: nestedOrder?.orderDocument?.binaryUrl,
          };
          if (nestedOrder.orderDocument) {
            otherDetailsInfo = {
              orderDetail: nestedOrder?.orderDetail,
              caseNo: nestedOrder?.caseNo,
              currentOrder:
                nestedOrder?.currentOrder === 'Yes' || nestedOrder?.currentOrder === 'No'
                  ? nestedOrder?.currentOrder
                  : null,
              orderCopy:
                nestedOrder?.orderCopy === 'Yes' || nestedOrder?.orderCopy === 'No' ? nestedOrder?.orderCopy : null,
              orderDate: getLocalDate(nestedOrder?.orderDate),
              orderEndDate: getLocalDate(nestedOrder?.orderEndDate),
              orderDocument: orderDocumentDetails,
            };
          } else {
            let val, val2;
            if (nestedOrder?.currentOrder === '') {
              val = null;
            } else {
              val = nestedOrder?.currentOrder;
            }
            if (nestedOrder?.orderCopy === '') {
              val2 = null;
            } else {
              val2 = nestedOrder?.orderCopy;
            }
            otherDetailsInfo = {
              orderDetail: nestedOrder?.orderDetail,
              caseNo: nestedOrder?.caseNo,
              currentOrder: val,
              orderCopy: val2,
              orderDate: getLocalDate(nestedOrder?.orderDate),
              orderEndDate: getLocalDate(nestedOrder?.orderEndDate),
            };
          }
          proceedingDetailsInfo = {
            id: '',
            value: otherDetailsInfo,
          };
          proceedingDetailsList.push(proceedingDetailsInfo);
        });
        const proceedings: Proceedings = {
          orderType: `${order}`,
          proceedingDetails: proceedingDetailsList,
        };
        const proceedingData: ProceedingDetailsData = {
          id: '',
          value: proceedings,
        };
        proceedingDetails.push(proceedingData);
      }
    });
  }
  Object.assign(currentOrPreviousProceedings, {
    proceedingsList: proceedingDetails,
    haveChildrenBeenInvolvedInCourtCase: proceedingsStart,
    courtOrderMadeForProtection: proceedingsStartOrder,
  });
  return currentOrPreviousProceedings;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const mapProceedingDetails = (partyDetails: PartyDetails): Partial<CaseWithId> => {
  const { haveChildrenBeenInvolvedInCourtCase, courtOrderMadeForProtection, proceedingsList } =
    partyDetails.response.currentOrPreviousProceedings!;
  const courtProceedingsOrders: ProceedingsOrderTypes[] = [];
  const proceedingOrderTypeInterface: ProceedingsOrderTypeInterface = {};
  let courtProceedingsOrders1;
  let otherProceedings1;
  if (partyDetails.response.currentOrPreviousProceedings) {
    proceedingsList?.forEach(proceedings => {
      const proceedingOrderInterfaceList: ProceedingsOrderInterface[] = [];
      const orderType = proceedings.value.orderType as ProceedingsOrderTypes;
      courtProceedingsOrders.push(orderType);
      courtProceedingsOrders1 = courtProceedingsOrders;
      proceedings.value.proceedingDetails?.forEach((proceeding, index) => {
        let val, val2;
        if (isNull(proceeding.value?.currentOrder)) {
          val = '';
        } else {
          val = proceeding.value?.currentOrder;
        }
        if (isNull(proceeding.value?.orderCopy)) {
          val2 = '';
        } else {
          val2 = proceeding.value?.orderCopy;
        }
        const proceedingOrderInterface: ProceedingsOrderInterface = {
          id: getNextId(index),
          caseNo: proceeding.value?.caseNo,
          currentOrder: val,
          orderCopy: val2,
          orderDate: getDisplayDate(proceeding.value?.orderDate),
          orderEndDate: getDisplayDate(proceeding.value?.orderEndDate),
          orderDetail: proceeding.value?.orderDetail,
        };
        if (proceeding.value?.orderDocument) {
          proceedingOrderInterface.orderDocument = getDocumentInfo(proceeding.value?.orderDocument);
        }
        proceedingOrderInterfaceList.push(proceedingOrderInterface);
      });

      proceedingOrderTypeInterface[`${orderType}s`] = proceedingOrderInterfaceList;
      if (proceedings.value.orderType === 'contactOrderForDivorce') {
        proceedingOrderTypeInterface['contactOrdersForDivorce'] = proceedingOrderInterfaceList;
      }
      if (proceedings.value.orderType === 'contactOrderForAdoption') {
        proceedingOrderTypeInterface['contactOrdersForAdoption'] = proceedingOrderInterfaceList;
      }
      otherProceedings1 = {
        order: proceedingOrderTypeInterface,
      };
    });
  }
  const content = {
    proceedingsStart: haveChildrenBeenInvolvedInCourtCase,
    proceedingsStartOrder: courtOrderMadeForProtection,
    courtProceedingsOrders: courtProceedingsOrders1,
    otherProceedings: otherProceedings1,
  };

  return content;
};

export function getLocalDate(orderDate: string): Date {
  if (orderDate['year'] === '' && orderDate['month'] === '' && orderDate['day'] === '') {
    return new Date(orderDate[''], orderDate[''], orderDate['']);
  } else if (orderDate) {
    return new Date(orderDate['year'], orderDate['month'] - 1, orderDate['day']);
  } else {
    return new Date(orderDate['year'], orderDate['month'] - 1, orderDate['day']);
  }
}

export function getDisplayDate(orderDate: Date | undefined): CaseDate {
  let formated_Date = {
    year: '',
    month: '',
    day: '',
  };
  if (orderDate) {
    const dateString = orderDate.toLocaleString('default', { month: 'long' });
    formated_Date = {
      year: dateString.split('-')[0],
      month: dateString.split('-')[1],
      day: dateString.split('-')[2],
    };
  }
  return formated_Date;
}

export function getDocumentInfo(
  orderDocument: Document
): import('../../../app/case/definition').OrderDocumentInfo | undefined {
  const orderDocumentInfo: OrderDocumentInfo = {
    id: orderDocument.document_url.substring(orderDocument.document_url.lastIndexOf('/') + 1),
    binaryUrl: orderDocument?.document_binary_url,
    filename: orderDocument?.document_filename,
    url: orderDocument?.document_url,
  };
  return orderDocumentInfo;
}
export function getNextId(id: number): string {
  id = id + 1;
  return id.toString();
}
