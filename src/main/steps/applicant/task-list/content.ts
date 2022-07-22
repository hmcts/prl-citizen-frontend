import { SectionStatus } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';

import { applicant_en } from './section-titles';
import { generateApplicantTaskList } from './tasklist';
import { applicant_tasklist_items_en } from './tasklist-items';

const en = () => ({
  title: ' ',
  statuses: {
    [SectionStatus.COMPLETED]: 'Completed',
    [SectionStatus.IN_PROGRESS]: 'In Progress',
    [SectionStatus.TO_DO]: 'Not Started',
    [SectionStatus.NOT_AVAILABLE_YET]: 'Not available yet',
    [SectionStatus.READY_TO_VIEW]: 'Ready to view',
  },
  sectionTitles: applicant_en,
  taskListItems: applicant_tasklist_items_en,
});

const cy = () => ({
  title: ' ',
  statuses: {
    [SectionStatus.COMPLETED]: 'Wedi cwblhau',
    [SectionStatus.IN_PROGRESS]: 'Yn mynd rhagddo',
    [SectionStatus.TO_DO]: 'Heb Ddechrau',
    [SectionStatus.NOT_AVAILABLE_YET]: 'Not available yet',
    [SectionStatus.READY_TO_VIEW]: 'Ready to view (in Welsh)',
  },
  sectionTitles: applicant_en,
  taskListItems: applicant_tasklist_items_en,
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    sections: generateApplicantTaskList(translations.sectionTitles, translations.taskListItems, content.userCase),
  };
};
