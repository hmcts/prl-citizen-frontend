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
        ariaLabel: 'Other Proceedings is not yet started',
        label: 'Other<br/>Proceedings',
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
        ariaLabel: 'Other Proceedings - welsh heb ddechrau eto',
        label: 'Other<br/>Proceedings - welsh',
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

  test('should return correct english content when enableC100CaseProgressionTrainTrack is not present', () => {
    languageAssertions(
      'en',
      {
        ...en,
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
          {
            ariaLabel: 'Case closed stage is not yet started',
            label: 'Case closed',
            statusBarClassName: '',
          },
        ],
      },
      () =>
        generateContent({
          ...commonContent,
        })
    );
  });

  test('should return correct welsh content when enableC100CaseProgressionTrainTrack is not present', () => {
    languageAssertions(
      'cy',
      {
        ...cy,
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
      },
      () =>
        generateContent({
          ...commonContent,
          language: 'cy',
        })
    );
  });

  test('should return correct english content when enableC100CaseProgressionTrainTrack is present', () => {
    languageAssertions('en', en, () =>
      generateContent({
        ...commonContent,
        additionalData: {
          ...commonContent.additionalData,
          req: {
            ...commonContent.additionalData?.req,
            session: { ...commonContent.additionalData?.req.session, enableC100CaseProgressionTrainTrack: true },
          },
        },
      })
    );
  });

  test('should return correct welsh content when enableC100CaseProgressionTrainTrack is present', () => {
    languageAssertions('cy', cy, () =>
      generateContent({
        ...commonContent,
        language: 'cy',
        additionalData: {
          ...commonContent.additionalData,
          req: {
            ...commonContent.additionalData?.req,
            session: { ...commonContent.additionalData?.req.session, enableC100CaseProgressionTrainTrack: true },
          },
        },
      })
    );
  });
});
