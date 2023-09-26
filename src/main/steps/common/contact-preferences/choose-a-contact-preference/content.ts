/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars*/
/* eslint-disable @typescript-eslint/no-explicit-any*/
import { ContactPreference } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { atLeastOneFieldIsChecked } from '../../../../app/form/validation';
import { interpolate } from '../../string-parser';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const en = () => ({
  caption: 'Case number {caseNumber}',
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
    preferredModeOfContact: {
      required: 'Please select a contact preference',
    },
  },
});

export const cy = () => ({
  caption: 'Rhif yr achos {caseNumber}',
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
    preferredModeOfContact: {
      required: 'Dewiswch sut hoffech inni gysylltu â chi',
    },
  },
});

const languages = {
  en,
  cy,
};

//let updatedForm: FormContent;

/*const updateFormFields = (form: FormContent, formFields: FormContent['fields']): FormContent => {
  updatedForm = {
    ...form,
    fields: {
      ...formFields,
      ...(form.fields ?? {}),
    },
  };

  return updatedForm;
};*/

/*export const generateFormFields = (partyDetails: PartyDetails): GenerateDynamicFormFields => {
  const {contactPreferences} = partyDetails ?? {};

  const errors = {
    en: {},
    cy: {},
  };

  const fields = {
    preferredModeOfContact: {
      id: 'preferredModeOfContact',
      type: 'radios',
      classes: 'govuk-radios',
      validator: atLeastOneFieldIsChecked,
      label: l => l.contactPreferenceLabel,
      labelSize: 'm',
      hint: l => l.contactPreferenceHintText,
      values: [
        {
          label: l => l.labelDigital,
          name: 'preferredModeOfContact',
          value: ContactPreference.DIGITAL,
          selected: contactPreferences === ContactPreference.DIGITAL,
          hint: l => l.labelDitigalHintText,
        },
        {
          label: l => l.labelPost,
          name: 'preferredModeOfContact',
          value: ContactPreference.POST,
          selected: contactPreferences === ContactPreference.POST,
          hint: l => l.labelPostHintText,
        },
      ],
    },
  };

  return { fields, errors };
};*/

export const form: FormContent = {
  fields: {
    preferredModeOfContact: {
      id: 'preferredModeOfContact',
      type: 'radios',
      classes: 'govuk-radios',
      validator: atLeastOneFieldIsChecked,
      label: l => l.contactPreferenceLabel,
      labelSize: 'm',
      hint: l => l.contactPreferenceHintText,
      values: [
        {
          label: l => l.labelDigital,
          name: 'preferredModeOfContact',
          value: ContactPreference.DIGITAL,
          hint: l => l.labelDitigalHintText,
        },
        {
          label: l => l.labelPost,
          name: 'preferredModeOfContact',
          value: ContactPreference.POST,
          hint: l => l.labelPostHintText,
        },
      ],
    },
  },
  onlycontinue: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const caseNumber = content.userCase?.id!;
  //const { user, userCase } = content.additionalData?.req.session;
  //const partyDetails = getPartyDetails(userCase, user.id) as PartyDetails;
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  //const { fields } = generateFormFields(partyDetails);

  return {
    ...translations,
    form,
    caption: interpolate(translations.caption, { caseNumber }),
  };
};
