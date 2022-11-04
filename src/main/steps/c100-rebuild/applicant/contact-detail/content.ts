import { C100Applicant, YesNoEmpty } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, GenerateDynamicFormFields } from '../../../../app/form/Form';
import { isEmailValid, isFieldFilledIn, isPhoneNoValid } from '../../../../app/form/validation';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const en = () => ({
  title: 'Contact details of',
  serviceName: 'Child Arrangements',
  canProvideEmailLabel: 'I can provide an email address',
  canNotProvideEmailLabel: 'I cannot provide an email address',
  homePhoneNumberLabel: 'Your home phone',
  emailAdddressLabel: 'Your email address',
  mobileNumberLabel: 'Your mobile phone',
  canProvideMobileNumberLabel: 'I can provide a mobile phone number',
  canNotProvideMobileNumberLabel: 'I cannot provide a mobile phone number',
  voiceMailLabel: 'Can the court leave you a voicemail?',
  voiceMailHint:
    'If the court calls you about your application and you cannot answer the phone, we need to know that it’s safe for them to leave a voicemail.',
  voiceMailYesLabel: 'Yes, the court can leave me a voicemail',
  voiceMailNoLabel: 'No, the court cannot leave me a voicemail',
  canNotProvideMobileNumberReasonLabel: 'Tell us why the court cannot phone you',
  errors: {
    canProvideEmail: {
      required: 'Please select email option',
    },
    canProvideMobileNumber: {
      required: 'Please select mobile number option',
    },
    emailAddress: {
      required: 'Enter an email address or select cannot provide email address option',
      invalid: 'Enter an email address in the correct format, like name@example.com',
    },
    homePhoneNumber: {
      invalid: 'Enter a home phone number in the correct format',
    },
    mobileNumber: {
      invalid: 'Enter a mobile phone number in the correct format',
      required: 'Enter a mobile number or tell us why the court cannot phone you',
    },
    canNotProvideMobileNumberReason: {
      required: 'Please tell us why the court cannot phone you',
    },
    canLeaveVoiceMail: {
      required: 'Please select voice mail option',
    },
  },
});

const cy = () => ({
  title: 'Contact details of - welsh',
  serviceName: 'Child Arrangements - welsh',
  canProvideEmailLabel: 'I can provide an email address - welsh',
  canNotProvideEmailLabel: 'I cannot provide an email address - welsh',
  homePhoneNumberLabel: 'Your home phone - welsh',
  emailAdddressLabel: 'Your email address - welsh',
  mobileNumberLabel: 'Your mobile phone - welsh',
  canProvideMobileNumberLabel: 'I can provide a mobile phone number - welsh',
  canNotProvideMobileNumberLabel: 'I cannot provide a mobile phone number - welsh',
  voiceMailLabel: 'Can the court leave you a voicemail? - welsh',
  voiceMailHint:
    'If the court calls you about your application and you cannot answer the phone, we need to know that it’s safe for them to leave a voicemail. - welsh',
  voiceMailYesLabel: 'Yes, the court can leave me a voicemail - welsh',
  voiceMailNoLabel: 'No, the court cannot leave me a voicemail - welsh',
  canNotProvideMobileNumberReason: 'Tell us why the court cannot phone you - welsh',
  errors: {
    canProvideEmail: {
      required: 'Please select email option - welsh',
    },
    canProvideMobileNumber: {
      required: 'Please select mobile number option - welsh',
    },
    emailAddress: {
      required: 'Enter an email address or select cannot provide email address option - welsh',
      invalid: 'Enter an email address in the correct format, like name@example.com - welsh',
    },
    homePhoneNumber: {
      invalid: 'Enter a home phone number in the correct format - welsh',
    },
    mobileNumber: {
      invalid: 'Enter a mobile phone number in the correct format - welsh',
      required: 'Enter a mobile number or tell us why the court cannot phone you - welsh',
    },
    canNotProvideMobileNumberReason: {
      required: 'Please tell us why the court cannot phone you - welsh',
    },
    canLeaveVoiceMail: {
      required: 'Please select voice mail option - welsh',
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

export const generateFormFields = (
  applicantContactDetail: Partial<C100Applicant>['applicantContactDetail']
): GenerateDynamicFormFields => {
  const {
    canProvideEmail,
    emailAddress,
    homePhoneNumber,
    canProvideMobileNumber,
    mobileNumber,
    canNotProvideMobileNumberReason,
    canLeaveVoiceMail,
  } = applicantContactDetail!;
  const errors = {
    en: {},
    cy: {},
  };
  const fields = {
    canProvideEmail: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.canProvideEmailLabel,
          selected: canProvideEmail === YesNoEmpty.YES,
          value: YesNoEmpty.YES,
          subFields: {
            emailAddress: {
              type: 'text',
              label: l => l.emailAdddressLabel,
              labelSize: null,
              value: emailAddress,
              validator: value => isFieldFilledIn(value) || isEmailValid(value),
            },
          },
        },
        {
          label: l => l.canNotProvideEmailLabel,
          selected: canProvideEmail === YesNoEmpty.NO,
          value: YesNoEmpty.NO,
        },
      ],
      validator: isFieldFilledIn,
    },
    homePhoneNumber: {
      type: 'text',
      label: l => l.homePhoneNumberLabel,
      labelSize: null,
      value: homePhoneNumber,
      validator: isPhoneNoValid,
    },
    canProvideMobileNumber: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.canProvideMobileNumberLabel,
          selected: canProvideMobileNumber === YesNoEmpty.YES,
          value: YesNoEmpty.YES,
          subFields: {
            mobileNumber: {
              type: 'text',
              label: l => l.mobileNumberLabel,
              labelSize: null,
              value: mobileNumber,
              validator: value => isFieldFilledIn(value) || isPhoneNoValid(value),
            },
          },
        },
        {
          label: l => l.canNotProvideMobileNumberLabel,
          selected: canProvideMobileNumber === YesNoEmpty.NO,
          value: YesNoEmpty.NO,
          subFields: {
            canNotProvideMobileNumberReason: {
              type: 'text',
              label: l => l.canNotProvideMobileNumberReasonLabel,
              labelSize: null,
              value: canNotProvideMobileNumberReason,
              validator: isFieldFilledIn,
            },
          },
        },
      ],
      validator: isFieldFilledIn,
    },
    canLeaveVoiceMail: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.voiceMailLabel,
      labelSize: 'm',
      hint: l => l.voiceMailHint,
      values: [
        {
          label: l => l.voiceMailYesLabel,
          selected: canLeaveVoiceMail === YesNoEmpty.YES,
          value: YesNoEmpty.YES,
        },
        {
          label: l => l.voiceMailNoLabel,
          selected: canLeaveVoiceMail === YesNoEmpty.NO,
          value: YesNoEmpty.NO,
        },
      ],
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

export const getFormFields = (): FormContent => {
  return updatedForm;
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  const applicantId = content?.additionalData?.req.params.applicantId;
  const applicantData = content.userCase?.appl_allApplicants!.find(i => i.id === applicantId) as C100Applicant;
  const { applicantFirstName, applicantLastName } = applicantData;

  return {
    ...translations,
    title: `${translations.title} ${applicantFirstName} ${applicantLastName}`,
    form: updateFormFields(form, generateFormFields(applicantData.applicantContactDetail).fields),
  };
};
