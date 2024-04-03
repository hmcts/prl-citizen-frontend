/* eslint-disable @typescript-eslint/no-explicit-any */
import { Case } from '../../../app/case/case';
import {
  PRL_C1AAbuseTypes,
  PRL_C1ASafteyConcernsAbout,
  PRL_C1ASafteyConcernsAbuse,
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
  abuseType: PRL_C1AAbuseTypes,
  ctx: PRL_C1ASafteyConcernsAbout,
  caseData: Partial<Case>
): boolean => {
  if (
    (ctx === PRL_C1ASafteyConcernsAbout.CHILDREN &&
      [
        PRL_C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE,
        PRL_C1AAbuseTypes.ABDUCTION,
        PRL_C1AAbuseTypes.SOMETHING_ELSE,
      ].includes(abuseType)) ||
    (ctx === PRL_C1ASafteyConcernsAbout.RESPONDENT &&
      [PRL_C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE, PRL_C1AAbuseTypes.ABDUCTION].includes(abuseType))
  ) {
    return false;
  }

  return !!(
    Object.values(PRL_C1AAbuseTypes).includes(abuseType) &&
    caseData?.[
      ctx === PRL_C1ASafteyConcernsAbout.CHILDREN ? 'PRL_c1A_concernAboutChild' : 'PRL_c1A_concernAboutRespondent'
    ]?.includes(abuseType)
  );
};

export const transformAbuseFormData = (formData: Record<string, any>): PRL_C1ASafteyConcernsAbuse => {
  return Object.keys(getDataShape().abuse).reduce((transformedData: PRL_C1ASafteyConcernsAbuse, fieldName) => {
    if (fieldName in formData && !(fieldName in transformedData)) {
      transformedData[fieldName] = formData[fieldName];
    }

    return transformedData;
  }, {});
};
