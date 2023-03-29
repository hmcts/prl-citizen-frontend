import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { PartyType, State } from '../../../app/case/definition';
import { CommonContent } from '../common.content';
import { generateContent } from '../task-list/content';

describe('testcase for tasklist', () => {
  const en = {
    caseNumber: 'Case number #',
    hyperlinks: [
      {
        label: 'Know more about child arrangements',
        link: 'https://helpwithchildarrangements.service.justice.gov.uk/',
      },
      {
        label: 'Know more about attending court',
        link: 'https://helpwithchildarrangements.service.justice.gov.uk/going-to-court',
      },
      {
        label: 'Understand what a Mediation Information & Assessment Meeting (MIAM) is',
        link: 'https://www.familymediationcouncil.org.uk/family-mediation/assessment-meeting-miam/',
      },
      {
        label: 'Check if I am eligible for Legal Aid',
        link: 'https://www.gov.uk/check-legal-aid',
      },
      {
        label: 'Check if I am eligible for Help with Fees',
        link: 'https://www.gov.uk/get-help-with-court-fees',
      },
      {
        label: 'Find out about The Family Mediation Voucher scheme',
        link: 'https://www.gov.uk/guidance/family-mediation-voucher-scheme',
      },
      {
        label: 'Find legal advice',
        link: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
      },
      {
        label: 'Read how to represent myself in court',
        link: 'https://www.gov.uk/represent-yourself-in-court',
      },
    ],
    iWantTo: 'I want to...',
    notifications: [
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
            href: '#caseData.c100RebuildReturnUrl',
            text: 'Continue your application',
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
            href: undefined,
            id: 'childArrangementApplication',
            linkText: 'Your child arrangements application',
            stateTag: { className: 'govuk-tag--yellow', label: 'In progress' },
          },
        ],
      },
    ],
    title: 'Child arrangements and family injunction cases',
  };
  const cy = {
    title: 'Trefniadau plant a gwaharddebau teulu',
    caseNumber: 'Rhif yr achos #',
    iWantTo: 'Rwyf eisiau...',
    hyperlinks: [
      {
        label: 'Gwybod mwy am drefniadau plant',
        link: 'https://helpwithchildarrangements.service.justice.gov.uk/',
      },
      {
        label: 'Gwybod mwy am fynychu’r llys',
        link: 'https://helpwithchildarrangements.service.justice.gov.uk/going-to-court',
      },
      {
        label: 'Deall beth yw Cyfarfod Asesu a Gwybodaeth am Gyfryngu (MIAM)',
        link: 'https://www.familymediationcouncil.org.uk/family-mediation/assessment-meeting-miam/',
      },
      {
        label: 'Gwirio os wyf yn gymwys i gael Cymorth Cyfreithiol',
        link: 'https://www.gov.uk/check-legal-aid',
      },
      {
        label: 'Gwirio os wyf yn gymwys i gael Help i Dalu Ffioedd',
        link: 'https://www.gov.uk/get-help-with-court-fees',
      },
      {
        label: 'Rhagor o wybodaeth am y Cynllun Talebau Cyfryngu Teuluol',
        link: 'https://www.gov.uk/guidance/family-mediation-voucher-scheme',
      },
      {
        label: 'Dod o hyd i gyngor cyfreithiol',
        link: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
      },
      {
        label: 'Darllen mwy am sut i gynrychioli fy hun yn y llys',
        link: 'https://www.gov.uk/represent-yourself-in-court',
      },
    ],
    notifications: [
      {
        contents: [
          {
            text: 'Mae gennych caseData.noOfDaysRemainingToSubmitCase diwrnod i gyflwyno eich cais o’r dyddiad y gwnaethoch ei gychwyn, neu bydd yn cael ei ddileu a bydd rhaid i chi gychwyn y cais eto. Mae hyn er mwyn cadw eich gwybodaeth yn ddiogel.',
          },
        ],
        heading: 'Nid ydych wedi gorffen eich cais',
        id: 'applicationInProgress',
        links: [
          {
            href: '#caseData.c100RebuildReturnUrl',
            text: 'Parhau gyda’ch cais',
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
            href: undefined,
            id: 'childArrangementApplication',
            linkText: 'Eich cais trefniadau plant',
            stateTag: { className: 'govuk-tag--yellow', label: 'Ar y gweill' },
          },
        ],
      },
    ],
  };
  const commonContent = {
    language: 'en',
    userCase: {
      ...mockUserCase,
      state: State.AwaitingSubmissionToHmcts,
    },
    additionalData: {
      req: {
        session: {
          user: { id: '' },
          userCase: {
            ...mockUserCase,
            caseTypeOfApplication: 'C100',
            state: State.AwaitingSubmissionToHmcts,
          },
        },
        params: {
          partyType: PartyType.APPLICANT,
        },
        state: State.AwaitingSubmissionToHmcts,
      },
    },
  } as unknown as CommonContent;
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
