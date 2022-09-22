import { Banner, SectionStatus } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import {
  APPLICANT,
  APPLICANT_CA_DA_REQUEST,
  RESPONDENT_ORDERS_FROM_THE_COURT,
  RESPOND_TO_APPLICATION,
} from '../../../steps/urls';

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

  return {
    ...translations,
    sections: generateRespondentTaskList(translations.sectionTitles, translations.taskListItems, content.userCase),
    banners,
  };
};

const getC100Banners = userCase => {
  const banners: Banner[] = [];
  if (userCase.orderCollection && userCase.orderCollection.length > 0) {
    const doc = userCase.orderCollection[0];
    const uid = doc.value.orderDocument.document_url.substring(
      doc.value.orderDocument.document_url.lastIndexOf('/') + 1
    );
    if (userCase.state !== 'ALL_FINAL_ORDERS_ISSUED') {
      banners.push({
        bannerHeading: 'You have a new order from the court',
        bannerContent: [
          {
            line1: 'The court has made a decision about your case. The order tells you what the court has decided.',
          },
        ],
        bannerLinks: [
          {
            href: `${RESPONDENT_ORDERS_FROM_THE_COURT}/${uid}`,
            text: 'View the order (PDF)',
          },
        ],
      });
    } else {
      banners.push({
        bannerHeading: 'You have a final order',
        bannerContent: [
          {
            line1:
              'The court has made a final decision about your case. The order tells you what the court has decided. ',
          },
        ],
        bannerLinks: [
          {
            href: `${RESPONDENT_ORDERS_FROM_THE_COURT}/${uid}`,
            text: 'View the order (PDF)',
          },
        ],
      });
    }
  }
  banners.push({
    bannerHeading: 'Respond to an application about a child',
    bannerContent: [
      {
        line1: 'Another person (the applicant) has applied to the court to make a decision about a child.',
        line2:
          'You should respond within 14 days of receiving the application unless the court has asked you to respond sooner.',
      },
    ],
    bannerLinks: [
      {
        href: `${APPLICANT}${APPLICANT_CA_DA_REQUEST}`,
        text: 'Check the application (PDF)',
      },
      {
        href: RESPOND_TO_APPLICATION,
        text: 'Respond to the application',
      },
    ],
  });
  return banners;
};

const getFl401Banners = userCase => {
  const banners: Banner[] = [];
  if (userCase.orderCollection && userCase.orderCollection.length > 0) {
    const doc = userCase.orderCollection[0];
    const uid = doc.value.orderDocument.document_url.substring(
      doc.value.orderDocument.document_url.lastIndexOf('/') + 1
    );
    if (userCase.state !== 'ALL_FINAL_ORDERS_ISSUED') {
      banners.push({
        bannerHeading: 'You have a new order from the court',
        bannerContent: [
          {
            line1: 'The court has made a decision about your case. The order tells you what the court has decided.',
          },
        ],
        bannerLinks: [
          {
            href: `${RESPONDENT_ORDERS_FROM_THE_COURT}/${uid}`,
            text: 'View the order (PDF)',
          },
        ],
      });
    } else {
      banners.push({
        bannerHeading: 'You have a final order',
        bannerContent: [
          {
            line1:
              'The court has made a final decision about your case. The order tells you what the court has decided. ',
          },
        ],
        bannerLinks: [
          {
            href: `${RESPONDENT_ORDERS_FROM_THE_COURT}/${uid}`,
            text: 'View the order (PDF)',
          },
        ],
      });
    }
  }
  banners.push({
    bannerHeading: 'Respond to an application about a child',
    bannerContent: [
      {
        line1: 'Another person (the applicant) has applied to the court to make a decision about a child.',
        line2:
          'You should respond within 14 days of receiving the application unless the court has asked you to respond sooner.',
      },
    ],
    bannerLinks: [
      {
        href: APPLICANT_CA_DA_REQUEST,
        text: 'Check the application (PDF)',
      },
      {
        href: RESPOND_TO_APPLICATION,
        text: 'Respond to the application',
      },
    ],
  });
  return banners;
};
