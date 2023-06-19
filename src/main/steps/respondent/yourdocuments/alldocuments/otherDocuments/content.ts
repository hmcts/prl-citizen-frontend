import { CITIZEN_DOWNLOAD_UPLOADED_DOCS } from '../../../../../../main/steps/urls';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { applicant_tasklist_items_all_docs_en } from '../../../../../steps/applicant/yourdocuments/alldocuments/alldocuments/tasklist-items-all-documents';

const en = () => {
  return {
    section: 'All documents',
    title: 'Other documents',
    caseNumber: 'Case number',
    continue: 'Go back',
  };
};

const cy: typeof en = () => {
  return {
    section: 'Pob dogfen',
    title: 'Dogfennau eraill',
    caseNumber: 'Rhif yr achos',
    continue: 'Go back (welsh)',
  };
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const orders: object[] = [];
  for (const doc of content.userCase?.citizenUploadedDocumentList || []) {
    if (
      doc.value.uploadedBy === content.userIdamId &&
      doc.value.documentType === applicant_tasklist_items_all_docs_en.other_documents
    ) {
      const uid = doc.value.citizenDocument?.document_url.substring(
        doc.value.citizenDocument.document_url.lastIndexOf('/') + 1
      );
      orders.push({
        href: `${CITIZEN_DOWNLOAD_UPLOADED_DOCS}/${uid}`,
        createdDate: doc.value.documentDetails.documentUploadedDate,
        fileName: doc.value.citizenDocument?.document_filename,
      });
    }
  }

  return {
    ...translations,
    orders,
  };
};
