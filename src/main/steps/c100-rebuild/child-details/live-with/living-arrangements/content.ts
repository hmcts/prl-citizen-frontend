import { CaseWithId } from '../../../../../app/case/case';
import { ChildrenDetails, People } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../../app/form/validation';
import { interpolate } from '../../../../common/string-parser';
import { getPartyDetails } from '../../../people/util';
import { getPeople } from '../utils';
export * from '../routeGuard';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: "{firstName} {lastName}'s living arrangements",
  livingArrangements:
    'We need this information so that the court has a complete understanding of the child’s living arrangements.',
  liveWithLabel: 'Select all of the people that the child lives with',
  errors: {
    livingArrangements: {
      required: 'Select all of the people that the child lives with',
    },
  },
});

const cy = () => ({
  title: "{firstName} {lastName}'s living arrangements (welsh)",
  livingArrangements:
    'We need this information so that the court has a complete understanding of the child’s living arrangements. (welsh)',
  liveWithLabel: 'Select all of the people that the child lives with (welsh)',
  errors: {
    livingArrangements: {
      required: 'Select all of the people that the child lives with (welsh)',
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
  livingArrangements: ChildrenDetails['livingArrangements'],
  mainlyLiveWith: ChildrenDetails['mainlyLiveWith']
): GenerateDynamicFormFields => {
  const errors = {
    en: {},
    cy: {},
  };

  const fields = {
    livingArrangements: {
      type: 'checkboxes',
      label: l => l.liveWithLabel,
      labelSize: 'm',
      validator: atLeastOneFieldIsChecked,
      values: persons.map(person => ({
        name: 'livingArrangements',
        label: `${person.firstName} ${person.lastName}`,
        value: person.id,
        selected:
          !!livingArrangements?.find(liveWithPerson => liveWithPerson.id === person.id) ||
          mainlyLiveWith?.id === person.id,
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

export const getFormFields = (caseData: Partial<CaseWithId>, childId: ChildrenDetails['id']): FormContent => {
  const { livingArrangements, mainlyLiveWith } = getPartyDetails(childId, caseData?.cd_children) as ChildrenDetails;
  return updateFormFields(form, generateFormFields(getPeople(caseData), livingArrangements, mainlyLiveWith).fields);
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const childId = content.additionalData!.req.params.childId;
  const { firstName, lastName, livingArrangements, mainlyLiveWith } = getPartyDetails(
    childId,
    content.userCase!.cd_children
  ) as ChildrenDetails;

  return {
    ...translations,
    title: interpolate(translations.title, { firstName, lastName }),
    form: updateFormFields(
      form,
      generateFormFields(getPeople(content.userCase!), livingArrangements as People[], mainlyLiveWith).fields
    ),
  };
};
