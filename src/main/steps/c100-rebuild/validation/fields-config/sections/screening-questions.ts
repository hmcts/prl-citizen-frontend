import _ from 'lodash';

import { CaseWithId } from '../../../../../app/case/case';
import { YesOrNo } from '../../../../../app/case/definition';

export const ScreeningQuestionsFieldsConfig = {
  section: 'screeningQuestions',
  fields: [
    {
      fieldName: 'sq_writtenAgreement',
      fieldType: 'string',
    },
    {
      fieldName: 'sq_legalRepresentation',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'sq_writtenAgreement',
        value: 'No',
      },
    },
    {
      fieldName: 'sq_legalRepresentationApplication',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'sq_legalRepresentation',
        value: 'Yes',
      },
    },
    {
      fieldName: 'sq_courtPermissionRequired',
      fieldType: 'string',
      mandatory_if: {
        and: [
          { fieldName: 'sq_writtenAgreement', value: 'No' },
          { fieldName: 'sq_legalRepresentation', value: 'No' },
        ],
        or: [{ fieldName: 'sq_legalRepresentationApplication', value: 'No' }],
      },
    },
    {
      fieldName: 'sq_permissionsWhy',
      fieldType: 'array',
      expression: (caseData: CaseWithId): { isMandatory: boolean } => {
        return {
          isMandatory:
            caseData?.sq_writtenAgreement === YesOrNo.NO &&
            !_.isEmpty(caseData?.sq_courtPermissionRequired) &&
            (_.isEmpty(caseData?.sq_permissionsWhy) ||
              (caseData?.sq_permissionsWhy?.every(subField => !_.isEmpty(caseData[`sq_${subField}_subfield`])) ??
                true)),
        };
      },
      mandatory_if: {
        fieldName: 'sq_permissionsWhy',
        fieldType: 'array',
        expression: (caseData: CaseWithId): { isMandatory: boolean } => {
          return {
            isMandatory:
              caseData?.sq_writtenAgreement === YesOrNo.NO &&
              !_.isEmpty(caseData?.sq_courtPermissionRequired) &&
              !_.isEmpty(caseData?.sq_permissionsWhy),
          };
        },
      },
    },
    {
      fieldName: 'sq_permissionsRequest',
      fieldType: 'string',
      mandatory_if: {
        fieldName: 'sq_courtPermissionRequired',
        value: 'Yes',
      },
    },
  ],
};
