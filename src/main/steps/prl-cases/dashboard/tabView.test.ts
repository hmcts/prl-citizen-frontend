import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { UserDetails } from '../../../app/controller/AppRequest';

import { languages } from './content';
import { prepareCaseView } from './tabView';

describe('Dashboard tab content', () => {
  const req = mockRequest();
  const userDetails = {
    id: 'test-user-id',
    accessToken: 'mock-user-access-token',
    name: 'test',
    givenName: 'First name',
    familyName: 'Last name',
    email: 'test@example.com',
  } as UserDetails;

  req.session.userCaseList = [
    {
      id: 1675576280723116,
      state: 'AWAITING_SUBMISSION_TO_HMCTS',
      caseTypeOfApplication: 'C100',
      caseCreatedBy: 'CITIZEN',
      createdDate: '2023-02-06T14:32:57.227543Z',
      lastModifiedDate: '2023-02-06T14:32:57.227543Z',
      noOfDaysRemainingToSubmitCase: 21,
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
      lastModifiedDate: '2023-02-07T14:32:57.227543Z',
      caseStatus: {
        state: 'Submitted',
      },
    },
    {
      id: 1675347915490145,
      state: 'PREPARE_FOR_HEARING_CONDUCT_HEARING',
      dateSubmitted: '2023-02-02',
      caseSubmittedTimeStamp: '2023-02-02T14:32:57.227543Z',
      lastModifiedDate: '2023-02-08T14:32:57.227543Z',
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

  test('prepareCaseView should return the appropriate case cards, most-recently-updated first', () => {
    expect(prepareCaseView(req.session.userCaseList, userDetails, languages.en)).toEqual([
      {
        id: 1675347915490145,
        caseTypeHeading: '--FL401 heading needed',
        caseNumber: '1675-3479-1549-0145',
        actionText: 'View case',
        actionUrl: '/case/1675347915490145',
        role: 'Applicant',
        lastUpdate: '08 Feb 2023',
        status: {
          text: 'Active',
          classes: 'govuk-tag--green',
          description: '',
        },
      },
      {
        id: 1675576280723115,
        caseTypeHeading: 'Child arrangements case',
        caseNumber: '1675-5762-8072-3115',
        actionText: 'View application',
        actionUrl: '/case/1675576280723115',
        role: 'Applicant',
        lastUpdate: '07 Feb 2023',
        status: {
          text: 'Submitted',
          classes: 'govuk-tag--blue',
          description: 'The court will review your application and contact you with the next steps',
        },
      },
      {
        id: 1675576280723116,
        caseTypeHeading: 'Child arrangements case',
        caseNumber: '1675-5762-8072-3116',
        actionText: 'Continue application',
        actionUrl: '/c100-rebuild/case/1675576280723116/retrive',
        role: 'Applicant',
        lastUpdate: '06 Feb 2023',
        status: {
          text: 'Draft',
          classes: 'govuk-tag--yellow',
          description: 'You have 21 days to submit this draft application',
        },
      },
    ]);
  });

  test('prepareCaseView should return an empty array when there are no cases', () => {
    expect(prepareCaseView([], userDetails, languages.en)).toEqual([]);
  });

  test('prepareCaseView should return an empty array when caseData is undefined', () => {
    expect(prepareCaseView(undefined as unknown as [], userDetails, languages.en)).toEqual([]);
  });
});
