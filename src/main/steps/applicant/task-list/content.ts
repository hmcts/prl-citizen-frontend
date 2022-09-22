import { Banner, SectionStatus } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { APPLICANT_ORDERS_FROM_THE_COURT } from '../../../steps/urls';

import { applicant_en } from './section-titles';
import { generateApplicantTaskList } from './tasklist';
import { applicant_tasklist_items_en } from './tasklist-items';

const en = () => ({
  title: 'Applicant',
  statuses: {
    [SectionStatus.COMPLETED]: 'Completed',
    [SectionStatus.IN_PROGRESS]: 'In Progress',
    [SectionStatus.TO_DO]: 'TO DO',
    [SectionStatus.DOWNLOAD]: 'DOWNLOAD',
    [SectionStatus.READY_TO_VIEW]: 'Ready to view',
    [SectionStatus.NOT_AVAILABLE_YET]: 'Not available yet',
  },
  sectionTitles: applicant_en,
  taskListItems: applicant_tasklist_items_en,
  newOrderBanner: {
    bannerHeading: 'You have a new order from the court',
    bannerContent: [
      {
        line1: 'The court has made a decision about your case. The order tells you what the court has decided.',
      },
    ],
    bannerLinks: [
      {
        href: `${APPLICANT_ORDERS_FROM_THE_COURT}`,
        text: 'View the order (PDF)',
      },
    ],
  },
  finalOrderBanner: {
    bannerHeading: 'You have a final order',
    bannerContent: [
      {
        line1: 'The court has made a final decision about your case. The order tells you what the court has decided. ',
      },
    ],
    bannerLinks: [
      {
        href: `${APPLICANT_ORDERS_FROM_THE_COURT}`,
        text: 'View the order (PDF)',
      },
    ],
  },
});

const cy = () => ({
  title: ' ',
  statuses: {
    [SectionStatus.COMPLETED]: 'Wedi cwblhau',
    [SectionStatus.IN_PROGRESS]: 'Yn mynd rhagddo',
    [SectionStatus.TO_DO]: 'I WNEUD',
    [SectionStatus.DOWNLOAD]: 'LLWYTHO',
    [SectionStatus.READY_TO_VIEW]: 'Ready to view',
    [SectionStatus.NOT_AVAILABLE_YET]: 'Not available yet',
  },
  sectionTitles: applicant_en,
  taskListItems: applicant_tasklist_items_en,
  newOrderBanner: {
    bannerHeading: 'You have a new order from the court',
    bannerContent: [
      {
        line1: 'The court has made a decision about your case. The order tells you what the court has decided.',
      },
    ],
    bannerLinks: [
      {
        href: `${APPLICANT_ORDERS_FROM_THE_COURT}`,
        text: 'View the order (PDF)',
      },
    ],
  },
  finalOrderBanner: {
    bannerHeading: 'You have a final order',
    bannerContent: [
      {
        line1: 'The court has made a final decision about your case. The order tells you what the court has decided. ',
      },
    ],
    bannerLinks: [
      {
        href: `${APPLICANT_ORDERS_FROM_THE_COURT}`,
        text: 'View the order (PDF)',
      },
    ],
  },
});

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();

  const banners: Banner[] =
    content.userCase?.caseTypeOfApplication === 'C100'
      ? getC100Banners(content.userCase, translations)
      : getFl401Banners(content.userCase, translations);
  return {
    ...translations,
    sections: generateApplicantTaskList(translations.sectionTitles, translations.taskListItems, content.userCase),
    banners,
  };
};

const getC100Banners = (userCase, translations) => {
  const banners: Banner[] = [];
  if (userCase.orderCollection && userCase.orderCollection.length > 0) {
    if (userCase.state !== 'ALL_FINAL_ORDERS_ISSUED') {
      banners.push(translations.newOrderBanner);
    } else {
      banners.push(translations.finalOrderBanner);
    }
  }
  return banners;
};

const getFl401Banners = (userCase, translations) => {
  const banners: Banner[] = [];
  // please add all the banners before this if condition, the following banner is added only if no other is present
  if (userCase.orderCollection && userCase.orderCollection.length > 0) {
    if (userCase.state !== 'ALL_FINAL_ORDERS_ISSUED') {
      banners.push(translations.newOrderBanner);
    } else {
      banners.push(translations.finalOrderBanner);
    }
  }
  return banners;
};
