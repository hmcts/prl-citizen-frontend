import { CaseWithId } from '../../../app/case/case';
import { YesOrNo } from '../../../app/case/definition';
import { cleanLiveWithData } from '../../c100-rebuild/people/util';

export const cleanOtherPeopleDetails = (caseData: CaseWithId, otherPersonCheck: YesOrNo | undefined): CaseWithId => {
  if (otherPersonCheck === YesOrNo.NO) {
    caseData.oprs_otherPersons?.forEach(otherPerson => {
      caseData = cleanLiveWithData(caseData, otherPerson.id);
    });
    delete caseData.oprs_otherPersons;
  }
  return caseData;
};
