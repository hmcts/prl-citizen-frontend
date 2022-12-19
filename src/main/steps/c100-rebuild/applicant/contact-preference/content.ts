/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseWithId } from '../../../../app/case/case';
import { C100Applicant, applicantContactPreferencesEnum } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  title: 'Contact Preferences for',
  serviceName: 'Child Arrangements',
  paragraphs: [
    'You can choose to receive case updates by email or post.',
    'If you receive updates by email, the updates will also be available to view in your dashboard.',
    'This includes updates on:',
  ],
  listOfBullets: ['court orders', 'hearings', 'decisions in your case'],
  contactPreferenceLabel: 'How would you prefer to be contacted?',
  contactPreferenceHintText: 'Select one (or both) of these options.',
  labelDigital: 'Digital',
  labelDitigalHintText: 'All communication from the court will be sent by email.',
  labelPost: 'Post',
  labelPostHintText: 'All communication from the court will be sent by post.',
  errors: {
    applicantContactPreferences: {
      required: 'Please select a contact preference',
    },
  },
});

export const cy = () => ({
  title: 'Contact Preferences for - welsh',
  serviceName: 'Trefniadau plant',
  paragraphs: [
    'You can choose to receive case updates by email or post. - welsh',
    'If you receive updates by email, the updates will also be available to view in your dashboard. - welsh',
    'This includes updates on: - welsh',
  ],
  listOfBullets: ['court orders - welsh', 'hearings - welsh', 'decisions in your case - welsh'],
  contactPreferenceLabel: 'How would you prefer to be contacted? - welsh',
  contactPreferenceHintText: 'Select one (or both) of these options. - welsh',
  labelDigital: 'Digital - welsh',
  labelDitigalHintText: 'All communication from the court will be sent by email. - welsh',
  labelPost: 'Post - welsh',
  labelPostHintText: 'All communication from the court will be sent by post. - welsh',
  errors: {
    applicantContactPreferences: {
      required: 'Please select a contact preference - welsh',
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

export const generateFormFields = (data: C100Applicant): GenerateDynamicFormFields => {
  const errors = {
    en: {},
    cy: {},
  };

  const fields = {
    applicantContactPreferences: {
      id: 'applicantContactPreferences',
      type: 'checkboxes',
      validator: atLeastOneFieldIsChecked,
      label: l => l.contactPreferenceLabel,
      labelSize: 'm',
      hint: l => l.contactPreferenceHintText,
      values: [
        {
          label: l => l.labelDigital,
          name: 'applicantContactPreferences',
          value: applicantContactPreferencesEnum.DIGITAL,
          hint: l => l.labelDitigalHintText,
          disabled: !data?.applicantContactDetail?.emailAddress,
        },
        {
          label: l => l.labelPost,
          name: 'applicantContactPreferences',
          value: applicantContactPreferencesEnum.POST,
          hint: l => l.labelPostHintText,
        },
      ],
    },
  };

  // mark the selection for the 'Digital' and 'Post' checkboxes based on the option chosen
  fields.applicantContactPreferences.values = fields.applicantContactPreferences.values.map(config =>
    // Checking if the data.applicantContactDetail.applicantContactPreferences Array has been pre-populated.
    // If YES, data will be fetched from userCase. If NOT, checkboxes are made fresh and untouched
    data?.applicantContactDetail?.applicantContactPreferences?.includes(config.value as string)
      ? { ...config, selected: true }
      : config
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

export const getFormFields = (caseData: Partial<CaseWithId>, applicantId: C100Applicant['id']): FormContent => {
  const applicantData = caseData?.appl_allApplicants?.find(i => i.id === applicantId) as C100Applicant;
  return updateFormFields(form, generateFormFields(applicantData ?? {}).fields);
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const applicantId = content?.additionalData?.req.params.applicantId;
  const applicantData = content.userCase?.appl_allApplicants!.find(i => i.id === applicantId) as C100Applicant;
  const { applicantFirstName, applicantLastName } = applicantData;
  const { fields } = generateFormFields(applicantData ?? {});

  return {
    ...translations,
    title: `${translations.title} ${applicantFirstName} ${applicantLastName}`,
    form: updateFormFields(form, fields),
  };
};
