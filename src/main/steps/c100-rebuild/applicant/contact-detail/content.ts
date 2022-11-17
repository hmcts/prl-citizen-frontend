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
  emailAdddressLabel: 'Your email address',
  telephoneNumberLabel: 'Your telephone phone',
  canProvideTelephoneNumberLabel: 'I can provide a telephone number',
  canNotProvideTelephoneNumberLabel: 'I cannot provide a telephone number',
  voiceMailLabel: 'Can the court leave you a voicemail?',
  voiceMailHint:
    'If the court calls you about your application and you cannot answer the phone, we need to know that it’s safe for them to leave a voicemail.',
  voiceMailYesLabel: 'Yes, the court can leave me a voicemail',
  voiceMailNoLabel: 'No, the court cannot leave me a voicemail',
  canNotProvideTelephoneNumberReasonLabel: 'Please tell us why you cannot provide telephone number',
  errors: {
    canProvideEmail: {
      required: 'Please select email option',
    },
    canProvideTelephoneNumber: {
      required: 'Please select telephone number option',
    },
    emailAddress: {
      required: 'Enter an email address or select cannot provide email address option',
      invalid: 'Enter an email address in the correct format, like name@example.com',
    },
    telephoneNumber: {
      invalid: 'Enter a telephone number in the correct format',
      required: 'Enter a telephone number or tell us why the court cannot phone you',
    },
    canNotProvideTelephoneNumberReason: {
      required: 'Please tell us why you cannot provide telephone number',
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
  emailAdddressLabel: 'Your email address - welsh',
  telephoneNumberLabel: 'Your telephone number - welsh',
  canProvideTelephoneNumberLabel: 'I can provide a telephone number - welsh',
  canNotProvideTelephoneNumberLabel: 'I cannot provide a telephone number - welsh',
  voiceMailLabel: 'Can the court leave you a voicemail? - welsh',
  voiceMailHint:
    'If the court calls you about your application and you cannot answer the phone, we need to know that it’s safe for them to leave a voicemail. - welsh',
  voiceMailYesLabel: 'Yes, the court can leave me a voicemail - welsh',
  voiceMailNoLabel: 'No, the court cannot leave me a voicemail - welsh',
  canNotProvideTelephoneNumberReason: 'Please tell us why you cannot provide telephone number - welsh',
  errors: {
    canProvideEmail: {
      required: 'Please select email option - welsh',
    },
    canProvideTelephoneNumber: {
      required: 'Please select telephone number option - welsh',
    },
    emailAddress: {
      required: 'Enter an email address or select cannot provide email address option - welsh',
      invalid: 'Enter an email address in the correct format, like name@example.com - welsh',
    },
    telephoneNumber: {
      invalid: 'Enter a telephone number in the correct format - welsh',
      required: 'Enter a telephone number or tell us why the court cannot phone you - welsh',
    },
    canNotProvideTelephoneNumberReason: {
      required: 'Please tell us why you cannot provide telephone number - welsh',
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
    canProvideTelephoneNumber,
    telephoneNumber,
    canNotProvideTelephoneNumberReason,
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
    canProvideTelephoneNumber: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.canProvideTelephoneNumberLabel,
          selected: canProvideTelephoneNumber === YesNoEmpty.YES,
          value: YesNoEmpty.YES,
          subFields: {
            telephoneNumber: {
              type: 'text',
              label: l => l.telephoneNumberLabel,
              labelSize: null,
              value: telephoneNumber,
              validator: value => isFieldFilledIn(value) || isPhoneNoValid(value),
            },
          },
        },
        {
          label: l => l.canNotProvideTelephoneNumberLabel,
          selected: canProvideTelephoneNumber === YesNoEmpty.NO,
          value: YesNoEmpty.NO,
          subFields: {
            canNotProvideTelephoneNumberReason: {
              type: 'text',
              label: l => l.canNotProvideTelephoneNumberReasonLabel,
              labelSize: null,
              value: canNotProvideTelephoneNumberReason,
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
