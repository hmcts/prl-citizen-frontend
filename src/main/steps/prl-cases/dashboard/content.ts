import { TranslationFn } from '../../../app/controller/GetController';

import { prepareCaseView } from './tabView';

const en = {
  title: 'Child arrangements and family injunction cases',
  sectionTitle: 'Activate an access code or start an application:',
  activateAccessCodeLinkText: 'Activate access code',
  newChildArrangementsLinkText: 'New child arrangements application (C100)',
  newFamilyInjunctionLinkText: 'New family injunction application (FL401)',
  draftApplicationTabLabel: 'Draft applications',
  activeCasesTabLabel: 'Active cases',
  closedCasesTabLabel: 'Closed cases',
  draftApplicationTabHeading: 'Your applications',
  draftApplicationTabContent: '<p class="govuk-body">You have 28 days to submit the application.</p>',
  activeCasesTabHeading: 'Ongoing cases',
  closedCasesTabHeading: 'Closed cases',
  caseNumber: 'Case number',
  caseType: 'Case type',
  caseStatus: 'Status',
  createdDate: 'Created date',
  applicant: 'Applicant',
  lastUpdated: 'Last updated',
  closeDate: 'Close date',
  noCase: 'No case available.',
  draftCaseStatus: 'Draft',
  submittedCaseStatus: 'Application submitted',
  caseIssued: 'Application submitted (sent to local court)',
  caseGatekeeping: 'Application submitted (Gatekeeping)',
  caseServed: 'Application submitted (case issued)',
};

const cy: typeof en = {
  title: 'Child arrangements and family injunction cases - welsh',
  sectionTitle: 'Activate an access code or start an application: - welsh',
  activateAccessCodeLinkText: 'Activate access code - welsh',
  newChildArrangementsLinkText: 'New child arrangements application (C100) - welsh',
  newFamilyInjunctionLinkText: 'New family injunction application (FL401) - welsh',
  draftApplicationTabLabel: 'Draft applications - welsh',
  activeCasesTabLabel: 'Active cases - welsh',
  closedCasesTabLabel: 'Closed cases - welsh',
  draftApplicationTabHeading: 'Your applications - welsh',
  draftApplicationTabContent: '<p class="govuk-body">You have 28 days to submit the application. - welsh</p>',
  activeCasesTabHeading: 'Ongoing cases - welsh',
  closedCasesTabHeading: 'Closed cases - welsh',
  caseNumber: 'Case number - welsh',
  caseType: 'Case type - welsh',
  caseStatus: 'Status - welsh',
  createdDate: 'Created date - welsh',
  applicant: 'Applicant - welsh',
  lastUpdated: 'Last updated - welsh',
  closeDate: 'Close date - welsh',
  noCase: 'No case available. - welsh',
  draftCaseStatus: 'Draft - welsh',
  submittedCaseStatus: 'Application submitted - welsh',
  caseIssued: 'Application submitted (sent to local court) - welsh',
  caseGatekeeping: 'Application submitted (Gatekeeping) - welsh',
  caseServed: 'Application submitted (case issued) - welsh',
};

export const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];
  const session = content.additionalData!.req.session;
  return {
    ...translations,
    tabs: prepareCaseView(session.userCaseList, session.user, translations),
  };
};
