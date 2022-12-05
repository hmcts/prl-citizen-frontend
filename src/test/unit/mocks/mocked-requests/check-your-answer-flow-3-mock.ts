import { mockRequest } from '../../utils/mockRequest';

export const checkYourAnswerFlow3 = mockRequest({
  session: {
    userCase: {
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
    },
  },
});
