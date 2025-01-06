import { CaseWithId } from '../../../app/case/case';
import { ContactPreference, PartyType } from '../../../app/case/definition';
import { UserDetails } from '../../../app/controller/AppRequest';
import {
  APPLICANT_ADDRESS_DETAILS,
  APPLICANT_CONTACT_DETAILS,
  PageLink,
  RESPONDENT_ADDRESS_DETAILS,
  RESPONDENT_CONTACT_DETAILS,
} from '../../../steps/urls';
import { getPartyDetails } from '../../tasklistresponse/utils';

export const hasContactPreference = (caseData: CaseWithId, userId: UserDetails['id']): boolean => {
  const partyDetails = getPartyDetails(caseData, userId);

  if (partyDetails?.contactPreferences) {
    if (partyDetails?.contactPreferences === ContactPreference.EMAIL) {
      return !!partyDetails.email;
    } else {
      return (
        Object.values(partyDetails.address).filter(address => {
          if (address?.trim()) {
            return address;
          }
        }).length > 0
      );
    }
  }

  return false;
};

export const getChangeLink = (partyType: PartyType, contactPreference: ContactPreference): PageLink => {
  if (partyType === PartyType.RESPONDENT) {
    return contactPreference === ContactPreference.EMAIL ? RESPONDENT_CONTACT_DETAILS : RESPONDENT_ADDRESS_DETAILS;
  } else {
    return contactPreference === ContactPreference.EMAIL ? APPLICANT_CONTACT_DETAILS : APPLICANT_ADDRESS_DETAILS;
  }
};
