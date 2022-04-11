import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  continue: 'Continue',
  cancel: 'Cancel',
  label: 'Select type of family law you need',
  one: 'Adoption',
  two: 'Private Law',
  hint: 'Select either C100 or FL401. There are specific examples under each section',
  serviceName: 'C100',
  errors: {
    serviceType: {
      required: 'Select the Service type',
    },
  },
});

const cy = () => ({
  continue: 'Continue (in welsh)',
  cancel: 'Cancel (in welsh)',
  label: 'Select type of family law you need (in welsh)',
  one: 'Adoption (in welsh)',
  two: 'Private Law (in welsh)',
  hint: 'Select either C100 or FL401. There are specific examples under each section (in welsh)',
  serviceName: 'C100 (in welsh)',
  errors: {
    serviceType: {
      required: 'Select the Service type (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    serviceType: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      hint: h => h.hint,
      values: [
        {
          label: l => l.one,
          value: YesOrNo.YES,
          subFields: {
            internationalAdoption: {
              type: 'label',
              label: 'International Adoption',
            },
            relinquishedAdoption: {
              type: 'label',
              label: 'Relinquished adoption',
            },
            stepparentAdoption: {
              type: 'label',
              label: 'Stepparent Adoption',
            },
            parentalOrders: {
              type: 'label',
              label: 'Parental orders',
            },
          },
        },
        {
          label: l => l.two,
          value: YesOrNo.NO,
          subFields: {
            femaleGenitalMutilationOrdersFGM: {
              type: 'label',
              label: 'Female Genital Mutilation Orders(FGM)',
            },
            forcedProtectionMarriageOrderFMPO: {
              type: 'label',
              label: 'Forced Marriage Protection Order(FMPO)',
            },
            specialGuardianship: {
              type: 'label',
              label: 'Special Guardianship',
            },
            financialApplications: {
              type: 'label',
              label: 'Financial Applications',
            },
            declarationOfParentage: {
              type: 'label',
              label: 'Declaration of parentage',
            },
          },
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.continue,
  },
  cancel: {
    text: l => l.cancel,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
