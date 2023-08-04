import { CaseWithId } from '../../../app/case/case';
import { Applicant, Banner, CaseType, PartyDetails, SectionStatus, YesOrNo } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { TranslationFn } from '../../../app/controller/GetController';
import { buildProgressBarStages } from '../../../app/utils/progress-bar-utils';
import { checkPartyRepresentedBySolicitor } from '../../../steps/common/task-list/utils';
import {
  APPLICANT_ADD_LEGAL_REPRESENTATIVE,
  APPLICANT_ORDERS_FROM_THE_COURT,
  APPLICANT_REMOVE_LEGAL_REPRESENTATIVE_START,
  APPLICANT_VIEW_ALL_DOCUMENTS,
  FIND_LEGAL_ADVISE,
  FIND_MY_LOCAL_COURT,
  KNOW_MORE_ABOUT_ATTENDING_COURT,
  KNOW_MORE_ABOUT_CA,
} from '../../../steps/urls';

import { applicant_cy, applicant_en } from './section-titles';
import { generateApplicantTaskList } from './tasklist';
import { applicant_tasklist_items_cy, applicant_tasklist_items_en } from './tasklist-items';
import { getApplicantPartyDetails } from './utils';

const en = () => ({
  title: 'Applicant tasklist',
  applicantName: '',
  caseNumber: 'Case number  ',
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
  iWantTo: 'I want to...',
  hyperlinks: [
    {
      label: 'Add a legal representative',
      link: APPLICANT_ADD_LEGAL_REPRESENTATIVE,
    },
    {
      label: 'Remove a legal representative',
      link: APPLICANT_REMOVE_LEGAL_REPRESENTATIVE_START,
    },
    {
      label: 'Find my local court',
      link: FIND_MY_LOCAL_COURT,
      target: '_blank',
    },
    {
      label: 'Find legal advice',
      link: FIND_LEGAL_ADVISE,
      target: '_blank',
    },
    {
      label: 'Know more about child arrangements',
      link: KNOW_MORE_ABOUT_CA,
      target: '_blank',
    },
    {
      label: 'Know more about attending court',
      link: KNOW_MORE_ABOUT_ATTENDING_COURT,
      target: '_blank',
    },
  ],
  addLegalRepresentative: 'Add a legal representative',
  removeLegalRepresentative: 'Remove a legal representative',
});

const cy = () => ({
  title: 'Rhestr Tasgau’r Ceisydd',
  applicantName: '',
  caseNumber: 'Rhif yr achos ',
  statuses: {
    [SectionStatus.COMPLETED]: 'Wedi’i gwblhau',
    [SectionStatus.IN_PROGRESS]: 'Yn mynd rhagddo',
    [SectionStatus.TO_DO]: 'I WNEUD',
    [SectionStatus.DOWNLOAD]: 'LLWYTHO',
    [SectionStatus.READY_TO_VIEW]: 'Yn barod i’w gweld',
    [SectionStatus.NOT_AVAILABLE_YET]: 'Ddim ar gael eto',
  },
  sectionTitles: applicant_cy,
  taskListItems: applicant_tasklist_items_cy,

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
        text: 'Gweld yr holl ddogfennau',
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
  iWantTo: 'Rwyf eisiau ...',
  hyperlinks: [
    {
      label: 'Ychwanegu cynrychiolydd cyfreithiol',
      link: APPLICANT_ADD_LEGAL_REPRESENTATIVE,
    },
    {
      label: 'Dileu cynrychiolydd cyfreithiol',
      link: APPLICANT_REMOVE_LEGAL_REPRESENTATIVE_START,
    },
    {
      label: 'Dod o hyd i fy llys lleol',
      link: FIND_MY_LOCAL_COURT,
      target: '_blank',
    },
    {
      label: 'Dod o hyd i gyngor cyfreithiol',
      link: FIND_LEGAL_ADVISE,
      target: '_blank',
    },
    {
      label: 'Gwybod mwy am drefniadau plant',
      link: KNOW_MORE_ABOUT_CA,
      target: '_blank',
    },
    {
      label: 'Gwybod mwy am fynychu’r llys',
      link: KNOW_MORE_ABOUT_ATTENDING_COURT,
      target: '_blank',
    },
  ],
  addLegalRepresentative: 'Ychwanegu cynrychiolydd cyfreithiol',
  removeLegalRepresentative: 'Dileu cynrychiolydd cyfreithiol',
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
  const stages =
    content.userCase?.caseTypeOfApplication === 'C100'
      ? []
      : buildProgressBarStages(content.userCase!, content.language);
  const req: AppRequest = content.additionalData?.req;

  const applicant = getApplicant(req.session.userCase, req.session.user.id);
  translations.applicantName = getApplicantName(applicant);
  const isRepresentedBySolicotor = checkPartyRepresentedBySolicitor(applicant);
  translations.hyperlinks.forEach((hyperLink, index) => {
    if (hyperLink.label.includes(translations.addLegalRepresentative) && isRepresentedBySolicotor) {
      translations.hyperlinks.splice(index, 1);
    } else if (hyperLink.label.includes(translations.removeLegalRepresentative) && !isRepresentedBySolicotor) {
      translations.hyperlinks.splice(index, 1);
    }
  });

  return {
    ...translations,
    sections: generateApplicantTaskList(
      translations.sectionTitles,
      translations.taskListItems,
      content.userCase,
      content.userIdamId,
      isRepresentedBySolicotor
    ),
    banners,
    stages,
  };
};

export const getApplicant = (userCase: Partial<CaseWithId>, userId: string): PartyDetails | undefined => {
  if (userCase && userCase.caseTypeOfApplication === CaseType.C100) {
    const applicant = getApplicantPartyDetails(userCase, userId);
    return applicant?.value;
  } else {
    return userCase?.applicantsFL401;
  }
};

export const getApplicantName = (applicant: PartyDetails | undefined): string => {
  return applicant ? applicant.firstName + ' ' + applicant.lastName : '';
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
