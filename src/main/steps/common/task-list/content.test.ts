import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { PartyType, State, YesOrNo } from '../../../app/case/definition';
import { CommonContent } from '../common.content';
import { generateContent } from '../task-list/content';

describe('testcase for tasklist', () => {
  const en = {
    caseNumber: 'Case number ',
    hyperlinks: [
      {
        label: 'Know more about child arrangements',
        link: 'https://helpwithchildarrangements.service.justice.gov.uk/',
        target: '_blank',
      },
      {
        label: 'Know more about attending court',
        link: 'https://helpwithchildarrangements.service.justice.gov.uk/going-to-court',
        target: '_blank',
      },
      {
        label: 'Understand what a Mediation Information & Assessment Meeting (MIAM) is',
        link: 'https://www.familymediationcouncil.org.uk/family-mediation/assessment-meeting-miam/',
        target: '_blank',
      },
      {
        label: 'Check if I am eligible for Legal Aid',
        link: 'https://www.gov.uk/check-legal-aid',
        target: '_blank',
      },
      {
        label: 'Check if I am eligible for Help with Fees',
        link: 'https://www.gov.uk/get-help-with-court-fees',
        target: '_blank',
      },
      {
        label: 'Find out about The Family Mediation Voucher scheme',
        link: 'https://www.gov.uk/guidance/family-mediation-voucher-scheme',
        target: '_blank',
      },
      {
        label: 'Find legal advice',
        link: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
        target: '_blank',
      },
      {
        label: 'Read how to represent myself in court',
        link: 'https://www.gov.uk/represent-yourself-in-court',
        target: '_blank',
      },
    ],
    iWantTo: 'I want to...',
    notifications: [
      {
        heading: 'You have not finished your application',
        id: 'applicationInProgress',
        sections: [
          {
            contents: [
              {
                text: 'You have  days to submit your application from the date you started it, or it will be deleted and you will need to start the application again. This is to keep your information secure.',
              },
              {
                text: 'You can review all your answers before you submit your application.',
              },
            ],
            links: [
              {
                external: false,
                href: '#',
                text: 'Continue your application',
              },
            ],
          },
        ],
      },
    ],
    partyName: 'undefined undefined',
    progressBar: [
      {
        ariaLabel: 'Application submitted stage is not yet started',
        label: 'Application<br/> submitted',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Cafcass child safety checks stage is not yet started',
        label: 'Cafcass child<br/> safety checks',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Response submitted stage is not yet started',
        label: 'Response<br/> submitted',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Hearings and court orders stage is not yet started',
        label: 'Hearings and<br/> court orders',
        statusBarClassName: '',
      },
      { ariaLabel: 'Case closed stage is not yet started', label: 'Case closed', statusBarClassName: '' },
    ],
    taskLists: [
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
            stateTag: { className: 'govuk-tag--yellow', label: 'In progress' },
          },
        ],
      },
    ],
    title: 'Child arrangements and family injunction cases',
    addLegalRepresentative: 'Add a legal representative',
    removeLegalRepresentative: 'Remove a legal representative',
  };
  const cy = {
    title: 'Trefniadau plant a gwaharddebau teulu',
    caseNumber: 'Rhif yr achos ',
    iWantTo: 'Rwyf eisiau...',
    hyperlinks: [
      {
        label: 'Gwybod mwy am drefniadau plant',
        link: 'https://helpwithchildarrangements.service.justice.gov.uk/',
        target: '_blank',
      },
      {
        label: 'Gwybod mwy am fynychu’r llys',
        link: 'https://helpwithchildarrangements.service.justice.gov.uk/going-to-court',
        target: '_blank',
      },
      {
        label: 'Deall beth yw Cyfarfod Asesu a Gwybodaeth am Gyfryngu (MIAM)',
        link: 'https://www.familymediationcouncil.org.uk/family-mediation/assessment-meeting-miam/',
        target: '_blank',
      },
      {
        label: 'Gwirio os wyf yn gymwys i gael Cymorth Cyfreithiol',
        link: 'https://www.gov.uk/check-legal-aid',
        target: '_blank',
      },
      {
        label: 'Gwirio os wyf yn gymwys i gael Help i Dalu Ffioedd',
        link: 'https://www.gov.uk/get-help-with-court-fees',
        target: '_blank',
      },
      {
        label: 'Rhagor o wybodaeth am y Cynllun Talebau Cyfryngu Teuluol',
        link: 'https://www.gov.uk/guidance/family-mediation-voucher-scheme',
        target: '_blank',
      },
      {
        label: 'Dod o hyd i gyngor cyfreithiol',
        link: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
        target: '_blank',
      },
      {
        label: 'Darllen mwy am sut i gynrychioli fy hun yn y llys',
        link: 'https://www.gov.uk/represent-yourself-in-court',
        target: '_blank',
      },
    ],
    notifications: [
      {
        heading: 'Nid ydych wedi gorffen eich cais',
        id: 'applicationInProgress',
        sections: [
          {
            contents: [
              {
                text: 'You have  days to submit your application from the date you started it, or it will be deleted and you will need to start the application again. This is to keep your information secure. -welsh',
              },
              {
                text: 'You can review all your answers before you submit your application.-welsh',
              },
            ],
            links: [
              {
                external: false,
                href: '#',
                text: 'Parhau gyda’ch cais',
              },
            ],
          },
        ],
      },
    ],
    partyName: 'undefined undefined',
    progressBar: [
      {
        ariaLabel: 'Cam cais wedi’i gyflwyno heb ddechrau eto',
        label: "Cais wedi'i<br/> gyflwyno",
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Cam gwiriadau diogelwch plant Cafcass heb ddechrau eto',
        label: 'Gwiriadau diogelwch<br/> plant Cafcass',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Cam ymateb wedi’i gyflwyno heb ddechrau eto',
        label: "Ymateb wedi'i<br/> gyflwyno",
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Cam gwrandawiadau a gorchmynion llys heb ddechrau eto',
        label: 'Gwrandawiadau <br/>a<br/> gorchmynion llys',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Cam achos wedi’i gau heb ddechrau eto',
        label: 'Achos wedi’i <br/>gau',
        statusBarClassName: '',
      },
    ],
    taskLists: [
      {
        heading: 'Eich cais',
        id: 'yourApplication',
        tasks: [
          {
            disabled: false,
            hintText: null,
            href: undefined,
            id: 'childArrangementApplication',
            linkText: 'Eich cais trefniadau plant',
            openInAnotherTab: false,
            stateTag: { className: 'govuk-tag--yellow', label: 'Ar y gweill' },
          },
        ],
      },
    ],
    addLegalRepresentative: 'Ychwanegu cynrychiolydd cyfreithiol',
    removeLegalRepresentative: 'Dileu cynrychiolydd cyfreithiol',
  };
  const commonContent = {
    language: 'en',
    userCase: {
      ...mockUserCase,
      state: State.CASE_DRAFT,
    },
    additionalData: {
      req: {
        session: {
          enableCaseTrainTrack: true,
          user: { id: '1234' },
          userCase: {
            ...mockUserCase,
            caseTypeOfApplication: 'C100',
            state: State.CASE_DRAFT,
          },
        },
        params: {
          partyType: PartyType.APPLICANT,
        },
        state: State.CASE_DRAFT,
      },
    },
  } as unknown as CommonContent;
  test('should return correct sidebar hyperlinks for c100 applicant', () => {
    const commonContent1 = {
      language: 'en',
      user: { id: '1234' },
      userCase: {
        ...mockUserCase,
        state: State.CASE_HEARING,
        applicants: [
          {
            id: '1234',
            value: {
              firstName: 'testuser',
              lastName: 'citizen',
              email: 'abc@example.net',
              dateOfBirth: '03-20-2023',
              phoneNumber: '7755664466',
              placeOfBirth: 'BPP',
              previousName: 'test',
              isAtAddressLessThan5Years: 'No',
              addressLivedLessThan5YearsDetails: 'Hello',
              address: {
                AddressLine1: 'string',
                AddressLine2: 'string',
                AddressLine3: 'string',
                PostTown: 'string',
                County: 'string',
                PostCode: 'string',
                Country: 'string',
              },
              user: {
                idamId: '1234',
                email: 'test@example.net',
              },
              response: {
                legalRepresentation: 'No',
              },
            },
          },
        ],
      },
      additionalData: {
        req: {
          session: {
            enableCaseTrainTrack: true,
            user: { id: '1234' },
            userCase: {
              ...mockUserCase,
              caseTypeOfApplication: 'C100',
              state: State.CASE_HEARING,
              applicants: [
                {
                  id: '1234',
                  value: {
                    firstName: 'testuser',
                    lastName: 'citizen',
                    email: 'abc@example.net',
                    dateOfBirth: '03-20-2023',
                    phoneNumber: '7755664466',
                    placeOfBirth: 'BPP',
                    previousName: 'test',
                    isAtAddressLessThan5Years: 'No',
                    addressLivedLessThan5YearsDetails: 'Hello',
                    address: {
                      AddressLine1: 'string',
                      AddressLine2: 'string',
                      AddressLine3: 'string',
                      PostTown: 'string',
                      County: 'string',
                      PostCode: 'string',
                      Country: 'string',
                    },
                    user: {
                      idamId: '1234',
                      email: 'test@example.net',
                    },
                    response: {
                      legalRepresentation: 'No',
                    },
                  },
                },
              ],
            },
          },
          params: {
            partyType: PartyType.APPLICANT,
          },
          state: State.CASE_HEARING,
        },
      },
    } as unknown as CommonContent;
    expect(generateContent(commonContent1).hyperlinks).toStrictEqual([
      {
        label: 'What to expect coming to a court or tribunal - GOV.UK (www.gov.uk)',
        link: 'https://www.gov.uk/guidance/what-to-expect-coming-to-a-court-or-tribunal',
        target: '_blank',
      },
      {
        label: 'Add a legal representative',
        link: '/applicant/add-legal-representative',
        target: '',
      },
      {
        label: 'Know more about child arrangements',
        link: 'https://helpwithchildarrangements.service.justice.gov.uk/',
        target: '_blank',
      },
      {
        label: 'Know more about attending court',
        link: 'https://helpwithchildarrangements.service.justice.gov.uk/going-to-court',
        target: '_blank',
      },
      {
        label: 'Understand what a Mediation Information & Assessment Meeting (MIAM) is',
        link: 'https://www.familymediationcouncil.org.uk/family-mediation/assessment-meeting-miam/',
        target: '_blank',
      },
      {
        label: 'Check if I am eligible for Legal Aid',
        link: 'https://www.gov.uk/check-legal-aid',
        target: '_blank',
      },
      {
        label: 'Check if I am eligible for Help with Fees',
        link: 'https://www.gov.uk/get-help-with-court-fees',
        target: '_blank',
      },
      {
        label: 'Find out about The Family Mediation Voucher scheme',
        link: 'https://www.gov.uk/guidance/family-mediation-voucher-scheme',
        target: '_blank',
      },
      {
        label: 'Find legal advice',
        link: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
        target: '_blank',
      },
      {
        label: 'Read how to represent myself in court',
        link: 'https://www.gov.uk/represent-yourself-in-court',
        target: '_blank',
      },
    ]);
  });
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should return correct sidebar hyperlinks for FL401 applicant', () => {
    commonContent.additionalData!.req.session.userCase.caseTypeOfApplication = 'FL401';
    commonContent.additionalData!.req.session.userCase.applicantsFL401 = {
      ...commonContent.additionalData!.req.session.userCase.applicantsFL401,
      user: {
        idamId: '1234',
      },
    };
    expect(generateContent(commonContent).hyperlinks).toStrictEqual([
      {
        label: 'What to expect coming to a court or tribunal - GOV.UK (www.gov.uk)',
        link: 'https://www.gov.uk/guidance/what-to-expect-coming-to-a-court-or-tribunal',
        target: '_blank',
      },
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
    ]);
  });

  test('should return correct sidebar hyperlinks for c100 respondent', () => {
    commonContent.additionalData!.req.session.userCase.caseTypeOfApplication = 'C100';
    commonContent.additionalData!.req = {
      ...commonContent.additionalData?.req,
      params: { partyType: 'respondent' },
      session: {
        ...commonContent.additionalData?.req.session,
        user: {
          id: '1234',
        },
        userCase: {
          ...commonContent.additionalData?.req.session.userCase,
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
                address: {
                  AddressLine1: 'string',
                  AddressLine2: 'string',
                  PostTown: 'string',
                  County: 'string',
                  PostCode: 'string',
                },
                email: 'dummy',
                phoneNumber: 'dummy',
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
        },
      },
    };
    expect(generateContent(commonContent).hyperlinks).toStrictEqual([
      {
        label: 'What to expect coming to a court or tribunal - GOV.UK (www.gov.uk)',
        link: 'https://www.gov.uk/guidance/what-to-expect-coming-to-a-court-or-tribunal',
        target: '_blank',
      },
      {
        label: 'Add a legal representative',
        link: '/respondent/add-legal-representative',
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
    ]);
  });

  test('should return correct sidebar hyperlinks for FL401 respondent', () => {
    commonContent.additionalData!.req = {
      ...commonContent.additionalData?.req,
      params: { partyType: 'respondent' },
    };
    commonContent.additionalData!.req.session.userCase.caseTypeOfApplication = 'FL401';
    commonContent.additionalData!.req.session.userCase.respondentsFL401 = {
      user: {
        idamId: '1234',
      },
      address: {
        AddressLine1: 'string',
        AddressLine2: 'string',
        PostTown: 'string',
        County: 'string',
        PostCode: 'string',
      },
      email: 'dummy',
      phoneNumber: 'dummy',
      response: {
        citizenFlags: {
          isAllegationOfHarmViewed: 'Yes',
        },
      },
    };
    (commonContent.additionalData!.req.session.userCase.caseInvites = [
      {
        value: {
          partyId: '1234',
          invitedUserId: '1234',
          isApplicant: YesOrNo.NO,
        },
      },
    ]),
      expect(generateContent(commonContent).hyperlinks).toStrictEqual([
        {
          label: 'What to expect coming to a court or tribunal - GOV.UK (www.gov.uk)',
          link: 'https://www.gov.uk/guidance/what-to-expect-coming-to-a-court-or-tribunal',
          target: '_blank',
        },
        {
          label: 'Add a legal representative',
          link: '/respondent/add-legal-representative',
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
      ]);
  });
});
