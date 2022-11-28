/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ChildrenDetails } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { getPartyDetails } from '../../people/util';
export * from '../routeGuard';

let updatedForm: FormContent;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  title: 'Parental responsibility for',
  parentalResponsibility:
    'State everyone who has parental responsibility for [^^^]  and how they have parental responsibility.',
  subTitle: 'State everyone who has parental responsibility for  and how they have parental responsibility.',
  bodyHint: `<p>For example 'child's mother', or 'child's father who was married to the mother when the child was born'.</p>
 <p><a target="_blank" href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1">See section E of leaflet CB1 for more information</a></p>`,
  errors: {
    statement: {
      required: 'Enter an answer',
    },
  },
});

export const cy = () => ({
  title: 'Cyfrifoldeb rhiant dros Steve Jones ',
  parentalResponsibility:
    'Datganwch bawb sydd â chyfrifoldeb rhiant a dros bwy, a sut ganddynt gyfrifoldeb rhiant.',
  subTitle: 'Nodwch bawb sydd â chyfrifoldeb rhiant a dros bwy, a sut ganddynt gyfrifoldeb rhiant.',
  bodyHint: `<p>Er enghraifft, ‘mam y plentyn’ neu ‘tad y plentyn oedd wedi priodi â’r fam pan gafodd y plentyn ei (g)eni’.</p>
  <p><a target="_blank" href="https://www.gov.uk/government/publications/family-court-applications-that-involve-children-cb1">Gweler Adran E o daflen CB1 am ragor o wybodaeth</a></p> `,
  errors: {
    statement: {
      required: 'Rhowch ateb',
    },
  },
});

const languages = {
  en,
  cy,
};

export const updateFormFields = (form: FormContent, formFields: FormContent['fields']): FormContent => {
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
  fields: {
    _ctx: {
      type: 'hidden',
      labelHidden: true,
      value: 'pr',
    },
  },
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
  const childDetails = getPartyDetails(childId, content.userCase!.cd_children) as ChildrenDetails;
  const { fields } = generateFormFields(childDetails.parentialResponsibility);

  return {
    ...translations,
    title: `${translations['title']} ${childDetails.firstName} ${childDetails.lastName}`,
    form: updateFormFields(form, fields),
  };
};
