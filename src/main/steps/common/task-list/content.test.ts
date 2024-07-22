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
        label: 'Check if I am eligible for Legal Aid',
        link: 'https://www.gov.uk/check-legal-aid',
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
      {
        label: 'Find information about my court',
        link: 'https://www.gov.uk/find-court-tribunal',
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
                text: 'You have caseData.noOfDaysRemainingToSubmitCase days to submit your application or it will be deleted and you will need to start again. This is for security reasons.',
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
        title: 'Important',
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
        label: 'Gwirio os wyf yn gymwys i gael Cymorth Cyfreithiol',
        link: 'https://www.gov.uk/check-legal-aid',
        target: '_blank',
      },
      {
        label: 'Deall beth yw Cyfarfod Asesu a Gwybodaeth am Gyfryngu (MIAM)',
        link: 'https://www.familymediationcouncil.org.uk/family-mediation/assessment-meeting-miam/',
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
      {
        label: 'Find information about my court (in welsh)',
        link: 'https://www.gov.uk/find-court-tribunal',
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
                text: 'Mae gennych caseData.noOfDaysRemainingToSubmitCase diwrnod i gyflwyno eich cais o’r dyddiad y gwnaethoch ei gychwyn, neu bydd yn cael ei ddileu a bydd rhaid i chi gychwyn y cais eto. Mae hyn er mwyn cadw eich gwybodaeth yn ddiogel.',
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
        title: 'Pwysig',
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
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should return correct sidebar hyperlinks for c100 applicant', () => {
    expect(generateContent(commonContent).hyperlinks).toStrictEqual([
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
        label: 'Check if I am eligible for Legal Aid',
        link: 'https://www.gov.uk/check-legal-aid',
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
      {
        label: 'Find information about my court',
        link: 'https://www.gov.uk/find-court-tribunal',
        target: '_blank',
      },
    ]);
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
        label: 'Add a legal representative',
        link: '/applicant/add-legal-representative',
        target: '_blank',
      },
      {
        label: 'Make an application about your case',
        link: 'https://www.gov.uk/injunction-domestic-violence',
        target: '_blank',
      },
      {
        label: 'Know more about domestic abuse',
        link: 'https://www.gov.uk/injunction-domestic-violence',
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
      {
        label: 'Find information about my court',
        link: 'https://www.gov.uk/find-court-tribunal',
        target: '_blank',
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
        label: 'Check if I am eligible for Legal Aid',
        link: 'https://www.gov.uk/check-legal-aid',
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
      {
        label: 'Find information about my court',
        link: 'https://www.gov.uk/find-court-tribunal',
        target: '_blank',
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
          label: 'Add a legal representative',
          link: '/respondent/add-legal-representative',
          target: '_blank',
        },
        {
          label: 'Make an application about your case',
          link: 'https://www.gov.uk/injunction-domestic-violence',
          target: '_blank',
        },
        {
          label: 'Know more about domestic abuse',
          link: 'https://www.gov.uk/injunction-domestic-violence',
          target: '_blank',
        },
        {
          label: 'Know more about attending court',
          link: 'https://helpwithchildarrangements.service.justice.gov.uk/going-to-court',
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
        {
          label: 'Find information about my court',
          link: 'https://www.gov.uk/find-court-tribunal',
          target: '_blank',
        },
        {
          label: 'Set aside or change an application',
          link: 'https://www.gov.uk/government/publications/form-fl403-application-to-vary-extend-or-discharge-an-order-in-existing-proceedings',
          target: '_blank',
        },
      ]);
  });
});
