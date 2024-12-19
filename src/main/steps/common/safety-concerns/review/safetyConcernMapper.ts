/* eslint-disable @typescript-eslint/no-explicit-any */
import { Case, CaseWithId } from '../../../../app/case/case';
import { C1AAbuseTypes, C1ASafteyConcernsAbout, YesOrNo } from '../../../../app/case/definition';

export const prepareRequest = (caseData: Partial<Case>): string => {
  const {
    c1A_haveSafetyConcerns,
    c1A_safetyConernAbout,
    c1A_concernAboutChild,
    c1A_concernAboutRespondent,
    c1A_keepingSafeStatement,
    c1A_supervisionAgreementDetails,
    c1A_agreementOtherWaysDetails,
    c1A_otherConcernsDrugs,
    c1A_otherConcernsDrugsDetails,
    c1A_childSafetyConcerns,
    c1A_childSafetyConcernsDetails,
    c1A_abductionReasonOutsideUk,
    c1A_childsCurrentLocation,
    c1A_childrenMoreThanOnePassport,
    c1A_possessionChildrenPassport,
    c1A_provideOtherDetails,
    c1A_passportOffice,
    c1A_abductionPassportOfficeNotified,
    c1A_previousAbductionsShortDesc,
    c1A_policeOrInvestigatorInvolved,
    c1A_policeOrInvestigatorOtherDetails,
    c1A_childAbductedBefore,
    c1A_safteyConcerns,
  } = caseData;

  const data = {
    c1A_haveSafetyConcerns,
    c1A_safetyConernAbout,
    c1A_concernAboutChild,
    c1A_concernAboutRespondent,
    c1A_keepingSafeStatement,
    c1A_supervisionAgreementDetails,
    c1A_agreementOtherWaysDetails,
    c1A_otherConcernsDrugs,
    c1A_otherConcernsDrugsDetails,
    c1A_childSafetyConcerns,
    c1A_childSafetyConcernsDetails,
    c1A_abductionReasonOutsideUk,
    c1A_childsCurrentLocation,
    c1A_childrenMoreThanOnePassport,
    c1A_possessionChildrenPassport,
    c1A_provideOtherDetails,
    c1A_passportOffice,
    c1A_abductionPassportOfficeNotified,
    c1A_previousAbductionsShortDesc,
    c1A_policeOrInvestigatorInvolved,
    c1A_policeOrInvestigatorOtherDetails,
    c1A_childAbductedBefore,
    c1A_safteyConcerns,
  };

  dataCleanupForNoSafetyConcern(c1A_haveSafetyConcerns, data);
  if (c1A_otherConcernsDrugs === YesOrNo.NO) {
    data.c1A_otherConcernsDrugsDetails = undefined;
  }
  if (c1A_childSafetyConcerns === YesOrNo.NO) {
    data.c1A_childSafetyConcernsDetails = undefined;
  }
  if (
    !c1A_safetyConernAbout?.includes(C1ASafteyConcernsAbout.RESPONDENT) &&
    !c1A_concernAboutChild?.includes(C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE)
  ) {
    if (data.c1A_safteyConcerns?.respondent) {
      data.c1A_safteyConcerns.respondent = undefined;
    }
    data.c1A_concernAboutRespondent = [];
  }
  dataCleanUpForChildAbuse(c1A_safetyConernAbout, c1A_concernAboutChild, data);
  dataCleanUpForRespondentAbuse(c1A_safetyConernAbout, c1A_concernAboutRespondent, data);
  dataCleanUpForAbduction(
    c1A_concernAboutChild,
    data,
    c1A_possessionChildrenPassport,
    c1A_childAbductedBefore,
    c1A_passportOffice
  );

  const caseDataMapperKeys = Object.keys(updateCaseDataMapper);
  const transformedCaseData = Object.entries(data).reduce((transformedData: Record<string, any>, [field, data1]) => {
    const [type] = field.split('_');
    const key = updateCaseDataMapper[type];

    if (caseDataMapperKeys.includes(type) && !transformedData[key]) {
      transformedData[key] = {};
    }

    if (transformedData[key]) {
      transformedData[key][field] = data1;
    }

    return transformedData;
  }, {});

  return JSON.stringify(transformedCaseData.respondingCitizenAoH, function (k, v) {
    return v === undefined ? null : v;
  });
};
const updateCaseDataMapper = {
  c1A: 'respondingCitizenAoH',
};

export const dataCleanUpForRespondentAbuse = (
  c1A_safetyConernAbout: C1ASafteyConcernsAbout[] | undefined,
  c1A_concernAboutRespondent: C1AAbuseTypes[] | undefined,
  data: Partial<CaseWithId>
): void => {
  if (
    c1A_safetyConernAbout?.includes(C1ASafteyConcernsAbout.RESPONDENT) &&
    !c1A_concernAboutRespondent?.includes(C1AAbuseTypes.PHYSICAL_ABUSE)
  ) {
    deleteAbuseData(data, 'physicalAbuse', 'respondent');
  }
  if (
    c1A_safetyConernAbout?.includes(C1ASafteyConcernsAbout.RESPONDENT) &&
    !c1A_concernAboutRespondent?.includes(C1AAbuseTypes.PSYCHOLOGICAL_ABUSE)
  ) {
    deleteAbuseData(data, 'psychologicalAbuse', 'respondent');
  }
  if (
    c1A_safetyConernAbout?.includes(C1ASafteyConcernsAbout.RESPONDENT) &&
    !c1A_concernAboutRespondent?.includes(C1AAbuseTypes.EMOTIONAL_ABUSE)
  ) {
    deleteAbuseData(data, 'emotionalAbuse', 'respondent');
  }
  if (
    c1A_safetyConernAbout?.includes(C1ASafteyConcernsAbout.RESPONDENT) &&
    !c1A_concernAboutRespondent?.includes(C1AAbuseTypes.FINANCIAL_ABUSE)
  ) {
    deleteAbuseData(data, 'financialAbuse', 'respondent');
  }
  if (
    c1A_safetyConernAbout?.includes(C1ASafteyConcernsAbout.RESPONDENT) &&
    !c1A_concernAboutRespondent?.includes(C1AAbuseTypes.SEXUAL_ABUSE)
  ) {
    deleteAbuseData(data, 'sexualAbuse', 'respondent');
  }
};

export const dataCleanUpForChildAbuse = (
  c1A_safetyConernAbout: C1ASafteyConcernsAbout[] | undefined,
  c1A_concernAboutChild: C1AAbuseTypes[] | undefined,
  data: Partial<CaseWithId>
): void => {
  if (
    c1A_safetyConernAbout?.includes(C1ASafteyConcernsAbout.CHILDREN) &&
    !c1A_concernAboutChild?.includes(C1AAbuseTypes.PHYSICAL_ABUSE)
  ) {
    deleteAbuseData(data, 'physicalAbuse', 'child');
  }
  if (
    c1A_safetyConernAbout?.includes(C1ASafteyConcernsAbout.CHILDREN) &&
    !c1A_concernAboutChild?.includes(C1AAbuseTypes.PSYCHOLOGICAL_ABUSE)
  ) {
    deleteAbuseData(data, 'psychologicalAbuse', 'child');
  }
  if (
    c1A_safetyConernAbout?.includes(C1ASafteyConcernsAbout.CHILDREN) &&
    !c1A_concernAboutChild?.includes(C1AAbuseTypes.EMOTIONAL_ABUSE)
  ) {
    deleteAbuseData(data, 'emotionalAbuse', 'child');
  }
  if (
    c1A_safetyConernAbout?.includes(C1ASafteyConcernsAbout.CHILDREN) &&
    !c1A_concernAboutChild?.includes(C1AAbuseTypes.FINANCIAL_ABUSE)
  ) {
    deleteAbuseData(data, 'financialAbuse', 'child');
  }
  if (
    c1A_safetyConernAbout?.includes(C1ASafteyConcernsAbout.CHILDREN) &&
    !c1A_concernAboutChild?.includes(C1AAbuseTypes.SEXUAL_ABUSE)
  ) {
    deleteAbuseData(data, 'sexualAbuse', 'child');
  }
};

const dataCleanUpForAbduction = (
  c1A_concernAboutChild: C1AAbuseTypes[] | undefined,
  data,
  c1A_possessionChildrenPassport: string[] | undefined,
  c1A_childAbductedBefore: YesOrNo | undefined,
  c1A_passportOffice: YesOrNo | undefined
): void => {
  if (!c1A_concernAboutChild?.includes(C1AAbuseTypes.ABDUCTION)) {
    deleteDataForAbduction(data);
  }
  if (!c1A_possessionChildrenPassport?.includes('otherPerson')) {
    data.c1A_provideOtherDetails = '';
  }

  if (c1A_childAbductedBefore === YesOrNo.NO) {
    deleteDataForPreviousAbductions(data);
  }

  if (c1A_passportOffice === YesOrNo.NO) {
    deleteDataForPassports(data);
  }
};

const dataCleanupForNoSafetyConcern = (c1A_haveSafetyConcerns: YesOrNo | undefined, data): void => {
  if (c1A_haveSafetyConcerns === YesOrNo.NO) {
    deleteDataForNoSafetyConcerns(data);
  }
};

export const deleteDataForNoSafetyConcerns = (caseData: Partial<CaseWithId>): void => {
  delete caseData.c1A_safetyConernAbout;
  delete caseData.c1A_concernAboutChild;
  delete caseData.c1A_concernAboutRespondent;
  delete caseData.c1A_keepingSafeStatement;
  delete caseData.c1A_supervisionAgreementDetails;
  delete caseData.c1A_agreementOtherWaysDetails;
  delete caseData.c1A_otherConcernsDrugs;
  delete caseData.c1A_otherConcernsDrugsDetails;
  delete caseData.c1A_childSafetyConcerns;
  delete caseData.c1A_childSafetyConcernsDetails;
  delete caseData.c1A_abductionReasonOutsideUk;
  delete caseData.c1A_childsCurrentLocation;
  delete caseData.c1A_childrenMoreThanOnePassport;
  delete caseData.c1A_possessionChildrenPassport;
  delete caseData.c1A_provideOtherDetails;
  delete caseData.c1A_passportOffice;
  delete caseData.c1A_abductionPassportOfficeNotified;
  delete caseData.c1A_previousAbductionsShortDesc;
  delete caseData.c1A_policeOrInvestigatorInvolved;
  delete caseData.c1A_policeOrInvestigatorOtherDetails;
  delete caseData.c1A_childAbductedBefore;
  delete caseData.c1A_safteyConcerns;
};

export const deleteDataForAbduction = (caseData: Partial<CaseWithId>): void => {
  delete caseData.c1A_abductionReasonOutsideUk;
  delete caseData.c1A_childsCurrentLocation;
  delete caseData.c1A_childrenMoreThanOnePassport;
  delete caseData.c1A_possessionChildrenPassport;
  delete caseData.c1A_provideOtherDetails;
  delete caseData.c1A_passportOffice;
  delete caseData.c1A_abductionPassportOfficeNotified;
  delete caseData.c1A_previousAbductionsShortDesc;
  delete caseData.c1A_policeOrInvestigatorInvolved;
  delete caseData.c1A_policeOrInvestigatorOtherDetails;
  delete caseData.c1A_childAbductedBefore;
};

export const deleteDataForPreviousAbductions = (caseData: Partial<CaseWithId>): void => {
  delete caseData.c1A_previousAbductionsShortDesc;
  delete caseData.c1A_policeOrInvestigatorInvolved;
  delete caseData.c1A_policeOrInvestigatorOtherDetails;
};

export const deleteDataForPassports = (caseData: Partial<CaseWithId>): void => {
  delete caseData.c1A_childrenMoreThanOnePassport;
  delete caseData.c1A_possessionChildrenPassport;
  delete caseData.c1A_abductionPassportOfficeNotified;
};

export const deleteAbuseData = (data: Partial<CaseWithId>, abuse: string, party: string): void => {
  if (data?.c1A_safteyConcerns?.[party]?.[abuse]) {
    delete data.c1A_safteyConcerns[party][abuse];
  }
};
