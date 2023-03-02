/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars*/
/* eslint-disable @typescript-eslint/no-explicit-any*/
import { applicantContactPreferencesEnum } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { interpolate } from '../../../../steps/common/string-parser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  caption: 'Case number #{caseNumber}',
  title: 'Contact Preferences',
  paragraphs: [
    'You can choose to receive case updates by email or post.',
    'If you receive updates by email, the updates will also be available to view in your dashboard.',
    'This includes updates on:',
  ],
  bullets: ['court orders', 'hearings', 'decisions in your case'],
  contactPreferenceLabel: 'How would you prefer to be contacted?',
  contactPreferenceHintText: 'Select one (or both) of these options.',
  labelDigital: 'Digital',
  labelDitigalHintText: 'All communication from the court will be sent by email.',
  labelPost: 'Post',
  labelPostHintText: 'All communication from the court will be sent by post.',
  errors: {
    applicantPreferredContact: {
      required: 'Please select a contact preference',
    },
  },
});

export const cy = () => ({
  caption: 'Case number - welsh #{caseNumber}',
  title: 'Dewisiadau cyswllt',
  paragraphs: [
    'Gallwch ddewis cael diweddariadau ynghylch yr achos drwy e-bost neu drwy’r post.',
    'Os byddwch yn dewis cael diweddariadau drwy e-bost, byddwch hefyd yn gallu gweld y diweddariadau yn eich dangosfwrdd.',
    'Mae hyn yn cynnwys diweddariadau ar:',
  ],
  bullets: ['gorchmynion llys', 'gwrandawiadau', 'penderfyniadau ynghylch eich achos'],
  contactPreferenceLabel: 'Sut hoffech inni gysylltu â chi?',
  contactPreferenceHintText: 'Dewiswch un o’r opsiynau hyn (neu’r ddau).',
  labelDigital: 'Digidol',
  labelDitigalHintText: 'Fe anfonir pob cyfathrebiad gan y llys drwy e-bost.',
  labelPost: 'Drwy’r post',
  labelPostHintText: 'Fe anfonir pob cyfathrebiad gan y llys drwy’r post.',
  errors: {
    applicantPreferredContact: {
      required: 'Dewiswch sut hoffech inni gysylltu â chi',
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

export const generateFormFields = (caseData: any): GenerateDynamicFormFields => {
  const contactPreferences = caseData?.value?.contactPreferences;

  const errors = {
    en: {},
    cy: {},
  };

  const fields = {
    applicantPreferredContact: {
      id: 'applicantPreferredContact',
      type: 'radios',
      classes: 'govuk-radios',
      validator: atLeastOneFieldIsChecked,
      label: l => l.contactPreferenceLabel,
      labelSize: 'm',
      hint: l => l.contactPreferenceHintText,
      values: [
        {
          label: l => l.labelDigital,
          name: 'applicantPreferredContact',
          value: applicantContactPreferencesEnum.DIGITAL,
          hint: l => l.labelDitigalHintText,
        },
        {
          label: l => l.labelPost,
          name: 'applicantPreferredContact',
          value: applicantContactPreferencesEnum.POST,
          hint: l => l.labelPostHintText,
        },
      ],
    },
  };

  fields.applicantPreferredContact.values = fields.applicantPreferredContact.values.map(config =>
    config.value === contactPreferences ? { ...config, selected: true } : config
  );

  return { fields, errors };
};

export const form: FormContent = {
  fields: {},
  onlycontinue: {
    text: l => l.onlycontinue,
  },
  cancel: {
    text: l => l.cancel,
  },
};

export const getFormFields = (caseData: any): FormContent => {
  return updateFormFields(form, generateFormFields(caseData.userCase!.applicants![0]).fields);
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const caseNumber = content.userCase?.id!;
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const { fields } = generateFormFields(content?.userCase?.applicants![0]);

  return {
    ...translations,
    caption: interpolate(translations.caption, { caseNumber }),
    title: `${translations.title}`,
    form: updateFormFields(form, fields),
  };
};
