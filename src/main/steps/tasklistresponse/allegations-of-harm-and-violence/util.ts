/* eslint-disable @typescript-eslint/no-explicit-any */
import { Case } from '../../../app/case/case';
import {
  C1AAbuseTypes,
  C1ASafteyConcernsAbout,
  C1ASafteyConcernsAbuse,
  YesNoEmpty,
} from '../../../app/case/definition';

export const getDataShape = (): Record<string, any> => ({
  abuse: {
    childrenConcernedAbout: '',
    behaviourDetails: '',
    behaviourStartDate: '',
    isOngoingBehaviour: YesNoEmpty.EMPTY,
    seekHelpFromPersonOrAgency: YesNoEmpty.EMPTY,
    seekHelpDetails: '',
  },
});

export const isValidAbuseType = (
  abuseType: C1AAbuseTypes,
  ctx: C1ASafteyConcernsAbout,
  caseData: Partial<Case>
): boolean => {
  if (
    (ctx === C1ASafteyConcernsAbout.CHILDREN &&
      [C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE, C1AAbuseTypes.ABDUCTION, C1AAbuseTypes.SOMETHING_ELSE].includes(
        abuseType
      )) ||
    (ctx === C1ASafteyConcernsAbout.RESPONDENT &&
      [C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE, C1AAbuseTypes.ABDUCTION].includes(abuseType))
  ) {
    return false;
  }

  return !!(
    Object.values(C1AAbuseTypes).includes(abuseType) &&
    caseData?.[
      ctx === C1ASafteyConcernsAbout.CHILDREN ? 'c1A_concernAboutChild' : 'c1A_concernAboutRespondent'
    ]?.includes(abuseType)
  );
};

export const transformAbuseFormData = (formData: Record<string, any>): C1ASafteyConcernsAbuse => {
  return Object.keys(getDataShape().abuse).reduce((transformedData: C1ASafteyConcernsAbuse, fieldName) => {
    if (fieldName in formData && !(fieldName in transformedData)) {
      transformedData[fieldName] = formData[fieldName];
    }

    return transformedData;
  }, {});
};
