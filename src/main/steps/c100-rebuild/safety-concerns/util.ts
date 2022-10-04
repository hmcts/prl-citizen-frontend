import { Case } from '../../../app/case/case';
import { C1AAbuseTypes, C1ASafteyConcernsAbout } from '../../../app/case/definition';

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
    (ctx === C1ASafteyConcernsAbout.APPLICANT &&
      [C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE, C1AAbuseTypes.ABDUCTION].includes(abuseType))
  ) {
    return false;
  }

  return !!(
    Object.values(C1AAbuseTypes).includes(abuseType) &&
    caseData?.[
      ctx === C1ASafteyConcernsAbout.CHILDREN ? 'c1A_concernAboutChild' : 'c1A_concernAboutApplicant'
    ]?.includes(abuseType)
  );
};
