import { CaseWithId } from '../../../../app/case/case';
import { ChildrenDetails, PartyType, People } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { interpolate } from '../../../../steps/common/string-parser';
import { getPartyDetails } from '../../people/util';
export * from './routeGuard';

let people: People[] = [];

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Who does {firstName} {lastName} currently live with?',
  liveWithHint: 'Select all that apply',
  errors: {
    liveWith: {
      required: 'You must select at least one person',
    },
  },
});

const cy = () => ({
  title: 'Gyda phwy mae {firstName} {lastName} yn byw ar hyn o bryd?',
  liveWithHint: 'Dewiswch bob un sy’n berthnasol',
  errors: {
    liveWith: {
      required: 'You must select at least one person - welsh',
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

export const generateFormFields = (
  persons: People[],
  liveWith: ChildrenDetails['liveWith']
): GenerateDynamicFormFields => {
  const errors = {
    en: {},
    cy: {},
  };

  const fields = {
    liveWith: {
      type: 'checkboxes',
      hint: l => l.liveWithHint,
      validator: atLeastOneFieldIsChecked,
      values: persons.map(person => ({
        name: 'liveWith',
        label: `${person.firstName} ${person.lastName}`,
        value: person.id,
        selected: !!liveWith!.find(liveWithPerson => liveWithPerson.id === person.id),
      })),
    },
  };

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

export const getFormFields = (): FormContent => {
  return updatedForm;
};

export const getPeople = (caseData: Partial<CaseWithId>): People[] => {
  if (!people.length) {
    people = [
      ...(caseData.appl_allApplicants ?? []).map(applicant => ({
        id: applicant.id,
        firstName: applicant.applicantFirstName,
        lastName: applicant.applicantLastName,
        partyType: PartyType.APPLICANT,
      })),
      ...(caseData.resp_Respondents ?? []).map(respondent => ({
        id: respondent.id,
        firstName: respondent.firstName,
        lastName: respondent.lastName,
        partyType: PartyType.RESPONDENT,
      })),
      ...(caseData.oprs_otherPersons ?? []).map(respondent => ({
        id: respondent.id,
        firstName: respondent.firstName,
        lastName: respondent.lastName,
        partyType: PartyType.OTHER_PERSON,
      })),
    ] as People[];
  }

  return people;
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const childId = content.additionalData!.req.params.childId;
  const { firstName, lastName, liveWith } = getPartyDetails(childId, content.userCase!.cd_children) as ChildrenDetails;
  people = [];

  return {
    ...translations,
    title: interpolate(translations.title, { firstName, lastName }),
    form: updateFormFields(form, generateFormFields(getPeople(content.userCase!), liveWith as People[]).fields),
  };
};
