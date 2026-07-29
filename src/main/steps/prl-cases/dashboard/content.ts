import { TranslationFn } from '../../../app/controller/GetController';

import { prepareCaseView } from './tabView';

const en = {
  title: 'Child arrangements and family injunction cases',
  subTitle: "'s account",
  injunctionHeading: 'I want to...',
  dashboardDescriptionText: 'This dashboard has all your child arrangement cases.',
  applyCAHeading: 'Apply for a child arrangements court order (Form C100)',
  courtDecisionText:
    'If you need the court to decide on child arrangements and how your children are looked after, you can apply for a court order.',
  newChildArrangementsLinkText: 'Start a new child arrangements application',
  linkCaseHeading: 'Link a case to your account',
  pinInstructionsText: "If you've received a PIN and instructions to link a case to your account.",
  pinActivateLinkText: 'Activate a PIN',
  newFamilyInjunctionLinkText:
    "Apply for a court order if you've been the victim of domestic abuse (Form FL401) (opens in a new tab)",
  familyInjunctionDetailText: 'Contact us for help',
  familyInjunctionDetailContentText: 'What goes here?',
  draftApplicationTabHeading: 'Your cases',
  caseStatus: 'Status',
  applicantRoleLabel: 'Applicant',
  respondentRoleLabel: 'Respondent',
  lastUpdated: 'Last updated',
  noCase: 'No case available.',
  draftCaseStatus: 'Draft',
  submittedCaseStatus: 'Submitted',
  activeCaseStatus: 'Active',
  closedCaseStatus: 'Closed',
  draftCaseStatusDescription: 'You have {noOfDaysRemainingToSubmitCase} days to submit this draft application',
  submittedCaseStatusDescription: 'The court will review your application and contact you with the next steps',
  heritageCaseStatusDescription: 'This case cannot progress online, contact the court for updates',
  yourRoleLabel: 'Your role',
  lastUpdateLabel: 'Last update',
  continueApplicationText: 'Continue application',
  viewApplicationText: 'View application',
  viewCaseText: 'View case',
  childArrangementsCaseHeading: 'Child arrangements case',
  domesticAbuseCaseHeading: '--FL401 heading needed',
};

const cy: typeof en = {
  title: 'Achosion trefniadau plant a gwaharddebau teulu',
  subTitle: "--welsh 's account",
  injunctionHeading: '--welsh I want to...',
  dashboardDescriptionText: '--welsh This dashboard has all your child arrangement cases',
  applyCAHeading: '--welsh Apply for a child arrangements court order (Form C100)',
  courtDecisionText:
    '--welsh If you need the court to decide on child arrangements and how your children are looked after, you can apply for a court order.',
  newChildArrangementsLinkText: '--welsh Cais trefniadau plant newydd (C100)',
  linkCaseHeading: '--welsh Link a case to your account',
  pinInstructionsText: "--welsh If you've received a PIN and instructions to link a case to your account.",
  pinActivateLinkText: '--welsh Activate a PIN',
  newFamilyInjunctionLinkText: 'Cais gwaharddeb teulu newydd (FL401)',
  familyInjunctionDetailText: '--welsh Contact us for help',
  familyInjunctionDetailContentText: '--welsh What goes here?',
  draftApplicationTabHeading: 'Eich ceisiadau',
  caseStatus: 'Statws',
  applicantRoleLabel: '--welsh Applicant',
  respondentRoleLabel: '--welsh Respondent',
  lastUpdated: 'Diweddarwyd diwethaf',
  noCase: 'Dim cais ar gael.',
  draftCaseStatus: 'Drafft',
  submittedCaseStatus: 'Cyflwynwyd y cais',
  activeCaseStatus: '-- welshActive',
  closedCaseStatus: '-- welsh Closed',
  draftCaseStatusDescription: '--welsh You have {noOfDaysRemainingToSubmitCase} days to submit this draft application',
  submittedCaseStatusDescription: '--welsh The will review your application and contact you with the next steps',
  heritageCaseStatusDescription: '--welsh This case cannot progress online, contact the court for updates',
  yourRoleLabel: '--welsh Your role',
  lastUpdateLabel: '--welsh Last update',
  continueApplicationText: '--welsh Continue application',
  viewApplicationText: '--welsh View application',
  viewCaseText: '--welsh View case',
  childArrangementsCaseHeading: '--welsh Child arrangements case',
  domesticAbuseCaseHeading: '--welsh FL401 heading needed',
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
    cases: prepareCaseView(session.userCaseList, session.user, translations),
  };
};
