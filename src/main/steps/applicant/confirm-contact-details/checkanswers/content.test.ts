import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent } from '../../../../app/form/Form';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';

const enContent = {
  section: 'Check your details',
  title: 'Read the information to make sure it is correct, and add any missing details',
  sectionTitles: {
    applicationDetails: 'Application details',
  },
  keys: {
    applicant1FullName: 'Name',
    applicant1DateOfBirth: 'Date of birth',
    applicant1PlaceOfBirth: 'Place of birth',
    address: 'Address',
    addressHistory: 'Address history',
    applicant1PhoneNumber: 'Phone number',
    applicant1EmailAddress: 'Email',
  },
  errors: {},
};

const cyContent: typeof enContent = {
  section: 'Check your details (Welsh)',
  title: 'Read the information to make sure it is correct, and add any missing details (Welsh)',
  sectionTitles: {
    applicationDetails: 'Manylion y cais',
  },
  keys: {
    applicant1FullName: 'Name',
    applicant1DateOfBirth: 'Date of birth',
    applicant1PlaceOfBirth: 'Place of birth',
    address: 'Address',
    addressHistory: 'Address history',
    applicant1PhoneNumber: 'Phone number',
    applicant1EmailAddress: 'Email',
  },
  errors: {},
};

jest.mock('../../../../app/form/validation');
/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields;
  });

  test('should return correct english content', () => {
    expect(generatedContent.title).toEqual(
      'Read the information to make sure it is correct, and add any missing details'
    );
    expect(generatedContent.section).toEqual('Check your details');
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content Data', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should contain detailsKnown field', () => {
    const applicant1FullName = fields.applicant1FullName;
    expect(applicant1FullName.type).toBe('String');
    expect((applicant1FullName.section as Function)(generatedContent)).toBe(enContent.section);
  });

  test('should contain continue button', () => {
    expect((form.submit?.text as Function)(generatedContent)).toBe('Continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
