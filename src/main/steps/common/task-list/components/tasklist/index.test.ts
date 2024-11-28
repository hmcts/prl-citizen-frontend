import { CaseWithId } from '../../../../../app/case/case';
import { CaseType, PartyType, State, YesOrNo } from '../../../../../app/case/definition';
import { DocumentCategory } from '../../../documents/definitions';

import { getTaskListConfig } from './index';

describe('tasklist index', () => {
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
  const respondents = [
    {
      id: '123456',
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
        lastName: 'Respondent',
        firstName: 'First',
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
        lastName: 'Respondent',
        firstName: 'Second',
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
  const applicantFL401 = {
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
  };
  describe('CA applicant tasklist', () => {
    test('when case state is draft', () => {
      const data = {
        id: '12',
        state: State.CASE_DRAFT,
        caseTypeOfApplication: 'C100',
      };
      const party = PartyType.APPLICANT;
      const language = 'en';

      expect(getTaskListConfig(data, userDetails, party, language)).toStrictEqual([
        {
          heading: 'Your application',
          id: 'yourApplication',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: undefined,
              id: 'childArrangementApplication',
              linkText: 'Your child arrangements application',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--yellow',
                label: 'In progress',
              },
            },
          ],
        },
      ]);
    });

    test('when case state is draft and not started', () => {
      const data = undefined as unknown as Partial<CaseWithId>;
      const party = PartyType.APPLICANT;
      const language = 'en';

      expect(getTaskListConfig(data, userDetails, party, language)).toStrictEqual([
        {
          heading: 'Your application',
          id: 'yourApplication',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/c100-rebuild/start',
              id: 'childArrangementApplication',
              linkText: 'Your child arrangements application',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--red',
                label: 'Not started yet',
              },
            },
          ],
        },
      ]);
    });

    test('when case state is submitted', () => {
      const data = {
        id: '12',
        state: State.CASE_SUBMITTED_PAID,
        finalDocument: {
          document_url: 'document_url/123',
          document_filename: 'c100_final_document',
          document_binary_url: 'document_url/123/binary',
        },
      };
      const party = PartyType.APPLICANT;
      const language = 'en';

      expect(getTaskListConfig(data, userDetails, party, language)).toStrictEqual([
        {
          heading: 'Your application',
          id: 'yourApplication',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/download/type/c100-application/en',
              id: 'yourApplicationPDF',
              linkText: 'Your application (PDF)',
              openInAnotherTab: true,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
              },
            },
          ],
        },
      ]);
    });

    test('case is in linked state with order and hearing', () => {
      const data = {
        id: '12',
        state: State.CASE_SERVED,
        applicants: applicant,
        respondents,
        caseTypeOfApplication: 'C100',
        citizenOrders: [
          {
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
        ],
        orderCollection: [
          {
            id: '1234',
            value: {
              dateCreated: 'date',
              orderType: 'type',
              orderDocument: {
                document_url: 'string',
                document_filename: 'string',
                document_binary_url: 'string',
                document_hash: 'string',
              },
              orderDocumentWelsh: {
                document_url: 'string',
                document_filename: 'string',
                document_binary_url: 'string',
                document_hash: 'string',
              },
              otherDetails: {
                createdBy: 'string',
                orderCreatedDate: 'string',
                orderMadeDate: 'string',
                orderRecipients: 'string',
              },
            },
          },
        ],

        hearingCollection: [
          {
            hearingID: 2000006135,
            hearingRequestDateTime: '2023-07-11T16:07:21.253071',
            hearingType: 'ABA5-FOF',
            hmcStatus: 'LISTED',
            lastResponseReceivedDateTime: '2023-07-11T16:41:37',
            requestVersion: 1,
            hearingListingStatus: 'FIXED',
            listAssistCaseStatus: 'LISTED',
            hearingDaySchedule: [
              {
                hearingStartDateTime: '2023-08-03T09:00:00',
                hearingEndDateTime: '2023-08-03T12:00:00',
                listAssistSessionId: null,
                hearingVenueId: '234946',
                hearingVenueName: 'Swansea Civil And Family Justice Centre',
                hearingVenueLocationCode: '344',
                hearingVenueAddress: 'Quay West, Quay Parade',
                hearingRoomId: 'Courtroom 01',
                hearingJudgeId: '',
                hearingJudgeName: null,
                panelMemberIds: [],
                attendees: [
                  {
                    partyID: 'f2847b15-dbb8-4df0-868a-420d9de11d29',
                    hearingSubChannel: 'VID',
                  },
                ],
              },
            ],
            hearingGroupRequestId: null,
            hearingIsLinkedFlag: false,
            hearingTypeValue: 'Finding of Fact',
            nextHearingDate: '2023-08-02T09:00:00',
            urgentFlag: false,
          },
        ],
        finalDocument: {
          document_url: 'document_url/123',
          document_filename: 'c100_final_document',
          document_binary_url: 'document_url/123/binary',
        },
        applicantDocuments: [
          {
            partyId: '123456',
            partyName: 'First Respondent',
            partyType: 'respondent',
            categoryId: 'respondentApplication',
            uploadedBy: 'test user',
            uploadedDate: '2024-03-11T16:24:33.122506',
            reviewedDate: '2024-03-11T16:24:33.122506',
            document: {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'respondentApplication',
              document_creation_date: '2024-03-11T16:24:33.122506',
            },
            documentWelsh: null,
          },
          {
            partyId: '123456',
            partyName: 'Second Respondent',
            partyType: 'respondent',
            categoryId: 'respondentApplication',
            uploadedBy: 'test user',
            uploadedDate: '2024-03-11T16:24:33.122506',
            reviewedDate: '2024-03-11T16:24:33.122506',
            document: {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'respondentApplication',
              document_creation_date: '2024-03-11T16:24:33.122506',
            },
            documentWelsh: null,
          },
        ],
      };
      const party = PartyType.APPLICANT;
      const language = 'en';

      expect(getTaskListConfig(data as unknown as CaseWithId, userDetails, party, language)).toStrictEqual([
        {
          heading: 'About you',
          id: 'aboutYou',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/confirm-contact-details/checkanswers/12',
              id: 'editYouContactDetails',
              linkText: 'Confirm or edit your contact details',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/contact-preference/choose-a-contact-preference',
              id: 'contactPreferences',
              linkText: 'Contact preferences',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'TO DO',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/keep-details-private/details_known/12',
              id: 'keepYourDetailsPrivate',
              linkText: 'Keep your details private',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/reasonable-adjustments/intro',
              id: 'supportYouNeed',
              linkText: 'Support you need during your case',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Optional',
              },
            },
          ],
        },
        {
          heading: 'Your application',
          id: 'yourApplication',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/download/type/c100-application/en',
              id: 'yourApplicationPDF',
              linkText: 'Your application (PDF)',
              openInAnotherTab: true,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/application-within-proceedings/list-of-applications/1',
              id: 'requestToCourtAboutYourCase',
              linkText: 'Make a request to the court about your case',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Optional',
              },
            },
          ],
        },
        {
          heading: 'Your documents',
          id: 'yourDocuments',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/upload',
              id: 'uploadDocuments',
              linkText: 'Upload documents, applications and statements',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Optional',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/view/all-categories',
              id: 'viewAllDocuments',
              linkText: 'View all documents',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Ready to view',
              },
            },
          ],
        },
        {
          heading: 'Orders from the court',
          id: 'ordersFromTheCourt',

          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/view/orders-from-the-court',
              id: 'viewOrders',
              linkText: 'View all orders from the court',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Ready to view',
              },
            },
          ],
        },
        {
          heading: 'The response',
          id: 'theResponse',
          tasks: [
            {
              disabled: true,
              hintText: null,
              href: '/applicant/documents/view/respondent/doc',
              id: 'theResponsePDF',
              linkText: 'The response to application',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'Not available yet',
              },
            },
          ],
        },
        {
          heading: 'Your court hearings',
          id: 'yourHearing',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/hearings/12',
              id: 'viewHearingDetails',
              linkText: 'Check details of your court hearings',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Ready to view',
              },
            },
          ],
        },
      ]);
    });
    test('case is in linked state with order and hearing with welsh doc', () => {
      const data = {
        id: '12',
        state: State.CASE_SERVED,
        applicants: applicant,
        respondents,
        caseTypeOfApplication: 'C100',
        citizenOrders: [
          {
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
        ],
        orderCollection: [
          {
            id: '1234',
            value: {
              dateCreated: 'date',
              orderType: 'type',
              orderDocument: {
                document_url: 'string',
                document_filename: 'string',
                document_binary_url: 'string',
                document_hash: 'string',
              },
              orderDocumentWelsh: {
                document_url: 'string',
                document_filename: 'string',
                document_binary_url: 'string',
                document_hash: 'string',
              },
              otherDetails: {
                createdBy: 'string',
                orderCreatedDate: 'string',
                orderMadeDate: 'string',
                orderRecipients: 'string',
              },
            },
          },
        ],

        hearingCollection: [
          {
            hearingID: 2000006135,
            hearingRequestDateTime: '2023-07-11T16:07:21.253071',
            hearingType: 'ABA5-FOF',
            hmcStatus: 'LISTED',
            lastResponseReceivedDateTime: '2023-07-11T16:41:37',
            requestVersion: 1,
            hearingListingStatus: 'FIXED',
            listAssistCaseStatus: 'LISTED',
            hearingDaySchedule: [
              {
                hearingStartDateTime: '2023-08-03T09:00:00',
                hearingEndDateTime: '2023-08-03T12:00:00',
                listAssistSessionId: null,
                hearingVenueId: '234946',
                hearingVenueName: 'Swansea Civil And Family Justice Centre',
                hearingVenueLocationCode: '344',
                hearingVenueAddress: 'Quay West, Quay Parade',
                hearingRoomId: 'Courtroom 01',
                hearingJudgeId: '',
                hearingJudgeName: null,
                panelMemberIds: [],
                attendees: [
                  {
                    partyID: 'f2847b15-dbb8-4df0-868a-420d9de11d29',
                    hearingSubChannel: 'VID',
                  },
                ],
              },
            ],
            hearingGroupRequestId: null,
            hearingIsLinkedFlag: false,
            hearingTypeValue: 'Finding of Fact',
            nextHearingDate: '2023-08-02T09:00:00',
            urgentFlag: false,
          },
        ],
        finalDocument: {
          document_url: 'document_url/123',
          document_filename: 'c100_final_document',
          document_binary_url: 'document_url/123/binary',
        },
        finalWelshDocument: {
          document_url: 'document_url/123',
          document_filename: 'c100_final_document',
          document_binary_url: 'document_url/123/binary',
        },
        c1AWelshDocument: {
          document_url: 'document_url/123',
          document_filename: 'c1a_welsh_document',
          document_binary_url: 'document_url/123/binary',
        },
        c1ADocument: {
          document_url: 'document_url/123',
          document_filename: 'c1a_document',
          document_binary_url: 'document_url/123/binary',
        },
        applicantDocuments: [
          {
            partyId: '123456',
            partyName: 'First Respondent',
            partyType: 'respondent',
            categoryId: 'respondentApplication',
            uploadedBy: 'test user',
            uploadedDate: '2024-03-11T16:24:33.122506',
            reviewedDate: '2024-03-11T16:24:33.122506',
            document: {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'respondentApplication',
              document_creation_date: '2024-03-11T16:24:33.122506',
            },
            documentWelsh: null,
          },
          {
            partyId: '123456',
            partyName: 'Second Respondent',
            partyType: 'respondent',
            categoryId: 'respondentApplication',
            uploadedBy: 'test user',
            uploadedDate: '2024-03-11T16:24:33.122506',
            reviewedDate: '2024-03-11T16:24:33.122506',
            document: {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'respondentApplication',
              document_creation_date: '2024-03-11T16:24:33.122506',
            },
            documentWelsh: null,
          },
        ],
      };
      const party = PartyType.APPLICANT;
      const language = 'en';

      expect(getTaskListConfig(data as unknown as CaseWithId, userDetails, party, language)).toStrictEqual([
        {
          heading: 'About you',
          id: 'aboutYou',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/confirm-contact-details/checkanswers/12',
              id: 'editYouContactDetails',
              linkText: 'Confirm or edit your contact details',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/contact-preference/choose-a-contact-preference',
              id: 'contactPreferences',
              linkText: 'Contact preferences',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'TO DO',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/keep-details-private/details_known/12',
              id: 'keepYourDetailsPrivate',
              linkText: 'Keep your details private',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/reasonable-adjustments/intro',
              id: 'supportYouNeed',
              linkText: 'Support you need during your case',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Optional',
              },
            },
          ],
        },
        {
          heading: 'Your application',
          id: 'yourApplication',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/download/type/c100-application/en',
              id: 'yourApplicationPDF',
              linkText: 'Your application (PDF)',
              openInAnotherTab: true,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/download/type/c100-application/cy',
              id: 'yourApplicationWelshPDF',
              linkText: 'Your application (PDF) in welsh',
              openInAnotherTab: true,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/download/type/aoh-document/en',
              id: 'yourAOHPDF',
              linkText: 'Your allegations of harm and violence (PDF)',
              openInAnotherTab: true,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/download/type/aoh-document/cy',
              id: 'yourAOHWelshPDF',
              linkText: 'Your allegations of harm and violence (PDF) in welsh',
              openInAnotherTab: true,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/application-within-proceedings/list-of-applications/1',
              id: 'requestToCourtAboutYourCase',
              linkText: 'Make a request to the court about your case',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Optional',
              },
            },
          ],
        },
        {
          heading: 'Your documents',
          id: 'yourDocuments',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/upload',
              id: 'uploadDocuments',
              linkText: 'Upload documents, applications and statements',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Optional',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/view/all-categories',
              id: 'viewAllDocuments',
              linkText: 'View all documents',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Ready to view',
              },
            },
          ],
        },
        {
          heading: 'Orders from the court',
          id: 'ordersFromTheCourt',

          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/view/orders-from-the-court',
              id: 'viewOrders',
              linkText: 'View all orders from the court',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Ready to view',
              },
            },
          ],
        },
        {
          heading: 'The response',
          id: 'theResponse',
          tasks: [
            {
              disabled: true,
              hintText: null,
              href: '/applicant/documents/view/respondent/doc',
              id: 'theResponsePDF',
              linkText: 'The response to application',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'Not available yet',
              },
            },
          ],
        },
        {
          heading: 'Your court hearings',
          id: 'yourHearing',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/hearings/12',
              id: 'viewHearingDetails',
              linkText: 'Check details of your court hearings',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Ready to view',
              },
            },
          ],
        },
      ]);
    });

    test('C100 Applicant case is in linked state with order and hearing and respondent has submitted response', () => {
      const data = {
        id: '12',
        state: State.CASE_SERVED,
        applicants: applicant,
        respondents,
        caseTypeOfApplication: 'C100',
        citizenOrders: [
          {
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
        ],
        orderCollection: [
          {
            id: '1234',
            value: {
              dateCreated: 'date',
              orderType: 'type',
              orderDocument: {
                document_url: 'string',
                document_filename: 'string',
                document_binary_url: 'string',
                document_hash: 'string',
              },
              orderDocumentWelsh: {
                document_url: 'string',
                document_filename: 'string',
                document_binary_url: 'string',
                document_hash: 'string',
              },
              otherDetails: {
                createdBy: 'string',
                orderCreatedDate: 'string',
                orderMadeDate: 'string',
                orderRecipients: 'string',
              },
            },
          },
        ],
        hearingCollection: [
          {
            hearingID: 2000006135,
            hearingRequestDateTime: '2023-07-11T16:07:21.253071',
            hearingType: 'ABA5-FOF',
            hmcStatus: 'LISTED',
            lastResponseReceivedDateTime: '2023-07-11T16:41:37',
            requestVersion: 1,
            hearingListingStatus: 'FIXED',
            listAssistCaseStatus: 'LISTED',
            hearingDaySchedule: [
              {
                hearingStartDateTime: '2023-08-03T09:00:00',
                hearingEndDateTime: '2023-08-03T12:00:00',
                listAssistSessionId: null,
                hearingVenueId: '234946',
                hearingVenueName: 'Swansea Civil And Family Justice Centre',
                hearingVenueLocationCode: '344',
                hearingVenueAddress: 'Quay West, Quay Parade',
                hearingRoomId: 'Courtroom 01',
                hearingJudgeId: '',
                hearingJudgeName: null,
                panelMemberIds: [],
                attendees: [
                  {
                    partyID: 'f2847b15-dbb8-4df0-868a-420d9de11d29',
                    hearingSubChannel: 'VID',
                  },
                ],
              },
            ],
            hearingGroupRequestId: null,
            hearingIsLinkedFlag: false,
            hearingTypeValue: 'Finding of Fact',
            nextHearingDate: '2023-08-02T09:00:00',
            urgentFlag: false,
          },
        ],
        respondentDocuments: [
          {
            partyId: '123456',
            partyName: null,
            partyType: 'respondent',
            categoryId: 'respondentApplication',
            uploadedBy: 'test user',
            uploadedDate: '2024-03-11T16:24:33.122506',
            reviewedDate: '2024-03-11T16:24:33.122506',
            document: {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'respondentApplication',
              document_creation_date: '2024-03-11T16:24:33.122506',
            },
            documentWelsh: null,
          },
          {
            partyId: '123456',
            partyName: 'First Respondent',
            partyType: 'respondent',
            categoryId: 'respondentApplication',
            uploadedBy: 'test user',
            uploadedDate: '2024-03-11T16:24:33.122506',
            reviewedDate: '2024-03-11T16:24:33.122506',
            document: {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'respondentApplication',
              document_creation_date: '2024-03-11T16:24:33.122506',
            },
            documentWelsh: null,
          },
          {
            partyId: '123456',
            partyName: 'Second Respondent',
            partyType: 'respondent',
            categoryId: 'respondentApplication',
            uploadedBy: 'test user',
            uploadedDate: '2024-03-11T16:24:33.122506',
            reviewedDate: '2024-03-11T16:24:33.122506',
            document: {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'respondentApplication',
              document_creation_date: '2024-03-11T16:24:33.122506',
            },
            documentWelsh: null,
          },
        ],
        finalDocument: {
          document_url: 'document_url/123',
          document_filename: 'c100_final_document',
          document_binary_url: 'document_url/123/binary',
        },
      } as unknown as Partial<CaseWithId>;
      data.respondents![0].value.response = {
        ...data.respondents![0].value.response,
        c7ResponseSubmitted: 'Yes' as YesOrNo,
      };
      data.respondents![0].value.user = {
        ...data.respondents![0].value.user,
        idamId: '123456',
      };

      const party = PartyType.APPLICANT;
      const language = 'en';

      expect(getTaskListConfig(data, userDetails, party, language)).toStrictEqual([
        {
          heading: 'About you',
          id: 'aboutYou',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/confirm-contact-details/checkanswers/12',
              id: 'editYouContactDetails',
              linkText: 'Confirm or edit your contact details',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/contact-preference/choose-a-contact-preference',
              id: 'contactPreferences',
              linkText: 'Contact preferences',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'TO DO',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/keep-details-private/details_known/12',
              id: 'keepYourDetailsPrivate',
              linkText: 'Keep your details private',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/reasonable-adjustments/intro',
              id: 'supportYouNeed',
              linkText: 'Support you need during your case',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Optional',
              },
            },
          ],
        },
        {
          heading: 'Your application',
          id: 'yourApplication',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/download/type/c100-application/en',
              id: 'yourApplicationPDF',
              linkText: 'Your application (PDF)',
              openInAnotherTab: true,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/application-within-proceedings/list-of-applications/1',
              id: 'requestToCourtAboutYourCase',
              linkText: 'Make a request to the court about your case',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Optional',
              },
            },
          ],
        },
        {
          heading: 'Your documents',
          id: 'yourDocuments',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/upload',
              id: 'uploadDocuments',
              linkText: 'Upload documents, applications and statements',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Optional',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/view/all-categories',
              id: 'viewAllDocuments',
              linkText: 'View all documents',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Ready to view',
              },
            },
          ],
        },
        {
          heading: 'Orders from the court',
          id: 'ordersFromTheCourt',

          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/view/orders-from-the-court',
              id: 'viewOrders',
              linkText: 'View all orders from the court',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Ready to view',
              },
            },
          ],
        },
        {
          heading: 'The response',
          id: 'theResponse',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/view/respondent/doc',
              id: 'theResponsePDF',
              linkText: 'The response to application',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Ready to view',
              },
            },
          ],
        },
        {
          heading: 'Your court hearings',
          id: 'yourHearing',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/hearings/12',
              id: 'viewHearingDetails',
              linkText: 'Check details of your court hearings',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Ready to view',
              },
            },
          ],
        },
      ]);
    });

    test('case is in linked state with out order and hearing', () => {
      const data = {
        id: '12',
        state: State.CASE_SERVED,
        applicants: applicant,
        respondents,
        caseTypeOfApplication: 'C100',
        finalDocument: {
          document_url: 'document_url/123',
          document_filename: 'c100_final_document',
          document_binary_url: 'document_url/123/binary',
        },
        applicantDocuments: [
          {
            partyId: '123456',
            partyName: 'First Respondent',
            partyType: 'respondent',
            categoryId: 'respondentApplication',
            uploadedBy: 'test user',
            uploadedDate: '2024-03-11T16:24:33.122506',
            reviewedDate: '2024-03-11T16:24:33.122506',
            document: {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'respondentApplication',
              document_creation_date: '2024-03-11T16:24:33.122506',
            },
            documentWelsh: null,
          },
          {
            partyId: '123456',
            partyName: 'Second Respondent',
            partyType: 'respondent',
            categoryId: 'respondentApplication',
            uploadedBy: 'test user',
            uploadedDate: '2024-03-11T16:24:33.122506',
            reviewedDate: '2024-03-11T16:24:33.122506',
            document: {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'respondentApplication',
              document_creation_date: '2024-03-11T16:24:33.122506',
            },
            documentWelsh: null,
          },
        ],
      };
      data.respondents![0].value.response = {};
      const party = PartyType.APPLICANT;
      const language = 'en';

      expect(getTaskListConfig(data as unknown as CaseWithId, userDetails, party, language)).toStrictEqual([
        {
          heading: 'About you',
          id: 'aboutYou',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/confirm-contact-details/checkanswers/12',
              id: 'editYouContactDetails',
              linkText: 'Confirm or edit your contact details',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/contact-preference/choose-a-contact-preference',
              id: 'contactPreferences',
              linkText: 'Contact preferences',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'TO DO',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/keep-details-private/details_known/12',
              id: 'keepYourDetailsPrivate',
              linkText: 'Keep your details private',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/reasonable-adjustments/intro',
              id: 'supportYouNeed',
              linkText: 'Support you need during your case',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Optional',
              },
            },
          ],
        },
        {
          heading: 'Your application',
          id: 'yourApplication',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/download/type/c100-application/en',
              id: 'yourApplicationPDF',
              linkText: 'Your application (PDF)',
              openInAnotherTab: true,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/application-within-proceedings/list-of-applications/1',
              id: 'requestToCourtAboutYourCase',
              linkText: 'Make a request to the court about your case',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Optional',
              },
            },
          ],
        },
        {
          heading: 'Your documents',
          id: 'yourDocuments',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/upload',
              id: 'uploadDocuments',
              linkText: 'Upload documents, applications and statements',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Optional',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/view/all-categories',
              id: 'viewAllDocuments',
              linkText: 'View all documents',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Ready to view',
              },
            },
          ],
        },
        {
          heading: 'Orders from the court',
          id: 'ordersFromTheCourt',
          tasks: [
            {
              disabled: true,
              hintText: null,
              href: '/applicant/documents/view/orders-from-the-court',
              id: 'viewOrders',
              linkText: 'View all orders from the court',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'Not available yet',
              },
            },
          ],
        },
        {
          heading: 'The response',
          id: 'theResponse',
          tasks: [
            {
              disabled: true,
              hintText: null,
              href: '/applicant/documents/view/respondent/doc',
              id: 'theResponsePDF',
              linkText: 'The response to application',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'Not available yet',
              },
            },
          ],
        },
        {
          heading: 'Your court hearings',
          id: 'yourHearing',
          tasks: [
            {
              disabled: true,
              hintText: null,
              href: '/applicant/hearings/12',
              id: 'viewHearingDetails',
              linkText: 'Check details of your court hearings',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'Not available yet',
              },
            },
          ],
        },
      ]);
    });

    test('applicant is represented by solicitor', () => {
      const data = {
        id: '12',
        state: State.CASE_SERVED,
        applicants: [
          {
            ...applicant[0],
            value: {
              ...applicant[0].value,
              user: {
                ...applicant[0].value,
                solicitorRepresented: 'Yes',
              },
            },
          },
        ],
        respondents,
        finalDocument: {
          document_url: 'document_url/123',
          document_filename: 'c100_final_document',
          document_binary_url: 'document_url/123/binary',
        },
      };
      const party = PartyType.APPLICANT;
      const language = 'en';

      expect(getTaskListConfig(data as unknown as Partial<CaseWithId>, userDetails, party, language)).toStrictEqual([
        {
          heading: 'Your application',
          id: 'yourApplication',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/download/type/c100-application/en',
              id: 'yourApplicationPDF',
              linkText: 'Your application (PDF)',
              openInAnotherTab: true,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
              },
            },
          ],
        },
      ]);
    });

    test('when case state is closed', () => {
      const data = {
        id: '12',
        state: State.ALL_FINAL_ORDERS_ISSUED,
        caseTypeOfApplication: 'C100',
        finalDocument: {
          document_url: 'document_url/123',
          document_filename: 'c100_final_document',
          document_binary_url: 'document_url/123/binary',
        },
      };
      const party = PartyType.APPLICANT;
      const language = 'en';

      expect(getTaskListConfig(data, userDetails, party, language)).toStrictEqual([
        {
          heading: 'Your application',
          id: 'yourApplication',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/download/type/c100-application/en',
              id: 'yourApplicationPDF',
              linkText: 'Your application (PDF)',
              openInAnotherTab: true,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
              },
            },
          ],
        },
      ]);
    });

    test('case is in linked state with requested hearing but not listed', () => {
      const data = {
        id: '12',
        state: State.CASE_SERVED,
        applicants: applicant,
        respondents,
        caseTypeOfApplication: 'C100',
        orderCollection: [
          {
            id: '1234',
            value: {
              dateCreated: 'date',
              orderType: 'type',
              orderDocument: {
                document_url: 'string',
                document_filename: 'string',
                document_binary_url: 'string',
                document_hash: 'string',
              },
              orderDocumentWelsh: {
                document_url: 'string',
                document_filename: 'string',
                document_binary_url: 'string',
                document_hash: 'string',
              },
              otherDetails: {
                createdBy: 'string',
                orderCreatedDate: 'string',
                orderMadeDate: 'string',
                orderRecipients: 'string',
              },
            },
          },
        ],

        hearingCollection: [
          {
            hearingID: 2000006135,
            hearingRequestDateTime: '2023-07-11T16:07:21.253071',
            hearingType: 'ABA5-FOF',
            hmcStatus: 'HEARING_REQUESTED',
            lastResponseReceivedDateTime: '2023-07-11T16:41:37',
            requestVersion: 1,
            hearingListingStatus: null,
            listAssistCaseStatus: null,
            hearingDaySchedule: [
              {
                hearingStartDateTime: '2023-08-03T09:00:00',
                hearingEndDateTime: '2023-08-03T12:00:00',
                listAssistSessionId: null,
                hearingVenueId: '234946',
                hearingVenueName: 'Swansea Civil And Family Justice Centre',
                hearingVenueLocationCode: '344',
                hearingVenueAddress: 'Quay West, Quay Parade',
                hearingRoomId: 'Courtroom 01',
                hearingJudgeId: '',
                hearingJudgeName: null,
                panelMemberIds: [],
                attendees: [
                  {
                    partyID: 'f2847b15-dbb8-4df0-868a-420d9de11d29',
                    hearingSubChannel: 'VID',
                  },
                ],
              },
            ],
            hearingGroupRequestId: null,
            hearingIsLinkedFlag: false,
            hearingTypeValue: 'Finding of Fact',
            nextHearingDate: '2023-08-02T09:00:00',
            urgentFlag: false,
          },
        ],
        finalDocument: {
          document_url: 'document_url/123',
          document_filename: 'c100_final_document',
          document_binary_url: 'document_url/123/binary',
        },
        applicantDocuments: [
          {
            partyId: '123456',
            partyName: 'First Respondent',
            partyType: 'respondent',
            categoryId: 'respondentApplication',
            uploadedBy: 'test user',
            uploadedDate: '2024-03-11T16:24:33.122506',
            reviewedDate: '2024-03-11T16:24:33.122506',
            document: {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'respondentApplication',
              document_creation_date: '2024-03-11T16:24:33.122506',
            },
            documentWelsh: null,
          },
          {
            partyId: '123456',
            partyName: 'Second Respondent',
            partyType: 'respondent',
            categoryId: 'respondentApplication',
            uploadedBy: 'test user',
            uploadedDate: '2024-03-11T16:24:33.122506',
            reviewedDate: '2024-03-11T16:24:33.122506',
            document: {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'respondentApplication',
              document_creation_date: '2024-03-11T16:24:33.122506',
            },
            documentWelsh: null,
          },
        ],
      };
      const party = PartyType.APPLICANT;
      const language = 'en';

      expect(getTaskListConfig(data as unknown as CaseWithId, userDetails, party, language)).toStrictEqual([
        {
          heading: 'About you',
          id: 'aboutYou',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/confirm-contact-details/checkanswers/12',
              id: 'editYouContactDetails',
              linkText: 'Confirm or edit your contact details',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/contact-preference/choose-a-contact-preference',
              id: 'contactPreferences',
              linkText: 'Contact preferences',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'TO DO',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/keep-details-private/details_known/12',
              id: 'keepYourDetailsPrivate',
              linkText: 'Keep your details private',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/reasonable-adjustments/intro',
              id: 'supportYouNeed',
              linkText: 'Support you need during your case',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Optional',
              },
            },
          ],
        },
        {
          heading: 'Your application',
          id: 'yourApplication',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/download/type/c100-application/en',
              id: 'yourApplicationPDF',
              linkText: 'Your application (PDF)',
              openInAnotherTab: true,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/application-within-proceedings/list-of-applications/1',
              id: 'requestToCourtAboutYourCase',
              linkText: 'Make a request to the court about your case',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Optional',
              },
            },
          ],
        },
        {
          heading: 'Your documents',
          id: 'yourDocuments',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/upload',
              id: 'uploadDocuments',
              linkText: 'Upload documents, applications and statements',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Optional',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/view/all-categories',
              id: 'viewAllDocuments',
              linkText: 'View all documents',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Ready to view',
              },
            },
          ],
        },
        {
          heading: 'Orders from the court',
          id: 'ordersFromTheCourt',

          tasks: [
            {
              disabled: true,
              hintText: null,
              href: '/applicant/documents/view/orders-from-the-court',
              id: 'viewOrders',
              linkText: 'View all orders from the court',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'Not available yet',
              },
            },
          ],
        },
        {
          heading: 'The response',
          id: 'theResponse',
          tasks: [
            {
              disabled: true,
              hintText: null,
              href: '/applicant/documents/view/respondent/doc',
              id: 'theResponsePDF',
              linkText: 'The response to application',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'Not available yet',
              },
            },
          ],
        },
        {
          heading: 'Your court hearings',
          id: 'yourHearing',
          tasks: [
            {
              disabled: true,
              hintText: null,
              href: '/applicant/hearings/12',
              id: 'viewHearingDetails',
              linkText: 'Check details of your court hearings',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'Not available yet',
              },
            },
          ],
        },
      ]);
    });
    test('case is in linked state with requested hearing with exception', () => {
      const data = {
        id: '12',
        state: State.CASE_SERVED,
        applicants: applicant,
        respondents,
        caseTypeOfApplication: 'C100',
        applicantDocuments: [
          {
            partyId: '123456',
            partyName: 'First Respondent',
            partyType: 'respondent',
            categoryId: 'respondentApplication',
            uploadedBy: 'test user',
            uploadedDate: '2024-03-11T16:24:33.122506',
            reviewedDate: '2024-03-11T16:24:33.122506',
            document: {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'respondentApplication',
              document_creation_date: '2024-03-11T16:24:33.122506',
            },
            documentWelsh: null,
          },
          {
            partyId: '123456',
            partyName: 'Second Respondent',
            partyType: 'respondent',
            categoryId: 'respondentApplication',
            uploadedBy: 'test user',
            uploadedDate: '2024-03-11T16:24:33.122506',
            reviewedDate: '2024-03-11T16:24:33.122506',
            document: {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'respondentApplication',
              document_creation_date: '2024-03-11T16:24:33.122506',
            },
            documentWelsh: null,
          },
        ],
        orderCollection: [
          {
            id: '1234',
            value: {
              dateCreated: 'date',
              orderType: 'type',
              orderDocument: {
                document_url: 'string',
                document_filename: 'string',
                document_binary_url: 'string',
                document_hash: 'string',
              },
              orderDocumentWelsh: {
                document_url: 'string',
                document_filename: 'string',
                document_binary_url: 'string',
                document_hash: 'string',
              },
              otherDetails: {
                createdBy: 'string',
                orderCreatedDate: 'string',
                orderMadeDate: 'string',
                orderRecipients: 'string',
              },
            },
          },
        ],

        hearingCollection: [
          {
            hearingID: 2000006135,
            hearingRequestDateTime: '2023-07-11T16:07:21.253071',
            hearingType: 'ABA5-FOF',
            hmcStatus: 'EXCEPTION',
            lastResponseReceivedDateTime: '2023-07-11T16:41:37',
            requestVersion: 1,
            hearingListingStatus: null,
            listAssistCaseStatus: null,
            hearingDaySchedule: [
              {
                hearingStartDateTime: '2023-08-03T09:00:00',
                hearingEndDateTime: '2023-08-03T12:00:00',
                listAssistSessionId: null,
                hearingVenueId: '234946',
                hearingVenueName: 'Swansea Civil And Family Justice Centre',
                hearingVenueLocationCode: '344',
                hearingVenueAddress: 'Quay West, Quay Parade',
                hearingRoomId: 'Courtroom 01',
                hearingJudgeId: '',
                hearingJudgeName: null,
                panelMemberIds: [],
                attendees: [
                  {
                    partyID: 'f2847b15-dbb8-4df0-868a-420d9de11d29',
                    hearingSubChannel: 'VID',
                  },
                ],
              },
            ],
            hearingGroupRequestId: null,
            hearingIsLinkedFlag: false,
            hearingTypeValue: 'Finding of Fact',
            nextHearingDate: '2023-08-02T09:00:00',
            urgentFlag: false,
          },
        ],
        finalDocument: {
          document_url: 'document_url/123',
          document_filename: 'c100_final_document',
          document_binary_url: 'document_url/123/binary',
        },
      };
      const party = PartyType.APPLICANT;
      const language = 'en';

      expect(getTaskListConfig(data as unknown as CaseWithId, userDetails, party, language)).toStrictEqual([
        {
          heading: 'About you',
          id: 'aboutYou',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/confirm-contact-details/checkanswers/12',
              id: 'editYouContactDetails',
              linkText: 'Confirm or edit your contact details',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/contact-preference/choose-a-contact-preference',
              id: 'contactPreferences',
              linkText: 'Contact preferences',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'TO DO',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/keep-details-private/details_known/12',
              id: 'keepYourDetailsPrivate',
              linkText: 'Keep your details private',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/reasonable-adjustments/intro',
              id: 'supportYouNeed',
              linkText: 'Support you need during your case',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Optional',
              },
            },
          ],
        },
        {
          heading: 'Your application',
          id: 'yourApplication',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/download/type/c100-application/en',
              id: 'yourApplicationPDF',
              linkText: 'Your application (PDF)',
              openInAnotherTab: true,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/application-within-proceedings/list-of-applications/1',
              id: 'requestToCourtAboutYourCase',
              linkText: 'Make a request to the court about your case',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Optional',
              },
            },
          ],
        },
        {
          heading: 'Your documents',
          id: 'yourDocuments',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/upload',
              id: 'uploadDocuments',
              linkText: 'Upload documents, applications and statements',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Optional',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/view/all-categories',
              id: 'viewAllDocuments',
              linkText: 'View all documents',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Ready to view',
              },
            },
          ],
        },
        {
          heading: 'Orders from the court',
          id: 'ordersFromTheCourt',

          tasks: [
            {
              disabled: true,
              hintText: null,
              href: '/applicant/documents/view/orders-from-the-court',
              id: 'viewOrders',
              linkText: 'View all orders from the court',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'Not available yet',
              },
            },
          ],
        },
        {
          heading: 'The response',
          id: 'theResponse',
          tasks: [
            {
              disabled: true,
              hintText: null,
              href: '/applicant/documents/view/respondent/doc',
              id: 'theResponsePDF',
              linkText: 'The response to application',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'Not available yet',
              },
            },
          ],
        },
        {
          heading: 'Your court hearings',
          id: 'yourHearing',
          tasks: [
            {
              disabled: true,
              hintText: null,
              href: '/applicant/hearings/12',
              id: 'viewHearingDetails',
              linkText: 'Check details of your court hearings',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'Not available yet',
              },
            },
          ],
        },
      ]);
    });
  });

  describe('FL401 applicant tasklist', () => {
    test('FL401 Applicant', () => {
      const data = {
        id: '12',
        state: State.CASE_SERVED,
        caseTypeOfApplication: CaseType.FL401,
        applicantsFL401: applicantFL401,
        citizenOrders: [
          {
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
        ],
        orderCollection: [
          {
            id: '1234',
            value: {
              dateCreated: 'date',
              orderType: 'type',
              orderDocument: {
                document_url: 'string',
                document_filename: 'string',
                document_binary_url: 'string',
                document_hash: 'string',
              },
              orderDocumentWelsh: {
                document_url: 'string',
                document_filename: 'string',
                document_binary_url: 'string',
                document_hash: 'string',
              },
              otherDetails: {
                createdBy: 'string',
                orderCreatedDate: 'string',
                orderMadeDate: 'string',
                orderRecipients: 'string',
              },
            },
          },
        ],

        hearingCollection: [
          {
            hearingID: 2000006135,
            hearingRequestDateTime: '2023-07-11T16:07:21.253071',
            hearingType: 'ABA5-FOF',
            hmcStatus: 'LISTED',
            lastResponseReceivedDateTime: '2023-07-11T16:41:37',
            requestVersion: 1,
            hearingListingStatus: 'FIXED',
            listAssistCaseStatus: 'LISTED',
            hearingDaySchedule: [
              {
                hearingStartDateTime: '2023-08-03T09:00:00',
                hearingEndDateTime: '2023-08-03T12:00:00',
                listAssistSessionId: null,
                hearingVenueId: '234946',
                hearingVenueName: 'Swansea Civil And Family Justice Centre',
                hearingVenueLocationCode: '344',
                hearingVenueAddress: 'Quay West, Quay Parade',
                hearingRoomId: 'Courtroom 01',
                hearingJudgeId: '',
                hearingJudgeName: null,
                panelMemberIds: [],
                attendees: [
                  {
                    partyID: 'f2847b15-dbb8-4df0-868a-420d9de11d29',
                    hearingSubChannel: 'VID',
                  },
                ],
              },
            ],
            hearingGroupRequestId: null,
            hearingIsLinkedFlag: false,
            hearingTypeValue: 'Finding of Fact',
            nextHearingDate: '2023-08-02T09:00:00',
            urgentFlag: false,
          },
        ],
      };
      const party = PartyType.APPLICANT;
      const language = 'en';

      expect(getTaskListConfig(data as unknown as CaseWithId, userDetails, party, language)).toStrictEqual([
        {
          id: 'aboutYou',
          heading: 'About you',
          tasks: [
            {
              id: 'editYouContactDetails',
              linkText: 'Confirm or edit your contact details',
              href: '/applicant/confirm-contact-details/checkanswers/12',
              disabled: false,
              stateTag: {
                label: 'Completed',
                className: 'govuk-tag--green',
              },
              hintText: null,
              openInAnotherTab: false,
            },
            {
              id: 'contactPreferences',
              linkText: 'Contact preferences',
              href: '/applicant/contact-preference/choose-a-contact-preference',
              disabled: false,
              stateTag: {
                label: 'TO DO',
                className: 'govuk-tag--grey',
              },
              hintText: null,
              openInAnotherTab: false,
            },
            {
              id: 'keepYourDetailsPrivate',
              linkText: 'Keep your details private',
              href: '/applicant/keep-details-private/details_known/12',
              disabled: false,
              stateTag: {
                label: 'TO DO',
                className: 'govuk-tag--grey',
              },
              hintText: null,
              openInAnotherTab: false,
            },
            {
              id: 'supportYouNeed',
              linkText: 'Support you need during your case',
              href: '/applicant/reasonable-adjustments/intro',
              disabled: false,
              stateTag: {
                label: 'Optional',
                className: 'govuk-tag--blue',
              },
              hintText: null,
              openInAnotherTab: false,
            },
          ],
        },
        {
          id: 'yourApplication',
          heading: 'Your application',
          tasks: [
            {
              id: 'yourApplicationPDF',
              linkText: 'Your application (PDF)',
              href: '/applicant/documents/download/type/fl401-application/en',
              disabled: false,
              stateTag: {
                label: 'DOWNLOAD',
                className: 'govuk-tag--green',
              },
              hintText: null,
              openInAnotherTab: true,
            },
            {
              id: 'requestToCourtAboutYourCase',
              linkText: 'Make a request to the court about your case',
              href: '/applicant/application-within-proceedings/list-of-applications/1',
              disabled: false,
              stateTag: {
                label: 'Optional',
                className: 'govuk-tag--blue',
              },
              hintText: null,
              openInAnotherTab: false,
            },
          ],
        },
        {
          id: 'yourHearing',
          heading: 'Your court hearings',
          tasks: [
            {
              id: 'viewHearingDetails',
              linkText: 'Check details of your court hearings',
              href: '/applicant/hearings/12',
              disabled: false,
              stateTag: {
                label: 'Ready to view',
                className: 'govuk-tag--blue',
              },
              hintText: null,
              openInAnotherTab: false,
            },
          ],
        },
        {
          id: 'yourDocuments',
          heading: 'Your documents',
          tasks: [
            {
              id: 'uploadDocuments',
              linkText: 'Upload documents, applications and statements',
              href: '/applicant/documents/upload',
              disabled: false,
              stateTag: {
                label: 'TO DO',
                className: 'govuk-tag--grey',
              },
              hintText: null,
              openInAnotherTab: false,
            },
            {
              id: 'viewAllDocuments',
              linkText: 'View all documents',
              href: '/applicant/documents/view/all-categories',
              disabled: false,
              stateTag: {
                label: 'Ready to view',
                className: 'govuk-tag--blue',
              },
              hintText: null,
              openInAnotherTab: false,
            },
          ],
        },
        {
          id: 'ordersFromTheCourt',
          heading: 'Orders from the court',
          tasks: [
            {
              id: 'viewOrders',
              linkText: 'View all orders from the court',
              href: '/applicant/documents/view/orders-from-the-court',
              disabled: false,
              stateTag: {
                label: 'Ready to view',
                className: 'govuk-tag--blue',
              },
              hintText: null,
              openInAnotherTab: false,
            },
          ],
        },
      ]);
    });
    test('FL401 Applicant with out hearing and order', () => {
      const data = {
        id: '12',
        state: State.CASE_SERVED,
        caseTypeOfApplication: CaseType.FL401,
        applicantsFL401: applicantFL401,
      };
      const party = PartyType.APPLICANT;
      const language = 'en';

      expect(getTaskListConfig(data as unknown as CaseWithId, userDetails, party, language)).toStrictEqual([
        {
          id: 'aboutYou',
          heading: 'About you',
          tasks: [
            {
              id: 'editYouContactDetails',
              linkText: 'Confirm or edit your contact details',
              href: '/applicant/confirm-contact-details/checkanswers/12',
              disabled: false,
              stateTag: {
                label: 'Completed',
                className: 'govuk-tag--green',
              },
              hintText: null,
              openInAnotherTab: false,
            },
            {
              id: 'contactPreferences',
              linkText: 'Contact preferences',
              href: '/applicant/contact-preference/choose-a-contact-preference',
              disabled: false,
              stateTag: {
                label: 'TO DO',
                className: 'govuk-tag--grey',
              },
              hintText: null,
              openInAnotherTab: false,
            },
            {
              id: 'keepYourDetailsPrivate',
              linkText: 'Keep your details private',
              href: '/applicant/keep-details-private/details_known/12',
              disabled: false,
              stateTag: {
                label: 'TO DO',
                className: 'govuk-tag--grey',
              },
              hintText: null,
              openInAnotherTab: false,
            },
            {
              id: 'supportYouNeed',
              linkText: 'Support you need during your case',
              href: '/applicant/reasonable-adjustments/intro',
              disabled: false,
              stateTag: {
                label: 'Optional',
                className: 'govuk-tag--blue',
              },
              hintText: null,
              openInAnotherTab: false,
            },
          ],
        },
        {
          id: 'yourApplication',
          heading: 'Your application',
          tasks: [
            {
              id: 'yourApplicationPDF',
              linkText: 'Your application (PDF)',
              href: '/applicant/documents/download/type/fl401-application/en',
              disabled: false,
              stateTag: {
                label: 'DOWNLOAD',
                className: 'govuk-tag--green',
              },
              hintText: null,
              openInAnotherTab: true,
            },
            {
              id: 'requestToCourtAboutYourCase',
              linkText: 'Make a request to the court about your case',
              href: '/applicant/application-within-proceedings/list-of-applications/1',
              disabled: false,
              stateTag: {
                label: 'Optional',
                className: 'govuk-tag--blue',
              },
              hintText: null,
              openInAnotherTab: false,
            },
          ],
        },
        {
          id: 'yourHearing',
          heading: 'Your court hearings',
          tasks: [
            {
              id: 'viewHearingDetails',
              linkText: 'Check details of your court hearings',
              href: '/applicant/hearings/12',
              disabled: true,
              stateTag: {
                label: 'Not available yet',
                className: 'govuk-tag--grey',
              },
              hintText: null,
              openInAnotherTab: false,
            },
          ],
        },
        {
          id: 'yourDocuments',
          heading: 'Your documents',
          tasks: [
            {
              id: 'uploadDocuments',
              linkText: 'Upload documents, applications and statements',
              href: '/applicant/documents/upload',
              disabled: false,
              stateTag: {
                label: 'TO DO',
                className: 'govuk-tag--grey',
              },
              hintText: null,
              openInAnotherTab: false,
            },
            {
              id: 'viewAllDocuments',
              linkText: 'View all documents',
              href: '/applicant/documents/view/all-categories',
              disabled: false,
              stateTag: {
                label: 'Ready to view',
                className: 'govuk-tag--blue',
              },
              hintText: null,
              openInAnotherTab: false,
            },
          ],
        },
        {
          id: 'ordersFromTheCourt',
          heading: 'Orders from the court',
          tasks: [
            {
              id: 'viewOrders',
              linkText: 'View all orders from the court',
              href: '/applicant/documents/view/orders-from-the-court',
              disabled: true,
              stateTag: {
                label: 'Not available yet',
                className: 'govuk-tag--grey',
              },
              hintText: null,
              openInAnotherTab: false,
            },
          ],
        },
      ]);
    });

    test('applicant is represented by solicitor', () => {
      const data = {
        id: '12',
        state: State.CASE_SERVED,
        caseTypeOfApplication: CaseType.FL401,
        applicantsFL401: {
          ...applicantFL401,
          user: {
            ...applicantFL401.user,
            solicitorRepresented: 'Yes',
          },
        },
      };
      const party = PartyType.APPLICANT;
      const language = 'en';

      expect(getTaskListConfig(data as unknown as Partial<CaseWithId>, userDetails, party, language)).toStrictEqual([
        {
          heading: 'Your application',
          id: 'yourApplication',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/download/type/fl401-application/en',
              id: 'yourApplicationPDF',
              linkText: 'Your application (PDF)',
              openInAnotherTab: true,
              stateTag: {
                className: 'govuk-tag--green',
                label: 'DOWNLOAD',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/application-within-proceedings/list-of-applications/1',
              id: 'requestToCourtAboutYourCase',
              linkText: 'Make a request to the court about your case',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Optional',
              },
            },
          ],
        },
        {
          heading: 'Your court hearings',
          id: 'yourHearing',
          tasks: [
            {
              disabled: true,
              hintText: null,
              href: '/applicant/hearings/12',
              id: 'viewHearingDetails',
              linkText: 'Check details of your court hearings',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'Not available yet',
              },
            },
          ],
        },
        {
          heading: 'Your documents',
          id: 'yourDocuments',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/view/all-categories',
              id: 'viewAllDocuments',
              linkText: 'View all documents',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Ready to view',
              },
            },
          ],
        },
        {
          heading: 'Orders from the court',
          id: 'ordersFromTheCourt',
          tasks: [
            {
              disabled: true,
              hintText: null,
              href: '/applicant/documents/view/orders-from-the-court',
              id: 'viewOrders',
              linkText: 'View all orders from the court',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'Not available yet',
              },
            },
          ],
        },
      ]);
    });

    test('when case state is closed', () => {
      const data = {
        id: '12',
        state: State.ALL_FINAL_ORDERS_ISSUED,
        caseTypeOfApplication: 'FL401',
        applicantsFL401: applicantFL401,
      };
      const party = PartyType.APPLICANT;
      const language = 'en';

      expect(getTaskListConfig(data as unknown as CaseWithId, userDetails, party, language)).toStrictEqual([
        {
          heading: 'Your application',
          id: 'yourApplication',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/download/type/fl401-application/en',
              id: 'yourApplicationPDF',
              linkText: 'Your application (PDF)',
              openInAnotherTab: true,
              stateTag: {
                className: 'govuk-tag--green',
                label: 'DOWNLOAD',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/application-within-proceedings/list-of-applications/1',
              id: 'requestToCourtAboutYourCase',
              linkText: 'Make a request to the court about your case',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Optional',
              },
            },
          ],
        },
        {
          heading: 'Your court hearings',
          id: 'yourHearing',
          tasks: [
            {
              disabled: true,
              hintText: null,
              href: '/applicant/hearings/12',
              id: 'viewHearingDetails',
              linkText: 'Check details of your court hearings',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'Not available yet',
              },
            },
          ],
        },
        {
          heading: 'Your documents',
          id: 'yourDocuments',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/upload',
              id: 'uploadDocuments',
              linkText: 'Upload documents, applications and statements',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'TO DO',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/documents/view/all-categories',
              id: 'viewAllDocuments',
              linkText: 'View all documents',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Ready to view',
              },
            },
          ],
        },
        {
          heading: 'Orders from the court',
          id: 'ordersFromTheCourt',
          tasks: [
            {
              disabled: true,
              hintText: null,
              href: '/applicant/documents/view/orders-from-the-court',
              id: 'viewOrders',
              linkText: 'View all orders from the court',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'Not available yet',
              },
            },
          ],
        },
      ]);
    });
  });

  describe('FL401 respondent', () => {
    test('FL401 respondent', () => {
      const userDetails1 = {
        id: '1234',
        accessToken: 'mock-user-access-token',
        name: 'test',
        givenName: 'First name',
        familyName: 'Last name',
        email: 'test@example.com',
      };
      const data = {
        id: '1234',
        state: State.CASE_DRAFT,
        caseTypeOfApplication: CaseType.FL401,
        finalDocument: {
          document_url: 'MOCK_DOCUMENT_URL',
          document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
          document_filename: 'MOCK_FILENAME',
        },
        respondentsFL401: {
          user: {
            idamId: '1234',
          },
          response: {
            citizenFlags: {
              isAllegationOfHarmViewed: 'Yes',
            },
          },
        },
        caseInvites: [
          {
            value: {
              partyId: '1234',
              invitedUserId: '1234',
              isApplicant: YesOrNo.NO,
            },
          },
        ],
      } as unknown as CaseWithId;

      expect(getTaskListConfig(data, userDetails1, PartyType.RESPONDENT, 'en')).toStrictEqual([
        {
          id: 'aboutYou',
          heading: 'About you',
          tasks: [
            {
              id: 'editYouContactDetails',
              linkText: 'Confirm or edit your contact details',
              href: '/respondent/confirm-contact-details/checkanswers/1234',
              disabled: false,
              stateTag: {
                label: 'TO DO',
                className: 'govuk-tag--grey',
              },
              hintText: null,
              openInAnotherTab: false,
            },
            {
              id: 'contactPreferences',
              linkText: 'Contact preferences',
              href: '/respondent/contact-preference/choose-a-contact-preference',
              disabled: false,
              stateTag: {
                label: 'TO DO',
                className: 'govuk-tag--grey',
              },
              hintText: null,
              openInAnotherTab: false,
            },
            {
              id: 'keepYourDetailsPrivate',
              linkText: 'Keep your details private',
              href: '/respondent/keep-details-private/details_known/1234',
              disabled: false,
              stateTag: {
                label: 'TO DO',
                className: 'govuk-tag--grey',
              },
              hintText: null,
              openInAnotherTab: false,
            },
            {
              id: 'supportYouNeed',
              linkText: 'Support you need during your case',
              href: '/respondent/reasonable-adjustments/intro',
              disabled: false,
              stateTag: {
                label: 'Optional',
                className: 'govuk-tag--blue',
              },
              hintText: null,
              openInAnotherTab: false,
            },
          ],
        },
        {
          id: 'theApplication',
          heading: 'The application',
          tasks: [
            {
              id: 'checkTheApplication',
              linkText: 'Check the application (PDF)',
              href: '/respondent/documents/download/type/cada-document/en',
              disabled: false,
              stateTag: {
                label: 'Ready to view',
                className: 'govuk-tag--blue',
              },
              hintText: null,
              openInAnotherTab: true,
            },
            {
              id: 'requestToCourtAboutYourCase',
              linkText: 'Make a request to the court about your case',
              href: '/respondent/application-within-proceedings/list-of-applications/1',
              disabled: false,
              stateTag: {
                label: 'Optional',
                className: 'govuk-tag--blue',
              },
              hintText: null,
              openInAnotherTab: false,
            },
          ],
        },
        {
          id: 'yourHearing',
          heading: 'Your court hearings',
          tasks: [
            {
              id: 'viewHearingDetails',
              linkText: 'Check details of your court hearings',
              href: '/respondent/hearings/1234',
              disabled: true,
              stateTag: {
                label: 'Not available yet',
                className: 'govuk-tag--grey',
              },
              hintText: null,
              openInAnotherTab: false,
            },
          ],
        },
        {
          id: 'yourDocuments',
          heading: 'Your documents',
          tasks: [
            {
              id: 'uploadDocuments',
              linkText: 'Upload documents, applications and statements',
              href: '/respondent/documents/upload',
              disabled: false,
              stateTag: {
                label: 'TO DO',
                className: 'govuk-tag--grey',
              },
              hintText: null,
              openInAnotherTab: false,
            },
            {
              id: 'viewAllDocuments',
              linkText: 'View all documents',
              href: '/respondent/documents/view/all-categories',
              disabled: false,
              stateTag: {
                label: 'Ready to view',
                className: 'govuk-tag--blue',
              },
              hintText: null,
              openInAnotherTab: false,
            },
          ],
        },
        {
          id: 'ordersFromTheCourt',
          heading: 'Orders from the court',
          tasks: [
            {
              id: 'viewOrders',
              linkText: 'View all orders from the court',
              href: '/respondent/documents/view/orders-from-the-court',
              disabled: true,
              stateTag: {
                label: 'Not available yet',
                className: 'govuk-tag--grey',
              },
              hintText: null,
              openInAnotherTab: false,
            },
          ],
        },
      ]);
    });

    test('respondent is represented by solicitor', () => {
      const data = {
        id: '12',
        state: State.CASE_SERVED,
        caseTypeOfApplication: CaseType.FL401,
        applicantsFL401: {
          ...applicantFL401,
          user: {
            ...applicantFL401.user,
            solicitorRepresented: 'Yes',
          },
        },
      };
      const party = PartyType.RESPONDENT;
      const language = 'en';

      expect(getTaskListConfig(data as unknown as Partial<CaseWithId>, userDetails, party, language)).toStrictEqual([
        {
          heading: 'The application',
          id: 'theApplication',
          tasks: [
            {
              disabled: true,
              hintText: null,
              href: '/respondent/documents/download/type/cada-document/en',
              id: 'checkTheApplication',
              linkText: 'Check the application (PDF)',
              openInAnotherTab: true,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'Not available yet',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/respondent/application-within-proceedings/list-of-applications/1',
              id: 'requestToCourtAboutYourCase',
              linkText: 'Make a request to the court about your case',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Optional',
              },
            },
          ],
        },
        {
          heading: 'Your court hearings',
          id: 'yourHearing',
          tasks: [
            {
              disabled: true,
              hintText: null,
              href: '/respondent/hearings/12',
              id: 'viewHearingDetails',
              linkText: 'Check details of your court hearings',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'Not available yet',
              },
            },
          ],
        },
        {
          heading: 'Your documents',
          id: 'yourDocuments',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/respondent/documents/view/all-categories',
              id: 'viewAllDocuments',
              linkText: 'View all documents',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Ready to view',
              },
            },
          ],
        },
        {
          heading: 'Orders from the court',
          id: 'ordersFromTheCourt',
          tasks: [
            {
              disabled: true,
              hintText: null,
              href: '/respondent/documents/view/orders-from-the-court',
              id: 'viewOrders',
              linkText: 'View all orders from the court',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'Not available yet',
              },
            },
          ],
        },
      ]);
    });

    test('when case state is closed', () => {
      const data = {
        id: '12',
        state: State.ALL_FINAL_ORDERS_ISSUED,
        caseTypeOfApplication: 'FL401',
        finalDocument: {
          document_url: 'MOCK_DOCUMENT_URL',
          document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
          document_filename: 'MOCK_FILENAME',
        },
      };
      const party = PartyType.RESPONDENT;
      const language = 'en';

      expect(getTaskListConfig(data, userDetails, party, language)).toStrictEqual([
        {
          heading: 'The application',
          id: 'theApplication',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/respondent/documents/download/type/cada-document/en',
              id: 'checkTheApplication',
              linkText: 'Check the application (PDF)',
              openInAnotherTab: true,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Ready to view',
              },
            },
          ],
        },
      ]);
    });
  });
});

describe('c100 respondent', () => {
  const userDetails = {
    id: '1234',
    accessToken: 'mock-user-access-token',
    name: 'test',
    givenName: 'First name',
    familyName: 'Last name',
    email: 'test@example.com',
  };

  test('should return correct task list when case not updated yet', () => {
    const data = {
      id: '1234',
      state: State.CASE_DRAFT,
      caseTypeOfApplication: CaseType.C100,
      respondents: [
        {
          id: '1234',
          value: {
            user: {
              idamId: '1234',
            },
            response: {
              citizenFlags: {
                isAllegationOfHarmViewed: 'Yes',
              },
            },
          },
        },
      ],
      caseInvites: [
        {
          value: {
            partyId: '1234',
            invitedUserId: '1234',
          },
        },
      ],
    } as unknown as CaseWithId;

    expect(getTaskListConfig(data, userDetails, PartyType.RESPONDENT, 'en')).toStrictEqual([
      {
        id: 'aboutYou',
        heading: 'About you',
        tasks: [
          {
            id: 'editYouContactDetails',
            linkText: 'Confirm or edit your contact details',
            href: '/respondent/confirm-contact-details/checkanswers/1234',
            disabled: false,
            stateTag: {
              label: 'TO DO',
              className: 'govuk-tag--grey',
            },
            hintText: null,
            openInAnotherTab: false,
          },
          {
            id: 'contactPreferences',
            linkText: 'Contact preferences',
            href: '/respondent/contact-preference/choose-a-contact-preference',
            disabled: false,
            stateTag: {
              label: 'TO DO',
              className: 'govuk-tag--grey',
            },
            hintText: null,
            openInAnotherTab: false,
          },
          {
            id: 'keepYourDetailsPrivate',
            linkText: 'Keep your details private',
            href: '/respondent/keep-details-private/details_known/1234',
            disabled: false,
            stateTag: {
              label: 'TO DO',
              className: 'govuk-tag--grey',
            },
            hintText: null,
            openInAnotherTab: false,
          },
          {
            id: 'supportYouNeed',
            linkText: 'Support you need during your case',
            href: '/respondent/reasonable-adjustments/intro',
            disabled: false,
            stateTag: {
              label: 'Optional',
              className: 'govuk-tag--blue',
            },
            hintText: null,
            openInAnotherTab: false,
          },
        ],
      },
      {
        id: 'theApplication',
        heading: 'The application',
        tasks: [
          {
            id: 'checkTheApplication',
            linkText: 'Check the application (PDF)',
            href: '/respondent/documents/download/type/cada-document/en',
            disabled: true,
            stateTag: {
              label: 'Not available yet',
              className: 'govuk-tag--grey',
            },
            hintText: null,
            openInAnotherTab: true,
          },
          {
            id: 'checkAllegationsOfHarmAndViolence',
            linkText: 'Check the allegations of harm and violence (PDF)',
            href: '/respondent/documents/download/type/aoh-document/en',
            disabled: true,
            stateTag: {
              label: 'Not available yet',
              className: 'govuk-tag--grey',
            },
            hintText: null,
            openInAnotherTab: true,
          },
          {
            id: 'requestToCourtAboutYourCase',
            linkText: 'Make a request to the court about your case',
            href: '/respondent/application-within-proceedings/list-of-applications/1',
            disabled: false,
            stateTag: {
              label: 'Optional',
              className: 'govuk-tag--blue',
            },
            hintText: null,
            openInAnotherTab: false,
          },
        ],
      },
      {
        id: 'yourResponse',
        heading: 'Your response',
        tasks: [
          {
            id: 'respondToTheApplication',
            linkText: 'Respond to the application',
            href: '/tasklistresponse/start',
            disabled: false,
            stateTag: {
              label: 'TO DO',
              className: 'govuk-tag--grey',
            },
            hintText: null,
            openInAnotherTab: false,
          },
        ],
      },
      {
        id: 'yourHearing',
        heading: 'Your court hearings',
        tasks: [
          {
            id: 'viewHearingDetails',
            linkText: 'Check details of your court hearings',
            href: '/respondent/hearings/1234',
            disabled: true,
            stateTag: {
              label: 'Not available yet',
              className: 'govuk-tag--grey',
            },
            hintText: null,
            openInAnotherTab: false,
          },
        ],
      },
      {
        id: 'yourDocuments',
        heading: 'Your documents',
        tasks: [
          {
            id: 'uploadDocuments',
            linkText: 'Upload documents, applications and statements',
            href: '/respondent/documents/upload',
            disabled: false,
            stateTag: {
              label: 'TO DO',
              className: 'govuk-tag--grey',
            },
            hintText: null,
            openInAnotherTab: false,
          },
          {
            id: 'viewAllDocuments',
            linkText: 'View all documents',
            href: '/respondent/documents/view/all-categories',
            disabled: false,
            stateTag: {
              label: 'Ready to view',
              className: 'govuk-tag--blue',
            },
            hintText: null,
            openInAnotherTab: false,
          },
        ],
      },
      {
        id: 'ordersFromTheCourt',
        heading: 'Orders from the court',
        tasks: [
          {
            id: 'viewOrders',
            linkText: 'View all orders from the court',
            href: '/respondent/documents/view/orders-from-the-court',
            disabled: true,
            stateTag: {
              label: 'Not available yet',
              className: 'govuk-tag--grey',
            },
            hintText: null,
            openInAnotherTab: false,
          },
        ],
      },
    ]);
  });

  test('should return correct task list when case in progress', () => {
    const caseData = {
      id: '1234',
      state: State.CASE_DRAFT,
      caseTypeOfApplication: CaseType.C100,
      finalDocument: {
        document_url: 'DOC_URL',
        document_filename: 'DOC_FILENAME',
        document_binary_url: 'DOC_BINARY_URL',
      },
      c1ADocument: {
        document_url: 'DOC_URL',
        document_filename: 'DOC_FILENAME',
        document_binary_url: 'DOC_BINARY_URL',
      },
      hearingCollection: [
        {
          hearingID: 1234,
        },
      ],
      orderCollection: [
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
      ],
      respondents: [
        {
          id: '1234',
          value: {
            user: {
              idamId: '1234',
            },
            firstName: 'FirstName',
            response: {
              citizenFlags: {
                isAllegationOfHarmViewed: 'No',
              },
              keepDetailsPrivate: {
                otherPeopleKnowYourContactDetails: 'Yes',
              },
              languageRequirements: ['No'],
              citizenInternationalElements: {
                childrenLiveOutsideOfEnWl: 'No',
                parentsAnyOneLiveOutsideEnWl: 'No',
              },
            },
          },
        },
      ],
      caseInvites: [
        {
          value: {
            partyId: '1234',
            invitedUserId: '1234',
          },
        },
      ],
    } as unknown as CaseWithId;

    expect(getTaskListConfig(caseData, userDetails, PartyType.RESPONDENT, 'en')).toStrictEqual([
      {
        id: 'aboutYou',
        heading: 'About you',
        tasks: [
          {
            id: 'editYouContactDetails',
            linkText: 'Confirm or edit your contact details',
            href: '/respondent/confirm-contact-details/checkanswers/1234',
            disabled: false,
            stateTag: {
              label: 'In progress',
              className: 'govuk-tag--blue',
            },
            hintText: null,
            openInAnotherTab: false,
          },
          {
            id: 'contactPreferences',
            linkText: 'Contact preferences',
            href: '/respondent/contact-preference/choose-a-contact-preference',
            disabled: false,
            stateTag: {
              label: 'TO DO',
              className: 'govuk-tag--grey',
            },
            hintText: null,
            openInAnotherTab: false,
          },
          {
            id: 'keepYourDetailsPrivate',
            linkText: 'Keep your details private',
            href: '/respondent/keep-details-private/details_known/1234',
            disabled: false,
            stateTag: {
              label: 'In progress',
              className: 'govuk-tag--blue',
            },
            hintText: null,
            openInAnotherTab: false,
          },
          {
            id: 'supportYouNeed',
            linkText: 'Support you need during your case',
            href: '/respondent/reasonable-adjustments/intro',
            disabled: false,
            stateTag: {
              label: 'Optional',
              className: 'govuk-tag--blue',
            },
            hintText: null,
            openInAnotherTab: false,
          },
        ],
      },
      {
        id: 'theApplication',
        heading: 'The application',
        tasks: [
          {
            id: 'checkTheApplication',
            linkText: 'Check the application (PDF)',
            href: '/respondent/documents/download/type/cada-document/en',
            disabled: false,
            stateTag: {
              label: 'Ready to view',
              className: 'govuk-tag--blue',
            },
            hintText: null,
            openInAnotherTab: true,
          },
          {
            id: 'checkAllegationsOfHarmAndViolence',
            linkText: 'Check the allegations of harm and violence (PDF)',
            href: '/respondent/documents/download/type/aoh-document/en',
            disabled: false,
            stateTag: {
              label: 'Ready to view',
              className: 'govuk-tag--blue',
            },
            hintText: null,
            openInAnotherTab: true,
          },
          {
            id: 'requestToCourtAboutYourCase',
            linkText: 'Make a request to the court about your case',
            href: '/respondent/application-within-proceedings/list-of-applications/1',
            disabled: false,
            stateTag: {
              label: 'Optional',
              className: 'govuk-tag--blue',
            },
            hintText: null,
            openInAnotherTab: false,
          },
        ],
      },
      {
        id: 'yourResponse',
        heading: 'Your response',
        tasks: [
          {
            id: 'respondToTheApplication',
            linkText: 'Respond to the application',
            href: '/tasklistresponse/start',
            disabled: false,
            stateTag: {
              label: 'TO DO',
              className: 'govuk-tag--grey',
            },
            hintText: null,
            openInAnotherTab: false,
          },
        ],
      },
      {
        id: 'yourHearing',
        heading: 'Your court hearings',
        tasks: [
          {
            id: 'viewHearingDetails',
            linkText: 'Check details of your court hearings',
            href: '/respondent/hearings/1234',
            disabled: false,
            stateTag: {
              label: 'Ready to view',
              className: 'govuk-tag--blue',
            },
            hintText: null,
            openInAnotherTab: false,
          },
        ],
      },
      {
        id: 'yourDocuments',
        heading: 'Your documents',
        tasks: [
          {
            id: 'uploadDocuments',
            linkText: 'Upload documents, applications and statements',
            href: '/respondent/documents/upload',
            disabled: false,
            stateTag: {
              label: 'TO DO',
              className: 'govuk-tag--grey',
            },
            hintText: null,
            openInAnotherTab: false,
          },
          {
            id: 'viewAllDocuments',
            linkText: 'View all documents',
            href: '/respondent/documents/view/all-categories',
            disabled: false,
            stateTag: {
              label: 'Ready to view',
              className: 'govuk-tag--blue',
            },
            hintText: null,
            openInAnotherTab: false,
          },
        ],
      },
      {
        id: 'ordersFromTheCourt',
        heading: 'Orders from the court',
        tasks: [
          {
            id: 'viewOrders',
            linkText: 'View all orders from the court',
            href: '/respondent/documents/view/orders-from-the-court',
            disabled: true,
            stateTag: {
              label: 'Not available yet',
              className: 'govuk-tag--grey',
            },
            hintText: null,
            openInAnotherTab: false,
          },
        ],
      },
    ]);
  });

  test('should return correct task list when case completed', () => {
    const caseData = {
      id: '1234',
      state: State.CASE_DRAFT,
      caseTypeOfApplication: CaseType.C100,
      finalDocument: {
        document_url: 'DOC_URL',
        document_filename: 'DOC_FILENAME',
        document_binary_url: 'DOC_BINARY_URL',
      },
      c1ADocument: {
        document_url: 'DOC_URL',
        document_filename: 'DOC_FILENAME',
        document_binary_url: 'DOC_BINARY_URL',
      },
      hearingCollection: [
        {
          hearingID: 1234,
        },
      ],
      citizenOrders: [
        {
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
      ],
      orderCollection: [
        {
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
      ],
      citizenResponseC7DocumentList: [
        {
          id: '1234',
          value: {
            partyName: 'NAME',
            createdBy: '1234',
            dateCreated: '1/1/2020',
            citizenDocument: {
              document_url: 'DOC_URL',
              document_filename: 'DOC_FILENAME',
              document_binary_url: 'DOC_BINARY_URL',
            },
          },
        },
      ],
      respondents: [
        {
          id: '1234',
          value: {
            user: {
              idamId: '1234',
            },
            firstName: 'FirstName',
            lastName: 'LastName',
            dateOfBirth: '1/1/2020',
            placeOfBirth: 'London',
            response: {
              c7ResponseSubmitted: 'Yes',
              citizenFlags: {
                isAllegationOfHarmViewed: 'Yes',
                isApplicationViewed: 'Yes',
              },
              keepDetailsPrivate: {
                confidentiality: ['address'],
                otherPeopleKnowYourContactDetails: 'Yes',
              },
              citizenInternationalElements: {
                childrenLiveOutsideOfEnWl: 'No',
                parentsAnyOneLiveOutsideEnWl: 'No',
                anotherPersonOrderOutsideEnWl: 'No',
                anotherCountryAskedInformation: 'No',
              },
              consent: {},
              currentOrPreviousProceedings: {},
              miam: {},
              legalRepresentation: {},
              safetyConcerns: {},
              supportYouNeed: {
                languageRequirements: ['No'],
                reasonableAdjustments: ['No'],
                safetyArrangements: ['No'],
                attendingToCourt: ['No'],
              },
            },
          },
        },
      ],
      respondentDocuments: [
        {
          partyId: '1234',
          partyType: 'respondent',
          categoryId: DocumentCategory.RESPONDENT_C7_RESPONSE_TO_APPLICATION,
          uploadedBy: 'test user',
          uploadedDate: '01/01/2024',
          reviewedDate: '01/01/2024',
          document: {
            document_url: 'MOCK_DOCUMENT_URL',
            document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
            document_filename: 'MOCK_FILENAME',
            document_hash: null,
            category_id: DocumentCategory.RESPONDENT_C7_RESPONSE_TO_APPLICATION,
            document_creation_date: '01/01/2024',
          },
          documentWelsh: null,
        },
      ],
      caseInvites: [
        {
          value: {
            partyId: '1234',
            invitedUserId: '1234',
          },
        },
      ],
    } as unknown as CaseWithId;

    expect(getTaskListConfig(caseData, userDetails, PartyType.RESPONDENT, 'en')).toStrictEqual([
      {
        id: 'aboutYou',
        heading: 'About you',
        tasks: [
          {
            id: 'editYouContactDetails',
            linkText: 'Confirm or edit your contact details',
            href: '/respondent/confirm-contact-details/checkanswers/1234',
            disabled: false,
            stateTag: {
              label: 'In progress',
              className: 'govuk-tag--blue',
            },
            hintText: null,
            openInAnotherTab: false,
          },
          {
            id: 'contactPreferences',
            linkText: 'Contact preferences',
            href: '/respondent/contact-preference/choose-a-contact-preference',
            disabled: false,
            stateTag: {
              label: 'TO DO',
              className: 'govuk-tag--grey',
            },
            hintText: null,
            openInAnotherTab: false,
          },
          {
            id: 'keepYourDetailsPrivate',
            linkText: 'Keep your details private',
            href: '/respondent/keep-details-private/details_known/1234',
            disabled: false,
            stateTag: {
              label: 'Completed',
              className: 'govuk-tag--green',
            },
            hintText: null,
            openInAnotherTab: false,
          },
          {
            id: 'supportYouNeed',
            linkText: 'Support you need during your case',
            href: '/respondent/reasonable-adjustments/intro',
            disabled: false,
            stateTag: {
              label: 'Optional',
              className: 'govuk-tag--blue',
            },
            hintText: null,
            openInAnotherTab: false,
          },
        ],
      },
      {
        id: 'theApplication',
        heading: 'The application',
        tasks: [
          {
            id: 'checkTheApplication',
            linkText: 'Check the application (PDF)',
            href: '/respondent/documents/download/type/cada-document/en',
            disabled: false,
            stateTag: {
              label: 'Ready to view',
              className: 'govuk-tag--blue',
            },
            hintText: null,
            openInAnotherTab: true,
          },
          {
            id: 'checkAllegationsOfHarmAndViolence',
            linkText: 'Check the allegations of harm and violence (PDF)',
            href: '/respondent/documents/download/type/aoh-document/en',
            disabled: false,
            stateTag: {
              label: 'Ready to view',
              className: 'govuk-tag--blue',
            },
            hintText: null,
            openInAnotherTab: true,
          },
          {
            id: 'requestToCourtAboutYourCase',
            linkText: 'Make a request to the court about your case',
            href: '/respondent/application-within-proceedings/list-of-applications/1',
            disabled: false,
            stateTag: {
              label: 'Optional',
              className: 'govuk-tag--blue',
            },
            hintText: null,
            openInAnotherTab: false,
          },
        ],
      },
      {
        id: 'yourResponse',
        heading: 'Your response',
        tasks: [
          {
            id: 'theResponsePDF',
            linkText: 'The response to application',
            href: '/respondent/documents/view/respondent/doc',
            disabled: false,
            stateTag: {
              label: 'Ready to view',
              className: 'govuk-tag--blue',
            },
            hintText: null,
            openInAnotherTab: false,
          },
        ],
      },
      {
        id: 'yourHearing',
        heading: 'Your court hearings',
        tasks: [
          {
            id: 'viewHearingDetails',
            linkText: 'Check details of your court hearings',
            href: '/respondent/hearings/1234',
            disabled: false,
            stateTag: {
              label: 'Ready to view',
              className: 'govuk-tag--blue',
            },
            hintText: null,
            openInAnotherTab: false,
          },
        ],
      },
      {
        id: 'yourDocuments',
        heading: 'Your documents',
        tasks: [
          {
            id: 'uploadDocuments',
            linkText: 'Upload documents, applications and statements',
            href: '/respondent/documents/upload',
            disabled: false,
            stateTag: {
              label: 'TO DO',
              className: 'govuk-tag--grey',
            },
            hintText: null,
            openInAnotherTab: false,
          },
          {
            id: 'viewAllDocuments',
            linkText: 'View all documents',
            href: '/respondent/documents/view/all-categories',
            disabled: false,
            stateTag: {
              label: 'Ready to view',
              className: 'govuk-tag--blue',
            },
            hintText: null,
            openInAnotherTab: false,
          },
        ],
      },
      {
        id: 'ordersFromTheCourt',
        heading: 'Orders from the court',
        tasks: [
          {
            id: 'viewOrders',
            linkText: 'View all orders from the court',
            href: '/respondent/documents/view/orders-from-the-court',
            disabled: false,
            stateTag: {
              label: 'Ready to view',
              className: 'govuk-tag--blue',
            },
            hintText: null,
            openInAnotherTab: false,
          },
        ],
      },
    ]);
  });
  test('should return correct task list when respondent yet to submit response', () => {
    const caseData = {
      id: '1234',
      state: State.CASE_HEARING,
      caseTypeOfApplication: CaseType.C100,
      finalDocument: {
        document_url: 'DOC_URL',
        document_filename: 'DOC_FILENAME',
        document_binary_url: 'DOC_BINARY_URL',
      },
      c1ADocument: {
        document_url: 'DOC_URL',
        document_filename: 'DOC_FILENAME',
        document_binary_url: 'DOC_BINARY_URL',
      },
      hearingCollection: [
        {
          hearingID: 1234,
        },
      ],
      citizenOrders: [
        {
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
      ],
      orderCollection: [
        {
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
      ],
      citizenResponseC7DocumentList: [
        {
          id: '1234',
          value: {
            partyName: 'NAME',
            createdBy: '1234',
            dateCreated: '1/1/2020',
            citizenDocument: {
              document_url: 'DOC_URL',
              document_filename: 'DOC_FILENAME',
              document_binary_url: 'DOC_BINARY_URL',
            },
          },
        },
      ],
      respondents: [
        {
          id: '1234',
          value: {
            user: {
              idamId: '1234',
            },
            firstName: 'FirstName',
            lastName: 'LastName',
            dateOfBirth: '1/1/2020',
            placeOfBirth: 'London',
            response: {
              c7ResponseSubmitted: 'No',
              citizenFlags: {
                isAllegationOfHarmViewed: 'Yes',
                isApplicationViewed: 'Yes',
              },
              keepDetailsPrivate: {
                confidentiality: ['address'],
                otherPeopleKnowYourContactDetails: 'Yes',
              },
              citizenInternationalElements: {
                childrenLiveOutsideOfEnWl: 'No',
                parentsAnyOneLiveOutsideEnWl: 'No',
                anotherPersonOrderOutsideEnWl: 'No',
                anotherCountryAskedInformation: 'No',
              },
              consent: {},
              currentOrPreviousProceedings: {},
              miam: {},
              legalRepresentation: {},
              safetyConcerns: {},
              supportYouNeed: {
                languageRequirements: ['No'],
                reasonableAdjustments: ['No'],
                safetyArrangements: ['No'],
                attendingToCourt: ['No'],
              },
            },
          },
        },
      ],
      respondentDocuments: [
        {
          partyId: '1234',
          partyType: 'respondent',
          categoryId: DocumentCategory.RESPONDENT_C7_RESPONSE_TO_APPLICATION,
          uploadedBy: 'test user',
          uploadedDate: '01/01/2024',
          reviewedDate: '01/01/2024',
          document: {
            document_url: 'MOCK_DOCUMENT_URL',
            document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
            document_filename: 'MOCK_FILENAME',
            document_hash: null,
            category_id: DocumentCategory.RESPONDENT_C7_RESPONSE_TO_APPLICATION,
            document_creation_date: '01/01/2024',
          },
          documentWelsh: null,
        },
      ],
      caseInvites: [
        {
          value: {
            partyId: '1234',
            invitedUserId: '1234',
          },
        },
      ],
    } as unknown as CaseWithId;

    expect(getTaskListConfig(caseData, userDetails, PartyType.RESPONDENT, 'en')).toStrictEqual([
      {
        id: 'aboutYou',
        heading: 'About you',
        tasks: [
          {
            id: 'editYouContactDetails',
            linkText: 'Confirm or edit your contact details',
            href: '/respondent/confirm-contact-details/checkanswers/1234',
            disabled: false,
            stateTag: {
              label: 'In progress',
              className: 'govuk-tag--blue',
            },
            hintText: null,
            openInAnotherTab: false,
          },
          {
            id: 'contactPreferences',
            linkText: 'Contact preferences',
            href: '/respondent/contact-preference/choose-a-contact-preference',
            disabled: false,
            stateTag: {
              label: 'TO DO',
              className: 'govuk-tag--grey',
            },
            hintText: null,
            openInAnotherTab: false,
          },
          {
            id: 'keepYourDetailsPrivate',
            linkText: 'Keep your details private',
            href: '/respondent/keep-details-private/details_known/1234',
            disabled: false,
            stateTag: {
              label: 'Completed',
              className: 'govuk-tag--green',
            },
            hintText: null,
            openInAnotherTab: false,
          },
          {
            id: 'supportYouNeed',
            linkText: 'Support you need during your case',
            href: '/respondent/reasonable-adjustments/intro',
            disabled: false,
            stateTag: {
              label: 'Optional',
              className: 'govuk-tag--blue',
            },
            hintText: null,
            openInAnotherTab: false,
          },
        ],
      },
      {
        id: 'theApplication',
        heading: 'The application',
        tasks: [
          {
            id: 'checkTheApplication',
            linkText: 'Check the application (PDF)',
            href: '/respondent/documents/download/type/cada-document/en',
            disabled: false,
            stateTag: {
              label: 'Ready to view',
              className: 'govuk-tag--blue',
            },
            hintText: null,
            openInAnotherTab: true,
          },
          {
            id: 'checkAllegationsOfHarmAndViolence',
            linkText: 'Check the allegations of harm and violence (PDF)',
            href: '/respondent/documents/download/type/aoh-document/en',
            disabled: false,
            stateTag: {
              label: 'Ready to view',
              className: 'govuk-tag--blue',
            },
            hintText: null,
            openInAnotherTab: true,
          },
          {
            id: 'requestToCourtAboutYourCase',
            linkText: 'Make a request to the court about your case',
            href: '/respondent/application-within-proceedings/list-of-applications/1',
            disabled: false,
            stateTag: {
              label: 'Optional',
              className: 'govuk-tag--blue',
            },
            hintText: null,
            openInAnotherTab: false,
          },
        ],
      },
      {
        id: 'yourResponse',
        heading: 'Your response',
        tasks: [
          {
            id: 'respondToTheApplication',
            linkText: 'Respond to the application',
            href: '/tasklistresponse/start',
            disabled: false,
            stateTag: {
              label: 'In progress',
              className: 'govuk-tag--blue',
            },
            hintText: null,
            openInAnotherTab: false,
          },
        ],
      },
      {
        id: 'yourHearing',
        heading: 'Your court hearings',
        tasks: [
          {
            id: 'viewHearingDetails',
            linkText: 'Check details of your court hearings',
            href: '/respondent/hearings/1234',
            disabled: false,
            stateTag: {
              label: 'Ready to view',
              className: 'govuk-tag--blue',
            },
            hintText: null,
            openInAnotherTab: false,
          },
        ],
      },
      {
        id: 'yourDocuments',
        heading: 'Your documents',
        tasks: [
          {
            id: 'uploadDocuments',
            linkText: 'Upload documents, applications and statements',
            href: '/respondent/documents/upload',
            disabled: false,
            stateTag: {
              label: 'TO DO',
              className: 'govuk-tag--grey',
            },
            hintText: null,
            openInAnotherTab: false,
          },
          {
            id: 'viewAllDocuments',
            linkText: 'View all documents',
            href: '/respondent/documents/view/all-categories',
            disabled: false,
            stateTag: {
              label: 'Ready to view',
              className: 'govuk-tag--blue',
            },
            hintText: null,
            openInAnotherTab: false,
          },
        ],
      },
      {
        id: 'ordersFromTheCourt',
        heading: 'Orders from the court',
        tasks: [
          {
            id: 'viewOrders',
            linkText: 'View all orders from the court',
            href: '/respondent/documents/view/orders-from-the-court',
            disabled: false,
            stateTag: {
              label: 'Ready to view',
              className: 'govuk-tag--blue',
            },
            hintText: null,
            openInAnotherTab: false,
          },
        ],
      },
    ]);
  });
  test('should return correct task list when case is closed', () => {
    const caseData = {
      id: '1234',
      state: State.ALL_FINAL_ORDERS_ISSUED,
      caseTypeOfApplication: CaseType.C100,
      finalDocument: {
        document_url: 'DOC_URL',
        document_filename: 'DOC_FILENAME',
        document_binary_url: 'DOC_BINARY_URL',
      },
      c1ADocument: {
        document_url: 'DOC_URL',
        document_filename: 'DOC_FILENAME',
        document_binary_url: 'DOC_BINARY_URL',
      },
      hearingCollection: [
        {
          hearingID: 1234,
        },
      ],
      citizenOrders: [
        {
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
      ],
      orderCollection: [
        {
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
      ],
      citizenResponseC7DocumentList: [
        {
          id: '1234',
          value: {
            partyName: 'NAME',
            createdBy: '1234',
            dateCreated: '1/1/2020',
            citizenDocument: {
              document_url: 'DOC_URL',
              document_filename: 'DOC_FILENAME',
              document_binary_url: 'DOC_BINARY_URL',
            },
          },
        },
      ],
      respondents: [
        {
          id: '1234',
          value: {
            user: {
              idamId: '1234',
            },
            firstName: 'FirstName',
            lastName: 'LastName',
            dateOfBirth: '1/1/2020',
            placeOfBirth: 'London',
            response: {
              citizenFlags: {
                isAllegationOfHarmViewed: 'Yes',
                isApplicationViewed: 'Yes',
              },
              keepDetailsPrivate: {
                confidentiality: ['address'],
                otherPeopleKnowYourContactDetails: 'Yes',
              },
              citizenInternationalElements: {
                childrenLiveOutsideOfEnWl: 'No',
                parentsAnyOneLiveOutsideEnWl: 'No',
                anotherPersonOrderOutsideEnWl: 'No',
                anotherCountryAskedInformation: 'No',
              },
              consent: {},
              currentOrPreviousProceedings: {},
              miam: {},
              legalRepresentation: {},
              safetyConcerns: {},
              supportYouNeed: {
                languageRequirements: ['No'],
                reasonableAdjustments: ['No'],
                safetyArrangements: ['No'],
                attendingToCourt: ['No'],
              },
            },
          },
        },
      ],
      caseInvites: [
        {
          value: {
            partyId: '1234',
            invitedUserId: '1234',
          },
        },
      ],
    } as unknown as CaseWithId;
    expect(getTaskListConfig(caseData, userDetails, PartyType.RESPONDENT, 'en')).toStrictEqual([
      {
        heading: 'The application',
        id: 'theApplication',
        tasks: [
          {
            disabled: false,
            hintText: null,
            href: '/respondent/documents/download/type/cada-document/en',
            id: 'checkTheApplication',
            linkText: 'Check the application (PDF)',
            stateTag: { className: 'govuk-tag--blue', label: 'Ready to view' },
            openInAnotherTab: true,
          },
          {
            disabled: false,
            hintText: null,
            href: '/respondent/documents/download/type/aoh-document/en',
            id: 'checkAllegationsOfHarmAndViolence',
            linkText: 'Check the allegations of harm and violence (PDF)',
            stateTag: { className: 'govuk-tag--blue', label: 'Ready to view' },
            openInAnotherTab: true,
          },
          {
            disabled: false,
            hintText: null,
            href: '/respondent/application-within-proceedings/list-of-applications/1',
            id: 'requestToCourtAboutYourCase',
            linkText: 'Make a request to the court about your case',
            openInAnotherTab: false,
            stateTag: {
              className: 'govuk-tag--blue',
              label: 'Optional',
            },
          },
        ],
      },
      {
        heading: 'Your court hearings',
        id: 'yourHearing',
        tasks: [
          {
            disabled: false,
            hintText: null,
            href: '/respondent/hearings/1234',
            id: 'viewHearingDetails',
            linkText: 'Check details of your court hearings',
            openInAnotherTab: false,
            stateTag: { className: 'govuk-tag--blue', label: 'Ready to view' },
          },
        ],
      },
      {
        heading: 'Your documents',
        id: 'yourDocuments',
        tasks: [
          {
            disabled: false,
            hintText: null,
            href: '/respondent/documents/upload',
            id: 'uploadDocuments',
            linkText: 'Upload documents, applications and statements',
            openInAnotherTab: false,
            stateTag: {
              className: 'govuk-tag--grey',
              label: 'TO DO',
            },
          },
          {
            disabled: false,
            hintText: null,
            href: '/respondent/documents/view/all-categories',
            id: 'viewAllDocuments',
            linkText: 'View all documents',
            openInAnotherTab: false,
            stateTag: {
              className: 'govuk-tag--blue',
              label: 'Ready to view',
            },
          },
        ],
      },
      {
        heading: 'Orders from the court',
        id: 'ordersFromTheCourt',
        tasks: [
          {
            disabled: false,
            hintText: null,
            href: '/respondent/documents/view/orders-from-the-court',
            id: 'viewOrders',
            linkText: 'View all orders from the court',
            openInAnotherTab: false,
            stateTag: { className: 'govuk-tag--blue', label: 'Ready to view' },
          },
        ],
      },
    ]);
  });
});
