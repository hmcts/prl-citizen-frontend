import { SectionStatus } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

import { respondent_cy, respondent_en } from './section-titles';
import { generateRespondentTaskList } from './tasklist';
import { respondent_tasklist_items_cy, respondent_tasklist_items_en } from './tasklist-items';

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
  respondToApplication: 'Review and submit',
  goBack: 'Go back',
  warning: 'Warning',
  yourResponse: 'Your response will be shared with the other people in this case.',
});

const cy = () => ({
  title: 'Gwneud cais i fabwysiadu plentyn a leolwyd dan eich gofal',
  statuses: {
    [SectionStatus.COMPLETED]: 'Wedi’i gwblhau',
    [SectionStatus.IN_PROGRESS]: 'Yn mynd rhagddo',
    [SectionStatus.TO_DO]: 'Heb Ddechrau',
    [SectionStatus.READY_TO_VIEW]: 'Yn barod i’w gweld',
    [SectionStatus.NOT_AVAILABLE_YET]: 'Ddim ar gael eto',
  },
  sectionTitles: respondent_cy,
  taskListItems: respondent_tasklist_items_cy,
  respondToApplication: 'Review and submit -welsh',
  goBack: 'Yn ôl',
  warning: 'Warning -welsh',
  yourResponse: 'Your response will be shared with the other people in this case. -welsh',
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
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
    form,
  };
};
