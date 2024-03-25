import { CaseWithId } from '../../../../app/case/case';
import { C100RebuildPartyDetails, ChildrenDetails, RelationshipToChildren } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { form, generateFormFields, languages, updateFormFields } from '../../common/relationship-to-child/content';
import { getPartyDetails } from '../../people/util';

console.info('** FOR SONAR **');

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

export const getFormFields = (
  caseData: Partial<CaseWithId>,
  otherPersonId: C100RebuildPartyDetails['id'],
  childId: ChildrenDetails['id']
): FormContent => {
  const otherPersonDetails = getPartyDetails(otherPersonId, caseData.oprs_otherPersons) as C100RebuildPartyDetails;
  const relationshipFound = otherPersonDetails?.relationshipDetails.relationshipToChildren?.find(
    relationshipToChild => relationshipToChild.childId === childId
  );

  return updateFormFields(form, generateFormFields(relationshipFound ?? ({} as RelationshipToChildren)).fields);
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const childId = content.additionalData!.req.params.childId;
  const otherPersonId = content.additionalData!.req.params.otherPersonId;
  const otherPersonDetails = getPartyDetails(
    otherPersonId,
    content.userCase!.oprs_otherPersons
  ) as C100RebuildPartyDetails;
  const childDetails = getPartyDetails(childId, content.userCase!.cd_children) as ChildrenDetails;

  const relationshipFound = otherPersonDetails.relationshipDetails.relationshipToChildren.find(
    relationshipToChild => relationshipToChild.childId === childId
  );
  const { fields } = generateFormFields(relationshipFound ?? ({} as RelationshipToChildren));
  return {
    ...translations,
    title: `${translations['title']} ${otherPersonDetails.firstName} ${otherPersonDetails.lastName}${translations['title1']} ${childDetails.firstName} ${childDetails.lastName}`,
    form: updateFormFields(form, fields),
  };
};
