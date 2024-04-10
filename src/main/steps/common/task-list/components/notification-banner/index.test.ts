import { CaseWithId } from '../../../../../app/case/case';
import { CaseType, PartyType, Respondent, State, YesOrNo } from '../../../../../app/case/definition';
import { APPLICANT_VIEW_ALL_DOCUMENTS } from '../../../../urls';

import { getNotificationBannerConfig } from '.';

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
        idamId: '1234',
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
        heading: 'Your application is in progress',
        id: 'applicationSubmitted',
        title: 'Important',
        sections: [
          {
            contents: [
              {
                text: 'Your application is being reviewed and you will be contacted with next steps.',
              },
            ],
            links: [
              {
                href: '/c100-rebuild/12/withdraw',
                text: 'Withdraw your application',
                external: false,
              },
            ],
          },
        ],
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
        heading: 'You have not finished your application',
        id: 'applicationInProgress',
        sections: [
          {
            contents: [
              {
                text: 'You have caseData.noOfDaysRemainingToSubmitCase days to submit your application or it will be deleted and you will need to start again. This is for security reasons.',
              },
              {
                text: 'You can review all your answers before you submit your application.',
              },
            ],
            links: [
              {
                href: '#',
                text: 'Continue your application',
                external: false,
              },
            ],
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
        sections: [
          {
            contents: [
              {
                text: 'You can still access all documents related to the case',
              },
            ],
            links: null,
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
        heading: 'Your withdrawal request was rejected',
        id: 'withdrawalRequestRejected',
        title: 'Important',
        sections: [
          {
            contents: [
              {
                text: 'The court rejected your request to withdraw this application. The application will continue to progress.',
              },
            ],
            links: null,
          },
        ],
      },
      {
        heading: 'You have a new order from the court',
        id: 'newOrder',
        sections: [
          {
            contents: [
              {
                text: 'The court has made a decision about your case. The order tells you what the court has decided.',
              },
            ],
            links: [
              {
                href: '/applicant/yourdocuments/alldocuments/orders',
                text: 'View the order (PDF)',
                external: false,
              },
            ],
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
        sections: [
          {
            contents: [
              {
                text: 'Your application is being reviewed and you will be contacted with next steps.',
              },
            ],
            links: null,
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
        sections: [
          {
            contents: [
              {
                text: 'Your application is being reviewed and you will be contacted with next steps.',
              },
            ],
            links: null,
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
        sections: [
          {
            contents: [
              {
                text: 'This means the court has sent your application to the other people in the case (the respondents). The respondents will have a chance to reply to what you have said. The case will proceed whether or not they respond',
              },
            ],
            links: [],
          },
        ],
        heading: 'The court has issued your application',
        id: 'applicationServedAndLinked',
        title: 'Important',
      },
    ]);
  });

  test('when primary citizen has to serve respondent personally', () => {
    const applicantLIP = applicant[0];
    applicantLIP.value.response = { ...applicantLIP.value.response, citizenFlags: { isApplicationToBeServed: 'Yes' } };
    const data = {
      id: '12',
      state: State.CASE_SERVED,
      caseTypeOfApplication: CaseType.C100,
      applicants: [applicantLIP, applicant[1]],
    } as Partial<CaseWithId>;
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getNotificationBannerConfig(data, userDetails, party, language)).toStrictEqual([
      {
        sections: [
          {
            contents: [
              {
                text: 'This means the court has sent your application to the other people in the case (the respondents). The respondents will have a chance to reply to what you have said. The case will proceed whether or not they respond',
              },
            ],
            links: [],
          },
        ],
        heading: 'The court has issued your application',
        id: 'applicationServedAndLinked',
        title: 'Important',
      },
      {
        heading: 'You must give the respondent their documents',
        id: 'giveRespondentTheirDocuments',
        sections: [
          {
            contents: [
              {
                text: 'The court has issued your application. This means a copy of your application and other court documents are ready to give to the other people in the case (the respondents).',
              },
              {
                text: 'You must give the following documents to the respondent:',
              },
            ],
            links: [
              {
                external: false,
                href: '/applicant/yourdocuments/alldocuments/alldocuments',
                text: "View the respondent's documents",
              },
            ],
          },
          {
            contents: [
              {
                text: 'You can give the documents to the respondent or choose a person who has agreed to hand deliver them to the respondent. This can be someone you know or a professional third party (such as a process server or court bailiff). More information about court bailiffs can be found on GOV.UK.',
              },
              {
                text: '<a href="https://www.gov.uk/government/publications/form-d89-request-for-personal-service-by-a-court-bailiff">https://www.gov.uk/government/publications/form-d89-request-for-personal-service-by-a-court-bailiff</a>',
              },
              {
                text: '<br/><p class="govuk-notification-banner__heading">Tell us once the respondent has been given the documents</p>',
              },
              {
                text: 'You need to submit a statement of service after the respondent has been given the documents.',
              },
            ],
            links: [
              {
                external: true,
                href: 'https://assets.publishing.service.gov.uk/media/64c39c16f921860014866728/c9_0401.pdf',
                text: 'Download the statement of service (form C9) (opens in a new tab)',
              },
              {
                external: false,
                href: '',
                text: 'Upload the statement of service (form C9)',
              },
            ],
          },
        ],
        title: 'Important',
      },
      {
        id: 'soaServedBannerCa',
        title: 'Important',
        heading: 'You must give the respondent their documents',
        sections: [
          {
            contents: [
              {
                text: 'The court has issued your application. This means a copy of your application and other court documents are ready to give to other people in the case (the respondents)',
              },
              {
                text: 'You must give the following documents to the respondent:',
              },
            ],
            links: [
              {
                href: '/applicant/yourdocuments/alldocuments/orders',
                text: "View the respondent's documents",
                external: false,
              },
            ],
          },
          {
            contents: [
              {
                text: 'You can give the documents to the respondent or choose a person who has agreed to hand deliver them to the respondent. This can be someone you know or a professional third party(such as a process server). More information about court bailiffs can be found on <a href="https://www.gov.uk/government/publications/form-d89-request-for-personal-service-by-a-court-bailiff">GOV.UK</a>',
              },
              {
                text: '<p class="govuk-notification-banner__heading">Tell us once the respondent has been given the documents</p>',
              },
              {
                text: 'You need to submit a statement of service after the respondent has been given the documents.',
              },
            ],
            links: [
              {
                href: 'https://www.gov.uk/government/publications/form-c9-statement-of-service',
                text: 'Download the Statement of service (form C9)',
                external: false,
              },
              {
                href: '/applicant/statement-of-service/choose-parties',
                text: 'Upload the statement of service(form C9)',
                external: false,
              },
            ],
          },
        ],
      },
    ]);
  });

  test('when respondent being served personally by primary applicant, other applicant should have notification', () => {
    const applicantLIP = applicant[0];
    applicantLIP.value.response = { ...applicantLIP.value.response, citizenFlags: { isApplicationToBeServed: 'Yes' } };
    const data = {
      id: '12',
      state: State.CASE_SERVED,
      caseTypeOfApplication: CaseType.C100,
      applicants: [applicantLIP, applicant[1]],
    } as Partial<CaseWithId>;
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getNotificationBannerConfig(data, { ...userDetails, id: '1234' }, party, language)).toStrictEqual([
      {
        sections: [
          {
            contents: [
              {
                text: 'This means the court has sent your application to the other people in the case (the respondents). The respondents will have a chance to reply to what you have said. The case will proceed whether or not they respond',
              },
            ],
            links: [],
          },
        ],
        heading: 'The court has issued your application',
        id: 'applicationServedAndLinked',
        title: 'Important',
      },
      {
        heading: 'The court has issued your application',
        id: 'caPersonalService',
        sections: [
          {
            contents: [
              {
                text: 'You should review your application pack to check what you should do next.',
              },
            ],
            links: [
              {
                external: false,
                href: '/applicant/yourdocuments/alldocuments/alldocuments',
                text: 'View your application pack',
              },
            ],
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
        sections: [
          {
            contents: [
              {
                text: 'Your case is closed. The court has made a final decision about your case. The order tells you what the court has decided.',
              },
            ],
            links: null,
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
        sections: [
          {
            contents: [
              {
                text: 'A new document has been added to your case.',
              },
            ],
            links: [
              {
                external: false,
                text: 'See all documents',
                href: APPLICANT_VIEW_ALL_DOCUMENTS,
              },
            ],
          },
        ],
        title: 'Important',
      },
      {
        id: 'soaServedBannerDa',
        title: 'Important',
        heading: 'You must give the respondent their documents',
        sections: [
          {
            contents: [
              {
                text: 'The court has issued your application. This means a copy of your application and other court documents are ready to give to other people in the case (the respondents)',
              },
              {
                text: 'You must give the following documents to the respondent:',
              },
            ],
            links: [
              {
                href: '/applicant/yourdocuments/alldocuments/orders',
                text: "View the respondent's documents",
                external: false,
              },
            ],
          },
          {
            contents: [
              {
                text: 'You can give the documents to the respondent or choose a person who has agreed to hand deliver them to the respondent. This can be someone you know or a professional third party(such as a process server). More information about court bailiffs can be found on <a href="https://www.gov.uk/government/publications/form-d89-request-for-personal-service-by-a-court-bailiff">GOV.UK</a>',
              },
              {
                text: '<p class="govuk-notification-banner__heading">Tell us once the respondent has been given the documents</p>',
              },
              {
                text: 'You need to submit a statement of service after the respondent has been given the documents.',
              },
            ],
            links: [
              {
                href: 'https://www.gov.uk/government/publications/form-fl415-statement-of-service',
                text: 'Download the Statement of service (form FL415)',
                external: false,
              },
              {
                href: '/applicant/statement-of-service/choose-parties',
                text: 'Upload the statement of service (form FL415)',
                external: false,
              },
            ],
          },
        ],
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
          heading: 'You have a new document to view',
          id: 'newDocument',
          sections: [
            {
              contents: [
                {
                  text: 'A new document has been added to your case.',
                },
              ],
              links: [
                {
                  external: false,
                  href: '/respondent/yourdocuments/alldocuments/alldocuments',
                  text: 'See all documents',
                },
              ],
            },
          ],
          title: 'Important',
        },
        {
          heading: 'You have a new order from the court',
          id: 'newOrder',

          sections: [
            {
              contents: [
                {
                  text: 'The court has made a decision about your case. The order tells you what the court has decided.',
                },
              ],
              links: [
                {
                  external: false,
                  href: '/respondent/yourdocuments/alldocuments/orders',
                  text: 'View the order (PDF)',
                },
              ],
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
          heading: 'You have a new document to view',
          id: 'newDocument',
          sections: [
            {
              links: [
                {
                  external: false,
                  href: '/respondent/yourdocuments/alldocuments/alldocuments',
                  text: 'See all documents',
                },
              ],
              contents: [
                {
                  text: 'A new document has been added to your case.',
                },
              ],
            },
          ],
          title: 'Important',
        },
        {
          heading: 'You have a final order',
          id: 'finalOrder',
          sections: [
            {
              contents: [
                {
                  text: 'The court has made a final decision about your case. The order tells you what the court has decided. ',
                },
              ],
              links: [
                {
                  external: false,
                  href: '/respondent/yourdocuments/alldocuments/orders',
                  text: 'View the order (PDF)',
                },
              ],
            },
          ],

          title: 'Important',
        },
      ]);
    });
  });
});
