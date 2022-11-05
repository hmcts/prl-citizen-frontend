import { ApplicantMockRequest } from '../../../../test/unit/mocks/mocked-requests/applicant-details-mock';
import { C100_APPLICANT_ADD_APPLICANTS, C100_APPLICANT_RELATIONSHIP_TO_CHILD } from '../../urls';

import ApplicantDetailsNavigationController from './navigationController';

const dummyRequest = ApplicantMockRequest;

describe('ApplicantDetailsNavigationController', () => {
  test('From Applicant1 relationship to child 1 screen -> navigate to Applicant1 relationship to child 1 screen', async () => {
    expect(
      ApplicantDetailsNavigationController.getNextUrl(
        C100_APPLICANT_RELATIONSHIP_TO_CHILD,
        dummyRequest.session.userCase,
        dummyRequest.params
      )
    ).toBe(
      '/c100-rebuild/applicant/2732dd53-2e6c-46f9-88cd-08230e735b08/relationship-to-child/7483640e-0817-4ddc-b709-6723f7925635'
    );
  });

  test('From Applicant1 relationship to child 2 screen -> navigate to Applicant2 relationship to child 2 screen', async () => {
    dummyRequest.params.childId = '7483640e-0817-4ddc-b709-6723f7925635';
    dummyRequest.params.applicantId = '2732dd53-2e6c-46f9-88cd-08230e735b08';
    expect(
      ApplicantDetailsNavigationController.getNextUrl(
        C100_APPLICANT_RELATIONSHIP_TO_CHILD,
        dummyRequest.session.userCase,
        dummyRequest.params
      )
    ).toBe(
      '/c100-rebuild/applicant/2cd885a0-135e-45f1-85b7-aa46a1f78f46/relationship-to-child/7483640e-0817-4ddc-b709-6723f7925474'
    );
  });

  test('From Applicant2 relationship to child 1 screen -> navigate to Applicant2 relationship to child 2 screen', async () => {
    dummyRequest.params.childId = '7483640e-0817-4ddc-b709-6723f7925635';
    dummyRequest.params.applicantId = '2cd885a0-135e-45f1-85b7-aa46a1f78f46';
    expect(
      ApplicantDetailsNavigationController.getNextUrl(
        C100_APPLICANT_ADD_APPLICANTS,
        dummyRequest.session.userCase,
        dummyRequest.params
      )
    ).toBe('/c100-rebuild/applicant/add-applicants');
  });
});
