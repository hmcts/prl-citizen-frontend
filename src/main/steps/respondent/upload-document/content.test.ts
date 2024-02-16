import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';
import { document_list_cy, document_list_en } from './section-titles';
import { documents_list_items_cy, documents_list_items_en } from './upload-document-list-items';
const enContent = {
  section: 'Upload documents',
  title: 'Select the type of document',
  caseNumber: 'Case Number ',
  note: 'The court will tell you in a letter or email which documents or materials you need to submit.',
  sectionTitles: document_list_en,
  documentsListItems: documents_list_items_en,
  userName: '',
};
const cyContent = {
  section: 'Llwytho dogfennau',
  title: 'Dewiswch y math o ddogfen',
  caseNumber: 'Rhif yr achos ',
  note: 'The court will tell you in a letter or email which documents or materials you need to submit. - welsh',
  sectionTitles: document_list_cy,
  documentsListItems: documents_list_items_cy,
  userName: '',
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
              href: '/respondent/upload-document/has-the-court-asked-for-this-documents/witnessstatements/positionstatements',
              id: 'your-position-statements',
              text: 'Your position statements',
            },
            {
              href: '/respondent/upload-document/has-the-court-asked-for-this-documents/witnessstatements/yourwitnessstatements',
              id: 'your-witness-statements',
              text: 'Your witness statements',
            },
            {
              href: '/respondent/upload-document/has-the-court-asked-for-this-documents/witnessstatements/otherpeoplewitnessstatement',
              id: 'other-witness-statements',
              text: "Other people's witness statements",
            },

            {
              href: '/respondent/upload-document/has-the-court-asked-for-this-documents/witnessstatements/mediafiles',
              id: 'mail-screenshots-media-files',
              text: 'Emails, screenshots, images and other media files',
            },
            {
              href: '/respondent/upload-document/has-the-court-asked-for-this-documents/witnessstatements/medicalrecords',
              id: 'medical-records',
              text: 'Medical records',
            },
            {
              href: '/respondent/upload-document/has-the-court-asked-for-this-documents/witnessstatements/lettersfromschool',
              id: 'letters-from-school',
              text: 'Letters from school',
            },
            {
              href: '/respondent/upload-document/has-the-court-asked-for-this-documents/witnessstatements/tenancyandmortgageavailability',
              id: 'tenancy-mortgage-agreements',
              text: 'Tenancy and mortgage agreements',
            },
          ],
          title: 'Witness statements and evidence',
        },
        {
          items: [
            {
              href: '/respondent/upload-document/has-the-court-asked-for-this-documents/applications/previousorders',
              id: 'previous-orders-submitted',
              text: 'Previous orders submitted with application',
            },
          ],
          title: 'Applications',
        },
        {
          items: [
            {
              href: '/respondent/upload-document/has-the-court-asked-for-this-documents/expertreports/medicalreports',
              id: 'medical-reports',
              text: 'Medical reports',
            },
            {
              href: '/respondent/upload-document/has-the-court-asked-for-this-documents/expertreports/paternitytestreports',
              id: 'paternity-test-reports',
              text: 'Paternity test reports',
            },
            {
              href: '/respondent/upload-document/has-the-court-asked-for-this-documents/expertreports/drugalcoholtests',
              id: 'drug-and-alcohol-tests',
              text: 'Drug and alcohol tests (toxicology)',
            },
            {
              href: '/respondent/upload-document/has-the-court-asked-for-this-documents/expertreports/policedisclosures',
              id: 'police-reports',
              text: 'Police reports',
            },
          ],
          title: 'Expert reports',
        },
        {
          items: [
            {
              href: '/respondent/upload-document/has-the-court-asked-for-this-documents/otherdocuments/otherdocuments',
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
