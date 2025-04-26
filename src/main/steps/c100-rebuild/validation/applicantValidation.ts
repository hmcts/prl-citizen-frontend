import _ from 'lodash';

import { CaseWithId } from '../../../app/case/case';
import { C100Applicant, ChildrenDetails, YesNoEmpty, YesOrNo } from '../../../app/case/definition';
import { isEmailValid, isPhoneNoValid } from '../../../app/form/validation';

const isApplicantValid = (applicant: C100Applicant, children: ChildrenDetails[]): boolean => {
  /* ────────── BASIC NAME + PERSONAL DETAILS ────────── */

  if (_.isEmpty(applicant.applicantFirstName)) {
    return false;
  }
  if (_.isEmpty(applicant.applicantLastName)) {
    return false;
  }
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
  if (_.isEmpty(pd.dateOfBirth)) {
    return false;
  }
  if (_.isEmpty(pd.gender)) {
    return false;
  }
  if (_.isEmpty(pd.applicantPlaceOfBirth)) {
    return false;
  }

  /* ────────── CONFIDENTIALITY / REFUGE LOGIC ────────── */

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

  /* ────────── ADDRESS ────────── */

  if (_.isEmpty(applicant.applicantAddress1)) {
    return false;
  }
  if (_.isEmpty(applicant.applicantAddressTown)) {
    return false;
  }
  if (_.isEmpty(applicant.country)) {
    return false;
  }

  if (_.isEmpty(applicant.applicantAddressHistory)) {
    return false;
  }
  if (
    applicant.applicantAddressHistory === YesOrNo.YES &&
    _.isEmpty(applicant.applicantProvideDetailsOfPreviousAddresses)
  ) {
    return false;
  }

  /* ────────── CONTACT DETAILS ────────── */

  const cd = applicant.applicantContactDetail;
  if (_.isEmpty(cd)) {
    return false;
  }

  if (_.isEmpty(cd.canProvideEmail)) {
    return false;
  }
  if (cd.canProvideEmail === YesOrNo.YES) {
    if (_.isEmpty(cd.emailAddress)) {
      return false;
    }
    if (isEmailValid(cd.emailAddress) === 'invalid') {
      return false;
    }
  }

  if (_.isEmpty(cd.canProvideTelephoneNumber)) {
    return false;
  }
  if (cd.canProvideTelephoneNumber === YesOrNo.YES) {
    if (_.isEmpty(cd.telephoneNumber)) {
      return false;
    }
    if (isPhoneNoValid(cd.telephoneNumber) === 'invalid') {
      return false;
    }
  } else {
    if (_.isEmpty(cd.canNotProvideTelephoneNumberReason)) {
      return false;
    }
  }

  if (_.isEmpty(cd.canLeaveVoiceMail)) {
    return false;
  }
  if (_.isEmpty(cd.applicantContactPreferences)) {
    return false;
  }

  /* ────────── RELATIONSHIP TO CHILDREN ────────── */

  const rel = applicant.relationshipDetails?.relationshipToChildren;
  if (!Array.isArray(rel)) {
    return false;
  }

  if (rel.length !== children.length) {
    return false;
  }

  /* ────────── ALL CHECKS PASSED ────────── */
  return true;
};

export const areApplicantsValid = (caseData: CaseWithId): boolean =>
  caseData?.appl_allApplicants?.every(applicant => isApplicantValid(applicant, caseData.cd_children ?? [])) ?? false;
