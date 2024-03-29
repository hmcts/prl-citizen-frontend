import { RESPONDENT_ORDERS_FROM_THE_COURT } from '../../../../../../main/steps/urls';
import { TranslationFn } from '../../../../../app/controller/GetController';

const en = () => {
  return {
    section: 'All documents',
    title: 'Orders from the court',
    caseNumber: 'Case number',
    continue: 'Go back',
  };
};

const cy: typeof en = () => {
  return {
    section: 'Pob dogfen',
    title: 'Gorchmynion gan y llys',
    caseNumber: 'Rhif yr achos',
    continue: 'Yn ôl',
  };
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const orders: object[] = [];
  for (const doc of content.userCase?.orderCollection || []) {
    const uid = doc.value.orderDocument.document_url.substring(
      doc.value.orderDocument.document_url.lastIndexOf('/') + 1
    );
    orders.push({
      href: `${RESPONDENT_ORDERS_FROM_THE_COURT}/${uid}`,
      createdDate: doc.value.otherDetails.orderCreatedDate,
      fileName: doc.value.orderDocument.document_filename,
    });
  }

  return {
    ...translations,
    orders,
  };
};
