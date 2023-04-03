import { CaseType, PartyType } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { applyParms } from '../../../steps/common/url-parser';
import * as URL from '../../urls';

import { document_list_en } from './section-titles';
import { documents_list_items_cy, documents_list_items_en } from './upload-document-list-items';
import { generateUploadDocumentList } from './upload-documents-list';

const en = () => ({
  section: 'Upload documents',
  title: 'Select the type of document',
  line1: 'If the court has asked you to submit further evidence, you can upload documents here.',
  sectionTitles: document_list_en,
  documentsListItems: documents_list_items_en,
});

const cy = () => ({
  section: 'Llwytho dogfennau',
  title: 'Dewiswch y math o ddogfen',
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
  const request = content.additionalData?.req;
  const caseData = request.session?.userCase;

  return {
    ...translations,
    breadcrumb:
      request.originalUrl.includes(PartyType.APPLICANT) && caseData?.caseTypeOfApplication === CaseType.C100
        ? {
            id: 'caseView',
            href: applyParms(`${URL.FETCH_CASE_DETAILS}`, { caseId: caseData.id }),
          }
        : null,
    sections: generateUploadDocumentList(
      translations.sectionTitles,
      translations.documentsListItems,
      URL.APPLICANT_UPLOAD_DOCUMENT_LIST_START_URL
    ),
  };
};
