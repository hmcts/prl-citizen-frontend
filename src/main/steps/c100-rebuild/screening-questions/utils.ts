import { CaseWithId } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { cleanMiamForOtherProceedings } from '../miam/util';

export const cleanConsentAgreement = (caseData: CaseWithId, writtenAgreement: YesOrNo | undefined): CaseWithId => {
  if (writtenAgreement === YesOrNo.YES) {
    delete caseData.sq_legalRepresentation;
    delete caseData.sq_legalRepresentationApplication;
    delete caseData.sq_courtPermissionRequired;
    caseData = cleanPermissions(caseData);
    delete caseData.miam_otherProceedings;
    caseData = cleanMiamForOtherProceedings(caseData);
  } else {
    //delete consent order
    delete caseData.co_certificate;
  }
  return caseData;
};

export const cleanPermissions = (caseData: CaseWithId): CaseWithId => {
  delete caseData.sq_permissionsRequest;
  delete caseData.sq_permissionsWhy;
  delete caseData.sq_doNotHaveParentalResponsibility_subfield;
  delete caseData.sq_courtOrderPrevent_subfield;
  delete caseData.sq_anotherReason_subfield;
  return caseData;
};

export const cleanPermissionsWhy = (caseData: CaseWithId, permissionsWhy: string[] | undefined): CaseWithId => {
  if (!permissionsWhy?.includes('doNotHaveParentalResponsibility')) {
    delete caseData.sq_doNotHaveParentalResponsibility_subfield;
  }
  if (!permissionsWhy?.includes('courtOrderPrevent')) {
    delete caseData.sq_courtOrderPrevent_subfield;
    if (caseData.sq_uploadDocument_subfield) {
      delete caseData.sq_uploadDocument_subfield;
    }
  }
  if (!permissionsWhy?.includes('anotherReason')) {
    delete caseData.sq_anotherReason_subfield;
  }

  return caseData;
};
