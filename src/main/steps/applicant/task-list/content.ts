import { Applicant, Banner, SectionStatus, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { TranslationFn } from '../../../app/controller/GetController';
import { buildProgressBarStages } from '../../../app/utils/progress-bar-utils';
import { APPLICANT_ORDERS_FROM_THE_COURT, APPLICANT_VIEW_ALL_DOCUMENTS } from '../../../steps/urls';

import { applicant_en } from './section-titles';
import { generateApplicantTaskList } from './tasklist';
import { applicant_tasklist_items_en } from './tasklist-items';
import { getApplicantPartyDetails } from './utils';

const en = () => ({
  title: 'Applicant tasklist',
  applicantName: '',
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

  viewDocumentBanner: {
    bannerHeading: 'You have a new document to view',
    bannerContent: [
      {
        line1: 'A new document has been added to your case.',
      },
    ],
    bannerLinks: [
      {
        href: APPLICANT_VIEW_ALL_DOCUMENTS,
        text: 'See all documents',
      },
    ],
  },

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
        text: 'View the final order (PDF)',
      },
    ],
  },
});

const cy = () => ({
  title: 'Applicant tasklist',
  applicantName: '',
  statuses: {
    [SectionStatus.COMPLETED]: 'Wedi’i gwblhau',
    [SectionStatus.IN_PROGRESS]: 'Yn mynd rhagddo',
    [SectionStatus.TO_DO]: 'I WNEUD',
    [SectionStatus.DOWNLOAD]: 'LLWYTHO',
    [SectionStatus.READY_TO_VIEW]: 'Yn barod i’w gweld',
    [SectionStatus.NOT_AVAILABLE_YET]: 'Ddim ar gael eto',
  },
  sectionTitles: applicant_en,
  taskListItems: applicant_tasklist_items_en,

  viewDocumentBanner: {
    bannerHeading: 'Mae gennych ddogfen newydd i edrych arni',
    bannerContent: [
      {
        line1: 'Mae dogfen newydd wedi’i hychwanegu i’ch achos.',
      },
    ],
    bannerLinks: [
      {
        href: APPLICANT_VIEW_ALL_DOCUMENTS,
        text: 'See all documents',
      },
    ],
  },
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
        href: `${APPLICANT_ORDERS_FROM_THE_COURT}`,
        text: 'Gweld y gorchymyn (PDF)',
      },
    ],
  },
  finalOrderBanner: {
    bannerHeading: 'Mae gennych orchymyn terfynol',
    bannerContent: [
      {
        line1:
          'Mae’r llys wedi gwneud penderfyniad terfynol ynghylch eich achos. Mae’r gorchymyn yn dweud wrthych beth y mae’r llys wedi penderfynu. ',
      },
    ],
    bannerLinks: [
      {
        href: `${APPLICANT_ORDERS_FROM_THE_COURT}`,
        text: 'Gweld y gorchymyn terfynol (PDF)',
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
  const stages = content.userCase?.caseTypeOfApplication === 'C100' ? [] : buildProgressBarStages(content.userCase!);
  const req: AppRequest = content.additionalData?.req;
  translations.applicantName = getApplicantName(req.session.userCase, req.session.user.id);
  return {
    ...translations,
    sections: generateApplicantTaskList(
      translations.sectionTitles,
      translations.taskListItems,
      content.userCase,
      content.userIdamId
    ),
    banners,
    stages,
  };
};

const getApplicantName = (userCase, userId) => {
  if (userCase.caseTypeOfApplication === 'C100') {
    const applicant = getApplicantPartyDetails(userCase, userId);
    if (applicant) {
      return applicant.value.firstName + ' ' + applicant.value.lastName;
    }
  } else {
    return userCase.applicantsFL401.firstName + ' ' + userCase.applicantsFL401.lastName;
  }
  return '';
};

const getC100Banners = (userCase, translations, userIdamId) => {
  const banners: Banner[] = [];
  userCase?.applicants?.forEach((applicant: Applicant) => {
    if (
      applicant?.value.user?.idamId === userIdamId &&
      YesOrNo.NO === applicant?.value.response?.citizenFlags?.isAllDocumentsViewed
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
    userCase?.applicantsFL401?.user?.idamId === userIdamId &&
    YesOrNo.NO === userCase?.applicantsFL401?.response?.citizenFlags?.isAllDocumentsViewed
  ) {
    banners.push(translations.viewDocumentBanner);
  }
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
