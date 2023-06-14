import { CITIZEN_DOWNLOAD_UPLOADED_DOCS } from '../../../../../../main/steps/urls';
import { TranslationFn } from '../../../../../app/controller/GetController';

const en = () => {
  return {
    section: 'All documents',
    title: 'Applications made in these proceedings',
    caseNumber: 'Case number',
    continue: 'Go back',
  };
};

const cy: typeof en = () => {
  return {
    section: 'Pob dogfen',
    title: 'Applications made in these proceedings (welsh)',
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
  for (const doc of content.userCase?.existingProceedings || []) {
    const uid = doc.value?.uploadRelevantOrder?.document_url.substring(
      doc.value.uploadRelevantOrder.document_url.lastIndexOf('/') + 1
    );
    orders.push({
      href: `${CITIZEN_DOWNLOAD_UPLOADED_DOCS}/${uid}`,
      createdDate: 'No creation date available',
      fileName: doc.value?.uploadRelevantOrder?.document_filename,
    });
  }

  return {
    ...translations,
    orders,
  };
};
