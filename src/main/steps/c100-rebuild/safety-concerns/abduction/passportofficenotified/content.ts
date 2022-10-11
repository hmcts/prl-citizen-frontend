import { YesOrNo } from '../../../../../app/case/definition';
import { TranslationFn } from '../../../../../app/controller/GetController';
import { FormContent } from '../../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../../app/form/validation';

const en = () => ({
  serviceName: 'Child arrangements',
  caption: 'Safety concerns',
  headingTitle: 'Has the passport office been notified? ',
  Yes: 'Yes',
  No: 'No',
  sideLinks: {
    guidanceOnAbduction: 'Guidance on parental child abduction',
    guidanceOnAbduction_link: 'https://www.gov.uk/government/collections/child-abduction',
    getHelpOnReturningChildAbroad: 'Get help to return a child from abroad or arrange contact',
    getHelponReturningChildAbroad_link: 'https://www.gov.uk/return-or-contact-abducted-child',
    preventChildFromObtainingPassport: 'Stop a child from getting a passport',
    preventChildFromObtainingPassport_link: 'https://www.gov.uk/stop-child-passport',
  },
  errors: {
    c1A_safetyConern_passportOfficenotifications: {
      required: 'Select yes if the passport office has been notified',
    },
  },
});

const cy = () => ({
  serviceName: 'Child arrangements - welsh',
  caption: 'Safety concerns - welsh',
  headingTitle: 'Has the passport office been notified? - welsh',
  Yes: 'Yes - welsh',
  No: 'No - welsh',
  sideLinks: {
    guidanceOnAbduction: 'Guidance on parental child abduction',
    guidanceOnAbduction_link: 'https://www.gov.uk/government/collections/child-abduction',
    getHelpOnReturningChildAbroad: 'Get help to return a child from abroad or arrange contact',
    getHelponReturningChildAbroad_link: 'https://www.gov.uk/return-or-contact-abducted-child',
    preventChildFromObtainingPassport: 'Stop a child from getting a passport',
    preventChildFromObtainingPassport_link: 'https://www.gov.uk/stop-child-passport',
  },
  errors: {
    c1A_safetyConern_passportOfficenotifications: {
      required: 'Select yes if the passport office has been notified - welsh',
    },
  },
});

const languages = {
  en,
  cy,
};

export const form: FormContent = {
  fields: {
    c1A_safetyConern_passportOfficenotifications: {
      id: 'c1A_safetyConern_passportOfficenotifications',
      type: 'radios',
      classes: 'govuk-radios',
      validator: atLeastOneFieldIsChecked,
      values: [
        {
          name: 'c1A_safetyConern_passportOfficenotifications',
          label: l => l.Yes,
          value: YesOrNo.YES,
        },
        {
          name: 'c1A_safetyConern_passportOfficenotifications',
          label: l => l.No,
          value: YesOrNo.NO,
        },
      ],
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
