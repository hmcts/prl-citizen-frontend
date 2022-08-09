import { TranslationFn } from '../../../../../app/controller/GetController';

import { respondent_all_docs_en } from './section-titles-all-documents';
import { respondent_tasklist_items_all_docs_en } from './tasklist-items-all-documents';
import { generateRespondentTaskListAllDocuments } from './tasklistalldocuments';
//import { FormContent, FormFieldsFn } from '../../../../../app/form/Form';

const en = () => {
  return {
    title: 'All documents',
    threeHint: 'This is a 8 character code',
    summaryText: 'Contacts for help',
    caseNumber: 'Case number',
    continue: 'Go back',
    sectionTitles: respondent_all_docs_en,
    taskListItems: respondent_tasklist_items_all_docs_en,
  };
};

const cy: typeof en = () => {
  return {
    title: 'All documents',
    threeHint: 'This is a 8 character code',
    summaryText: 'Contacts for help',
    caseNumber: 'Case number',
    continue: 'Go back',
    sectionTitles: respondent_all_docs_en,
    taskListItems: respondent_tasklist_items_all_docs_en,
  };
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    sections: generateRespondentTaskListAllDocuments(
      translations.sectionTitles,
      translations.taskListItems,
      content.userCase
    ),
  };
};
