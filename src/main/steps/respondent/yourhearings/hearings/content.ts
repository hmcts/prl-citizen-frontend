import { TranslationFn } from '../../../../app/controller/GetController';
import { CA_DA_ATTENDING_THE_COURT, RESPONDENT_ORDERS_FROM_THE_COURT } from '../../../../steps/urls';
import { generateContent as yourhearingshearingscontent } from '../../../common/yourhearings/hearings/content';

export { form } from '../../../common/yourhearings/hearings/content';
export const generateContent: TranslationFn = content => {
  const hearingsContent = yourhearingshearingscontent(content);
  hearingsContent.linkforsupport = CA_DA_ATTENDING_THE_COURT;
  const request = content.additionalData?.req;
  request.session.userCase.hearingOrders = [];
  for (const doc of request.session.userCase?.orderCollection || []) {
    if (doc.value.selectedHearingType) {
      const uid = doc.value.orderDocument.document_url.substring(
        doc.value.orderDocument.document_url.lastIndexOf('/') + 1
      );
      request.session.userCase.hearingOrders?.push({
        href: `${RESPONDENT_ORDERS_FROM_THE_COURT}/${uid}`,
        createdDate: doc.value.otherDetails.orderCreatedDate,
        fileName: doc.value.orderDocument.document_filename,
        id: Number(doc.value.selectedHearingType.split(' ')[0]),
      });
    }
  }

  return {
    ...hearingsContent,
  };
};
