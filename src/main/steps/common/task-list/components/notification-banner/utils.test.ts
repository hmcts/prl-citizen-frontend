import { CaseWithId } from '../../../../../app/case/case';
import { CaseType, PartyType, Respondent, State, YesOrNo } from '../../../../../app/case/definition';
import {
  APPLICANT_ORDERS_FROM_THE_COURT,
  APPLICANT_STATEMENT_OF_SERVICE,
  APPLICANT_VIEW_ALL_DOCUMENTS,
  C9_DOWNLOAD_LINK,
  FL415_DOWNLOAD_LINK,
} from '../../../../urls';

import { getNotificationBannerConfig } from './index';
const userDetails = {
  id: '123',
  accessToken: 'mock-user-access-token',
  name: 'test',
  givenName: 'First name',
  familyName: 'Last name',
  email: 'test@example.com',
};
const applicant = [
  {
    id: 'string',
    value: {
      email: 'string',
      gender: 'string',
      address: {
        AddressLine1: 'string',
        AddressLine2: 'string',
        PostTown: 'string',
        County: 'string',
        PostCode: 'string',
      },
      dxNumber: 'string',
      landline: 'string',
      lastName: 'string',
      firstName: 'string',
      dateOfBirth: 'string',
      otherGender: 'string',
      phoneNumber: 'string',
      placeOfBirth: 'string',
      previousName: 'string',
      solicitorOrg: {
        OrganisationID: 'string',
        OrganisationName: 'string',
      },
      sendSignUpLink: 'string',
      solicitorEmail: 'string',
      isAddressUnknown: 'string',
      solicitorAddress: {
        County: '',
        Country: '',
        PostCode: '',
        PostTown: '',
        AddressLine1: '',
        AddressLine2: '',
        AddressLine3: '',
      },
      isDateOfBirthKnown: 'string',
      solicitorReference: 'string',
      solicitorTelephone: 'string',
      isPlaceOfBirthKnown: 'string',
      isDateOfBirthUnknown: 'string',
      isAddressConfidential: 'string',
      isCurrentAddressKnown: 'string',
      relationshipToChildren: 'string',
      representativeLastName: 'string',
      representativeFirstName: 'string',
      canYouProvidePhoneNumber: 'string',
      canYouProvideEmailAddress: 'string',
      isAtAddressLessThan5Years: 'string',
      isPhoneNumberConfidential: 'string',
      isEmailAddressConfidential: 'string',
      respondentLivedWithApplicant: 'string',
      doTheyHaveLegalRepresentation: 'string',
      addressLivedLessThan5YearsDetails: 'string',
      otherPersonRelationshipToChildren: [],
      isAtAddressLessThan5YearsWithDontKnow: 'string',
      response: {},
      user: {
        email: 'string',
        idamId: '123',
      },
    },
  },
];
describe('testcase for notification Banner', () => {
  test('when casetype not mentioned', () => {
    const data = {
      id: '12',
      state: State.CASE_SUBMITTED_NOT_PAID,
    };
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getNotificationBannerConfig(data, userDetails, party, language)).toStrictEqual([
      {
        contents: [
          {
            text: 'Your application is being reviewed and you will be contacted with next steps.',
          },
        ],
        heading: 'Your application is in progress',
        id: 'applicationSubmitted',
        links: [
          {
            href: '/c100-rebuild/12/withdraw',
            text: 'Withdraw your application',
            external: undefined,
          },
        ],
        title: 'Important',
      },
    ]);
  });
  test('when case is not started', () => {
    const data = {};
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getNotificationBannerConfig(data, userDetails, party, language)).toStrictEqual([]);
  });
  test('when casetype c100 and state is draft', () => {
    const data = {
      id: '12',
      state: State.CASE_DRAFT,
      caseTypeOfApplication: CaseType.C100,
    };
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getNotificationBannerConfig(data, userDetails, party, language)).toStrictEqual([
      {
        contents: [
          {
            text: 'You have caseData.noOfDaysRemainingToSubmitCase days to submit your application or it will be deleted and you will need to start again. This is for security reasons.',
          },
        ],
        heading: 'You have not finished your application',
        id: 'applicationInProgress',
        links: [
          {
            href: '#',
            text: 'Continue your application',
            external: undefined,
          },
        ],
        title: 'Important',
      },
    ]);
  });
  test('when case is withdrawn', () => {
    const data = {
      id: '12',
      state: State.CASE_WITHDRAWN,
      caseTypeOfApplication: CaseType.C100,
    };
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getNotificationBannerConfig(data, userDetails, party, language)).toStrictEqual([
      {
        contents: [
          {
            text: 'You can still access all documents related to the case',
          },
        ],
        heading: 'This case has now been withdrawn',
        id: 'applicationWithdrawn',
        title: 'Important',
      },
    ]);
  });
  test('withdrawn is rejected', () => {
    const data = {
      id: '12',
      state: State.Submitted,
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
            isWithdrawnRequestApproved: YesOrNo.NO,
            withdrawnRequestType: 'Withdrawn application',
          },
        },
      ],
    };
    const party = PartyType.APPLICANT;
    const language = 'en';
    expect(getNotificationBannerConfig(data, userDetails, party, language)).toStrictEqual([
      {
        contents: [
          {
            text: 'The court rejected your request to withdraw this application. The application will continue to progress.',
          },
        ],
        heading: 'Your withdrawal request was rejected',
        id: 'withdrawalRequestRejected',
        title: 'Important',
      },
      {
        contents: [
          {
            text: 'The court has made a decision about your case. The order tells you what the court has decided.',
          },
        ],
        heading: 'You have a new order from the court',
        id: 'newOrder',
        links: [
          {
            href: '/applicant/yourdocuments/alldocuments/orders',
            text: 'View the order (PDF)',
            external: undefined,
          },
        ],
        title: 'Important',
      },
    ]);
  });
  test('when case is issue to local court', () => {
    const data = {
      id: '12',
      state: State.CASE_ISSUED_TO_LOCAL_COURT,
      caseTypeOfApplication: CaseType.C100,
    };
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getNotificationBannerConfig(data, userDetails, party, language)).toStrictEqual([
      {
        contents: [
          {
            text: 'Your application is being reviewed and you will be contacted with next steps.',
          },
        ],
        heading: 'Your application is in progress',
        id: 'applicationSentToLocalCourt',
        title: 'Important',
      },
    ]);
  });
  test('when case is in gate keeping state', () => {
    const data = {
      id: '12',
      state: State.CASE_GATE_KEEPING,
      caseTypeOfApplication: CaseType.C100,
    };
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getNotificationBannerConfig(data, userDetails, party, language)).toStrictEqual([
      {
        contents: [
          {
            text: 'Your application is being reviewed and you will be contacted with next steps.',
          },
        ],
        heading: 'Your application is in progress',
        id: 'applicationSentToGateKeeping',
        title: 'Important',
      },
    ]);
  });
  test('when case is in served and linked', () => {
    const data = {
      id: '12',
      state: State.CASE_SERVED,
      caseTypeOfApplication: CaseType.C100,
      applicants: applicant,
    };
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getNotificationBannerConfig(data, userDetails, party, language)).toStrictEqual([
      {
        contents: [
          {
            text: 'This means the court has sent your application to the other people in the case (the respondents). The respondents will have a chance to reply to what you have said. The case will proceed whether or not they respond',
          },
          {
            text: 'The court has also sent the application to the Children and Family Court advisory and Support Service (Cafcass or Cafcass Cymru). Cafcass or Cafcass Cymru will contact you to consider the needs of the children.',
          },
        ],
        heading: 'The court has issued your application',
        id: 'applicationServedAndLinked',
        links: [
          {
            href: 'https://www.cafcass.gov.uk/grown-ups/parents-and-carers/divorce-and-separation/what-to-expect-from-cafcass/',
            text: 'Find out about Cafcass',
            external: true,
          },
          {
            href: 'https://www.gov.wales/cafcass-cymru/what-we-do',
            text: 'Find out about Cafcass Cymru',
            external: true,
          },
        ],
        title: 'Important',
      },
    ]);
  });
  test('when case is closed', () => {
    const data = {
      id: '12',
      state: State.CASE_CLOSED,
    };
    const party = PartyType.APPLICANT;
    const language = 'en';
    expect(getNotificationBannerConfig(data, userDetails, party, language)).toStrictEqual([
      {
        contents: [
          {
            text: 'Your case is closed. The court has made a final decision about your case. The order tells you what the court has decided.',
          },
        ],
        heading: 'You have a final order',
        id: 'applicationClosed',
        title: 'Important',
      },
    ]);
  });

  test('when FL401 case is in served and linked and have new document', () => {
    const data = {
      id: '12',
      state: State.CASE_SERVED,
      caseTypeOfApplication: CaseType.FL401,
      applicantsFL401: {
        email: 'abc',
        gender: 'male',
        address: {
          AddressLine1: '',
          AddressLine2: '',
          PostTown: '',
          County: '',
          PostCode: '',
        },
        dxNumber: '123',
        landline: '987654321',
        lastName: 'Smith',
        firstName: 'John',
        dateOfBirth: '',
        otherGender: '',
        phoneNumber: '',
        placeOfBirth: '',
        previousName: '',
        solicitorOrg: {
          OrganisationID: '',
          OrganisationName: '',
        },
        sendSignUpLink: '',
        solicitorEmail: '',
        isAddressUnknown: '',
        solicitorAddress: {
          County: '',
          Country: '',
          PostCode: '',
          PostTown: '',
          AddressLine1: '',
          AddressLine2: '',
          AddressLine3: '',
        },
        isDateOfBirthKnown: '',
        solicitorReference: '',
        solicitorTelephone: '',
        isPlaceOfBirthKnown: '',
        isDateOfBirthUnknown: '',
        isAddressConfidential: '',
        isCurrentAddressKnown: '',
        relationshipToChildren: '',
        representativeLastName: '',
        representativeFirstName: '',
        canYouProvidePhoneNumber: '',
        canYouProvideEmailAddress: '',
        isAtAddressLessThan5Years: '',
        isPhoneNumberConfidential: '',
        isEmailAddressConfidential: '',
        respondentLivedWithApplicant: '',
        doTheyHaveLegalRepresentation: '',
        addressLivedLessThan5YearsDetails: '',
        otherPersonRelationshipToChildren: [''],
        isAtAddressLessThan5YearsWithDontKnow: '',
        response: {
          citizenFlags: {
            isAllDocumentsViewed: 'No',
          },
        },
        user: {
          email: 'abc',
          idamId: '123',
        },
      },
    };
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getNotificationBannerConfig(data, userDetails, party, language)).toStrictEqual([
      {
        heading: 'You have a new document to view',
        id: 'newDocument',
        contents: [
          {
            text: 'A new document has been added to your case.',
          },
        ],
        links: [
          {
            external: undefined,
            text: 'See all documents',
            href: APPLICANT_VIEW_ALL_DOCUMENTS,
          },
        ],
        title: 'Important',
      },
    ]);
  });

  describe('c100 respondent banners', () => {
    const data = {
      id: '123',
      state: State.CASE_DRAFT,
      caseTypeOfApplication: CaseType.C100,
      respondents: [],
      caseInvites: [
        {
          value: {
            partyId: '123',
            invitedUserId: '123',
          },
        },
      ],
    } as unknown as CaseWithId;

    test('banners should be added when new order added', () => {
      data.respondents = [
        {
          id: '123',
          value: {
            user: {
              idamId: '123',
            },
            response: {
              citizenFlags: {
                isAllDocumentsViewed: 'No',
              },
            },
          },
        } as unknown as Respondent,
      ];
      data.state = State.Draft;
      data.orderCollection = [
        {
          id: '1234',
          value: {
            dateCreated: 'MOCK_DATE',
            orderType: 'ORDER',
            orderDocument: {
              document_url: 'DOC_URL',
              document_filename: 'DOC_FILENAME',
              document_binary_url: 'DOC_BINARY_URL',
            },
            orderDocumentWelsh: {
              document_url: 'DOC_URL',
              document_filename: 'DOC_FILENAME',
              document_binary_url: 'DOC_BINARY_URL',
            },
            otherDetails: {
              createdBy: '1234',
              orderCreatedDate: 'MOCK_DATE',
              orderMadeDate: 'MOCK_DATE',
              orderRecipients: 'RECIPIENTS',
            },
          },
        },
      ];
      expect(getNotificationBannerConfig(data, userDetails, PartyType.RESPONDENT, 'en')).toStrictEqual([
        {
          contents: [
            {
              text: 'A new document has been added to your case.',
            },
          ],
          heading: 'You have a new document to view',
          id: 'newDocument',
          links: [
            {
              external: undefined,
              href: '/respondent/yourdocuments/alldocuments/alldocuments',
              text: 'See all documents',
            },
          ],
          title: 'Important',
        },
        {
          contents: [
            {
              text: 'The court has made a decision about your case. The order tells you what the court has decided.',
            },
          ],
          heading: 'You have a new order from the court',
          id: 'newOrder',
          links: [
            {
              external: undefined,
              href: '/respondent/yourdocuments/alldocuments/orders',
              text: 'View the order (PDF)',
            },
          ],
          title: 'Important',
        },
      ]);
    });

    test('banners should be added when final order document added', () => {
      data.respondents = [
        {
          id: '123',
          value: {
            user: {
              idamId: '123',
            },
            response: {
              citizenFlags: {
                isAllDocumentsViewed: 'No',
              },
            },
          },
        } as unknown as Respondent,
      ];
      data.state = State.ALL_FINAL_ORDERS_ISSUED;
      data.orderCollection = [
        {
          id: '1234',
          value: {
            dateCreated: 'MOCK_DATE',
            orderType: 'ORDER',
            orderDocument: {
              document_url: 'DOC_URL',
              document_filename: 'DOC_FILENAME',
              document_binary_url: 'DOC_BINARY_URL',
            },
            orderDocumentWelsh: {
              document_url: 'DOC_URL',
              document_filename: 'DOC_FILENAME',
              document_binary_url: 'DOC_BINARY_URL',
            },
            otherDetails: {
              createdBy: '1234',
              orderCreatedDate: 'MOCK_DATE',
              orderMadeDate: 'MOCK_DATE',
              orderRecipients: 'RECIPIENTS',
            },
          },
        },
      ];
      expect(getNotificationBannerConfig(data, userDetails, PartyType.RESPONDENT, 'en')).toStrictEqual([
        {
          contents: [
            {
              text: 'A new document has been added to your case.',
            },
          ],
          heading: 'You have a new document to view',
          id: 'newDocument',
          links: [
            {
              external: undefined,
              href: '/respondent/yourdocuments/alldocuments/alldocuments',
              text: 'See all documents',
            },
          ],
          title: 'Important',
        },
        {
          contents: [
            {
              text: 'The court has made a final decision about your case. The order tells you what the court has decided. ',
            },
          ],
          heading: 'You have a final order',
          id: 'finalOrder',
          links: [
            {
              external: undefined,
              href: '/respondent/yourdocuments/alldocuments/orders',
              text: 'View the order (PDF)',
            },
          ],
          title: 'Important',
        },
      ]);
    });
  });

  test('when case is served to unrepresented applicant to serve Ca case', () => {
    applicant[0].value.response = {
      citizenFlags: {
        isApplicationToBeServed: 'Yes',
      },
    };
    const data = {
      id: '12',
      state: State.GATEKEEPING,
      caseTypeOfApplication: CaseType.C100,
      applicants: applicant,
    };
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getNotificationBannerConfig(data, userDetails, party, language)).toStrictEqual([
      {
        heading: 'Serve the application',
        id: 'soaServedBannerCa',
        contents: [
          {
            text: 'Your application and other documents are ready to give to other person named in the case (the respondent).',
          },
          {
            text: 'You must refer to correspondence from the court about serving the application on the respondent',
          },
          {
            text: 'You must not give any court documents to the respondent yourself.',
          },
        ],
        links: [
          {
            href: `${APPLICANT_ORDERS_FROM_THE_COURT}`,
            text: 'View the final order (PDF)',
            external: undefined,
          },
        ],
        heading2: 'Tell us once the application has been served',
        contents2: [
          {
            type: 'Complex',
            text: 'You must tell the court once the respondent has been served. Do this by completing the',
            href1: `${C9_DOWNLOAD_LINK}`,
            href1text: 'statement of service (form C9)',
          },
        ],
        links2: [
          {
            href: `${APPLICANT_STATEMENT_OF_SERVICE}`,
            text: 'Send Statement of service (form C9) to the court',
          },
        ],
        title: 'Important',
      },
    ]);
  });

  test('when case is served to unrepresented applicant to serve Da case', () => {
    applicant[0].value.response = {
      citizenFlags: {
        isApplicationToBeServed: 'Yes',
      },
    };
    const data = {
      id: '12',
      state: State.GATEKEEPING,
      caseTypeOfApplication: CaseType.FL401,
      applicants: applicant,
    };
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getNotificationBannerConfig(data, userDetails, party, language)).toStrictEqual([
      {
        heading: 'Serve the application',
        id: 'soaServedBannerDa',
        contents: [
          {
            text: 'Your application and other documents are ready to give to other person named in the case (the respondent).',
          },
          {
            text: 'You must refer to correspondence from the court about serving the application on the respondent',
          },
          {
            text: 'You must not give any court documents to the respondent yourself.',
          },
        ],
        links: [
          {
            href: `${APPLICANT_ORDERS_FROM_THE_COURT}`,
            text: 'View the final order (PDF)',
            external: undefined,
          },
        ],
        heading2: 'Tell us once the application has been served',
        contents2: [
          {
            type: 'Complex',
            text: 'You must tell the court once the respondent has been served. Do this by completing the',
            href1: `${FL415_DOWNLOAD_LINK}`,
            href1text: 'statement of service (form FL415)',
          },
        ],
        links2: [
          {
            href: `${APPLICANT_STATEMENT_OF_SERVICE}`,
            text: 'Send Statement of service (form FL415) to the court',
          },
        ],
        title: 'Important',
      },
    ]);
  });
});
