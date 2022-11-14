import { ChildrenDetails } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { getPartyDetails } from '../../people/util';
export * from '../routeGuard';

let updatedForm: FormContent;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Parental responsibility for',
  subTitle: 'State everyone who has parental responsibility for  and how they have parental responsibility.',
  bodyHint: `<p>For example 'child's mother', or 'child's father who was married to the mother when the child was born.</p>
 <p><a target="_blank" href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1">See section E of leaflet CB1 for more information</a></p>`,
  errors: {
    statement: {
      required: 'Enter an answer',
    },
  },
});

const cy = () => ({
  title: 'Parental responsibility for - welsh',
  subTitle: 'State everyone who has parental responsibility for  and how they have parental responsibility. - welsh',
  bodyHint: `<p>For example 'child's mother', or 'child's father who was married to the mother when the child was born.</p>
  <p><a target="_blank" href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1">See section E of leaflet CB1 for more information</a></p> - welsh`,
  errors: {
    statement: {
      required: 'Enter an answer  - welsh',
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

export const generateFormFields = (
  parentialResponsibility: ChildrenDetails['parentialResponsibility']
): GenerateDynamicFormFields => {
  const { statement } = parentialResponsibility;
  const errors = {
    en: {},
    cy: {},
  };
  const fields = {
    statement: {
      type: 'text',
      value: statement,
      validator: isFieldFilledIn,
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

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const childId = content.additionalData!.req.params.childId;
  const childDetails = getPartyDetails(content.userCase!.cd_children, childId)!;
  const { fields } = generateFormFields((childDetails as ChildrenDetails).parentialResponsibility);

  return {
    ...translations,
    title: `${translations['title']} ${childDetails.firstName} ${childDetails.lastName}`,
    form: updateFormFields(form, fields),
  };
};
