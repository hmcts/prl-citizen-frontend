/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  title: 'Further Information',
  childrenKnownToSocialServicesLabel: 'Are any of the children known to social service?',
  childrenKnownToSocialServicesHint:
    'State which child and the name of the local authority and social worker, if known',
  childrenSubjectOfProtectionPlanLabel: 'Are any of the children the subject of a child protection plan?',
  childrenProtectionPlanHint: `A child protection plan is prepared by a local authority where a child is thought to be at risk of significant harm.
  It sets out steps to be taken to protect the child and support the family.`,
  one: 'Yes',
  two: 'No',
  three: "Don't know",
  errors: {
    cd_childrenKnownToSocialServices: {
      required: 'Select if any of the children are known to social services',
    },
    cd_childrenKnownToSocialServicesDetails: {
      required: 'Enter details',
    },
    cd_childrenSubjectOfProtectionPlan: {
      required: 'Select if any of the children are the subject of a child protection plan',
    },
  },
});

export const cy = () => ({
  title: 'Further Information - welsh',
  childrenKnownToSocialServicesLabel: 'Are any of the children known to social service - welsh?',
  childrenKnownToSocialServicesHint:
    'State which child and the name of the local authority and social worker, if known - welsh',
  childrenSubjectOfProtectionPlanLabel: 'Are any of the children the subject of a child protection plan - welsh?',
  childrenProtectionPlanHint: `A child protection plan is prepared by a local authority where a child is thought to be at risk of significant harm.
  It sets out steps to be taken to protect the child and support the family.- welsh`,
  one: 'Yes - Welsh',
  two: 'No - Welsh',
  three: "Don't know - Welsh",
  errors: {
    cd_childrenKnownToSocialServices: {
      required: 'Select if any of the children are known to social services - welsh',
    },
    cd_childrenKnownToSocialServicesDetails: {
      required: 'Enter details - welsh',
    },
    cd_childrenSubjectOfProtectionPlan: {
      required: 'Select if any of the children are the subject of a child protection plan - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    cd_childrenKnownToSocialServices: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.childrenKnownToSocialServicesLabel,
      labelSize: 'm',
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
          subFields: {
            cd_childrenKnownToSocialServicesDetails: {
              type: 'textarea',
              hint: l => l.childrenKnownToSocialServicesHint,
              labelSize: null,
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          label: l => l.two,
          value: YesOrNo.NO,
        },
        {
          label: l => l.three,
          value: 'Dont know',
        },
      ],
      validator: isFieldFilledIn,
    },
    cd_childrenSubjectOfProtectionPlan: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.childrenSubjectOfProtectionPlanLabel,
      labelSize: 'm',
      hint: l => l.childrenProtectionPlanHint,
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
        },
        {
          label: l => l.two,
          value: YesOrNo.NO,
        },
        {
          label: l => l.three,
          value: 'Dont know',
        },
      ],
      validator: isFieldFilledIn,
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
  return {
    ...translations,
    form,
  };
};
