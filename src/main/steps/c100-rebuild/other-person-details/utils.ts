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

export const doesAnyChildLiveWithOtherPerson = (caseData: CaseWithId, otherPersonId: string): boolean => {
  return caseData.cd_children!.some(child => child.liveWith?.some(person => person.id === otherPersonId));
};

export const getOtherPeopleLivingWithChildren = (caseData: CaseWithId): string[] => {
  return (
    caseData.oprs_otherPersons
      ?.map(person => (doesAnyChildLiveWithOtherPerson(caseData, person.id) ? person.id : ''))
      .filter(id => id !== '') ?? []
  );
};

export const getNextPersonLivingWithChild = (otherPeopleIds: string[], currentPersonId: string): string | null => {
  const index = otherPeopleIds.findIndex(id => id === currentPersonId);
  return index >= 0 && index < otherPeopleIds.length - 1 ? otherPeopleIds[index + 1] : null;
};
