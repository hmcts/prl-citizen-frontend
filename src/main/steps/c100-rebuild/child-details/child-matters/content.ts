import { ChildrenDetails } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { getChildDetails } from '../util';
export * from '../routeGuard';

let updatedForm: FormContent;

const en = () => ({
  title: 'Which of the decisions you’re asking the court to resolve relate to',
  bodyHint: 'Select all that apply',
  whoChildLiveWithLabel: 'Decide who the children live with and when',
  childTimeSpentLabel: 'Decide how much time the children spend with each person',
  errors: {
    needsResolution: {
      required: 'Select at least a decision',
    },
  },
});

const cy = () => ({
  title: 'Which of the decisions you’re asking the court to resolve relate to - welsh',
  bodyHint: 'Select all that apply - welsh',
  whoChildLiveWithLabel: 'Decide who the children live with and when - welsh',
  childTimeSpentLabel: 'Decide how much time the children spend with each person - welsh',
  errors: {
    needsResolution: {
      required: 'Select at least a decision  - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

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

export const getFormFields = (): FormContent => {
  return updatedForm;
};

export const generateFormFields = (childMatters: ChildrenDetails['childMatters']): GenerateDynamicFormFields => {
  const { needsResolution } = childMatters;
  const errors = {
    en: {},
    cy: {},
  };
  const fields = {
    needsResolution: {
      type: 'checkboxes',
      hint: l => l.bodyHint,
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'needsResolution',
          label: l => l.whoChildLiveWithLabel,
          value: 'whoChildLiveWith',
        },
        {
          name: 'needsResolution',
          label: l => l.childTimeSpentLabel,
          value: 'childTimeSpent',
        },
      ],
    },
  };

  // mark the selection for the check boxes based on the option chosen
  fields.needsResolution.values = fields.needsResolution.values.map(config =>
    needsResolution.includes(config.value) ? { ...config, selected: true } : config
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

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const childId = content.additionalData!.req.params.childId;
  const childDetails = getChildDetails(content.userCase!.cd_children ?? [], childId)!;
  const { fields } = generateFormFields(childDetails.childMatters);

  return {
    ...translations,
    title: `${translations['title']} ${childDetails.firstName} ${childDetails.lastName}`,
    form: updateFormFields(form, fields),
  };
};
