import languageAssertions from '../../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormInput, LanguageLookup } from '../../../../../app/form/Form';
import { Validator, atLeastOneFieldIsChecked } from '../../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../../app/form/validation');

const en = {
  title: "{firstName} {lastName}'s living arrangements",
  livingArrangements:
    'We need this information so that the court has a complete understanding of the child’s living arrangements.',
  liveWithLabel: 'Select all of the people that the child lives with',
  errors: {
    livingArrangements: {
      required: 'Select all of the people that the child lives with',
    },
  },
};

const cy = {
  title: "{firstName} {lastName}'s living arrangements (welsh)",
  livingArrangements:
    'We need this information so that the court has a complete understanding of the child’s living arrangements. (welsh)',
  liveWithLabel: 'Select all of the people that the child lives with (welsh)',
  errors: {
    livingArrangements: {
      required: 'Select all of the people that the child lives with (welsh)',
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
          liveWith: [],
        },
      ],
      appl_allApplicants: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925678',
          applicantFirstName: 'Applicant1-firstName',
          applicantLastName: 'Applicant1-lastName',
          applicantAddress1: '',
          applicantAddress2: '',
          applicantAddressCounty: '',
          applicantAddressPostcode: '',
          applicantAddressTown: '',
        },
      ],
      resp_Respondents: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7945678',
          firstName: 'Respondent1-firstName',
          lastName: 'Respondent1-lastName',
          address: {
            AddressLine1: '',
            AddressLine2: '',
            County: '',
            PostCode: '',
            PostTown: '',
            Country: '',
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
    languageAssertions('en', { ...en, title: "Child1-firstName Child1-lastName's living arrangements" }, () =>
      generateContent(commonContent)
    );
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', { ...cy, title: "Child1-firstName Child1-lastName's living arrangements (welsh)" }, () =>
      generateContent({ ...commonContent, language: 'cy' })
    );
  });

  test('should contain personal details form fields', () => {
    const { livingArrangements } = fields as Record<string, FormFields>;
    const livingArrangementsValues = livingArrangements.values as FormInput[];

    expect(livingArrangements.type).toBe('checkboxes');
    expect((livingArrangements.label as Function)(generatedContent)).toBe(en.liveWithLabel);
    (livingArrangements.validator as Validator)('');
    expect(atLeastOneFieldIsChecked).toHaveBeenCalledWith('');
    expect(livingArrangementsValues).toHaveLength(3);
    expect(livingArrangementsValues[0].label).toBe('Applicant1-firstName Applicant1-lastName');
    expect(livingArrangementsValues[1].label).toBe('Respondent1-firstName Respondent1-lastName');
    expect(livingArrangementsValues[2].label).toBe('Respondent2-firstName Respondent2-lastName');
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
