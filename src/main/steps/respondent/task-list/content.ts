import { Banner, SectionStatus } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import {APPLICANT_CA_MANAGE_ORDER_PDF, APPLICANT_DA_MANAGE_ORDER_PDF } from '../../../steps/urls';

import { respondent_cy, respondent_en } from './section-titles';
import { generateRespondentTaskList } from './tasklist';
import { respondent_tasklist_items_cy, respondent_tasklist_items_en } from './tasklist-items';

const en = () => ({
  title: '',
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
  title: '',
  statuses: {
    [SectionStatus.COMPLETED]: 'Wedi cwblhau',
    [SectionStatus.IN_PROGRESS]: 'Yn mynd rhagddo',
    [SectionStatus.TO_DO]: 'Heb Ddechrau',
    [SectionStatus.READY_TO_VIEW]: "barod i'w weld",
    [SectionStatus.NOT_AVAILABLE_YET]: 'Ddim ar gael eto',
  },
  sectionTitles: respondent_cy,
  taskListItems: respondent_tasklist_items_cy,
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const banners: Banner[] =
    content.userCase?.caseTypeOfApplication === 'C100'
      ? getC100Banners(content.userCase)
      : getFl401Banners(content.userCase);
  console.log(banners);

  return {
    ...translations,
    sections: generateRespondentTaskList(translations.sectionTitles, translations.taskListItems, content.userCase),
    banners,
  };
};

const getC100Banners = userCase => {
  console.log(userCase.caseTypeOfApplication);
  const banners: Banner[] = [];
  banners.push({
    bannerHeading: 'You have a new order from the court',
    bannerContent: [
      {
        line1: 'The court has made a decision about your case. The order tells you what the court has decided.',
        line2:
          ' ',
      },
    ],
    bannerLinks: [
      {
        href: APPLICANT_CA_MANAGE_ORDER_PDF,
        text: 'View the order (PDF)',
      }
    ],
  });
  return banners;
};

const getFl401Banners = userCase => {
  console.log(userCase.caseTypeOfApplication);
  const banners: Banner[] = [];
  console.log(userCase);
  if(userCase.orderCollection && userCase.orderCollection.length > 0) {
  banners.push({
    bannerHeading: 'You have a new order from the court',
    bannerContent: [
      {
        line1: 'The court has made a decision about your case. The order tells you what the court has decided.',
        line2:
          ' ',
      },
    ],
    bannerLinks: [
      {
        href: APPLICANT_DA_MANAGE_ORDER_PDF,
        text: 'View the order (PDF)',
      }
    ],
  });
}
  return banners;
};
