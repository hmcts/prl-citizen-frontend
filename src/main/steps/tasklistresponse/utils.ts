import { CaseWithId } from '../../app/case/case';
import {
  Applicant,
  CaseType,
  PartyDetails,
  PartyDetailsWithId,
  PartyType,
  Respondent,
} from '../../app/case/definition';
import { UserDetails } from '../../app/controller/AppRequest';
import { RAProvider } from '../../modules/reasonable-adjustments';
import { mapConfirmContactDetails } from '../../steps/common/confirm-contact-details/checkanswers/ContactDetailsMapper';
import { mapKeepYourDetailsPrivate } from '../../steps/common/keep-details-private/KeepYourDetailsPrivateMapper';
import { getCasePartyType } from '../../steps/prl-cases/dashboard/utils';
import { mapConsentToApplicationDetails } from '../../steps/respondent/consent-to-application/ConsentMapper';
import { mapContactPreference } from '../common/contact-preference/ContactPreferencesMapper';

import { mapSafetyConcernsDetails } from './allegations-of-harm-and-violence/SafetyConcernsMapper';
import { mapInternationalFactorsDetails } from './international-factors/InternationalFactorsMapper';
import { mapMIAMDetails } from './miam/MIAMMapper';
import { mapProceedingDetails } from './proceedings/ProceedingDetailsMapper';

export const mapDataInSession = (userCase: CaseWithId, userId: UserDetails['id']): void => {
  const caseType = userCase.caseTypeOfApplication;
  const partyDetails = getPartyDetails(userCase, userId);
  if (partyDetails) {
    if (caseType === CaseType.C100) {
      setDataInSession(userCase, partyDetails);
    }

    Object.assign(userCase, mapConfirmContactDetails(partyDetails));
  }

  if (partyDetails?.response?.consent) {
    Object.assign(userCase, mapConsentToApplicationDetails(partyDetails));
  }

  if (partyDetails?.response?.keepDetailsPrivate?.confidentiality) {
    Object.assign(userCase, mapKeepYourDetailsPrivate(partyDetails));
  }

  if (partyDetails?.response?.supportYouNeed) {
    Object.assign(userCase, RAProvider.utils.mapRADetailsForRespondent(partyDetails));
  }

  if (partyDetails?.contactPreferences) {
    Object.assign(userCase, mapContactPreference(partyDetails));
  }
};

const setDataInSession = (userCase: CaseWithId, partyDetails: PartyDetails): void => {
  if (partyDetails?.response?.safetyConcerns) {
    Object.assign(userCase, mapSafetyConcernsDetails(partyDetails));
  }

  if (partyDetails?.response?.citizenInternationalElements) {
    Object.assign(userCase, mapInternationalFactorsDetails(partyDetails));
  }

  if (partyDetails?.response.currentOrPreviousProceedings) {
    Object.assign(userCase, mapProceedingDetails(partyDetails));
  }

  if (partyDetails?.response?.miam) {
    Object.assign(userCase, mapMIAMDetails(partyDetails));
  }
};

export const getPartyDetails = (userCase: CaseWithId, userId: UserDetails['id']): PartyDetailsWithId | undefined => {
  let partyData;

  if (!userCase) {
    return partyData;
  }

  const partyType = getCasePartyType(userCase, userId);
  const caseType = userCase.caseTypeOfApplication;

  if (caseType === CaseType.C100) {
    if (partyType === PartyType.RESPONDENT) {
      partyData = (userCase?.respondents as Respondent[])?.find(
        respondent => respondent?.value?.user?.idamId === userId
      );
    } else {
      partyData = (userCase?.applicants as Applicant[])?.find(applicant => applicant?.value?.user?.idamId === userId);
    }
  } else {
    partyData = partyType === PartyType.RESPONDENT ? userCase.respondentsFL401 : userCase.applicantsFL401;
  }

  if (partyData?.value) {
    return { ...partyData.value, partyId: partyData.id };
  }

  if (partyData) {
    return { ...partyData, partyId: null };
  }

  return partyData;
};
