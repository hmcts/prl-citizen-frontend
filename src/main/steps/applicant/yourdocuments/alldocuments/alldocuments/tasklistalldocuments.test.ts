import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { YesNoDontKnow } from '../../../../../app/case/definition';

import { applicant_all_docs_en } from './section-titles-all-documents';
import { applicant_tasklist_items_all_docs_en } from './tasklist-items-all-documents';
import {
  generateApplicantTaskListAllDocuments,
  getApplicantDocuments,
  getRespondentDocuments,
  isDigitalDownloadsUploadedRespondent,
  isDigitalDownloadsUploadedd,
  isDrugDocUploadedRespondent,
  isDrugDocUploadedd,
  isLettersFromSchoolRespondent,
  isLettersFromSchoold,
  isMedicalRecordsUploadRespondent,
  isMedicalRecordsUploadd,
  isMedicalReportsUploadedRespondent,
  isMedicalReportsUploadedd,
  isPaternityDocUploadedRespondent,
  isPaternityDocUploadedd,
  isPreviousOrdersSubmittedRespondent,
  isPreviousOrdersSubmittedd,
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
    expect(actual.items).toHaveLength(16);
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
    expect(actual.items).toHaveLength(18);
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
    expect(actual.items).toHaveLength(14);
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
    expect(actual.items).toHaveLength(14);
  });
});

describe('testing all the additional function created as a part of applicant and respondent docs', () => {
  test('testing as a part of applicant docs', () => {
    const urlapplicant = '/applicant';
    expect(isMedicalReportsUploadedd(applicant_tasklist_items_all_docs_en, urlapplicant, true)).toEqual({
      id: 'medical_reports',
      text: applicant_tasklist_items_all_docs_en.medical_reports,
      href: urlapplicant + '/yourdocuments/alldocuments/medicalreports' + '?byApplicant=Yes',
    });
    expect(isPreviousOrdersSubmittedd(applicant_tasklist_items_all_docs_en, urlapplicant, true)).toEqual({
      id: 'previous_orders_submitted',
      text: applicant_tasklist_items_all_docs_en.previous_orders_submitted,
      href: urlapplicant + '/yourdocuments/alldocuments/previousorders' + '?byApplicant=Yes',
    });
    expect(isLettersFromSchoold(applicant_tasklist_items_all_docs_en, urlapplicant, true)).toEqual({
      id: 'letters_from_school',
      text: applicant_tasklist_items_all_docs_en.letters_from_school,

      href: urlapplicant + '/yourdocuments/alldocuments/lettersfromschool' + '?byApplicant=Yes',
    });
    expect(isDigitalDownloadsUploadedd(applicant_tasklist_items_all_docs_en, urlapplicant, true)).toEqual({
      id: 'digital_downloads',
      text: applicant_tasklist_items_all_docs_en.digital_downloads,
      href: urlapplicant + '/yourdocuments/alldocuments/digitaldownloads' + '?byApplicant=Yes',
    });
    expect(isMedicalRecordsUploadd(applicant_tasklist_items_all_docs_en, urlapplicant, true)).toEqual({
      id: 'medical_records',
      text: applicant_tasklist_items_all_docs_en.medical_records,
      href: urlapplicant + '/yourdocuments/alldocuments/medicalrecords' + '?byApplicant=Yes',
    });
    expect(isPaternityDocUploadedd(applicant_tasklist_items_all_docs_en, urlapplicant, true)).toEqual({
      id: 'paternity_test_reports',
      text: applicant_tasklist_items_all_docs_en.paternity_test_reports,
      href: urlapplicant + '/yourdocuments/alldocuments/paternity_test_reports' + '?byApplicant=Yes',
    });
    expect(isDrugDocUploadedd(applicant_tasklist_items_all_docs_en, urlapplicant, true)).toEqual({
      id: 'drug_alcohol_tests',
      text: applicant_tasklist_items_all_docs_en.drug_alcohol_tests,
      href: urlapplicant + '/yourdocuments/alldocuments/drug_alcohol_tests' + '?byApplicant=Yes',
    });
  });
  test('testing as a part of respondent docs', () => {
    const urlrespondent = '/respondent';
    expect(isPreviousOrdersSubmittedRespondent(applicant_tasklist_items_all_docs_en, urlrespondent, true)).toEqual({
      id: 'previous_orders_submitted_respondent',
      text: applicant_tasklist_items_all_docs_en.previous_orders_submitted_respondent,
      href: urlrespondent + '/yourdocuments/alldocuments/previousorders' + '?byApplicant=No',
    });
    expect(isLettersFromSchoolRespondent(applicant_tasklist_items_all_docs_en, urlrespondent, true)).toEqual({
      id: 'letters_from_school_respondent',
      text: applicant_tasklist_items_all_docs_en.letters_from_school_respondent,
      href: urlrespondent + '/yourdocuments/alldocuments/lettersfromschool' + '?byApplicant=No',
    });
    expect(isDigitalDownloadsUploadedRespondent(applicant_tasklist_items_all_docs_en, urlrespondent, true)).toEqual({
      id: 'digital_downloads_respondent',
      text: applicant_tasklist_items_all_docs_en.digital_downloads_respondent,
      href: urlrespondent + '/yourdocuments/alldocuments/digitaldownloads' + '?byApplicant=No',
    });
    expect(isMedicalRecordsUploadRespondent(applicant_tasklist_items_all_docs_en, urlrespondent, true)).toEqual({
      id: 'medical_records_respondent',
      text: applicant_tasklist_items_all_docs_en.medical_records_respondent,
      href: urlrespondent + '/yourdocuments/alldocuments/medicalrecords' + '?byApplicant=No',
    });
    expect(isMedicalReportsUploadedRespondent(applicant_tasklist_items_all_docs_en, urlrespondent, true)).toEqual({
      id: 'medical_reports_respondent',
      text: applicant_tasklist_items_all_docs_en.medical_reports_respondent,
      href: urlrespondent + '/yourdocuments/alldocuments/medicalreports' + '?byApplicant=No',
    });
    expect(isPaternityDocUploadedRespondent(applicant_tasklist_items_all_docs_en, urlrespondent, true)).toEqual({
      id: 'paternity_test_reports_respondent',
      text: applicant_tasklist_items_all_docs_en.paternity_test_reports_respondent,
      href: urlrespondent + '/yourdocuments/alldocuments/paternity_test_reports' + '?byApplicant=No',
    });
    expect(isDrugDocUploadedRespondent(applicant_tasklist_items_all_docs_en, urlrespondent, true)).toEqual({
      id: 'drug_alcohol_tests_respondent',
      text: applicant_tasklist_items_all_docs_en.drug_alcohol_tests_respondent,
      href: urlrespondent + '/yourdocuments/alldocuments/drug_alcohol_tests' + '?byApplicant=No',
    });
  });
});
