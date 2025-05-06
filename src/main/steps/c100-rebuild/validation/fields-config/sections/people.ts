/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseWithId } from '../../../../../app/case/case';
import { areApplicantsValid } from '../../applicantValidation';
import { areChildrenValid, areOtherChildrenValid, areOtherPeopleValid, areRespondentsValid } from '../../util';

export const PeopleFieldsConfig = {
  section: 'people',
  fields: [
    {
      fieldName: 'cd_children',
      fieldType: 'object',
      expression: (caseData: CaseWithId) => {
        return {
          isMandatory: areChildrenValid(caseData),
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
          isMandatory: areOtherChildrenValid(caseData),
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
          isMandatory: areApplicantsValid(caseData),
        };
      },
    },
    {
      fieldName: 'resp_Respondents',
      fieldType: 'object',
      expression: (caseData: CaseWithId) => {
        return {
          isMandatory: areRespondentsValid(caseData),
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
          isMandatory: areOtherPeopleValid(caseData),
        };
      },
      mandatory_if: {
        fieldName: 'oprs_otherPersonCheck',
        value: 'Yes',
      },
    },
  ],
};
