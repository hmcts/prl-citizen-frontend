import { MANAGE_DOCUMENTS_DOWNLOAD } from '../../../../../../main/steps/urls';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';

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
  for (const doc of content.userCase?.otherDocuments || []) {
    if (doc.value?.documentTypeOther === 'otherReports') {
      const uid = doc.value.documentOther?.document_url.substring(
        doc.value.documentOther.document_url.lastIndexOf('/') + 1
      );
      orders.push({
        href: `${MANAGE_DOCUMENTS_DOWNLOAD}/${uid}`,
        createdDate: 'Not present',
        fileName: doc.value.documentOther?.document_filename,
      });
    }
  }

  return {
    ...translations,
    orders,
  };
};
