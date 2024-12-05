import { CaseWithId } from '../../../app/case/case';

export const doesAnyChildLiveWithOtherPerson = (caseData: CaseWithId, otherPersonId: string): boolean => {
  return caseData.cd_children!.some(child => child.liveWith?.some(person => person.id === otherPersonId));
};

export const getOtherPeopleLivingWithChildren = (caseData: CaseWithId): string[] => {
  return caseData
    .oprs_otherPersons!.map(person => (doesAnyChildLiveWithOtherPerson(caseData, person.id) ? person.id : ''))
    .filter(id => id !== '');
};

export const getNextPersonLivingWithChild = (otherPeopleIds: string[], currentPersonId: string): string | null => {
  const index = otherPeopleIds.findIndex(id => id === currentPersonId);
  return index >= 0 && index < otherPeopleIds.length - 1 ? otherPeopleIds[index + 1] : null;
};
