import { CaseWithId } from '../../../../app/case/case';
import { C100Applicant, ChildrenDetails, RelationshipToChildren } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import {
  form as formConfig,
  generateFormFields,
  languages,
  updateFormFields,
} from '../../common/relationship-to-child/content';
import { getPartyDetails } from '../../people/util';
import { getApplicantDetails } from '../util';

console.info('** FOR SONAR **');

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const form: FormContent = { ...formConfig };
export const getFormFields = (
  caseData: Partial<CaseWithId>,
  applicantId: C100Applicant['id'],
  childId: ChildrenDetails['id']
): FormContent => {
  const applicantDetails = getApplicantDetails(caseData?.appl_allApplicants ?? [], applicantId);
  const relationshipFound = applicantDetails?.relationshipDetails?.relationshipToChildren?.find(
    relationshipToChild => relationshipToChild.childId === childId
  );
  return updateFormFields(form, generateFormFields(relationshipFound ?? ({} as RelationshipToChildren)).fields);
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const childId = content.additionalData!.req.params.childId;
  const applicantId = content.additionalData!.req.params.applicantId;
  const applicantDetails = getApplicantDetails(content.userCase!.appl_allApplicants ?? [], applicantId)!;
  const childDetails = getPartyDetails(childId, content.userCase!.cd_children) as ChildrenDetails;

  const relationshipFound = applicantDetails.relationshipDetails!.relationshipToChildren?.find(
    relationshipToChild => relationshipToChild.childId === childId
  );
  const { fields } = generateFormFields(relationshipFound ?? ({} as RelationshipToChildren));
  return {
    ...translations,
    title: `${translations['title']} ${applicantDetails.applicantFirstName} ${applicantDetails.applicantLastName}${translations['title1']} ${childDetails.firstName} ${childDetails.lastName}`,
    form: updateFormFields(form, fields),
  };
};
