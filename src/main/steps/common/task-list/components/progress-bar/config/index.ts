import { getCAApplicantConfig } from './ca_applicant';
import { getDAConfig } from './da_applicant_respondent';
import { getC100CaseCreationConfig } from './c100-case-creation';
import {
  ProgressBarConfig as ProgressBarConfigDefinition,
  ProgressBarConfigType,
} from '../../../../../../steps/common/task-list/definitions';
import { PartyType } from '../../../../../../app/case/definition';
import { getCARespondentConfig } from './ca_respondent';

export const ProgressBarConfig: ProgressBarConfigDefinition = {
  [ProgressBarConfigType.C100_CASE_CREATION]: {
    [PartyType.APPLICANT]: getC100CaseCreationConfig,
  },
  [ProgressBarConfigType.C100_CASE_PROGRESSION]: {
    [PartyType.APPLICANT]: getCAApplicantConfig,
    [PartyType.RESPONDENT]: getCARespondentConfig,
  },
  [ProgressBarConfigType.FL401_CASE_PROGRESSION]: {
    [PartyType.APPLICANT]: getDAConfig,
    [PartyType.RESPONDENT]: getDAConfig,
  },
};
