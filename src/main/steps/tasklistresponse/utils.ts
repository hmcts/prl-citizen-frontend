/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';

import { CaseWithId } from '../../app/case/case';
import { Applicant, CaseType, PartyDetails, PartyType, Respondent, YesOrNo } from '../../app/case/definition';
import { UserDetails } from '../../app/controller/AppRequest';
import { RAProvider } from '../../modules/reasonable-adjustments';
import { mapConfirmContactDetails } from '../../steps/common/confirm-contact-details/checkanswers/ContactDetailsMapper';
import { SummaryListRow } from '../../steps/common/models/summaryListContent';
import { applyParms } from '../../steps/common/url-parser';
import { getCasePartyType } from '../../steps/prl-cases/dashboard/utils';
import { RESPOND_TO_AOH, RESPONSE_TO_AOH } from '../../steps/urls';
import { mapContactPreference } from '../common/contact-preference/ContactPreferencesMapper';
import { mapKeepYourDetailsPrivate } from '../common/keep-details-private/KeepYourDetailsPrivateMapper';

import { mapConsentToApplicationDetails } from './consent-to-application/summary/ConsentMapper';
import { mapInternationalFactorsDetails } from './international-factors/InternationalFactorsMapper';
import { mapMIAMDetails } from './miam/MIAMMapper';
import { mapProceedingDetails } from './proceedings/ProceedingDetailsMapper';
import { mapResponseToAOH } from './respond-to-allegations-of-harm/respondToAOHMapper';

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

  if (partyDetails?.response?.responseToAllegationsOfHarmYesOrNoResponse) {
    Object.assign(userCase, mapResponseToAOH(partyDetails));
  }
};
function setDataInSession(userCase: CaseWithId, partyDetails: PartyDetails) {
  const allegationOfHarm = _.get(partyDetails, 'response.respondingCitizenAoH');
  if (allegationOfHarm) {
    try {
      Object.assign(userCase, JSON.parse(allegationOfHarm));
    } catch (err) {
      console.log('Error: ', err);
    }
  }

  if (partyDetails?.response?.citizenInternationalElements) {
    Object.assign(userCase, mapInternationalFactorsDetails(partyDetails));
  }

  if (partyDetails?.response?.currentOrPreviousProceedings) {
    Object.assign(userCase, mapProceedingDetails(partyDetails));
  }

  if (partyDetails?.response?.miam) {
    Object.assign(userCase, mapMIAMDetails(partyDetails));
  }
}

export const getPartyDetails = (userCase: CaseWithId, userId: UserDetails['id']): PartyDetails | undefined => {
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
    return { ...partyData };
  }

  return partyData;
};

export const getRespondToAohSummary = (
  caseData: Partial<CaseWithId> | undefined,
  translation: Record<string, any>
): SummaryListRow[] => {
  if (!caseData) {
    return [];
  }

  const itemsToReview = [
    {
      key: {
        text: translation.wishToRespondLabel,
      },
      value: {
        text: caseData?.aoh_wishToRespond === YesOrNo.YES ? translation.yes : translation.no,
      },
      actions: {
        items: [
          {
            href: applyParms(RESPOND_TO_AOH, { partyType: PartyType.RESPONDENT }),
            text: translation.change,
            visuallyHiddenText: translation.change,
          },
        ],
      },
    },
  ];

  if (caseData?.aoh_responseToAllegations) {
    itemsToReview.push({
      key: {
        text: translation.responseToAohLabel,
      },
      value: {
        text: caseData.aoh_responseToAllegations,
      },
      actions: {
        items: [
          {
            href: applyParms(RESPONSE_TO_AOH, { partyType: PartyType.RESPONDENT }),
            text: translation.change,
            visuallyHiddenText: translation.change,
          },
        ],
      },
    });
  }

  return itemsToReview;
};
