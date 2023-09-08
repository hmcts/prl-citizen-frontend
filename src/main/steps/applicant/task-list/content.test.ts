import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { SectionStatus, State, YesOrNo } from '../../../app/case/definition';
import { CommonContent } from '../../common/common.content';

import { generateContent, getApplicant } from './content';
import { applicant_cy, applicant_en } from './section-titles';
import { applicant_tasklist_items_cy, applicant_tasklist_items_en } from './tasklist-items';

const enContent = {
  title: 'Applicant tasklist',
  caseNumber: 'Case number  ',
  statuses: {
    [SectionStatus.COMPLETED]: 'Completed',
    [SectionStatus.IN_PROGRESS]: 'In Progress',
    [SectionStatus.TO_DO]: 'TO DO',
    [SectionStatus.DOWNLOAD]: 'DOWNLOAD',
    [SectionStatus.READY_TO_VIEW]: 'Ready to view',
    [SectionStatus.NOT_AVAILABLE_YET]: 'Not available yet',
  },
  sectionTitles: applicant_en,
  taskListItems: applicant_tasklist_items_en,
  iWantTo: 'I want to...',
  hyperlinks: [
    {
      label: 'Add a legal representative',
      link: '/applicant/add-legal-representative',
    },
    {
      label: 'Find my local court',
      link: '#',
    },
    {
      label: 'Find legal advice',
      link: '#',
    },
    {
      label: 'Know more about child arrangements',
      link: '#',
    },
    {
      label: 'Know more about attending court',
      link: '#',
    },
  ],
  addLegalRepresentative: 'Add a legal representative',
  removeLegalRepresentative: 'Remove a legal representative',
};
const cyContent = {
  title: 'Rhestr Tasgau’r Ceisydd',
  caseNumber: 'Rhif yr achos ',
  statuses: {
    [SectionStatus.COMPLETED]: 'Wedi’i gwblhau',
    [SectionStatus.IN_PROGRESS]: 'Yn mynd rhagddo',
    [SectionStatus.TO_DO]: 'I WNEUD',
    [SectionStatus.DOWNLOAD]: 'LLWYTHO',
    [SectionStatus.READY_TO_VIEW]: 'Yn barod i’w gweld',
    [SectionStatus.NOT_AVAILABLE_YET]: 'Ddim ar gael eto',
  },
  sectionTitles: applicant_cy,
  taskListItems: applicant_tasklist_items_cy,
  iWantTo: 'Rwyf eisiau ...',
  hyperlinks: [
    {
      label: 'Ychwanegu cynrychiolydd cyfreithiol',
      link: '/applicant/add-legal-representative',
    },
    {
      label: 'Dod o hyd i fy llys lleol',
      link: '#',
    },
    {
      label: 'Dod o hyd i gyngor cyfreithiol',
      link: '#',
    },
    {
      label: 'Gwybod mwy am drefniadau plant',
      link: '#',
    },
    {
      label: 'Gwybod mwy am fynychu’r llys',
      link: '#',
    },
  ],
  addLegalRepresentative: 'Ychwanegu cynrychiolydd cyfreithiol',
  removeLegalRepresentative: 'Dileu cynrychiolydd cyfreithiol',
};
describe('task-list > content', () => {
  const applicantFL401 = {
    email: 'test',
    gender: 'test',
    address: {
      AddressLine1: 'test',
      AddressLine2: 'test',
      AddressLine3: 'test',
      PostTown: 'test',
      County: 'test',
      PostCode: 'test',
      Country: 'test',
    },
    dxNumber: 'test',
    landline: 'test',
    lastName: 'test',
    firstName: 'test',
    dateOfBirth: 'test',
    otherGender: 'test',
    phoneNumber: 'test',
    placeOfBirth: 'test',
    previousName: 'test',
    solicitorOrg: {
      OrganisationID: 'test',
      OrganisationName: 'test',
    },
    sendSignUpLink: 'test',
    solicitorEmail: 'test',
    isAddressUnknown: 'test',
    solicitorAddress: {
      AddressLine1: 'test',
      AddressLine2: 'test',
      AddressLine3: 'test',
      PostTown: 'test',
      County: 'test',
      PostCode: 'test',
      Country: 'test',
    },
    isDateOfBirthKnown: 'test',
    solicitorReference: 'test',
    solicitorTelephone: 'test',
    isPlaceOfBirthKnown: 'test',
    isDateOfBirthUnknown: 'test',
    isAddressConfidential: 'test',
    isCurrentAddressKnown: 'test',
    relationshipToChildren: 'test',
    representativeLastName: 'test',
    representativeFirstName: 'test',
    canYouProvidePhoneNumber: 'test',
    canYouProvideEmailAddress: 'test',
    isAtAddressLessThan5Years: 'test',
    isPhoneNumberConfidential: 'test',
    isEmailAddressConfidential: 'test',
    respondentLivedWithApplicant: 'test',
    doTheyHaveLegalRepresentation: 'test',
    addressLivedLessThan5YearsDetails: 'test',
    otherPersonRelationshipToChildren: [],
    isAtAddressLessThan5YearsWithDontKnow: 'test',
    user: { idamId: '123', email: 'test' },
    response: {
      citizenFlags: {
        isAllDocumentsViewed: 'No',
      },
    },
  };
  const commonContent = {
    language: 'en',
    userCase: {
      ...mockUserCase,
      orderCollection: [
        {
          id: '',
          value: {
            dateCreated: '',
            orderType: '',
            orderDocument: {
              document_url: '',
              document_filename: '',
              document_binary_url: '',
            },
            orderDocumentWelsh: {
              document_url: '',
              document_filename: '',
              document_binary_url: '',
            },
            otherDetails: {
              createdBy: '',
              orderCreatedDate: '',
              orderMadeDate: '',
              orderRecipients: '',
            },
            orderTypeId: 'blankOrderOrDirectionsWithdraw',
            isWithdrawnRequestApproved: 'No',
            withdrawnRequestType: 'Withdrawn application',
          },
        },
      ],
      applicants: [
        {
          id: '123',
          value: {
            email: 'test',
            gender: 'test',
            dxNumber: 'test',
            landline: 'test',
            lastName: 'test',
            firstName: 'test',
            dateOfBirth: 'test',
            otherGender: 'test',
            phoneNumber: 'test',
            placeOfBirth: 'test',
            previousName: 'test',
            sendSignUpLink: 'test',
            solicitorEmail: 'test',
            isAddressUnknown: 'test',
            isDateOfBirthKnown: 'test',
            solicitorReference: 'test',
            solicitorTelephone: 'test',
            isPlaceOfBirthKnown: 'test',
            isDateOfBirthUnknown: 'test',
            isAddressConfidential: 'test',
            isCurrentAddressKnown: 'test',
            relationshipToChildren: 'test',
            representativeLastName: 'test',
            representativeFirstName: 'test',
            canYouProvidePhoneNumber: 'test',
            canYouProvideEmailAddress: 'test',
            isAtAddressLessThan5Years: 'test',
            isPhoneNumberConfidential: 'test',
            isEmailAddressConfidential: 'test',
            respondentLivedWithApplicant: 'test',
            doTheyHaveLegalRepresentation: 'test',
            addressLivedLessThan5YearsDetails: 'test',
            isAtAddressLessThan5YearsWithDontKnow: 'test',
            user: { idamId: '123' },
            response: {
              citizenFlags: {
                isAllDocumentsViewed: 'No',
              },
            },
          },
        },
      ],
    },
    userIdamId: '123',
    additionalData: {
      req: {
        session: {
          user: { id: '' },
          userCase: {
            ...mockUserCase,
            respondentsFL401: {
              firstName: '',
              lastName: '',
            },
            applicantsFL401: {
              firstName: '',
              lastName: '',
            },
          },
        },
      },
    },
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
              href: '/applicant/keep-details-private/details_known/1234567',
              id: 'keep-your-details-private',
              status: 'TO_DO',
              text: 'Keep your details private',
            },
            {
              href: '/applicant/confirm-contact-details/checkanswers/1234567',
              id: 'confirm-or-edit-your-contact-details',
              status: 'IN_PROGRESS',
              text: 'Confirm or edit your contact details',
            },
            {
              href: '/applicant/support-you-need-during-case/attending-the-court',
              id: 'support-you-need-during-your-case',
              text: 'Support you need during your case',
              status: 'TO_DO',
            },
          ],
          title: 'About you',
        },
        {
          items: [
            {
              href: '/applicant/public/docs/FL401-Final-Document.pdf',
              id: 'your-application',
              status: 'DOWNLOAD',
              text: 'Application submitted (PDF)',
              openInAnotherTab: true,
            },
            {
              href: '/applicant/witnessstatements',
              id: 'your-application-witness-statment',
              status: 'NOT_AVAILABLE_YET',
              text: 'Witness statement (PDF)',
            },
          ],
          title: applicant_en.yourApplication,
        },
        {
          items: [
            {
              href: '#',
              id: 'check-details-of-your-court-hearings',
              status: SectionStatus.NOT_AVAILABLE_YET,
              text: 'Check details of your court hearings',
              disabled: true,
            },
          ],
          title: 'Your court hearings',
        },
        {
          items: [
            {
              href: '/applicant/upload-document',
              id: 'upload-document',
              status: SectionStatus.TO_DO,
              text: 'Upload documents',
            },
            {
              href: '/applicant/yourdocuments/alldocuments/alldocuments',
              id: 'view-all-documents',
              status: 'READY_TO_VIEW',
              text: 'View all documents',
            },
          ],
          title: 'Your documents',
        },
        {
          items: [
            {
              href: '#',
              id: 'view-all-orders-from-the-court',
              status: SectionStatus.NOT_AVAILABLE_YET,
              text: 'View all orders from the court',
            },
          ],
          title: applicant_en.ordersFromTheCourt,
        },
      ],
    },
  ])('should generate correct task list %#', ({ userCase, expected }) => {
    userCase.id = '1234567';
    const { sections: taskListItems } = generateContent({ ...commonContent, userCase });
    expect(taskListItems).toEqual(expected);
  });

  test.each([
    {
      userCase: {
        ...mockUserCase,
        state: State.ALL_FINAL_ORDERS_ISSUED,
      },
      expected: [
        null,
        {
          title: 'Your application',
          items: [
            {
              href: '/applicant/public/docs/FL401-Final-Document.pdf',
              id: 'your-application',
              status: 'DOWNLOAD',
              text: 'Application submitted (PDF)',
              openInAnotherTab: true,
            },
            {
              href: '/applicant/witnessstatements',
              id: 'your-application-witness-statment',
              status: 'NOT_AVAILABLE_YET',
              text: 'Witness statement (PDF)',
            },
          ],
        },
        {
          items: [
            {
              href: '#',
              id: 'check-details-of-your-court-hearings',
              status: SectionStatus.NOT_AVAILABLE_YET,
              text: 'Check details of your court hearings',
              disabled: true,
            },
          ],
          title: 'Your court hearings',
        },
        {
          items: [
            {
              href: '/applicant/upload-document',
              id: 'upload-document',
              status: SectionStatus.TO_DO,
              text: 'Upload documents',
            },
            null,
          ],
          title: 'Your documents',
        },
        {
          items: [
            {
              href: '#',
              id: 'view-all-orders-from-the-court',
              status: SectionStatus.NOT_AVAILABLE_YET,
              text: 'View all orders from the court',
            },
          ],
          title: applicant_en.ordersFromTheCourt,
        },
      ],
    },
  ])('should generate correct task list when the case is closed %#', ({ userCase, expected }) => {
    userCase.id = '1234567';
    const { sections: taskListItems } = generateContent({ ...commonContent, userCase });
    expect(taskListItems).toEqual(expected);
  });

  test.each([
    {
      userCase: {
        ...commonContent.userCase,
        caseTypeOfApplication: 'C100',
      },
      expected: [
        {
          items: [
            {
              href: '/applicant/keep-details-private/details_known/1234567',
              id: 'keep-your-details-private',
              status: 'TO_DO',
              text: 'Keep your details private',
            },
            {
              href: '/applicant/confirm-contact-details/checkanswers/1234567',
              id: 'confirm-or-edit-your-contact-details',
              status: 'TO_DO',
              text: 'Confirm or edit your contact details',
            },
            {
              href: '/applicant/support-you-need-during-case/attending-the-court',
              id: 'support-you-need-during-your-case',
              text: 'Support you need during your case',
              status: 'TO_DO',
            },
          ],
          title: 'About you',
        },
        {
          items: [
            {
              href: '/applicant/public/docs/FL401-Final-Document.pdf',
              id: 'your_application_ca',
              status: 'DOWNLOAD',
              text: 'Your application (PDF)',
            },
            {
              href: '/applicant/yourdocuments/alldocuments/yourwitnessstatements',
              id: 'your_allegations_of_harm',
              status: 'DOWNLOAD',
              text: 'View allegations of harm and violence (PDF)',
            },
            {
              href: '/applicant/yourdocuments/alldocuments/yourwitnessstatements',
              id: 'respond_to_other_side_aoh_violence',
              status: 'DOWNLOAD',
              text: "Respond to the other side's allegations of harm and violence",
            },
          ],
          title: applicant_en.yourApplication,
        },
        {
          items: [
            {
              href: '/applicant/upload-document',
              id: 'response_to_your_application',
              status: 'TO_DO',
              text: 'The response to your application (PDF)',
            },
            {
              href: '/applicant/yourdocuments/alldocuments/alldocuments',
              id: 'check_other_side_aoh_and_violence',
              status: 'READY_TO_VIEW',
              text: "Check the other side's allegations of harm and violence",
            },
          ],
          title: 'response',
        },
        {
          items: [
            {
              href: '#',
              id: 'check-details-of-your-court-hearings',
              status: SectionStatus.NOT_AVAILABLE_YET,
              text: 'Check details of your court hearings',
              disabled: true,
            },
          ],
          title: 'Your court hearings',
        },
        {
          items: [
            {
              href: '/applicant/upload-document',
              id: 'upload-document',
              status: SectionStatus.TO_DO,
              text: 'Upload documents',
            },
            {
              href: '/applicant/yourdocuments/alldocuments/alldocuments',
              id: 'view-all-documents',
              status: 'READY_TO_VIEW',
              text: 'View all documents',
            },
          ],
          title: 'Your documents',
        },
        {
          items: [
            {
              href: '/applicant/yourdocuments/alldocuments/orders',
              id: 'view-all-orders-from-the-court',
              status: SectionStatus.READY_TO_VIEW,
              text: 'View all orders from the court',
            },
          ],
          title: applicant_en.ordersFromTheCourt,
        },
      ],
    },
  ])('should generate correct c100 banners when state not ALL_FINAL_ORDERS_ISSUED', ({ userCase, expected }) => {
    userCase.id = '1234567';
    const { sections: taskListItems } = generateContent({ ...commonContent, userCase });
    expect(taskListItems).toEqual(expected);
  });

  test.each([
    {
      userCase: {
        ...commonContent.userCase,
        caseTypeOfApplication: 'C100',
        state: State.ALL_FINAL_ORDERS_ISSUED,
      },
      expected: [
        null,
        {
          items: [
            {
              href: '/applicant/public/docs/FL401-Final-Document.pdf',
              id: 'your_application_ca',
              status: 'DOWNLOAD',
              text: 'Your application (PDF)',
            },
            {
              href: '/applicant/yourdocuments/alldocuments/yourwitnessstatements',
              id: 'your_allegations_of_harm',
              status: 'DOWNLOAD',
              text: 'View allegations of harm and violence (PDF)',
            },
            {
              href: '/applicant/yourdocuments/alldocuments/yourwitnessstatements',
              id: 'respond_to_other_side_aoh_violence',
              status: 'DOWNLOAD',
              text: "Respond to the other side's allegations of harm and violence",
            },
          ],
          title: applicant_en.yourApplication,
        },
        {
          items: [
            {
              href: '#',
              id: 'check-details-of-your-court-hearings',
              status: SectionStatus.NOT_AVAILABLE_YET,
              text: 'Check details of your court hearings',
              disabled: true,
            },
          ],
          title: 'Your court hearings',
        },
        {
          items: [
            {
              href: '/applicant/upload-document',
              id: 'upload-document',
              status: SectionStatus.TO_DO,
              text: 'Upload documents',
            },
            null,
          ],
          title: 'Your documents',
        },
        {
          items: [
            {
              href: '/applicant/yourdocuments/alldocuments/orders',
              id: 'view-all-orders-from-the-court',
              status: SectionStatus.READY_TO_VIEW,
              text: 'View all orders from the court',
            },
          ],
          title: applicant_en.ordersFromTheCourt,
        },
      ],
    },
  ])('should generate correct c100 banners when state is ALL_FINAL_ORDERS_ISSUED', ({ userCase, expected }) => {
    userCase.id = '1234567';
    const { sections: taskListItems } = generateContent({ ...commonContent, userCase });
    expect(taskListItems).toEqual(expected);
  });

  test.each([
    {
      userCase: {
        ...mockUserCase,
        state: State.ALL_FINAL_ORDERS_ISSUED,
        orderCollection: [
          {
            id: '',
            value: {
              dateCreated: '',
              orderType: '',
              orderDocument: {
                document_url: '',
                document_filename: '',
                document_binary_url: '',
              },
              orderDocumentWelsh: {
                document_url: '',
                document_filename: '',
                document_binary_url: '',
              },
              otherDetails: {
                createdBy: '',
                orderCreatedDate: '',
                orderMadeDate: '',
                orderRecipients: '',
              },
              orderTypeId: 'blankOrderOrDirectionsWithdraw',
              isWithdrawnRequestApproved: 'No' as YesOrNo,
              withdrawnRequestType: 'Withdrawn application',
            },
          },
        ],
        applicantsFL401: applicantFL401,
      },
      expected: [
        null,
        {
          items: [
            {
              href: '/applicant/public/docs/FL401-Final-Document.pdf',
              id: 'your-application',
              status: 'DOWNLOAD',
              text: 'Application submitted (PDF)',
              openInAnotherTab: true,
            },
            {
              href: '/applicant/witnessstatements',
              id: 'your-application-witness-statment',
              status: 'NOT_AVAILABLE_YET',
              text: 'Witness statement (PDF)',
            },
          ],
          title: applicant_en.yourApplication,
        },
        {
          items: [
            {
              href: '#',
              id: 'check-details-of-your-court-hearings',
              status: SectionStatus.NOT_AVAILABLE_YET,
              text: 'Check details of your court hearings',
              disabled: true,
            },
          ],
          title: 'Your court hearings',
        },
        {
          items: [
            {
              href: '/applicant/upload-document',
              id: 'upload-document',
              status: SectionStatus.TO_DO,
              text: 'Upload documents',
            },
            null,
          ],
          title: 'Your documents',
        },
        {
          items: [
            {
              href: '/applicant/yourdocuments/alldocuments/orders',
              id: 'view-all-orders-from-the-court',
              status: SectionStatus.READY_TO_VIEW,
              text: 'View all orders from the court',
            },
          ],
          title: applicant_en.ordersFromTheCourt,
        },
      ],
    },
  ])('should generate tasklist with correct banners for FL401', ({ userCase, expected }) => {
    userCase.id = '1234567';
    const { sections: taskListItems } = generateContent({ ...commonContent, userCase });
    expect(taskListItems).toEqual(expected);
  });

  test.each([
    {
      userCase: mockUserCase,
      expected: [
        null,
        {
          items: [
            {
              href: '/applicant/public/docs/FL401-Final-Document.pdf',
              id: 'your-application',
              status: 'DOWNLOAD',
              text: 'Application submitted (PDF)',
              openInAnotherTab: true,
            },
            {
              href: '/applicant/witnessstatements',
              id: 'your-application-witness-statment',
              status: 'NOT_AVAILABLE_YET',
              text: 'Witness statement (PDF)',
            },
          ],
          title: applicant_en.yourApplication,
        },
        {
          items: [
            {
              href: '#',
              id: 'check-details-of-your-court-hearings',
              status: SectionStatus.NOT_AVAILABLE_YET,
              text: 'Check details of your court hearings',
              disabled: true,
            },
          ],
          title: 'Your court hearings',
        },
        {
          items: [
            null,
            {
              href: '/applicant/yourdocuments/alldocuments/alldocuments',
              id: 'view-all-documents',
              status: 'READY_TO_VIEW',
              text: 'View all documents',
            },
          ],
          title: 'Your documents',
        },
        {
          items: [
            {
              href: '#',
              id: 'view-all-orders-from-the-court',
              status: SectionStatus.NOT_AVAILABLE_YET,
              text: 'View all orders from the court',
            },
          ],
          title: applicant_en.ordersFromTheCourt,
        },
      ],
    },
  ])('should generate correct task when applicant is represented by solicitor', ({ userCase, expected }) => {
    userCase.id = '1234567';
    commonContent.additionalData!.req.session.userCase.applicantsFL401.user = {
      ...commonContent.additionalData!.req.session.userCase.applicantsFL401.user,
      solicitorRepresented: 'Yes',
    };
    const { sections: taskListItems } = generateContent({ ...commonContent, userCase });
    expect(taskListItems).toEqual(expected);
  });

  test('get applicant should return correct value for c100 case', () => {
    expect(getApplicant({ ...commonContent.userCase, caseTypeOfApplication: 'C100' }, '123')).toBe(
      commonContent.userCase?.applicants![0].value
    );
  });

  test('get applicant should return correct value for FL401 case', () => {
    expect(getApplicant({ ...commonContent.userCase, caseTypeOfApplication: 'FL401' }, '123')).toBe(
      commonContent.userCase?.applicantsFL401
    );
  });
});
