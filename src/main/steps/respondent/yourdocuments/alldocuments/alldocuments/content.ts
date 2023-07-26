import { TranslationFn } from '../../../../../app/controller/GetController';
import {
  applicant_tasklist_items_all_docs_cy,
  applicant_tasklist_items_all_docs_en as respondent_tasklist_items_all_docs_en,
} from '../../../../applicant/yourdocuments/alldocuments/alldocuments/tasklist-items-all-documents';

import { respondent_all_docs_cy, respondent_all_docs_en } from './section-titles-all-documents';
import { generateRespondentTaskListAllDocuments } from './tasklistalldocuments';
//import { FormContent, FormFieldsFn } from '../../../../../app/form/Form';

const en = () => {
  return {
    title: 'All documents',
    caseNumber: 'Case number',
    continue: 'Go back',
    sectionTitles: respondent_all_docs_en,
    taskListItems: respondent_tasklist_items_all_docs_en,
  };
};

const cy: typeof en = () => {
  return {
    title: 'Pob dogfen',
    threeHint: 'Mae hwn yn god 8 nod',
    summaryText: 'Cysylltiadau am gymorth',

    caseNumber: 'Rhif yr achos',
    continue: 'Yn ôl',
    sectionTitles: respondent_all_docs_cy,
    taskListItems: applicant_tasklist_items_all_docs_cy,
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
