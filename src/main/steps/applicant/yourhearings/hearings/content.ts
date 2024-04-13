import { CaseType, HearingOrders, PartyType } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { applyParms } from '../../../../steps/common/url-parser';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';
import { APPLICANT_ORDERS_FROM_THE_COURT, PARTY_TASKLIST, REASONABLE_ADJUSTMENTS_INTRO } from '../../../../steps/urls';
import { generateContent as yourhearingshearingscontent } from '../../../common/yourhearings/hearings/content';

export { form } from '../../../common/yourhearings/hearings/content';
export const generateContent: TranslationFn = content => {
  const hearingsContent = yourhearingshearingscontent(content);
  const request = content.additionalData?.req;
  const caseData = request.session.userCase;

  hearingsContent.linkforsupport = applyParms(REASONABLE_ADJUSTMENTS_INTRO, {
    partyType: PartyType.APPLICANT,
  });
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
    breadcrumb:
      request.originalUrl.includes(PartyType.APPLICANT) && caseData.caseTypeOfApplication === CaseType.C100
        ? {
            id: 'caseOverView',
            href: applyParms(PARTY_TASKLIST, { partyType: getCasePartyType(caseData, request.session.user.id) }),
          }
        : null,
  };
};
