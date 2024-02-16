import { TranslationFn } from '../../../app/controller/GetController';

import {
  APPLICANT_ADD_LEGAL_REPRESENTATIVE,
  APPLICANT_REMOVE_LEGAL_REPRESENTATIVE_START,
  DASHBOARD_URL,
} from './../../urls';
import { getNotificationBannerConfig } from './components/notification-banner/.';
import { getProgressBarConfig } from './components/progress-bar/index';
import { languages as sideLinks } from './components/side-links/content';
import { getTaskListConfig } from './components/tasklist/index';
import { getPartyName, isRepresentedBySolicotor } from './utils';

const en = {
  title: 'Child arrangements and family injunction cases',
  caseNumber: 'Case number ',
  iWantTo: 'I want to...',
  hyperlinks: [
    {
      label: 'Add a legal representative',
      link: APPLICANT_ADD_LEGAL_REPRESENTATIVE,
      target: '',
    },
    {
      label: 'Remove a legal representative',
      link: APPLICANT_REMOVE_LEGAL_REPRESENTATIVE_START,
      target: '',
    },
    {
      label: 'Know more about child arrangements',
      link: 'https://helpwithchildarrangements.service.justice.gov.uk/',
      target: '_blank',
    },
    {
      label: 'Know more about attending court',
      link: 'https://helpwithchildarrangements.service.justice.gov.uk/going-to-court',
      target: '_blank',
    },
    {
      label: 'Understand what a Mediation Information & Assessment Meeting (MIAM) is',
      link: 'https://www.familymediationcouncil.org.uk/family-mediation/assessment-meeting-miam/',
      target: '_blank',
    },
    {
      label: 'Check if I am eligible for Legal Aid',
      link: 'https://www.gov.uk/check-legal-aid',
      target: '_blank',
    },
    {
      label: 'Check if I am eligible for Help with Fees',
      link: 'https://www.gov.uk/get-help-with-court-fees',
      target: '_blank',
    },
    {
      label: 'Find out about The Family Mediation Voucher scheme',
      link: 'https://www.gov.uk/guidance/family-mediation-voucher-scheme',
      target: '_blank',
    },
    {
      label: 'Find legal advice',
      link: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
      target: '_blank',
    },
    {
      label: 'Read how to represent myself in court',
      link: 'https://www.gov.uk/represent-yourself-in-court',
      target: '_blank',
    },
  ],
  addLegalRepresentative: 'Add a legal representative',
  removeLegalRepresentative: 'Remove a legal representative',
};

const cy = {
  title: 'Trefniadau plant a gwaharddebau teulu',
  caseNumber: 'Rhif yr achos ',
  iWantTo: 'Rwyf eisiau...',
  hyperlinks: [
    {
      label: 'Ychwanegu cynrychiolydd cyfreithiol',
      link: APPLICANT_ADD_LEGAL_REPRESENTATIVE,
      target: '',
    },
    {
      label: 'Dileu cynrychiolydd cyfreithiol',
      link: APPLICANT_REMOVE_LEGAL_REPRESENTATIVE_START,
      target: '',
    },
    {
      label: 'Gwybod mwy am drefniadau plant',
      link: 'https://helpwithchildarrangements.service.justice.gov.uk/',
      target: '_blank',
    },
    {
      label: 'Gwybod mwy am fynychu’r llys',
      link: 'https://helpwithchildarrangements.service.justice.gov.uk/going-to-court',
      target: '_blank',
    },
    {
      label: 'Deall beth yw Cyfarfod Asesu a Gwybodaeth am Gyfryngu (MIAM)',
      link: 'https://www.familymediationcouncil.org.uk/family-mediation/assessment-meeting-miam/',
      target: '_blank',
    },
    {
      label: 'Gwirio os wyf yn gymwys i gael Cymorth Cyfreithiol',
      link: 'https://www.gov.uk/check-legal-aid',
      target: '_blank',
    },
    {
      label: 'Gwirio os wyf yn gymwys i gael Help i Dalu Ffioedd',
      link: 'https://www.gov.uk/get-help-with-court-fees',
      target: '_blank',
    },
    {
      label: 'Rhagor o wybodaeth am y Cynllun Talebau Cyfryngu Teuluol',
      link: 'https://www.gov.uk/guidance/family-mediation-voucher-scheme',
      target: '_blank',
    },
    {
      label: 'Dod o hyd i gyngor cyfreithiol',
      link: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
      target: '_blank',
    },
    {
      label: 'Darllen mwy am sut i gynrychioli fy hun yn y llys',
      link: 'https://www.gov.uk/represent-yourself-in-court',
      target: '_blank',
    },
  ],
  addLegalRepresentative: 'Ychwanegu cynrychiolydd cyfreithiol',
  removeLegalRepresentative: 'Dileu cynrychiolydd cyfreithiol',
};

export const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const request = content.additionalData?.req;
  const caseData = request.session.userCase;
  const partyType = request.params.partyType;
  const _isRepresentedBySolicotor = isRepresentedBySolicotor(caseData, request.session.user.id);

  if (caseData?.caseTypeOfApplication) {
    translations.hyperlinks = sideLinks[content.language]?.[caseData.caseTypeOfApplication]?.[partyType].hyperlinks;
  }

  translations.hyperlinks.forEach((hyperLink, index) => {
    if (
      (hyperLink.label.includes(translations.addLegalRepresentative) && _isRepresentedBySolicotor) ||
      (hyperLink.label.includes(translations.removeLegalRepresentative) && !_isRepresentedBySolicotor)
    ) {
      translations.hyperlinks.splice(index, 1);
    }
  });

  return {
    ...translations,
    breadcrumb: {
      id: 'home',
      href: DASHBOARD_URL,
    },
    partyName: getPartyName(caseData, partyType, request.session.user),
    progressBar: getProgressBarConfig(caseData, partyType, content.language, request.session.user),
    notifications: getNotificationBannerConfig(caseData, request.session.user, partyType, content.language),
    taskLists: getTaskListConfig(caseData, request.session.user, partyType, content.language),
  };
};
