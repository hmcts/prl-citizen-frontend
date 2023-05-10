import { CITIZEN_DOWNLOAD_UPLOADED_DOCS } from '../../../../../../main/steps/urls';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { applicant_tasklist_items_all_docs_en } from '../../../../applicant/yourdocuments/alldocuments/alldocuments/tasklist-items-all-documents';
const en = () => {
  return {
    section: 'All documents',
    title: 'Other documents',
    threeHint: 'This is a 8 character code',
    summaryText: 'Contacts for help',
    caseNumber: 'Case number',
    continue: 'Go back',
  };
};

const cy: typeof en = () => {
  return {
    section: 'All documents',
    title: 'Other documents',
    threeHint: 'This is a 8 character code',
    summaryText: 'Contacts for help',
    caseNumber: 'Case number',
    continue: 'Go back',
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
      doc.value.documentType === applicant_tasklist_items_all_docs_en.other_documents
    ) {
      return doc;
    }
  });
  if (docs) {
    for (const doc of docs!) {
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
