import { CaseWithId } from '../../../../../app/case/case';
import { CaseType, PartyType, RespondentDocs, State, YesOrNo } from '../../../../../app/case/definition';

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
              href: '/c100-rebuild/application-copy/download',
              id: 'yourApplicationPDF',
              linkText: 'Your application (PDF)',
              openInAnotherTab: false,
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
              href: '/applicant/contact-preferences/contact-preferences/12',
              id: 'contactPreferences',
              linkText: 'Contact preferences',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
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
              href: '/applicant/reasonable-adjustments/guidance',
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
              href: '/c100-rebuild/application-copy/download',
              id: 'yourApplicationPDF',
              linkText: 'Your application (PDF)',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
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
              href: '/applicant/upload-document',
              id: 'uploadDocuments',
              linkText: ' Upload documents',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Optional',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/yourdocuments/alldocuments/alldocuments',
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
              href: '/applicant/yourdocuments/alldocuments/orders',
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
              href: '/applicant/responsetoca?name=First Respondent',
              id: 'theResponsePDF',
              linkText: 'Response 1 to your application',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'Not available yet',
              },
            },
            {
              disabled: true,
              hintText: null,
              href: '/applicant/responsetoca?name=Second Respondent',
              id: 'theResponsePDF',
              linkText: 'Response 2 to your application',
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
              href: '/applicant/yourhearings/hearings/12',
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
        respondentDocsList: [
          {
            id: 'f0dddf6e-8ece-4e6c-b49e-4612d442e8a8',
            value: {
              c1aDocument: undefined,
              c7Document: {
                partyName: 'First Respondent',
                createdBy: '123456',
                dateCreated: '1/1/2020',
                citizenDocument: {
                  document_url: 'MOCK_DOCUMENT_URL',
                  document_filename: 'MOCK_DOCUMENT_FILENAME',
                  document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                },
              },
              otherDocuments: undefined,
            },
          } as unknown as RespondentDocs,
        ],
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
              href: '/applicant/contact-preferences/contact-preferences/12',
              id: 'contactPreferences',
              linkText: 'Contact preferences',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
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
              href: '/applicant/reasonable-adjustments/guidance',
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
              href: '/c100-rebuild/application-copy/download',
              id: 'yourApplicationPDF',
              linkText: 'Your application (PDF)',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
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
              href: '/applicant/upload-document',
              id: 'uploadDocuments',
              linkText: ' Upload documents',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Optional',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/yourdocuments/alldocuments/alldocuments',
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
              href: '/applicant/yourdocuments/alldocuments/orders',
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
              href: '/applicant/responsetoca?name=First Respondent',
              id: 'theResponsePDF',
              linkText: 'Response 1 to your application',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Ready to view',
              },
            },
            {
              disabled: true,
              hintText: null,
              href: '/applicant/responsetoca?name=Second Respondent',
              id: 'theResponsePDF',
              linkText: 'Response 2 to your application',
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
              href: '/applicant/yourhearings/hearings/12',
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
              href: '/applicant/contact-preferences/contact-preferences/12',
              id: 'contactPreferences',
              linkText: 'Contact preferences',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
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
              href: '/applicant/reasonable-adjustments/guidance',
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
              href: '/c100-rebuild/application-copy/download',
              id: 'yourApplicationPDF',
              linkText: 'Your application (PDF)',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
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
              href: '/applicant/upload-document',
              id: 'uploadDocuments',
              linkText: ' Upload documents',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Optional',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/yourdocuments/alldocuments/alldocuments',
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
              href: '/applicant/yourdocuments/alldocuments/orders',
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
              href: '/applicant/responsetoca?name=First Respondent',
              id: 'theResponsePDF',
              linkText: 'Response 1 to your application',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'Not available yet',
              },
            },
            {
              disabled: true,
              hintText: null,
              href: '/applicant/responsetoca?name=Second Respondent',
              id: 'theResponsePDF',
              linkText: 'Response 2 to your application',
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
              href: '/applicant/yourhearings/hearings/12',
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
              href: '/c100-rebuild/application-copy/download',
              id: 'yourApplicationPDF',
              linkText: 'Your application (PDF)',
              openInAnotherTab: false,
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
        state: State.CASE_CLOSED,
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
              href: '/c100-rebuild/application-copy/download',
              id: 'yourApplicationPDF',
              linkText: 'Your application (PDF)',
              openInAnotherTab: false,
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
              href: '/applicant/contact-preferences/contact-preferences/12',
              id: 'contactPreferences',
              linkText: 'Contact preferences',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
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
              href: '/applicant/reasonable-adjustments/guidance',
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
              href: '/c100-rebuild/application-copy/download',
              id: 'yourApplicationPDF',
              linkText: 'Your application (PDF)',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
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
              href: '/applicant/upload-document',
              id: 'uploadDocuments',
              linkText: ' Upload documents',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Optional',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/yourdocuments/alldocuments/alldocuments',
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
              href: '/applicant/yourdocuments/alldocuments/orders',
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
              href: '/applicant/responsetoca?name=First Respondent',
              id: 'theResponsePDF',
              linkText: 'Response 1 to your application',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'Not available yet',
              },
            },
            {
              disabled: true,
              hintText: null,
              href: '/applicant/responsetoca?name=Second Respondent',
              id: 'theResponsePDF',
              linkText: 'Response 2 to your application',
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
              href: '/applicant/yourhearings/hearings/12',
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
              href: '/applicant/contact-preferences/contact-preferences/12',
              id: 'contactPreferences',
              linkText: 'Contact preferences',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
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
              href: '/applicant/reasonable-adjustments/guidance',
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
              href: '/c100-rebuild/application-copy/download',
              id: 'yourApplicationPDF',
              linkText: 'Your application (PDF)',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--turquoise',
                label: 'Submitted',
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
              href: '/applicant/upload-document',
              id: 'uploadDocuments',
              linkText: ' Upload documents',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--blue',
                label: 'Optional',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/yourdocuments/alldocuments/alldocuments',
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
              href: '/applicant/yourdocuments/alldocuments/orders',
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
              href: '/applicant/responsetoca?name=First Respondent',
              id: 'theResponsePDF',
              linkText: 'Response 1 to your application',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'Not available yet',
              },
            },
            {
              disabled: true,
              hintText: null,
              href: '/applicant/responsetoca?name=Second Respondent',
              id: 'theResponsePDF',
              linkText: 'Response 2 to your application',
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
              href: '/applicant/yourhearings/hearings/12',
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

      expect(getTaskListConfig(data, userDetails, party, language)).toStrictEqual([
        {
          heading: 'About you',
          id: 'aboutYou',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/keep-details-private/details_known/12',
              id: 'keepYourDetailsPrivate',
              linkText: 'Keep your details private',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'TO DO',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/confirm-contact-details/checkanswers/12',
              id: 'editYouContactDetails',
              linkText: 'Confirm or edit your contact details',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--green',
                label: 'Completed',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/reasonable-adjustments/guidance',
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
              href: '/applicant/public/docs/FL401-Final-Document.pdf',
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
              href: '/applicant/witnessstatements',
              id: 'yourAapplicationWitnessStatment',
              linkText: 'Witness statement (PDF)',
              openInAnotherTab: true,
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
              href: '/applicant/yourhearings/hearings/12',
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
        {
          heading: 'Your documents',
          id: 'yourDocuments',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/upload-document',
              id: 'uploadDocuments',
              linkText: ' Upload documents',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'TO DO',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/yourdocuments/alldocuments/alldocuments',
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
              href: '/applicant/yourdocuments/alldocuments/orders',
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

      expect(getTaskListConfig(data, userDetails, party, language)).toStrictEqual([
        {
          heading: 'About you',
          id: 'aboutYou',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/applicant/keep-details-private/details_known/12',
              id: 'keepYourDetailsPrivate',
              linkText: 'Keep your details private',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'TO DO',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/confirm-contact-details/checkanswers/12',
              id: 'editYouContactDetails',
              linkText: 'Confirm or edit your contact details',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--green',
                label: 'Completed',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/reasonable-adjustments/guidance',
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
              href: '/applicant/public/docs/FL401-Final-Document.pdf',
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
              href: '/applicant/witnessstatements',
              id: 'yourAapplicationWitnessStatment',
              linkText: 'Witness statement (PDF)',
              openInAnotherTab: true,
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
              href: '#',
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
              href: '/applicant/upload-document',
              id: 'uploadDocuments',
              linkText: ' Upload documents',
              openInAnotherTab: false,
              stateTag: {
                className: 'govuk-tag--grey',
                label: 'TO DO',
              },
            },
            {
              disabled: false,
              hintText: null,
              href: '/applicant/yourdocuments/alldocuments/alldocuments',
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
              href: '#',
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
              href: '/applicant/public/docs/FL401-Final-Document.pdf',
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
              href: '/applicant/witnessstatements',
              id: 'yourAapplicationWitnessStatment',
              linkText: 'Witness statement (PDF)',
              openInAnotherTab: true,
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
              href: '#',
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
              href: '/applicant/yourdocuments/alldocuments/alldocuments',
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
              href: '#',
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
        state: State.CASE_CLOSED,
        caseTypeOfApplication: 'FL401',
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
              href: '/applicant/public/docs/FL401-Final-Document.pdf',
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
              href: '/applicant/witnessstatements',
              id: 'yourAapplicationWitnessStatment',
              linkText: 'Witness statement (PDF)',
              openInAnotherTab: true,
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
              href: '#',
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
          tasks: [],
        },
        {
          heading: 'Orders from the court',
          id: 'ordersFromTheCourt',
          tasks: [
            {
              disabled: true,
              hintText: null,
              href: '#',
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
          heading: 'About you',
          id: 'aboutYou',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/respondent/keep-details-private/details_known/1234',
              id: 'keepYourDetailsPrivate',
              linkText: 'Keep your details private',
              openInAnotherTab: false,
              stateTag: { className: 'govuk-tag--grey', label: 'TO DO' },
            },
            {
              disabled: false,
              hintText: null,
              href: '/respondent/confirm-contact-details/checkanswers/1234',
              id: 'editYouContactDetails',
              linkText: 'Confirm or edit your contact details',
              openInAnotherTab: false,
              stateTag: { className: 'govuk-tag--grey', label: 'TO DO' },
            },
            {
              disabled: false,
              hintText: null,
              href: '/respondent/reasonable-adjustments/guidance',
              id: 'supportYouNeed',
              linkText: 'Support you need during your case',
              openInAnotherTab: false,
              stateTag: { className: 'govuk-tag--blue', label: 'Optional' },
            },
          ],
        },
        {
          heading: 'The application',
          id: 'theApplication',
          tasks: [
            {
              disabled: false,
              hintText: null,
              href: '/yourdocuments/alldocuments/cadafinaldocumentrequest?updateCase=Yes',
              id: 'checkTheApplication',
              linkText: 'Check the application (PDF)',
              stateTag: { className: 'govuk-tag--grey', label: 'Not available yet' },
              openInAnotherTab: true,
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
              href: '#',
              id: 'viewHearingDetails',
              linkText: 'Check details of your court hearings',
              openInAnotherTab: false,
              stateTag: { className: 'govuk-tag--grey', label: 'Not available yet' },
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
              href: '/respondent/yourdocuments/alldocuments/alldocuments',
              id: 'viewAllDocuments',
              linkText: 'View all documents',
              openInAnotherTab: false,
              stateTag: { className: 'govuk-tag--blue', label: 'Ready to view' },
            },
            {
              disabled: false,
              hintText: null,
              href: '/respondent/upload-document',
              id: 'uploadDocuments',
              linkText: 'Upload Documents',
              openInAnotherTab: false,
              stateTag: { className: 'govuk-tag--grey', label: 'TO DO' },
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
              href: '#',
              id: 'viewOrders',
              linkText: 'View all orders from the court',
              openInAnotherTab: false,
              stateTag: { className: 'govuk-tag--grey', label: 'Not available yet' },
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
              disabled: false,
              hintText: null,
              href: '/yourdocuments/alldocuments/cadafinaldocumentrequest?updateCase=Yes',
              id: 'checkTheApplication',
              linkText: 'Check the application (PDF)',
              openInAnotherTab: true,
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
              href: '#',
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
              href: '/respondent/yourdocuments/alldocuments/alldocuments',
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
              href: '#',
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
        state: State.CASE_CLOSED,
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
              href: '/yourdocuments/alldocuments/cadafinaldocumentrequest?updateCase=Yes',
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
        {
          heading: 'Your court hearings',
          id: 'yourHearing',
          tasks: [
            {
              disabled: true,
              hintText: null,
              href: '#',
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
              href: '/respondent/yourdocuments/alldocuments/alldocuments',
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
              href: '#',
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
        heading: 'About you',
        id: 'aboutYou',
        tasks: [
          {
            disabled: false,
            hintText: null,
            href: '/respondent/keep-details-private/details_known/1234',
            id: 'keepYourDetailsPrivate',
            linkText: 'Keep your details private',
            openInAnotherTab: false,
            stateTag: { className: 'govuk-tag--grey', label: 'TO DO' },
          },
          {
            disabled: false,
            hintText: null,
            href: '/respondent/confirm-contact-details/checkanswers/1234',
            id: 'editYouContactDetails',
            linkText: 'Confirm or edit your contact details',
            openInAnotherTab: false,
            stateTag: { className: 'govuk-tag--grey', label: 'TO DO' },
          },
          {
            disabled: false,
            hintText: null,
            href: '/respondent/reasonable-adjustments/guidance',
            id: 'supportYouNeed',
            linkText: 'Support you need during your case',
            openInAnotherTab: false,
            stateTag: { className: 'govuk-tag--blue', label: 'Optional' },
          },
        ],
      },
      {
        heading: 'The application',
        id: 'theApplication',
        tasks: [
          {
            disabled: false,
            hintText: null,
            href: '/yourdocuments/alldocuments/cadafinaldocumentrequest?updateCase=Yes',
            id: 'checkTheApplication',
            linkText: 'Check the application (PDF)',
            stateTag: { className: 'govuk-tag--grey', label: 'Not available yet' },
            openInAnotherTab: true,
          },
          {
            disabled: false,
            hintText: null,
            href: '#',
            id: 'checkAllegationsOfHarmAndViolence',
            linkText: 'Check the allegations of harm and violence (PDF)',
            stateTag: { className: 'govuk-tag--grey', label: 'Not available yet' },
            openInAnotherTab: true,
          },
        ],
      },
      {
        heading: 'Your response',
        id: 'yourResponse',
        tasks: [
          {
            disabled: false,
            hintText: null,
            href: '/tasklistresponse/start/flag/updateFlag',
            id: 'respondToTheApplication',
            linkText: 'Respond to the application',
            openInAnotherTab: false,
            stateTag: { className: 'govuk-tag--grey', label: 'TO DO' },
          },
          {
            disabled: false,
            hintText: null,
            href: '#',
            id: 'respondToAOHAndViolence',
            linkText: 'Respond to the allegations of harm and violence',
            openInAnotherTab: false,
            stateTag: { className: 'govuk-tag--grey', label: 'TO DO' },
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
            href: '#',
            id: 'viewHearingDetails',
            linkText: 'Check details of your court hearings',
            openInAnotherTab: false,
            stateTag: { className: 'govuk-tag--grey', label: 'Not available yet' },
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
            href: '/respondent/yourdocuments/alldocuments/alldocuments',
            id: 'viewAllDocuments',
            linkText: 'View all documents',
            openInAnotherTab: false,
            stateTag: { className: 'govuk-tag--blue', label: 'Ready to view' },
          },
          {
            disabled: false,
            hintText: null,
            href: '/respondent/upload-document',
            id: 'uploadDocuments',
            linkText: 'Upload Documents',
            openInAnotherTab: false,
            stateTag: { className: 'govuk-tag--grey', label: 'TO DO' },
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
            href: '#',
            id: 'viewOrders',
            linkText: 'View all orders from the court',
            openInAnotherTab: false,
            stateTag: { className: 'govuk-tag--grey', label: 'Not available yet' },
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
        heading: 'About you',
        id: 'aboutYou',
        tasks: [
          {
            disabled: false,
            hintText: null,
            href: '/respondent/keep-details-private/details_known/1234',
            id: 'keepYourDetailsPrivate',
            linkText: 'Keep your details private',
            openInAnotherTab: false,
            stateTag: { className: 'govuk-tag--blue', label: 'In progress' },
          },
          {
            disabled: false,
            hintText: null,
            href: '/respondent/confirm-contact-details/checkanswers/1234',
            id: 'editYouContactDetails',
            linkText: 'Confirm or edit your contact details',
            openInAnotherTab: false,
            stateTag: { className: 'govuk-tag--blue', label: 'In progress' },
          },
          {
            disabled: false,
            hintText: null,
            href: '/respondent/reasonable-adjustments/guidance',
            id: 'supportYouNeed',
            linkText: 'Support you need during your case',
            openInAnotherTab: false,
            stateTag: { className: 'govuk-tag--blue', label: 'Optional' },
          },
        ],
      },
      {
        heading: 'The application',
        id: 'theApplication',
        tasks: [
          {
            disabled: false,
            hintText: null,
            href: '/yourdocuments/alldocuments/cadafinaldocumentrequest?updateCase=Yes',
            id: 'checkTheApplication',
            linkText: 'Check the application (PDF)',
            stateTag: { className: 'govuk-tag--blue', label: 'Ready to view' },
            openInAnotherTab: true,
          },
          {
            disabled: false,
            hintText: null,
            href: '/yourdocuments/alldocuments/aohviolence?updateCase=Yes',
            id: 'checkAllegationsOfHarmAndViolence',
            linkText: 'Check the allegations of harm and violence (PDF)',
            stateTag: { className: 'govuk-tag--blue', label: 'Ready to view' },
            openInAnotherTab: true,
          },
        ],
      },
      {
        heading: 'Your response',
        id: 'yourResponse',
        tasks: [
          {
            disabled: false,
            hintText: null,
            href: '/tasklistresponse/start/flag/updateFlag',
            id: 'respondToTheApplication',
            linkText: 'Respond to the application',
            openInAnotherTab: false,
            stateTag: { className: 'govuk-tag--blue', label: 'In progress' },
          },
          {
            disabled: false,
            hintText: null,
            href: '#',
            id: 'respondToAOHAndViolence',
            linkText: 'Respond to the allegations of harm and violence',
            openInAnotherTab: false,
            stateTag: { className: 'govuk-tag--blue', label: 'In progress' },
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
            href: '/respondent/yourhearings/hearings/1234',
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
            href: '/respondent/yourdocuments/alldocuments/alldocuments',
            id: 'viewAllDocuments',
            linkText: 'View all documents',
            openInAnotherTab: false,
            stateTag: { className: 'govuk-tag--blue', label: 'Ready to view' },
          },
          {
            disabled: false,
            hintText: null,
            href: '/respondent/upload-document',
            id: 'uploadDocuments',
            linkText: 'Upload Documents',
            openInAnotherTab: false,
            stateTag: { className: 'govuk-tag--grey', label: 'TO DO' },
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
            href: '/respondent/yourdocuments/alldocuments/orders',
            id: 'viewOrders',
            linkText: 'View all orders from the court',
            openInAnotherTab: false,
            stateTag: { className: 'govuk-tag--blue', label: 'Ready to view' },
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
        heading: 'About you',
        id: 'aboutYou',
        tasks: [
          {
            disabled: false,
            hintText: null,
            href: '/respondent/keep-details-private/details_known/1234',
            id: 'keepYourDetailsPrivate',
            linkText: 'Keep your details private',
            openInAnotherTab: false,
            stateTag: { className: 'govuk-tag--green', label: 'Completed' },
          },
          {
            disabled: false,
            hintText: null,
            href: '/respondent/confirm-contact-details/checkanswers/1234',
            id: 'editYouContactDetails',
            linkText: 'Confirm or edit your contact details',
            openInAnotherTab: false,
            stateTag: { className: 'govuk-tag--blue', label: 'In progress' },
          },
          {
            disabled: false,
            hintText: null,
            href: '/respondent/reasonable-adjustments/guidance',
            id: 'supportYouNeed',
            linkText: 'Support you need during your case',
            openInAnotherTab: false,
            stateTag: { className: 'govuk-tag--blue', label: 'Optional' },
          },
        ],
      },
      {
        heading: 'The application',
        id: 'theApplication',
        tasks: [
          {
            disabled: false,
            hintText: null,
            href: '/yourdocuments/alldocuments/cadafinaldocumentrequest?updateCase=Yes',
            id: 'checkTheApplication',
            linkText: 'Check the application (PDF)',
            stateTag: { className: 'govuk-tag--dark-blue', label: 'VIEW' },
            openInAnotherTab: true,
          },
          {
            disabled: false,
            hintText: null,
            href: '/yourdocuments/alldocuments/aohviolence?updateCase=Yes',
            id: 'checkAllegationsOfHarmAndViolence',
            linkText: 'Check the allegations of harm and violence (PDF)',
            stateTag: { className: 'govuk-tag--dark-blue', label: 'VIEW' },
            openInAnotherTab: true,
          },
        ],
      },
      {
        heading: 'Your response',
        id: 'yourResponse',
        tasks: [
          {
            disabled: false,
            href: null,
            id: 'respondToTheApplication',
            hintText: 'Go to view all documents to check the response.',
            linkText: 'Respond to the application',
            openInAnotherTab: false,
            stateTag: { className: 'govuk-tag--green', label: 'Completed' },
          },
          {
            disabled: false,
            href: '#',
            id: 'respondToAOHAndViolence',
            hintText: 'Go to view all documents to check the response.',
            linkText: 'Respond to the allegations of harm and violence',
            openInAnotherTab: false,
            stateTag: { className: 'govuk-tag--green', label: 'Completed' },
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
            href: '/respondent/yourhearings/hearings/1234',
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
            href: '/respondent/yourdocuments/alldocuments/alldocuments',
            id: 'viewAllDocuments',
            linkText: 'View all documents',
            openInAnotherTab: false,
            stateTag: { className: 'govuk-tag--blue', label: 'Ready to view' },
          },
          {
            disabled: false,
            hintText: null,
            href: '/respondent/upload-document',
            id: 'uploadDocuments',
            linkText: 'Upload Documents',
            openInAnotherTab: false,
            stateTag: { className: 'govuk-tag--grey', label: 'TO DO' },
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
            href: '/respondent/yourdocuments/alldocuments/orders',
            id: 'viewOrders',
            linkText: 'View all orders from the court',
            openInAnotherTab: false,
            stateTag: { className: 'govuk-tag--blue', label: 'Ready to view' },
          },
        ],
      },
    ]);
  });

  test('should return correct task list when case is closed', () => {
    const caseData = {
      id: '1234',
      state: State.CASE_CLOSED,
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
            href: '/yourdocuments/alldocuments/cadafinaldocumentrequest?updateCase=Yes',
            id: 'checkTheApplication',
            linkText: 'Check the application (PDF)',
            stateTag: { className: 'govuk-tag--dark-blue', label: 'VIEW' },
            openInAnotherTab: true,
          },
          {
            disabled: false,
            hintText: null,
            href: '/yourdocuments/alldocuments/aohviolence?updateCase=Yes',
            id: 'checkAllegationsOfHarmAndViolence',
            linkText: 'Check the allegations of harm and violence (PDF)',
            stateTag: { className: 'govuk-tag--dark-blue', label: 'VIEW' },
            openInAnotherTab: true,
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
            href: '/respondent/yourhearings/hearings/1234',
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
            href: '/respondent/yourdocuments/alldocuments/alldocuments',
            id: 'viewAllDocuments',
            linkText: 'View all documents',
            openInAnotherTab: false,
            stateTag: { className: 'govuk-tag--blue', label: 'Ready to view' },
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
            href: '/respondent/yourdocuments/alldocuments/orders',
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
