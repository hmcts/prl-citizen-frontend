import { CaseType, PartyType, State } from '../../../../../app/case/definition';

import { getTaskListConfig } from './utils';

describe('testcase for tasklist', () => {
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
  test('when case state is draft', () => {
    const data = {
      id: '12',
      state: State.CASE_DRAFT,
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
            href: undefined,
            id: 'childArrangementApplication',
            linkText: 'Your child arrangements application',
            stateTag: {
              className: 'govuk-tag--yellow',
              label: 'In progress',
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
        heading: 'Your documents',
        id: 'yourDocuments',
        tasks: [
          {
            disabled: false,
            href: '/applicant/yourdocuments/alldocuments/alldocuments',
            id: 'viewAllDocuments',
            linkText: 'View all documents',
            stateTag: {
              className: 'govuk-tag--blue',
              label: 'Ready to view',
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
          next: {
            courtName: 'Swansea',
          },
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
            href: '/applicant/confirm-contact-details/checkanswers/12',
            id: 'editYouContactDetails',
            linkText: 'Confirm or edit your contact details',
            stateTag: {
              className: 'govuk-tag--turquoise',
              label: 'Submitted',
            },
          },
          {
            disabled: false,
            href: '/applicant/contact-preferences/contact-preferences/12',
            id: 'contactPreferences',
            linkText: 'Contact preferences',
            stateTag: {
              className: 'govuk-tag--turquoise',
              label: 'Submitted',
            },
          },
          {
            disabled: false,
            href: '/applicant/keep-details-private/details_known/12',
            id: 'keepYourDetailsPrivate',
            linkText: 'Keep your details private',
            stateTag: {
              className: 'govuk-tag--turquoise',
              label: 'Submitted',
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
            href: '/applicant/yourdocuments/alldocuments/orders',
            id: 'viewOrders',
            linkText: 'View all orders from the court',
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
            href: '/applicant/yourhearings/hearings',
            id: 'viewHearingDetails',
            linkText: 'Check details of your court hearings',
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
            href: '/applicant/confirm-contact-details/checkanswers/12',
            id: 'editYouContactDetails',
            linkText: 'Confirm or edit your contact details',
            stateTag: {
              className: 'govuk-tag--turquoise',
              label: 'Submitted',
            },
          },
          {
            disabled: false,
            href: '/applicant/contact-preferences/contact-preferences/12',
            id: 'contactPreferences',
            linkText: 'Contact preferences',
            stateTag: {
              className: 'govuk-tag--turquoise',
              label: 'Submitted',
            },
          },
          {
            disabled: false,
            href: '/applicant/keep-details-private/details_known/12',
            id: 'keepYourDetailsPrivate',
            linkText: 'Keep your details private',
            stateTag: {
              className: 'govuk-tag--turquoise',
              label: 'Submitted',
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
            href: undefined,
            id: 'viewOrders',
            linkText: 'View all orders from the court',
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
            href: undefined,
            id: 'viewHearingDetails',
            linkText: 'Check details of your court hearings',
            stateTag: {
              className: 'govuk-tag--grey',
              label: 'Not available yet',
            },
          },
        ],
      },

    ]);
  });
  test('FL401 Applicant', () => {
    const data = {
      id: '12',
      state: State.CASE_DRAFT,
      caseTypeOfApplication: CaseType.FL401,
    };
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getTaskListConfig(data, userDetails, party, language)).toStrictEqual([]);
  });
  test('FL401 respondent', () => {
    const data = {
      id: '12',
      state: State.CASE_DRAFT,
      caseTypeOfApplication: CaseType.FL401,
    };
    const party = PartyType.RESPONDENT;
    const language = 'en';

    expect(getTaskListConfig(data, userDetails, party, language)).toStrictEqual([]);
  });
});
