import { Case, CaseWithId } from '../../../app/case/case';
import { MiamNonAttendReason } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';

export const isAllowed = (reason: MiamNonAttendReason, caseData: Partial<Case>): boolean =>
  (caseData?.miam_nonAttendanceReasons ?? []).includes(reason);

export const removeEvidenceDocErrors = (req: AppRequest, evidenceDocumentType: string): void => {
  req.session.errors = req.session?.errors?.length
    ? req.session.errors?.filter(error => error.propertyName !== evidenceDocumentType)
    : [];
};

export const handleEvidenceDocError = (errorType: string, req: AppRequest, evidenceDocumentType: string): void => {
  req.session.errors = req.session?.errors?.length
    ? [...req.session.errors, { errorType, propertyName: evidenceDocumentType }]
    : [{ errorType, propertyName: evidenceDocumentType }];
};

export const cleanMiamForOtherProceedings = (caseData: CaseWithId): CaseWithId => {
  delete caseData.miam_consent;
  delete caseData.miam_attendance;
  caseData = cleanMiamValidReason(caseData);
  caseData = cleanMiamDocument(caseData);
  return caseData;
};

export const cleanMiamValidReason = (caseData: CaseWithId): CaseWithId => {
  delete caseData.miam_validReason;
  caseData = cleanMiamExemptions(caseData);
  return caseData;
};

export const cleanMiamDocument = (caseData: CaseWithId): CaseWithId => {
  delete caseData.miam_haveDocSigned;
  delete caseData.miam_certificate;
  return caseData;
};

export const cleanMiamExemptions = (caseData: CaseWithId): CaseWithId => {
  caseData.miam_nonAttendanceReasons = [];
  caseData = cleanMiamDAExemptions(caseData);
  delete caseData.miam_childProtectionEvidence;
  delete caseData.miam_urgency;
  caseData = cleanMiamNCDRExemptions(caseData);
  delete caseData.miam_notAttendingReasons;
  caseData = cleanMiamNoMediatorReasons(caseData);
  return caseData;
};

export const cleanMiamDAExemptions = (caseData: CaseWithId): CaseWithId => {
  caseData.miam_domesticAbuse = [];
  caseData.miam_domesticAbuse_policeInvolvement_subfields = [];
  caseData.miam_domesticAbuse_courtInvolvement_subfields = [];
  caseData.miam_domesticAbuse_letterOfBeingVictim_subfields = [];
  caseData.miam_domesticAbuse_letterFromAuthority_subfields = [];
  caseData.miam_domesticAbuse_letterFromSupportService_subfields = [];
  delete caseData.miam_canProvideDomesticAbuseEvidence;
  delete caseData.miam_detailsOfDomesticAbuseEvidence;
  caseData.miam_domesticAbuseEvidenceDocs = []; //check this
  return caseData;
};

export const cleanMiamNCDRExemptions = (caseData: CaseWithId): CaseWithId => {
  delete caseData.miam_previousAttendance;
  caseData = cleanMiamHaveDocForPrevAttendance(caseData);
  delete caseData.miam_previousAttendanceEvidenceDoc;
  return caseData;
};

export const cleanMiamHaveDocForPrevAttendance = (caseData: CaseWithId): CaseWithId => {
  delete caseData.miam_haveDocSignedByMediatorForPrevAttendance;
  delete caseData.miam_detailsOfEvidence;
  return caseData;
};

export const cleanMiamNoMediatorReasons = (caseData: CaseWithId): CaseWithId => {
  delete caseData.miam_noMediatorReasons;
  delete caseData.miam_noAppointmentAvailableDetails;
  delete caseData.miam_unableToAttainDueToDisablityDetails;
  return caseData;
};

export const cleanUnselectedMiamExemptions = (
  caseData: CaseWithId,
  nonAttendanceReasons: MiamNonAttendReason[] | undefined
): CaseWithId => {
  if (!nonAttendanceReasons?.includes(MiamNonAttendReason.DOMESTIC)) {
    caseData = {
      ...cleanMiamDAExemptions(caseData),
    };
  }
  if (!nonAttendanceReasons?.includes(MiamNonAttendReason.CHILD_PROTECTION)) {
    delete caseData.miam_childProtectionEvidence;
  }
  if (!nonAttendanceReasons?.includes(MiamNonAttendReason.URGENT)) {
    delete caseData.miam_urgency;
  }
  if (!nonAttendanceReasons?.includes(MiamNonAttendReason.PREV_MIAM)) {
    caseData = {
      ...cleanMiamNCDRExemptions(caseData),
    };
  }
  if (!nonAttendanceReasons?.includes(MiamNonAttendReason.EXEMPT)) {
    caseData = {
      ...cleanMiamNoMediatorReasons(caseData),
    };
    delete caseData.miam_notAttendingReasons;
  }

  return caseData;
};
