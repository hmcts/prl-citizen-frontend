import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { CaseType } from '../../../app/case/definition';
import {
  C100_REFUGE_UPLOAD_DOC,
  REFUGE_DOC_ALREADY_UPLOADED,
  REFUGE_KEEPING_SAFE,
  REFUGE_UPLOAD_DOC,
  STAYING_IN_REFUGE,
} from '../../urls';

import RefugeNavigationController from './navigationController';

describe('C8 refuge > navigationController', () => {
  const req = mockRequest({
    params: {
      id: '7483640e-0817-4ddc-b709-6723f7925474',
    },
    session: {
      userCase: {
        appl_allApplicants: [
          {
            id: '7483640e-0817-4ddc-b709-6723f7925474',
            applicantFirstName: 'dummy',
            applicantLastName: 'Test',
          },
        ],
        oprs_otherPersons: [
          {
            id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
            applicantFirstName: 'Test',
            applicantLastName: 'Test',
          },
        ],
      },
    },
  });

  test('should redirect from staying in refuge for C100 applicant when yes selected', async () => {
    req.originalUrl = '/c100-rebuild';
    req.session.userCase = {
      ...req.session.userCase,
      appl_allApplicants: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          applicantFirstName: 'dummy',
          applicantLastName: 'Test',
          liveInRefuge: 'Yes',
        },
      ],
    };
    expect(RefugeNavigationController.getNextPageUrl(STAYING_IN_REFUGE, req.session.userCase, req)).toBe(
      '/c100-rebuild/refuge/keeping-details-safe/7483640e-0817-4ddc-b709-6723f7925474?'
    );
  });

  test('should redirect from staying in refuge for C100 applicant when no selected', async () => {
    req.originalUrl = '/c100-rebuild';
    req.session.userCase = {
      ...req.session.userCase,
      appl_allApplicants: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          applicantFirstName: 'dummy',
          applicantLastName: 'Test',
          liveInRefuge: 'No',
        },
      ],
    };
    expect(RefugeNavigationController.getNextPageUrl(STAYING_IN_REFUGE, req.session.userCase, req)).toBe(
      '/c100-rebuild/applicant/7483640e-0817-4ddc-b709-6723f7925474/address/lookup'
    );
  });

  test('should redirect from staying in refuge for applicant/respondent when yes selected', async () => {
    req.originalUrl = '/applicant';
    req.session.userCase = {
      ...req.session.userCase,
      citizenUserLivingInRefuge: 'Yes',
    };
    expect(RefugeNavigationController.getNextPageUrl(STAYING_IN_REFUGE, req.session.userCase, req)).toBe(
      '/applicant/refuge/keeping-details-safe'
    );
  });

  test('should redirect from staying in refuge for applicant/respondent when no selected', async () => {
    req.originalUrl = '/applicant';
    req.session.userCase = {
      ...req.session.userCase,
      citizenUserLivingInRefuge: 'No',
    };
    expect(RefugeNavigationController.getNextPageUrl(STAYING_IN_REFUGE, req.session.userCase, req)).toBe(
      '/applicant/confirm-contact-details/addressdetails'
    );
  });

  test('should redirect from keeping safe for C100 applicant when document already uploaded', async () => {
    req.originalUrl = '/c100-rebuild';
    req.session.userCase = {
      ...req.session.userCase,
      appl_allApplicants: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          applicantFirstName: 'dummy',
          applicantLastName: 'Test',
          liveInRefuge: 'Yes',
          refugeConfidentialityC8Form: {
            document_url: 'MOCK_URL',
            document_binary_url: 'MOCK_BINARY_URL',
            document_filename: 'MOCK_FILENAME',
          },
        },
      ],
    };
    expect(RefugeNavigationController.getNextPageUrl(REFUGE_KEEPING_SAFE, req.session.userCase, req)).toBe(
      '/c100-rebuild/refuge/c8-already-uploaded/7483640e-0817-4ddc-b709-6723f7925474?'
    );
  });

  test('should redirect from keeping safe for C100 applicant when document not already uploaded', async () => {
    req.originalUrl = '/c100-rebuild';
    req.session.userCase = {
      ...req.session.userCase,
      appl_allApplicants: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          applicantFirstName: 'dummy',
          applicantLastName: 'Test',
          liveInRefuge: 'Yes',
        },
      ],
    };
    expect(RefugeNavigationController.getNextPageUrl(REFUGE_KEEPING_SAFE, req.session.userCase, req)).toBe(
      '/c100-rebuild/refuge/upload-refuge-doc/7483640e-0817-4ddc-b709-6723f7925474'
    );
  });

  test('should redirect from keeping safe for applicant/respondent when document already uploaded', async () => {
    req.originalUrl = '/applicant';
    req.session.userCase = {
      ...req.session.userCase,
      citizenUserLivingInRefuge: 'Yes',
      c8_refuge_document: {
        document_url: 'MOCK_URL',
        document_binary_url: 'MOCK_BINARY_URL',
        document_filename: 'MOCK_FILENAME',
      },
    };
    expect(RefugeNavigationController.getNextPageUrl(REFUGE_KEEPING_SAFE, req.session.userCase, req)).toBe(
      '/applicant/refuge/c8-already-uploaded'
    );
  });

  test('should redirect from keeping safe for applicant/respondent when document not already uploaded', async () => {
    req.originalUrl = '/applicant';
    req.session.userCase = {
      ...req.session.userCase,
      citizenUserLivingInRefuge: 'Yes',
      c8_refuge_document: undefined,
    };
    expect(RefugeNavigationController.getNextPageUrl(REFUGE_KEEPING_SAFE, req.session.userCase, req)).toBe(
      '/applicant/refuge/upload-refuge-doc'
    );
  });

  test('should redirect from upload doc', async () => {
    req.originalUrl = '/applicant';
    expect(RefugeNavigationController.getNextPageUrl(REFUGE_UPLOAD_DOC, req.session.userCase, req)).toBe(
      '/applicant/confirm-contact-details/addressdetails'
    );
  });

  test('should redirect from c100 upload doc', async () => {
    req.originalUrl = '/c100-rebuild';
    expect(RefugeNavigationController.getNextPageUrl(C100_REFUGE_UPLOAD_DOC, req.session.userCase, req)).toBe(
      '/c100-rebuild/applicant/7483640e-0817-4ddc-b709-6723f7925474/address/lookup'
    );
  });

  test('should redirect from doument already uploaded for C100 other person when yes selected', async () => {
    req.originalUrl = '/c100-rebuild';
    req.session.userCase = {
      ...req.session.userCase,
      uploadC8Again: 'Yes',
      oprs_otherPersons: [
        {
          id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
          applicantFirstName: 'Test',
          applicantLastName: 'Test',
          liveInRefuge: 'Yes',
          refugeConfidentialityC8Form: {
            document_url: 'MOCK_URL',
            document_binary_url: 'MOCK_BINARY_URL',
            document_filename: 'MOCK_FILENAME',
          },
        },
      ],
    };
    req.params = {
      id: '6b792169-84df-4e9a-8299-c2c77c9b7e58',
    };
    expect(RefugeNavigationController.getNextPageUrl(REFUGE_DOC_ALREADY_UPLOADED, req.session.userCase, req)).toBe(
      '/c100-rebuild/refuge/upload-refuge-doc/6b792169-84df-4e9a-8299-c2c77c9b7e58'
    );
  });

  test('should redirect from doument already uploaded for C100 applicant when no selected', async () => {
    req.originalUrl = '/c100-rebuild';
    req.session.userCase = {
      ...req.session.userCase,
      uploadC8Again: 'No',
      appl_allApplicants: [
        {
          id: '7483640e-0817-4ddc-b709-6723f7925474',
          applicantFirstName: 'dummy',
          applicantLastName: 'Test',
          liveInRefuge: 'Yes',
          refugeConfidentialityC8Form: {
            document_url: 'MOCK_URL',
            document_binary_url: 'MOCK_BINARY_URL',
            document_filename: 'MOCK_FILENAME',
          },
        },
      ],
    };
    req.params = {
      id: '7483640e-0817-4ddc-b709-6723f7925474',
    };
    expect(RefugeNavigationController.getNextPageUrl(REFUGE_DOC_ALREADY_UPLOADED, req.session.userCase, req)).toBe(
      '/c100-rebuild/applicant/7483640e-0817-4ddc-b709-6723f7925474/address/lookup'
    );
  });

  test('should redirect from doument already uploaded for applicant/respondent when yes selected', async () => {
    req.originalUrl = '/applicant';
    req.session.userCase = {
      ...req.session.userCase,
      uploadC8Again: 'Yes',
      citizenUserLivingInRefuge: 'Yes',
      c8_refuge_document: {
        document_url: 'MOCK_URL',
        document_binary_url: 'MOCK_BINARY_URL',
        document_filename: 'MOCK_FILENAME',
      },
    };
    expect(RefugeNavigationController.getNextPageUrl(REFUGE_DOC_ALREADY_UPLOADED, req.session.userCase, req)).toBe(
      '/applicant/refuge/upload-refuge-doc'
    );
  });

  test('should redirect from doument already uploaded for applicant/respondent when no selected', async () => {
    req.originalUrl = '/respondent';
    req.session.userCase = {
      ...req.session.userCase,
      uploadC8Again: 'No',
      citizenUserLivingInRefuge: 'Yes',
      c8_refuge_document: {
        document_url: 'MOCK_URL',
        document_binary_url: 'MOCK_BINARY_URL',
        document_filename: 'MOCK_FILENAME',
      },
      caseTypeOfApplication: CaseType.FL401,
      caseInvites: [
        {
          id: '1234',
          value: {
            isApplicant: 'No',
            invitedUserId: '1234',
          },
        },
      ],
      respondentsFL401: {
        user: {
          id: '1234',
          idamId: '1234',
        },
      },
    };
    req.session.user = {
      id: '1234',
      idamId: '1234',
    };
    expect(RefugeNavigationController.getNextPageUrl(REFUGE_DOC_ALREADY_UPLOADED, req.session.userCase, req)).toBe(
      '/respondent/confirm-contact-details/addressdetails'
    );
  });
});
