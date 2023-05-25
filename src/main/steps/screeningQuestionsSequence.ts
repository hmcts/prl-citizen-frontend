import { CaseWithId } from '../app/case/case';
import { YesOrNo } from '../app/case/definition';

import { Sections, Step } from './constants';
import { SCREENING_QUESTION_COURT_FEE, SCREENING_QUESTION_GUIDANCE, SCREENING_QUESTION_PAPER_FORM } from './urls';

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
      caseData.applicationPayOnline === YesOrNo.YES ? SCREENING_QUESTION_COURT_FEE : SCREENING_QUESTION_PAPER_FORM,
  },
  {
    url: SCREENING_QUESTION_PAPER_FORM,
    showInSection: Sections.Screening,
    getNextStep: () => '/',
  },
];
