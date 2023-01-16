import { TranslationFn } from '../../../../../app/controller/GetController';
import { typeofcaseuser } from '../../../../../steps/typeofcaseuserutil';

import { applicant_all_docs_en } from './section-titles-all-documents';
import { applicant_tasklist_items_all_docs_en } from './tasklist-items-all-documents';
import { generateApplicantTaskListAllDocuments } from './tasklistalldocuments';
//import { FormContent, FormFieldsFn } from '../../../../../app/form/Form';

const en = () => {
  return {
    title: 'All documents',
    threeHint: 'This is a 8 character code',
    summaryText: 'Contacts for help',
    caseNumber: 'Case number',
    pagetitle: '',
    continue: 'Go back',
    sectionTitles: applicant_all_docs_en,
    taskListItems: applicant_tasklist_items_all_docs_en,
  };
};

const cy: typeof en = () => {
  return {
    title: 'All documents',
    threeHint: 'This is a 8 character code',
    summaryText: 'Contacts for help',
    caseNumber: 'Case number',
    pagetitle: '',
    continue: 'Go back',
    sectionTitles: applicant_all_docs_en,
    taskListItems: applicant_tasklist_items_all_docs_en,
  };
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  translations.pagetitle = typeofcaseuser(content.language, content.userCase?.caseTypeOfApplication);
  return {
    ...translations,
    sections: generateApplicantTaskListAllDocuments(
      translations.sectionTitles,
      translations.taskListItems,
      content.userCase
    ),
  };
};
