import { mockRequest } from '../../../../test/unit/utils/mockRequest';

import { languages } from './content';
import { prepareCaseView } from './tabView';

describe('Dashboard tab content', () => {
  const req = mockRequest();
  const userDetails = {
    id: '123',
    accessToken: 'mock-user-access-token',
    name: 'test',
    givenName: 'First name',
    familyName: 'Last name',
    email: 'test@example.com',
  };

  req.session.userCaseList = [
    {
      id: 1675576280723116,
      state: 'AWAITING_SUBMISSION_TO_HMCTS',
      caseTypeOfApplication: 'C100',
      caseCreatedBy: 'CITIZEN',
      createdDate: '2023-02-06T14:32:57.227543Z',
      caseStatus: {
        state: 'Draft',
      },
    },
    {
      id: 1675576280723115,
      state: 'SUBMITTED_PAID',
      caseTypeOfApplication: 'C100',
      caseCreatedBy: 'CITIZEN',
      createdDate: '2023-02-06T14:32:57.227543Z',
      caseStatus: {
        state: 'Submitted',
      },
    },
    {
      id: 1675347915490145,
      state: 'PREPARE_FOR_HEARING_CONDUCT_HEARING',
      dateSubmitted: '2023-02-02',
      caseSubmittedTimeStamp: '2023-02-02T14:32:57.227543Z',
      lastModifiedDate: '2023-02-06T14:32:57.227543Z',
      caseTypeOfApplication: 'FL401',
      selectedCaseTypeID: 'FL401',
      applicantCaseName: 'Case Test welsh',
      applicantName: 'S A',
      respondentName: 'A S',
      issueDate: '2023-02-02',
      familymanCaseNumber: '1234567890',
      caseInvites: [
        {
          id: 'c51122bb-fd72-41de-9a67-82b183b71819',
          value: {
            partyId: null,
            caseInviteEmail: 'AS@GMAIL.COM',
            accessCode: 'FVGJ6LWC',
            invitedUserId: '65d93485-7605-438a-8cc3-fc701e80f5b3',
            hasLinked: 'Yes',
            expiryDate: '2023-02-16',
            isApplicant: 'No',
          },
        },
        {
          id: 'bbce3b89-31eb-4478-a20e-f8fcf575784b',
          value: {
            partyId: null,
            caseInviteEmail: 'SA@GMAIL.COM',
            accessCode: '2CSG8746',
            invitedUserId: null,
            hasLinked: null,
            expiryDate: '2023-02-16',
            isApplicant: 'Yes',
          },
        },
      ],
      respondentsFL401: {
        firstName: 'A',
        lastName: 'S',
        dateOfBirth: '1998-03-20',
        user: {
          idamId: '65d93485-7605-438a-8cc3-fc701e80f5b3',
          email: 'familyprivatelaw@gmail.com',
          solicitorRepresented: null,
        },
      },
      caseStatus: {
        state: 'Prepare for hearing',
      },
    },
  ];

  test('prepareCaseView method should return the appropriate tab contents for caseView', () => {
    expect(prepareCaseView(req.session.userCaseList, userDetails, languages.en)).toEqual(
      expect.objectContaining({
        draft: {
          label: 'Draft applications',
          id: 'draft-cases',
          heading: 'Your applications',
          body: '<p class="govuk-body">You have 28 days to submit the application.</p>',
          head: [
            {
              text: 'Case number',
            },
            {
              text: 'Case type',
            },
            {
              text: 'Status',
            },
            {
              text: 'Created date',
            },
          ],
          rows: [
            [
              {
                html: '<a class="govuk-link" href="/c100-rebuild/case/1675576280723116/retrive">1675576280723116</a>',
              },
              {
                text: 'C100',
              },
              {
                text: 'Draft',
              },
              {
                text: '06 Feb 2023',
              },
            ],
            [
              {
                html: '<a class="govuk-link" href="/case/1675576280723115">1675576280723115</a>',
              },
              {
                text: 'C100',
              },
              {
                text: 'Application submitted',
              },
              {
                text: '06 Feb 2023',
              },
            ],
          ],
        },
        active: {
          label: 'Active cases',
          id: 'active-cases',
          heading: 'Ongoing cases',
          head: [
            {
              text: 'Case number',
            },
            {
              text: 'Case type',
            },
            {
              text: 'Applicant',
            },
            {
              text: 'Last updated',
            },
          ],
          rows: [
            [
              {
                html: '<a class="govuk-link" href="/case/1675347915490145">1675347915490145</a>',
              },
              {
                text: 'FL401',
              },
              {
                text: 'S A',
              },
              {
                text: '06 Feb 2023',
              },
            ],
          ],
        },
        closed: {
          label: 'Closed cases',
          id: 'closed-cases',
          heading: 'Closed cases',
          head: [],
          rows: [],
          body: 'No case available.',
        },
      })
    );
  });
});
