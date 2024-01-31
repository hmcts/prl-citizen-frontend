import { HearingOrders, PartyType } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { applyParms } from '../../../../steps/common/url-parser';
import {
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_GUIDANCE_PAGE,
  RESPONDENT_ORDERS_FROM_THE_COURT,
} from '../../../../steps/urls';
import { generateContent as yourhearingshearingscontent } from '../../../common/yourhearings/hearings/content';

export { form } from '../../../common/yourhearings/hearings/content';
export const generateContent: TranslationFn = content => {
  const hearingsContent = yourhearingshearingscontent(content);
  hearingsContent.linkforsupport = applyParms(REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_GUIDANCE_PAGE, {
    partyType: PartyType.RESPONDENT,
  });
  const request = content.additionalData?.req;
  const hearingOrders: HearingOrders[] = [];
  for (const doc of request.session.userCase?.orderCollection || []) {
    if (doc.value.selectedHearingType) {
      const uid = doc.value.orderDocument.document_url.substring(
        doc.value.orderDocument.document_url.lastIndexOf('/') + 1
      );
      hearingOrders?.push({
        href: `${RESPONDENT_ORDERS_FROM_THE_COURT}/${uid}`,
        createdDate: doc.value.otherDetails.orderCreatedDate,
        fileName: doc.value.orderDocument.document_filename,
        id: Number(doc.value.selectedHearingType.split(' ')[0]),
      });
    }
  }

  return {
    ...hearingsContent,
    hearingOrders,
  };
};
