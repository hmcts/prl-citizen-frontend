import { CaseType, PartyType, State } from '../../../../../app/case/definition';

import { getTaskListConfig } from './utils';

describe('testcase for tasklist', () => {
  test('when case is state pending', () => {
    const data = {
      id: '12',
      state: State.AwaitingSubmissionToHmcts,
    };
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getTaskListConfig(data, party, language)).toStrictEqual([
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

  test('case in non pending state', () => {
    const data = {
      id: '12',
      state: State.GATEKEEPING,
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

    expect(getTaskListConfig(data, party, language)).toStrictEqual([
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
        heading: 'Your application',
        id: 'yourApplication',
        tasks: [
          {
            disabled: false,
            href: '/c100-rebuild/application-copy/download',
            id: 'childArrangementApplication',
            linkText: 'Your child arrangements application',
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
            href: '/applicant/upload-document',
            id: 'uploadDocuments',
            linkText: ' Upload documents',
            stateTag: {
              className: 'govuk-tag--blue',
              label: 'Optional',
            },
          },
          {
            disabled: false,
            href: undefined,
            id: 'viewAllDocuments',
            linkText: 'View all documents',
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
  test('FL401 Applicant', () => {
    const data = {
      id: '12',
      state: State.AWAITING_SUBMISSION_TO_HMCTS,
      caseTypeOfApplication: CaseType.FL401,
    };
    const party = PartyType.APPLICANT;
    const language = 'en';

    expect(getTaskListConfig(data, party, language)).toStrictEqual([]);
  });
  test('FL401 respondent', () => {
    const data = {
      id: '12',
      state: State.AWAITING_SUBMISSION_TO_HMCTS,
      caseTypeOfApplication: CaseType.FL401,
    };
    const party = PartyType.RESPONDENT;
    const language = 'en';

    expect(getTaskListConfig(data, party, language)).toStrictEqual([]);
  });
});
