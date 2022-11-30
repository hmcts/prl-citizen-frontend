import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { YesNoDontKnow } from '../../../../../app/case/definition';

import { applicant_all_docs_en } from './section-titles-all-documents';
import { applicant_tasklist_items_all_docs_en } from './tasklist-items-all-documents';
import {
  generateApplicantTaskListAllDocuments,
  getApplicantDocuments,
  getRespondentDocuments,
} from './tasklistalldocuments';

describe('applicant-tasklistalldocuments', () => {
  const req = mockRequest();
  beforeEach(() => {
    req.session.userCase.citizenUploadedDocumentList = [
      {
        id: 'f0dddf6e-8ece-4e6c-b49e-4612d442e8a8',
        value: {
          isApplicant: 'Yes',
          documentType: 'Drug and alcohol tests (toxicology)',
        },
      },
      {
        id: 'f0dddf6e-8ece-4e6c-b49e-4612d442e8a8',
        value: {
          isApplicant: 'Yes',
          documentType: 'Paternity test reports',
        },
      },
      {
        id: 'f0dddf6e-8ece-4e6c-b49e-4612d442e8a8',
        value: {
          isApplicant: 'Yes',
          documentType: 'Medical reports',
        },
      },
      {
        id: 'f0dddf6e-8ece-4e6c-b49e-4612d442e8a8',
        value: {
          isApplicant: 'Yes',
          documentType: 'Letters from school',
        },
      },
      {
        id: 'f0dddf6e-8ece-4e6c-b49e-4612d442e8a8',
        value: {
          isApplicant: 'Yes',
          documentType: 'Medical records',
        },
      },
      {
        id: 'f0dddf6e-8ece-4e6c-b49e-4612d442e8a8',
        value: {
          isApplicant: 'Yes',
          documentType: 'Emails, screenshots, images and other media file',
        },
      },
      {
        id: 'f0dddf6e-8ece-4e6c-b49e-4612d442e8a8',
        value: {
          isApplicant: 'Yes',
          documentType: 'Police reports',
        },
      },
      {
        id: 'f0dddf6e-8ece-4e6c-b49e-4612d442e8a8',
        value: {
          isApplicant: 'Yes',
          documentType: 'Witness availability',
        },
      },
      {
        id: 'f0dddf6e-8ece-4e6c-b49e-4612d442e8a8',
        value: {
          isApplicant: 'Yes',
          documentType: 'Tenancy and mortgage',
        },
      },
    ];
    req.session.userCase.miamCertificationDocumentUpload = {
      document_url:
        'http://dm-store-aat.service.core-compute-aat.internal/documents/4d2cac2d-fb51-421a-af83-d34f26d6906f',
      document_filename: 'miam.pdf',
      document_binary_url:
        'http://dm-store-aat.service.core-compute-aat.internal/documents/4d2cac2d-fb51-421a-af83-d34f26d6906f/binary',
    };
  });

  test('generateApplicantTaskListAllDocuments when orderCollection not null', async () => {
    req.session.userCase.orderCollection = [];
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.userCase.applicants = [
      {
        id: '310f3f16-7425-4680-8054-92f3a01ab923',
        value: {
          user: {
            email: null,
            idamId: null,
          },
          lastName: 'Solicitor',
          firstName: 'AAT',
        },
      },
    ];
    req.session.userCase.respondents = [
      {
        id: '310f3f16-7425-4680-8054-92f3a01ab923',
        value: {
          user: {
            email: null,
            idamId: null,
          },
          lastName: 'Solicitor',
          firstName: 'AAT',
        },
      },
    ];
    const actual = generateApplicantTaskListAllDocuments(
      applicant_all_docs_en,
      applicant_tasklist_items_all_docs_en,
      req.session.userCase
    );
    expect(actual).toHaveLength(6);
  });

  test('generateApplicantTaskListAllDocuments when orderCollection is null', async () => {
    req.session.userCase.orderCollection = undefined;
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.userCase.applicants = [
      {
        id: '310f3f16-7425-4680-8054-92f3a01ab923',
        value: {
          user: {
            email: null,
            idamId: null,
          },
          lastName: 'Solicitor',
          firstName: 'AAT',
        },
      },
    ];
    req.session.userCase.respondents = [
      {
        id: '310f3f16-7425-4680-8054-92f3a01ab923',
        value: {
          user: {
            email: null,
            idamId: null,
          },
          lastName: 'Solicitor',
          firstName: 'AAT',
        },
      },
    ];
    const actual = generateApplicantTaskListAllDocuments(
      applicant_all_docs_en,
      applicant_tasklist_items_all_docs_en,
      req.session.userCase
    );
    expect(actual).toHaveLength(5);
  });

  test('getApplicantDocuments for applicant, CA', async () => {
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.userCase.applicants = [
      {
        id: '310f3f16-7425-4680-8054-92f3a01ab923',
        value: {
          user: {
            email: null,
            idamId: null,
          },
          lastName: 'Solicitor',
          firstName: 'AAT',
        },
      },
    ];

    req.session.userCase.previousOrOngoingProceedingsForChildren = YesNoDontKnow.yes;
    const actual = getApplicantDocuments(
      applicant_all_docs_en,
      applicant_tasklist_items_all_docs_en,
      req.session.userCase,
      true
    );
    expect(actual.title).toEqual(applicant_all_docs_en.applicantsDocuments);
    expect(actual.items).toHaveLength(14);
  });

  test('getApplicantDocuments for applicant, DA', async () => {
    req.session.userCase.caseTypeOfApplication = 'FL401';
    req.session.userCase.applicantsFL401 = {
      user: {
        email: null,
        idamId: null,
      },
      lastName: 'Solicitor',
      firstName: 'AAT',
    };

    req.session.userCase.previousOrOngoingProceedingsForChildren = YesNoDontKnow.yes;
    const actual = getApplicantDocuments(
      applicant_all_docs_en,
      applicant_tasklist_items_all_docs_en,
      req.session.userCase,
      true
    );
    expect(actual.title).toEqual(applicant_all_docs_en.applicantsDocuments);
    expect(actual.items).toHaveLength(16);
  });
});

describe('respondent-tasklistalldocuments', () => {
  const req = mockRequest();
  beforeEach(() => {
    req.session.userCase.citizenUploadedDocumentList = [
      {
        id: 'f0dddf6e-8ece-4e6c-b49e-4612d442e8a8',
        value: {
          isApplicant: 'No',
          documentType: 'Drug and alcohol tests (toxicology)',
        },
      },
      {
        id: 'f0dddf6e-8ece-4e6c-b49e-4612d442e8a8',
        value: {
          isApplicant: 'No',
          documentType: 'Paternity test reports',
        },
      },
      {
        id: 'f0dddf6e-8ece-4e6c-b49e-4612d442e8a8',
        value: {
          isApplicant: 'No',
          documentType: 'Medical reports',
        },
      },
      {
        id: 'f0dddf6e-8ece-4e6c-b49e-4612d442e8a8',
        value: {
          isApplicant: 'No',
          documentType: 'Letters from school',
        },
      },
      {
        id: 'f0dddf6e-8ece-4e6c-b49e-4612d442e8a8',
        value: {
          isApplicant: 'No',
          documentType: 'Medical records',
        },
      },
      {
        id: 'f0dddf6e-8ece-4e6c-b49e-4612d442e8a8',
        value: {
          isApplicant: 'No',
          documentType: 'Emails, screenshots, images and other media file',
        },
      },
      {
        id: 'f0dddf6e-8ece-4e6c-b49e-4612d442e8a8',
        value: {
          isApplicant: 'No',
          documentType: 'Police reports',
        },
      },
      {
        id: 'f0dddf6e-8ece-4e6c-b49e-4612d442e8a8',
        value: {
          isApplicant: 'No',
          documentType: 'Witness availability',
        },
      },
      {
        id: 'f0dddf6e-8ece-4e6c-b49e-4612d442e8a8',
        value: {
          isApplicant: 'No',
          documentType: 'Tenancy and mortgage',
        },
      },
    ];
    req.session.userCase.miamCertificationDocumentUpload = {
      document_url:
        'http://dm-store-aat.service.core-compute-aat.internal/documents/4d2cac2d-fb51-421a-af83-d34f26d6906f',
      document_filename: 'miam.pdf',
      document_binary_url:
        'http://dm-store-aat.service.core-compute-aat.internal/documents/4d2cac2d-fb51-421a-af83-d34f26d6906f/binary',
    };
  });

  test('getApplicantDocuments for respondent, CA', async () => {
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.userCase.respondents = [
      {
        id: '310f3f16-7425-4680-8054-92f3a01ab923',
        value: {
          user: {
            email: null,
            idamId: null,
          },
          lastName: 'Solicitor',
          firstName: 'AAT',
        },
      },
    ];

    req.session.userCase.previousOrOngoingProceedingsForChildren = YesNoDontKnow.yes;
    const actual = getRespondentDocuments(
      applicant_all_docs_en,
      applicant_tasklist_items_all_docs_en,
      req.session.userCase,
      false
    );
    expect(actual.title).toEqual(applicant_all_docs_en.respondentsDocuments);
    expect(actual.items).toHaveLength(12);
  });

  test('getApplicantDocuments for respondent, DA', async () => {
    req.session.userCase.caseTypeOfApplication = 'FL401';
    req.session.userCase.respondentsFL401 = {
      user: {
        email: null,
        idamId: null,
      },
      lastName: 'Solicitor',
      firstName: 'AAT',
    };

    req.session.userCase.previousOrOngoingProceedingsForChildren = YesNoDontKnow.yes;
    const actual = getRespondentDocuments(
      applicant_all_docs_en,
      applicant_tasklist_items_all_docs_en,
      req.session.userCase,
      false
    );
    expect(actual.title).toEqual(applicant_all_docs_en.respondentsDocuments);
    expect(actual.items).toHaveLength(15);
  });
});
