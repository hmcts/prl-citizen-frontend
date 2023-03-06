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
  pendingCaseStatus: 'Application submitted',
  submittedCaseStatus: 'Application submitted',
};

const cy = {
  title: 'Achosion trefniadau plant a gwaharddebau teulu',
  sectionTitle: 'Actifadu cod mynediad neu gychwyn cais:',
  activateAccessCodeLinkText: 'Actifadu cod mynediad',
  newChildArrangementsLinkText: 'Cais trefniadau plant newydd (C100)',
  newFamilyInjunctionLinkText: 'Cais gwaharddeb teulu newydd (FL401)',
  draftApplicationTabLabel: 'Ceisiadau drafft',
  activeCasesTabLabel: 'Achosion gweithredol',
  closedCasesTabLabel: 'Achosion sydd wedi dod i ben',
  draftApplicationTabHeading: 'Eich ceisiadau',
  draftApplicationTabContent: '<p class="govuk-body">Mae gennych 28 diwrnod i gyflwyno’r cais.</p>',
  activeCasesTabHeading: 'Ongoing cases - welsh',
  closedCasesTabHeading: 'Achosion sydd wedi dod i ben',
  caseNumber: 'Rhif yr achos',
  caseType: 'Math o achos',
  caseStatus: 'Statws',
  createdDate: 'Dyddiad creu',
  applicant: 'Ceisydd',
  lastUpdated: 'Diweddarwyd diwethaf',
  closeDate: 'Dyddiad cau',
  noCase: 'No case available. - welsh',
  draftCaseStatus: 'Drafft',
  pendingCaseStatus: 'Cyflwynwyd y cais',
  submittedCaseStatus: 'Cyflwynwyd y cais',
};

export const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language];

  return {
    ...translations,
    tabs: prepareCaseView(content.additionalData!.req.session.userCaseList, translations),
  };
};
