import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { YesNoDontKnow } from '../../../../../app/case/definition';

import { applicant_all_docs_en } from './section-titles-all-documents';
import { applicant_tasklist_items_all_docs_en } from './tasklist-items-all-documents';
import {
  generateApplicantTaskListAllDocuments,
  getApplicantDocuments,
  getApplicantResponseToAohAndViolence,
  getOtherDocuments,
  getRespondentDocuments,
  getResponseToAohAndViolence,
  getResponseToCA,
  getUpdatedFlags,
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
  // getApplicantResponseToAohAndViolence,
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
          documentType: 'Previous orders submitted with application',
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
          documentType: 'Emails, screenshots, images and other media files',
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
          documentType: 'Tenancy and mortgage agreements',
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
    expect(actual.items).toHaveLength(17);
  });

  test('getApplicantDocuments for applicant, CA1', async () => {
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
    req.session.userCase.c1ADocument = {
      document_url: '',
      document_filename: '',
      document_binary_url: '',
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

  test('getApplicantDocuments for applicant, DA with respondent', async () => {
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
      false
    );
    expect(actual.title).toEqual(applicant_all_docs_en.applicantsDocuments);
    expect(actual.items).toHaveLength(15);
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
          documentType: 'Previous orders submitted with application',
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
          documentType: 'Emails, screenshots, images and other media files',
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
          documentType: 'Tenancy and mortgage agreements',
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

  test('getApplicantDocuments for respondent, CA2', async () => {
    req.session.userCase.caseTypeOfApplication = 'C100';
    req.session.userCase.citizenResponseC7DocumentList = [
      {
        id: 'string',
        value: {
          partyName: 'string',
          createdBy: 'string',
          dateCreated: new Date(),
          citizenDocument: {
            document_url: 'string',
            document_filename: 'string',
            document_binary_url: 'string',
            document_hash: 'string',
          },
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

  test('getApplicantDocuments for respondent, DO_NOT_SHOW', async () => {
    req.session.userCase.caseTypeOfApplication = 'DO_NOT_SHOW';
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
    // expect(actual.title).toEqual(applicant_all_docs_en.respondentsDocuments);
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

  test('testing getOtherDocuments for url not as applicant', async () => {
    req.url = '';
    req.session.userCase.previousOrOngoingProceedingsForChildren = YesNoDontKnow.yes;
    const actual = getOtherDocuments(
      applicant_all_docs_en,
      applicant_tasklist_items_all_docs_en,
      req.session.userCase,
      'Hello'
    );
    expect(actual.title).toEqual(applicant_all_docs_en.otherDocuments);
  });

  test('testing getUpdatedFlags', async () => {
    req.url = '';
    req.session.userCase.previousOrOngoingProceedingsForChildren = YesNoDontKnow.yes;
    const actual = getUpdatedFlags(
      {
        id: 'adfs',
        value: {
          documentType: 'heavy',
        },
      },
      {}
    );
    expect(actual).toEqual(undefined);
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

  test('getResponseToCA CA', async () => {
    const req = mockRequest();
    req.session.userCase.respondent = [
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
    const respodoclist = [];

    expect(
      getResponseToCA(req.session.userCase.respondent, applicant_tasklist_items_all_docs_en, respodoclist)
    ).toEqual({});
  });
  test('getResponseToCA', async () => {
    const req = mockRequest();
    req.session.userCase.respondent = {
      id: '310f3f16-7425-4680-8054-92f3a01ab923',
      value: {
        user: {
          email: null,
          idamId: null,
        },
        lastName: 'Solicitor',
        firstName: 'AAT',
      },
    };
    const respodoclist = [
      {
        id: '123',
        value: {
          partyName: 'AAT Solicitor',
          createdBy: 'string',
          dateCreated: '20-03-1998',
          citizenDocument: {
            document_url: 'string',
            document_filename: 'string',
            document_binary_url: 'string',
            document_hash: 'string',
          },
        },
      },
      {},
    ];
    const obj1 = {
      href: '/applicant/yourdocuments/alldocuments/caresponse/310f3f16-7425-4680-8054-92f3a01ab923',
      id: 'respondent_response_to_request_for_child_arrangements',
      text: "AAT Solicitor's response to the request for child arrangements",
    };

    expect(
      getResponseToCA(req.session.userCase.respondent, applicant_tasklist_items_all_docs_en, respodoclist)
    ).toEqual(obj1);
  });

  test('getResponseToAohAndViolence', async () => {
    const req = mockRequest();
    req.session.userCase.respondent = {
      id: '310f3f16-7425-4680-8054-92f3a01ab923',
      value: {
        user: {
          email: null,
          idamId: null,
        },
        lastName: 'Solicitor',
        firstName: 'AAT',
      },
    };
    const respodoclist = [];
    const obj1 = {
      href: '#',
      id: 'respondent_response_to_allegations_of_harm_and_violence',
      text: "AAT Solicitor's response to the allegations of harm and violence",
    };

    expect(
      getResponseToAohAndViolence(req.session.userCase.respondent, applicant_tasklist_items_all_docs_en, respodoclist)
    ).toEqual(obj1);
  });

  test('getApplicantResponseToAohAndViolence', async () => {
    const req = mockRequest();
    req.session.userCase.applicant = {
      id: '310f3f16-7425-4680-8054-92f3a01ab923',
      value: {
        user: {
          email: null,
          idamId: null,
        },
        lastName: 'Solicitor',
        firstName: 'AAT',
      },
    };
    const obj1 = {
      href: '/applicant/yourdocuments/alldocuments/respond_others_allegation_of_harm_and_violence',
      id: 'applicant_response_to_other_side_allegation_of_harm',
      text: "AAT Solicitor's response to the other side's allegations of harm or violence",
    };

    expect(
      getApplicantResponseToAohAndViolence(req.session.userCase.applicant, applicant_tasklist_items_all_docs_en)
    ).toEqual(obj1);
  });
});
