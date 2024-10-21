import { AWPApplicationReason, AWPApplicationType, HearingOrders, PartyType } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { transformFileName } from '../../../../steps/common/documents/download/utils';
import { applyParms } from '../../../../steps/common/url-parser';
import {
  APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE,
  DOWNLOAD_DOCUMENT,
  FETCH_CASE_DETAILS,
  REASONABLE_ADJUSTMENTS_INTRO,
} from '../../../../steps/urls';
import { generateContent as yourhearingshearingscontent } from '../../../common/yourhearings/hearings/content';

export { form } from '../../../common/yourhearings/hearings/content';
export const generateContent: TranslationFn = content => {
  const hearingsContent = yourhearingshearingscontent(content);
  const request = content.additionalData?.req;
  const caseData = request.session.userCase;
  const hearingOrders: HearingOrders[] = [];

  hearingsContent.linkforsupport = applyParms(REASONABLE_ADJUSTMENTS_INTRO, {
    partyType: PartyType.RESPONDENT,
  });
  hearingsContent.linkfordelayorcancel = applyParms(APPLICATION_WITHIN_PROCEEDINGS_GUIDANCE, {
    partyType: PartyType.RESPONDENT,
    applicationType: AWPApplicationType.C2,
    applicationReason: AWPApplicationReason.DELAY_CANCEL_HEARING_DATE,
  });

  //** validate **
  for (const doc of request.session.userCase?.orderCollection || []) {
    if (doc.value.selectedHearingType) {
      hearingOrders?.push({
        href: applyParms(DOWNLOAD_DOCUMENT, {
          partyType: PartyType.RESPONDENT,
          documentId: doc.value.orderDocument.document_url.substring(
            doc.value.orderDocument.document_url.lastIndexOf('/') + 1
          ),
          documentName: transformFileName(doc.value.orderDocument.document_filename),
        }),
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
