import { SectionStatus } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';

import { ca_da_respondent_en } from './section-titles';
import { generateCADARespondentTaskList } from './tasklist';
import { ca_da_respondent_tasklist_items_en } from './tasklist-items';

const en = () => ({
  title: 'CA DA Respondent',
  statuses: {
    [SectionStatus.COMPLETED]: 'Completed',
    [SectionStatus.IN_PROGRESS]: 'In Progress',
    [SectionStatus.TO_DO]: 'TO DO',
    [SectionStatus.DOWNLOAD]: 'DOWNLOAD',
  },
  sectionTitles: ca_da_respondent_en,
  taskListItems: ca_da_respondent_tasklist_items_en,
});

const cy = () => ({
  title: 'Gwneud cais i fabwysiadu plentyn a leolwyd dan eich gofal',
  statuses: {
    [SectionStatus.COMPLETED]: 'Wedi cwblhau',
    [SectionStatus.IN_PROGRESS]: 'Yn mynd rhagddo',
    [SectionStatus.TO_DO]: 'I WNEUD',
    [SectionStatus.DOWNLOAD]: 'LLWYTHO',
  },
  sectionTitles: ca_da_respondent_en,
  taskListItems: ca_da_respondent_tasklist_items_en,
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    sections: generateCADARespondentTaskList(translations.sectionTitles, translations.taskListItems, content.userCase),
  };
};
