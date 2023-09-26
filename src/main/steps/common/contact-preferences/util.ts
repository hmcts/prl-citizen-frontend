import { CaseWithId } from '../../../app/case/case';
import { ContactPreference } from '../../../app/case/definition';
import { UserDetails } from '../../../app/controller/AppRequest';
import { getPartyDetails } from '../../../steps/tasklistresponse/utils';

export const hasContactPreference = (caseData: CaseWithId, userId: UserDetails['id']): boolean => {
  const partyDetails = getPartyDetails(caseData, userId);

  if (partyDetails?.contactPreferences) {
    if (partyDetails?.contactPreferences === ContactPreference.DIGITAL) {
      return !!partyDetails.email;
    } else {
      return (
        Object.values(partyDetails.address).filter(address => {
          if (address && address.trim()) {
            return address;
          }
        }).length > 0
      );
    }
  }

  return false;
};
