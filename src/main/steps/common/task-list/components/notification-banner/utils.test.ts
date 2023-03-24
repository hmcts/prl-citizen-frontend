import { CaseType, PartyType, State, YesOrNo } from '../../../../../app/case/definition';

import { getNotificationBannerConfig } from './utils';
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
        heading: 'Your application is in progress (sent to local court)',
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
        heading: 'Your application is in progress (gatekeeping)',
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
          },
          {
            href: 'https://www.gov.wales/cafcass-cymru/what-we-do',
            text: 'Find out about Cafcass Cymru',
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
            text: 'You will still be able to access all documents related to this case.',
          },
        ],
        heading: 'The case is now closed.',
        id: 'applicationClosed',
        title: 'Important',
      },
    ]);
  });
});
