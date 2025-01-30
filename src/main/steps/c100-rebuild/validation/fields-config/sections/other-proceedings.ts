import { CaseWithId } from '../../../../../app/case/case';

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
        and: [
          {
            fieldName: 'op_childrenInvolvedCourtCase',
            value: 'Yes',
          },
          {
            fieldName: 'op_courtOrderProtection',
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
              const orders = caseData?.op_otherProceedings?.order
                ? Object.keys(caseData.op_otherProceedings.order)
                : [];

              return {
                isMandatory:
                  caseData?.op_courtProceedingsOrders?.length && orders.length
                    ? orders.some(order =>
                        caseData.op_otherProceedings?.order?.[order].some(
                          orderItem => orderItem?.orderCopy === 'Yes' && !orderItem?.orderDocument?.filename
                        )
                      )
                    : false,
              };
            },
          },
        ],
      },
    },
  ],
};
