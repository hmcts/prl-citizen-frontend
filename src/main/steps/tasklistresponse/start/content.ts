import { SectionStatus } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';

import { respondent_en } from './section-titles';
import { generateRespondentTaskList } from './tasklist';
import { respondent_tasklist_items_en } from './tasklist-items';

const en = () => ({
  title: 'Respond to the application',
  statuses: {
    [SectionStatus.COMPLETED]: 'Completed',
    [SectionStatus.IN_PROGRESS]: 'In Progress',
    [SectionStatus.TO_DO]: 'To Do',
    [SectionStatus.READY_TO_VIEW]: 'Ready to view',
    [SectionStatus.NOT_AVAILABLE_YET]: 'Not available yet',
  },
  sectionTitles: respondent_en,
  taskListItems: respondent_tasklist_items_en,
});

const cy = () => ({
  title: 'Gwneud cais i fabwysiadu plentyn a leolwyd dan eich gofal',
  statuses: {
    [SectionStatus.COMPLETED]: 'Wedi cwblhau',
    [SectionStatus.IN_PROGRESS]: 'Yn mynd rhagddo',
    [SectionStatus.TO_DO]: 'Heb Ddechrau',
    [SectionStatus.READY_TO_VIEW]: 'Ready to view (in Welsh)',
    [SectionStatus.NOT_AVAILABLE_YET]: 'Not available yet  (in Welsh)',
  },
  sectionTitles: respondent_en,
  taskListItems: respondent_tasklist_items_en,
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    sections: generateRespondentTaskList(
      translations.sectionTitles,
      translations.taskListItems,
      content.userCase,
      content.userIdamId
    ),
  };
};
