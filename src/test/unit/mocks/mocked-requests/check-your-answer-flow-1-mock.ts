import { mockRequest } from '../../utils/mockRequest';

export const checkYourAnswerFlow1 = mockRequest({
  session: {
    userCase: {
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
    },
  },
});
