/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import _ from 'lodash';

import { CaseWithId } from '../../../../../app/case/case';
import { PartyType, YesOrNo } from '../../../../../app/case/definition';
import { isApplicantValid, isChildValid, isOtherChildValid, isRespondentValid } from '../../util';

export const PeopleFieldsConfig = {
  section: 'people',
  fields: [
    {
      fieldName: 'cd_children',
      fieldType: 'object',
      expression: (caseData: CaseWithId) => {
        return {
          isMandatory: caseData?.cd_children?.every(child => isChildValid(child)),
        };
      },
    },
    {
      fieldName: 'ocd_hasOtherChildren',
      fieldType: 'string',
    },
    {
      fieldName: 'ocd_otherChildren',
      fieldType: 'object',
      expression: (caseData: CaseWithId) => {
        return {
          isMandatory: caseData?.ocd_otherChildren?.every(child => isOtherChildValid(child)),
        };
      },
      mandatory_if: {
        fieldName: 'ocd_hasOtherChildren',
        value: 'Yes',
      },
    },
    {
      fieldName: 'appl_allApplicants',
      fieldType: 'object',
      expression: (caseData: CaseWithId) => {
        return {
          isMandatory: caseData?.appl_allApplicants?.every(applicant => isApplicantValid(applicant)),
        };
      },
    },
    {
      fieldName: 'resp_Respondents',
      fieldType: 'object',
      expression: (caseData: CaseWithId) => {
        return {
          isMandatory: caseData?.resp_Respondents?.every(respondent =>
            isRespondentValid(respondent, PartyType.RESPONDENT)
          ),
        };
      },
    },
    {
      fieldName: 'oprs_otherPersonCheck',
      fieldType: 'string',
    },
    {
      fieldName: 'oprs_otherPersons',
      fieldType: 'object',
      expression: (caseData: CaseWithId) => {
        return {
          isMandatory: caseData?.oprs_otherPersons?.every(
            respondent =>
              isRespondentValid(respondent, PartyType.OTHER_PERSON) &&
              !_.isEmpty(respondent.liveInRefuge) &&
              (respondent.liveInRefuge === YesOrNo.YES ? !_.isEmpty(respondent.refugeConfidentialityC8Form) : true)
          ),
        };
      },
      mandatory_if: {
        fieldName: 'oprs_otherPersonCheck',
        value: 'Yes',
      },
    },
  ],
};
