import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormInput, LanguageLookup } from '../../../../../app/form/Form';
import { Validator, atLeastOneFieldIsChecked } from '../../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
  title: 'Who does {firstName} {lastName} mainly live with?',
  liveWithHint: 'Select the person that the child lives with most of the time.',
  incorrectAddress:
    'If any of the addresses listed here are not correct, you must <a href=/c100-rebuild/applicant/7483640e-0817-4ddc-b709-6723f7925678/personal-details class="govuk-link" rel="external">update the address details.</a>',
  addressNotProvided: 'The address has not been provided',
  address: 'Address: ',
  errors: {
    mainlyLiveWith: {
      required: 'Select the person the child lives with most of the time',
    },
  },
};

const cy = {
  title: 'Who does {firstName} {lastName} mainly live with? (welsh)',
  liveWithHint: 'Select the person that the child lives with most of the time. (welsh)',
  incorrectAddress:
    'If any of the addresses listed here are not correct, you must <a href=/c100-rebuild/applicant/7483640e-0817-4ddc-b709-6723f7925678/personal-details class="govuk-link" rel="external">update the address details.</a> (welsh)',
  addressNotProvided: 'The address has not been provided (welsh)',
  address: 'Cyfeiriad: ',
  errors: {
    mainlyLiveWith: {
      required: 'Select the person the child lives with most of the time (welsh)',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('child > live with', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      cd_children: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          firstName: 'Child1-firstName',
          lastName: 'Child1-lastName',
        },
      ],
      appl_allApplicants: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925678',
          applicantFirstName: 'Applicant1-firstName',
          applicantLastName: 'Applicant1-lastName',
          applicantAddress1: 'applicantAddress1',
          applicantAddress2: 'applicantAddress2',
          applicantAddressCounty: 'applicantAddressCounty',
          applicantAddressPostcode: 'applicantAddressPostcode',
          applicantAddressTown: 'applicantAddressTown',
        },
      ],
      resp_Respondents: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7945678',
          firstName: 'Respondent1-firstName',
          lastName: 'Respondent1-lastName',
          address: {
            AddressLine1: 'AddressLine1',
            AddressLine2: 'AddressLine2',
            County: 'County',
            PostCode: 'PostCode',
            PostTown: 'PostTown',
            Country: 'Country',
          },
        },
        {
          id: '7483640e-0817-4ddc-b709-6723f7345678',
          firstName: 'Respondent2-firstName',
          lastName: 'Respondent2-lastName',
          address: {
            AddressLine1: '',
            AddressLine2: '',
            County: '',
            PostCode: '',
            PostTown: '',
            Country: '',
          },
        },
      ],
    },
    additionalData: {
      req: {
        params: {
          childId: '7483640e-0817-4ddc-b709-6723f7925474',
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
    languageAssertions('en', { ...en, title: 'Who does Child1-firstName Child1-lastName mainly live with?' }, () =>
      generateContent(commonContent)
    );
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions(
      'cy',
      { ...cy, title: 'Who does Child1-firstName Child1-lastName mainly live with? (welsh)' },
      () => generateContent({ ...commonContent, language: 'cy' })
    );
  });

  test('should contain personal details form fields', () => {
    const { mainlyLiveWith } = fields as Record<string, FormFields>;
    const mainlyLiveWithValues = mainlyLiveWith.values as FormInput[];

    expect(mainlyLiveWith.type).toBe('radios');
    expect((mainlyLiveWith.hint as Function)(generatedContent)).toBe(en.liveWithHint);
    (mainlyLiveWith.validator as Validator)('');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('');
    expect(mainlyLiveWithValues).toHaveLength(3);
    expect(mainlyLiveWithValues[0].label).toBe('Applicant1-firstName Applicant1-lastName');
    expect((mainlyLiveWithValues[0].hint as Function)(generatedContent)).toBe(
      'Address: applicantAddress1, applicantAddress2, applicantAddressCounty, applicantAddressPostcode, applicantAddressTown'
    );

    expect(mainlyLiveWithValues[1].label).toBe('Respondent1-firstName Respondent1-lastName');
    expect((mainlyLiveWithValues[1].hint as Function)(generatedContent)).toBe(
      'Address: AddressLine1, AddressLine2, County, PostCode, PostTown, Country'
    );

    expect(mainlyLiveWithValues[2].label).toBe('Respondent2-firstName Respondent2-lastName');
    expect((mainlyLiveWithValues[2].hint as Function)(generatedContent)).toBe('The address has not been provided');
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
