import { CaseWithId } from '../../../../app/case/case';
import {
  C100Applicant,
  ChildrenDetails,
  RelationshipToChildren,
  RelationshipType,
} from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { isAlphaNumeric, isFieldFilledIn } from '../../../../app/form/validation';
import { getPartyDetails } from '../../people/util';
import { getApplicantDetails } from '../util';

console.info('** FOR SONAR **');

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'What is ',
  title1: "'s relationship to ",
  mother: 'Mother',
  father: 'Father',
  guardian: 'Guardian',
  specialGuardian: 'Special Guardian',
  grandparent: 'Grandparent',
  other: 'Other',
  otherRelationshipDetails: 'Please specify',
  errors: {
    relationshipType: {
      required: 'Enter the relationship',
    },
    otherRelationshipTypeDetails: {
      required: 'Enter the relationship',
      invalid: 'You have entered an invalid character. Enter using letters and numbers only.',
    },
  },
});

const cy = () => ({
  title: 'Beth yw perthynas',
  title1: ' â',
  mother: 'Mam',
  father: 'Tad',
  guardian: 'Gwarcheidwad',
  specialGuardian: 'Gwarcheidwad Arbennig',
  grandparent: 'Nain/Taid',
  other: 'Arall',
  otherRelationshipDetails: 'Rhowch fanylion',
  errors: {
    relationshipType: {
      required: 'Nodwch y berthynas',
    },
    otherRelationshipTypeDetails: {
      required: 'Nodwch y berthynas',
      invalid: 'Rydych wedi defnyddio nod annilys. Defnyddiwch lythrennau a rhifau yn unig.',
    },
  },
});

const languages = {
  en,
  cy,
};

let updatedForm: FormContent;

const updateFormFields = (form: FormContent, formFields: FormContent['fields']): FormContent => {
  updatedForm = {
    ...form,
    fields: {
      ...formFields,
      ...(form.fields ?? {}),
    },
  };

  return updatedForm;
};

export const generateFormFields = (relationshipTypeOption: RelationshipToChildren): GenerateDynamicFormFields => {
  const { relationshipType, otherRelationshipTypeDetails } = relationshipTypeOption;

  const errors = {
    en: {},
    cy: {},
  };
  const fields = {
    relationshipType: {
      type: 'radios',
      classes: 'govuk-radios',
      labelSize: 's',
      values: [
        {
          label: l => l.mother,
          value: RelationshipType.MOTHER,
        },
        {
          label: l => l.father,
          value: RelationshipType.FATHER,
        },
        {
          label: l => l.guardian,
          value: RelationshipType.GUARDIAN,
        },
        {
          label: l => l.specialGuardian,
          value: RelationshipType.SPECIAL_GUARDIAN,
        },
        {
          label: l => l.grandparent,
          value: RelationshipType.GRAND_PARENT,
        },
        {
          label: l => l.other,
          value: RelationshipType.OTHER,

          subFields: {
            otherRelationshipTypeDetails: {
              type: 'text',
              label: l => l.otherRelationshipDetails,
              labelSize: null,
              value: otherRelationshipTypeDetails,
              validator: value => isFieldFilledIn(value) || isAlphaNumeric(value),
            },
          },
        },
      ],
      validator: isFieldFilledIn,
    },
  };
  fields.relationshipType.values = fields.relationshipType.values.map(config =>
    config.value === relationshipType ? { ...config, selected: true } : config
  );

  return { fields, errors };
};

export const form: FormContent = {
  fields: {},
  onlycontinue: {
    text: l => l.onlycontinue,
  },
  saveAndComeLater: {
    text: l => l.saveAndComeLater,
  },
};

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
