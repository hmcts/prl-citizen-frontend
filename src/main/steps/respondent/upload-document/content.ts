import { Respondent } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';

import { document_list_cy, document_list_en } from './section-titles';
import { documents_list_items_cy, documents_list_items_en } from './upload-document-list-items';
import { generateUploadDocumentList } from './upload-documents-list';

const en = () => ({
  section: 'Upload documents',
  caseNumber: 'Case Number ',
  title: 'Select the type of document',
  line1: 'If the court has asked you to submit further evidence, you can upload documents here.',
  userName: '',
  sectionTitles: document_list_en,
  documentsListItems: documents_list_items_en,
});

const cy = () => ({
  section: 'Llwytho dogfennau',
  caseNumber: 'Rhif yr achos ',
  title: 'Dewiswch y math o ddogfen',
  line1: 'Os yw’r llys wedi gofyn i chi gyflwyno tystiolaeth bellach, gallwch lwytho dogfennau yma.',
  userName: '',
  sectionTitles: document_list_cy,
  documentsListItems: documents_list_items_cy,
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const request = content.additionalData?.req;
  if (request && request.session.userCase.caseTypeOfApplication === 'FL401') {
    translations.userName = request.session.userCase.respondentName;
  } else if (request && request.session.userCase.caseTypeOfApplication === 'C100') {
    request.session?.userCase.respondents?.forEach((respondent: Respondent) => {
      if (respondent?.value?.user?.idamId === request.session?.user.id) {
        translations.userName = `${respondent.value.firstName}  ${respondent.value.lastName}`;
      }
    });
  }
  return {
    ...translations,
    sections: generateUploadDocumentList(translations.sectionTitles, translations.documentsListItems),
  };
};
