import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { PartyType, State } from '../../../app/case/definition';
import { CommonContent } from '../common.content';
import { generateContent } from '../task-list/content';

describe('testcase for tasklist', () => {
  test('should return correct english content', () => {
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

    const generatedContent = generateContent(commonContent);

    expect(generatedContent).toEqual({
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
    });
  });

  test('should return correct welsh content', () => {
    const commonContent = {
      language: 'cy',
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

    const generatedContent = generateContent(commonContent);

    expect(generatedContent).toEqual({
      caseNumber: 'Case number # - welsh',
      hyperlinks: [
        {
          label: 'Know more about child arrangements - welsh',
          link: 'https://helpwithchildarrangements.service.justice.gov.uk/',
        },
        {
          label: 'Know more about attending court - welsh',
          link: 'https://helpwithchildarrangements.service.justice.gov.uk/going-to-court',
        },
        {
          label: 'Understand what a Mediation Information & Assessment Meeting (MIAM) is - welsh',
          link: 'https://www.familymediationcouncil.org.uk/family-mediation/assessment-meeting-miam/',
        },
        {
          label: 'Check if I am eligible for Legal Aid - welsh',
          link: 'https://www.gov.uk/check-legal-aid',
        },
        {
          label: 'Check if I am eligible for Help with Fees - welsh',
          link: 'https://www.gov.uk/get-help-with-court-fees',
        },
        {
          label: 'Find out about The Family Mediation Voucher scheme - welsh',
          link: 'https://www.gov.uk/guidance/family-mediation-voucher-scheme',
        },
        {
          label: 'Find legal advice - welsh',
          link: 'https://www.gov.uk/find-legal-advice/find-legal-adviser',
        },
        {
          label: 'Read how to represent myself in court - welsh',
          link: 'https://www.gov.uk/represent-yourself-in-court',
        },
      ],
      iWantTo: 'I want to... - welsh',
      notifications: [
        {
          contents: [
            {
              text: 'You have caseData.noOfDaysRemainingToSubmitCase days to submit your application or it will be deleted and you will need to start again. This is for security reasons. - welsh',
            },
          ],
          heading: 'You have not finished your application - welsh',
          id: 'applicationInProgress',
          links: [
            {
              href: '#caseData.c100RebuildReturnUrl',
              text: 'Continue your application - welsh',
            },
          ],
          title: 'Important - welsh',
        },
      ],
      partyName: 'undefined undefined',
      progressBar: [
        {
          ariaLabel: 'Application submitted stage - welsh is not yet started - welsh',
          label: 'Application<br/> submitted - welsh',
          statusBarClassName: '',
        },
        {
          ariaLabel: 'Cafcass child safety checks stage - welsh is not yet started - welsh',
          label: 'Cafcass child<br/> safety checks - welsh',
          statusBarClassName: '',
        },
        {
          ariaLabel: 'Response submitted stage - welsh is not yet started - welsh',
          label: 'Response<br/> submitted - welsh',
          statusBarClassName: '',
        },
        {
          ariaLabel: 'Hearings and court orders stage - welsh is not yet started - welsh',
          label: 'Hearings and<br/> court orders - welsh',
          statusBarClassName: '',
        },
        {
          ariaLabel: 'Case closed stage - welsh is not yet started - welsh',
          label: 'Case closed - welsh',
          statusBarClassName: '',
        },
      ],
      taskLists: [
        {
          heading: 'Your application - welsh',
          id: 'yourApplication',
          tasks: [
            {
              disabled: false,
              href: undefined,
              id: 'childArrangementApplication',
              linkText: 'Your child arrangements application - welsh',
              stateTag: { className: 'govuk-tag--yellow', label: 'In progress - welsh' },
            },
          ],
        },
      ],
      title: 'Child arrangements and family injunction cases - welsh',
    });
  });
});
