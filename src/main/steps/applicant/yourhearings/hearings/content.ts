import { CaseType, PartyType } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { applyParms } from '../../../../steps/common/url-parser';
import {
  APPLICANT_ATTENDING_THE_COURT,
  APPLICANT_ORDERS_FROM_THE_COURT,
  APPLICANT_TASKLIST_HEARING_NEEDS,
  APPLICANT_TASK_LIST_URL,
} from '../../../../steps/urls';
import { generateContent as yourhearingshearingscontent } from '../../../common/yourhearings/hearings/content';

export { form } from '../../../common/yourhearings/hearings/content';
export const generateContent: TranslationFn = content => {
  const hearingsContent = yourhearingshearingscontent(content);
  const request = content.additionalData?.req;
  const caseData = request.session.userCase;
  if (content.additionalData?.req.session.userCase.caseTypeOfApplication === CaseType.C100) {
    hearingsContent.linkforsupport = APPLICANT_TASKLIST_HEARING_NEEDS;
  } else {
    hearingsContent.linkforsupport = APPLICANT_ATTENDING_THE_COURT;
  }
  request.session.userCase.hearingOrders = [];
  switch (content.language) {
    case 'en':
      for (const doc of request.session.userCase?.orderCollection || []) {
        if (doc.value.selectedHearingType) {
          const uid = doc.value.orderDocument.document_url.substring(
            doc.value.orderDocument.document_url.lastIndexOf('/') + 1
          );
          request.session.userCase.hearingOrders?.push({
            href: `${APPLICANT_ORDERS_FROM_THE_COURT}/${uid}`,
            createdDate: doc.value.otherDetails.orderCreatedDate,
            fileName: doc.value.orderDocument.document_filename,
            id: Number(doc.value.selectedHearingType.split(' ')[0]),
          });
        }
      }
      break;
    case 'cy':
      for (const doc of request.session.userCase?.orderCollection || []) {
        if (doc.value.selectedHearingType && doc.value.orderDocumentWelsh) {
          const uid = doc.value.orderDocumentWelsh.document_url.substring(
            doc.value.orderDocumentWelsh.document_url.lastIndexOf('/') + 1
          );
          request.session.userCase.hearingOrders?.push({
            href: `${APPLICANT_ORDERS_FROM_THE_COURT}/${uid}`,
            createdDate: doc.value.otherDetails.orderCreatedDate,
            fileName: doc.value.orderDocumentWelsh.document_filename,
            id: Number(doc.value.selectedHearingType.split(' ')[0]),
          });
        }
      }
      break;
  }

  return {
    ...hearingsContent,
    breadcrumb:
      request.originalUrl.includes(PartyType.APPLICANT) && caseData.caseTypeOfApplication === CaseType.C100
        ? {
            id: 'caseView',
            href: applyParms(`${APPLICANT_TASK_LIST_URL}`, { caseId: caseData.id }),
          }
        : null,
  };
};
