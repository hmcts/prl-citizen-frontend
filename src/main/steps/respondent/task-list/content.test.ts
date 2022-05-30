import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { ApplyingWith, SectionStatus } from '../../../app/case/definition';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

const enContent = {
  title: 'Apply to adopt a child placed in your care',
  statuses: {
    [SectionStatus.COMPLETED]: 'Completed',
    [SectionStatus.IN_PROGRESS]: 'In Progress',
    [SectionStatus.NOT_STARTED]: 'Not Started',
  },
  sectionTitles: {
    applicationDetails: 'Add application details',
    applicantDetails: "Add applicant's details",
    childDetails: "Add child's details",
    uploadDocuments: 'Upload documents',
    reviewPayAndSubmit: 'Review, pay and submit',
  },
  taskListItems: {
    numberOfApplicants: 'Number of applicants',
    dateChildMovedIn: 'Date child moved in with you',
    adoptionAgency: 'Adoption agency and social worker',
    firstApplicant: 'First applicant',
    secondApplicant: 'Second applicant',
    personalDetails: 'Your personal details',
    contactDetails: 'Your contact details',
    birthCertificate: 'Birth certificate details',
    childNameAfterAdoption: "Child's name after adoption",
    birthMother: 'Birth mother details',
    birthFather: 'Birth father details',
    otherParent: 'Other person with parental responsibility',
    placementAndCourtOrders: 'Placement and court orders',
    siblingCourtOrders: 'Sibling court order details',
    chooseFamilyCourt: 'Choose your family court',
    uploadDocuments: 'Upload documents',
    reviewPayAndSubmit: 'Review, pay and submit your application',
  },
};

const cyContent = {
  title: 'Gwneud cais i fabwysiadu plentyn a leolwyd dan eich gofal',
  statuses: {
    [SectionStatus.COMPLETED]: 'Wedi cwblhau',
    [SectionStatus.IN_PROGRESS]: 'Yn mynd rhagddo',
    [SectionStatus.NOT_STARTED]: 'Heb Ddechrau',
  },
  sectionTitles: {
    applicationDetails: 'Ychwanegu manylion y cais',
    applicantDetails: 'Ychwanegu manylion y ceisydd',
    childDetails: 'Ychwanegu manylion y plentyn',
    uploadDocuments: 'Llwytho dogfennau',
    reviewPayAndSubmit: 'Adolygu, talu a chyflwyno',
  },
  taskListItems: {
    numberOfApplicants: 'Nifer y ceiswyr',
    dateChildMovedIn: 'Dyddiad wnaeth y plentyn symud i fyw gyda chi',
    adoptionAgency: 'Asiantaeth fabwysiadu a gweithiwr cymdeithasol',
    firstApplicant: 'Ceisydd cyntaf',
    secondApplicant: 'Ail geisydd',
    personalDetails: 'Eich manylion personol',
    contactDetails: 'Eich manylion cyswllt',
    birthCertificate: 'Manylion y dystysgrif geni',
    childNameAfterAdoption: 'Enw’r plentyn ar ôl ei fabwysiadu',
    birthMother: 'Manylion y fam fiolegol',
    birthFather: 'Manylion y tad biolegol',
    otherParent: 'Unigolyn arall sydd â chyfrifoldeb rhiant',
    placementAndCourtOrders: 'Gorchmynion llys a lleoli',
    siblingCourtOrders: 'Manylion gorchymyn llys brodyr/chwiorydd',
    chooseFamilyCourt: 'Dewiswch eich llys teulu',
    uploadDocuments: 'Llwytho dogfennau',
    reviewPayAndSubmit: 'Adolygu, talu a chyflwyno eich cais',
  },
};

describe('task-list > content', () => {
  const commonContent = { language: 'en', userCase: mockUserCase } as CommonContent;
  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('en', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test.each([
    {
      userCase: mockUserCase,
      expected: [
        {
          items: [
            { href: '/applying-with', id: 'applying-with', status: 'COMPLETED', text: 'Number of applicants' },
            {
              href: '/date-child-moved-in',
              id: 'date-child-moved-in',
              status: 'COMPLETED',
              text: 'Date child moved in with you',
            },
            {
              href: '/children/adoption-agency?change=MOCK_ID_1',
              id: 'adoption-agency',
              status: 'COMPLETED',
              text: 'Adoption agency and social worker',
            },
          ],
          title: 'Add application details',
        },
        {
          items: [
            {
              href: '/applicant1/full-name',
              id: 'applicant1-personal-details',
              status: 'COMPLETED',
              text: 'Your personal details',
            },
            {
              href: '/applicant1/address/lookup',
              id: 'applicant1-contact-details',
              status: 'COMPLETED',
              text: 'Your contact details',
            },
          ],
          title: "Add applicant's details",
        },
        {
          items: [
            {
              href: '/children/full-name',
              id: 'children-birth-certificate-details',
              status: 'COMPLETED',
              text: 'Birth certificate details',
            },
            {
              href: '/children/full-name-after-adoption',
              id: 'adoption-certificate-details',
              status: 'COMPLETED',
              text: "Child's name after adoption",
            },
            {
              href: '/birth-mother/full-name',
              id: 'birth-mother-details',
              status: 'COMPLETED',
              text: 'Birth mother details',
            },
            {
              href: '/birth-father/name-on-certificate',
              id: 'birth-father',
              status: 'COMPLETED',
              text: 'Birth father details',
            },
            {
              href: '/other-parent/exists',
              id: 'other-parent',
              status: 'COMPLETED',
              text: 'Other person with parental responsibility',
            },
            {
              href: '/children/placement-order-summary',
              id: 'children-placement-order-details',
              status: 'COMPLETED',
              text: 'Placement and court orders',
            },
            { href: '/sibling/exists', id: 'sibling', status: 'COMPLETED', text: 'Sibling court order details' },
            {
              href: '/children/find-family-court',
              id: 'find-family-court',
              status: 'COMPLETED',
              text: 'Choose your family court',
            },
          ],
          title: "Add child's details",
        },
        {
          items: [
            {
              href: '/upload-your-documents',
              id: 'upload-your-documents',
              status: 'COMPLETED',
              text: 'Upload documents',
            },
          ],
          title: 'Upload documents',
        },
        {
          items: [
            {
              href: '/review-pay-submit/equality',
              id: 'review-pay-and-submit',
              status: 'NOT_STARTED',
              text: 'Review, pay and submit your application',
            },
          ],
          title: 'Review, pay and submit',
        },
      ],
    },
    {
      userCase: {
        ...mockUserCase,
        applyingWith: ApplyingWith.WITH_SOME_ONE_ELSE,
        placementOrders: undefined,
        addAnotherPlacementOrder: undefined,
        applicant1UploadedFiles: undefined,
        applicant1CannotUpload: undefined,
        findFamilyCourt: undefined,
        familyCourtName: undefined,
      },
      expected: [
        {
          items: [
            {
              "href": "/respondent/keep-details-private/details_known",
              "id": "keep-your-details-private",
              "status": "NOT_STARTED",
              "text": "Keep your details private",
            },
            {
              "href": "/respondent/confirmcontactdetails/checkanswers",
             "id": "confirm-or-edit-your-contact-details",
             "status": "NOT_STARTED",
            "text": "Confirm or edit your contact details",
            },
          ],
          "title": "Your details",
        },
        {
          items: [
            {
              "href": "/respondent/miam/miam-start",
            "id": "medation-miam",
             "status": "NOT_STARTED",
             "text": "Mediation(MIAM)",
            },
            
          ],
          title: "Application detail",
        },
        {
          items: [
            {
              "href": "/respondent/international-factors/start",
             "id": "international-factors",
             "text": "International factors",
            },
          ],
          "title": "Additional information",
        },
        
      ],
    },
  ])('should generate correct task list %#', ({ userCase, expected }) => {
    const { sections: taskListItems } = generateContent({ ...commonContent, userCase });
    expect(taskListItems).toEqual(expected);
  });
});
