import { CaseWithId } from '../../app/case/case';
import {
  C100Applicant,
  C100FlowTypes,
  C100RebuildPartyDetails,
  C100SectionUrls,
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
    return C100FlowTypes.FLOW1;
  } else if (
    (caseData.hasOwnProperty('miam_otherProceedings') && caseData.miam_otherProceedings === YesOrNo.YES) ||
    req?.body.miam_otherProceedings === YesOrNo.YES ||
    (caseData.hasOwnProperty('miam_otherProceedings') &&
      caseData.miam_otherProceedings === YesOrNo.NO &&
      caseData.hasOwnProperty('miam_attendance') &&
      caseData.miam_attendance === YesOrNo.YES &&
      caseData.miam_haveDocSigned !== undefined &&
      caseData.miam_haveDocSigned === YesOrNo.YES &&
      (caseData.miam_certificate !== undefined || req?.body.miam_certificate !== undefined))
  ) {
    return C100FlowTypes.FLOW2;
  } else if (isMiamUrgencyValid(caseData)) {
    return C100FlowTypes.FLOW3;
  } else {
    return C100FlowTypes.FLOW4;
  }
};

export const isC100ApplicationValid = (caseData: CaseWithId, req: AppRequest): boolean => {
  const hasC100ApplicationBeenCompleted = req.session.applicationSettings?.hasC100ApplicationBeenCompleted;
  //check at navigation controllers as well
  if (req.session.enableC100CaseProgressionTrainTrack) {
    const flow = getC100FlowType(caseData, req);
    switch (flow) {
      case C100FlowTypes.FLOW1:
        return hasC100ApplicationBeenCompleted && !req.originalUrl.includes('check-your-answers')
          ? isCurrentSectionValid(req.originalUrl, caseData, flow1Sections)
          : isC100Flow1Valid(caseData);
      case C100FlowTypes.FLOW2:
        return hasC100ApplicationBeenCompleted && !req.originalUrl.includes('check-your-answers')
          ? isCurrentSectionValid(req.originalUrl, caseData, flow2Sections)
          : isC100Flow2Valid(caseData);
      case C100FlowTypes.FLOW3:
        return hasC100ApplicationBeenCompleted && !req.originalUrl.includes('check-your-answers')
          ? isCurrentSectionValid(req.originalUrl, caseData, flow3Sections)
          : isC100Flow3Valid(caseData);
      case C100FlowTypes.FLOW4:
        return hasC100ApplicationBeenCompleted && !req.originalUrl.includes('check-your-answers')
          ? isCurrentSectionValid(req.originalUrl, caseData, flow4Sections)
          : isC100Flow4Valid(caseData);
      default:
        return false;
    }
  } else {
    return false;
  }
};

const isC100Flow1Valid = (caseData: CaseWithId): boolean => {
  return isConsentOrderValid(caseData) && isCommonFlowValid(caseData);
};

const isC100Flow2Valid = (caseData: CaseWithId): boolean => {
  return (
    isCommonFlowValid(caseData) &&
    (isMiamOtherProceedingsValid(caseData) || isMiamAttendanceValid(caseData)) &&
    isScreeningQuestionsValid(caseData)
  );
};

const isC100Flow3Valid = (caseData: CaseWithId): boolean => {
  return isCommonFlowValid(caseData) && isMiamUrgencyValid(caseData) && isScreeningQuestionsValid(caseData);
};

const isC100Flow4Valid = (caseData: CaseWithId): boolean => {
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

type Section = { section: C100SectionUrls; function: (caseData: CaseWithId) => boolean };

const commonSections: Section[] = [
  { section: C100SectionUrls.typeOfOrder, function: isTypeOfOrderValid },
  { section: C100SectionUrls.urgency, function: isUrgentHearingValid },
  { section: C100SectionUrls.withoutNotice, function: isHearingWithoutNoticeValid },
  { section: C100SectionUrls.people, function: isPeopleSectionValid },
  { section: C100SectionUrls.otherProceedings, function: isOtherProceedingsValid },
  { section: C100SectionUrls.safetyConcerns, function: isSafetyConcernsValid },
  { section: C100SectionUrls.internationalElement, function: isInternationalElementsValid },
  { section: C100SectionUrls.reasonableAdjustments, function: isReasonableAdjustmentsValid },
  { section: C100SectionUrls.helpWithFees, function: isHWFValid },
];

const flow1Sections: Section[] = [
  {
    section: C100SectionUrls.typeOfOrder,
    function: caseData => isTypeOfOrderValid(caseData) && isConsentOrderValid(caseData),
  },
  { section: C100SectionUrls.consentOrder, function: isConsentOrderValid },
  ...commonSections,
];
const flow2Sections: Section[] = [
  ...commonSections,
  {
    section: C100SectionUrls.screeningQuestions,
    function: caseData =>
      isScreeningQuestionsValid(caseData) && (isMiamOtherProceedingsValid(caseData) || isMiamAttendanceValid(caseData)),
  },
  {
    section: C100SectionUrls.miam,
    function: caseData => isMiamOtherProceedingsValid(caseData) || isMiamAttendanceValid(caseData),
  },
];
const flow3Sections: Section[] = [
  ...commonSections,
  {
    section: C100SectionUrls.screeningQuestions,
    function: caseData => isScreeningQuestionsValid(caseData) && isMiamUrgencyValid(caseData),
  },
  { section: C100SectionUrls.miam, function: isMiamUrgencyValid },
];
const flow4Sections: Section[] = [
  ...commonSections,
  {
    section: C100SectionUrls.screeningQuestions,
    function: caseData => isScreeningQuestionsValid(caseData) && isMiamExemptionsValid(caseData),
  },
  { section: C100SectionUrls.miam, function: isMiamExemptionsValid },
];

const isCurrentSectionValid = (currentUrl: string, caseData: CaseWithId, sections: Section[]): boolean => {
  let currentSection;
  if (
    currentUrl.includes('child-details') ||
    currentUrl.includes('applicant') ||
    currentUrl.includes('respondent') ||
    currentUrl.includes('other-person-details')
  ) {
    currentSection = C100SectionUrls.people;
  } else {
    currentSection = currentUrl.split('/')[2];
  }

  return sections.find(section => section.section === currentSection)?.function(caseData) ?? false;
};
