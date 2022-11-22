import { applicantMockRequest } from '../../../../test/unit/mocks/mocked-requests/applicant-details-mock';
import {
  C100_APPLICANT_ADDRESS_LOOKUP,
  C100_APPLICANT_ADDRESS_MANUAL,
  C100_APPLICANT_ADDRESS_SELECT,
  C100_APPLICANT_ADD_APPLICANTS,
  C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_FEEDBACK_NO,
  C100_APPLICANT_RELATIONSHIP_TO_CHILD,
} from '../../urls';

import ApplicantDetailsNavigationController from './navigationController';

const dummyRequest = applicantMockRequest;

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

  test('From Applicant address select screen -> navigate to Applicant address manual', async () => {
    dummyRequest.params.childId = '7483640e-0817-4ddc-b709-6723f7925635';
    dummyRequest.params.applicantId = '2cd885a0-135e-45f1-85b7-aa46a1f78f46';
    expect(
      ApplicantDetailsNavigationController.getNextUrl(
        C100_APPLICANT_ADDRESS_SELECT,
        dummyRequest.session.userCase,
        dummyRequest.params
      )
    ).toBe('/c100-rebuild/applicant/2cd885a0-135e-45f1-85b7-aa46a1f78f46/address/manual');
  });

  test('From Applicant address manual screen -> navigate to Applicant contact detail', async () => {
    dummyRequest.params.applicantId = '2cd885a0-135e-45f1-85b7-aa46a1f78f46';
    expect(
      ApplicantDetailsNavigationController.getNextUrl(
        C100_APPLICANT_ADDRESS_MANUAL,
        dummyRequest.session.userCase,
        dummyRequest.params
      )
    ).toBe('/c100-rebuild/applicant/2cd885a0-135e-45f1-85b7-aa46a1f78f46/contact-detail');
  });

  test('From Applicant address lookup screen -> navigate to Applicant address select screen', async () => {
    dummyRequest.params.applicantId = '2cd885a0-135e-45f1-85b7-aa46a1f78f46';
    expect(
      ApplicantDetailsNavigationController.getNextUrl(
        C100_APPLICANT_ADDRESS_LOOKUP,
        dummyRequest.session.userCase,
        dummyRequest.params
      )
    ).toBe('/c100-rebuild/applicant/2cd885a0-135e-45f1-85b7-aa46a1f78f46/address/select');
  });

  test('From confidentiality feedback screen -> navigate to Applicant personal details screen', async () => {
    dummyRequest.params.applicantId = '2cd885a0-135e-45f1-85b7-aa46a1f78f46';
    expect(
      ApplicantDetailsNavigationController.getNextUrl(
        C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_FEEDBACK_NO,
        dummyRequest.session.userCase,
        dummyRequest.params
      )
    ).toBe('/c100-rebuild/applicant/2cd885a0-135e-45f1-85b7-aa46a1f78f46/personal-details');
  });
});
