import _ from 'lodash';

import { CaseWithId } from '../../../app/case/case';
import { C100Applicant, ChildrenDetails, YesNoEmpty, YesOrNo } from '../../../app/case/definition';
import { isEmailValid, isPhoneNoValid } from '../../../app/form/validation';

export const isNameSectionValid = (applicant: C100Applicant): boolean => {
  return !_.isEmpty(applicant.applicantFirstName) && !_.isEmpty(applicant.applicantLastName);
};

export const isRefugeAndConfidentialitySectionValid = (applicant: C100Applicant): boolean => {
  if (_.isEmpty(applicant.liveInRefuge)) {
    return false;
  }

  if (applicant.liveInRefuge === YesOrNo.YES) {
    if (_.isEmpty(applicant.refugeConfidentialityC8Form)) {
      return false;
    }
  } else {
    if (_.isEmpty(applicant.detailsKnown)) {
      return false;
    }

    const hasStartFlag = !_.isEmpty(applicant.start) || !_.isEmpty(applicant.startAlternative);
    if (!hasStartFlag) {
      return false;
    }

    if (applicant.startAlternative === YesOrNo.YES && _.isEmpty(applicant.contactDetailsPrivateAlternative)) {
      return false;
    }

    if (applicant.start === YesOrNo.YES && _.isEmpty(applicant.contactDetailsPrivate)) {
      return false;
    }
  }

  return true;
};

export const isPersonalDetailsSectionValid = (applicant: C100Applicant): boolean => {
  const pd = applicant.personalDetails;

  if (_.isEmpty(pd)) {
    return false;
  }

  if (_.isEmpty(pd.haveYouChangeName)) {
    return false;
  }

  if (pd.haveYouChangeName === YesNoEmpty.YES && _.isEmpty(pd.applPreviousName)) {
    return false;
  }

  return !(_.isEmpty(pd.gender) || _.isEmpty(pd.dateOfBirth) || _.isEmpty(pd.applicantPlaceOfBirth));
};

export const isRelationshipToChildrenSectionValid = (
  applicant: C100Applicant,
  children: ChildrenDetails[]
): boolean => {
  const rel = applicant.relationshipDetails?.relationshipToChildren;

  return Array.isArray(rel) && rel.length === children.length;
};

export const isAddressSectionValid = (applicant: C100Applicant): boolean => {
  return !(
    _.isEmpty(applicant.applicantAddress1) ||
    _.isEmpty(applicant.applicantAddressTown) ||
    _.isEmpty(applicant.country) ||
    _.isEmpty(applicant.applicantAddressHistory) ||
    (applicant.applicantAddressHistory === YesOrNo.YES &&
      _.isEmpty(applicant.applicantProvideDetailsOfPreviousAddresses))
  );
};

export const isContactDetailsSectionValid = (applicant: C100Applicant): boolean => {
  const cd = applicant.applicantContactDetail;

  if (_.isEmpty(cd)) {
    return false;
  }

  if (
    _.isEmpty(cd.canProvideEmail) ||
    (cd.canProvideEmail === YesOrNo.YES && (_.isEmpty(cd.emailAddress) || isEmailValid(cd.emailAddress) === 'invalid'))
  ) {
    return false;
  }

  if (
    _.isEmpty(cd.canProvideTelephoneNumber) ||
    (cd.canProvideTelephoneNumber === YesOrNo.YES &&
      (_.isEmpty(cd.telephoneNumber) || isPhoneNoValid(cd.telephoneNumber) === 'invalid'))
  ) {
    return false;
  }

  return !(cd.canProvideTelephoneNumber === YesOrNo.NO && _.isEmpty(cd.canNotProvideTelephoneNumberReason));
};

export const isContactPreferencesSectionValid = (applicant: C100Applicant): boolean => {
  const cd = applicant.applicantContactDetail;

  if (_.isEmpty(cd)) {
    return false;
  }

  return !_.isEmpty(cd.canLeaveVoiceMail) && !_.isEmpty(cd.applicantContactPreferences);
};

const isApplicantValid = (applicant: C100Applicant, children: ChildrenDetails[]): boolean => {
  return (
    isNameSectionValid(applicant) &&
    isRefugeAndConfidentialitySectionValid(applicant) &&
    isPersonalDetailsSectionValid(applicant) &&
    isRelationshipToChildrenSectionValid(applicant, children) &&
    isAddressSectionValid(applicant) &&
    isContactDetailsSectionValid(applicant) &&
    isContactPreferencesSectionValid(applicant)
  );
};

export const areApplicantsValid = (caseData: CaseWithId): boolean =>
  caseData?.appl_allApplicants?.every(applicant => isApplicantValid(applicant, caseData.cd_children ?? [])) ?? false;
