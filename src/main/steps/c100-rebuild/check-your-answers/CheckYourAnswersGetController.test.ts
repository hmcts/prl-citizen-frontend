import axios from 'axios';

import { checkYourAnswerFlow1 } from '../../../../test/unit/mocks/mocked-requests/check-your-answer-flow-1-mock';
import { checkYourAnswerFlow2 } from '../../../../test/unit/mocks/mocked-requests/check-your-answer-flow-2-mock';
import { checkYourAnswerFlow3 } from '../../../../test/unit/mocks/mocked-requests/check-your-answer-flow-3-mock';
import { checkYourAnswerFlow4 } from '../../../../test/unit/mocks/mocked-requests/check-your-answer-flow-4-mock';
import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CaseApi } from '../../../app/case/C100CaseApi';
import { FieldPrefix } from '../../../app/case/case';

import CheckYourAnswersGetController from './CheckYourAnswersGetController';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);
const req = mockRequest();
const res = mockResponse();

const updateCaserMock = jest.spyOn(CaseApi.prototype, 'updateCase');

describe('DocumentUpload Get Controller', () => {
  const controller = new CheckYourAnswersGetController('page', () => ({}), FieldPrefix.APPLICANT);
  beforeEach(() => {
    jest.clearAllMocks;
    updateCaserMock.mockResolvedValue(req.session.userCase);
  });

  afterEach(() => {
    updateCaserMock.mockClear();
    jest.clearAllMocks;
  });

  test('Should update the before loading Check your answers screen', async () => {
    req.session.userCase.caseId = '1111';
    await controller.get(req, res);

    expect(req.session.userCase.caseId).toEqual('1111');
  });

  test('checkYourAnswerFlow1', async () => {
    const reqs = checkYourAnswerFlow1;
    await controller.get(reqs, res);
    expect(reqs.session.userCase).toEqual({
      caseId: 1669809594776886,
      caseTypeOfApplication: 'C100',
      applicantCaseName: 'Case1',
      saveAndContinue: 'true',
      c100RebuildChildPostCode: 'IG11NB',
      sq_writtenAgreement: 'Yes',
      too_courtOrder: ['whoChildLiveWith'],
      onlycontinue: 'true',
      too_shortStatement: 'ok',
      co_certificate: {
        id: 'b63fe8ad-58ea-4426-9b58-67f4edc1d444',
        url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/b63fe8ad-58ea-4426-9b58-67f4edc1d444',
        filename: 'applicant__consent_order_draft__30112022.pdf',
        binaryUrl:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/b63fe8ad-58ea-4426-9b58-67f4edc1d444/binary',
      },
      hu_urgentHearingReasons: 'Yes',
      hu_reasonOfUrgentHearing: ['riskOfSafety'],
      hu_otherRiskDetails: 'OK',
      hu_timeOfHearingDetails: 'LONDON',
      hu_hearingWithNext48HrsDetails: 'Yes',
      hu_hearingWithNext48HrsMsg: 'OK',
      hwn_hearingPart1: 'Yes',
      hwn_reasonsForApplicationWithoutNotice: 'OK',
      hwn_doYouNeedAWithoutNoticeHearing: 'No',
      hwn_doYouRequireAHearingWithReducedNotice: 'No',
      c100TempFirstName: '',
      c100TempLastName: '',
      cd_children: [
        {
          id: 'f0d593f4-d937-405d-8c9d-eb8f23af7c6d',
          firstName: 'CHILD1',
          lastName: 'LCHILD1',
          personalDetails: {
            dateOfBirth: {
              year: '1999',
              month: '11',
              day: '11',
            },
            isDateOfBirthUnknown: '',
            approxDateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            gender: 'Female',
            otherGenderDetails: '',
          },
          childMatters: {
            needsResolution: 'whoChildLiveWith',
          },
          parentialResponsibility: {
            statement: 'MOTHER,FATHER',
          },
          liveWith: [
            {
              id: '3c9b1637-32fe-41c0-8671-409e1ea05c4c',
              firstName: 'Applicant1',
              lastName: 'Applicant1',
              partyType: 'applicant',
            },
          ],
        },
      ],
      cd_childrenKnownToSocialServices: 'No',
      cd_childrenSubjectOfProtectionPlan: 'No',
      ocd_hasOtherChildren: 'No',
      appl_allApplicants: [
        {
          id: '3c9b1637-32fe-41c0-8671-409e1ea05c4c',
          applicantFirstName: 'Applicant1',
          applicantLastName: 'Applicant1',
          detailsKnown: 'No',
          startAlternative: 'No',
          start: '',
          contactDetailsPrivate: [],
          contactDetailsPrivateAlternative: [],
          relationshipDetails: {
            relationshipToChildren: [
              {
                childId: 'f0d593f4-d937-405d-8c9d-eb8f23af7c6d',
                relationshipType: 'Mother',
                otherRelationshipTypeDetails: '',
              },
            ],
          },
          personalDetails: {
            haveYouChangeName: 'No',
            applPreviousName: '',
            dateOfBirth: {
              year: '1981',
              month: '01',
              day: '21',
            },
            gender: 'Male',
            otherGenderDetails: '',
            applicantPlaceOfBirth: 'UK',
          },
          applicantContactDetail: {
            canProvideEmail: 'No',
            emailAddress: '',
            canProvideTelephoneNumber: 'Yes',
            telephoneNumber: '+447205338712',
            canNotProvideTelephoneNumberReason: '',
            canLeaveVoiceMail: 'Yes',
          },
          applicantAddressPostcode: 'B43 6QH',
          applicantAddress1: '46 CHATSWORTH AVENUE',
          applicantAddress2: '',
          applicantAddressTown: 'BIRMINGHAM',
          applicantAddressCounty: 'SANDWELL',
          country: 'United Kingdom',
          applicantSelectedAddress: 0,
          applicantAddressHistory: 'Yes',
          applicantProvideDetailsOfPreviousAddresses: '',
        },
      ],
      resp_Respondents: [
        {
          id: '8a225ac8-71b3-4be4-907d-e89d659a1e45',
          firstName: 'Respondent',
          lastName: 'FirstPage',
          personalDetails: {
            dateOfBirth: {
              year: '1972',
              month: '2',
              day: '23',
            },
            isDateOfBirthUnknown: '',
            approxDateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            gender: 'Male',
            otherGenderDetails: '',
            hasNameChanged: 'no',
            previousFullName: '',
            respondentPlaceOfBirth: 'Glasgow',
            respondentPlaceOfBirthUnknown: 'No',
          },
          address: {
            AddressLine1: '',
            AddressLine2: '',
            PostTown: '',
            County: '',
            PostCode: 'IG11GB',
            Country: 'United Kingdom',
            addressHistory: 'yes',
            provideDetailsOfPreviousAddresses: '',
          },
          relationshipDetails: {
            relationshipToChildren: [
              {
                childId: 'f0d593f4-d937-405d-8c9d-eb8f23af7c6d',
                relationshipType: 'Father',
                otherRelationshipTypeDetails: '',
              },
            ],
          },
          contactDetails: {
            emailAddress: 'abc@gmail.com',
            telephoneNumber: '+447205328723',
          },
          addressUnknown: 'Yes',
        },
      ],
      oprs_otherPersonCheck: 'Yes',
      oprs_otherPersons: [
        {
          id: '8023cd9c-58bc-4311-8ec3-5315e64d39fe',
          firstName: 'Person1',
          lastName: 'Person1LastName',
          personalDetails: {
            dateOfBirth: {
              year: '1993',
              month: '10',
              day: '21',
            },
            isDateOfBirthUnknown: '',
            approxDateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            gender: 'Female',
            otherGenderDetails: '',
            hasNameChanged: 'no',
            previousFullName: '',
          },
          address: {
            AddressLine1: '',
            AddressLine2: '',
            PostTown: '',
            County: '',
            PostCode: '',
            Country: 'United Kingdom',
          },
          relationshipDetails: {
            relationshipToChildren: [
              {
                childId: 'f0d593f4-d937-405d-8c9d-eb8f23af7c6d',
                relationshipType: 'Mother',
                otherRelationshipTypeDetails: '',
              },
            ],
          },
          contactDetails: {
            donKnowEmailAddress: 'No',
            emailAddress: '',
            telephoneNumber: '',
            donKnowTelephoneNumber: 'No',
          },
          addressUnknown: 'Yes',
        },
      ],
      op_childrenInvolvedCourtCase: 'Yes',
      op_courtOrderProtection: 'Yes',
      op_courtProceedingsOrders: ['careOrder', 'occupationOrder'],
      op_otherProceedings: {
        order: {
          careOrders: [
            {
              id: '1',
              orderDetail: '',
              caseNo: '',
              orderDate: {
                year: '',
                month: '',
                day: '',
              },
              currentOrder: '',
              orderEndDate: {
                year: '',
                month: '',
                day: '',
              },
              orderCopy: '',
            },
          ],
          occupationOrders: [
            {
              id: '1',
              orderDetail: 'c11234',
              caseNo: 'BS19F99999',
              orderDate: {
                year: '',
                month: '',
                day: '',
              },
              currentOrder: '',
              orderEndDate: {
                year: '',
                month: '',
                day: '',
              },
              orderCopy: '',
            },
          ],
        },
      },
      c1A_haveSafetyConcerns: 'Yes',
      c1A_safetyConernAbout: ['children'],
      c1A_concernAboutChild: ['physicalAbuse', 'emotionalAbuse'],
      c1A_safteyConcerns: {
        child: {
          physicalAbuse: {
            behaviourDetails: '',
            behaviourStartDate: '',
            seekHelpDetails: '',
          },
          emotionalAbuse: {
            childrenConcernedAbout: 'f0d593f4-d937-405d-8c9d-eb8f23af7c6d',
            behaviourDetails: '',
            behaviourStartDate: '',
            isOngoingBehaviour: 'Yes',
            seekHelpFromPersonOrAgency: 'No',
            seekHelpDetails: '',
          },
        },
      },
      c1A_otherConcernsDrugs: 'No',
      c1A_childSafetyConcerns: 'No',
      c1A_keepingSafeStatement: 'ok',
      c1A_supervisionAgreementDetails: 'Yes',
      c1A_agreementOtherWaysDetails: 'Yes',
      ie_internationalStart: 'No',
      ie_internationalParents: 'Yes',
      ie_provideDetailsParents: 'Scotland',
      ie_internationalJurisdiction: 'No',
      ie_internationalRequest: 'Yes',
      ie_provideDetailsRequest: 'child details',
      ra_typeOfHearing: ['videoHearing'],
      ra_languageNeeds: ['speakInWelsh'],
      ra_specialArrangements: ['separateWaitingRoom'],
      ra_disabilityRequirements: ['documentsHelp'],
      ra_documentInformation: ['audioTranslationDocuments'],
      c100ApplicationFees: '232.00',
      hwf_needHelpWithFees: 'No',
    });
    expect(reqs.originalUrl).toEqual('/request');
  });

  test('checkYourAnswerFlow2', async () => {
    const reqs = checkYourAnswerFlow2;
    await controller.get(reqs, res);
    expect(reqs.session.userCase).toEqual({
      caseId: 1669813571660782,
      caseTypeOfApplication: 'C100',
      applicantCaseName: 'Case2',
      saveAndContinue: 'true',
      c100RebuildChildPostCode: 'B436QH',
      sq_writtenAgreement: 'No',
      sq_alternativeRoutes: 'No',
      sq_legalRepresentation: 'Yes',
      sq_legalRepresentationApplication: 'No',
      sq_courtPermissionRequired: 'Yes',
      onlycontinue: 'true',
      sq_permissionsWhy: ['doNotHaveParentalResponsibility'],
      sq_doNotHaveParentalResponsibility_subfield: 'ok',
      sq_permissionsRequest: 'Court orders',
      miam_otherProceedings: 'Yes',
      op_childrenInvolvedCourtCase: 'Yes',
      op_courtOrderProtection: 'Yes',
      op_courtProceedingsOrders: ['supervisionOrder', 'childAbductionOrder'],
      op_otherProceedings: {
        order: {
          supervisionOrders: [
            {
              id: '1',
              orderDetail: 'c2222',
              caseNo: 'CN2222',
              orderDate: {
                year: '',
                month: '',
                day: '',
              },
              currentOrder: '',
              orderEndDate: {
                year: '',
                month: '',
                day: '',
              },
              orderCopy: '',
            },
          ],
          childAbductionOrders: [
            {
              id: '1',
              orderDetail: 'c2222',
              caseNo: 'CN2222',
              orderDate: {
                year: '2011',
                month: '11',
                day: '11',
              },
              currentOrder: 'No',
              orderEndDate: {
                year: '2022',
                month: '11',
                day: '11',
              },
              orderCopy: 'No',
            },
          ],
        },
      },
      too_courtOrder: ['whoChildLiveWith'],
      too_shortStatement: 'child live with',
      hu_urgentHearingReasons: 'No',
      hwn_hearingPart1: 'No',
      c100TempFirstName: '',
      c100TempLastName: '',
      cd_children: [
        {
          id: '85924a64-6aa7-4a60-8b1b-a09283ab9aaf',
          firstName: 'child1',
          lastName: 'child1',
          personalDetails: {
            dateOfBirth: {
              year: '2001',
              month: '01',
              day: '11',
            },
            isDateOfBirthUnknown: '',
            approxDateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            gender: 'Male',
            otherGenderDetails: '',
          },
          childMatters: {
            needsResolution: 'whoChildLiveWith',
          },
          parentialResponsibility: {
            statement: 'MOTHER,FATHER',
          },
          liveWith: [
            {
              id: 'fe44b6fb-1fd2-4f2d-8747-850128a426f6',
              firstName: 'Applicant1',
              lastName: 'Applicant1',
              partyType: 'applicant',
            },
          ],
        },
      ],
      cd_childrenKnownToSocialServices: 'No',
      cd_childrenSubjectOfProtectionPlan: 'Yes',
      ocd_hasOtherChildren: 'No',
      appl_allApplicants: [
        {
          id: 'fe44b6fb-1fd2-4f2d-8747-850128a426f6',
          applicantFirstName: 'Applicant1',
          applicantLastName: 'Applicant1',
          detailsKnown: 'Yes',
          startAlternative: '',
          start: 'Yes',
          contactDetailsPrivate: ['address'],
          contactDetailsPrivateAlternative: [],
          relationshipDetails: {
            relationshipToChildren: [
              {
                childId: '85924a64-6aa7-4a60-8b1b-a09283ab9aaf',
                relationshipType: 'Grandparent',
                otherRelationshipTypeDetails: '',
              },
            ],
          },
          personalDetails: {
            haveYouChangeName: 'No',
            applPreviousName: '',
            dateOfBirth: {
              year: '1993',
              month: '01',
              day: '11',
            },
            gender: 'Male',
            otherGenderDetails: '',
            applicantPlaceOfBirth: 'UK',
          },
          applicantContactDetail: {
            canProvideEmail: 'No',
            emailAddress: '',
            canProvideTelephoneNumber: 'Yes',
            telephoneNumber: '+447205308786',
            canNotProvideTelephoneNumberReason: '',
            canLeaveVoiceMail: 'No',
          },
          applicantAddressPostcode: 'B436QH',
          applicantAddress1: 'Flat 54',
          applicantAddress2: '',
          applicantAddressTown: 'London',
          applicantAddressCounty: '',
          applicantAddressHistory: 'Yes',
          applicantProvideDetailsOfPreviousAddresses: '',
          country: 'United Kingdom',
        },
      ],
      resp_Respondents: [
        {
          id: 'b87de500-23ad-4410-aeb5-3ad6c1277c28',
          firstName: 'Respondent2',
          lastName: 'Respondent2',
          personalDetails: {
            dateOfBirth: {
              year: '1993',
              month: '01',
              day: '21',
            },
            isDateOfBirthUnknown: '',
            approxDateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            gender: 'Male',
            otherGenderDetails: '',
            hasNameChanged: 'no',
            previousFullName: '',
            respondentPlaceOfBirth: 'place',
            respondentPlaceOfBirthUnknown: 'No',
          },
          address: {
            AddressLine1: '',
            AddressLine2: '',
            PostTown: '',
            County: '',
            PostCode: '',
            Country: 'United Kingdom',
            addressHistory: 'dontKnow',
            provideDetailsOfPreviousAddresses: '',
          },
          relationshipDetails: {
            relationshipToChildren: [
              {
                childId: '85924a64-6aa7-4a60-8b1b-a09283ab9aaf',
                relationshipType: 'Grandparent',
                otherRelationshipTypeDetails: '',
              },
            ],
          },
          contactDetails: {
            donKnowEmailAddress: 'Yes',
            emailAddress: '',
            telephoneNumber: '',
            donKnowTelephoneNumber: 'Yes',
          },
          addressUnknown: 'Yes',
        },
      ],
      oprs_otherPersonCheck: 'No',
      c1A_haveSafetyConcerns: 'Yes',
      c1A_safetyConernAbout: ['children'],
      c1A_concernAboutChild: ['physicalAbuse', 'sexualAbuse'],
      c1A_safteyConcerns: {
        child: {
          physicalAbuse: {
            childrenConcernedAbout: '85924a64-6aa7-4a60-8b1b-a09283ab9aaf',
            behaviourDetails: 'ok',
            behaviourStartDate: 'test',
            isOngoingBehaviour: 'Yes',
            seekHelpFromPersonOrAgency: 'Yes',
            seekHelpDetails: 'test',
          },
          sexualAbuse: {
            childrenConcernedAbout: '85924a64-6aa7-4a60-8b1b-a09283ab9aaf',
            behaviourDetails: 'ok',
            behaviourStartDate: 'ok',
            isOngoingBehaviour: 'Yes',
            seekHelpFromPersonOrAgency: 'Yes',
            seekHelpDetails: 'ok',
          },
        },
      },
      c1A_otherConcernsDrugs: 'No',
      c1A_childSafetyConcerns: 'No',
      c1A_keepingSafeStatement: 'test',
      c1A_supervisionAgreementDetails: 'Yes',
      c1A_agreementOtherWaysDetails: 'Yes',
      ie_internationalStart: 'Yes',
      ie_provideDetailsStart: 'test',
      ie_internationalParents: 'No',
      ie_internationalJurisdiction: 'No',
      ie_internationalRequest: 'No',
      ra_typeOfHearing: ['phoneHearing'],
      ra_languageNeeds: ['readAndWriteInWelsh'],
      ra_specialArrangements: ['visitCourtBeforeHearing', 'videoLinks'],
      ra_disabilityRequirements: ['extraSupport', 'feelComfortableSupport'],
      ra_supportCourt: ['assistanceGuideDog'],
      ra_feelComportable: ['regularBreaks'],
      c100ApplicationFees: '232.00',
      hwf_needHelpWithFees: 'No',
    });
    expect(reqs.originalUrl).toEqual('/request');
  });

  test('checkYourAnswerFlow3 Should update the before loading Check your answers screen', async () => {
    const reqs = checkYourAnswerFlow3;
    await controller.get(reqs, res);
    expect(reqs.session.userCase).toEqual({
      caseId: 1669817306891687,
      caseTypeOfApplication: 'C100',
      applicantCaseName: 'Case3',
      saveAndContinue: 'true',
      c100RebuildChildPostCode: 'B436QH',
      sq_writtenAgreement: 'No',
      sq_alternativeRoutes: 'No',
      sq_legalRepresentation: 'No',
      sq_courtPermissionRequired: 'No',
      onlycontinue: 'true',
      miam_otherProceedings: 'No',
      miam_consent: 'Yes',
      miam_attendance: 'No',
      miam_haveDocSigned: 'Yes',
      miam_mediatorDocument: 'No',
      miam_validReason: 'Yes',
      miam_nonAttendanceReasons: ['urgentHearing'],
      miam_urgency: ['freedomPhysicalSafetyInFamily'],
      hu_urgentHearingReasons: 'Yes',
      hu_reasonOfUrgentHearing: ['riskOfChildAbduction'],
      hu_otherRiskDetails: 'ok',
      hu_timeOfHearingDetails: 'ok',
      hu_hearingWithNext48HrsDetails: 'Yes',
      hu_hearingWithNext48HrsMsg: 'ok',
      hwn_hearingPart1: 'Yes',
      hwn_reasonsForApplicationWithoutNotice: 'ok',
      hwn_doYouNeedAWithoutNoticeHearing: 'Yes',
      hwn_doYouNeedAWithoutNoticeHearingDetails: 'ok',
      hwn_doYouRequireAHearingWithReducedNotice: 'Yes',
      hwn_doYouRequireAHearingWithReducedNoticeDetails: 'ok',
      too_courtOrder: ['stopOtherPeopleDoingSomething'],
      too_stopOtherPeopleDoingSomethingSubField: ['changeChildrenNameSurname', 'allowMedicalTreatment'],
      too_shortStatement: 'ok',
      c100TempFirstName: '',
      c100TempLastName: '',
      cd_children: [
        {
          id: '0b99e262-75bd-4f9f-ab02-e9d1f27be71e',
          firstName: 'child1',
          lastName: 'child1',
          personalDetails: {
            dateOfBirth: {
              year: '1999',
              month: '01',
              day: '11',
            },
            isDateOfBirthUnknown: '',
            approxDateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            gender: 'Male',
            otherGenderDetails: '',
          },
          childMatters: {
            needsResolution: ['allowMedicalTreatment'],
          },
          parentialResponsibility: {
            statement: 'MOTHER,FATHER',
          },
          liveWith: [
            {
              id: 'c3f20ea7-0af6-4ce3-bb37-74e0d85f1283',
              firstName: 'Respondent',
              lastName: 'FirstPage',
              partyType: 'respondent',
            },
          ],
        },
      ],
      cd_childrenKnownToSocialServices: 'No',
      cd_childrenSubjectOfProtectionPlan: 'No',
      ocd_hasOtherChildren: 'No',
      appl_allApplicants: [
        {
          id: '4ccd67f1-3820-4f15-8d8e-03ab5d441b76',
          applicantFirstName: 'Applicant1',
          applicantLastName: 'Lastname',
          detailsKnown: 'No',
          startAlternative: 'No',
          start: '',
          contactDetailsPrivate: [],
          contactDetailsPrivateAlternative: [],
          relationshipDetails: {
            relationshipToChildren: [
              {
                childId: '0b99e262-75bd-4f9f-ab02-e9d1f27be71e',
                relationshipType: 'Other',
                otherRelationshipTypeDetails: 'uncle',
              },
            ],
          },
          personalDetails: {
            haveYouChangeName: 'Yes',
            applPreviousName: 'previous name',
            dateOfBirth: {
              year: '1993',
              month: '11',
              day: '21',
            },
            gender: 'Male',
            otherGenderDetails: '',
            applicantPlaceOfBirth: 'ok',
          },
          applicantContactDetail: {
            canProvideEmail: 'No',
            emailAddress: '',
            canProvideTelephoneNumber: 'No',
            telephoneNumber: '',
            canNotProvideTelephoneNumberReason: 'not using',
            canLeaveVoiceMail: 'Yes',
          },
          applicantAddressPostcode: '',
          applicantAddress1: 'Flat 54',
          applicantAddress2: '',
          applicantAddressTown: 'London',
          applicantAddressCounty: '',
          applicantAddressHistory: 'Yes',
          applicantProvideDetailsOfPreviousAddresses: '',
          country: 'United Kingdom',
        },
      ],
      resp_Respondents: [
        {
          id: 'c3f20ea7-0af6-4ce3-bb37-74e0d85f1283',
          firstName: 'Respondent',
          lastName: 'FirstPage',
          personalDetails: {
            dateOfBirth: {
              year: '1993',
              month: '01',
              day: '21',
            },
            isDateOfBirthUnknown: '',
            approxDateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            gender: 'Male',
            otherGenderDetails: '',
            hasNameChanged: 'no',
            previousFullName: '',
            respondentPlaceOfBirth: 'Glasgow',
            respondentPlaceOfBirthUnknown: 'No',
          },
          address: {
            AddressLine1: '',
            AddressLine2: '',
            PostTown: '',
            County: '',
            PostCode: '',
            Country: 'United Kingdom',
            addressHistory: 'dontKnow',
            provideDetailsOfPreviousAddresses: '',
          },
          relationshipDetails: {
            relationshipToChildren: [
              {
                childId: '0b99e262-75bd-4f9f-ab02-e9d1f27be71e',
                relationshipType: 'Grandparent',
                otherRelationshipTypeDetails: '',
              },
            ],
          },
          contactDetails: {
            donKnowEmailAddress: 'Yes',
            emailAddress: '',
            telephoneNumber: '',
            donKnowTelephoneNumber: 'Yes',
          },
          addressUnknown: 'Yes',
        },
      ],
      oprs_otherPersonCheck: 'No',
      op_childrenInvolvedCourtCase: 'No',
      op_courtOrderProtection: 'No',
      c1A_haveSafetyConcerns: 'Yes',
      c1A_safetyConernAbout: ['children', 'applicant'],
      c1A_concernAboutChild: ['psychologicalAbuse', 'financialAbuse'],
      c1A_safteyConcerns: {
        child: {
          psychologicalAbuse: {
            childrenConcernedAbout: '0b99e262-75bd-4f9f-ab02-e9d1f27be71e',
            behaviourDetails: 'test',
            behaviourStartDate: 'test',
            isOngoingBehaviour: 'Yes',
            seekHelpFromPersonOrAgency: 'Yes',
            seekHelpDetails: 'Test',
          },
          financialAbuse: {
            childrenConcernedAbout: '0b99e262-75bd-4f9f-ab02-e9d1f27be71e',
            behaviourDetails: 'Test',
            behaviourStartDate: 'Test',
            isOngoingBehaviour: 'Yes',
            seekHelpFromPersonOrAgency: 'Yes',
            seekHelpDetails: 'Test',
          },
        },
        applicant: {
          financialAbuse: {
            behaviourDetails: '',
            behaviourStartDate: '',
            seekHelpDetails: '',
          },
        },
      },
      c1A_concernAboutApplicant: ['financialAbuse'],
      c1A_otherConcernsDrugs: 'No',
      c1A_childSafetyConcerns: 'No',
      c1A_keepingSafeStatement: 'test',
      c1A_supervisionAgreementDetails: 'Yes',
      c1A_agreementOtherWaysDetails: 'Yes',
      ie_internationalStart: 'No',
      ie_internationalParents: 'No',
      ie_internationalJurisdiction: 'No',
      ie_internationalRequest: 'No',
      ra_typeOfHearing: ['phoneHearing'],
      ra_languageNeeds: ['readAndWriteInWelsh'],
      ra_specialArrangements: ['separateExitEntrance'],
      ra_disabilityRequirements: ['communicationHelp'],
      ra_communicationHelp: ['needToBeClosedWithSpeaker', 'lipSpeaker'],
      c100ApplicationFees: '232.00',
      hwf_needHelpWithFees: 'No',
    });
    expect(reqs.originalUrl).toEqual('/request');
  });

  test('checkYourAnswerFlow4 Should update the before loading Check your answers screen', async () => {
    const reqs = checkYourAnswerFlow4;
    await controller.get(reqs, res);
    expect(reqs.session.userCase).toEqual({
      caseId: 1670246363889755,
      caseTypeOfApplication: 'C100',
      applicantCaseName: 'Case5',
      saveAndContinue: true,
      c100RebuildChildPostCode: 'IG11NB',
      sq_writtenAgreement: 'No',
      sq_alternativeRoutes: 'No',
      sq_legalRepresentation: 'No',
      sq_courtPermissionRequired: 'No',
      onlycontinue: true,
      miam_otherProceedings: 'No',
      miam_consent: 'Yes',
      miam_attendance: 'Yes',
      miam_haveDocSigned: 'Yes',
      miam_certificate: {
        id: '3013f13d-c8d2-4800-b118-4cbf25073797',
        url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/3013f13d-c8d2-4800-b118-4cbf25073797',
        filename: 'applicant__miam_certificate__05122022.pdf',
        binaryUrl:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/3013f13d-c8d2-4800-b118-4cbf25073797/binary',
      },
      too_courtOrder: ['childTimeSpent'],
      too_shortStatement: 'test',
      hu_urgentHearingReasons: 'Yes',
      hu_reasonOfUrgentHearing: ['riskOfSafety'],
      hu_otherRiskDetails: test,
      hu_timeOfHearingDetails: 'LONDON',
      hu_hearingWithNext48HrsDetails: 'No',
      hwn_hearingPart1: 'Yes',
      hwn_reasonsForApplicationWithoutNotice: 'test',
      hwn_doYouNeedAWithoutNoticeHearing: 'No',
      hwn_doYouRequireAHearingWithReducedNotice: 'No',
      c100TempFirstName: '',
      c100TempLastName: '',
      cd_children: [
        {
          id: 'b008077c-53a8-4d1d-b860-eb5abe89ac4f',
          firstName: 'Child1',
          lastName: 'Child1',
          personalDetails: {
            dateOfBirth: {
              year: 1993,
              month: 11,
              day: 21,
            },
            isDateOfBirthUnknown: '',
            approxDateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            gender: 'Male',
            otherGenderDetails: '',
          },
          childMatters: {
            needsResolution: 'childTimeSpent',
          },
          parentialResponsibility: {
            statement: 'MOTHER,FATHER',
          },
          liveWith: [
            {
              id: 'ff5d3e7a-0f80-4530-b20c-a648ff985c24',
              firstName: 'Respondent',
              lastName: 'Respondent',
              partyType: 'respondent',
            },
          ],
        },
      ],
      cd_childrenKnownToSocialServices: 'No',
      cd_childrenSubjectOfProtectionPlan: 'No',
      ocd_hasOtherChildren: 'No',
      appl_allApplicants: [
        {
          id: 'f8158185-bcaa-4b5e-b513-921131478675',
          applicantFirstName: 'Applicant1',
          applicantLastName: 'Applicant1',
          detailsKnown: 'No',
          startAlternative: 'Yes',
          start: '',
          contactDetailsPrivate: [],
          contactDetailsPrivateAlternative: ['email'],
          relationshipDetails: {
            relationshipToChildren: [
              {
                childId: 'b008077c-53a8-4d1d-b860-eb5abe89ac4f',
                relationshipType: 'Grandparent',
                otherRelationshipTypeDetails: '',
              },
            ],
          },
          personalDetails: {
            haveYouChangeName: 'Yes',
            applPreviousName: 'test',
            dateOfBirth: {
              year: 1999,
              month: '01',
              day: 11,
            },
            gender: 'Female',
            otherGenderDetails: '',
            applicantPlaceOfBirth: 'UK',
          },
          applicantContactDetail: {
            emailAddress: 'abc@gmail.com',
            canProvideTelephoneNumber: 'Yes',
            telephoneNumber: +447205308786,
            canNotProvideTelephoneNumberReason: '',
            canLeaveVoiceMail: 'Yes',
            canProvideEmail: 'Yes',
          },
          applicantAddressPostcode: 'B43 6QH',
          applicantAddress1: '46 CHATSWORTH AVENUE',
          applicantAddress2: '',
          applicantAddressTown: 'BIRMINGHAM',
          applicantAddressCounty: 'SANDWELL',
          country: 'United Kingdom',
          applicantSelectedAddress: 0,
          applicantAddressHistory: 'Yes',
          applicantProvideDetailsOfPreviousAddresses: '',
        },
      ],
      resp_Respondents: [
        {
          id: 'ff5d3e7a-0f80-4530-b20c-a648ff985c24',
          firstName: 'Respondent',
          lastName: 'Respondent',
          personalDetails: {
            dateOfBirth: {
              year: 1999,
              month: '01',
              day: 11,
            },
            isDateOfBirthUnknown: '',
            approxDateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            gender: 'Male',
            otherGenderDetails: '',
            hasNameChanged: 'yes',
            previousFullName: 'Respondent2',
            respondentPlaceOfBirth: 'Glasgow',
            respondentPlaceOfBirthUnknown: 'No',
          },
          address: {
            AddressLine1: '',
            AddressLine2: '',
            PostTown: '',
            County: '',
            PostCode: '',
            Country: 'United Kingdom',
            addressHistory: 'dontKnow',
            provideDetailsOfPreviousAddresses: '',
          },
          relationshipDetails: {
            relationshipToChildren: [
              {
                childId: 'b008077c-53a8-4d1d-b860-eb5abe89ac4f',
                relationshipType: 'Other',
                otherRelationshipTypeDetails: 'uncle',
              },
            ],
          },
          contactDetails: {
            emailAddress: 'abc@gmail.com',
            telephoneNumber: +447205308786,
          },
          addressUnknown: 'Yes',
        },
      ],
      oprs_otherPersonCheck: 'Yes',
      oprs_otherPersons: [
        {
          id: '2a293ab3-acc8-45f1-ba47-3d5bc4d7a978',
          firstName: 'other',
          lastName: 'Last',
          personalDetails: {
            dateOfBirth: {
              year: 1999,
              month: '01',
              day: '11',
            },
            isDateOfBirthUnknown: '',
            approxDateOfBirth: {
              day: '',
              month: '',
              year: '',
            },
            gender: 'Female',
            otherGenderDetails: '',
            hasNameChanged: 'No',
            previousFullName: '',
          },
          address: {
            AddressLine1: '',
            AddressLine2: '',
            PostTown: '',
            County: '',
            PostCode: '',
            Country: 'United Kingdom',
          },
          relationshipDetails: {
            relationshipToChildren: [
              {
                childId: 'b008077c-53a8-4d1d-b860-eb5abe89ac4f',
                relationshipType: 'Grandparent',
                otherRelationshipTypeDetails: '',
              },
            ],
          },
          contactDetails: {
            donKnowEmailAddress: 'No',
            emailAddress: '',
            telephoneNumber: '',
            donKnowTelephoneNumber: 'No',
          },
          addressUnknown: 'Yes',
        },
      ],
      op_childrenInvolvedCourtCase: 'Yes',
      op_courtOrderProtection: 'Yes',
      op_courtProceedingsOrders: ['childAbductionOrder'],
      op_otherProceedings: {
        order: {
          childAbductionOrders: [
            {
              id: '1',
              orderDetail: 'c2222',
              caseNo: 'BS19F99993',
              orderDate: {
                year: 2011,
                month: 11,
                day: 11,
              },
              currentOrder: 'Yes',
              orderEndDate: {
                year: 2022,
                month: 11,
                day: 11,
              },
              orderCopy: 'Yes',
              orderDocument: {
                id: 'c078f4d9-70fd-48b2-9a1e-654e30f597cb',
                url: 'http://dm-store-aat.service.core-compute-aat.internal/documents/c078f4d9-70fd-48b2-9a1e-654e30f597cb',
                filename: 'applicant__child_abduction_order__05122022.pdf',
                binaryUrl:
                  'http://dm-store-aat.service.core-compute-aat.internal/documents/c078f4d9-70fd-48b2-9a1e-654e30f597cb/binary',
              },
            },
          ],
        },
      },
      c1A_haveSafetyConcerns: 'Yes',
      c1A_safetyConernAbout: ['children'],
      c1A_concernAboutChild: ['psychologicalAbuse'],
      c1A_safteyConcerns: {
        child: {
          psychologicalAbuse: {
            childrenConcernedAbout: 'b008077c-53a8-4d1d-b860-eb5abe89ac4f',
            behaviourDetails: 'test',
            behaviourStartDate: 'test',
            isOngoingBehaviour: 'Yes',
            seekHelpFromPersonOrAgency: 'Yes',
            seekHelpDetails: 'test',
          },
        },
      },
      c1A_otherConcernsDrugs: 'Yes',
      c1A_otherConcernsDrugsDetails: 'test',
      c1A_childSafetyConcerns: 'No',
      c1A_keepingSafeStatement: 'test',
      c1A_supervisionAgreementDetails: 'Yes, but I prefer that it is supervised',
      c1A_agreementOtherWaysDetails: 'Yes',
      ie_internationalStart: 'No',
      ie_internationalParents: 'No',
      ie_internationalJurisdiction: 'No',
      ie_internationalRequest: 'No',
      ra_typeOfHearing: ['phoneHearing'],
      ra_languageNeeds: ['readAndWriteInWelsh'],
      ra_specialArrangements: [' separateWaitingRoom'],
      ra_disabilityRequirements: ['helpTravellingMovingBuildingSupport'],
      ra_travellingCourt: ['guideBuilding'],
      c100ApplicationFees: 232.0,
      hwf_needHelpWithFees: 'No',
    });
    expect(reqs.originalUrl).toEqual('/request');
  });
});
