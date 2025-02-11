import { CaseWithId } from '../../app/case/case';
import {
  C100Applicant,
  C100FlowTypes,
  C100RebuildPartyDetails,
  C100SectionUrlName,
  C1AAbuseTypes,
  MiamNonAttendReason,
  YesOrNo,
} from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';

export const getC100FlowType = (caseData: CaseWithId, req?: AppRequest): C100FlowTypes => {
  if (
    (caseData.hasOwnProperty('sq_writtenAgreement') && caseData.sq_writtenAgreement === YesOrNo.YES) ||
    req?.body.sq_writtenAgreement === YesOrNo.YES
  ) {
    return C100FlowTypes.C100_WITH_CONSENT_ORDER;
  } else if (
    (caseData.hasOwnProperty('miam_otherProceedings') && caseData.miam_otherProceedings === YesOrNo.YES) ||
    req?.body.miam_otherProceedings === YesOrNo.YES
  ) {
    return C100FlowTypes.C100_WITH_MIAM_OTHER_PROCEEDINGS_OR_ATTENDANCE;
  } else if (isMiamUrgencyValid(caseData)) {
    return C100FlowTypes.C100_WITH_MIAM_URGENCY;
  } else {
    return C100FlowTypes.C100_WITH_MIAM;
  }
};

export const isC100ApplicationValid = (caseData: CaseWithId, req: AppRequest): boolean => {
  const hasC100ApplicationBeenCompleted = req.session.applicationSettings?.hasC100ApplicationBeenCompleted;
  if (req.session.enableC100CaseProgressionTrainTrack) {
    const flow = getC100FlowType(caseData, req);
    switch (flow) {
      case C100FlowTypes.C100_WITH_CONSENT_ORDER:
        return validateC100Flow(
          caseData,
          req.originalUrl,
          hasC100ApplicationBeenCompleted,
          c100WithConsentOrderSections,
          isC100WithConsentOrderFlowValid
        );
      case C100FlowTypes.C100_WITH_MIAM_OTHER_PROCEEDINGS_OR_ATTENDANCE:
        return validateC100Flow(
          caseData,
          req.originalUrl,
          hasC100ApplicationBeenCompleted,
          c100WithMiamOtherProceedingsSections,
          isC100WithMiamOtherProceedingsFlowValid
        );
      case C100FlowTypes.C100_WITH_MIAM_URGENCY:
        return validateC100Flow(
          caseData,
          req.originalUrl,
          hasC100ApplicationBeenCompleted,
          c100WithMiamUrgencySections,
          isC100WithMiamUrgencyFlowValid
        );
      case C100FlowTypes.C100_WITH_MIAM:
        return validateC100Flow(
          caseData,
          req.originalUrl,
          hasC100ApplicationBeenCompleted,
          c100WithMiamSections,
          isC100MiamFlowValid
        );
      default:
        return false;
    }
  } else {
    return false;
  }
};

const validateC100Flow = (
  caseData: CaseWithId,
  url: string,
  hasC100ApplicationBeenCompleted: boolean,
  sections: Section[],
  flowValidation: (caseData: CaseWithId) => boolean
): boolean => {
  if (hasC100ApplicationBeenCompleted && !url.includes('check-your-answers')) {
    return isCurrentSectionValid(url, caseData, sections);
  } else {
    return flowValidation(caseData);
  }
};

const isC100WithConsentOrderFlowValid = (caseData: CaseWithId): boolean => {
  return isConsentOrderValid(caseData) && isCommonFlowValid(caseData);
};

const isC100WithMiamOtherProceedingsFlowValid = (caseData: CaseWithId): boolean => {
  return (
    isCommonFlowValid(caseData) &&
    (isMiamOtherProceedingsValid(caseData) || isMiamAttendanceValid(caseData)) &&
    isScreeningQuestionsValid(caseData)
  );
};

const isC100WithMiamUrgencyFlowValid = (caseData: CaseWithId): boolean => {
  return isCommonFlowValid(caseData) && isMiamUrgencyValid(caseData) && isScreeningQuestionsValid(caseData);
};

const isC100MiamFlowValid = (caseData: CaseWithId): boolean => {
  return isCommonFlowValid(caseData) && isMiamExemptionsValid(caseData) && isScreeningQuestionsValid(caseData);
};

const isCommonFlowValid = (caseData: CaseWithId): boolean => {
  return (
    isTypeOfOrderValid(caseData) &&
    isUrgentHearingValid(caseData) &&
    isHearingWithoutNoticeValid(caseData) &&
    isPeopleSectionValid(caseData) &&
    isOtherProceedingsValid(caseData) &&
    isSafetyConcernsValid(caseData) &&
    isInternationalElementsValid(caseData) &&
    isReasonableAdjustmentsValid(caseData) &&
    isHWFValid(caseData)
  );
};

const isPeopleSectionValid = (caseData: CaseWithId): boolean => {
  return (
    areChildDetailsValid(caseData) &&
    areOtherChildDetailsValid(caseData) &&
    isApplicantSectionValid(caseData) &&
    isRespondentSectionValid(caseData) &&
    isOtherPersonSectionValid(caseData)
  );
};

// check subfields
const isScreeningQuestionsValid = (caseData: CaseWithId): boolean => {
  return (
    caseData.sq_writtenAgreement !== undefined &&
    caseData.sq_legalRepresentation !== undefined &&
    caseData.sq_courtPermissionRequired !== undefined &&
    (caseData.sq_courtPermissionRequired === YesOrNo.NO ||
      (caseData.sq_courtPermissionRequired === YesOrNo.YES && caseData.sq_permissionsRequest !== undefined))
  );
};

const isTypeOfOrderValid = (caseData: CaseWithId): boolean => {
  return (
    caseData.too_courtOrder !== undefined &&
    caseData.too_courtOrder.length > 0 &&
    caseData.too_shortStatement !== undefined
  );
};

const isConsentOrderValid = (caseData: CaseWithId): boolean => {
  return caseData.co_certificate !== undefined;
};

const isUrgentHearingValid = (caseData: CaseWithId): boolean => {
  return (
    caseData.hu_urgentHearingReasons !== undefined &&
    (caseData.hu_urgentHearingReasons === YesOrNo.NO ||
      (caseData.hu_urgentHearingReasons === YesOrNo.YES &&
        caseData.hu_reasonOfUrgentHearing !== undefined &&
        caseData.hu_reasonOfUrgentHearing.length > 0))
  );
};

const isHearingWithoutNoticeValid = (caseData: CaseWithId): boolean => {
  return (
    caseData.hwn_hearingPart1 !== undefined &&
    (caseData.hwn_hearingPart1 === YesOrNo.NO ||
      (caseData.hwn_hearingPart1 === YesOrNo.YES && caseData.hwn_reasonsForApplicationWithoutNotice !== undefined))
  );
};

const areChildDetailsValid = (caseData: CaseWithId): boolean => {
  return (
    caseData.cd_children !== undefined &&
    caseData.cd_children.length > 0 &&
    caseData.cd_children.every(
      child =>
        child.firstName !== undefined &&
        child.personalDetails?.isDateOfBirthUnknown !== undefined &&
        child.liveWith !== undefined &&
        child.liveWith.length > 0 &&
        child.mainlyLiveWith !== undefined
    )
  );
};

const areOtherChildDetailsValid = (caseData: CaseWithId): boolean => {
  return (
    caseData.ocd_hasOtherChildren !== undefined &&
    (caseData.ocd_hasOtherChildren === YesOrNo.NO ||
      (caseData.ocd_hasOtherChildren === YesOrNo.YES &&
        caseData.ocd_otherChildren !== undefined &&
        caseData.ocd_otherChildren.length > 0))
  );
};

const isApplicantSectionValid = (caseData: CaseWithId): boolean => {
  return (
    caseData.appl_allApplicants !== undefined &&
    caseData.appl_allApplicants.length > 0 &&
    areApplicantsValid(caseData.appl_allApplicants)
  );
};

const areApplicantsValid = (applicants: C100Applicant[]): boolean => {
  return applicants.every(
    applicant =>
      applicant.applicantAddress1 !== undefined &&
      applicant.applicantFirstName !== undefined &&
      applicant.applicantLastName !== undefined &&
      applicant.contactDetailsPrivate !== undefined &&
      applicant.applicantContactDetail?.canLeaveVoiceMail !== undefined &&
      applicant.relationshipDetails?.relationshipToChildren !== undefined
  );
};

const isRespondentSectionValid = (caseData: CaseWithId): boolean => {
  return (
    caseData.resp_Respondents !== undefined &&
    caseData.resp_Respondents.length > 0 &&
    areRespondentsValid(caseData.resp_Respondents)
  );
};

const areRespondentsValid = (respondents: C100RebuildPartyDetails[]): boolean => {
  return respondents.every(
    respondent =>
      respondent.address?.AddressLine1 !== undefined &&
      respondent.firstName !== undefined &&
      respondent.lastName !== undefined &&
      respondent.contactDetails !== undefined &&
      respondent.relationshipDetails?.relationshipToChildren !== undefined
  );
};

const isOtherPersonSectionValid = (caseData: CaseWithId): boolean => {
  return (
    caseData.oprs_otherPersonCheck !== undefined &&
    (caseData.oprs_otherPersonCheck === YesOrNo.NO ||
      (caseData.oprs_otherPersonCheck === YesOrNo.YES &&
        caseData.oprs_otherPersons !== undefined &&
        caseData.oprs_otherPersons.length > 0 &&
        areRespondentsValid(caseData.oprs_otherPersons)))
  );
};

const isOtherProceedingsValid = (caseData: CaseWithId): boolean => {
  return (
    caseData.op_courtOrderProtection !== undefined &&
    caseData.op_childrenInvolvedCourtCase !== undefined &&
    ((caseData.op_childrenInvolvedCourtCase === YesOrNo.NO && caseData.op_courtOrderProtection === YesOrNo.NO) ||
      ((caseData.op_childrenInvolvedCourtCase === YesOrNo.YES || caseData.op_courtOrderProtection === YesOrNo.YES) &&
        caseData.op_courtProceedingsOrders !== undefined &&
        caseData.op_courtProceedingsOrders.length > 0 &&
        caseData.op_otherProceedings !== undefined))
  );
};

const isMiamOtherProceedingsValid = (caseData: CaseWithId): boolean => {
  return caseData.miam_otherProceedings !== undefined && caseData.miam_otherProceedings === YesOrNo.YES;
};

const isMiamAttendanceValid = (caseData: CaseWithId): boolean => {
  return (
    caseData.miam_attendance !== undefined &&
    caseData.miam_attendance === YesOrNo.YES &&
    caseData.miam_haveDocSigned !== undefined &&
    caseData.miam_haveDocSigned === YesOrNo.YES &&
    caseData.miam_certificate !== undefined
  );
};

const isMiamExemptionsValid = (caseData: CaseWithId): boolean => {
  return (
    caseData.miam_nonAttendanceReasons !== undefined &&
    caseData.miam_nonAttendanceReasons.length > 0 &&
    !caseData.miam_nonAttendanceReasons.includes(MiamNonAttendReason.NONE) &&
    (caseData.miam_nonAttendanceReasons.includes(MiamNonAttendReason.DOMESTIC)
      ? isDomesticAbuseValid(caseData)
      : true) &&
    (caseData.miam_nonAttendanceReasons.includes(MiamNonAttendReason.CHILD_PROTECTION)
      ? caseData.miam_childProtectionEvidence !== undefined
      : true) &&
    (caseData.miam_nonAttendanceReasons.includes(MiamNonAttendReason.URGENT)
      ? caseData.miam_urgency !== undefined
      : true) &&
    (caseData.miam_nonAttendanceReasons.includes(MiamNonAttendReason.PREV_MIAM) ? isMiamNCDRValid(caseData) : true) &&
    (caseData.miam_nonAttendanceReasons.includes(MiamNonAttendReason.EXEMPT)
      ? caseData.miam_notAttendingReasons !== undefined
      : true)
  );
};

const isDomesticAbuseValid = (caseData: CaseWithId): boolean => {
  return (
    caseData.miam_domesticAbuse !== undefined &&
    caseData.miam_domesticAbuse.length > 0 &&
    caseData.miam_canProvideDomesticAbuseEvidence !== undefined
  );
};

const isMiamNCDRValid = (caseData: CaseWithId): boolean => {
  return (
    caseData.miam_previousAttendance !== undefined &&
    caseData.miam_haveDocSignedByMediatorForPrevAttendance !== undefined
  );
};

const isSafetyConcernsValid = (caseData: CaseWithId) => {
  return (
    caseData.c1A_haveSafetyConcerns === YesOrNo.NO ||
    (caseData.c1A_safetyConernAbout !== undefined &&
      caseData.c1A_safetyConernAbout.length > 0 &&
      caseData.c1A_safteyConcerns !== undefined &&
      isAbductionValid(caseData) &&
      caseData.c1A_otherConcernsDrugs !== undefined &&
      caseData.c1A_childSafetyConcerns !== undefined &&
      caseData.c1A_agreementOtherWaysDetails !== undefined)
  );
};

const isAbductionValid = (caseData: CaseWithId) => {
  return caseData.c1A_concernAboutChild?.includes(C1AAbuseTypes.ABDUCTION)
    ? caseData.c1A_abductionReasonOutsideUk !== undefined &&
        caseData.c1A_childsCurrentLocation !== undefined &&
        caseData.c1A_passportOffice !== undefined &&
        (caseData.c1A_passportOffice === YesOrNo.NO ||
          (caseData.c1A_passportOffice === YesOrNo.YES &&
            caseData.c1A_childrenMoreThanOnePassport !== undefined &&
            caseData.c1A_possessionChildrenPassport !== undefined &&
            caseData.c1A_possessionChildrenPassport.length > 0 &&
            caseData.c1A_abductionPassportOfficeNotified !== undefined)) &&
        caseData.c1A_childAbductedBefore !== undefined &&
        (caseData.c1A_childAbductedBefore === YesOrNo.NO ||
          (caseData.c1A_childAbductedBefore === YesOrNo.YES &&
            caseData.c1A_previousAbductionsShortDesc !== undefined &&
            caseData.c1A_policeOrInvestigatorInvolved !== undefined))
    : true;
};

const isReasonableAdjustmentsValid = (caseData: CaseWithId) => {
  return (
    caseData.ra_typeOfHearing !== undefined &&
    caseData.ra_typeOfHearing.length > 0 &&
    caseData.ra_disabilityRequirements !== undefined &&
    caseData.ra_disabilityRequirements.length > 0
  );
};

const isInternationalElementsValid = (caseData: CaseWithId) => {
  return caseData.ie_internationalStart !== undefined && caseData.ie_internationalRequest !== undefined;
};

const isHWFValid = (caseData: CaseWithId) => {
  return (
    caseData.hwf_needHelpWithFees !== undefined &&
    (caseData.hwf_needHelpWithFees === YesOrNo.NO ||
      (caseData.hwf_feesAppliedDetails !== undefined &&
        caseData.hwf_feesAppliedDetails === YesOrNo.YES &&
        caseData.helpWithFeesReferenceNumber !== undefined))
  );
};

const isMiamUrgencyValid = (caseData: CaseWithId) => {
  return (
    caseData.miam_nonAttendanceReasons !== undefined &&
    caseData.miam_nonAttendanceReasons.includes(MiamNonAttendReason.URGENT) &&
    caseData.miam_urgency !== undefined
  );
};

type Section = { section: C100SectionUrlName; function: (caseData: CaseWithId) => boolean };

const commonSections: Section[] = [
  { section: C100SectionUrlName.TYPE_OF_ORDER, function: isTypeOfOrderValid },
  { section: C100SectionUrlName.URGENCY, function: isUrgentHearingValid },
  { section: C100SectionUrlName.WITHOUT_NOTICE, function: isHearingWithoutNoticeValid },
  { section: C100SectionUrlName.PEOPLE, function: isPeopleSectionValid },
  { section: C100SectionUrlName.OTHER_PROCEEDINGS, function: isOtherProceedingsValid },
  { section: C100SectionUrlName.SAFETY_CONCERNS, function: isSafetyConcernsValid },
  { section: C100SectionUrlName.INTERNATIONAL_ELEMENT, function: isInternationalElementsValid },
  { section: C100SectionUrlName.REASONABLE_ADJUSTMENTS, function: isReasonableAdjustmentsValid },
  { section: C100SectionUrlName.HELP_WITH_FEES, function: isHWFValid },
];

const c100WithConsentOrderSections: Section[] = [
  {
    section: C100SectionUrlName.SCREENING_QUESTIONS,
    function: caseData => caseData.sq_writtenAgreement === YesOrNo.YES && isConsentOrderValid(caseData),
  },
  {
    section: C100SectionUrlName.TYPE_OF_ORDER,
    function: caseData => isTypeOfOrderValid(caseData) && isConsentOrderValid(caseData),
  },
  { section: C100SectionUrlName.CONSENT_ORDER, function: isConsentOrderValid },
  ...commonSections,
];
const c100WithMiamOtherProceedingsSections: Section[] = [
  ...commonSections,
  {
    section: C100SectionUrlName.SCREENING_QUESTIONS,
    function: caseData => isScreeningQuestionsValid(caseData) && isMiamOtherProceedingsValid(caseData),
  },
  {
    section: C100SectionUrlName.MIAM,
    function: isMiamOtherProceedingsValid,
  },
];
const c100WithMiamUrgencySections: Section[] = [
  ...commonSections,
  {
    section: C100SectionUrlName.SCREENING_QUESTIONS,
    function: caseData => isScreeningQuestionsValid(caseData) && isMiamUrgencyValid(caseData),
  },
  { section: C100SectionUrlName.MIAM, function: isMiamUrgencyValid },
];
const c100WithMiamSections: Section[] = [
  ...commonSections,
  {
    section: C100SectionUrlName.SCREENING_QUESTIONS,
    function: caseData =>
      isScreeningQuestionsValid(caseData) && (isMiamExemptionsValid(caseData) || isMiamAttendanceValid(caseData)),
  },
  {
    section: C100SectionUrlName.MIAM,
    function: caseData => isMiamExemptionsValid(caseData) || isMiamAttendanceValid(caseData),
  },
];

const isCurrentSectionValid = (currentUrl: string, caseData: CaseWithId, sections: Section[]): boolean => {
  let currentSection: C100SectionUrlName;
  if (
    currentUrl.includes('child-details') ||
    currentUrl.includes('applicant') ||
    currentUrl.includes('respondent') ||
    currentUrl.includes('other-person-details')
  ) {
    currentSection = C100SectionUrlName.PEOPLE;
  } else {
    currentSection = currentUrl.split('/')[2] as C100SectionUrlName;
  }

  return sections.find(section => section.section === currentSection)?.function(caseData) ?? false;
};
