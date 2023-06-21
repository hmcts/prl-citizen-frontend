import { RESPONDENT_C1A_RESPONSE_FROM_SOLICITOR } from '../../../../../steps/urls';
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
    const uid = doc.value.c1aDocument.citizenDocument.document_url.substring(
      doc.value.c1aDocument.citizenDocument.document_url.lastIndexOf('/') + 1
    );
    respondentDocs.push({
      href: `${RESPONDENT_C1A_RESPONSE_FROM_SOLICITOR}/${uid}`,
      createdDate: doc.value.c1aDocument.dateCreated,
      fileName: doc.value.c1aDocument.citizenDocument.document_filename,
    });
  }

  return {
    ...translations,
    respondentDocs,
  };
};
