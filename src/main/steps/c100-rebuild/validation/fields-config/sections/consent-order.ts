import _ from 'lodash';

import { CaseWithId } from '../../../../../app/case/case';

export const ConsentOrderFieldsConfig = {
  section: 'consentOrder',
  fields: [
    {
      fieldName: 'co_certificate',
      fieldType: 'object',
      expression: (caseData: CaseWithId) => {
        return { isMandatory: !_.isEmpty(caseData?.co_certificate) };
      },
      mandatory_if: {
        fieldName: 'sq_writtenAgreement',
        alue: 'Yes',
      },
    },
  ],
};
