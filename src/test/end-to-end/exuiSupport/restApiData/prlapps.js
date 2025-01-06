/* eslint-disable quote-props */

module.exports = {

  'Solicitor application': {
    eventId: 'solicitorCreate',
    'data': {
      caseTypeOfApplication: 'C100',
      applicantOrganisationPolicy: {
        OrgPolicyCaseAssignedRole: '[APPLICANTSOLICITOR]',
        OrgPolicyReference: null,
        PrepopulateToUsersOrganisation: null,
        LastNoCRequestedBy: null,
        PreviousOrganisations: [],
        Organisation: {
          OrganisationID: null,
          OrganisationName: null
        }
      }
    }
  },

  'Add case name': {
    eventId: 'caseName',
    'data': { applicantCaseName: `Auto test Rest api ${Date.now()}` }
  },

  'Type of application': {
    eventId: 'selectApplicationType',
    'data': {
      'ordersApplyingFor': ['childArrangementsOrder'],
      'typeOfChildArrangementsOrder': 'spendTimeWithOrder',
      'natureOfOrder': 'test',
      'consentOrder': 'No',
      'applicationPermissionRequired': 'yes',
      'applicationPermissionRequiredReason': 'test',
      'applicationDetails': 'test'
    }
  },

  'Hearing urgency': {
    eventId: 'hearingUrgency',
    'data': {
      areRespondentsAwareOfProceedings: 'No',
      doYouNeedAWithoutNoticeHearing: 'No',
      doYouRequireAHearingWithReducedNotice: 'No',
      isCaseUrgent: 'No'
    }
  },

  'Child details': {
    eventId: 'childDetailsRevised',
    'data': {
      'newChildDetails': [
        {
          'value': {
            'firstName': 'Test',
            'lastName': 'test',
            'dateOfBirth': '2020-01-01',
            'gender': 'male',
            'otherGender': null,
            'parentalResponsibilityDetails': 'Test',
            'isDateOfBirthUnknown': null,
            'cafcassOfficerName': null,
            'cafcassOfficerPosition': null,
            'cafcassOfficerOtherPosition': null,
            'cafcassOfficerEmailAddress': null,
            'cafcassOfficerPhoneNo': null,
            'isFinalOrderIssued': null,
            'orderAppliedFor': ['childArrangementsOrder']
          },
          'id': null
        }
      ],
      'childrenKnownToLocalAuthority': 'no',
      'childrenSubjectOfChildProtectionPlan': 'no'
    }
  },

  'Applicant details': {
    eventId: 'applicantsDetails',
    'data': {
      'applicants': [
        {
          'value': {
            'firstName': 'test applicant',
            'lastName': 'test',
            'previousName': null,
            'dateOfBirth': '2000-01-01',
            'gender': 'male',
            'otherGender': null,
            'placeOfBirth': 'testtown',
            'isAddressConfidential': 'No',
            'isAtAddressLessThan5Years': 'No',
            'addressLivedLessThan5YearsDetails': null,
            'canYouProvideEmailAddress': 'No',
            'email': null,
            'isEmailAddressConfidential': null,
            'phoneNumber': '0987654321',
            'isPhoneNumberConfidential': 'No',
            'representativeFirstName': 'Test solicitor',
            'representativeLastName': 'test rep',
            'solicitorEmail': 'testsolicitor@sol.com',
            'solicitorReference': null,
            'dxNumber': null,
            'isDateOfBirthUnknown': null,
            'isAddressUnknown': null,
            'landline': null,
            'relationshipToChildren': null,
            'isDateOfBirthKnown': null,
            'isCurrentAddressKnown': null,
            'canYouProvidePhoneNumber': null,
            'isPlaceOfBirthKnown': null,
            'isAtAddressLessThan5YearsWithDontKnow': null,
            'doTheyHaveLegalRepresentation': null,
            'sendSignUpLink': null,
            'solicitorTelephone': null,
            'respondentLivedWithApplicant': null,
            'applicantContactInstructions': null,
            'currentRespondent': null,
            'partyId': null,
            'solicitorPartyId': null,
            'solicitorOrgUuid': null,
            'contactPreferences': null,
            'isRemoveLegalRepresentativeRequested': null,
            'address': {
              'AddressLine1': 'Flat 11',
              'AddressLine2': 'Sheraton House',
              'AddressLine3': 'Churchill Gardens',
              'PostTown': 'London',
              'County': '',
              'PostCode': 'SW1V 3BZ',
              'Country': 'United Kingdom'
            },
            'solicitorOrg': {
              'OrganisationID': 'OHTS6A4',
              'OrganisationName': 'AutoTestwqh4d63tc2'
            },
            'solicitorAddress': {
              'AddressLine1': 'Flat 12',
              'AddressLine2': 'Sheraton House',
              'AddressLine3': 'Churchill Gardens',
              'PostTown': 'London',
              'County': '',
              'PostCode': 'SW1V 3BZ',
              'Country': 'United Kingdom'
            },
            'otherPersonRelationshipToChildren': [],
            'applicantPreferredContact': [],
            'user': {
              'idamId': null,
              'email': null,
              'solicitorRepresented': null
            },
            'response': {
              'legalRepresentation': null,
              'currentOrPastProceedingsForChildren': null,
              'factorsAffectingAbilityToParticipate': null,
              'provideDetailsForFactorsAffectingAbilityToParticipate': null,
              'giveDetailsAffectingLitigationCapacity': null,
              'detailsOfReferralOrAssessment': null,
              'respAohYesOrNo': null,
              'safeToCallOption': null,
              'c7ResponseSubmitted': null,
              'c1AResponseSubmitted': null,
              'activeRespondent': null,
              'respAohDomesticAbuseYesNo': null,
              'respAohChildAbductionYesNo': null,
              'respAohChildAbuseYesNo': null,
              'respAohSubstanceAbuseYesNo': null,
              'respAohSubstanceAbuseDetails': null,
              'respAohOtherConcerns': null,
              'respAohOtherConcernsDetails': null,
              'respOrdersNonMolestation': null,
              'respOrdersNonMolestationDateIssued': null,
              'respOrdersNonMolestationEndDate': null,
              'respOrdersNonMolestationCurrent': null,
              'respOrdersNonMolestationCourtName': null,
              'respOrdersNonMolestationCaseNumber': null,
              'respOrdersOccupation': null,
              'respOrdersOccupationDateIssued': null,
              'respOrdersOccupationEndDate': null,
              'respOrdersOccupationCurrent': null,
              'respOrdersOccupationCourtName': null,
              'respOrdersOccupationCaseNumber': null,
              'respOrdersForcedMarriageProtection': null,
              'respOrdersForcedMarriageProtectionDateIssued': null,
              'respOrdersForcedMarriageProtectionEndDate': null,
              'respOrdersForcedMarriageProtectionCurrent': null,
              'respOrdersForcedMarriageProtectionCourtName': null,
              'respOrdersForcedMarriageProtectionCaseNumber': null,
              'respOrdersRestraining': null,
              'respOrdersRestrainingDateIssued': null,
              'respOrdersRestrainingEndDate': null,
              'respOrdersRestrainingCurrent': null,
              'respOrdersRestrainingCourtName': null,
              'respOrdersRestrainingCaseNumber': null,
              'respOrdersOtherInjunctive': null,
              'respOrdersOtherInjunctiveDateIssued': null,
              'respOrdersOtherInjunctiveEndDate': null,
              'respOrdersOtherInjunctiveCurrent': null,
              'respOrdersOtherInjunctiveCourtName': null,
              'respOrdersOtherInjunctiveCaseNumber': null,
              'respOrdersUndertakingInPlace': null,
              'respOrdersUndertakingInPlaceDateIssued': null,
              'respOrdersUndertakingInPlaceEndDate': null,
              'respOrdersUndertakingInPlaceCurrent': null,
              'respOrdersUndertakingInPlaceCourtName': null,
              'respOrdersUndertakingInPlaceCaseNumber': null,
              'respChildAbductionReasons': null,
              'respPreviousAbductionThreats': null,
              'respPreviousAbductionThreatsDetails': null,
              'respChildrenLocationNow': null,
              'respAbductionPassportOfficeNotified': null,
              'respAbductionPreviousPoliceInvolvement': null,
              'respAbductionPreviousPoliceInvolvementDetails': null,
              'respAbductionChildHasPassport': null,
              'respAohOtherConcernsCourtActions': null,
              'respAgreeChildUnsupervisedTime': null,
              'respAgreeChildSupervisedTime': null,
              'respAgreeChildOtherContact': null,
              'respWhichChildrenAreRiskPhysicalAbuse': {
                'value': [],
                'list_items': []
              },
              'respWhichChildrenAreRiskPsychologicalAbuse': {
                'value': [],
                'list_items': []
              },
              'respWhichChildrenAreRiskSexualAbuse': {
                'value': [],
                'list_items': []
              },
              'respWhichChildrenAreRiskEmotionalAbuse': {
                'value': [],
                'list_items': []
              },
              'respWhichChildrenAreRiskFinancialAbuse': {
                'value': [],
                'list_items': []
              },
              'respAllChildrenAreRiskPhysicalAbuse': null,
              'respAllChildrenAreRiskPsychologicalAbuse': null,
              'respAllChildrenAreRiskSexualAbuse': null,
              'respAllChildrenAreRiskEmotionalAbuse': null,
              'respAllChildrenAreRiskFinancialAbuse': null,
              'responseToAllegationsOfHarmYesOrNoResponse': null,
              'consent': {
                'consentToTheApplication': null,
                'noConsentReason': null,
                'applicationReceivedDate': null,
                'permissionFromCourt': null,
                'courtOrderDetails': null
              },
              'keepDetailsPrivate': {
                'otherPeopleKnowYourContactDetails': null,
                'confidentiality': null,
                'confidentialityList': []
              },
              'citizenDetails': {
                'firstName': null,
                'lastName': null,
                'previousName': null,
                'dateOfBirth': null,
                'placeOfBirth': null,
                'address': {
                  'AddressLine1': null,
                  'AddressLine2': null,
                  'AddressLine3': null,
                  'PostTown': null,
                  'County': null,
                  'PostCode': null,
                  'Country': null
                },
                'addressHistory': {
                  'isAtAddressLessThan5Years': null,
                  'previousAddressHistory': []
                },
                'contact': {
                  'phoneNumber': null,
                  'email': null
                }
              },
              'attendToCourt': {
                'respondentWelshNeeds': null,
                'isRespondentNeededInterpreter': null,
                'haveAnyDisability': null,
                'disabilityNeeds': null,
                'respondentSpecialArrangements': null,
                'respondentSpecialArrangementDetails': null,
                'respondentIntermediaryNeeds': null,
                'respondentIntermediaryNeedDetails': null,
                'respondentWelshNeedsList': [],
                'respondentInterpreterNeeds': []
              },
              'citizenFlags': {
                'isApplicationViewed': null,
                'isAllegationOfHarmViewed': null,
                'isAllDocumentsViewed': null,
                'isResponseInitiated': null,
                'isApplicationToBeServed': null,
                'isStatementOfServiceProvided': null
              },
              'miam': {
                'applicantAttendedMiam': null,
                'claimingExemptionMiam': null,
                'familyMediatorMiam': null,
                'mediatorRegistrationNumber': null,
                'familyMediatorServiceName': null,
                'soleTraderName': null,
                'attendedMiam': null,
                'willingToAttendMiam': null,
                'reasonNotAttendingMiam': null
              },
              'respKeepDetailsPrivate': {
                'otherPeopleKnowYourContactDetails': null,
                'confidentiality': null,
                'confidentialityList': []
              },
              'respKeepDetailsPrivateConfidentiality': {
                'otherPeopleKnowYourContactDetails': null,
                'confidentiality': null,
                'confidentialityList': []
              },
              'respSolHaveYouAttendedMiam': {
                'applicantAttendedMiam': null,
                'claimingExemptionMiam': null,
                'familyMediatorMiam': null,
                'mediatorRegistrationNumber': null,
                'familyMediatorServiceName': null,
                'soleTraderName': null,
                'attendedMiam': null,
                'willingToAttendMiam': null,
                'reasonNotAttendingMiam': null
              },
              'respSolWillingnessToAttendMiam': {
                'applicantAttendedMiam': null,
                'claimingExemptionMiam': null,
                'familyMediatorMiam': null,
                'mediatorRegistrationNumber': null,
                'familyMediatorServiceName': null,
                'soleTraderName': null,
                'attendedMiam': null,
                'willingToAttendMiam': null,
                'reasonNotAttendingMiam': null
              },
              'currentOrPreviousProceedings': {
                'haveChildrenBeenInvolvedInCourtCase': null,
                'courtOrderMadeForProtection': null,
                'proceedingsList': []
              },
              'respondentExistingProceedings': [],
              'respAllegationsOfHarmInfo': {
                'respondentDomesticAbuse': null,
                'respondentChildAbuse': null,
                'isRespondentChildAbduction': null,
                'respondentDrugOrAlcoholAbuse': null,
                'respondentDrugOrAlcoholAbuseDetails': null,
                'respondentOtherSafetyConcerns': null,
                'respondentOtherSafetyConcernsDetails': null,
                'respondentNonMolestationOrder': null,
                'respondentNonMolestationOrderIssueDate': null,
                'respondentNonMolestationOrderEndDate': null,
                'respondentNonMolestationOrderIsCurrent': null,
                'respondentNonMolestationOrderCourt': null,
                'respondentNonMolestationOrderCaseNumber': null,
                'respondentOccupationOrder': null,
                'respondentOccupationOrderIssueDate': null,
                'respondentOccupationOrderEndDate': null,
                'respondentOccupationOrderIsCurrent': null,
                'respondentOccupationOrderCourt': null,
                'respondentOccupationOrderCaseNumber': null,
                'respondentForcedMarriageOrder': null,
                'respondentForcedMarriageIssueDate': null,
                'respondentForcedMarriageEndDate': null,
                'respondentForcedMarriageIsCurrent': null,
                'respondentForcedMarriageCourt': null,
                'respondentForcedMarriageCaseNumber': null,
                'respondentRestrainingOrder': null,
                'respondentRestrainingIssueDate': null,
                'respondentRestrainingEndDate': null,
                'respondentRestrainingIsCurrent': null,
                'respondentRestrainingCourt': null,
                'respondentRestrainingCaseNumber': null,
                'respondentOtherInjunctiveOrder': null,
                'respondentOtherInjunctiveIssueDate': null,
                'respondentOtherInjunctiveEndDate': null,
                'respondentOtherInjunctiveIsCurrent': null,
                'respondentOtherInjunctiveCourt': null,
                'respondentOtherInjunctiveCaseNumber': null,
                'respondentUndertakingOrder': null,
                'respondentUndertakingIssueDate': null,
                'respondentUndertakingEndDate': null,
                'respondentUndertakingIsCurrent': null,
                'respondentUndertakingCourt': null,
                'respondentUndertakingCaseNumber': null
              },
              'respDomesticAbuseInfo': [],
              'respChildAbuseInfo': [],
              'respChildAbductionInfo': {
                'reasonForChildAbductionBelief': null,
                'previousThreatsForChildAbduction': null,
                'previousThreatsForChildAbductionDetails': null,
                'whereIsChild': null,
                'hasPassportOfficeNotified': null,
                'anyOrgInvolvedInPreviousAbduction': null,
                'anyOrgInvolvedInPreviousAbductionDetails': null,
                'childrenHavePassport': null,
                'childrenHaveMoreThanOnePassport': null,
                'whoHasChildPassportOther': null,
                'whoHasChildPassport': []
              },
              'respOtherConcernsInfo': {
                'ordersRespondentWantFromCourt': null,
                'childSpendingUnsupervisedTime': null,
                'childSpendingSupervisedTime': null,
                'childHavingOtherFormOfContact': null
              },
              'internationalElementChildInfo': {
                'childrenLiveOutsideOfEnWl': null,
                'childrenLiveOutsideOfEnWlDetails': null,
                'parentsAnyOneLiveOutsideEnWl': null,
                'parentsAnyOneLiveOutsideEnWlDetails': null,
                'anotherPersonOrderOutsideEnWl': null,
                'anotherPersonOrderOutsideEnWlDetails': null,
                'anotherCountryAskedInformation': null,
                'anotherCountryAskedInformationDetaails': null
              },
              'internationalElementParentInfo': {
                'childrenLiveOutsideOfEnWl': null,
                'childrenLiveOutsideOfEnWlDetails': null,
                'parentsAnyOneLiveOutsideEnWl': null,
                'parentsAnyOneLiveOutsideEnWlDetails': null,
                'anotherPersonOrderOutsideEnWl': null,
                'anotherPersonOrderOutsideEnWlDetails': null,
                'anotherCountryAskedInformation': null,
                'anotherCountryAskedInformationDetaails': null
              },
              'internationalElementJurisdictionInfo': {
                'childrenLiveOutsideOfEnWl': null,
                'childrenLiveOutsideOfEnWlDetails': null,
                'parentsAnyOneLiveOutsideEnWl': null,
                'parentsAnyOneLiveOutsideEnWlDetails': null,
                'anotherPersonOrderOutsideEnWl': null,
                'anotherPersonOrderOutsideEnWlDetails': null,
                'anotherCountryAskedInformation': null,
                'anotherCountryAskedInformationDetaails': null
              },
              'internationalElementRequestInfo': {
                'childrenLiveOutsideOfEnWl': null,
                'childrenLiveOutsideOfEnWlDetails': null,
                'parentsAnyOneLiveOutsideEnWl': null,
                'parentsAnyOneLiveOutsideEnWlDetails': null,
                'anotherPersonOrderOutsideEnWl': null,
                'anotherPersonOrderOutsideEnWlDetails': null,
                'anotherCountryAskedInformation': null,
                'anotherCountryAskedInformationDetaails': null
              },
              'citizenInternationalElements': {
                'childrenLiveOutsideOfEnWl': null,
                'parentsAnyOneLiveOutsideEnWl': null,
                'anotherPersonOrderOutsideEnWl': null,
                'anotherCountryAskedInformation': null,
                'childrenLiveOutsideOfEnWlDetails': null,
                'parentsAnyOneLiveOutsideEnWlDetails': null,
                'anotherPersonOrderOutsideEnWlDetails': null,
                'anotherCountryAskedInformationDetaails': null
              },
              'safetyConcerns': {
                'haveSafetyConcerns': null,
                'child': {
                  'physicalAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'psychologicalAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'emotionalAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'sexualAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'financialAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'somethingElse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  }
                },
                'applicant': {
                  'physicalAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'psychologicalAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'emotionalAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'sexualAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'financialAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'somethingElse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  }
                },
                'respondent': {
                  'physicalAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'psychologicalAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'emotionalAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'sexualAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'financialAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'somethingElse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  }
                },
                'safetyConcernAbout': [],
                'concernAboutChild': [],
                'concernAboutRespondent': [],
                'otherconcerns': {
                  'c1AkeepingSafeStatement': null,
                  'c1AsupervisionAgreementDetails': null,
                  'c1AagreementOtherWaysDetails': null,
                  'c1AotherConcernsDrugs': null,
                  'c1AotherConcernsDrugsDetails': null,
                  'c1AchildSafetyConcerns': null,
                  'c1AchildSafetyConcernsDetails': null
                },
                'abductions': {
                  'c1AabductionReasonOutsideUk': null,
                  'c1AchildsCurrentLocation': null,
                  'c1AchildrenMoreThanOnePassport': null,
                  'c1AprovideOtherDetails': null,
                  'c1ApassportOffice': null,
                  'c1AabductionPassportOfficeNotified': null,
                  'c1ApreviousAbductionsShortDesc': null,
                  'c1ApoliceOrInvestigatorInvolved': null,
                  'c1ApoliceOrInvestigatorOtherDetails': null,
                  'c1AchildAbductedBefore': null,
                  'c1ApossessionChildrenPassport': []
                }
              },
              'supportYouNeed': {
                'describeOtherNeed': null,
                'otherProvideDetails': null,
                'communicationSupportOther': null,
                'otherDetails': null,
                'languageDetails': null,
                'safetyArrangementsDetails': null,
                'travellingOtherDetails': null,
                'hearingDetails': null,
                'signLanguageDetails': null,
                'lightingDetails': null,
                'supportWorkerDetails': null,
                'familyProviderDetails': null,
                'therapyDetails': null,
                'docsDetails': null,
                'largePrintDetails': null,
                'parkingDetails': null,
                'differentChairDetails': null,
                'helpCommunication': [],
                'courtComfort': [],
                'courtHearing': [],
                'docsSupport': [],
                'languageRequirements': [],
                'reasonableAdjustments': [],
                'safetyArrangements': [],
                'travellingToCourt': [],
                'attendingToCourt': []
              },
              'respDomesticBehaviours': [],
              'respChildAbuses': [],
              'respChildPhysicalAbuse': {
                'respAbuseNatureDescription': null,
                'respBehavioursStartDateAndLength': null,
                'respBehavioursApplicantSoughtHelp': null,
                'respBehavioursApplicantHelpSoughtWho': null
              },
              'respChildPsychologicalAbuse': {
                'respAbuseNatureDescription': null,
                'respBehavioursStartDateAndLength': null,
                'respBehavioursApplicantSoughtHelp': null,
                'respBehavioursApplicantHelpSoughtWho': null
              },
              'respChildSexualAbuse': {
                'respAbuseNatureDescription': null,
                'respBehavioursStartDateAndLength': null,
                'respBehavioursApplicantSoughtHelp': null,
                'respBehavioursApplicantHelpSoughtWho': null
              },
              'respChildEmotionalAbuse': {
                'respAbuseNatureDescription': null,
                'respBehavioursStartDateAndLength': null,
                'respBehavioursApplicantSoughtHelp': null,
                'respBehavioursApplicantHelpSoughtWho': null
              },
              'respChildFinancialAbuse': {
                'respAbuseNatureDescription': null,
                'respBehavioursStartDateAndLength': null,
                'respBehavioursApplicantSoughtHelp': null,
                'respBehavioursApplicantHelpSoughtWho': null
              },
              'respChildPassportDetails': {
                'respChildHasMultiplePassports': null,
                'respChildPassportPossessionOtherDetails': null,
                'respChildPassportPossession': []
              }
            },
            'partyLevelFlag': {
              'roleOnCase': null,
              'partyName': null,
              'groupId': null,
              'visibility': null,
              'details': []
            }
          },
          'id': '8f0f3e50-e333-4b09-8db5-4bd6697b45c3'
        }
      ],
      'caseTypeOfApplication': 'C100'
    }
  },
  'Respondent details': {
    eventId: 'respondentsDetails',
    'data': {
      'respondents': [
        {
          'value': {
            'firstName': 'test resp',
            'lastName': 'test resp ln',
            'previousName': null,
            'isDateOfBirthKnown': 'No',
            'dateOfBirth': null,
            'gender': 'female',
            'otherGender': null,
            'isPlaceOfBirthKnown': 'No',
            'placeOfBirth': null,
            'isCurrentAddressKnown': 'No',
            'isAtAddressLessThan5YearsWithDontKnow': 'no',
            'addressLivedLessThan5YearsDetails': null,
            'canYouProvideEmailAddress': 'Yes',
            'email': 'resp@email.com',
            'canYouProvidePhoneNumber': 'No',
            'phoneNumber': null,
            'doTheyHaveLegalRepresentation': 'no',
            'representativeFirstName': null,
            'representativeLastName': null,
            'solicitorEmail': null,
            'dxNumber': null,
            'sendSignUpLink': null,
            'isDateOfBirthUnknown': null,
            'isAddressUnknown': null,
            'isAddressConfidential': null,
            'isAtAddressLessThan5Years': null,
            'isEmailAddressConfidential': null,
            'landline': null,
            'isPhoneNumberConfidential': null,
            'relationshipToChildren': null,
            'solicitorReference': null,
            'solicitorTelephone': null,
            'respondentLivedWithApplicant': null,
            'applicantContactInstructions': null,
            'currentRespondent': null,
            'partyId': null,
            'solicitorPartyId': null,
            'solicitorOrgUuid': null,
            'contactPreferences': null,
            'isRemoveLegalRepresentativeRequested': null,
            'otherPersonRelationshipToChildren': [],
            'applicantPreferredContact': [],
            'user': {
              'idamId': null,
              'email': null,
              'solicitorRepresented': null
            },
            'response': {
              'legalRepresentation': null,
              'currentOrPastProceedingsForChildren': null,
              'factorsAffectingAbilityToParticipate': null,
              'provideDetailsForFactorsAffectingAbilityToParticipate': null,
              'giveDetailsAffectingLitigationCapacity': null,
              'detailsOfReferralOrAssessment': null,
              'respAohYesOrNo': null,
              'safeToCallOption': null,
              'c7ResponseSubmitted': null,
              'c1AResponseSubmitted': null,
              'activeRespondent': null,
              'respAohDomesticAbuseYesNo': null,
              'respAohChildAbductionYesNo': null,
              'respAohChildAbuseYesNo': null,
              'respAohSubstanceAbuseYesNo': null,
              'respAohSubstanceAbuseDetails': null,
              'respAohOtherConcerns': null,
              'respAohOtherConcernsDetails': null,
              'respOrdersNonMolestation': null,
              'respOrdersNonMolestationDateIssued': null,
              'respOrdersNonMolestationEndDate': null,
              'respOrdersNonMolestationCurrent': null,
              'respOrdersNonMolestationCourtName': null,
              'respOrdersNonMolestationCaseNumber': null,
              'respOrdersOccupation': null,
              'respOrdersOccupationDateIssued': null,
              'respOrdersOccupationEndDate': null,
              'respOrdersOccupationCurrent': null,
              'respOrdersOccupationCourtName': null,
              'respOrdersOccupationCaseNumber': null,
              'respOrdersForcedMarriageProtection': null,
              'respOrdersForcedMarriageProtectionDateIssued': null,
              'respOrdersForcedMarriageProtectionEndDate': null,
              'respOrdersForcedMarriageProtectionCurrent': null,
              'respOrdersForcedMarriageProtectionCourtName': null,
              'respOrdersForcedMarriageProtectionCaseNumber': null,
              'respOrdersRestraining': null,
              'respOrdersRestrainingDateIssued': null,
              'respOrdersRestrainingEndDate': null,
              'respOrdersRestrainingCurrent': null,
              'respOrdersRestrainingCourtName': null,
              'respOrdersRestrainingCaseNumber': null,
              'respOrdersOtherInjunctive': null,
              'respOrdersOtherInjunctiveDateIssued': null,
              'respOrdersOtherInjunctiveEndDate': null,
              'respOrdersOtherInjunctiveCurrent': null,
              'respOrdersOtherInjunctiveCourtName': null,
              'respOrdersOtherInjunctiveCaseNumber': null,
              'respOrdersUndertakingInPlace': null,
              'respOrdersUndertakingInPlaceDateIssued': null,
              'respOrdersUndertakingInPlaceEndDate': null,
              'respOrdersUndertakingInPlaceCurrent': null,
              'respOrdersUndertakingInPlaceCourtName': null,
              'respOrdersUndertakingInPlaceCaseNumber': null,
              'respChildAbductionReasons': null,
              'respPreviousAbductionThreats': null,
              'respPreviousAbductionThreatsDetails': null,
              'respChildrenLocationNow': null,
              'respAbductionPassportOfficeNotified': null,
              'respAbductionPreviousPoliceInvolvement': null,
              'respAbductionPreviousPoliceInvolvementDetails': null,
              'respAbductionChildHasPassport': null,
              'respAohOtherConcernsCourtActions': null,
              'respAgreeChildUnsupervisedTime': null,
              'respAgreeChildSupervisedTime': null,
              'respAgreeChildOtherContact': null,
              'respWhichChildrenAreRiskPhysicalAbuse': {
                'value': [],
                'list_items': []
              },
              'respWhichChildrenAreRiskPsychologicalAbuse': {
                'value': [],
                'list_items': []
              },
              'respWhichChildrenAreRiskSexualAbuse': {
                'value': [],
                'list_items': []
              },
              'respWhichChildrenAreRiskEmotionalAbuse': {
                'value': [],
                'list_items': []
              },
              'respWhichChildrenAreRiskFinancialAbuse': {
                'value': [],
                'list_items': []
              },
              'respAllChildrenAreRiskPhysicalAbuse': null,
              'respAllChildrenAreRiskPsychologicalAbuse': null,
              'respAllChildrenAreRiskSexualAbuse': null,
              'respAllChildrenAreRiskEmotionalAbuse': null,
              'respAllChildrenAreRiskFinancialAbuse': null,
              'responseToAllegationsOfHarmYesOrNoResponse': null,
              'consent': {
                'consentToTheApplication': null,
                'noConsentReason': null,
                'applicationReceivedDate': null,
                'permissionFromCourt': null,
                'courtOrderDetails': null
              },
              'keepDetailsPrivate': {
                'otherPeopleKnowYourContactDetails': null,
                'confidentiality': null,
                'confidentialityList': []
              },
              'citizenDetails': {
                'firstName': null,
                'lastName': null,
                'previousName': null,
                'dateOfBirth': null,
                'placeOfBirth': null,
                'address': {
                  'AddressLine1': null,
                  'AddressLine2': null,
                  'AddressLine3': null,
                  'PostTown': null,
                  'County': null,
                  'PostCode': null,
                  'Country': null
                },
                'addressHistory': {
                  'isAtAddressLessThan5Years': null,
                  'previousAddressHistory': []
                },
                'contact': {
                  'phoneNumber': null,
                  'email': null
                }
              },
              'attendToCourt': {
                'respondentWelshNeeds': null,
                'isRespondentNeededInterpreter': null,
                'haveAnyDisability': null,
                'disabilityNeeds': null,
                'respondentSpecialArrangements': null,
                'respondentSpecialArrangementDetails': null,
                'respondentIntermediaryNeeds': null,
                'respondentIntermediaryNeedDetails': null,
                'respondentWelshNeedsList': [],
                'respondentInterpreterNeeds': []
              },
              'citizenFlags': {
                'isApplicationViewed': null,
                'isAllegationOfHarmViewed': null,
                'isAllDocumentsViewed': null,
                'isResponseInitiated': null,
                'isApplicationToBeServed': null,
                'isStatementOfServiceProvided': null
              },
              'miam': {
                'applicantAttendedMiam': null,
                'claimingExemptionMiam': null,
                'familyMediatorMiam': null,
                'mediatorRegistrationNumber': null,
                'familyMediatorServiceName': null,
                'soleTraderName': null,
                'attendedMiam': null,
                'willingToAttendMiam': null,
                'reasonNotAttendingMiam': null
              },
              'respKeepDetailsPrivate': {
                'otherPeopleKnowYourContactDetails': null,
                'confidentiality': null,
                'confidentialityList': []
              },
              'respKeepDetailsPrivateConfidentiality': {
                'otherPeopleKnowYourContactDetails': null,
                'confidentiality': null,
                'confidentialityList': []
              },
              'respSolHaveYouAttendedMiam': {
                'applicantAttendedMiam': null,
                'claimingExemptionMiam': null,
                'familyMediatorMiam': null,
                'mediatorRegistrationNumber': null,
                'familyMediatorServiceName': null,
                'soleTraderName': null,
                'attendedMiam': null,
                'willingToAttendMiam': null,
                'reasonNotAttendingMiam': null
              },
              'respSolWillingnessToAttendMiam': {
                'applicantAttendedMiam': null,
                'claimingExemptionMiam': null,
                'familyMediatorMiam': null,
                'mediatorRegistrationNumber': null,
                'familyMediatorServiceName': null,
                'soleTraderName': null,
                'attendedMiam': null,
                'willingToAttendMiam': null,
                'reasonNotAttendingMiam': null
              },
              'currentOrPreviousProceedings': {
                'haveChildrenBeenInvolvedInCourtCase': null,
                'courtOrderMadeForProtection': null,
                'proceedingsList': []
              },
              'respondentExistingProceedings': [],
              'respAllegationsOfHarmInfo': {
                'respondentDomesticAbuse': null,
                'respondentChildAbuse': null,
                'isRespondentChildAbduction': null,
                'respondentDrugOrAlcoholAbuse': null,
                'respondentDrugOrAlcoholAbuseDetails': null,
                'respondentOtherSafetyConcerns': null,
                'respondentOtherSafetyConcernsDetails': null,
                'respondentNonMolestationOrder': null,
                'respondentNonMolestationOrderIssueDate': null,
                'respondentNonMolestationOrderEndDate': null,
                'respondentNonMolestationOrderIsCurrent': null,
                'respondentNonMolestationOrderCourt': null,
                'respondentNonMolestationOrderCaseNumber': null,
                'respondentOccupationOrder': null,
                'respondentOccupationOrderIssueDate': null,
                'respondentOccupationOrderEndDate': null,
                'respondentOccupationOrderIsCurrent': null,
                'respondentOccupationOrderCourt': null,
                'respondentOccupationOrderCaseNumber': null,
                'respondentForcedMarriageOrder': null,
                'respondentForcedMarriageIssueDate': null,
                'respondentForcedMarriageEndDate': null,
                'respondentForcedMarriageIsCurrent': null,
                'respondentForcedMarriageCourt': null,
                'respondentForcedMarriageCaseNumber': null,
                'respondentRestrainingOrder': null,
                'respondentRestrainingIssueDate': null,
                'respondentRestrainingEndDate': null,
                'respondentRestrainingIsCurrent': null,
                'respondentRestrainingCourt': null,
                'respondentRestrainingCaseNumber': null,
                'respondentOtherInjunctiveOrder': null,
                'respondentOtherInjunctiveIssueDate': null,
                'respondentOtherInjunctiveEndDate': null,
                'respondentOtherInjunctiveIsCurrent': null,
                'respondentOtherInjunctiveCourt': null,
                'respondentOtherInjunctiveCaseNumber': null,
                'respondentUndertakingOrder': null,
                'respondentUndertakingIssueDate': null,
                'respondentUndertakingEndDate': null,
                'respondentUndertakingIsCurrent': null,
                'respondentUndertakingCourt': null,
                'respondentUndertakingCaseNumber': null
              },
              'respDomesticAbuseInfo': [],
              'respChildAbuseInfo': [],
              'respChildAbductionInfo': {
                'reasonForChildAbductionBelief': null,
                'previousThreatsForChildAbduction': null,
                'previousThreatsForChildAbductionDetails': null,
                'whereIsChild': null,
                'hasPassportOfficeNotified': null,
                'anyOrgInvolvedInPreviousAbduction': null,
                'anyOrgInvolvedInPreviousAbductionDetails': null,
                'childrenHavePassport': null,
                'childrenHaveMoreThanOnePassport': null,
                'whoHasChildPassportOther': null,
                'whoHasChildPassport': []
              },
              'respOtherConcernsInfo': {
                'ordersRespondentWantFromCourt': null,
                'childSpendingUnsupervisedTime': null,
                'childSpendingSupervisedTime': null,
                'childHavingOtherFormOfContact': null
              },
              'internationalElementChildInfo': {
                'childrenLiveOutsideOfEnWl': null,
                'childrenLiveOutsideOfEnWlDetails': null,
                'parentsAnyOneLiveOutsideEnWl': null,
                'parentsAnyOneLiveOutsideEnWlDetails': null,
                'anotherPersonOrderOutsideEnWl': null,
                'anotherPersonOrderOutsideEnWlDetails': null,
                'anotherCountryAskedInformation': null,
                'anotherCountryAskedInformationDetaails': null
              },
              'internationalElementParentInfo': {
                'childrenLiveOutsideOfEnWl': null,
                'childrenLiveOutsideOfEnWlDetails': null,
                'parentsAnyOneLiveOutsideEnWl': null,
                'parentsAnyOneLiveOutsideEnWlDetails': null,
                'anotherPersonOrderOutsideEnWl': null,
                'anotherPersonOrderOutsideEnWlDetails': null,
                'anotherCountryAskedInformation': null,
                'anotherCountryAskedInformationDetaails': null
              },
              'internationalElementJurisdictionInfo': {
                'childrenLiveOutsideOfEnWl': null,
                'childrenLiveOutsideOfEnWlDetails': null,
                'parentsAnyOneLiveOutsideEnWl': null,
                'parentsAnyOneLiveOutsideEnWlDetails': null,
                'anotherPersonOrderOutsideEnWl': null,
                'anotherPersonOrderOutsideEnWlDetails': null,
                'anotherCountryAskedInformation': null,
                'anotherCountryAskedInformationDetaails': null
              },
              'internationalElementRequestInfo': {
                'childrenLiveOutsideOfEnWl': null,
                'childrenLiveOutsideOfEnWlDetails': null,
                'parentsAnyOneLiveOutsideEnWl': null,
                'parentsAnyOneLiveOutsideEnWlDetails': null,
                'anotherPersonOrderOutsideEnWl': null,
                'anotherPersonOrderOutsideEnWlDetails': null,
                'anotherCountryAskedInformation': null,
                'anotherCountryAskedInformationDetaails': null
              },
              'citizenInternationalElements': {
                'childrenLiveOutsideOfEnWl': null,
                'parentsAnyOneLiveOutsideEnWl': null,
                'anotherPersonOrderOutsideEnWl': null,
                'anotherCountryAskedInformation': null,
                'childrenLiveOutsideOfEnWlDetails': null,
                'parentsAnyOneLiveOutsideEnWlDetails': null,
                'anotherPersonOrderOutsideEnWlDetails': null,
                'anotherCountryAskedInformationDetaails': null
              },
              'safetyConcerns': {
                'haveSafetyConcerns': null,
                'child': {
                  'physicalAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'psychologicalAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'emotionalAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'sexualAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'financialAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'somethingElse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  }
                },
                'applicant': {
                  'physicalAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'psychologicalAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'emotionalAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'sexualAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'financialAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'somethingElse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  }
                },
                'respondent': {
                  'physicalAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'psychologicalAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'emotionalAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'sexualAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'financialAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'somethingElse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  }
                },
                'safetyConcernAbout': [],
                'concernAboutChild': [],
                'concernAboutRespondent': [],
                'otherconcerns': {
                  'c1AkeepingSafeStatement': null,
                  'c1AsupervisionAgreementDetails': null,
                  'c1AagreementOtherWaysDetails': null,
                  'c1AotherConcernsDrugs': null,
                  'c1AotherConcernsDrugsDetails': null,
                  'c1AchildSafetyConcerns': null,
                  'c1AchildSafetyConcernsDetails': null
                },
                'abductions': {
                  'c1AabductionReasonOutsideUk': null,
                  'c1AchildsCurrentLocation': null,
                  'c1AchildrenMoreThanOnePassport': null,
                  'c1AprovideOtherDetails': null,
                  'c1ApassportOffice': null,
                  'c1AabductionPassportOfficeNotified': null,
                  'c1ApreviousAbductionsShortDesc': null,
                  'c1ApoliceOrInvestigatorInvolved': null,
                  'c1ApoliceOrInvestigatorOtherDetails': null,
                  'c1AchildAbductedBefore': null,
                  'c1ApossessionChildrenPassport': []
                }
              },
              'supportYouNeed': {
                'describeOtherNeed': null,
                'otherProvideDetails': null,
                'communicationSupportOther': null,
                'otherDetails': null,
                'languageDetails': null,
                'safetyArrangementsDetails': null,
                'travellingOtherDetails': null,
                'hearingDetails': null,
                'signLanguageDetails': null,
                'lightingDetails': null,
                'supportWorkerDetails': null,
                'familyProviderDetails': null,
                'therapyDetails': null,
                'docsDetails': null,
                'largePrintDetails': null,
                'parkingDetails': null,
                'differentChairDetails': null,
                'helpCommunication': [],
                'courtComfort': [],
                'courtHearing': [],
                'docsSupport': [],
                'languageRequirements': [],
                'reasonableAdjustments': [],
                'safetyArrangements': [],
                'travellingToCourt': [],
                'attendingToCourt': []
              },
              'respDomesticBehaviours': [],
              'respChildAbuses': [],
              'respChildPhysicalAbuse': {
                'respAbuseNatureDescription': null,
                'respBehavioursStartDateAndLength': null,
                'respBehavioursApplicantSoughtHelp': null,
                'respBehavioursApplicantHelpSoughtWho': null
              },
              'respChildPsychologicalAbuse': {
                'respAbuseNatureDescription': null,
                'respBehavioursStartDateAndLength': null,
                'respBehavioursApplicantSoughtHelp': null,
                'respBehavioursApplicantHelpSoughtWho': null
              },
              'respChildSexualAbuse': {
                'respAbuseNatureDescription': null,
                'respBehavioursStartDateAndLength': null,
                'respBehavioursApplicantSoughtHelp': null,
                'respBehavioursApplicantHelpSoughtWho': null
              },
              'respChildEmotionalAbuse': {
                'respAbuseNatureDescription': null,
                'respBehavioursStartDateAndLength': null,
                'respBehavioursApplicantSoughtHelp': null,
                'respBehavioursApplicantHelpSoughtWho': null
              },
              'respChildFinancialAbuse': {
                'respAbuseNatureDescription': null,
                'respBehavioursStartDateAndLength': null,
                'respBehavioursApplicantSoughtHelp': null,
                'respBehavioursApplicantHelpSoughtWho': null
              },
              'respChildPassportDetails': {
                'respChildHasMultiplePassports': null,
                'respChildPassportPossessionOtherDetails': null,
                'respChildPassportPossession': []
              }
            },
            'partyLevelFlag': {
              'roleOnCase': null,
              'partyName': null,
              'groupId': null,
              'visibility': null,
              'details': []
            }
          },
          'id': '4af96cd3-2045-4702-b88d-62be4b20ea77'
        }
      ]
    }
  },


  'Other people in the case': {
    eventId: 'otherPeopleInTheCaseRevised',
    'data': {
      'otherPartyInTheCaseRevised': [
        {
          'value': {
            'firstName': 'tes othr',
            'lastName': 'test other ln',
            'previousName': null,
            'isDateOfBirthKnown': 'No',
            'dateOfBirth': null,
            'gender': 'male',
            'otherGender': null,
            'isPlaceOfBirthKnown': 'No',
            'placeOfBirth': null,
            'isCurrentAddressKnown': 'No',
            'isAddressConfidential': null,
            'isAtAddressLessThan5Years': 'No',
            'addressLivedLessThan5YearsDetails': null,
            'canYouProvideEmailAddress': 'No',
            'email': null,
            'isEmailAddressConfidential': null,
            'canYouProvidePhoneNumber': 'No',
            'phoneNumber': null,
            'isPhoneNumberConfidential': null,
            'isDateOfBirthUnknown': null,
            'isAddressUnknown': null,
            'landline': null,
            'relationshipToChildren': null,
            'dxNumber': null,
            'solicitorReference': null,
            'representativeFirstName': null,
            'representativeLastName': null,
            'isAtAddressLessThan5YearsWithDontKnow': null,
            'doTheyHaveLegalRepresentation': null,
            'sendSignUpLink': null,
            'solicitorEmail': null,
            'solicitorTelephone': null,
            'respondentLivedWithApplicant': null,
            'applicantContactInstructions': null,
            'currentRespondent': null,
            'partyId': null,
            'solicitorPartyId': null,
            'solicitorOrgUuid': null,
            'contactPreferences': null,
            'isRemoveLegalRepresentativeRequested': null,
            'solicitorOrg': {
              'OrganisationID': null,
              'OrganisationName': null
            },
            'solicitorAddress': {
              'AddressLine1': null,
              'AddressLine2': null,
              'AddressLine3': null,
              'PostTown': null,
              'County': null,
              'PostCode': null,
              'Country': null
            },
            'otherPersonRelationshipToChildren': [],
            'applicantPreferredContact': [],
            'user': {
              'idamId': null,
              'email': null,
              'solicitorRepresented': null
            },
            'response': {
              'legalRepresentation': null,
              'currentOrPastProceedingsForChildren': null,
              'factorsAffectingAbilityToParticipate': null,
              'provideDetailsForFactorsAffectingAbilityToParticipate': null,
              'giveDetailsAffectingLitigationCapacity': null,
              'detailsOfReferralOrAssessment': null,
              'respAohYesOrNo': null,
              'safeToCallOption': null,
              'c7ResponseSubmitted': null,
              'c1AResponseSubmitted': null,
              'activeRespondent': null,
              'respAohDomesticAbuseYesNo': null,
              'respAohChildAbductionYesNo': null,
              'respAohChildAbuseYesNo': null,
              'respAohSubstanceAbuseYesNo': null,
              'respAohSubstanceAbuseDetails': null,
              'respAohOtherConcerns': null,
              'respAohOtherConcernsDetails': null,
              'respOrdersNonMolestation': null,
              'respOrdersNonMolestationDateIssued': null,
              'respOrdersNonMolestationEndDate': null,
              'respOrdersNonMolestationCurrent': null,
              'respOrdersNonMolestationCourtName': null,
              'respOrdersNonMolestationCaseNumber': null,
              'respOrdersOccupation': null,
              'respOrdersOccupationDateIssued': null,
              'respOrdersOccupationEndDate': null,
              'respOrdersOccupationCurrent': null,
              'respOrdersOccupationCourtName': null,
              'respOrdersOccupationCaseNumber': null,
              'respOrdersForcedMarriageProtection': null,
              'respOrdersForcedMarriageProtectionDateIssued': null,
              'respOrdersForcedMarriageProtectionEndDate': null,
              'respOrdersForcedMarriageProtectionCurrent': null,
              'respOrdersForcedMarriageProtectionCourtName': null,
              'respOrdersForcedMarriageProtectionCaseNumber': null,
              'respOrdersRestraining': null,
              'respOrdersRestrainingDateIssued': null,
              'respOrdersRestrainingEndDate': null,
              'respOrdersRestrainingCurrent': null,
              'respOrdersRestrainingCourtName': null,
              'respOrdersRestrainingCaseNumber': null,
              'respOrdersOtherInjunctive': null,
              'respOrdersOtherInjunctiveDateIssued': null,
              'respOrdersOtherInjunctiveEndDate': null,
              'respOrdersOtherInjunctiveCurrent': null,
              'respOrdersOtherInjunctiveCourtName': null,
              'respOrdersOtherInjunctiveCaseNumber': null,
              'respOrdersUndertakingInPlace': null,
              'respOrdersUndertakingInPlaceDateIssued': null,
              'respOrdersUndertakingInPlaceEndDate': null,
              'respOrdersUndertakingInPlaceCurrent': null,
              'respOrdersUndertakingInPlaceCourtName': null,
              'respOrdersUndertakingInPlaceCaseNumber': null,
              'respChildAbductionReasons': null,
              'respPreviousAbductionThreats': null,
              'respPreviousAbductionThreatsDetails': null,
              'respChildrenLocationNow': null,
              'respAbductionPassportOfficeNotified': null,
              'respAbductionPreviousPoliceInvolvement': null,
              'respAbductionPreviousPoliceInvolvementDetails': null,
              'respAbductionChildHasPassport': null,
              'respAohOtherConcernsCourtActions': null,
              'respAgreeChildUnsupervisedTime': null,
              'respAgreeChildSupervisedTime': null,
              'respAgreeChildOtherContact': null,
              'respWhichChildrenAreRiskPhysicalAbuse': {
                'value': [],
                'list_items': []
              },
              'respWhichChildrenAreRiskPsychologicalAbuse': {
                'value': [],
                'list_items': []
              },
              'respWhichChildrenAreRiskSexualAbuse': {
                'value': [],
                'list_items': []
              },
              'respWhichChildrenAreRiskEmotionalAbuse': {
                'value': [],
                'list_items': []
              },
              'respWhichChildrenAreRiskFinancialAbuse': {
                'value': [],
                'list_items': []
              },
              'respAllChildrenAreRiskPhysicalAbuse': null,
              'respAllChildrenAreRiskPsychologicalAbuse': null,
              'respAllChildrenAreRiskSexualAbuse': null,
              'respAllChildrenAreRiskEmotionalAbuse': null,
              'respAllChildrenAreRiskFinancialAbuse': null,
              'responseToAllegationsOfHarmYesOrNoResponse': null,
              'consent': {
                'consentToTheApplication': null,
                'noConsentReason': null,
                'applicationReceivedDate': null,
                'permissionFromCourt': null,
                'courtOrderDetails': null
              },
              'keepDetailsPrivate': {
                'otherPeopleKnowYourContactDetails': null,
                'confidentiality': null,
                'confidentialityList': []
              },
              'citizenDetails': {
                'firstName': null,
                'lastName': null,
                'previousName': null,
                'dateOfBirth': null,
                'placeOfBirth': null,
                'address': {
                  'AddressLine1': null,
                  'AddressLine2': null,
                  'AddressLine3': null,
                  'PostTown': null,
                  'County': null,
                  'PostCode': null,
                  'Country': null
                },
                'addressHistory': {
                  'isAtAddressLessThan5Years': null,
                  'previousAddressHistory': []
                },
                'contact': {
                  'phoneNumber': null,
                  'email': null
                }
              },
              'attendToCourt': {
                'respondentWelshNeeds': null,
                'isRespondentNeededInterpreter': null,
                'haveAnyDisability': null,
                'disabilityNeeds': null,
                'respondentSpecialArrangements': null,
                'respondentSpecialArrangementDetails': null,
                'respondentIntermediaryNeeds': null,
                'respondentIntermediaryNeedDetails': null,
                'respondentWelshNeedsList': [],
                'respondentInterpreterNeeds': []
              },
              'citizenFlags': {
                'isApplicationViewed': null,
                'isAllegationOfHarmViewed': null,
                'isAllDocumentsViewed': null,
                'isResponseInitiated': null,
                'isApplicationToBeServed': null,
                'isStatementOfServiceProvided': null
              },
              'miam': {
                'applicantAttendedMiam': null,
                'claimingExemptionMiam': null,
                'familyMediatorMiam': null,
                'mediatorRegistrationNumber': null,
                'familyMediatorServiceName': null,
                'soleTraderName': null,
                'attendedMiam': null,
                'willingToAttendMiam': null,
                'reasonNotAttendingMiam': null
              },
              'respKeepDetailsPrivate': {
                'otherPeopleKnowYourContactDetails': null,
                'confidentiality': null,
                'confidentialityList': []
              },
              'respKeepDetailsPrivateConfidentiality': {
                'otherPeopleKnowYourContactDetails': null,
                'confidentiality': null,
                'confidentialityList': []
              },
              'respSolHaveYouAttendedMiam': {
                'applicantAttendedMiam': null,
                'claimingExemptionMiam': null,
                'familyMediatorMiam': null,
                'mediatorRegistrationNumber': null,
                'familyMediatorServiceName': null,
                'soleTraderName': null,
                'attendedMiam': null,
                'willingToAttendMiam': null,
                'reasonNotAttendingMiam': null
              },
              'respSolWillingnessToAttendMiam': {
                'applicantAttendedMiam': null,
                'claimingExemptionMiam': null,
                'familyMediatorMiam': null,
                'mediatorRegistrationNumber': null,
                'familyMediatorServiceName': null,
                'soleTraderName': null,
                'attendedMiam': null,
                'willingToAttendMiam': null,
                'reasonNotAttendingMiam': null
              },
              'currentOrPreviousProceedings': {
                'haveChildrenBeenInvolvedInCourtCase': null,
                'courtOrderMadeForProtection': null,
                'proceedingsList': []
              },
              'respondentExistingProceedings': [],
              'respAllegationsOfHarmInfo': {
                'respondentDomesticAbuse': null,
                'respondentChildAbuse': null,
                'isRespondentChildAbduction': null,
                'respondentDrugOrAlcoholAbuse': null,
                'respondentDrugOrAlcoholAbuseDetails': null,
                'respondentOtherSafetyConcerns': null,
                'respondentOtherSafetyConcernsDetails': null,
                'respondentNonMolestationOrder': null,
                'respondentNonMolestationOrderIssueDate': null,
                'respondentNonMolestationOrderEndDate': null,
                'respondentNonMolestationOrderIsCurrent': null,
                'respondentNonMolestationOrderCourt': null,
                'respondentNonMolestationOrderCaseNumber': null,
                'respondentOccupationOrder': null,
                'respondentOccupationOrderIssueDate': null,
                'respondentOccupationOrderEndDate': null,
                'respondentOccupationOrderIsCurrent': null,
                'respondentOccupationOrderCourt': null,
                'respondentOccupationOrderCaseNumber': null,
                'respondentForcedMarriageOrder': null,
                'respondentForcedMarriageIssueDate': null,
                'respondentForcedMarriageEndDate': null,
                'respondentForcedMarriageIsCurrent': null,
                'respondentForcedMarriageCourt': null,
                'respondentForcedMarriageCaseNumber': null,
                'respondentRestrainingOrder': null,
                'respondentRestrainingIssueDate': null,
                'respondentRestrainingEndDate': null,
                'respondentRestrainingIsCurrent': null,
                'respondentRestrainingCourt': null,
                'respondentRestrainingCaseNumber': null,
                'respondentOtherInjunctiveOrder': null,
                'respondentOtherInjunctiveIssueDate': null,
                'respondentOtherInjunctiveEndDate': null,
                'respondentOtherInjunctiveIsCurrent': null,
                'respondentOtherInjunctiveCourt': null,
                'respondentOtherInjunctiveCaseNumber': null,
                'respondentUndertakingOrder': null,
                'respondentUndertakingIssueDate': null,
                'respondentUndertakingEndDate': null,
                'respondentUndertakingIsCurrent': null,
                'respondentUndertakingCourt': null,
                'respondentUndertakingCaseNumber': null
              },
              'respDomesticAbuseInfo': [],
              'respChildAbuseInfo': [],
              'respChildAbductionInfo': {
                'reasonForChildAbductionBelief': null,
                'previousThreatsForChildAbduction': null,
                'previousThreatsForChildAbductionDetails': null,
                'whereIsChild': null,
                'hasPassportOfficeNotified': null,
                'anyOrgInvolvedInPreviousAbduction': null,
                'anyOrgInvolvedInPreviousAbductionDetails': null,
                'childrenHavePassport': null,
                'childrenHaveMoreThanOnePassport': null,
                'whoHasChildPassportOther': null,
                'whoHasChildPassport': []
              },
              'respOtherConcernsInfo': {
                'ordersRespondentWantFromCourt': null,
                'childSpendingUnsupervisedTime': null,
                'childSpendingSupervisedTime': null,
                'childHavingOtherFormOfContact': null
              },
              'internationalElementChildInfo': {
                'childrenLiveOutsideOfEnWl': null,
                'childrenLiveOutsideOfEnWlDetails': null,
                'parentsAnyOneLiveOutsideEnWl': null,
                'parentsAnyOneLiveOutsideEnWlDetails': null,
                'anotherPersonOrderOutsideEnWl': null,
                'anotherPersonOrderOutsideEnWlDetails': null,
                'anotherCountryAskedInformation': null,
                'anotherCountryAskedInformationDetaails': null
              },
              'internationalElementParentInfo': {
                'childrenLiveOutsideOfEnWl': null,
                'childrenLiveOutsideOfEnWlDetails': null,
                'parentsAnyOneLiveOutsideEnWl': null,
                'parentsAnyOneLiveOutsideEnWlDetails': null,
                'anotherPersonOrderOutsideEnWl': null,
                'anotherPersonOrderOutsideEnWlDetails': null,
                'anotherCountryAskedInformation': null,
                'anotherCountryAskedInformationDetaails': null
              },
              'internationalElementJurisdictionInfo': {
                'childrenLiveOutsideOfEnWl': null,
                'childrenLiveOutsideOfEnWlDetails': null,
                'parentsAnyOneLiveOutsideEnWl': null,
                'parentsAnyOneLiveOutsideEnWlDetails': null,
                'anotherPersonOrderOutsideEnWl': null,
                'anotherPersonOrderOutsideEnWlDetails': null,
                'anotherCountryAskedInformation': null,
                'anotherCountryAskedInformationDetaails': null
              },
              'internationalElementRequestInfo': {
                'childrenLiveOutsideOfEnWl': null,
                'childrenLiveOutsideOfEnWlDetails': null,
                'parentsAnyOneLiveOutsideEnWl': null,
                'parentsAnyOneLiveOutsideEnWlDetails': null,
                'anotherPersonOrderOutsideEnWl': null,
                'anotherPersonOrderOutsideEnWlDetails': null,
                'anotherCountryAskedInformation': null,
                'anotherCountryAskedInformationDetaails': null
              },
              'citizenInternationalElements': {
                'childrenLiveOutsideOfEnWl': null,
                'parentsAnyOneLiveOutsideEnWl': null,
                'anotherPersonOrderOutsideEnWl': null,
                'anotherCountryAskedInformation': null,
                'childrenLiveOutsideOfEnWlDetails': null,
                'parentsAnyOneLiveOutsideEnWlDetails': null,
                'anotherPersonOrderOutsideEnWlDetails': null,
                'anotherCountryAskedInformationDetaails': null
              },
              'safetyConcerns': {
                'haveSafetyConcerns': null,
                'child': {
                  'physicalAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'psychologicalAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'emotionalAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'sexualAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'financialAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'somethingElse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  }
                },
                'applicant': {
                  'physicalAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'psychologicalAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'emotionalAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'sexualAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'financialAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'somethingElse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  }
                },
                'respondent': {
                  'physicalAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'psychologicalAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'emotionalAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'sexualAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'financialAbuse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  },
                  'somethingElse': {
                    'behaviourDetails': null,
                    'behaviourStartDate': null,
                    'isOngoingBehaviour': null,
                    'seekHelpFromPersonOrAgency': null,
                    'seekHelpDetails': null,
                    'childrenConcernedAbout': null
                  }
                },
                'safetyConcernAbout': [],
                'concernAboutChild': [],
                'concernAboutRespondent': [],
                'otherconcerns': {
                  'c1AkeepingSafeStatement': null,
                  'c1AsupervisionAgreementDetails': null,
                  'c1AagreementOtherWaysDetails': null,
                  'c1AotherConcernsDrugs': null,
                  'c1AotherConcernsDrugsDetails': null,
                  'c1AchildSafetyConcerns': null,
                  'c1AchildSafetyConcernsDetails': null
                },
                'abductions': {
                  'c1AabductionReasonOutsideUk': null,
                  'c1AchildsCurrentLocation': null,
                  'c1AchildrenMoreThanOnePassport': null,
                  'c1AprovideOtherDetails': null,
                  'c1ApassportOffice': null,
                  'c1AabductionPassportOfficeNotified': null,
                  'c1ApreviousAbductionsShortDesc': null,
                  'c1ApoliceOrInvestigatorInvolved': null,
                  'c1ApoliceOrInvestigatorOtherDetails': null,
                  'c1AchildAbductedBefore': null,
                  'c1ApossessionChildrenPassport': []
                }
              },
              'supportYouNeed': {
                'describeOtherNeed': null,
                'otherProvideDetails': null,
                'communicationSupportOther': null,
                'otherDetails': null,
                'languageDetails': null,
                'safetyArrangementsDetails': null,
                'travellingOtherDetails': null,
                'hearingDetails': null,
                'signLanguageDetails': null,
                'lightingDetails': null,
                'supportWorkerDetails': null,
                'familyProviderDetails': null,
                'therapyDetails': null,
                'docsDetails': null,
                'largePrintDetails': null,
                'parkingDetails': null,
                'differentChairDetails': null,
                'helpCommunication': [],
                'courtComfort': [],
                'courtHearing': [],
                'docsSupport': [],
                'languageRequirements': [],
                'reasonableAdjustments': [],
                'safetyArrangements': [],
                'travellingToCourt': [],
                'attendingToCourt': []
              },
              'respDomesticBehaviours': [],
              'respChildAbuses': [],
              'respChildPhysicalAbuse': {
                'respAbuseNatureDescription': null,
                'respBehavioursStartDateAndLength': null,
                'respBehavioursApplicantSoughtHelp': null,
                'respBehavioursApplicantHelpSoughtWho': null
              },
              'respChildPsychologicalAbuse': {
                'respAbuseNatureDescription': null,
                'respBehavioursStartDateAndLength': null,
                'respBehavioursApplicantSoughtHelp': null,
                'respBehavioursApplicantHelpSoughtWho': null
              },
              'respChildSexualAbuse': {
                'respAbuseNatureDescription': null,
                'respBehavioursStartDateAndLength': null,
                'respBehavioursApplicantSoughtHelp': null,
                'respBehavioursApplicantHelpSoughtWho': null
              },
              'respChildEmotionalAbuse': {
                'respAbuseNatureDescription': null,
                'respBehavioursStartDateAndLength': null,
                'respBehavioursApplicantSoughtHelp': null,
                'respBehavioursApplicantHelpSoughtWho': null
              },
              'respChildFinancialAbuse': {
                'respAbuseNatureDescription': null,
                'respBehavioursStartDateAndLength': null,
                'respBehavioursApplicantSoughtHelp': null,
                'respBehavioursApplicantHelpSoughtWho': null
              },
              'respChildPassportDetails': {
                'respChildHasMultiplePassports': null,
                'respChildPassportPossessionOtherDetails': null,
                'respChildPassportPossession': []
              }
            },
            'partyLevelFlag': {
              'roleOnCase': null,
              'partyName': null,
              'groupId': null,
              'visibility': null,
              'details': []
            }
          },
          'id': null
        }
      ]
    }
  },

  'Other children not in the case': {
    eventId: 'otherChildNotInTheCase',
    'data': { 'childrenNotPartInTheCaseYesNo': 'No' }
  },

  'Children and applicants': {
    eventId: 'childrenAndApplicants',
    'data': {
      'buffChildAndApplicantRelations': [
        {
          'value': {
            'applicantFullName': 'test test',
            'childFullName': 'Test test',
            'childAndApplicantRelation': 'mother',
            'childAndApplicantRelationOtherDetails': null,
            'childLivesWith': 'No',
            'applicantId': '8f0f3e50-e333-4b09-8db5-4bd6697b45c3',
            'childId': 'c71a8e64-0a1d-42e9-9019-b2a425814368'
          },
          'id': '1c037a8b-5a03-466e-bb04-3067d1c498ff'
        }
      ]
    }
  },

  'Children and respondents': {
    eventId: 'childrenAndRespondents',
    'data': {
      'buffChildAndRespondentRelations': [
        {
          'value': {
            'respondentFullName': 'test resp test resp ln',
            'childFullName': 'Test test',
            'childAndRespondentRelation': 'mother',
            'childAndRespondentRelationOtherDetails': null,
            'childLivesWith': 'No',
            'respondentId': '4af96cd3-2045-4702-b88d-62be4b20ea77',
            'childId': 'c71a8e64-0a1d-42e9-9019-b2a425814368'
          },
          'id': '084b5dbc-374e-4e5b-b7e9-fe5ed9966605'
        }
      ]
    }
  },

  'Children and other people': {
    eventId: 'childrenAndOtherPeople',
    'data': {
      'buffChildAndOtherPeopleRelations': [
        {
          'value': {
            'otherPeopleFullName': 'tes othr test other ln',
            'childFullName': 'Test test',
            'childAndOtherPeopleRelation': 'mother',
            'childAndOtherPeopleRelationOtherDetails': null,
            'childLivesWith': 'No',
            'isChildLivesWithPersonConfidential': null,
            'otherPeopleId': 'f11eed6b-8908-4ae0-be50-10aa3017e58a',
            'childId': 'c71a8e64-0a1d-42e9-9019-b2a425814368'
          },
          'id': '2677dc99-a9c5-4f2a-aab7-670cca210e1b'
        }
      ]
    }
  },

  'Allegations of harm': {
    eventId: 'allegationsOfHarmRevised',
    'data': { 'newAllegationsOfHarmYesNo': 'No' }
  },

  'MIAM': {
    eventId: 'miamPolicyUpgrade',
    'data': {
      'mpuChildInvolvedInMiam': 'No',
      'mpuApplicantAttendedMiam': 'No',
      'mpuClaimingExemptionMiam': 'Yes',
      'mpuExemptionReasons': ['mpuChildProtectionConcern'],
      'mpuChildProtectionConcernReason': 'mpuChildProtectionConcern_value_1'
    }
  },

  'Other proceedings': {
    eventId: 'otherProceedings',
    'data': { previousOrOngoingProceedingsForChildren: 'no' }
  },

  'Attending the hearing': {
    eventId: 'attendingTheHearing',
    'data': {
      'isWelshNeeded': 'Yes',
      'welshNeeds': [],
      'isInterpreterNeeded': 'No',
      'isDisabilityPresent': 'No',
      'isSpecialArrangementsRequired': 'No',
      'isIntermediaryNeeded': 'No'
    }
  },

  'International element': {
    eventId: 'internationalElement',
    'data': {
      'habitualResidentInOtherState': 'No',
      'jurisdictionIssue': 'No',
      'requestToForeignAuthority': 'No'
    }
  },

  'Litigation capacity': {
    eventId: 'litigationCapacity',
    'data': {
      'litigationCapacityFactors': null,
      'litigationCapacityReferrals': null,
      'litigationCapacityOtherFactors': 'No'
    }
  },

  'Welsh language requirements': {
    eventId: 'welshLanguageRequirements',
    'data': { 'welshLanguageRequirement': 'No' }
  },

  'Submit and pay': {
    eventId: 'submitAndPay',
    'data': {
      'confidentialityDisclaimer': { 'confidentialityChecksChecked': ['confidentialityChecksChecked'] },
      'applicantSolicitorEmailAddress': 'prl-automationtestsolicitor@mailinator.com',
      'caseworkerEmailAddress': 'aloknath.datta@hmcts.net',
      'courtName': 'Central Family Court',
      'solicitorName': 'PRL Automation Test Solicitor',
      'payAgreeStatement': ['agree'],
      'feeAmount': '£255.00',
      'submitAndPayDownloadApplicationLink': {
        'document_url': 'http://dm-store-aat.service.core-compute-aat.internal/documents/2cd2f95f-41d8-4df3-9863-6e6229d0846a',
        'document_binary_url': 'http://dm-store-aat.service.core-compute-aat.internal/documents/2cd2f95f-41d8-4df3-9863-6e6229d0846a/binary',
        'document_filename': 'Draft_C100_application.pdf',
        'document_hash': '8ce1c2b04118a3d1619fc3fdb109d6f44e8c6f70b48a5b455f5031f265546888'
      },
      'submitAndPayDownloadApplicationWelshLink': null,
      'helpWithFees': 'No'
    }
  },

  'Dummy Payment confirmation': {
    eventId: 'testingSupportPaymentSuccessCallback',
    'data': {}
  },

  'Issue and send to local court': {
    eventId: 'issueAndSendToLocalCourtCallback',
    'data': {
      'courtList': {
        'value': {
          'code': '827534:',
          'label': 'Aberystwyth Justice Centre - Trefechan - SY23 1AS'
        },
        'list_items': [
          {
            'code': '827534:',
            'label': 'Aberystwyth Justice Centre - Trefechan - SY23 1AS'
          },
          {
            'code': '101959:',
            'label': 'Carmarthen County Court and Tribunal Hearing Centre - Hill House, Picton Terrace, Carmarthen - SA31 3BT'
          },
          {
            'code': '816875:test@hmcts.net',
            'label': 'Chelmsford County and Family Court - Priory Place - CM2 0PP'
          },
          {
            'code': '497679:test@hmcts.net',
            'label': 'Coventry Combined Court Centre - Much Park Street, Coventry - CV1 2SN'
          },
          {
            'code': '898213:test@hmcts.net',
            'label': 'East London Family Court - Westferry Circus (Westferry House), Part Ground, 6th And 7th Floors, 11 Westferry Circus, Canary Wharf, London, E14 4HE - E14 4HD'
          },
          {
            'code': '735217:test@hmcts.net',
            'label': 'Exeter Combined Court Centre - Southernhay Gardens, Exeter - EX1 1UH'
          },
          {
            'code': '198592:test@hmcts.net',
            'label': 'Gloucestershire Family and Civil Court - Kimbrose Way, Gloucester Docks - GL1 2DE'
          },
          {
            'code': '700596:',
            'label': 'Haverfordwest County and Family - Penffynnon, Hawthorn Rise - SA61 2AZ'
          },
          {
            'code': '195520:test@hmcts.net',
            'label': 'Kingston-upon-Hull Combined Court Centre - The Combined Court Centre - HU1 2EZ'
          },
          {
            'code': '195465:test@hmcts.net',
            'label': 'Lincoln County Court and Family Court - High Street - LN5 7PS'
          },
          {
            'code': '390932:',
            'label': 'Llanelli Law Courts - Town Hall Square, Llanelli - SA15 3AW'
          },
          {
            'code': '487294:test@hmcts.net',
            'label': 'Medway County Court and Family Court - 47-67 High Street Chatham Kent - ME4 4DW'
          },
          {
            'code': '366796:test@hmcts.net',
            'label': 'Newcastle Civil & Family Courts and Tribunals Centre - Barras Bridge, Newcastle-Upon-Tyne - NE99 1NA'
          },
          {
            'code': '471569:test@hmcts.net',
            'label': 'Peterborough Combined Court Centre - Crown Buildings, Rivergate - PE1 1EJ'
          },
          {
            'code': '846055:',
            'label': 'Port Talbot Justice Centre - Harbourside Road - SA13 1SB'
          },
          {
            'code': '43104:test@hmcts.net',
            'label': 'Southampton Combined Court Centre - The Courts of Justice, London Road - SO15 2XQ'
          },
          {
            'code': '234946:',
            'label': 'Swansea Civil Justice Centre - Quay West, Quay Parade - SA1 1SP'
          }
        ]
      }
    }
  },

  'Send to gatekeeper': {
    eventId: 'sendToGateKeeper',
    'data': { isSpecificGateKeeperNeeded: 'No' }
  },

  'Service of application': {
    eventId: 'serviceOfApplication',
    'data': { isSpecificGateKeeperNeeded: 'No' }
  },

  'Service of application': {
    eventId: 'serviceOfApplication',
    'data': {
      "serviceOfApplicationHeader": null,
      "isConfidential": "No",
      "sentDocumentPlaceHolder": "<details class='govuk-details'>\n\n<summary class='govuk-details__summary'>\n\n<h3 class='govuk-details__summary-text'>\n\nDocuments served in the pack\n\n</h3>\n\n</summary>\n\n<div class='govuk-details__text'>\n\nCertain documents will be automatically included in the pack this is served on parties(the people in the case)\n\nThis includes\n\n<ul><li>C100</li><li>C1A</li><li>C7</li><li>C1A (if applicable)</li><li>C8 (Cafcass/Cafcass Cymru, if applicable)</li>\n\n<li>Any orders and hearing notices created at the initial gatekeeping stage</li></ul>\n\nYou do not need to upload these documents yourself\n\n</div>\n\n</details>",
      "specialArrangementsLetter": {
        "document_url": "http://dm-store-aat.service.core-compute-aat.internal/documents/84c40bc2-f5ff-4038-baab-885231c5b9bc",
        "document_binary_url": "http://dm-store-aat.service.core-compute-aat.internal/documents/84c40bc2-f5ff-4038-baab-885231c5b9bc/binary",
        "document_filename": "prl-5427_1.png"
      },
      "additionalDocumentsList": [],
      "caseTypeOfApplication": "C100",
      "soaIsOrderListEmpty": "Yes",
      "missingAddressWarningText": "<div class='govuk-warning-text'><span class='govuk-warning-text__icon' aria-hidden='true'>!</span><strong class='govuk-warning-text__text'>There is no postal address for a respondent and other people in the case</strong></div>",
      "caseCreatedBy": "SOLICITOR",
      "isC8CheckNeeded": null,
      "responsibleForService": null,
      "isOccupationOrderSelected": null,
      "soaServeToRespondentOptions": "Yes",
      "soaServingRespondentsOptionsCA": "applicantLegalRepresentative",
      "soaOtherParties": {
        "value": [],
        "list_items": [
          {
            "code": "9e10529f-0f90-4f6b-bed9-ddcb4b9b5558",
            "label": "tes othr test other ln"
          }
        ]
      },
      "soaCafcassCymruServedOptions": "No",
      "soaServeLocalAuthorityYesOrNo": "No"
    }
  },

  'Statement of service': {
    eventId: 'statementOfService',
    'data': {
      "stmtOfServiceWhatWasServed": "statementOfServiceApplicationPack",
      "stmtOfServiceAddRecipient": [
        {
          "value": {
            "respondentDynamicList": {
              "value": {
                "code": "4af96cd3-2045-4702-b88d-62be4b20ea77",
                "label": "test resp test resp ln (Respondent 1)"
              },
              "list_items": [
                {
                  "code": "4af96cd3-2045-4702-b88d-62be4b20ea77",
                  "label": "test resp test resp ln (Respondent 1)"
                },
                {
                  "code": "All respondents",
                  "label": "All respondents"
                }
              ]
            },
            "servedDateTimeOption": "2024-06-02T00:00:00.000",
            "selectedPartyName": null,
            "citizenPartiesServedList": null,
            "citizenPartiesServedDate": null,
            "selectedPartyId": null,
            "stmtOfServiceDocument": {
              "document_url": "http://dm-store-aat.service.core-compute-aat.internal/documents/41e09a71-bc1d-4b17-9a46-aabe87ca0f8c",
              "document_binary_url": "http://dm-store-aat.service.core-compute-aat.internal/documents/41e09a71-bc1d-4b17-9a46-aabe87ca0f8c/binary",
              "document_filename": "prl-5427_1.png"
            },
            "citizenSosDocs": []
          },
          "id": "1cae9da2-2961-4a14-8b71-98ada280d79f"
        }
      ]
    }
  },

  'Add case note': {
    eventId: 'addCaseNote',
    'data': {
      addCaseNoteHeaderCaseNameText: `Case Name: Test Case C100 ${Date.now()}`,
      caseNote: ' Api util test note 1',
      subject: 'API util'
    }
  }
};
