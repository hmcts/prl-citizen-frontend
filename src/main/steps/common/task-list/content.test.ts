import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { PartyType, State } from '../../../app/case/definition';
import { CommonContent } from '../common.content';
import { generateContent } from '../task-list/content';

describe('testcase for tasklist', () => {
  const en = {
    title: 'Child arrangements and family injunction cases',
    caseNumber: 'Case number ',
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
    progressBar: [
      {
        ariaLabel: 'Children postcode is not yet started',
        label: 'Children<br/>postcode',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Screening questions is not yet started',
        label: 'Screening<br/>questions',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Type of order is not yet started',
        label: 'Type<br/>of<br/>order',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Other Proceedings is not yet started',
        label: 'Other<br/>Proceedings',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Urgency and Without notice is not yet started',
        label: 'Urgency<br/>&<br/>Without notice',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'People is not yet started',
        label: 'People',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Safety concerns is not yet started',
        label: 'Safety<br/>concerns',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'International elements is not yet started',
        label: 'International<br/>elements',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Reasonable adjustments is not yet started',
        label: 'Reasonable<br/>adjustments',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Help with fees is not yet started',
        label: 'Help<br/>with<br/>fees',
        statusBarClassName: '',
      },
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
  };
  const cy = {
    title: 'Trefniadau plant a gwaharddebau teulu',
    caseNumber: 'Rhif yr achos ',
    iWantTo: 'Rwyf eisiau...',
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
    progressBar: [
      {
        ariaLabel: 'Children postcode - welsh heb ddechrau eto',
        label: 'Children<br/>postcode - welsh',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Screening questions - welsh heb ddechrau eto',
        label: 'Screening<br/>questions - welsh',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Type of order - welsh heb ddechrau eto',
        label: 'Type<br/>of<br/>order - welsh',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Other Proceedings - welsh heb ddechrau eto',
        label: 'Other<br/>Proceedings - welsh',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Urgency and Without notice - welsh heb ddechrau eto',
        label: 'Urgency<br/>&<br/>Without notice - welsh',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'People - welsh heb ddechrau eto',
        label: 'People - welsh',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Safety concerns - welsh heb ddechrau eto',
        label: 'Safety<br/>concerns - welsh',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'International elements - welsh heb ddechrau eto',
        label: 'International<br/>elements - welsh',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Reasonable adjustments - welsh heb ddechrau eto',
        label: 'Reasonable<br/>adjustments - welsh',
        statusBarClassName: '',
      },
      {
        ariaLabel: 'Help with fees - welsh heb ddechrau eto',
        label: 'Help<br/>with<br/>fees - welsh',
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
});
