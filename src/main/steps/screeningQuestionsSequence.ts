import { CaseWithId } from '../app/case/case';
import { YesOrNo } from '../app/case/definition';

import { Sections, Step } from './constants';
import {
  HOME_URL,
  SCREENING_QUESTION_COMPLETE_APP_LEGAL_REP,
  SCREENING_QUESTION_CONTACT_LEGAL_REP,
  SCREENING_QUESTION_COURT_FEE,
  SCREENING_QUESTION_GUIDANCE,
  SCREENING_QUESTION_PAPER_FORM,
  SCREENING_QUESTION_PROCEEDINGS_LEGAL_REP,
} from './urls';

export const screeningQuestionsSequence: Step[] = [
  {
    url: SCREENING_QUESTION_GUIDANCE,
    showInSection: Sections.Screening,
    getNextStep: () => SCREENING_QUESTION_COURT_FEE,
  },
  {
    url: SCREENING_QUESTION_COURT_FEE,
    showInSection: Sections.Screening,
    getNextStep: (caseData: Partial<CaseWithId>) =>
      caseData.applicationPayOnline === YesOrNo.YES
        ? SCREENING_QUESTION_PROCEEDINGS_LEGAL_REP
        : SCREENING_QUESTION_PAPER_FORM,
  },
  {
    url: SCREENING_QUESTION_PAPER_FORM,
    showInSection: Sections.Screening,
    getNextStep: () => '/',
  },
  {
    url: SCREENING_QUESTION_PROCEEDINGS_LEGAL_REP,
    showInSection: Sections.Screening,
    getNextStep: (caseData: Partial<CaseWithId>) =>
      caseData.legalRepresentativeForProceedings === YesOrNo.YES ? SCREENING_QUESTION_COMPLETE_APP_LEGAL_REP : HOME_URL,
  },
  {
    url: SCREENING_QUESTION_COMPLETE_APP_LEGAL_REP,
    showInSection: Sections.Screening,
    getNextStep: (caseData: Partial<CaseWithId>) =>
      caseData.legalRepresentativeForApplication === YesOrNo.YES ? SCREENING_QUESTION_CONTACT_LEGAL_REP : HOME_URL,
  },
  {
    url: SCREENING_QUESTION_CONTACT_LEGAL_REP,
    showInSection: Sections.Screening,
    getNextStep: () => '/',
  },
];
