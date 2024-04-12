import { CaseType, HearingOrders } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { applyParms } from '../../../../steps/common/url-parser';
import {
  APPLICANT_ATTENDING_THE_COURT,
  APPLICANT_ORDERS_FROM_THE_COURT,
  APPLICANT_TASKLIST_HEARING_NEEDS,
  FETCH_CASE_DETAILS,
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
  const hearingOrders: HearingOrders[] = [];
  for (const doc of request.session.userCase?.orderCollection || []) {
    if (doc.value.selectedHearingType) {
      const uid = doc.value.orderDocument.document_url.substring(
        doc.value.orderDocument.document_url.lastIndexOf('/') + 1
      );
      hearingOrders?.push({
        href: `${APPLICANT_ORDERS_FROM_THE_COURT}/${uid}`,
        createdDate: doc.value.otherDetails.orderCreatedDate,
        fileName: doc.value.orderDocument.document_filename,
        id: Number(doc.value.selectedHearingType.split(' ')[0]),
      });
    }
  }

  return {
    ...hearingsContent,
    hearingOrders,
    breadcrumbs: [
      {
        id: 'caseView',
        href: applyParms(`${FETCH_CASE_DETAILS}`, { caseId: caseData?.id }),
      },
    ],
  };
};
