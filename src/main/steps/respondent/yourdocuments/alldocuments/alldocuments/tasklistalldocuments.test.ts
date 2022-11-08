import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { applicant_tasklist_items_all_docs_en as respondent_tasklist_items_all_docs_en } from '../../../../applicant/yourdocuments/alldocuments/alldocuments/tasklist-items-all-documents';

import { respondent_all_docs_en } from './section-titles-all-documents';
import { generateRespondentTaskListAllDocuments } from './tasklistalldocuments';

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
    const actual = generateRespondentTaskListAllDocuments(
      respondent_all_docs_en,
      respondent_tasklist_items_all_docs_en,
      req.session.userCase
    );
    expect(actual[0].title).toEqual(respondent_all_docs_en.respondentsDocuments);
  });
});
