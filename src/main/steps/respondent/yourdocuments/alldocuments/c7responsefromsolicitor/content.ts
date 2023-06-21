import {RESPONDENT_C7_RESPONSE_FROM_SOLICITOR } from '../../../../urls';
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
  const respondentDocs: object[] = [];
  for (const doc of content.userCase?.respondentDocsList || []) {
    const uid = doc.value.c7Document.citizenDocument.document_url.substring(
      doc.value.c7Document.citizenDocument.document_url.lastIndexOf('/') + 1
    );
    respondentDocs.push({
      href: `${RESPONDENT_C7_RESPONSE_FROM_SOLICITOR}/${uid}`,
      createdDate: doc.value.c7Document.dateCreated,
      fileName: doc.value.c7Document.citizenDocument.document_filename,
    });
  }

  return {
    ...translations,
    orders:respondentDocs,
  };
};
