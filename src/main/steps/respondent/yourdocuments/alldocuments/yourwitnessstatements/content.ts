import { CITIZEN_DOWNLOAD_UPLOADED_DOCS } from '../../../../../../main/steps/urls';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { documents_list_items_en } from '../../../../../steps/respondent/upload-document/upload-document-list-items';

const en = () => {
  return {
    section: 'All documents',
    title: "'s witness statements",
    caseNumber: 'Case number',
    continue: 'Go back',
  };
};

const cy: typeof en = () => {
  return {
    section: 'Pob dogfen',
    title: "'s witness statements (welsh)",
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
      doc.value.partyName === content.name &&
      doc.value.documentType === documents_list_items_en.your_witness_statements
    ) {
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
