import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';
const enContent = {
  title: 'Select the type of document',
  // sectionTitles: {
  //   witness_statements_and_evidence: 'Witness statements and evidence',
  //   applications: 'Applications',
  //   expert_reports: 'Expert reports',
  //   other_documents: 'Other documents',
  // },
  // uploadDocsList: {
  //   your_position_statements: 'Your position statements',
  //   your_witness_statements: 'Your witness statements',
  //   other_witness_statements: "Other people's witness statements",
  //   mail_screenshots_media_files: 'Emails, screenshots, images and other media files',
  //   medical_records: 'Medical records',
  //   letters_from_school: 'Letters from school',
  //   tenancy_mortgage_agreements: 'Tenancy and mortgage agreements',
  //   previous_orders_submitted: 'Previous orders submitted with application',
  //   medical_reports: 'Medical reports',
  //   paternity_test_reports: 'Paternity test reports',
  //   drug_and_alcohol_tests: 'Drug and alcohol tests (toxicology)',
  //   police_reports: 'Police reports',
  //   other_documents: 'Other documents',
  // },
};
const cyContent = {
  title: 'Select the type of document',
  // sectionTitles: {
  //   witness_statements_and_evidence: 'Witness statements and evidence',
  //   applications: 'Applications',
  //   expert_reports: 'Expert reports',
  //   other_documents: 'Other documents',
  // },
  // uploadDocsList: {
  //   your_position_statements: 'Your position statements',
  //   your_witness_statements: 'Your witness statements',
  //   other_witness_statements: "Other people's witness statements",
  //   mail_screenshots_media_files: 'Emails, screenshots, images and other media files',
  //   medical_records: 'Medical records',
  //   letters_from_school: 'Letters from school',
  //   tenancy_mortgage_agreements: 'Tenancy and mortgage agreements',
  //   previous_orders_submitted: 'Previous orders submitted with application',
  //   medical_reports: 'Medical reports',
  //   paternity_test_reports: 'Paternity test reports',
  //   drug_and_alcohol_tests: 'Drug and alcohol tests (toxicology)',
  //   police_reports: 'Police reports',
  //   other_documents: 'Other documents',
  // },
};
describe('task-list > content', () => {
  const commonContent = { language: 'en', userCase: mockUserCase } as CommonContent;
  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });
  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('en', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });
  test.each([
    {
      userCase: mockUserCase,
      expected: [
        {
          items: [
            {
              href: '/respondent/upload-document/start?caption=Witness statements and evidence&document_type=Your position statements',
              id: 'your-position-statements',
              text: 'Your position statements',
            },
            {
              href: '/respondent/upload-document/start?caption=Witness statements and evidence&document_type=Your witness statements',
              id: 'your-witness-statements',
              text: 'Your witness statements',
            },
            {
              href: "/respondent/upload-document/start?caption=Witness statements and evidence&document_type=Other people's witness statements",
              id: 'other-witness-statements',
              text: "Other people's witness statements",
            },

            {
              href: '/respondent/upload-document/start?caption=Witness statements and evidence&document_type=Emails, screenshots, images and other media files',
              id: 'mail-screenshots-media-files',
              text: 'Emails, screenshots, images and other media files',
            },
            {
              href: '/respondent/upload-document/start?caption=Witness statements and evidence&document_type=Medical records',
              id: 'medical-records',
              text: 'Medical records',
            },
            {
              href: '/respondent/upload-document/start?caption=Witness statements and evidence&document_type=Letters from school',
              id: 'letters-from-school',
              text: 'Letters from school',
            },
            {
              href: '/respondent/upload-document/start?caption=Witness statements and evidence&document_type=Tenancy and mortgage agreements',
              id: 'tenancy-mortgage-agreements',
              text: 'Tenancy and mortgage agreements',
            },
          ],
          title: 'Witness statements and evidence',
        },
        {
          items: [
            {
              href: '/respondent/upload-document/start?caption=Applications&document_type=Previous orders submitted with application',
              id: 'previous-orders-submitted',
              text: 'Previous orders submitted with application',
            },
          ],
          title: 'Applications',
        },
        {
          items: [
            {
              href: '/respondent/upload-document/start?caption=Expert reports&document_type=Medical reports',
              id: 'medical-reports',
              text: 'Medical reports',
            },
            {
              href: '/respondent/upload-document/start?caption=Expert reports&document_type=Paternity test reports',
              id: 'paternity-test-reports',
              text: 'Paternity test reports',
            },
            {
              href: '/respondent/upload-document/start?caption=Expert reports&document_type=Drug and alcohol tests (toxicology)',
              id: 'drug-and-alcohol-tests',
              text: 'Drug and alcohol tests (toxicology)',
            },
            {
              href: '/respondent/upload-document/start?caption=Expert reports&document_type=Police reports',
              id: 'police-reports',
              text: 'Police reports',
            },
          ],
          title: 'Expert reports',
        },
        {
          items: [
            {
              href: '/respondent/upload-document/start?caption=Other documents&document_type=Other documents',
              id: 'other-documents',
              text: 'Other documents',
            },
          ],
          title: 'Other documents',
        },
      ],
    },
  ])('should generate correct task list %#', ({ userCase, expected }) => {
    const { sections: uploadDocsList } = generateContent({ ...commonContent, userCase });
    expect(uploadDocsList).toEqual(expected);
  });
});
