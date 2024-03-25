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
  respondentId: C100RebuildPartyDetails['id'],
  childId: ChildrenDetails['id']
): FormContent => {
  const respondentDetails = getPartyDetails(respondentId, caseData?.resp_Respondents) as C100RebuildPartyDetails;
  const relationshipFound = respondentDetails?.relationshipDetails?.relationshipToChildren?.find(
    relationshipToChild => relationshipToChild.childId === childId
  );

  return updateFormFields(form, generateFormFields(relationshipFound ?? ({} as RelationshipToChildren)).fields);
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const childId = content.additionalData!.req.params.childId;
  const respondentId = content.additionalData!.req.params.respondentId;
  const respondentDetails = getPartyDetails(
    respondentId,
    content.userCase!.resp_Respondents
  ) as C100RebuildPartyDetails;
  const childDetails = getPartyDetails(childId, content.userCase!.cd_children) as ChildrenDetails;

  const relationshipFound = respondentDetails.relationshipDetails.relationshipToChildren.find(
    relationshipToChild => relationshipToChild.childId === childId
  );
  const { fields } = generateFormFields(relationshipFound || Object.assign({}));
  return {
    ...translations,
    title: `${translations['title']} ${respondentDetails.firstName} ${respondentDetails.lastName}${translations['title1']} ${childDetails.firstName} ${childDetails.lastName}`,
    form: updateFormFields(form, fields),
  };
};
