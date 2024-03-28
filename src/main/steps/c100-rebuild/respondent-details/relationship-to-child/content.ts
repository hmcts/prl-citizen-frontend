import { CaseWithId } from '../../../../app/case/case';
import {
  C100RebuildPartyDetails,
  ChildrenDetails,
  RelationshipToChildren,
  RelationshipType,
} from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { isAlphaNumeric, isFieldFilledIn } from '../../../../app/form/validation';
import { getPartyDetails } from '../../people/util';

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
  guardianHintText:
    'Someone who represents the rights of a child, may be appointed by a parent, special guardian or the court',
  specialGuardianHintText: 'Someone who represents the rights of a child, appointed by the court',
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
  guardianHintText:
    'Someone who represents the rights of a child, may be appointed by a parent, special guardian or the court -welsh',
  specialGuardianHintText: 'Someone who represents the rights of a child, appointed by the court -welsh',
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
          hint: l => l.guardianHintText,
          value: RelationshipType.GUARDIAN,
        },
        {
          label: l => l.specialGuardian,
          hint: l => l.specialGuardianHintText,
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
