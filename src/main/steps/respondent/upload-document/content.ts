import { TranslationFn } from '../../../app/controller/GetController';
import { typeofcaseuser } from '../../common/typeofcaseuser';

import { document_list_en } from './section-titles';
import { documents_list_items_cy, documents_list_items_en } from './upload-document-list-items';
import { generateUploadDocumentList } from './upload-documents-list';

const en = () => ({
  section: 'Upload documents',
  title: 'Select the type of document',
  pagetitle: '',
  line1: 'If the court has asked you to submit further evidence, you can upload documents here.',
  sectionTitles: document_list_en,
  documentsListItems: documents_list_items_en,
});

const cy = () => ({
  section: 'Upload documents',
  title: 'Select the type of document',
  pagetitle: '',
  line1: 'If the court has asked you to submit further evidence, you can upload documents here.',
  sectionTitles: document_list_en,
  documentsListItems: documents_list_items_cy,
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  translations.pagetitle = typeofcaseuser(content.language, content.userCase?.caseTypeOfApplication, false);
  return {
    ...translations,
    sections: generateUploadDocumentList(translations.sectionTitles, translations.documentsListItems),
  };
};
