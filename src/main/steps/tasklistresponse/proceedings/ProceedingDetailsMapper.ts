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

import { ANYTYPE } from './dateformatter';

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
            const otherDetailsInfo: OtherProceedingDetails = {
              orderDetail: nestedOrder?.orderDetail,
              caseNo: nestedOrder?.caseNo,
              currentOrder: nestedOrder?.currentOrder,
              orderCopy: nestedOrder?.orderCopy,
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
            const otherDetailsInfo: OtherProceedingDetails = {
              orderDetail: nestedOrder?.orderDetail,
              caseNo: nestedOrder?.caseNo,
              currentOrder: nestedOrder?.currentOrder,
              orderCopy: nestedOrder?.orderCopy,
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
      currentOrPreviousProceedings.haveChildrenBeenInvolvedInCourtCase = req.session.userCase.proceedingsStart;
      currentOrPreviousProceedings.courtOrderMadeForProtection = req.session.userCase.proceedingsStartOrder;
      currentOrPreviousProceedings.proceedingsList = proceedingDetails;
    });
    respondentDetails.value.response.currentOrPreviousProceedings = currentOrPreviousProceedings;
  } else {
    respondentDetails.value.response.currentOrPreviousProceedings = currentOrPreviousProceedings;
  }

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
        const proceedingOrderInterface: ProceedingsOrderInterface = {
          id: getNextId(id),
          caseNo: proceeding.value?.caseNo,
          currentOrder: proceeding.value?.currentOrder,
          orderCopy: proceeding.value?.orderCopy,
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
  if (orderDate) {
    const formated_Date = new Date(orderDate['year'], orderDate['month'] - 1, orderDate['day']);
    return formated_Date;
  } else {
    const formattedDate = Object.values(orderDate)
      .toString()
      .split(',')
      .filter(item => item !== '')
      .toString()
      .split(',')
      .join('/') as ANYTYPE;
    return formattedDate;
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
