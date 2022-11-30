import { CaseWithId } from '../../../app/case/case';
import { Banner, Respondent, SectionStatus, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { TranslationFn } from '../../../app/controller/GetController';
import { buildProgressBarStages } from '../../../app/utils/progress-bar-utils';
import {
  APPLICANT,
  APPLICANT_CA_DA_REQUEST,
  FIND_OUT_ABOUT_CAFCASS,
  FIND_OUT_ABOUT_CAFCASS_CYMRU,
  RESPONDENT_ORDERS_FROM_THE_COURT,
  RESPONDENT_VIEW_ALL_DOCUMENTS_FROM_BANNER,
  RESPOND_TO_APPLICATION,
} from '../../../steps/urls';

import { respondent_cy, respondent_en } from './section-titles';
import { generateRespondentTaskList } from './tasklist';
import { respondent_tasklist_items_cy, respondent_tasklist_items_en } from './tasklist-items';
import { getRespondentPartyDetailsCa } from './utils';

const en = () => ({
  title: '',
  respondentName: '',
  statuses: {
    [SectionStatus.COMPLETED]: 'Completed',
    [SectionStatus.IN_PROGRESS]: 'In Progress',
    [SectionStatus.TO_DO]: 'To Do',
    [SectionStatus.READY_TO_VIEW]: 'Ready to view',
    [SectionStatus.NOT_AVAILABLE_YET]: 'Not available yet',
    [SectionStatus.DOWNLOAD]: 'DOWNLOAD',
    [SectionStatus.VIEW]: 'VIEW',
  },
  sectionTitles: respondent_en,
  taskListItems: respondent_tasklist_items_en,
  newOrderBanner: {
    bannerHeading: 'You have a new order from the court',
    bannerContent: [
      {
        line1: 'The court has made a decision about your case. The order tells you what the court has decided.',
      },
    ],
    bannerLinks: [
      {
        href: `${RESPONDENT_ORDERS_FROM_THE_COURT}`,
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
        href: `${RESPONDENT_ORDERS_FROM_THE_COURT}`,
        text: 'View the order (PDF)',
      },
    ],
  },
  caRespondentServedBanner: {
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
  },
  cafcassBanner: {
    bannerHeading: 'Cafcass will contact you **',
    bannerContent: [
      {
        line1:
          'The Children and Family Court advisory and Support Service (Cafcass or Cafcass Cymru) will contact you to consider the needs of the children.',
      },
    ],
    bannerLinks: [
      {
        href: FIND_OUT_ABOUT_CAFCASS,
        text: 'Find out about Cafcass',
      },
      {
        href: FIND_OUT_ABOUT_CAFCASS_CYMRU,
        text: 'Find out about Cafcass Cymru ',
      },
    ],
  },
  daRespondentBanner: {
    bannerHeading:
      'You have been named as the respondent in a domestic abuse application and have an order from the court',
    bannerContent: [
      {
        line1:
          'This means that another person (the applicant) has applied to a court for protection from domestic abuse.',
        line2: 'The court has considered their concerns. The order tells you what the court has decided.',
      },
    ],
    bannerLinks: [
      {
        href: RESPONDENT_ORDERS_FROM_THE_COURT,
        text: 'Read the order (PDF)',
      },
      {
        href: `${APPLICANT}${APPLICANT_CA_DA_REQUEST}`,
        text: 'Read the application (PDF)',
      },
    ],
  },
  viewDocumentBanner: {
    bannerHeading: 'You have a new document to view',
    bannerContent: [
      {
        line1: 'A new document has been added to your case.',
      },
    ],
    bannerLinks: [
      {
        href: RESPONDENT_VIEW_ALL_DOCUMENTS_FROM_BANNER,
        text: 'See all documents',
      },
    ],
  },
});

const cy = () => ({
  title: '',
  respondentName: '',
  statuses: {
    [SectionStatus.COMPLETED]: 'Wedi cwblhau',
    [SectionStatus.IN_PROGRESS]: 'Yn mynd rhagddo',
    [SectionStatus.TO_DO]: 'Heb Ddechrau',
    [SectionStatus.READY_TO_VIEW]: "barod i'w weld",
    [SectionStatus.NOT_AVAILABLE_YET]: 'Ddim ar gael eto',
    [SectionStatus.DOWNLOAD]: 'DOWNLOAD (in Welsh)',
    [SectionStatus.VIEW]: 'VIEW (in Welsh)',
  },
  sectionTitles: respondent_cy,
  taskListItems: respondent_tasklist_items_cy,
  newOrderBanner: {
    bannerHeading: 'You have a new order from the court',
    bannerContent: [
      {
        line1: 'The court has made a decision about your case. The order tells you what the court has decided.',
      },
    ],
    bannerLinks: [
      {
        href: `${RESPONDENT_ORDERS_FROM_THE_COURT}`,
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
        href: `${RESPONDENT_ORDERS_FROM_THE_COURT}`,
        text: 'View the order (PDF)',
      },
    ],
  },
  caRespondentServedBanner: {
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
  },
  cafcassBanner: {
    bannerHeading: 'Cafcass will contact you **',
    bannerContent: [
      {
        line1:
          'The Children and Family Court advisory and Support Service (Cafcass or Cafcass Cymru) will contact you to consider the needs of the children.',
      },
    ],
    bannerLinks: [
      {
        href: FIND_OUT_ABOUT_CAFCASS,
        text: 'Find out about Cafcass',
      },
      {
        href: FIND_OUT_ABOUT_CAFCASS_CYMRU,
        text: 'Find out about Cafcass Cymru ',
      },
    ],
  },
  daRespondentBanner: {
    bannerHeading:
      'You have been named as the respondent in a domestic abuse application and have an order from the court',
    bannerContent: [
      {
        line1:
          'This means that another person (the applicant) has applied to a court for protection from domestic abuse.',
        line2: 'The court has considered their concerns. The order tells you what the court has decided.',
      },
    ],
    bannerLinks: [
      {
        href: RESPONDENT_ORDERS_FROM_THE_COURT,
        text: 'Read the order (PDF)',
      },
      {
        href: `${APPLICANT}${APPLICANT_CA_DA_REQUEST}`,
        text: 'Read the application (PDF)',
      },
    ],
  },
  viewDocumentBanner: {
    bannerHeading: 'You have a new document to view (in Welsh)',
    bannerContent: [
      {
        line1: 'A new document has been added to your case. (in Welsh)',
      },
    ],
    bannerLinks: [
      {
        href: RESPONDENT_VIEW_ALL_DOCUMENTS_FROM_BANNER,
        text: 'See all documents',
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
      ? getC100Banners(content.userCase, translations, content.userIdamId)
      : getFl401Banners(content.userCase, translations, content.userIdamId);

  const stages = buildProgressBarStages(content.userCase!);
  const req: AppRequest = content.additionalData?.req;
  if (content.userCase?.caseTypeOfApplication === 'C100') {
    const partyId = getRespondentPartyDetailsCa(content.userCase, req.session.user.id)?.id;
    if (content.userCase.citizenResponseC7DocumentList) {
      for (let i = 0; i < content.userCase.citizenResponseC7DocumentList.length; i++) {
        if (content.userCase.citizenResponseC7DocumentList[i].value.createdBy === partyId) {
          stages[2].completed = true;
        }
      }
    }
  }
  translations.respondentName = getRespondentName(req.session.userCase, req.session.user.id);

  return {
    ...translations,
    sections: generateRespondentTaskList(
      translations.sectionTitles,
      translations.taskListItems,
      content.userCase,
      content.userIdamId
    ),
    banners,
    stages,
  };
};

const getRespondentName = (userCase: Partial<CaseWithId>, userId: string): string => {
  if (userCase.caseTypeOfApplication === 'C100') {
    const respondent = getRespondentPartyDetailsCa(userCase, userId);
    return respondent ? respondent.value.firstName + ' ' + respondent.value.lastName : '';
  } else {
    return userCase.respondentsFL401?.firstName + '' + userCase.respondentsFL401?.lastName;
  }
};

const getC100Banners = (userCase, translations, userIdamId) => {
  const banners: Banner[] = [];
  userCase?.respondents?.forEach((respondent: Respondent) => {
    if (
      respondent?.value.user?.idamId === userIdamId &&
      YesOrNo.NO === respondent?.value.response?.citizenFlags?.isAllDocumentsViewed
    ) {
      banners.push(translations.viewDocumentBanner);
    }
  });
  if (userCase.orderCollection && userCase.orderCollection.length > 0) {
    if (userCase.state !== 'ALL_FINAL_ORDERS_ISSUED') {
      banners.push(translations.newOrderBanner);
    } else {
      banners.push(translations.finalOrderBanner);
    }
  }
  return banners;
};

const getFl401Banners = (userCase, translations, userIdamId) => {
  const banners: Banner[] = [];
  if (
    userCase?.respondentsFL401?.user?.idamId === userIdamId &&
    YesOrNo.NO === userCase?.respondentsFL401?.response?.citizenFlags?.isAllDocumentsViewed
  ) {
    banners.push(translations.viewDocumentBanner);
  }
  if (userCase.orderCollection && userCase.orderCollection.length > 0) {
    if (userCase.state !== 'ALL_FINAL_ORDERS_ISSUED') {
      banners.push(translations.newOrderBanner);
    } else {
      banners.push(translations.finalOrderBanner);
    }
  }
  // please add all the banners before this if condition, the following banner is added only if no other is present
  if (banners.length === 0 && userCase.orderWithoutGivingNoticeToRespondent?.orderWithoutGivingNotice === YesOrNo.YES) {
    banners.push(translations.daRespondentBanner);
  }
  return banners;
};
