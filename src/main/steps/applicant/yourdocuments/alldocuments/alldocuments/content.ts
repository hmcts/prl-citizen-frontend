import { CaseType, PartyType } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { applyParms } from '../../../../../steps/common/url-parser';
import { FETCH_CASE_DETAILS } from '../../../../../steps/urls';

import { applicant_all_docs_cy, applicant_all_docs_en } from './section-titles-all-documents';
import {
  applicant_tasklist_items_all_docs_cy,
  applicant_tasklist_items_all_docs_en,
} from './tasklist-items-all-documents';
import { generateApplicantTaskListAllDocuments } from './tasklistalldocuments';

export * from './routeGuard';

console.info('** FOR SONAR **');

const en = () => {
  return {
    title: 'All documents',
    caseNumber: 'Case number',
    continue: 'Go back',
    sectionTitles: applicant_all_docs_en,
    taskListItems: applicant_tasklist_items_all_docs_en,
  };
};

const cy: typeof en = () => {
  return {
    title: 'Pob dogfen',
    caseNumber: 'Rhif yr achos',
    continue: 'Yn ôl',
    sectionTitles: applicant_all_docs_cy,
    taskListItems: applicant_tasklist_items_all_docs_cy,
  };
};

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
            href: applyParms(`${FETCH_CASE_DETAILS}`, { caseId: caseData.id }),
          }
        : null,
    sections: generateApplicantTaskListAllDocuments(
      translations.sectionTitles,
      translations.taskListItems,
      content.userCase
    ),
  };
};
