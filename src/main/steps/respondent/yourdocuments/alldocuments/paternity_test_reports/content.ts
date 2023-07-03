import { CITIZEN_DOWNLOAD_UPLOADED_DOCS } from '../../../../../../main/steps/urls';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { applicant_tasklist_items_all_docs_en } from '../../../../applicant/yourdocuments/alldocuments/alldocuments/tasklist-items-all-documents';
const en = () => {
  return {
    section: 'All documents',
    title: 'Paternity test reports',
    caseNumber: 'Case number',
    continue: 'Go back',
  };
};

const cy: typeof en = () => {
  return {
    section: 'Pob dogfen',
    title: 'Adroddiadau prawf tadolaeth',
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
  const docs = content.userCase?.citizenUploadedDocumentList?.filter(doc => {
    if (
      doc.value.uploadedBy === content.userIdamId &&
      doc.value.documentType === applicant_tasklist_items_all_docs_en.paternity_test_reports
    ) {
      return doc;
    }
  });
  if (docs) {
    for (const doc of docs) {
      const uid = doc.value.citizenDocument.document_url.substring(
        doc.value.citizenDocument.document_url.lastIndexOf('/') + 1
      );
      orders.push({
        href: `${CITIZEN_DOWNLOAD_UPLOADED_DOCS}/${uid}`,
        createdDate: doc.value.documentDetails.documentUploadedDate,
        fileName: doc.value.citizenDocument.document_filename,
      });
    }
  }

  return {
    ...translations,
    orders,
  };
};
