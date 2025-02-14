import { CaseWithId } from '../../../../../app/case/case';
import { areOtherProceedingsInvalid } from '../../util';

export const OtherProceedingsFieldsConfig = {
  section: 'otherProceedings',
  fields: [
    {
      fieldName: 'op_childrenInvolvedCourtCase',
      fieldType: 'string',
    },
    {
      fieldName: 'op_courtOrderProtection',
      fieldType: 'string',
    },
    {
      fieldName: 'op_courtProceedingsOrders',
      fieldType: 'array',
      items: {
        type: 'string',
      },
      mandatory_if: {
        or: [
          {
            fieldName: 'op_childrenInvolvedCourtCase',
            fieldType: 'string',
            value: 'Yes',
          },
          {
            fieldName: 'op_courtOrderProtection',
            fieldType: 'string',
            value: 'Yes',
          },
        ],
      },
    },
    {
      fieldName: 'op_otherProceedings',
      fieldType: 'object',
      mandatory_if: {
        and: [
          {
            fieldName: 'op_courtProceedingsOrders',
          },
          {
            fieldName: 'op_otherProceedings',
            expression: (caseData: CaseWithId): { isMandatory: boolean } => {
              return {
                isMandatory: areOtherProceedingsInvalid(caseData),
              };
            },
          },
        ],
      },
    },
  ],
};
