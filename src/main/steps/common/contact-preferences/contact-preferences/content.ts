/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars*/
/* eslint-disable @typescript-eslint/no-explicit-any*/
import { PartyDetails, applicantContactPreferencesEnum } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { interpolate } from '../../../../steps/common/string-parser';
import { getPartyDetails } from '../../../../steps/tasklistresponse/utils';

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
  contactPreferenceHintText: 'Select one of these options.',
  labelDigital: 'Digital',
  labelDitigalHintText: 'All communication from the court will be sent by email.',
  labelPost: 'Post',
  labelPostHintText: 'All communication from the court will be sent by post.',
  continue: 'Save and continue',
  errors: {
    applicantPreferredContact: {
      required: 'Please select a contact preference',
    },
  },
});

export const cy = () => ({
  caption: 'Rhif yr achos #{caseNumber}',
  title: 'Dewisiadau cyswllt',
  paragraphs: [
    'Gallwch ddewis cael diweddariadau ynghylch yr achos drwy e-bost neu drwy’r post.',
    'Os byddwch yn dewis cael diweddariadau drwy e-bost, byddwch hefyd yn gallu gweld y diweddariadau yn eich dangosfwrdd.',
    'Mae hyn yn cynnwys diweddariadau ar:',
  ],
  bullets: ['gorchmynion llys', 'gwrandawiadau', 'penderfyniadau ynghylch eich achos'],
  contactPreferenceLabel: 'Sut hoffech inni gysylltu â chi?',
  contactPreferenceHintText: 'Dewiswch un o’r opsiynau hyn.',
  labelDigital: 'Digidol',
  labelDitigalHintText: 'Fe anfonir pob cyfathrebiad gan y llys drwy e-bost.',
  labelPost: 'Drwy’r post',
  labelPostHintText: 'Fe anfonir pob cyfathrebiad gan y llys drwy’r post.',
  continue: 'Cadw a pharhau',
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

export const generateFormFields = (partyDetails: PartyDetails): GenerateDynamicFormFields => {
  const contactPreferences = partyDetails?.contactPreferences;

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
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const caseNumber = content.userCase?.id!;
  const { user, userCase } = content.additionalData?.req.session;
  const partyDetails = getPartyDetails(userCase, user.id) as PartyDetails;
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const { fields } = generateFormFields(partyDetails);

  return {
    ...translations,
    caption: interpolate(translations.caption, { caseNumber }),
    form: updateFormFields(form, fields),
  };
};
