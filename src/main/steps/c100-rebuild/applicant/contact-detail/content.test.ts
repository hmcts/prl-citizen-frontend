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
};

const cy = {
  title: 'Manylion cyswllt ',
  serviceName: 'Child Arrangements - welsh',
  canProvideEmailLabel: 'Allwch chi ddarparu cyfeiriad e-bost',
  canNotProvideEmailLabel: 'Ni allaf ddarparu cyfeiriad e-bost',
  emailAdddressLabel: 'Eich cyfeiriad e-bost',
  telephoneNumberLabel: 'Eich rhif ffôn',
  canProvideTelephoneNumberLabel: 'Gallaf ddarparu rhif ffôn',
  canNotProvideTelephoneNumberLabel: 'Ni allaf ddarparu rhif ffôn',
  voiceMailLabel: "Ydi hi'n iawn i'r llys adael neges llais i chi?",
  voiceMailHint:
    'Os bydd y llys yn ffonio ynghylch eich cais ac ni allwch ateb y ffôn, bydd arnom angen gwybod ei fod yn saff iddynt adael neges llais.',
  voiceMailYesLabel: "Ydy, mae hi'n iawn i'r llys adael neges llais i mi",
  voiceMailNoLabel: "Nac ydy, tydi hi ddim yn iawn i'r llys adael neges llais i mi",
  canNotProvideTelephoneNumberReason: 'Dywedwch wrthym pam na allwch ddarparu rhif ffôn',
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
            canProvideTelephoneNumber: 'Yes',
            telephoneNumber: '',
            canNotProvideTelephoneNumberReason: 'I cannot provide a telephone phone number',
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
    const { canProvideEmail, canProvideTelephoneNumber, canLeaveVoiceMail } = fields as Record<string, FormFields>;

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

    expect((canProvideEmail.values[1].label as Function)(generatedContent)).toBe(en.canNotProvideEmailLabel);
    expect(canProvideEmail.values[1].value).toBe(YesNoEmpty.NO);

    expect(canProvideTelephoneNumber.type).toBe('radios');
    expect(canProvideTelephoneNumber.classes).toBe('govuk-radios');

    expect((canProvideTelephoneNumber.values[0].label as Function)(generatedContent)).toBe(
      en.canProvideTelephoneNumberLabel
    );
    expect(canProvideTelephoneNumber.values[0].value).toBe(YesNoEmpty.YES);
    const telephoneNumber = canProvideTelephoneNumber.values[0].subFields!.telephoneNumber;
    expect((telephoneNumber?.label as Function)(generatedContent)).toBe(en.telephoneNumberLabel);
    expect(telephoneNumber.type).toBe('text');
    (telephoneNumber.validator as Function)('09999999999');
    expect(isFieldFilledIn).toHaveBeenCalledWith('09999999999');
    expect(isPhoneNoValid).toHaveBeenCalledWith('09999999999');

    expect((canProvideTelephoneNumber.values[1].label as Function)(generatedContent)).toBe(
      en.canNotProvideTelephoneNumberLabel
    );
    expect(canProvideTelephoneNumber.values[1].value).toBe(YesNoEmpty.NO);
    const canNotProvideTelephoneNumberReason =
      canProvideTelephoneNumber.values[1].subFields!.canNotProvideTelephoneNumberReason;
    expect((canNotProvideTelephoneNumberReason?.label as Function)(generatedContent)).toBe(
      en.canNotProvideTelephoneNumberReasonLabel
    );
    expect(canNotProvideTelephoneNumberReason.type).toBe('text');
    (canNotProvideTelephoneNumberReason.validator as Function)('test');
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
