import { isNull } from 'lodash';

import { CaseDate, CaseWithId } from '../../../app/case/case';
import {
  CurrentOrPreviousProceedings,
  Document,
  OrderDocumentInfo,
  OtherProceedingDetails,
  ProceedingDetailsData,
  Proceedings,
  ProceedingsOrderDataInterface,
  ProceedingsOrderInterface,
  ProceedingsOrderTypeInterface,
  ProceedingsOrderTypes,
  Respondent,
} from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const setProceedingDetails = (UserCase, respondent: Respondent, req: AppRequest): Respondent => {
  const respondentDetails = respondent;
  const currentOrPreviousProceedings: CurrentOrPreviousProceedings = {};
  const proceedingDetails: ProceedingDetailsData[] = [];

  if (req.session.userCase.courtProceedingsOrders) {
    UserCase['courtProceedingsOrders'].forEach(order => {
      if (UserCase['otherProceedings']?.['order'].hasOwnProperty(`${order}s`)) {
        const proceedingDetailsList: ProceedingsOrderDataInterface[] = [];
        const orderDetails = UserCase['otherProceedings']?.['order'][`${order}s`];
        orderDetails.forEach(nestedOrder => {
          const orderDocumentDetails: Document = {
            document_url: nestedOrder?.orderDocument?.url,
            document_filename: nestedOrder?.orderDocument?.filename,
            document_binary_url: nestedOrder?.orderDocument?.binaryUrl,
          };
          if (nestedOrder.orderDocument) {
            let val, val2;
            if (nestedOrder?.currentOrder.match('')) {
              val = null;
            } else {
              val = nestedOrder?.currentOrder;
            }
            if (nestedOrder?.orderCopy.match('')) {
              val2 = null;
            } else {
              val2 = nestedOrder?.orderCopy;
            }
            const otherDetailsInfo: OtherProceedingDetails = {
              orderDetail: nestedOrder?.orderDetail,
              caseNo: nestedOrder?.caseNo,
              currentOrder: val,
              orderCopy: val2,
              orderDate: getLocalDate(nestedOrder?.orderDate),
              orderEndDate: getLocalDate(nestedOrder?.orderEndDate),
              orderDocument: orderDocumentDetails,
            };
            const proceedingDetailsInfo: ProceedingsOrderDataInterface = {
              id: '',
              value: otherDetailsInfo,
            };
            proceedingDetailsList.push(proceedingDetailsInfo);
          } else {
            let val, val2;
            if (nestedOrder?.currentOrder.match('')) {
              val = null;
            } else {
              val = nestedOrder?.currentOrder;
            }
            if (nestedOrder?.orderCopy.match('')) {
              val2 = null;
            } else {
              val2 = nestedOrder?.orderCopy;
            }
            const otherDetailsInfo: OtherProceedingDetails = {
              orderDetail: nestedOrder?.orderDetail,
              caseNo: nestedOrder?.caseNo,
              currentOrder: val,
              orderCopy: val2,
              orderDate: getLocalDate(nestedOrder?.orderDate),
              orderEndDate: getLocalDate(nestedOrder?.orderEndDate),
            };
            const proceedingDetailsInfo: ProceedingsOrderDataInterface = {
              id: '',
              value: otherDetailsInfo,
            };
            proceedingDetailsList.push(proceedingDetailsInfo);
          }
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
      currentOrPreviousProceedings.proceedingsList = proceedingDetails;
    });
  }
  currentOrPreviousProceedings.haveChildrenBeenInvolvedInCourtCase = req.session.userCase.proceedingsStart;
  currentOrPreviousProceedings.courtOrderMadeForProtection = req.session.userCase.proceedingsStartOrder;
  respondentDetails.value.response.currentOrPreviousProceedings = currentOrPreviousProceedings;

  return respondentDetails;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getProceedingDetails = (respondent: Respondent, req: AppRequest): Partial<CaseWithId> => {
  const respondentDetails = respondent;
  const currentProceedings = respondentDetails.value.response.currentOrPreviousProceedings;
  const courtProceedingsOrders: ProceedingsOrderTypes[] = [];
  const proceedingOrderTypeInterface: ProceedingsOrderTypeInterface = {};
  if (currentProceedings) {
    req.session.userCase.proceedingsStart = currentProceedings.haveChildrenBeenInvolvedInCourtCase;
    req.session.userCase.proceedingsStartOrder = currentProceedings.courtOrderMadeForProtection;
    const proceedingList = currentProceedings.proceedingsList;
    proceedingList?.forEach(proceedings => {
      const proceedingOrderInterfaceList: ProceedingsOrderInterface[] = [];
      const orderType = proceedings.value.orderType as ProceedingsOrderTypes;
      courtProceedingsOrders.push(orderType);
      req.session.userCase.courtProceedingsOrders = courtProceedingsOrders;
      const id = 0;
      proceedings.value.proceedingDetails?.forEach(proceeding => {
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
          id: getNextId(id),
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
      req.session.userCase.otherProceedings = {
        order: proceedingOrderTypeInterface,
      };
    });
  }
  return req.session.userCase;
};

function getLocalDate(orderDate: string): Date {
  if (orderDate['year'] === '' && orderDate['month'] === '' && orderDate['day'] === '') {
    const formated_Date = new Date(orderDate[''], orderDate[''], orderDate['']);
    return formated_Date;
  } else {
    const formated_Date = new Date(orderDate['year'], orderDate['month'] - 1, orderDate['day']);
    return formated_Date;
  }
}

function getDisplayDate(orderDate: Date | undefined): CaseDate {
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

function getDocumentInfo(
  orderDocument: Document
): import('../../../app/case/definition').OrderDocumentInfo | undefined {
  const orderDocumentInfo: OrderDocumentInfo = {
    id: ' ',
    binaryUrl: orderDocument?.document_binary_url,
    filename: orderDocument?.document_filename,
    url: orderDocument?.document_url,
  };
  return orderDocumentInfo;
}
function getNextId(id: number): string {
  id = id + 1;
  return id.toString();
}
