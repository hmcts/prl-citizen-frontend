import { TranslationFn } from '../../../app/controller/GetController';

import { getNotificationBannerConfig } from './components/notification-banner/utils';
import { getProgressBarConfig } from './components/progress-bar/utils';
import { getTaskListConfig } from './components/tasklist/utils';
import { getPartyName } from './utils';

const en = {
  title: 'Child arrangements and family injunction cases',
  caseNumber: 'Case number #',
  iWantTo: 'I want to...',
  hyperlinks: [
    {
      label: 'Know more about child arrangements',
      link: 'https://helpwithchildarrangements.service.justice.gov.uk/',
    },
    {
      label: 'Know more about attending court',
      link: 'https://helpwithchildarrangements.service.justice.gov.uk/going-to-court',
    },
    {
      label: 'Understand what a Mediation Information & Assessment Meeting (MIAM) is',
      link: 'https://www.familymediationcouncil.org.uk/family-mediation/assessment-meeting-miam/',
    },
    {
      label: 'Check if I am eligible for Legal Aid',
      link: 'https://www.gov.uk/check-legal-aid',
    },
    {
      label: 'Check if I am eligible for Help with Fees',
      link: 'https://www.gov.uk/get-help-with-court-fees',
    },
    {
      label: 'Find out about The Family Mediation Voucher scheme',
      link: 'https://www.gov.uk/guidance/family-mediation-voucher-scheme',
    },
    {
      label: 'Find legal advice',
      link: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
    },
    {
      label: 'Read how to represent myself in court',
      link: 'https://www.gov.uk/represent-yourself-in-court',
    },
  ],
};

const cy = {
  title: 'Child arrangements and family injunction cases - welsh',
  caseNumber: 'Case number # - welsh',
  iWantTo: 'I want to... - welsh',
  hyperlinks: [
    {
      label: 'Know more about child arrangements - welsh',
      link: 'https://helpwithchildarrangements.service.justice.gov.uk/',
    },
    {
      label: 'Know more about attending court - welsh',
      link: 'https://helpwithchildarrangements.service.justice.gov.uk/going-to-court',
    },
    {
      label: 'Understand what a Mediation Information & Assessment Meeting (MIAM) is - welsh',
      link: 'https://www.familymediationcouncil.org.uk/family-mediation/assessment-meeting-miam/',
    },
    {
      label: 'Check if I am eligible for Legal Aid - welsh',
      link: 'https://www.gov.uk/check-legal-aid',
    },
    {
      label: 'Check if I am eligible for Help with Fees - welsh',
      link: 'https://www.gov.uk/get-help-with-court-fees',
    },
    {
      label: 'Find out about The Family Mediation Voucher scheme - welsh',
      link: 'https://www.gov.uk/guidance/family-mediation-voucher-scheme',
    },
    {
      label: 'Find legal advice - welsh',
      link: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
    },
    {
      label: 'Read how to represent myself in court - welsh',
      link: 'https://www.gov.uk/represent-yourself-in-court',
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

  return {
    ...translations,
    partyName: getPartyName(caseData, partyType, request.session.user),
    progressBar: getProgressBarConfig(caseData, partyType, content.language),
    notifications: getNotificationBannerConfig(caseData, partyType, content.language),
    taskLists: getTaskListConfig(caseData, request.session.user, partyType, content.language),
  };
};
