import { CaseType, PartyType } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { applyParms } from '../../../steps/common/url-parser';
import * as URL from '../../urls';

import { document_list_cy, document_list_en } from './section-titles';
import { documents_list_items_cy, documents_list_items_en } from './upload-document-list-items';
import { generateUploadDocumentList } from './upload-documents-list';

const en = () => ({
  section: 'Upload documents',
  caseNumber: 'Case Number ',
  title: 'Select the type of document',
  userName: '',
  note: 'The court will tell you in a letter or email which documents or materials you need to submit.',
  sectionTitles: document_list_en,
  documentsListItems: documents_list_items_en,
});

const cy = () => ({
  section: 'Llwytho dogfennau',
  caseNumber: 'Rhif yr achos ',
  title: 'Dewiswch y math o ddogfen',
  note: 'The court will tell you in a letter or email which documents or materials you need to submit. - welsh',
  sectionTitles: document_list_cy,
  userName: '',
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
  if (caseData.caseTypeOfApplication === 'FL401') {
    translations.userName = caseData.applicantsFL401.partyLevelFlag.partyName;
  }

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
