import { PartyType } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { getApplicant } from '../../../steps/applicant/task-list/content';

import {
  APPLICANT_ADD_LEGAL_REPRESENTATIVE,
  APPLICANT_REMOVE_LEGAL_REPRESENTATIVE_START,
  DASHBOARD_URL,
} from './../../urls';
import { getNotificationBannerConfig } from './components/notification-banner/utils';
import { getProgressBarConfig } from './components/progress-bar/utils';
import { getTaskListConfig } from './components/tasklist/utils';
import { checkPartyRepresentedBySolicitor, getPartyName } from './utils';

const en = {
  title: 'Child arrangements and family injunction cases',
  caseNumber: 'Case number #',
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
};

const cy = {
  title: 'Child arrangements and family injunction cases - welsh',
  caseNumber: 'Case number # - welsh',
  iWantTo: 'I want to... - welsh',
  hyperlinks: [
    {
      label: 'Add a legal representative - welsh',
      link: APPLICANT_ADD_LEGAL_REPRESENTATIVE,
      target: '',
    },
    {
      label: 'Remove a legal representative - welsh',
      link: APPLICANT_REMOVE_LEGAL_REPRESENTATIVE_START,
      target: '',
    },
    {
      label: 'Know more about child arrangements - welsh',
      link: 'https://helpwithchildarrangements.service.justice.gov.uk/',
      target: '_blank',
    },
    {
      label: 'Know more about attending court - welsh',
      link: 'https://helpwithchildarrangements.service.justice.gov.uk/going-to-court',
      target: '_blank',
    },
    {
      label: 'Understand what a Mediation Information & Assessment Meeting (MIAM) is - welsh',
      link: 'https://www.familymediationcouncil.org.uk/family-mediation/assessment-meeting-miam/',
      target: '_blank',
    },
    {
      label: 'Check if I am eligible for Legal Aid - welsh',
      link: 'https://www.gov.uk/check-legal-aid',
      target: '_blank',
    },
    {
      label: 'Check if I am eligible for Help with Fees - welsh',
      link: 'https://www.gov.uk/get-help-with-court-fees',
      target: '_blank',
    },
    {
      label: 'Find out about The Family Mediation Voucher scheme - welsh',
      link: 'https://www.gov.uk/guidance/family-mediation-voucher-scheme',
      target: '_blank',
    },
    {
      label: 'Find legal advice - welsh',
      link: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
      target: '_blank',
    },
    {
      label: 'Read how to represent myself in court - welsh',
      link: 'https://www.gov.uk/represent-yourself-in-court',
      target: '_blank',
    },
  ],
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
  let isRepresentedBySolicotor = false;
  if (partyType === PartyType.APPLICANT) {
    const applicant = getApplicant(request.session.userCase, request.session.user.id);
    isRepresentedBySolicotor = checkPartyRepresentedBySolicitor(applicant);
  }
  translations.hyperlinks.forEach((hyperLink, index) => {
    if (hyperLink.label.includes('Add a legal representative') && isRepresentedBySolicotor) {
      translations.hyperlinks.splice(index, 1);
    }
    if (hyperLink.label.includes('Remove a legal representative') && !isRepresentedBySolicotor) {
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
    progressBar: getProgressBarConfig(caseData, partyType, content.language),
    notifications: getNotificationBannerConfig(caseData, request.session.user, partyType, content.language),
    taskLists: getTaskListConfig(caseData, request.session.user, partyType, content.language, isRepresentedBySolicotor),
  };
};
