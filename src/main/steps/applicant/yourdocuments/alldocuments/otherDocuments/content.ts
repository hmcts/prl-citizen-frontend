import { MANAGE_DOCUMENTS_DOWNLOAD } from '../../../../../../main/steps/urls';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';

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
    title: 'Other documents (welsh)',
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
  for (const doc of content.userCase?.otherDocuments || []) {
    if (doc.value?.documentTypeOther === 'otherReports') {
      const uid = doc.value.documentOther?.document_url.substring(
        doc.value.documentOther.document_url.lastIndexOf('/') + 1
      );
      const documentCreatedDate = doc.value['dateCreated'];
      orders.push({
        href: `${MANAGE_DOCUMENTS_DOWNLOAD}/${uid}`,
        createdDate: documentCreatedDate,
        fileName: doc.value.documentOther?.document_filename,
      });
    }
  }

  return {
    ...translations,
    orders,
  };
};
