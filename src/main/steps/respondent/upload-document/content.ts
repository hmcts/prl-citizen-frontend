import { TranslationFn } from '../../../app/controller/GetController';

import { document_list_cy, document_list_en } from './section-titles';
import { documents_list_items_cy, documents_list_items_en } from './upload-document-list-items';
import { generateUploadDocumentList } from './upload-documents-list';

const en = () => ({
  section: 'Upload documents',
  caseNumber: 'Case Number #',
  title: 'Select the type of document',
  line1: 'If the court has asked you to submit further evidence, you can upload documents here.',
  sectionTitles: document_list_en,
  documentsListItems: documents_list_items_en,
});

const cy = () => ({
  section: 'Llwytho dogfennau',
  caseNumber: 'Rhif yr achos #',
  title: 'Dewiswch y math o ddogfen',
  line1: 'If the court has asked you to submit further evidence, you can upload documents here.',
  sectionTitles: document_list_cy,
  documentsListItems: documents_list_items_cy,
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    sections: generateUploadDocumentList(translations.sectionTitles, translations.documentsListItems),
  };
};
