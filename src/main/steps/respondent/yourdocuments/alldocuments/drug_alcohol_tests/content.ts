import { CITIZEN_DOWNLOAD_UPLOADED_DOCS } from '../../../../../../main/steps/urls';
import { TranslationFn } from '../../../../../app/controller/GetController';
import {
  documents_list_items_cy,
  documents_list_items_en,
} from '../../../../../steps/respondent/upload-document/upload-document-list-items';

const en = () => {
  return {
    section: 'All documents',
    title: 'Drug and alcohol tests (toxicology)',
    caseNumber: 'Case number',
    continue: 'Go back',
  };
};

const cy: typeof en = () => {
  return {
    section: 'Pob dogfen',
    title: 'Drug and alcohol tests (toxicology) (welsh)',
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
  const docs = content.userCase?.citizenUploadedDocumentList?.filter(doc => {
    if (
      doc.value.uploadedBy === content.userIdamId &&
      (doc.value.documentType === documents_list_items_en.drug_and_alcohol_tests ||
        doc.value.documentType === documents_list_items_cy.drug_and_alcohol_tests)
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
