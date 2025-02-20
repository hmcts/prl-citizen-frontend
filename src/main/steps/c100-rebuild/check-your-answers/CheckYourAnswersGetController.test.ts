import axios from 'axios';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CaseApi } from '../../../app/case/C100CaseApi';
import { FieldPrefix } from '../../../app/case/case';
import { Gender } from '../../../app/case/definition';

import CheckYourAnswersGetController from './CheckYourAnswersGetController';

jest.mock('axios');
jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);
let req;
let res;

const updateCaserMock = jest.spyOn(CaseApi.prototype, 'saveC100DraftApplication');

describe('DocumentUpload Get Controller', () => {
  const controller = new CheckYourAnswersGetController('page', () => ({}), FieldPrefix.APPLICANT);
  beforeEach(() => {
    jest.clearAllMocks;
    req = mockRequest();
    res = mockResponse();
    req.session.save = jest.fn();
    req.locals.C100Api.saveC100DraftApplication = jest.fn();
    updateCaserMock.mockResolvedValue(req.session.userCase);
  });

  afterEach(() => {
    updateCaserMock.mockClear();
    jest.clearAllMocks;
  });

  test('should clear hwf reference number if need help with fees is no', async () => {
    req.session.userCase = {
      ...req.session.userCase,
      hwf_needHelpWithFees: 'No',
      helpWithFeesReferenceNumber: 'HWF-1234',
    };
    updateCaserMock.mockResolvedValueOnce(req.session.userCase);

    await controller.get(req, res);
    expect(req.session.save).toHaveBeenCalled();
    expect(req.session.userCase.helpWithFeesReferenceNumber).toBeUndefined();
  });

  test('should not generate errors when all mandatory fields are filled', async () => {
    req.session.userCase = {
      ...req.session.userCase,
      c100RebuildChildPostCode: 'postcode',
      sq_writtenAgreement: 'No',
      sq_legalRepresentation: 'No',
      sq_courtPermissionRequired: 'Yes',
      sq_permissionsRequest: 'test',
      too_courtOrder: ['stopOtherPeopleDoingSomething'],
      too_stopOtherPeopleDoingSomethingSubField: ['test'],
      too_shortStatement: 'Test',
      op_childrenInvolvedCourtCase: 'Yes',
      op_courtOrderProtection: 'Yes',
      op_courtProceedingsOrders: ['childArrangementOrder'],
      hwn_hearingPart1: 'Yes',
      hu_urgentHearingReasons: 'Yes',
      hu_reasonOfUrgentHearing: ['riskOfSafety'],
      hu_hearingWithNext48HrsDetails: 'test',
      hu_hearingWithNext48HrsMsg: 'test',
      hu_otherRiskDetails: 'test',
      hu_timeOfHearingDetails: 'test',
      hwn_doYouNeedAWithoutNoticeHearing: 'Yes',
      hwn_doYouNeedAWithoutNoticeHearingDetails: 'test',
      hwn_doYouRequireAHearingWithReducedNotice: 'Yes',
      hwn_doYouRequireAHearingWithReducedNoticeDetails: 'test',
      hwn_reasonsForApplicationWithoutNotice: 'Yes',
      c1A_haveSafetyConcerns: 'Yes',
      c1A_safetyConernAbout: ['child'],
      c1A_concernAboutChild: ['abduction'],
      c1A_abductionReasonOutsideUk: 'Yes',
      c1A_childsCurrentLocation: 'Yes',
      c1A_otherConcernsDrugs: 'Yes',
      c1A_otherConcernsDrugsDetails: 'test',
      c1A_childSafetyConcerns: 'Yes',
      c1A_childSafetyConcernsDetails: 'test',
      c1A_keepingSafeStatements: 'Yes',
      c1A_supervisionAgreementDetails: 'Yes',
      c1A_agreementOtherWaysDetails: 'Yes',
      c1A_keepingSafeStatement: 'test',
      c1A_passportOffice: 'Yes',
      c1A_childrenMoreThanOnePassport: 'Yes',
      c1A_possessionChildrenPassport: ['Father'],
      c1A_abductionPassportOfficeNotified: 'Yes',
      c1A_provideOtherDetails: 'test',
      c1A_safteyConcerns: { child: { physicalAbuse: {} } },
      c1A_childAbductedBefore: 'No',
      ie_internationalStart: 'Yes',
      ie_provideDetailsStart: 'test',
      ie_internationalParents: 'Yes',
      ie_provideDetailsParents: 'test',
      ie_internationalJurisdiction: 'Yes',
      ie_provideDetailsJurisdiction: 'test',
      ie_internationalRequest: 'Yes',
      ie_provideDetailsRequest: 'test',
      ra_typeOfHearing: ['videoHearing'],
      ra_languageNeeds: ['speakInWelsh'],
      ra_specialArrangements: ['separateWaitingRoom'],
      ra_disabilityRequirements: ['documentsHelp'],
      ra_documentInformation: ['specifiedColorDocuments'],
      ra_specifiedColorDocuments_subfield: 'Test',
      miam_otherProceedings: 'No',
      miam_consent: 'Yes',
      miam_attendance: 'No',
      miam_validReason: 'Yes',
      miam_nonAttendanceReasons: ['domesticViolence'],
      miam_domesticAbuse: ['policeInvolvement'],
      miam_domesticAbuse_policeInvolvement_subfields: ['evidenceOfSomeoneArrest'],
      miam_canProvideDomesticAbuseEvidence: 'Yes',
      ocd_hasOtherChildren: 'Yes',
      cd_childrenKnownToSocialServices: 'Yes',
      cd_childrenKnownToSocialServicesDetails: 'test',
      cd_childrenSubjectOfProtectionPlan: 'Yes',
      oprs_otherPersonCheck: 'Yes',
      oprs_otherPersons: [
        {
          id: '3b32bc4f-7417-443b-ba94-5eacfcee04c4',
          firstName: 'Respondent',
          lastName: 'FirstPage',
          personalDetails: {
            hasNameChanged: 'No',
            dateOfBirth: {
              year: '1999',
              month: '01',
              day: '11',
            },
            gender: 'Male',
            isDateOfBirthUnknown: 'No',
          },
          contactDetails: {},
          liveInRefuge: 'Yes',
          refugeConfidentialityC8Form: {
            document_url: 'test',
            document_filename: 'test',
            document_binary_url: 'test/binary',
          },
          relationshipDetails: {
            relationshipToChildren: [
              {
                childId: '39bc0ed2-503e-4d6e-a957-b57e8f35bc70',
                relationshipType: 'Grandparent',
                otherRelationshipTypeDetails: '',
              },
            ],
          },
          addressUnknown: 'Yes',
          isOtherPersonAddressConfidential: 'Yes',
        },
      ],
      cd_children: [
        {
          id: '39bc0ed2-503e-4d6e-a957-b57e8f35bc70',
          firstName: 'Nir',
          lastName: 'Sin',
          personalDetails: {
            isDateOfBirthUnknown: 'No',
            dateOfBirth: {
              year: '1999',
              month: '11',
              day: '11',
            },
            gender: 'Female',
          },
          childMatters: {
            needsResolution: ['whoChildLiveWith'],
          },
          parentialResponsibility: {
            statement: 'test',
          },
          liveWith: [{ id: '3b32bc4f-7417-443b-ba94-5eacfcee04c4' }],
          mainlyLiveWith: '3b32bc4f-7417-443b-ba94-5eacfcee04c4',
        },
      ],
      ocd_otherChildren: [
        {
          firstName: 'test',
          lastName: 'test',
          personalDetails: {
            isDateOfBirthUnknown: 'No',
            dateOfBirth: {
              year: '1999',
              month: '11',
              day: '11',
            },
            gender: 'Female',
          },
        },
      ],
      appl_allApplicants: [
        {
          applicantFirstName: 'test',
          applicantLastName: 'test',
          detailsKnown: 'Yes',
          start: 'Yes',
          contactDetailsPrivate: ['phone'],
          personalDetails: {
            haveYouChangeName: 'No',
            dateOfBirth: {
              year: '2020',
              month: '1',
              day: '1',
            },
            gender: Gender.FEMALE,
            applicantPlaceOfBirth: 'test',
          },
          liveInRefuge: 'No',
          applicantAddress1: 'test',
          applicantAddressTown: 'test',
          country: 'test',
          applicantAddressHistory: 'No',
          applicantContactDetail: {
            canProvideEmail: 'Yes',
            emailAddress: 'test@test.com',
            canProvideTelephoneNumber: 'Yes',
            telephoneNumber: '01234567891',
            canLeaveVoiceMail: 'Yes',
            applicantContactPreferences: 'email',
          },
          relationshipDetails: {
            relationshipToChildren: ['test'],
          },
          id: '123',
        },
      ],
      resp_Respondents: [
        {
          firstName: 'test',
          lastName: 'test',
          detailsKnown: 'Yes',
          start: 'Yes',
          contactDetailsPrivate: ['phone'],
          personalDetails: {
            hasNameChanged: 'No',
            dateOfBirth: {
              year: '2020',
              month: '1',
              day: '1',
            },
            gender: Gender.FEMALE,
            applicantPlaceOfBirth: 'test',
          },
          address: {
            AddressLine1: 'test',
            PostTown: 'test',
            Country: 'test',
            addressHistory: 'No',
          },
          addressUnknown: undefined,
          contactDetails: {
            donKnowEmailAddress: undefined,
            emailAddress: 'test@test.com',
            donKnowTelephoneNumber: undefined,
            telephoneNumber: '01234567891',
          },
          relationshipDetails: {
            relationshipToChildren: ['test'],
          },
          id: '123',
        },
      ],
      op_otherProceedings: {},
      hwf_needHelpWithFees: 'No',
      helpWithFeesReferenceNumber: 'HWF-1234',
    };
    req.session.enableC100CaseProgressionTrainTrack = true;
    req.locals.C100Api.saveC100DraftApplication = jest.fn();
    updateCaserMock.mockResolvedValue(req.session.userCase);

    await controller.get(req, res);
    expect(req.session.applicationSettings.hasC100ApplicationBeenCompleted).toBe(true);
    expect(req.session.errors).toStrictEqual([]);
    expect(req.session.save).toHaveBeenCalled();
  });

  test('should generate errors when all mandatory fields are not filled', async () => {
    req.locals.C100Api.saveC100DraftApplication = jest.fn();
    updateCaserMock.mockResolvedValue(req.session.userCase);

    await controller.get(req, res);
    expect(req.session.errors).toStrictEqual([
      {
        errorType: 'required',
        propertyName: 'c100RebuildChildPostCode',
      },
      {
        errorType: 'required',
        propertyName: 'sq_writtenAgreement',
      },
      {
        errorType: 'required',
        propertyName: 'too_courtOrder',
      },
      {
        errorType: 'required',
        propertyName: 'too_shortStatement',
      },
      {
        errorType: 'required',
        propertyName: 'op_childrenInvolvedCourtCase',
      },
      {
        errorType: 'required',
        propertyName: 'op_courtOrderProtection',
      },
      {
        errorType: 'required',
        propertyName: 'hu_urgentHearingReasons',
      },
      {
        errorType: 'required',
        propertyName: 'hwn_reasonsForApplicationWithoutNotice',
      },
      {
        errorType: 'required',
        propertyName: 'c1A_haveSafetyConcerns',
      },
      {
        errorType: 'required',
        propertyName: 'ie_internationalStart',
      },
      {
        errorType: 'required',
        propertyName: 'ie_internationalParents',
      },
      {
        errorType: 'required',
        propertyName: 'ie_internationalJurisdiction',
      },
      {
        errorType: 'required',
        propertyName: 'ie_internationalRequest',
      },
      {
        errorType: 'required',
        propertyName: 'ra_typeOfHearing',
      },
      {
        errorType: 'required',
        propertyName: 'ra_languageNeeds',
      },
      {
        errorType: 'required',
        propertyName: 'ra_specialArrangements',
      },
      {
        errorType: 'required',
        propertyName: 'ra_disabilityRequirements',
      },
      {
        errorType: 'required',
        propertyName: 'hwf_needHelpWithFees',
      },
      {
        errorType: 'required',
        propertyName: 'miam_otherProceedings',
      },
      {
        errorType: 'required',
        propertyName: 'ocd_hasOtherChildren',
      },
      {
        errorType: 'required',
        propertyName: 'cd_childrenKnownToSocialServices',
      },
      {
        errorType: 'required',
        propertyName: 'cd_childrenSubjectOfProtectionPlan',
      },
      {
        errorType: 'required',
        propertyName: 'oprs_otherPersonCheck',
      },
    ]);
    expect(req.session.save).toHaveBeenCalled();
  });

  test('should generate errors for mandatory subfields', async () => {
    req.locals.C100Api.saveC100DraftApplication = jest.fn();
    updateCaserMock.mockResolvedValue(req.session.userCase);
    req.session.userCase = {
      ...req.session.userCase,
      sq_writtenAgreement: 'No',
      sq_legalRepresentation: 'No',
      sq_courtPermissionRequired: 'Yes',
      sq_permissionsWhy: ['doNotHaveParentalResponsibility'],
      sq_doNotHaveParentalResponsibility_subfield: undefined,
      miam_otherProceedings: 'No',
      miam_consent: 'Yes',
      miam_attendance: 'No',
      miam_validReason: 'Yes',
      miam_nonAttendanceReasons: ['domesticViolence'],
      miam_domesticAbuse: ['policeInvolvement'],
      miam_domesticAbuse_policeInvolvement_subfields: [],
      too_courtOrder: ['stopOtherPeopleDoingSomething'],
      too_stopOtherPeopleDoingSomethingSubField: [],
    };
    await controller.get(req, res);
    expect(req.session.errors).toContainEqual({ errorType: 'required', propertyName: 'sq_permissionsWhy' });
    expect(req.session.errors).toContainEqual({ errorType: 'required', propertyName: 'miam_domesticAbuse' });
    expect(req.session.errors).toContainEqual({ errorType: 'required', propertyName: 'too_courtOrder' });
  });

  test('should catch errors and set payment error for successful payment', async () => {
    req.session.userCase.paymentSuccessDetails = {
      amount: 'MOCK_AMOUNT',
      reference: 'REFERENCE',
      ccd_case_number: '0123456789',
      case_reference: '0123456789',
      channel: 'CHANNEL',
      method: 'METHOD',
      status: 'success',
      external_reference: 'EXTERNAL_REFERENCE',
      payment_group_reference: 'PAYMENT_GROUP_REFERENCE',
    };
    req.session.paymentError = { hasError: false, errorContext: null };
    req.locals.C100Api.saveC100DraftApplication.mockImplementation(() => {
      throw new Error();
    });

    await controller.get(req, res);
    expect(req.session.paymentError).toStrictEqual({ hasError: true, errorContext: 'applicationNotSubmitted' });
  });

  test('should catch errors and set payment error for unsuccessful payment', async () => {
    req.session.userCase.paymentSuccessDetails = {
      amount: 'MOCK_AMOUNT',
      reference: 'REFERENCE',
      ccd_case_number: '0123456789',
      case_reference: '0123456789',
      channel: 'CHANNEL',
      method: 'METHOD',
      status: 'failure',
      external_reference: 'EXTERNAL_REFERENCE',
      payment_group_reference: 'PAYMENT_GROUP_REFERENCE',
    };
    req.session.paymentError = { hasError: false, errorContext: null };
    req.locals.C100Api.saveC100DraftApplication.mockImplementation(() => {
      throw new Error();
    });

    await controller.get(req, res);
    expect(req.session.paymentError).toStrictEqual({ hasError: true, errorContext: 'defaultPaymentError' });
    expect(req.session.save).toHaveBeenCalled();
  });
});
