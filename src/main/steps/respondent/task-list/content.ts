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
  FIND_OUT_ABOUT_CAFCASS_CYMRU_WELSH,
  FIND_OUT_ABOUT_CAFCASS_WELSH,
  RESPONDENT_ORDERS_FROM_THE_COURT,
  RESPONDENT_VIEW_ALL_DOCUMENTS,
  RESPOND_TO_APPLICATION,
} from '../../../steps/urls';

import { respondent_cy, respondent_en } from './section-titles';
import { generateRespondentTaskList } from './tasklist';
import { respondent_tasklist_items_cy, respondent_tasklist_items_en } from './tasklist-items';
import { getRespondentPartyDetailsCa } from './utils';

const en = () => ({
  title: 'Respondent tasklist',
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
        href: RESPOND_TO_APPLICATION + '/updateFlag',
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
        href: RESPONDENT_VIEW_ALL_DOCUMENTS,
        text: 'See all documents',
      },
    ],
  },
});

const cy = () => ({
  title: 'Respondent tasklist - welsh',
  respondentName: '',
  statuses: {
    [SectionStatus.COMPLETED]: 'Wedi’i gwblhau',
    [SectionStatus.IN_PROGRESS]: 'Yn mynd rhagddo',
    [SectionStatus.TO_DO]: 'Heb Ddechrau',
    [SectionStatus.READY_TO_VIEW]: 'Yn barod i’w gweld',
    [SectionStatus.NOT_AVAILABLE_YET]: 'Ddim ar gael eto',
    [SectionStatus.DOWNLOAD]: 'DOWNLOAD (in Welsh)',
    [SectionStatus.VIEW]: 'VIEW (in Welsh)',
  },
  sectionTitles: respondent_cy,
  taskListItems: respondent_tasklist_items_cy,
  newOrderBanner: {
    bannerHeading: 'Mae gennych orchymyn newydd gan y llys',
    bannerContent: [
      {
        line1:
          'Mae’r llys wedi gwneud penderfyniad ynghylch eich achos. Mae’r gorchymyn yn dweud wrthych beth y mae’r llys wedi penderfynu. ',
      },
    ],
    bannerLinks: [
      {
        href: `${RESPONDENT_ORDERS_FROM_THE_COURT}`,
        text: 'Gweld y gorchymyn (PDF)',
      },
    ],
  },
  finalOrderBanner: {
    bannerHeading: 'Mae gennych orchymyn terfynol',
    bannerContent: [
      {
        line1:
          'Mae’r llys wedi gwneud penderfyniad terfynol ynghylch eich achos. Mae’r gorchymyn yn dweud wrthych beth y mae’r llys wedi penderfynu.  ',
      },
    ],
    bannerLinks: [
      {
        href: `${RESPONDENT_ORDERS_FROM_THE_COURT}`,
        text: 'Gweld y gorchymyn (PDF)',
      },
    ],
  },
  caRespondentServedBanner: {
    bannerHeading: 'Ymateb i gais ynghylch plentyn',
    bannerContent: [
      {
        line1: 'Mae person arall (y ceisydd) wedi gwneud cais i’r llys wneud penderfyniad ynghylch plentyn.',
        line2: 'Dylech ymateb o fewn 14 diwrnod o dderbyn y cais oni bai bod y llys wedi gofyn i chi ymateb yn gynt.',
      },
    ],
    bannerLinks: [
      {
        href: `${APPLICANT}${APPLICANT_CA_DA_REQUEST}`,
        text: 'Gwirio’r cais (PDF)',
      },
      {
        href: RESPOND_TO_APPLICATION + '/updateFlag',
        text: "Ymateb i'r cais",
      },
    ],
  },
  cafcassBanner: {
    bannerHeading: 'Bydd Cafcass yn cysylltu â chi **',
    bannerContent: [
      {
        line1:
          'Bydd y Gwasanaeth Cynghori a Chynorthwyo Llys i Blant a Theuluoedd (Cafcass neu Cafcass Cymru) yn cysylltu â chi i ystyried anghenion y plant.',
      },
    ],
    bannerLinks: [
      {
        href: FIND_OUT_ABOUT_CAFCASS_WELSH,
        text: 'Gwybodaeth am Cafcass',
      },
      {
        href: FIND_OUT_ABOUT_CAFCASS_CYMRU_WELSH,
        text: 'Gwybodaeth am Cafcass Cymru ',
      },
    ],
  },
  daRespondentBanner: {
    bannerHeading:
      'Rydych wedi cael eich enwi fel yr atebydd mewn cais cam-drin domestig ac mae gennych orchymyn gan y llys',
    bannerContent: [
      {
        line1:
          'Mae hyn yn golygu bod unigolyn arall (y ceisydd) wedi gwneud cais i’r llys am orchymyn amddiffyn rhag cam-drin domestig.',
        line2:
          'Mae’r llys wedi ystyried eu pryderon. Mae’r gorchymyn hwn yn dweud wrthych beth mae’r llys wedi penderfynu.',
      },
    ],
    bannerLinks: [
      {
        href: RESPONDENT_ORDERS_FROM_THE_COURT,
        text: 'Darllen y gorchymyn (PDF)',
      },
      {
        href: `${APPLICANT}${APPLICANT_CA_DA_REQUEST}`,
        text: 'Darllen y gorchymyn (PDF)',
      },
    ],
  },
  viewDocumentBanner: {
    bannerHeading: 'Mae gennych ddogfen newydd i edrych arni',
    bannerContent: [
      {
        line1: 'Mae dogfen newydd wedi’i hychwanegu i’ch achos.',
      },
    ],
    bannerLinks: [
      {
        href: RESPONDENT_VIEW_ALL_DOCUMENTS,
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
    const respondent = getRespondentPartyDetailsCa(content.userCase, req.session.user.id);
    if (respondent?.value.response.citizenFlags?.isResponseInitiated) {
      stages[2].active = true;
    }
    const partyId = respondent?.id;
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
