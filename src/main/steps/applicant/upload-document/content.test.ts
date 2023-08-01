import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';
import { document_list_cy, document_list_en } from './section-titles';
import { documents_list_items_cy, documents_list_items_en } from './upload-document-list-items';
const enContent = {
  section: 'Upload documents',
  caseNumber: 'Case Number ',
  title: 'Select the type of document',
  line1: 'If the court has asked you to submit further evidence, you can upload documents here.',
  sectionTitles: document_list_en,
  documentsListItems: documents_list_items_en,
};
const cyContent = {
  section: 'Llwytho dogfennau',
  caseNumber: 'Rhif yr achos ',
  title: 'Dewiswch y math o ddogfen',
  line1: 'Os yw’r llys wedi gofyn i chi gyflwyno tystiolaeth bellach, gallwch lwytho dogfennau yma.',
  sectionTitles: document_list_cy,
  documentsListItems: documents_list_items_cy,
};
describe('task-list > content', () => {
  const commonContent = {
    language: 'en',
    userCase: mockUserCase,
    additionalData: { req: { session: { userCase: mockUserCase }, originalUrl: '/' } },
  } as unknown as CommonContent;
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
              href: '/applicant/upload-document/start/witnessstatements/positionstatements',
              id: 'your-position-statements',
              text: 'Your position statements',
            },
            {
              href: '/applicant/upload-document/start/witnessstatements/yourwitnessstatements',
              id: 'your-witness-statements',
              text: 'Your witness statements',
            },
            {
              href: '/applicant/upload-document/start/witnessstatements/otherpeoplewitnessstatement',
              id: 'other-witness-statements',
              text: "Other people's witness statements",
            },

            {
              href: '/applicant/upload-document/start/witnessstatements/mediafiles',
              id: 'mail-screenshots-media-files',
              text: 'Emails, screenshots, images and other media files',
            },
            {
              href: '/applicant/upload-document/start/witnessstatements/medicalrecords',
              id: 'medical-records',
              text: 'Medical records',
            },
            {
              href: '/applicant/upload-document/start/witnessstatements/lettersfromschool',
              id: 'letters-from-school',
              text: 'Letters from school',
            },
            {
              href: '/applicant/upload-document/start/witnessstatements/tenancyandmortgageavailability',
              id: 'tenancy-mortgage-agreements',
              text: 'Tenancy and mortgage agreements',
            },
          ],
          title: 'Witness statements and evidence',
        },
        {
          items: [
            {
              href: '/applicant/upload-document/start/applications/previousorders',
              id: 'previous-orders-submitted',
              text: 'Previous orders submitted with application',
            },
          ],
          title: 'Applications',
        },
        {
          items: [
            {
              href: '/applicant/upload-document/start/expertreports/medicalreports',
              id: 'medical-reports',
              text: 'Medical reports',
            },
            {
              href: '/applicant/upload-document/start/expertreports/paternitytestreports',
              id: 'paternity-test-reports',
              text: 'Paternity test reports',
            },
            {
              href: '/applicant/upload-document/start/expertreports/drugalcoholtests',
              id: 'drug-and-alcohol-tests',
              text: 'Drug and alcohol tests (toxicology)',
            },
            {
              href: '/applicant/upload-document/start/expertreports/policedisclosures',
              id: 'police-reports',
              text: 'Police reports',
            },
          ],
          title: 'Expert reports',
        },
        {
          items: [
            {
              href: '/applicant/upload-document/start/otherdocuments/otherDocuments',
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
