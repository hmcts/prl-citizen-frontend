import { documents_list_items_cy, documents_list_items_en } from "../../../../applicant/upload-document/upload-document-list-items";
import { CITIZEN_DOWNLOAD_UPLOADED_DOCS } from '../../../../../../main/steps/urls';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
const en = () => {
  return {
    section: 'All documents',
    title: 'Tenancy and mortgage',
    caseNumber: 'Case number',
    continue: 'Go back',
  };
};

const cy: typeof en = () => {
  return {
    section: 'Pob dogfen',
    title: 'Tenancy and mortgage (welsh)',
    caseNumber: 'Rhif yr achos',
    continue: 'Go back (welsh)',
  };
};

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: userCase => {
    return {
      caseNumber: {
        label: l => l.caseNumber + '' + userCase.caseCode,
        type: 'hidden',
        labelHidden: true,
      },
    };
  },
  submit: {
    text: l => l.continue,
    classes: 'govuk-button--secondary',
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const orders: object[] = [];
  const docs = content.userCase?.citizenUploadedDocumentList?.filter(doc => {
    if (
      doc.value.uploadedBy === content.userIdamId &&
      (doc.value.documentType === documents_list_items_en.tenancy_mortgage_agreements ||
        doc.value.documentType === documents_list_items_cy.tenancy_mortgage_agreements)
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
