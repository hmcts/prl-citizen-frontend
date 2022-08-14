import { CaseWithId } from '../../../app/case/case';
import { SectionStatus } from '../../../app/case/definition';

export const getKeepYourDetailsPrivateStatus = (userCase: CaseWithId): SectionStatus => {
  if (userCase?.detailsKnown && userCase?.startAlternative) {
    return SectionStatus.COMPLETED;
  }
  if (userCase?.detailsKnown || userCase?.startAlternative) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.TO_DO;
};

export const getConfirmOrEditYourContactDetails = (userCase: CaseWithId): SectionStatus => {
  if (userCase?.confirmcontactdetails) {
    return SectionStatus.COMPLETED;
  }
  if (userCase?.confirmcontactdetails) {
    return SectionStatus.IN_PROGRESS;
  }
  return SectionStatus.TO_DO;
};

export const getYourApplication = (userCase: CaseWithId): SectionStatus => {
  console.log(userCase);
  return SectionStatus.DOWNLOAD;
};

export const getViewAllDocuments = (userCase: CaseWithId): SectionStatus => {
  console.log('applicant getViewAllDocuments: ' + userCase);
  return SectionStatus.READY_TO_VIEW;
};

export const getApplicantViewAllOrdersFromTheCourtAllDocuments = (userCase: CaseWithId): boolean => {
  let flag = false;
  if (userCase && userCase.orderCollection && userCase.orderCollection.length > 0) {
    flag = true;
  }
  return flag;
};
export const getApplicantResponseToRequestForChildArrangements = (userCase: CaseWithId): boolean => {
  let flag = false;
  if (userCase && userCase.childrenKnownToLocalAuthority) {
    flag = true;
  }
  return flag;
};
export const getApplicantAllegationsOfHarmAndViolence = (userCase: CaseWithId): boolean => {
  let flag = false;
  if (userCase && userCase.allegationsOfHarmYesNo) {
    flag = true;
  }
  return flag;
};
