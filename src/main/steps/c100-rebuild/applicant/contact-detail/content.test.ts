import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { YesNoEmpty } from '../../../../app/case/definition';
import { FormContent, FormFields, LanguageLookup } from '../../../../app/form/Form';
import { isEmailValid, isFieldFilledIn, isPhoneNoValid } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const en = {
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
};

const cy = {
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
};

/* eslint-disable @typescript-eslint/ban-types */
describe('applicant > contact details', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      appl_allApplicants: [
        {
          id: 'a68f0076-5e0a-4751-85f0-f9d911eaa4ac',
          applicantFirstName: 'Bob',
          applicantLastName: 'Silly',
          applicantContactDetail: {
            canProvideEmail: 'No',
            emailAddress: '',
            homePhoneNumber: '09999999999',
            canProvideMobileNumber: 'Yes',
            mobileNumber: '',
            canNotProvideMobileNumberReason: 'I cannot provide a mobile phone number',
            canLeaveVoiceMail: 'Yes',
          },
        },
      ],
    },
    additionalData: {
      req: {
        params: {
          applicantId: 'a68f0076-5e0a-4751-85f0-f9d911eaa4ac',
        },
      },
    },
  } as unknown as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions(
      'en',
      {
        ...en,
        title: `${en.title} Bob Silly`,
        errors: {
          ...en.errors,
        },
      },
      () => generateContent(commonContent)
    );
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions(
      'cy',
      {
        ...cy,
        title: `${cy.title} Bob Silly`,
        errors: {
          ...cy.errors,
        },
      },
      () => generateContent({ ...commonContent, language: 'cy' })
    );
  });

  test('should contain contact details form fields', () => {
    const { canProvideEmail, homePhoneNumber, canProvideMobileNumber, canLeaveVoiceMail } = fields as Record<
      string,
      FormFields
    >;

    expect(canProvideEmail.type).toBe('radios');
    expect(canProvideEmail.classes).toBe('govuk-radios');
    expect((canProvideEmail.values[0].label as Function)(generatedContent)).toBe(en.canProvideEmailLabel);
    expect(canProvideEmail.values[0].value).toBe(YesNoEmpty.YES);

    const emailAddress = canProvideEmail.values[0].subFields!.emailAddress;
    expect((emailAddress?.label as Function)(generatedContent)).toBe(en.emailAdddressLabel);
    expect(emailAddress.type).toBe('text');
    (emailAddress.validator as Function)('test@gmail.com');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test@gmail.com');
    expect(isEmailValid).toHaveBeenCalledWith('test@gmail.com');

    expect(homePhoneNumber.type).toBe('text');
    expect((homePhoneNumber.label as Function)(generatedContent)).toBe(en.homePhoneNumberLabel);
    (homePhoneNumber.validator as Function)('0999999999');
    expect(isPhoneNoValid).toHaveBeenCalledWith('0999999999');

    expect(canProvideMobileNumber.type).toBe('radios');
    expect(canProvideMobileNumber.classes).toBe('govuk-radios');

    expect((canProvideMobileNumber.values[0].label as Function)(generatedContent)).toBe(en.canProvideMobileNumberLabel);
    expect(canProvideMobileNumber.values[0].value).toBe(YesNoEmpty.YES);
    const mobileNumber = canProvideMobileNumber.values[0].subFields!.mobileNumber;
    expect((mobileNumber?.label as Function)(generatedContent)).toBe(en.mobileNumberLabel);
    expect(mobileNumber.type).toBe('text');
    (mobileNumber.validator as Function)('09999999999');
    expect(isFieldFilledIn).toHaveBeenCalledWith('09999999999');
    expect(isPhoneNoValid).toHaveBeenCalledWith('09999999999');

    expect((canProvideMobileNumber.values[1].label as Function)(generatedContent)).toBe(
      en.canNotProvideMobileNumberLabel
    );
    expect(canProvideMobileNumber.values[1].value).toBe(YesNoEmpty.NO);
    const canNotProvideMobileNumberReason = canProvideMobileNumber.values[1].subFields!.canNotProvideMobileNumberReason;
    expect((canNotProvideMobileNumberReason?.label as Function)(generatedContent)).toBe(
      en.canNotProvideMobileNumberReasonLabel
    );
    expect(canNotProvideMobileNumberReason.type).toBe('text');
    (canNotProvideMobileNumberReason.validator as Function)('test');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test');

    expect(canLeaveVoiceMail.type).toBe('radios');
    expect(canLeaveVoiceMail.classes).toBe('govuk-radios');
    expect((canLeaveVoiceMail.label as Function)(generatedContent)).toBe(en.voiceMailLabel);
    expect(canLeaveVoiceMail.labelSize).toBe('m');
    expect((canLeaveVoiceMail.hint as Function)(generatedContent)).toBe(en.voiceMailHint);

    expect((canLeaveVoiceMail.values[0].label as Function)(generatedContent)).toBe(en.voiceMailYesLabel);
    expect(canLeaveVoiceMail.values[0].value).toBe(YesNoEmpty.YES);

    expect((canLeaveVoiceMail.values[1].label as Function)(generatedContent)).toBe(en.voiceMailNoLabel);
    expect(canLeaveVoiceMail.values[1].value).toBe(YesNoEmpty.NO);

    expect((canProvideEmail.values[1].label as Function)(generatedContent)).toBe(en.canNotProvideEmailLabel);
    expect(canProvideEmail.values[1].value).toBe(YesNoEmpty.NO);

    (canProvideEmail.validator as Function)(YesNoEmpty.YES);
    expect(isFieldFilledIn).toHaveBeenCalledWith(YesNoEmpty.YES);
  });

  test('should contain Save and continue button', () => {
    expect(
      (form?.onlycontinue?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });

  test('should contain saveAndComeLater button', () => {
    expect(
      (form?.saveAndComeLater?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Save and come back later');
  });
});
