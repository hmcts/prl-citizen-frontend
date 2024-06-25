import { CaseWithId, CitizenNotification } from '../../../../../app/case/case';
import { CaseType, PartyType, Respondent, State, YesOrNo } from '../../../../../app/case/definition';
import { CitizenApplicationPacks } from '../../../documents/definitions';

import { getNotifications } from '.';

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
  test('when application submitted', () => {
    const data = {
      id: '12',
      state: State.CASE_SUBMITTED_NOT_PAID,
    } as unknown as CaseWithId;
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getNotifications(data, userDetails, party, language)).toStrictEqual([
      {
        heading: 'Your application is in progress',
        id: 'applicationSubmitted',
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
    const data = {} as unknown as CaseWithId;
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getNotifications(data, userDetails, party, language)).toStrictEqual([]);
  });

  test('when casetype c100 and application in progress', () => {
    const data = {
      id: '12',
      state: State.CASE_DRAFT,
      caseTypeOfApplication: CaseType.C100,
      noOfDaysRemainingToSubmitCase: '2',
    } as unknown as CaseWithId;
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getNotifications(data, userDetails, party, language)).toStrictEqual([
      {
        heading: 'You have not finished your application',
        id: 'applicationInProgress',
        sections: [
          {
            contents: [
              {
                text: 'You have 2 days to submit your application from the date you started it, or it will be deleted and you will need to start the application again. This is to keep your information secure.',
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
      },
    ]);
  });

  test('when case is withdrawn', () => {
    const data = {
      id: '12',
      state: State.CASE_WITHDRAWN,
      caseTypeOfApplication: CaseType.C100,
    } as unknown as CaseWithId;
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getNotifications(data, userDetails, party, language)).toStrictEqual([
      {
        sections: [
          {
            contents: [
              {
                text: 'You can still access all documents related to the case',
              },
            ],
            links: [],
          },
        ],
        heading: 'This case has now been withdrawn',
        id: 'applicationWithdrawn',
      },
    ]);
  });

  test('when application is being served personally by court and cafcass is served', () => {
    const data = {
      id: '12',
      state: State.CASE_SERVED,
      caseTypeOfApplication: CaseType.C100,
      applicants: applicant,
      finalServedApplicationDetailsList: [
        {
          id: '1',
          value: {
            emailNotificationDetails: [],
            whoIsResponsible: 'Court - court admin',
          },
        },
      ],
      citizenApplicationPacks: [
        {
          partyId: '123',
          wasCafcassServed: true,
          applicantSoaPack: [
            {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'positionStatements',
              document_creation_date: '01/01/2024',
            },
          ],
        },
      ] as unknown as CitizenApplicationPacks[],
      citizenNotifications: [
        {
          id: 'CAN4_SOA_PERS_NONPERS_APPLICANT',
          show: true,
          personalService: true,
        } as CitizenNotification,
      ],
    } as unknown as CaseWithId;
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getNotifications(data as unknown as CaseWithId, userDetails, party, language)).toStrictEqual([
      {
        sections: [
          {
            contents: [
              {
                text: 'This means the court has sent your application to the other people in the case (the respondents). The respondents will have a chance to reply to what you have said. The case will proceed whether or not they respond.',
              },
              {
                text: 'We will let you know when the other people in the case have been given your application and case documents.',
              },
            ],
            links: [
              {
                external: false,
                href: '/applicant/documents/view/application-pack-documents',
                text: 'View your application pack',
              },
            ],
          },
          {
            contents: [
              {
                text: '<p class="govuk-notification-banner__heading">Cafcass will contact you</p>',
              },
              {
                text: 'The Children and Family Court Advisory and Support Service (Cafcass) will contact you to consider the needs of the children.',
              },
            ],
            links: [
              {
                external: true,
                href: 'https://www.cafcass.gov.uk/grown-ups/parents-and-carers/divorce-and-separation/what-to-expect-from-cafcass/',
                text: 'Find out about Cafcass',
              },
            ],
          },
        ],
        heading: 'The court has issued your application',
        id: 'applicationServedByCourtPersonalNonPersonalService',
      },
    ]);
  });

  test('correct welsh banners when application is being served personally by court and cafcass is served', () => {
    const data = {
      id: '12',
      state: State.CASE_SERVED,
      caseTypeOfApplication: CaseType.C100,
      applicants: applicant,
      finalServedApplicationDetailsList: [
        {
          id: '1',
          value: {
            emailNotificationDetails: [],
            whoIsResponsible: 'Court - court admin',
          },
        },
      ],
      citizenApplicationPacks: [
        {
          partyId: '123',
          wasCafcassServed: true,
          applicantSoaPack: [
            {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'positionStatements',
              document_creation_date: '01/01/2024',
            },
          ],
        },
      ] as unknown as CitizenApplicationPacks[],
      citizenNotifications: [
        {
          id: 'CAN4_SOA_PERS_NONPERS_APPLICANT',
          show: true,
          personalService: true,
        } as CitizenNotification,
      ],
    } as unknown as CaseWithId;
    const party = PartyType.APPLICANT;

    expect(getNotifications(data as unknown as CaseWithId, userDetails, party, 'cy')).toStrictEqual([
      {
        sections: [
          {
            contents: [
              {
                text: "Mae hyn yn golygu y bydd y llys yn rhoi eich cais i'r bobl eraill yn yr achos (yr atebwyr). Bydd yr atebwyr yn cael cyfle i ymateb i'r hyn yr ydych wedi'i ddweud.  Bydd y cais yn symud yn ei flaen p’un a fyddant yn ymateb neu beidio.",
              },
              {
                text: "Byddwn yn rhoi gwybod i chi pan fydd y bobl eraill yn yr achos wedi cael eich cais a'ch dogfennau achos.",
              },
            ],
            links: [
              {
                external: false,
                href: '/applicant/documents/view/application-pack-documents',
                text: 'Gweld eich pecyn cais',
              },
            ],
          },
          {
            contents: [
              {
                text: '<p class="govuk-notification-banner__heading">Bydd Cafcass yn cysylltu â chi</p>',
              },
              {
                text: 'Bydd y Gwasanaeth Cynghori a Chynorthwyo Llys i Blant a Theuluoedd (Cafcass) yn cysylltu â chi i ystyried anghenion y plant.',
              },
            ],
            links: [
              {
                external: true,
                href: 'https://www.cafcass.gov.uk/grown-ups/parents-and-carers/divorce-and-separation/what-to-expect-from-cafcass/',
                text: 'Gwybodaeth am Cafcass',
              },
            ],
          },
        ],
        heading: "Mae'r llys wedi cychwyn eich cais",
        id: 'applicationServedByCourtPersonalNonPersonalService',
      },
    ]);
  });

  test('when application is being served personally by court and cafcass cymru is served', () => {
    const data = {
      id: '12',
      state: State.CASE_SERVED,
      caseTypeOfApplication: CaseType.C100,
      applicants: applicant,
      finalServedApplicationDetailsList: [
        {
          id: '1',
          value: {
            emailNotificationDetails: [],
            whoIsResponsible: 'Court - court admin',
          },
        },
      ],
      citizenApplicationPacks: [
        {
          partyId: '123',
          wasCafcassCymruServed: true,
          applicantSoaPack: [
            {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'positionStatements',
              document_creation_date: '01/01/2024',
            },
          ],
        },
      ] as unknown as CitizenApplicationPacks[],
      citizenNotifications: [
        {
          id: 'CAN4_SOA_PERS_NONPERS_APPLICANT',
          show: true,
          personalService: true,
        } as CitizenNotification,
      ],
    } as unknown as CaseWithId;
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getNotifications(data as unknown as CaseWithId, userDetails, party, language)).toStrictEqual([
      {
        sections: [
          {
            contents: [
              {
                text: 'This means the court has sent your application to the other people in the case (the respondents). The respondents will have a chance to reply to what you have said. The case will proceed whether or not they respond.',
              },
              {
                text: 'We will let you know when the other people in the case have been given your application and case documents.',
              },
            ],
            links: [
              {
                external: false,
                href: '/applicant/documents/view/application-pack-documents',
                text: 'View your application pack',
              },
            ],
          },
          {
            contents: [
              {
                text: '<p class="govuk-notification-banner__heading">Cafcass Cymru will contact you</p>',
              },
              {
                text: 'The Children and Family Court Advisory and Support Service (Cafcass Cymru) will contact you to consider the needs of the children.',
              },
            ],
            links: [
              {
                external: true,
                href: 'https://www.gov.wales/cafcass-cymru/what-we-do',
                text: 'Find out about Cafcass Cymru',
              },
            ],
          },
        ],
        heading: 'The court has issued your application',
        id: 'applicationServedByCourtPersonalNonPersonalService',
      },
    ]);
  });

  test('correct welsh banners when application is being served personally by court and cafcass cymru is served', () => {
    const data = {
      id: '12',
      state: State.CASE_SERVED,
      caseTypeOfApplication: CaseType.C100,
      applicants: applicant,
      finalServedApplicationDetailsList: [
        {
          id: '1',
          value: {
            emailNotificationDetails: [],
            whoIsResponsible: 'Court - court admin',
          },
        },
      ],
      citizenApplicationPacks: [
        {
          partyId: '123',
          wasCafcassCymruServed: true,
          applicantSoaPack: [
            {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'positionStatements',
              document_creation_date: '01/01/2024',
            },
          ],
        },
      ] as unknown as CitizenApplicationPacks[],
      citizenNotifications: [
        {
          id: 'CAN4_SOA_PERS_NONPERS_APPLICANT',
          show: true,
          personalService: true,
        } as CitizenNotification,
      ],
    } as unknown as CaseWithId;
    const party = PartyType.APPLICANT;

    expect(getNotifications(data as unknown as CaseWithId, userDetails, party, 'cy')).toStrictEqual([
      {
        sections: [
          {
            contents: [
              {
                text: "Mae hyn yn golygu y bydd y llys yn rhoi eich cais i'r bobl eraill yn yr achos (yr atebwyr). Bydd yr atebwyr yn cael cyfle i ymateb i'r hyn yr ydych wedi'i ddweud.  Bydd y cais yn symud yn ei flaen p’un a fyddant yn ymateb neu beidio.",
              },
              {
                text: "Byddwn yn rhoi gwybod i chi pan fydd y bobl eraill yn yr achos wedi cael eich cais a'ch dogfennau achos.",
              },
            ],
            links: [
              {
                external: false,
                href: '/applicant/documents/view/application-pack-documents',
                text: 'Gweld eich pecyn cais',
              },
            ],
          },
          {
            contents: [
              {
                text: '<p class="govuk-notification-banner__heading">Bydd Cafcass Cymru yn cysylltu â chi </p>',
              },
              {
                text: 'Bydd y Gwasanaeth Cynghori a Chynorthwyo Llys i Blant a Theuluoedd (Cafcass Cymru) yn cysylltu â chi i ystyried anghenion y plant.',
              },
            ],
            links: [
              {
                external: true,
                href: 'https://www.gov.wales/cafcass-cymru/what-we-do',
                text: 'Gwybodaeth am Cafcass Cymru',
              },
            ],
          },
        ],
        heading: "Mae'r llys wedi cychwyn eich cais",
        id: 'applicationServedByCourtPersonalNonPersonalService',
      },
    ]);
  });

  test('banners should be added when new and final orders added', () => {
    const data = {
      id: '12',
      state: State.CASE_SERVED,
      caseTypeOfApplication: CaseType.C100,
      applicants: applicant,
      finalServedApplicationDetailsList: [
        {
          id: '1',
          value: {
            emailNotificationDetails: [],
            whoIsResponsible: 'Court - court bailiff',
          },
        },
      ],
      citizenApplicationPacks: [
        {
          partyId: '123',
          applicantSoaPack: [
            {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'positionStatements',
              document_creation_date: '01/01/2024',
            },
          ],
        },
      ] as unknown as CitizenApplicationPacks[],
      citizenNotifications: [
        {
          id: 'CRNF2_APPLICANT_RESPONDENT',
          show: true,
          multiple: true,
          final: true,
          new: true,
        },
      ],
    } as unknown as CaseWithId;

    expect(getNotifications(data, userDetails, PartyType.APPLICANT, 'en')).toStrictEqual([
      {
        heading: 'You have new and final orders from the court',
        id: 'orderNonPersonalService',
        sections: [
          {
            contents: [
              {
                text: 'The court has made a final decision about your case. The orders tell you what the court has decided.',
              },
            ],
            links: [
              {
                external: false,
                href: '/applicant/documents/view/orders-from-the-court',
                text: 'View the orders (PDF)',
              },
            ],
          },
        ],
      },
    ]);
  });
  test('banners should be added when new and final orders added LIP personal service zero respondent', () => {
    const data = {
      id: '12',
      state: State.CASE_SERVED,
      caseTypeOfApplication: CaseType.C100,
      applicants: applicant,
      finalServedApplicationDetailsList: [
        {
          id: '1',
          value: {
            emailNotificationDetails: [],
            whoIsResponsible: 'Court - court bailiff',
          },
        },
      ],
      citizenApplicationPacks: [
        {
          partyId: '123',
          applicantSoaPack: [
            {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'positionStatements',
              document_creation_date: '01/01/2024',
            },
          ],
        },
      ] as unknown as CitizenApplicationPacks[],
      citizenNotifications: [
        {
          id: 'CRNF3_PERS_SERV_APPLICANT',
          show: true,
          multiple: true,
          final: true,
          new: true,
        },
      ],
    } as unknown as CaseWithId;

    expect(getNotifications(data, userDetails, PartyType.APPLICANT, 'en')).toStrictEqual([
      {
        heading: 'You have new and final orders from the court',
        id: 'orderPersonalService',
        sections: [
          {
            contents: [
              {
                text: 'The court has made a final decision about your case. The orders tell you what the court has decided.',
              },
              {
                text: 'You will need to arrange for the  to be served. See the orders for further details.',
              },
            ],
            links: [
              {
                external: false,
                href: '/applicant/documents/view/orders-from-the-court',
                text: 'View the orders (PDF)',
              },
            ],
          },
          {
            contents: [
              {
                text: 'If there is more than one applicant, please agree which of you will serve the orders on the .',
              },
              {
                text: 'You need to submit a statement of service after the   been given the documents.',
              },
            ],
            links: [
              {
                external: true,
                href: 'https://assets.publishing.service.gov.uk/media/601aaf95d3bf7f70b66fb558/c9-bil.pdf',
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
      },
    ]);
  });
  test('banners should be added when new and final orders added LIP personal service one respondent', () => {
    const data = {
      id: '12',
      state: State.CASE_SERVED,
      caseTypeOfApplication: CaseType.C100,
      applicants: applicant,
      finalServedApplicationDetailsList: [
        {
          id: '1',
          value: {
            emailNotificationDetails: [],
            whoIsResponsible: 'Court - court bailiff',
          },
        },
      ],
      citizenApplicationPacks: [
        {
          partyId: '123',
          applicantSoaPack: [
            {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'positionStatements',
              document_creation_date: '01/01/2024',
            },
          ],
        },
      ] as unknown as CitizenApplicationPacks[],
      citizenNotifications: [
        {
          id: 'CRNF3_PERS_SERV_APPLICANT',
          show: true,
          multiple: true,
          final: true,
          new: true,
        },
      ],
    } as unknown as CaseWithId;
    data.respondents = [
      {
        id: '123',
        value: {
          user: {
            idamId: '123',
          },
          response: {
            citizenFlags: {},
          },
        },
      } as unknown as Respondent,
    ];

    expect(getNotifications(data, userDetails, PartyType.APPLICANT, 'en')).toStrictEqual([
      {
        heading: 'You have new and final orders from the court',
        id: 'orderPersonalService',
        sections: [
          {
            contents: [
              {
                text: 'The court has made a final decision about your case. The orders tell you what the court has decided.',
              },
              {
                text: 'You will need to arrange for the respondent to be served. See the orders for further details.',
              },
            ],
            links: [
              {
                external: false,
                href: '/applicant/documents/view/orders-from-the-court',
                text: 'View the orders (PDF)',
              },
            ],
          },
          {
            contents: [
              {
                text: 'If there is more than one applicant, please agree which of you will serve the orders on the respondent.',
              },
              {
                text: 'You need to submit a statement of service after the respondent has been given the documents.',
              },
            ],
            links: [
              {
                external: true,
                href: 'https://assets.publishing.service.gov.uk/media/601aaf95d3bf7f70b66fb558/c9-bil.pdf',
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
      },
    ]);
  });
  test('banners should be added when new and final orders added LIP personal service multiple respondent', () => {
    const data = {
      id: '12',
      state: State.CASE_SERVED,
      caseTypeOfApplication: CaseType.C100,
      applicants: applicant,
      finalServedApplicationDetailsList: [
        {
          id: '1',
          value: {
            emailNotificationDetails: [],
            whoIsResponsible: 'Court - court bailiff',
          },
        },
      ],
      citizenApplicationPacks: [
        {
          partyId: '123',
          applicantSoaPack: [
            {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'positionStatements',
              document_creation_date: '01/01/2024',
            },
          ],
        },
      ] as unknown as CitizenApplicationPacks[],
      citizenNotifications: [
        {
          id: 'CRNF3_PERS_SERV_APPLICANT',
          show: true,
          multiple: true,
          final: true,
          new: true,
        },
      ],
    } as unknown as CaseWithId;
    data.respondents = [
      {
        id: '123',
        value: {
          user: {
            idamId: '123',
          },
          response: {
            citizenFlags: {},
          },
        },
      } as unknown as Respondent,
      {
        id: '1231',
        value: {
          user: {
            idamId: '1231',
          },
          response: {
            citizenFlags: {},
          },
        },
      } as unknown as Respondent,
    ];

    expect(getNotifications(data, userDetails, PartyType.APPLICANT, 'en')).toStrictEqual([
      {
        heading: 'You have new and final orders from the court',
        id: 'orderPersonalService',
        sections: [
          {
            contents: [
              {
                text: 'The court has made a final decision about your case. The orders tell you what the court has decided.',
              },
              {
                text: 'You will need to arrange for the respondents to be served. See the orders for further details.',
              },
            ],
            links: [
              {
                external: false,
                href: '/applicant/documents/view/orders-from-the-court',
                text: 'View the orders (PDF)',
              },
            ],
          },
          {
            contents: [
              {
                text: 'If there is more than one applicant, please agree which of you will serve the orders on the respondents.',
              },
              {
                text: 'You need to submit a statement of service after the respondents have been given the documents.',
              },
            ],
            links: [
              {
                external: true,
                href: 'https://assets.publishing.service.gov.uk/media/601aaf95d3bf7f70b66fb558/c9-bil.pdf',
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
      },
    ]);
  });

  test('correct welsh banners should be added when new and final orders added', () => {
    const data = {
      id: '12',
      state: State.CASE_SERVED,
      caseTypeOfApplication: CaseType.C100,
      applicants: applicant,
      finalServedApplicationDetailsList: [
        {
          id: '1',
          value: {
            emailNotificationDetails: [],
            whoIsResponsible: 'Court - court bailiff',
          },
        },
      ],
      citizenApplicationPacks: [
        {
          partyId: '123',
          applicantSoaPack: [
            {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'positionStatements',
              document_creation_date: '01/01/2024',
            },
          ],
        },
      ] as unknown as CitizenApplicationPacks[],
      citizenNotifications: [
        {
          id: 'CRNF2_APPLICANT_RESPONDENT',
          show: true,
          multiple: true,
          final: true,
          new: true,
        },
      ],
    } as unknown as CaseWithId;

    expect(getNotifications(data, userDetails, PartyType.APPLICANT, 'cy')).toStrictEqual([
      {
        heading: 'You have new (welsh) and (welsh) final (welsh) orders (welsh) from the court (welsh)',
        id: 'orderNonPersonalService',
        sections: [
          {
            contents: [
              {
                text: 'The court has made a final (welsh) decision about your case. The orders (welsh) tell (welsh) you what the court has decided. (welsh)',
              },
            ],
            links: [
              {
                external: false,
                href: '/applicant/documents/view/orders-from-the-court',
                text: 'View the orders (welsh) (PDF) (welsh)',
              },
            ],
          },
        ],
      },
    ]);
  });
  test('correct welsh banners should be added when new and final orders added LIP personal service', () => {
    const data = {
      id: '12',
      state: State.CASE_SERVED,
      caseTypeOfApplication: CaseType.C100,
      applicants: applicant,
      finalServedApplicationDetailsList: [
        {
          id: '1',
          value: {
            emailNotificationDetails: [],
            whoIsResponsible: 'Court - court bailiff',
          },
        },
      ],
      citizenApplicationPacks: [
        {
          partyId: '123',
          applicantSoaPack: [
            {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'positionStatements',
              document_creation_date: '01/01/2024',
            },
          ],
        },
      ] as unknown as CitizenApplicationPacks[],
      citizenNotifications: [
        {
          id: 'CRNF3_PERS_SERV_APPLICANT',
          show: true,
          multiple: true,
          final: true,
          new: true,
        },
      ],
    } as unknown as CaseWithId;

    expect(getNotifications(data, userDetails, PartyType.APPLICANT, 'cy')).toStrictEqual([
      {
        heading: 'You have new (welsh) and (welsh) final (welsh) orders (welsh) from the court',
        id: 'orderPersonalService',
        sections: [
          {
            contents: [
              {
                text: 'The court has made a final (welsh) decision about your case. The orders (welsh) tell (welsh) you what the court has decided.',
              },
              {
                text: 'You will need to arrange for the  to be served. See the orders (welsh) for further details.',
              },
            ],
            links: [
              {
                external: false,
                href: '/applicant/documents/view/orders-from-the-court',
                text: 'View the orders (welsh) (PDF)',
              },
            ],
          },
          {
            contents: [
              {
                text: 'If there is more than one applicant, please agree which of you will serve the orders (welsh) on the .',
              },
              {
                text: 'You need to submit a statement of service after the   been given the documents.',
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
      },
    ]);
  });

  test('when respondent has submitted their response', () => {
    const data = {
      id: '1234',
      state: State.CASE_SERVED,
      caseTypeOfApplication: CaseType.C100,
      applicants: applicant,
      respondents: [
        {
          id: '1234',
          value: {
            user: {
              idamId: '1234',
            },
            response: {
              c7ResponseSubmitted: 'Yes',
            },
          },
        },
      ],
      caseInvites: [
        {
          id: 'string',
          value: {
            partyId: '1234',
            caseInviteEmail: 'string',
            accessCode: 'string',
            invitedUserId: '1234',
            expiryDate: 'string',
            isApplicant: 'Yes',
          },
        },
      ],
      citizenDocuments: [
        {
          partyId: '1234',
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
      ],
      citizenNotifications: [
        {
          id: 'CAN6_VIEW_RESPONSE_APPLICANT',
          show: true,
        },
      ],
    } as unknown as CaseWithId;
    const party = PartyType.APPLICANT;
    const language = 'en';
    expect(getNotifications(data, userDetails, party, language)).toStrictEqual([
      {
        heading: 'View the response to your application',
        id: 'viewResponseToApplication',
        sections: [
          {
            contents: [
              {
                text: 'The respondent has responded to your application.',
              },
            ],
            links: [
              {
                external: false,
                href: '/applicant/documents/view/all-documents',
                text: 'View the response (PDF)',
              },
            ],
          },
        ],
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
      isCafcassServed: YesOrNo.YES,
      citizenApplicationPacks: [
        {
          partyId: '123',
          respondentSoaPack: [
            {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'positionStatements',
              document_creation_date: '01/01/2024',
            },
          ],
        },
      ] as unknown as CitizenApplicationPacks[],
      finalServedApplicationDetailsList: [
        {
          id: '123',
          value: {
            emailNotificationDetails: [],
            whoIsResponsible: 'Unrepresented Applicant',
          },
        },
      ],
      citizenNotifications: [
        {
          id: 'CAN7_SOA_PERSONAL_APPLICANT',
          show: true,
          multiple: false,
          final: false,
        } as CitizenNotification,
      ],
    } as unknown as CaseWithId;
    const party = PartyType.APPLICANT;
    const language = 'en';
    expect(getNotifications(data, userDetails, party, language)).toStrictEqual([
      {
        heading: 'You must give the respondent their documents',
        id: 'applicantToPersonallyServeRespondent',
        sections: [
          {
            contents: [
              {
                text: 'The court has issued your application. This means a copy of your application and other court documents are ready to give to the other people in the case (the respondents).',
              },
              {
                text: 'As there is more than one applicant, please agree who will serve the order on the respondent.',
              },
              {
                text: 'You must give the following documents to the respondent:',
              },
            ],
            links: [
              {
                external: false,
                href: '/applicant/documents/view/application-pack-documents/to-be-served?',
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
                text: '<a class="govuk-link" href="https://www.gov.uk/government/publications/form-d89-request-for-personal-service-by-a-court-bailiff">https://www.gov.uk/government/publications/form-d89-request-for-personal-service-by-a-court-bailiff</a>',
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
      },
    ]);
  });

  test('correct welsh banners when primary citizen has to serve respondent personally', () => {
    const applicantLIP = applicant[0];
    applicantLIP.value.response = { ...applicantLIP.value.response, citizenFlags: { isApplicationToBeServed: 'Yes' } };
    const data = {
      id: '12',
      state: State.CASE_SERVED,
      caseTypeOfApplication: CaseType.C100,
      applicants: [applicantLIP, applicant[1]],
      isCafcassServed: YesOrNo.YES,
      citizenApplicationPacks: [
        {
          partyId: '123',
          respondentSoaPack: [
            {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'positionStatements',
              document_creation_date: '01/01/2024',
            },
          ],
        },
      ] as unknown as CitizenApplicationPacks[],
      finalServedApplicationDetailsList: [
        {
          id: '123',
          value: {
            emailNotificationDetails: [],
            whoIsResponsible: 'Unrepresented Applicant',
          },
        },
      ],
      citizenNotifications: [
        {
          id: 'CAN7_SOA_PERSONAL_APPLICANT',
          show: true,
          multiple: false,
          final: false,
        } as CitizenNotification,
      ],
    } as unknown as CaseWithId;
    const party = PartyType.APPLICANT;
    expect(getNotifications(data, userDetails, party, 'cy')).toStrictEqual([
      {
        heading: "Mae'n rhaid i chi roi'r dogfennau i'r atebydd",
        id: 'applicantToPersonallyServeRespondent',
        sections: [
          {
            contents: [
              {
                text: 'Mae’r llys wedi cychwyn eich cais. Mae hyn yn golygu bod copi o’ch cais a’r dogfennau llys eraill yn barod i’w rhoi i’r bobl eraill yn yr achos (yr atebwyr).',
              },
              {
                text: 'As there is more than one applicant, please agree who will serve the order on the respondent. - welsh',
              },
              {
                text: 'Mae’n rhaid i chi roi’r dogfennau canlynol i’r atebydd:',
              },
            ],
            links: [
              {
                external: false,
                href: '/applicant/documents/view/application-pack-documents/to-be-served?',
                text: 'Gweld dogfennau’r atebydd',
              },
            ],
          },
          {
            contents: [
              {
                text: 'Gallwch roi’r dogfennau i’r atebydd neu ddewis unigolyn sydd wedi cytuno i’w rhoi i’r atebydd. Gall hyn fod yn rhywun rydych chi’n ei adnabod neu’n drydydd parti proffesiynol (fel gweinydd proses neu feili’r llys). Mae mwy o wybodaeth am feili’r llys ar gael ar GOV.UK.',
              },
              {
                text: '<a class="govuk-link" href="https://www.gov.uk/government/publications/form-d89-request-for-personal-service-by-a-court-bailiff">https://www.gov.uk/government/publications/form-d89-request-for-personal-service-by-a-court-bailiff</a>',
              },
              {
                text: '<br/><p class="govuk-notification-banner__heading">Dywedwch wrthym unwaith y bydd yr atebydd wedi cael y dogfennau</p>',
              },
              {
                text: "Mae angen i chi gyflwyno datganiad cyflwyno ar ôl i'r atebydd gael y dogfennau.",
              },
            ],
            links: [
              {
                external: true,
                href: 'https://assets.publishing.service.gov.uk/media/601aaf95d3bf7f70b66fb558/c9-bil.pdf',
                text: 'Lawrlwythwch y datganiad cyflwyno (ffurflen C9) (agor mewn tab newydd)',
              },
              {
                external: false,
                href: '',
                text: 'Llwytho’r datganiad cyflwyno (ffurflen C9)',
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
      citizenApplicationPacks: [
        {
          partyId: '123',
          applicantSoaPack: [
            {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'positionStatements',
              document_creation_date: '01/01/2024',
            },
          ],
        },
      ] as unknown as CitizenApplicationPacks[],
      finalServedApplicationDetailsList: [
        {
          id: '123',
          value: {
            emailNotificationDetails: [
              {
                id: '123',
                value: {
                  servedParty: 'Cafcass cymru',
                },
              },
            ],
            whoIsResponsible: 'Court',
          },
        },
      ],
      citizenNotifications: [
        {
          id: 'CAN9_SOA_PERSONAL_APPLICANT',
          show: true,
        },
      ],
    } as unknown as CaseWithId;
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getNotifications(data, { ...userDetails, id: '1234' }, party, language)).toStrictEqual([
      {
        heading: 'The court has issued your application',
        id: 'applicationIssuedByCourtPersonalService',
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
                href: '/applicant/documents/view/application-pack-documents',
                text: 'View your application pack',
              },
            ],
          },
        ],
      },
    ]);
  });

  test('when case is closed', () => {
    const data = {
      id: '12',
      state: State.ALL_FINAL_ORDERS_ISSUED,
    } as unknown as CaseWithId;
    const party = PartyType.APPLICANT;
    const language = 'en';
    expect(getNotifications(data, userDetails, party, language)).toStrictEqual([
      {
        sections: [
          {
            contents: [
              {
                text: 'Your case is closed. The court has made a final decision about your case. The order tells you what the court has decided.',
              },
            ],
            links: [],
          },
        ],
        heading: 'You have a final order',
        id: 'applicationClosed',
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

    test('correct banners should be added when new order added', () => {
      data.respondents = [
        {
          id: '123',
          value: {
            user: {
              idamId: '123',
            },
            response: {
              citizenFlags: {},
            },
          },
        } as unknown as Respondent,
      ];
      data.state = State.Draft;
      data.caseTypeOfApplication = 'C100';
      data.citizenNotifications = [
        {
          id: 'CRNF2_APPLICANT_RESPONDENT',
          show: true,
          multiple: false,
          final: false,
        } as CitizenNotification,
      ];
      expect(getNotifications(data, userDetails, PartyType.RESPONDENT, 'en')).toStrictEqual([
        {
          heading: 'You have a new order from the court',
          id: 'orderNonPersonalService',
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
                  href: '/respondent/documents/view/orders-from-the-court',
                  text: 'View the order (PDF)',
                },
              ],
            },
          ],
        },
      ]);
    });

    test('correct welsh banners should be added when new order added', () => {
      data.respondents = [
        {
          id: '123',
          value: {
            user: {
              idamId: '123',
            },
            response: {
              citizenFlags: {},
            },
          },
        } as unknown as Respondent,
      ];
      data.state = State.Draft;
      data.caseTypeOfApplication = 'C100';
      data.citizenNotifications = [
        {
          id: 'CRNF2_APPLICANT_RESPONDENT',
          show: true,
          multiple: false,
          final: false,
        } as CitizenNotification,
      ];
      expect(getNotifications(data, userDetails, PartyType.RESPONDENT, 'cy')).toStrictEqual([
        {
          heading: 'You have a (welsh) new (welsh) order (welsh) from the court (welsh)',
          id: 'orderNonPersonalService',
          sections: [
            {
              contents: [
                {
                  text: 'The court has made a decision about your case. The order (welsh) tells (welsh) you what the court has decided. (welsh)',
                },
              ],
              links: [
                {
                  external: false,
                  href: '/respondent/documents/view/orders-from-the-court',
                  text: 'View the order (welsh)(PDF) (welsh)',
                },
              ],
            },
          ],
        },
      ]);
    });

    test('banners should be added when multiple new orders added', () => {
      data.respondents = [
        {
          id: '123',
          value: {
            user: {
              idamId: '123',
            },
            response: {
              citizenFlags: {},
            },
          },
        } as unknown as Respondent,
      ];
      data.caseTypeOfApplication = 'C100';
      data.state = State.Draft;
      data.citizenNotifications = [
        {
          id: 'CRNF2_APPLICANT_RESPONDENT',
          show: true,
          multiple: true,
          final: false,
        } as CitizenNotification,
      ];
      expect(getNotifications(data, userDetails, PartyType.RESPONDENT, 'en')).toStrictEqual([
        {
          heading: 'You have new orders from the court',
          id: 'orderNonPersonalService',
          sections: [
            {
              contents: [
                {
                  text: 'The court has made a decision about your case. The orders tell you what the court has decided.',
                },
              ],
              links: [
                {
                  external: false,
                  href: '/respondent/documents/view/orders-from-the-court',
                  text: 'View the orders (PDF)',
                },
              ],
            },
          ],
        },
      ]);
    });

    test('correct welsh banners should be added when multiple new orders added', () => {
      data.respondents = [
        {
          id: '123',
          value: {
            user: {
              idamId: '123',
            },
            response: {
              citizenFlags: {},
            },
          },
        } as unknown as Respondent,
      ];
      data.caseTypeOfApplication = 'C100';
      data.state = State.Draft;
      data.citizenNotifications = [
        {
          id: 'CRNF2_APPLICANT_RESPONDENT',
          show: true,
          multiple: true,
          final: false,
        } as CitizenNotification,
      ];
      expect(getNotifications(data, userDetails, PartyType.RESPONDENT, 'cy')).toStrictEqual([
        {
          heading: 'You have new (welsh) orders (welsh) from the court (welsh)',
          id: 'orderNonPersonalService',
          sections: [
            {
              contents: [
                {
                  text: 'The court has made a decision about your case. The orders (welsh) tell (welsh) you what the court has decided. (welsh)',
                },
              ],
              links: [
                {
                  external: false,
                  href: '/respondent/documents/view/orders-from-the-court',
                  text: 'View the orders (welsh)(PDF) (welsh)',
                },
              ],
            },
          ],
        },
      ]);
    });

    test('correct banners should be added when respondent has been served', () => {
      data.respondents = [
        {
          id: '123',
          value: {
            user: {
              email: 'abc',
              idamId: '123',
            },
            response: {
              citizenFlags: {},
            },
          },
        } as unknown as Respondent,
      ];
      data.citizenApplicationPacks = [
        {
          partyId: '123',
          respondentSoaPack: [
            {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'positionStatements',
              document_creation_date: '01/01/2024',
            },
          ],
        },
      ] as unknown as CitizenApplicationPacks[];
      data.state = State.Draft;
      data.citizenNotifications = [
        {
          id: 'CAN5_SOA_RESPONDENT',
          show: true,
        } as CitizenNotification,
      ];
      data.caseTypeOfApplication = 'C100';
      expect(getNotifications(data, userDetails, PartyType.RESPONDENT, 'en')).toStrictEqual([
        {
          heading: 'Respond to an application about a child',
          id: 'applicationServedByCourtToRespondent',
          sections: [
            {
              contents: [
                { text: 'Another person (the applicant) has applied to the court to make a decision about a child.' },
                {
                  text: 'You should respond within 14 days of receiving the application unless the court has asked you to respond sooner.',
                },
              ],
              links: [
                {
                  external: false,
                  href: '/respondent/documents/view/application-pack-documents',
                  text: 'View the application pack',
                },
                {
                  external: false,
                  href: '/tasklistresponse/start',
                  text: 'Respond to the application',
                },
              ],
            },
            { contents: [], links: [] },
          ],
        },
      ]);
    });

    test('correct welsh banners should be added when respondent has been served', () => {
      data.respondents = [
        {
          id: '123',
          value: {
            user: {
              email: 'abc',
              idamId: '123',
            },
            response: {
              citizenFlags: {},
            },
          },
        } as unknown as Respondent,
      ];
      data.citizenApplicationPacks = [
        {
          partyId: '123',
          respondentSoaPack: [
            {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'positionStatements',
              document_creation_date: '01/01/2024',
            },
          ],
        },
      ] as unknown as CitizenApplicationPacks[];
      data.state = State.Draft;
      data.citizenNotifications = [
        {
          id: 'CAN5_SOA_RESPONDENT',
          show: true,
        } as CitizenNotification,
      ];
      data.caseTypeOfApplication = 'C100';
      expect(getNotifications(data, userDetails, PartyType.RESPONDENT, 'cy')).toStrictEqual([
        {
          heading: 'Ymateb i gais ynghylch plentyn',
          id: 'applicationServedByCourtToRespondent',
          sections: [
            {
              contents: [
                { text: 'Mae person arall (y ceisydd) wedi gwneud cais i’r llys wneud penderfyniad ynghylch plentyn.' },
                {
                  text: 'Dylech ymateb o fewn 14 diwrnod o dderbyn y cais oni bai bod y llys wedi gofyn i chi ymateb yn gynt.',
                },
              ],
              links: [
                {
                  external: false,
                  href: '/respondent/documents/view/application-pack-documents',
                  text: 'Gweld y cais',
                },
                {
                  external: false,
                  href: '/tasklistresponse/start',
                  text: "Ymateb i'r cais",
                },
              ],
            },
            { contents: [], links: [] },
          ],
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
              citizenFlags: {},
            },
          },
        } as unknown as Respondent,
      ];
      data.state = State.ALL_FINAL_ORDERS_ISSUED;
      data.citizenNotifications = [
        {
          id: 'CRNF2_APPLICANT_RESPONDENT',
          show: true,
          multiple: false,
          final: true,
        } as CitizenNotification,
      ];
      expect(getNotifications(data, userDetails, PartyType.RESPONDENT, 'en')).toStrictEqual([
        {
          heading: 'You have a final order from the court',
          id: 'orderNonPersonalService',
          sections: [
            {
              contents: [
                {
                  text: 'The court has made a final decision about your case. The order tells you what the court has decided.',
                },
              ],
              links: [
                {
                  external: false,
                  href: '/respondent/documents/view/orders-from-the-court',
                  text: 'View the order (PDF)',
                },
              ],
            },
          ],
        },
      ]);
    });
  });
});
