import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../../test/unit/utils/mockUserCase';
import { CommonContent } from '../../../common/common.content';

import { generateContent } from './content';
const enContent = {
  caseNumber: 'Case number',
  uploadDocuments: {
    title: 'Select the type of document',
    pageCaption: 'Upload documents',
    content: 'The court will tell you in a letter or email which documents or material you need to submit.',
    documentSectionTitles: {
      witnessStatementsAndEvidence: 'Witness statements and evidence',
      applications: 'Applications',
      expertReports: 'Expert reports',
      otherDocuments: 'Other documents',
    },
    documentCategoryLabels: {
      positionStatements: 'Your position statement',
      witnessStatements: 'Your witness statements',
      otherPeopleWitnessStatements: "Other people's witness statements",
      emailImagesMedia: 'Emails, screenshots, images and other media files',
      medicalRecords: 'Medical records',
      lettersFromSchool: 'Letters from school',
      tenancyMortgageAgreements: 'Tenancy and mortgage agreements',
      sumbitAWPApplication: 'Submit an application',
      previousOrdersSubmitted: 'Previous orders submitted with application',
      medicalReports: 'Medical reports',
      paternityTestReports: 'Paternity test reports',
      drugAndAlcoholTests: 'Drug and alcohol tests (toxicology)',
      policeReports: 'Police reports',
      fm5Document: 'Statement of position on non-court dispute resolution (NCDR) (form FM5)',
      otherDocuments: 'Other documents',
    },
  },
  viewDocuments: {
    title: 'View all documents',
    documentSectionTitles: {
      applicationPacks: 'Application packs',
      ordersFromTheCourt: 'Orders from the court',
      applicantsDocuments: "Applicant's documents",
      respondentsDocuments: "Respondent's documents",
      attendingTheHearing: 'Hearing details',
      otherDocuments: 'Other documents',
    },
    documentCategoryLabels: {
      viewAllOrders: 'Orders from the court',
      packServed: 'Your served application pack',
      packToBeServed: 'Application pack to be served on the respondent',
      viewApplicantsDocuments: "Applicant's documents",
      viewRespondentsDocuments: "Respondent's documents",
      viewAttendingTheHearing: 'Hearing details',
      viewOtherDocuments: 'Other documents',
    },
  },
};

const cyContent = {
  caseNumber: 'Rhif yr achos',
  uploadDocuments: {
    title: 'Dewiswch y math o ddogfen',
    pageCaption: 'Llwytho dogfennau',
    content:
      'Bydd y llys yn dweud wrthych mewn llythyr neu e-bost pa ddogfennau neu ddeunydd y mae angen i chi eu cyflwyno.',
    documentSectionTitles: {
      witnessStatementsAndEvidence: 'Datganiadau tyst a thystiolaeth',
      applications: 'Ceisiadau',
      expertReports: 'Adroddiadau arbenigwyr',
      otherDocuments: 'Dogfennau eraill',
    },
    documentCategoryLabels: {
      positionStatements: 'Eich datganiadau safbwynt',
      witnessStatements: 'Eich datganiadau tyst',
      otherPeopleWitnessStatements: 'Datganiadau tyst pobl eraill',
      emailImagesMedia: 'Negeseuon e-bost, cipluniau, delweddau a ffeiliau cyfryngau eraill',
      medicalRecords: 'Cofnodion meddygol',
      lettersFromSchool: 'Llythyrau gan yr ysgol',
      tenancyMortgageAgreements: 'Tenantiaeth a morgais',
      sumbitAWPApplication: 'Submit an application - welsh',
      previousOrdersSubmitted: "Gorchmynion blaenorol wedi'u cyflwyno gyda'r cais",
      medicalReports: 'Adroddiadau meddygol',
      paternityTestReports: 'Adroddiadau profion tadolaeth',
      drugAndAlcoholTests: 'Profion cyffuriau ac alcohol (tocsicoleg)',
      policeReports: "Adroddiadau'r heddlu",
      fm5Document: 'Datganiad safbwynt ar ddatrys anghydfod y tu allan i’r llys (NCDR) (ffurflen FM5)',
      otherDocuments: 'Dogfennau eraill',
    },
  },
  viewDocuments: {
    title: 'View all documents -welsh',
    documentSectionTitles: {
      applicationPacks: 'Application packs - welsh',
      ordersFromTheCourt: 'Gorchmynion gan y llys',
      applicantsDocuments: 'Dogfennau’r Ceisydd',
      respondentsDocuments: "Dogfennau'r Atebydd",
      attendingTheHearing: 'Hearing details -welsh',
      otherDocuments: 'Other documents -welsh',
    },
    documentCategoryLabels: {
      viewAllOrders: 'All orders from the court - welsh',
      packServed: 'Your served application pack - welsh',
      packToBeServed: 'Application pack to be served on the respondent - welsh',
      viewApplicantsDocuments: "Applicant's documents - welsh",
      viewRespondentsDocuments: "Respondent's documents - welsh",
      viewAttendingTheHearing: 'Hearing details - welsh',
      viewOtherDocuments: 'Other documents - welsh',
    },
  },
};

describe('documents > upload > content', () => {
  const commonContent = {
    language: 'en',
    userCase: mockUserCase,
    additionalData: { req: { session: { userCase: mockUserCase, user: { id: '1234' } }, originalUrl: '/' } },
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
          id: 'witnessStatementsAndEvidence',
          items: [
            {
              categoryId: 'your-position-statements',
              link: {
                text: 'Your position statement',
                url: '/applicant/documents/upload/your-position-statements/has-the-court-asked-for-this-documents',
              },
            },
            {
              categoryId: 'your-witness-statements',
              link: {
                text: 'Your witness statements',
                url: '/applicant/documents/upload/your-witness-statements/has-the-court-asked-for-this-documents',
              },
            },
            {
              categoryId: 'other-people-witness-statement',
              link: {
                text: "Other people's witness statements",
                url: '/applicant/documents/upload/other-people-witness-statement/has-the-court-asked-for-this-documents',
              },
            },
            {
              categoryId: 'media-files',
              link: {
                text: 'Emails, screenshots, images and other media files',
                url: '/applicant/documents/upload/media-files/has-the-court-asked-for-this-documents',
              },
            },
            {
              categoryId: 'medical-records',
              link: {
                text: 'Medical records',
                url: '/applicant/documents/upload/medical-records/has-the-court-asked-for-this-documents',
              },
            },
            {
              categoryId: 'letters-from-school',
              link: {
                text: 'Letters from school',
                url: '/applicant/documents/upload/letters-from-school/has-the-court-asked-for-this-documents',
              },
            },
            {
              categoryId: 'tenancy-and-mortgage-agreements',
              link: {
                text: 'Tenancy and mortgage agreements',
                url: '/applicant/documents/upload/tenancy-and-mortgage-agreements/has-the-court-asked-for-this-documents',
              },
            },
          ],
          title: 'Witness statements and evidence',
        },
        {
          id: 'applications',
          items: [
            {
              categoryId: 'submit-awp-application',
              link: {
                text: 'Submit an application',
                url: '/applicant/application-within-proceedings/list-of-applications/1',
              },
            },
            {
              categoryId: 'previous-orders',
              link: {
                text: 'Previous orders submitted with application',
                url: '/applicant/documents/upload/previous-orders/has-the-court-asked-for-this-documents',
              },
            },
          ],
          title: 'Applications',
        },
        {
          id: 'expertReports',
          items: [
            {
              categoryId: 'medical-reports',
              link: {
                text: 'Medical reports',
                url: '/applicant/documents/upload/medical-reports/has-the-court-asked-for-this-documents',
              },
            },
            {
              categoryId: 'paternity-test-reports',
              link: {
                text: 'Paternity test reports',
                url: '/applicant/documents/upload/paternity-test-reports/has-the-court-asked-for-this-documents',
              },
            },
            {
              categoryId: 'drug-and-alcohol-tests',
              link: {
                text: 'Drug and alcohol tests (toxicology)',
                url: '/applicant/documents/upload/drug-and-alcohol-tests/has-the-court-asked-for-this-documents',
              },
            },
            {
              categoryId: 'police-disclosures',
              link: {
                text: 'Police reports',
                url: '/applicant/documents/upload/police-disclosures/has-the-court-asked-for-this-documents',
              },
            },
          ],
          title: 'Expert reports',
        },
        {
          id: 'otherDocuments',
          items: [
            {
              categoryId: 'fm5-document',
              link: {
                text: 'Statement of position on non-court dispute resolution (NCDR) (form FM5)',
                url: '/applicant/documents/upload/fm5-document/document-sharing-details',
              },
            },
            {
              categoryId: 'other-documents',
              link: {
                text: 'Other documents',
                url: '/applicant/documents/upload/other-documents/has-the-court-asked-for-this-documents',
              },
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
