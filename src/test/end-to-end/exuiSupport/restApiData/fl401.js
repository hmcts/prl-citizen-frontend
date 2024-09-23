

const applicantOneFN = 'pplicantone fn';
const applicantoneLN = 'applicantone ln'

const respondentoneFN = 'respondentone fn';
const respondentoneLN = 'respondentone ln'

module.exports = {

    'Solicitor application' : {
        eventId: 'solicitorCreate',
        'data': {
            "caseTypeOfApplication": "FL401",
            "caseFromCourtNav": "No",
            "applicantOrganisationPolicy": {
                "OrgPolicyCaseAssignedRole": "[APPLICANTSOLICITOR]",
                "OrgPolicyReference": null,
                "PrepopulateToUsersOrganisation": null,
                "LastNoCRequestedBy": null,
                "PreviousOrganisations": [],
                "Organisation": {
                    "OrganisationID": null,
                    "OrganisationName": null
                }
            },
            "confidentialityStatementDisclaimer": [
                "confidentialityStatementUnderstood"
            ],
            "applicantOrRespondentCaseName": "auto test case 401"
        }
    },

    'Type of application': {
        eventId: 'fl401TypeOfApplication',
        'data': {
            "typeOfApplicationOrders": {
                "orderType": [
                    "nonMolestationOrder"
                ]
            },
            "typeOfApplicationLinkToCA": {
                "linkToCaApplication": "No",
                "caApplicationNumber": null
            }
        }
    },
    'Without notice order': {
        eventId: 'withoutNoticeOrderDetails',
        'data': {
            "orderWithoutGivingNoticeToRespondent": {
                "orderWithoutGivingNotice": "Yes"
            },
            "reasonForOrderWithoutGivingNotice": {
                "futherDetails": "test details",
                "reasonForOrderWithoutGivingNotice": [
                    "harmToApplicantOrChild",
                    "deferringApplicationIfNotImmediate",
                    "prejudiced"
                ]
            },
            "bailDetails": {
                "isRespondentAlreadyInBailCondition": "no",
                "bailConditionEndDate": null
            },
            "anyOtherDtailsForWithoutNoticeOrder": {
                "otherDetails": "none"
            }
        }
    },

    'Applicant details': {
        eventId: 'applicantsDetails',
        'data': {
            "applicantsFL401": {
                "firstName": "applicantone fn",
                "lastName": "respondentone ln",
                "previousName": null,
                "dateOfBirth": "2000-01-01",
                "gender": "male",
                "otherGender": null,
                "isAddressConfidential": "No",
                "canYouProvideEmailAddress": "No",
                "email": null,
                "isEmailAddressConfidential": null,
                "phoneNumber": "09876543211",
                "isPhoneNumberConfidential": "No",
                "representativeFirstName": "applicantSol fn",
                "representativeLastName": "applicantSol ln",
                "solicitorEmail": "testapplicantsol@sol.com",
                "solicitorTelephone": "09876543211",
                "solicitorReference": "",
                "dxNumber": null,
                "isDateOfBirthUnknown": null,
                "placeOfBirth": null,
                "isAddressUnknown": null,
                "isAtAddressLessThan5Years": null,
                "addressLivedLessThan5YearsDetails": null,
                "landline": null,
                "relationshipToChildren": null,
                "isDateOfBirthKnown": null,
                "isCurrentAddressKnown": null,
                "canYouProvidePhoneNumber": null,
                "isPlaceOfBirthKnown": null,
                "isAtAddressLessThan5YearsWithDontKnow": null,
                "doTheyHaveLegalRepresentation": null,
                "sendSignUpLink": null,
                "respondentLivedWithApplicant": null,
                "applicantContactInstructions": null,
                "currentRespondent": null,
                "partyId": "3f327962-d96c-48d8-a093-1602b938fa5b",
                "solicitorPartyId": "76b272d9-4331-4ed6-a603-c93ae1583e13",
                "solicitorOrgUuid": "b4aff833-5fa8-4c8d-99b7-ad647b977186",
                "contactPreferences": null,
                "isRemoveLegalRepresentativeRequested": null,
                "address": {
                    "AddressLine1": "Flat 10",
                    "AddressLine2": "Sheraton House",
                    "AddressLine3": "Churchill Gardens",
                    "PostTown": "London",
                    "County": null,
                    "PostCode": "SW1V 3BZ",
                    "Country": "United Kingdom"
                },
                "solicitorOrg": {
                    "OrganisationID": "QO4A1Q8",
                    "OrganisationName": "FPRL-test-organisation"
                },
                "solicitorAddress": {
                    "AddressLine1": "Flat 10",
                    "AddressLine2": "Sheraton House",
                    "AddressLine3": "Churchill Gardens",
                    "PostTown": "London",
                    "County": null,
                    "PostCode": "SW1V 3BZ",
                    "Country": "United Kingdom"
                },
                "otherPersonRelationshipToChildren": [],
                "applicantPreferredContact": [],
                "user": {
                    "idamId": null,
                    "pcqId": null,
                    "email": null,
                    "solicitorRepresented": null
                },
                "response": {
                    "legalRepresentation": null,
                    "currentOrPastProceedingsForChildren": null,
                    "factorsAffectingAbilityToParticipate": null,
                    "provideDetailsForFactorsAffectingAbilityToParticipate": null,
                    "giveDetailsAffectingLitigationCapacity": null,
                    "detailsOfReferralOrAssessment": null,
                    "respondingCitizenAoH": null,
                    "respAohYesOrNo": null,
                    "safeToCallOption": null,
                    "c7ResponseSubmitted": null,
                    "c1AResponseSubmitted": null,
                    "activeRespondent": null,
                    "respAohDomesticAbuseYesNo": null,
                    "respAohChildAbductionYesNo": null,
                    "respAohChildAbuseYesNo": null,
                    "respAohSubstanceAbuseYesNo": null,
                    "respAohSubstanceAbuseDetails": null,
                    "respAohOtherConcerns": null,
                    "respAohOtherConcernsDetails": null,
                    "respOrdersNonMolestation": null,
                    "respOrdersNonMolestationDateIssued": null,
                    "respOrdersNonMolestationEndDate": null,
                    "respOrdersNonMolestationCurrent": null,
                    "respOrdersNonMolestationCourtName": null,
                    "respOrdersNonMolestationCaseNumber": null,
                    "respOrdersOccupation": null,
                    "respOrdersOccupationDateIssued": null,
                    "respOrdersOccupationEndDate": null,
                    "respOrdersOccupationCurrent": null,
                    "respOrdersOccupationCourtName": null,
                    "respOrdersOccupationCaseNumber": null,
                    "respOrdersForcedMarriageProtection": null,
                    "respOrdersForcedMarriageProtectionDateIssued": null,
                    "respOrdersForcedMarriageProtectionEndDate": null,
                    "respOrdersForcedMarriageProtectionCurrent": null,
                    "respOrdersForcedMarriageProtectionCourtName": null,
                    "respOrdersForcedMarriageProtectionCaseNumber": null,
                    "respOrdersRestraining": null,
                    "respOrdersRestrainingDateIssued": null,
                    "respOrdersRestrainingEndDate": null,
                    "respOrdersRestrainingCurrent": null,
                    "respOrdersRestrainingCourtName": null,
                    "respOrdersRestrainingCaseNumber": null,
                    "respOrdersOtherInjunctive": null,
                    "respOrdersOtherInjunctiveDateIssued": null,
                    "respOrdersOtherInjunctiveEndDate": null,
                    "respOrdersOtherInjunctiveCurrent": null,
                    "respOrdersOtherInjunctiveCourtName": null,
                    "respOrdersOtherInjunctiveCaseNumber": null,
                    "respOrdersUndertakingInPlace": null,
                    "respOrdersUndertakingInPlaceDateIssued": null,
                    "respOrdersUndertakingInPlaceEndDate": null,
                    "respOrdersUndertakingInPlaceCurrent": null,
                    "respOrdersUndertakingInPlaceCourtName": null,
                    "respOrdersUndertakingInPlaceCaseNumber": null,
                    "respChildAbductionReasons": null,
                    "respPreviousAbductionThreats": null,
                    "respPreviousAbductionThreatsDetails": null,
                    "respChildrenLocationNow": null,
                    "respAbductionPassportOfficeNotified": null,
                    "respAbductionPreviousPoliceInvolvement": null,
                    "respAbductionPreviousPoliceInvolvementDetails": null,
                    "respAbductionChildHasPassport": null,
                    "respAohOtherConcernsCourtActions": null,
                    "respAgreeChildUnsupervisedTime": null,
                    "respAgreeChildSupervisedTime": null,
                    "respAgreeChildOtherContact": null,
                    "respWhichChildrenAreRiskPhysicalAbuse": {
                        "value": [],
                        "list_items": []
                    },
                    "respWhichChildrenAreRiskPsychologicalAbuse": {
                        "value": [],
                        "list_items": []
                    },
                    "respWhichChildrenAreRiskSexualAbuse": {
                        "value": [],
                        "list_items": []
                    },
                    "respWhichChildrenAreRiskEmotionalAbuse": {
                        "value": [],
                        "list_items": []
                    },
                    "respWhichChildrenAreRiskFinancialAbuse": {
                        "value": [],
                        "list_items": []
                    },
                    "respAllChildrenAreRiskPhysicalAbuse": null,
                    "respAllChildrenAreRiskPsychologicalAbuse": null,
                    "respAllChildrenAreRiskSexualAbuse": null,
                    "respAllChildrenAreRiskEmotionalAbuse": null,
                    "respAllChildrenAreRiskFinancialAbuse": null,
                    "responseToAllegationsOfHarmYesOrNoResponse": null,
                    "respondentResponseToAllegationOfHarm": null,
                    "consent": {
                        "consentToTheApplication": null,
                        "noConsentReason": null,
                        "applicationReceivedDate": null,
                        "permissionFromCourt": null,
                        "courtOrderDetails": null
                    },
                    "keepDetailsPrivate": {
                        "otherPeopleKnowYourContactDetails": null,
                        "confidentiality": null,
                        "confidentialityList": []
                    },
                    "citizenDetails": {
                        "firstName": null,
                        "lastName": null,
                        "previousName": null,
                        "dateOfBirth": null,
                        "placeOfBirth": null,
                        "address": {
                            "AddressLine1": null,
                            "AddressLine2": null,
                            "AddressLine3": null,
                            "PostTown": null,
                            "County": null,
                            "PostCode": null,
                            "Country": null
                        },
                        "addressHistory": {
                            "isAtAddressLessThan5Years": null,
                            "previousAddressHistory": []
                        },
                        "contact": {
                            "phoneNumber": null,
                            "email": null
                        }
                    },
                    "attendToCourt": {
                        "respondentWelshNeeds": null,
                        "isRespondentNeededInterpreter": null,
                        "haveAnyDisability": null,
                        "disabilityNeeds": null,
                        "respondentSpecialArrangements": null,
                        "respondentSpecialArrangementDetails": null,
                        "respondentIntermediaryNeeds": null,
                        "respondentIntermediaryNeedDetails": null,
                        "respondentWelshNeedsList": [],
                        "respondentInterpreterNeeds": []
                    },
                    "citizenFlags": {
                        "isApplicationViewed": null,
                        "isAllegationOfHarmViewed": null,
                        "isAllDocumentsViewed": null,
                        "isResponseInitiated": null,
                        "isApplicationToBeServed": null,
                        "isStatementOfServiceProvided": null
                    },
                    "miam": {
                        "applicantAttendedMiam": null,
                        "claimingExemptionMiam": null,
                        "familyMediatorMiam": null,
                        "mediatorRegistrationNumber": null,
                        "familyMediatorServiceName": null,
                        "soleTraderName": null,
                        "attendedMiam": null,
                        "willingToAttendMiam": null,
                        "reasonNotAttendingMiam": null
                    },
                    "respKeepDetailsPrivate": {
                        "otherPeopleKnowYourContactDetails": null,
                        "confidentiality": null,
                        "confidentialityList": []
                    },
                    "respKeepDetailsPrivateConfidentiality": {
                        "otherPeopleKnowYourContactDetails": null,
                        "confidentiality": null,
                        "confidentialityList": []
                    },
                    "respSolHaveYouAttendedMiam": {
                        "applicantAttendedMiam": null,
                        "claimingExemptionMiam": null,
                        "familyMediatorMiam": null,
                        "mediatorRegistrationNumber": null,
                        "familyMediatorServiceName": null,
                        "soleTraderName": null,
                        "attendedMiam": null,
                        "willingToAttendMiam": null,
                        "reasonNotAttendingMiam": null
                    },
                    "respSolWillingnessToAttendMiam": {
                        "applicantAttendedMiam": null,
                        "claimingExemptionMiam": null,
                        "familyMediatorMiam": null,
                        "mediatorRegistrationNumber": null,
                        "familyMediatorServiceName": null,
                        "soleTraderName": null,
                        "attendedMiam": null,
                        "willingToAttendMiam": null,
                        "reasonNotAttendingMiam": null
                    },
                    "currentOrPreviousProceedings": {
                        "haveChildrenBeenInvolvedInCourtCase": null,
                        "courtOrderMadeForProtection": null,
                        "proceedingsList": []
                    },
                    "respondentExistingProceedings": [],
                    "respAllegationsOfHarmInfo": {
                        "respondentDomesticAbuse": null,
                        "respondentChildAbuse": null,
                        "isRespondentChildAbduction": null,
                        "respondentDrugOrAlcoholAbuse": null,
                        "respondentDrugOrAlcoholAbuseDetails": null,
                        "respondentOtherSafetyConcerns": null,
                        "respondentOtherSafetyConcernsDetails": null,
                        "respondentNonMolestationOrder": null,
                        "respondentNonMolestationOrderIssueDate": null,
                        "respondentNonMolestationOrderEndDate": null,
                        "respondentNonMolestationOrderIsCurrent": null,
                        "respondentNonMolestationOrderCourt": null,
                        "respondentNonMolestationOrderCaseNumber": null,
                        "respondentOccupationOrder": null,
                        "respondentOccupationOrderIssueDate": null,
                        "respondentOccupationOrderEndDate": null,
                        "respondentOccupationOrderIsCurrent": null,
                        "respondentOccupationOrderCourt": null,
                        "respondentOccupationOrderCaseNumber": null,
                        "respondentForcedMarriageOrder": null,
                        "respondentForcedMarriageIssueDate": null,
                        "respondentForcedMarriageEndDate": null,
                        "respondentForcedMarriageIsCurrent": null,
                        "respondentForcedMarriageCourt": null,
                        "respondentForcedMarriageCaseNumber": null,
                        "respondentRestrainingOrder": null,
                        "respondentRestrainingIssueDate": null,
                        "respondentRestrainingEndDate": null,
                        "respondentRestrainingIsCurrent": null,
                        "respondentRestrainingCourt": null,
                        "respondentRestrainingCaseNumber": null,
                        "respondentOtherInjunctiveOrder": null,
                        "respondentOtherInjunctiveIssueDate": null,
                        "respondentOtherInjunctiveEndDate": null,
                        "respondentOtherInjunctiveIsCurrent": null,
                        "respondentOtherInjunctiveCourt": null,
                        "respondentOtherInjunctiveCaseNumber": null,
                        "respondentUndertakingOrder": null,
                        "respondentUndertakingIssueDate": null,
                        "respondentUndertakingEndDate": null,
                        "respondentUndertakingIsCurrent": null,
                        "respondentUndertakingCourt": null,
                        "respondentUndertakingCaseNumber": null
                    },
                    "respDomesticAbuseInfo": [],
                    "respChildAbuseInfo": [],
                    "respChildAbductionInfo": {
                        "reasonForChildAbductionBelief": null,
                        "previousThreatsForChildAbduction": null,
                        "previousThreatsForChildAbductionDetails": null,
                        "whereIsChild": null,
                        "hasPassportOfficeNotified": null,
                        "anyOrgInvolvedInPreviousAbduction": null,
                        "anyOrgInvolvedInPreviousAbductionDetails": null,
                        "childrenHavePassport": null,
                        "childrenHaveMoreThanOnePassport": null,
                        "whoHasChildPassportOther": null,
                        "whoHasChildPassport": []
                    },
                    "respOtherConcernsInfo": {
                        "ordersRespondentWantFromCourt": null,
                        "childSpendingUnsupervisedTime": null,
                        "childSpendingSupervisedTime": null,
                        "childHavingOtherFormOfContact": null
                    },
                    "internationalElementChildInfo": {
                        "childrenLiveOutsideOfEnWl": null,
                        "childrenLiveOutsideOfEnWlDetails": null,
                        "parentsAnyOneLiveOutsideEnWl": null,
                        "parentsAnyOneLiveOutsideEnWlDetails": null,
                        "anotherPersonOrderOutsideEnWl": null,
                        "anotherPersonOrderOutsideEnWlDetails": null,
                        "anotherCountryAskedInformation": null,
                        "anotherCountryAskedInformationDetaails": null
                    },
                    "internationalElementParentInfo": {
                        "childrenLiveOutsideOfEnWl": null,
                        "childrenLiveOutsideOfEnWlDetails": null,
                        "parentsAnyOneLiveOutsideEnWl": null,
                        "parentsAnyOneLiveOutsideEnWlDetails": null,
                        "anotherPersonOrderOutsideEnWl": null,
                        "anotherPersonOrderOutsideEnWlDetails": null,
                        "anotherCountryAskedInformation": null,
                        "anotherCountryAskedInformationDetaails": null
                    },
                    "internationalElementJurisdictionInfo": {
                        "childrenLiveOutsideOfEnWl": null,
                        "childrenLiveOutsideOfEnWlDetails": null,
                        "parentsAnyOneLiveOutsideEnWl": null,
                        "parentsAnyOneLiveOutsideEnWlDetails": null,
                        "anotherPersonOrderOutsideEnWl": null,
                        "anotherPersonOrderOutsideEnWlDetails": null,
                        "anotherCountryAskedInformation": null,
                        "anotherCountryAskedInformationDetaails": null
                    },
                    "internationalElementRequestInfo": {
                        "childrenLiveOutsideOfEnWl": null,
                        "childrenLiveOutsideOfEnWlDetails": null,
                        "parentsAnyOneLiveOutsideEnWl": null,
                        "parentsAnyOneLiveOutsideEnWlDetails": null,
                        "anotherPersonOrderOutsideEnWl": null,
                        "anotherPersonOrderOutsideEnWlDetails": null,
                        "anotherCountryAskedInformation": null,
                        "anotherCountryAskedInformationDetaails": null
                    },
                    "citizenInternationalElements": {
                        "childrenLiveOutsideOfEnWl": null,
                        "parentsAnyOneLiveOutsideEnWl": null,
                        "anotherPersonOrderOutsideEnWl": null,
                        "anotherCountryAskedInformation": null,
                        "childrenLiveOutsideOfEnWlDetails": null,
                        "parentsAnyOneLiveOutsideEnWlDetails": null,
                        "anotherPersonOrderOutsideEnWlDetails": null,
                        "anotherCountryAskedInformationDetaails": null
                    },
                    "safetyConcerns": {
                        "haveSafetyConcerns": null,
                        "child": {
                            "physicalAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "psychologicalAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "emotionalAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "sexualAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "financialAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "somethingElse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            }
                        },
                        "applicant": {
                            "physicalAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "psychologicalAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "emotionalAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "sexualAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "financialAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "somethingElse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            }
                        },
                        "respondent": {
                            "physicalAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "psychologicalAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "emotionalAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "sexualAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "financialAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "somethingElse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            }
                        },
                        "safetyConcernAbout": [],
                        "concernAboutChild": [],
                        "concernAboutRespondent": [],
                        "otherconcerns": {
                            "c1AkeepingSafeStatement": null,
                            "c1AsupervisionAgreementDetails": null,
                            "c1AagreementOtherWaysDetails": null,
                            "c1AotherConcernsDrugs": null,
                            "c1AotherConcernsDrugsDetails": null,
                            "c1AchildSafetyConcerns": null,
                            "c1AchildSafetyConcernsDetails": null
                        },
                        "abductions": {
                            "c1AabductionReasonOutsideUk": null,
                            "c1AchildsCurrentLocation": null,
                            "c1AchildrenMoreThanOnePassport": null,
                            "c1AprovideOtherDetails": null,
                            "c1ApassportOffice": null,
                            "c1AabductionPassportOfficeNotified": null,
                            "c1ApreviousAbductionsShortDesc": null,
                            "c1ApoliceOrInvestigatorInvolved": null,
                            "c1ApoliceOrInvestigatorOtherDetails": null,
                            "c1AchildAbductedBefore": null,
                            "c1ApossessionChildrenPassport": []
                        }
                    },
                    "supportYouNeed": {
                        "describeOtherNeed": null,
                        "otherProvideDetails": null,
                        "communicationSupportOther": null,
                        "otherDetails": null,
                        "languageDetails": null,
                        "safetyArrangementsDetails": null,
                        "travellingOtherDetails": null,
                        "hearingDetails": null,
                        "signLanguageDetails": null,
                        "lightingDetails": null,
                        "supportWorkerDetails": null,
                        "familyProviderDetails": null,
                        "therapyDetails": null,
                        "docsDetails": null,
                        "largePrintDetails": null,
                        "parkingDetails": null,
                        "differentChairDetails": null,
                        "helpCommunication": [],
                        "courtComfort": [],
                        "courtHearing": [],
                        "docsSupport": [],
                        "languageRequirements": [],
                        "reasonableAdjustments": [],
                        "safetyArrangements": [],
                        "travellingToCourt": [],
                        "attendingToCourt": []
                    },
                    "respDomesticBehaviours": [],
                    "respChildAbuses": [],
                    "respChildPhysicalAbuse": {
                        "respAbuseNatureDescription": null,
                        "respBehavioursStartDateAndLength": null,
                        "respBehavioursApplicantSoughtHelp": null,
                        "respBehavioursApplicantHelpSoughtWho": null
                    },
                    "respChildPsychologicalAbuse": {
                        "respAbuseNatureDescription": null,
                        "respBehavioursStartDateAndLength": null,
                        "respBehavioursApplicantSoughtHelp": null,
                        "respBehavioursApplicantHelpSoughtWho": null
                    },
                    "respChildSexualAbuse": {
                        "respAbuseNatureDescription": null,
                        "respBehavioursStartDateAndLength": null,
                        "respBehavioursApplicantSoughtHelp": null,
                        "respBehavioursApplicantHelpSoughtWho": null
                    },
                    "respChildEmotionalAbuse": {
                        "respAbuseNatureDescription": null,
                        "respBehavioursStartDateAndLength": null,
                        "respBehavioursApplicantSoughtHelp": null,
                        "respBehavioursApplicantHelpSoughtWho": null
                    },
                    "respChildFinancialAbuse": {
                        "respAbuseNatureDescription": null,
                        "respBehavioursStartDateAndLength": null,
                        "respBehavioursApplicantSoughtHelp": null,
                        "respBehavioursApplicantHelpSoughtWho": null
                    },
                    "respChildPassportDetails": {
                        "respChildHasMultiplePassports": null,
                        "respChildPassportPossessionOtherDetails": null,
                        "respChildPassportPossession": []
                    }
                },
                "partyLevelFlag": {
                    "roleOnCase": null,
                    "partyName": null,
                    "groupId": null,
                    "visibility": null,
                    "details": []
                }
            }
        }
    },

    'Respondent details': {
        eventId: 'respondentsDetails',
        'data': {
            "respondentsFL401": {
                "firstName": respondentoneFN,
                "lastName": respondentoneLN,
                "previousName": null,
                "isDateOfBirthKnown": "Yes",
                "dateOfBirth": "2001-01-01",
                "respondentLivedWithApplicant": "No",
                "isCurrentAddressKnown": "Yes",
                "canYouProvideEmailAddress": "Yes",
                "email": "respondentfl401@mailinator.com",
                "canYouProvidePhoneNumber": "Yes",
                "phoneNumber": "09876543211",
                "isDateOfBirthUnknown": null,
                "gender": null,
                "otherGender": null,
                "placeOfBirth": null,
                "isAddressUnknown": null,
                "isAddressConfidential": null,
                "isAtAddressLessThan5Years": null,
                "addressLivedLessThan5YearsDetails": null,
                "isEmailAddressConfidential": null,
                "landline": null,
                "isPhoneNumberConfidential": null,
                "relationshipToChildren": null,
                "isPlaceOfBirthKnown": null,
                "dxNumber": null,
                "solicitorReference": null,
                "representativeFirstName": null,
                "representativeLastName": null,
                "isAtAddressLessThan5YearsWithDontKnow": null,
                "doTheyHaveLegalRepresentation": null,
                "sendSignUpLink": null,
                "solicitorEmail": null,
                "solicitorTelephone": null,
                "applicantContactInstructions": null,
                "currentRespondent": null,
                "partyId": null,
                "solicitorPartyId": null,
                "solicitorOrgUuid": null,
                "contactPreferences": null,
                "isRemoveLegalRepresentativeRequested": null,
                "address": {
                    "AddressLine1": "Flat 14",
                    "AddressLine2": "Sheraton House",
                    "AddressLine3": "Churchill Gardens",
                    "PostTown": "London",
                    "County": "",
                    "PostCode": "SW1V 3BZ",
                    "Country": "United Kingdom"
                },
                "solicitorOrg": {
                    "OrganisationID": null,
                    "OrganisationName": null
                },
                "solicitorAddress": {
                    "AddressLine1": null,
                    "AddressLine2": null,
                    "AddressLine3": null,
                    "PostTown": null,
                    "County": null,
                    "PostCode": null,
                    "Country": null
                },
                "otherPersonRelationshipToChildren": [],
                "applicantPreferredContact": [],
                "user": {
                    "idamId": null,
                    "pcqId": null,
                    "email": null,
                    "solicitorRepresented": null
                },
                "response": {
                    "legalRepresentation": null,
                    "currentOrPastProceedingsForChildren": null,
                    "factorsAffectingAbilityToParticipate": null,
                    "provideDetailsForFactorsAffectingAbilityToParticipate": null,
                    "giveDetailsAffectingLitigationCapacity": null,
                    "detailsOfReferralOrAssessment": null,
                    "respondingCitizenAoH": null,
                    "respAohYesOrNo": null,
                    "safeToCallOption": null,
                    "c7ResponseSubmitted": null,
                    "c1AResponseSubmitted": null,
                    "activeRespondent": null,
                    "respAohDomesticAbuseYesNo": null,
                    "respAohChildAbductionYesNo": null,
                    "respAohChildAbuseYesNo": null,
                    "respAohSubstanceAbuseYesNo": null,
                    "respAohSubstanceAbuseDetails": null,
                    "respAohOtherConcerns": null,
                    "respAohOtherConcernsDetails": null,
                    "respOrdersNonMolestation": null,
                    "respOrdersNonMolestationDateIssued": null,
                    "respOrdersNonMolestationEndDate": null,
                    "respOrdersNonMolestationCurrent": null,
                    "respOrdersNonMolestationCourtName": null,
                    "respOrdersNonMolestationCaseNumber": null,
                    "respOrdersOccupation": null,
                    "respOrdersOccupationDateIssued": null,
                    "respOrdersOccupationEndDate": null,
                    "respOrdersOccupationCurrent": null,
                    "respOrdersOccupationCourtName": null,
                    "respOrdersOccupationCaseNumber": null,
                    "respOrdersForcedMarriageProtection": null,
                    "respOrdersForcedMarriageProtectionDateIssued": null,
                    "respOrdersForcedMarriageProtectionEndDate": null,
                    "respOrdersForcedMarriageProtectionCurrent": null,
                    "respOrdersForcedMarriageProtectionCourtName": null,
                    "respOrdersForcedMarriageProtectionCaseNumber": null,
                    "respOrdersRestraining": null,
                    "respOrdersRestrainingDateIssued": null,
                    "respOrdersRestrainingEndDate": null,
                    "respOrdersRestrainingCurrent": null,
                    "respOrdersRestrainingCourtName": null,
                    "respOrdersRestrainingCaseNumber": null,
                    "respOrdersOtherInjunctive": null,
                    "respOrdersOtherInjunctiveDateIssued": null,
                    "respOrdersOtherInjunctiveEndDate": null,
                    "respOrdersOtherInjunctiveCurrent": null,
                    "respOrdersOtherInjunctiveCourtName": null,
                    "respOrdersOtherInjunctiveCaseNumber": null,
                    "respOrdersUndertakingInPlace": null,
                    "respOrdersUndertakingInPlaceDateIssued": null,
                    "respOrdersUndertakingInPlaceEndDate": null,
                    "respOrdersUndertakingInPlaceCurrent": null,
                    "respOrdersUndertakingInPlaceCourtName": null,
                    "respOrdersUndertakingInPlaceCaseNumber": null,
                    "respChildAbductionReasons": null,
                    "respPreviousAbductionThreats": null,
                    "respPreviousAbductionThreatsDetails": null,
                    "respChildrenLocationNow": null,
                    "respAbductionPassportOfficeNotified": null,
                    "respAbductionPreviousPoliceInvolvement": null,
                    "respAbductionPreviousPoliceInvolvementDetails": null,
                    "respAbductionChildHasPassport": null,
                    "respAohOtherConcernsCourtActions": null,
                    "respAgreeChildUnsupervisedTime": null,
                    "respAgreeChildSupervisedTime": null,
                    "respAgreeChildOtherContact": null,
                    "respWhichChildrenAreRiskPhysicalAbuse": {
                        "value": [],
                        "list_items": []
                    },
                    "respWhichChildrenAreRiskPsychologicalAbuse": {
                        "value": [],
                        "list_items": []
                    },
                    "respWhichChildrenAreRiskSexualAbuse": {
                        "value": [],
                        "list_items": []
                    },
                    "respWhichChildrenAreRiskEmotionalAbuse": {
                        "value": [],
                        "list_items": []
                    },
                    "respWhichChildrenAreRiskFinancialAbuse": {
                        "value": [],
                        "list_items": []
                    },
                    "respAllChildrenAreRiskPhysicalAbuse": null,
                    "respAllChildrenAreRiskPsychologicalAbuse": null,
                    "respAllChildrenAreRiskSexualAbuse": null,
                    "respAllChildrenAreRiskEmotionalAbuse": null,
                    "respAllChildrenAreRiskFinancialAbuse": null,
                    "responseToAllegationsOfHarmYesOrNoResponse": null,
                    "respondentResponseToAllegationOfHarm": null,
                    "consent": {
                        "consentToTheApplication": null,
                        "noConsentReason": null,
                        "applicationReceivedDate": null,
                        "permissionFromCourt": null,
                        "courtOrderDetails": null
                    },
                    "keepDetailsPrivate": {
                        "otherPeopleKnowYourContactDetails": null,
                        "confidentiality": null,
                        "confidentialityList": []
                    },
                    "citizenDetails": {
                        "firstName": null,
                        "lastName": null,
                        "previousName": null,
                        "dateOfBirth": null,
                        "placeOfBirth": null,
                        "address": {
                            "AddressLine1": null,
                            "AddressLine2": null,
                            "AddressLine3": null,
                            "PostTown": null,
                            "County": null,
                            "PostCode": null,
                            "Country": null
                        },
                        "addressHistory": {
                            "isAtAddressLessThan5Years": null,
                            "previousAddressHistory": []
                        },
                        "contact": {
                            "phoneNumber": null,
                            "email": null
                        }
                    },
                    "attendToCourt": {
                        "respondentWelshNeeds": null,
                        "isRespondentNeededInterpreter": null,
                        "haveAnyDisability": null,
                        "disabilityNeeds": null,
                        "respondentSpecialArrangements": null,
                        "respondentSpecialArrangementDetails": null,
                        "respondentIntermediaryNeeds": null,
                        "respondentIntermediaryNeedDetails": null,
                        "respondentWelshNeedsList": [],
                        "respondentInterpreterNeeds": []
                    },
                    "citizenFlags": {
                        "isApplicationViewed": null,
                        "isAllegationOfHarmViewed": null,
                        "isAllDocumentsViewed": null,
                        "isResponseInitiated": null,
                        "isApplicationToBeServed": null,
                        "isStatementOfServiceProvided": null
                    },
                    "miam": {
                        "applicantAttendedMiam": null,
                        "claimingExemptionMiam": null,
                        "familyMediatorMiam": null,
                        "mediatorRegistrationNumber": null,
                        "familyMediatorServiceName": null,
                        "soleTraderName": null,
                        "attendedMiam": null,
                        "willingToAttendMiam": null,
                        "reasonNotAttendingMiam": null
                    },
                    "respKeepDetailsPrivate": {
                        "otherPeopleKnowYourContactDetails": null,
                        "confidentiality": null,
                        "confidentialityList": []
                    },
                    "respKeepDetailsPrivateConfidentiality": {
                        "otherPeopleKnowYourContactDetails": null,
                        "confidentiality": null,
                        "confidentialityList": []
                    },
                    "respSolHaveYouAttendedMiam": {
                        "applicantAttendedMiam": null,
                        "claimingExemptionMiam": null,
                        "familyMediatorMiam": null,
                        "mediatorRegistrationNumber": null,
                        "familyMediatorServiceName": null,
                        "soleTraderName": null,
                        "attendedMiam": null,
                        "willingToAttendMiam": null,
                        "reasonNotAttendingMiam": null
                    },
                    "respSolWillingnessToAttendMiam": {
                        "applicantAttendedMiam": null,
                        "claimingExemptionMiam": null,
                        "familyMediatorMiam": null,
                        "mediatorRegistrationNumber": null,
                        "familyMediatorServiceName": null,
                        "soleTraderName": null,
                        "attendedMiam": null,
                        "willingToAttendMiam": null,
                        "reasonNotAttendingMiam": null
                    },
                    "currentOrPreviousProceedings": {
                        "haveChildrenBeenInvolvedInCourtCase": null,
                        "courtOrderMadeForProtection": null,
                        "proceedingsList": []
                    },
                    "respondentExistingProceedings": [],
                    "respAllegationsOfHarmInfo": {
                        "respondentDomesticAbuse": null,
                        "respondentChildAbuse": null,
                        "isRespondentChildAbduction": null,
                        "respondentDrugOrAlcoholAbuse": null,
                        "respondentDrugOrAlcoholAbuseDetails": null,
                        "respondentOtherSafetyConcerns": null,
                        "respondentOtherSafetyConcernsDetails": null,
                        "respondentNonMolestationOrder": null,
                        "respondentNonMolestationOrderIssueDate": null,
                        "respondentNonMolestationOrderEndDate": null,
                        "respondentNonMolestationOrderIsCurrent": null,
                        "respondentNonMolestationOrderCourt": null,
                        "respondentNonMolestationOrderCaseNumber": null,
                        "respondentOccupationOrder": null,
                        "respondentOccupationOrderIssueDate": null,
                        "respondentOccupationOrderEndDate": null,
                        "respondentOccupationOrderIsCurrent": null,
                        "respondentOccupationOrderCourt": null,
                        "respondentOccupationOrderCaseNumber": null,
                        "respondentForcedMarriageOrder": null,
                        "respondentForcedMarriageIssueDate": null,
                        "respondentForcedMarriageEndDate": null,
                        "respondentForcedMarriageIsCurrent": null,
                        "respondentForcedMarriageCourt": null,
                        "respondentForcedMarriageCaseNumber": null,
                        "respondentRestrainingOrder": null,
                        "respondentRestrainingIssueDate": null,
                        "respondentRestrainingEndDate": null,
                        "respondentRestrainingIsCurrent": null,
                        "respondentRestrainingCourt": null,
                        "respondentRestrainingCaseNumber": null,
                        "respondentOtherInjunctiveOrder": null,
                        "respondentOtherInjunctiveIssueDate": null,
                        "respondentOtherInjunctiveEndDate": null,
                        "respondentOtherInjunctiveIsCurrent": null,
                        "respondentOtherInjunctiveCourt": null,
                        "respondentOtherInjunctiveCaseNumber": null,
                        "respondentUndertakingOrder": null,
                        "respondentUndertakingIssueDate": null,
                        "respondentUndertakingEndDate": null,
                        "respondentUndertakingIsCurrent": null,
                        "respondentUndertakingCourt": null,
                        "respondentUndertakingCaseNumber": null
                    },
                    "respDomesticAbuseInfo": [],
                    "respChildAbuseInfo": [],
                    "respChildAbductionInfo": {
                        "reasonForChildAbductionBelief": null,
                        "previousThreatsForChildAbduction": null,
                        "previousThreatsForChildAbductionDetails": null,
                        "whereIsChild": null,
                        "hasPassportOfficeNotified": null,
                        "anyOrgInvolvedInPreviousAbduction": null,
                        "anyOrgInvolvedInPreviousAbductionDetails": null,
                        "childrenHavePassport": null,
                        "childrenHaveMoreThanOnePassport": null,
                        "whoHasChildPassportOther": null,
                        "whoHasChildPassport": []
                    },
                    "respOtherConcernsInfo": {
                        "ordersRespondentWantFromCourt": null,
                        "childSpendingUnsupervisedTime": null,
                        "childSpendingSupervisedTime": null,
                        "childHavingOtherFormOfContact": null
                    },
                    "internationalElementChildInfo": {
                        "childrenLiveOutsideOfEnWl": null,
                        "childrenLiveOutsideOfEnWlDetails": null,
                        "parentsAnyOneLiveOutsideEnWl": null,
                        "parentsAnyOneLiveOutsideEnWlDetails": null,
                        "anotherPersonOrderOutsideEnWl": null,
                        "anotherPersonOrderOutsideEnWlDetails": null,
                        "anotherCountryAskedInformation": null,
                        "anotherCountryAskedInformationDetaails": null
                    },
                    "internationalElementParentInfo": {
                        "childrenLiveOutsideOfEnWl": null,
                        "childrenLiveOutsideOfEnWlDetails": null,
                        "parentsAnyOneLiveOutsideEnWl": null,
                        "parentsAnyOneLiveOutsideEnWlDetails": null,
                        "anotherPersonOrderOutsideEnWl": null,
                        "anotherPersonOrderOutsideEnWlDetails": null,
                        "anotherCountryAskedInformation": null,
                        "anotherCountryAskedInformationDetaails": null
                    },
                    "internationalElementJurisdictionInfo": {
                        "childrenLiveOutsideOfEnWl": null,
                        "childrenLiveOutsideOfEnWlDetails": null,
                        "parentsAnyOneLiveOutsideEnWl": null,
                        "parentsAnyOneLiveOutsideEnWlDetails": null,
                        "anotherPersonOrderOutsideEnWl": null,
                        "anotherPersonOrderOutsideEnWlDetails": null,
                        "anotherCountryAskedInformation": null,
                        "anotherCountryAskedInformationDetaails": null
                    },
                    "internationalElementRequestInfo": {
                        "childrenLiveOutsideOfEnWl": null,
                        "childrenLiveOutsideOfEnWlDetails": null,
                        "parentsAnyOneLiveOutsideEnWl": null,
                        "parentsAnyOneLiveOutsideEnWlDetails": null,
                        "anotherPersonOrderOutsideEnWl": null,
                        "anotherPersonOrderOutsideEnWlDetails": null,
                        "anotherCountryAskedInformation": null,
                        "anotherCountryAskedInformationDetaails": null
                    },
                    "citizenInternationalElements": {
                        "childrenLiveOutsideOfEnWl": null,
                        "parentsAnyOneLiveOutsideEnWl": null,
                        "anotherPersonOrderOutsideEnWl": null,
                        "anotherCountryAskedInformation": null,
                        "childrenLiveOutsideOfEnWlDetails": null,
                        "parentsAnyOneLiveOutsideEnWlDetails": null,
                        "anotherPersonOrderOutsideEnWlDetails": null,
                        "anotherCountryAskedInformationDetaails": null
                    },
                    "safetyConcerns": {
                        "haveSafetyConcerns": null,
                        "child": {
                            "physicalAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "psychologicalAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "emotionalAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "sexualAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "financialAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "somethingElse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            }
                        },
                        "applicant": {
                            "physicalAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "psychologicalAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "emotionalAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "sexualAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "financialAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "somethingElse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            }
                        },
                        "respondent": {
                            "physicalAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "psychologicalAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "emotionalAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "sexualAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "financialAbuse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            },
                            "somethingElse": {
                                "behaviourDetails": null,
                                "behaviourStartDate": null,
                                "isOngoingBehaviour": null,
                                "seekHelpFromPersonOrAgency": null,
                                "seekHelpDetails": null,
                                "childrenConcernedAbout": null
                            }
                        },
                        "safetyConcernAbout": [],
                        "concernAboutChild": [],
                        "concernAboutRespondent": [],
                        "otherconcerns": {
                            "c1AkeepingSafeStatement": null,
                            "c1AsupervisionAgreementDetails": null,
                            "c1AagreementOtherWaysDetails": null,
                            "c1AotherConcernsDrugs": null,
                            "c1AotherConcernsDrugsDetails": null,
                            "c1AchildSafetyConcerns": null,
                            "c1AchildSafetyConcernsDetails": null
                        },
                        "abductions": {
                            "c1AabductionReasonOutsideUk": null,
                            "c1AchildsCurrentLocation": null,
                            "c1AchildrenMoreThanOnePassport": null,
                            "c1AprovideOtherDetails": null,
                            "c1ApassportOffice": null,
                            "c1AabductionPassportOfficeNotified": null,
                            "c1ApreviousAbductionsShortDesc": null,
                            "c1ApoliceOrInvestigatorInvolved": null,
                            "c1ApoliceOrInvestigatorOtherDetails": null,
                            "c1AchildAbductedBefore": null,
                            "c1ApossessionChildrenPassport": []
                        }
                    },
                    "supportYouNeed": {
                        "describeOtherNeed": null,
                        "otherProvideDetails": null,
                        "communicationSupportOther": null,
                        "otherDetails": null,
                        "languageDetails": null,
                        "safetyArrangementsDetails": null,
                        "travellingOtherDetails": null,
                        "hearingDetails": null,
                        "signLanguageDetails": null,
                        "lightingDetails": null,
                        "supportWorkerDetails": null,
                        "familyProviderDetails": null,
                        "therapyDetails": null,
                        "docsDetails": null,
                        "largePrintDetails": null,
                        "parkingDetails": null,
                        "differentChairDetails": null,
                        "helpCommunication": [],
                        "courtComfort": [],
                        "courtHearing": [],
                        "docsSupport": [],
                        "languageRequirements": [],
                        "reasonableAdjustments": [],
                        "safetyArrangements": [],
                        "travellingToCourt": [],
                        "attendingToCourt": []
                    },
                    "respDomesticBehaviours": [],
                    "respChildAbuses": [],
                    "respChildPhysicalAbuse": {
                        "respAbuseNatureDescription": null,
                        "respBehavioursStartDateAndLength": null,
                        "respBehavioursApplicantSoughtHelp": null,
                        "respBehavioursApplicantHelpSoughtWho": null
                    },
                    "respChildPsychologicalAbuse": {
                        "respAbuseNatureDescription": null,
                        "respBehavioursStartDateAndLength": null,
                        "respBehavioursApplicantSoughtHelp": null,
                        "respBehavioursApplicantHelpSoughtWho": null
                    },
                    "respChildSexualAbuse": {
                        "respAbuseNatureDescription": null,
                        "respBehavioursStartDateAndLength": null,
                        "respBehavioursApplicantSoughtHelp": null,
                        "respBehavioursApplicantHelpSoughtWho": null
                    },
                    "respChildEmotionalAbuse": {
                        "respAbuseNatureDescription": null,
                        "respBehavioursStartDateAndLength": null,
                        "respBehavioursApplicantSoughtHelp": null,
                        "respBehavioursApplicantHelpSoughtWho": null
                    },
                    "respChildFinancialAbuse": {
                        "respAbuseNatureDescription": null,
                        "respBehavioursStartDateAndLength": null,
                        "respBehavioursApplicantSoughtHelp": null,
                        "respBehavioursApplicantHelpSoughtWho": null
                    },
                    "respChildPassportDetails": {
                        "respChildHasMultiplePassports": null,
                        "respChildPassportPossessionOtherDetails": null,
                        "respChildPassportPossession": []
                    }
                },
                "partyLevelFlag": {
                    "roleOnCase": null,
                    "partyName": null,
                    "groupId": null,
                    "visibility": null,
                    "details": []
                }
            }
        }
    },
    "Applicant's family": {
        eventId: 'fl401ApplicantFamilyDetails',
        'data': {
            "applicantFamilyDetails": {
                "doesApplicantHaveChildren": "No"
            }
        }
    },
    'Relationship to respondent': {
        eventId: 'respondentRelationship',
        'data': {
            "respondentRelationObject": {
                "applicantRelationship": "marriedOrCivil"
            },
            "respondentRelationDateInfoObject": {
                "applicantRelationshipDate": "2020-01-01",
                "relationStartAndEndComplexType": {
                    "relationshipDateComplexStartDate": "2020-01-01",
                    "relationshipDateComplexEndDate": "2023-01-01"
                }
            }
        }
    },
    "Respondent's behaviour": {
        eventId: 'respondentBehaviour',
        'data': {
            "respondentBehaviourData": {
                "otherReasonApplicantWantToStopFromRespondentDoing": "test",
                "applicantWantToStopFromRespondentDoing": [
                    "applicantStopFromRespondentEnum_Value_1",
                    "applicantStopFromRespondentEnum_Value_2",
                    "applicantStopFromRespondentEnum_Value_3",
                    "applicantStopFromRespondentEnum_Value_4",
                    "applicantStopFromRespondentEnum_Value_5",
                    "applicantStopFromRespondentEnum_Value_6",
                    "applicantStopFromRespondentEnum_Value_7",
                    "applicantStopFromRespondentEnum_Value_8",
                    "applicantStopFromRespondentEnum_Value_9"
                ],
                "applicantWantToStopFromRespondentDoingToChild": []
            }
        }
    },
    'Other proceedings': {
        eventId: 'fl401OtherProceedings',
        'data': {
            "fl401OtherProceedingDetails": {
                "hasPrevOrOngoingOtherProceeding": "no",
                "fl401OtherProceedings": []
            }
        }
    },
    'Attending the hearing': {
        eventId: 'attendingTheHearing',
        'data': {
            "isWelshNeeded": "No",
            "isInterpreterNeeded": "No",
            "isDisabilityPresent": "No",
            "isSpecialArrangementsRequired": "No",
            "isIntermediaryNeeded": "No"
        }
    },
    'Welsh language requirements': {
        eventId: 'welshLanguageRequirements',
        'data': {
            "welshLanguageRequirement": "No"
        }
    },
    'Upload documents': {
        eventId: 'fl401UploadDocuments',
        'data': {
            "fl401UploadWitnessDocuments": [
                {
                    "id": null,
                    "value": {
                        "document_url": "http://dm-store-aat.service.core-compute-aat.internal/documents/c21e399c-7d7e-46f5-b3b9-4353406b7b3b",
                        "document_binary_url": "http://dm-store-aat.service.core-compute-aat.internal/documents/c21e399c-7d7e-46f5-b3b9-4353406b7b3b/binary",
                        "document_filename": "prl-5427_1.png"
                    }
                }
            ],
            "fl401UploadSupportDocuments": []
        }
    },
    'Statement of truth and submit': {
        eventId: 'fl401StatementOfTruthAndSubmit',
        'data': {
            "fl401StmtOfTruth": {
                "date": "2024-07-01",
                "fullname": "testapplicant",
                "nameOfFirm": "Test org",
                "signOnBehalf": "director",
                "signature": null,
                "applicantConsent": [
                    "fl401Consent"
                ]
            },
            "fl401ConfidentialityCheck": {
                "confidentialityConsent": [
                    "fl401ConfidentialConsent"
                ]
            },
            "submitCountyCourtSelection": {
                "value": {
                    "code": "827534:test@hmcts.net",
                    "label": "Aberystwyth Justice Centre - Trefechan - SY23 1AS"
                },
                "list_items": [
                    {
                        "code": "827534:test@hmcts.net",
                        "label": "Aberystwyth Justice Centre - Trefechan - SY23 1AS"
                    },
                    {
                        "code": "101959:test@hmcts.net",
                        "label": "Carmarthen County Court and Tribunal Hearing Centre - Hill House, Picton Terrace, Carmarthen - SA31 3BT"
                    },
                    {
                        "code": "816875:test@hmcts.net",
                        "label": "Chelmsford County and Family Court - Priory Place - CM2 0PP"
                    },
                    {
                        "code": "497679:test@hmcts.net",
                        "label": "Coventry Combined Court Centre - Much Park Street, Coventry - CV1 2SN"
                    },
                    {
                        "code": "898213:test@hmcts.net",
                        "label": "East London Family Court - Westferry Circus (Westferry House), Part Ground, 6th And 7th Floors, 11 Westferry Circus, Canary Wharf, London, E14 4HE - E14 4HD"
                    },
                    {
                        "code": "735217:test@hmcts.net",
                        "label": "Exeter Combined Court Centre - Southernhay Gardens, Exeter - EX1 1UH"
                    },
                    {
                        "code": "198592:test@hmcts.net",
                        "label": "Gloucestershire Family and Civil Court - Kimbrose Way, Gloucester Docks - GL1 2DE"
                    },
                    {
                        "code": "700596:test@hmcts.net",
                        "label": "Haverfordwest County and Family - Penffynnon, Hawthorn Rise - SA61 2AZ"
                    },
                    {
                        "code": "195520:test@hmcts.net",
                        "label": "Kingston-upon-Hull Combined Court Centre - The Combined Court Centre - HU1 2EZ"
                    },
                    {
                        "code": "195465:test@hmcts.net",
                        "label": "Lincoln County Court and Family Court - High Street - LN5 7PS"
                    },
                    {
                        "code": "390932:test@hmcts.net",
                        "label": "Llanelli Law Courts - Town Hall Square, Llanelli - SA15 3AW"
                    },
                    {
                        "code": "487294:test@hmcts.net",
                        "label": "Medway County Court and Family Court - 47-67 High Street Chatham Kent - ME4 4DW"
                    },
                    {
                        "code": "366796:test@hmcts.net",
                        "label": "Newcastle Civil & Family Courts and Tribunals Centre - Barras Bridge, Newcastle-Upon-Tyne - NE99 1NA"
                    },
                    {
                        "code": "471569:test@hmcts.net",
                        "label": "Peterborough Combined Court Centre - Crown Buildings, Rivergate - PE1 1EJ"
                    },
                    {
                        "code": "846055:test@hmcts.net",
                        "label": "Port Talbot Justice Centre - Harbourside Road - SA13 1SB"
                    },
                    {
                        "code": "43104:test@hmcts.net",
                        "label": "Southampton Combined Court Centre - The Courts of Justice, London Road - SO15 2XQ"
                    },
                    {
                        "code": "234946:test@hmcts.net",
                        "label": "Swansea Civil Justice Centre - Quay West, Quay Parade - SA1 1SP"
                    }
                ]
            }
        }
    },
    'Dummy Payment for AwP': {
        eventId: 'tsDummyPaymentAwP',
        'data': {
            "tsPaymentServiceRequestReferenceNumber": "12344321",
            "tsPaymentStatus": "submitted"
        }
    },

    'Send to gatekeeper': {
        eventId: 'fl401SendToGateKeeper',
        'data': {
            "isSpecificGateKeeperNeeded": "No"
        }
    },

    'Service of application': {
        eventId: 'serviceOfApplication',
        'data': {
            "isConfidential": "No",
            "serviceOfApplicationHeader": null,
            "sentDocumentPlaceHolder": "<details class='govuk-details'>\n\n<summary class='govuk-details__summary'>\n\n<h3 class='govuk-details__summary-text'>\n\nDocuments served in the pack\n\n</h3>\n\n</summary>\n\n<div class='govuk-details__text'>\n\nCertain documents will be automatically included in the pack that is sent out on parties (the people in the case).\n\nThis includes:\n\n<ul><li>an application form (FL401)</li><li>witness statement</li><li>privacy notice</li><li>cover letter (if not represented)</li></ul>\n\nYou do not need to upload these documents yourself.\n\n</div>\n\n</details>",
            "noticeOfSafetySupportLetter": {
                "document_url": "http://dm-store-aat.service.core-compute-aat.internal/documents/dfff6f3b-dc6f-4638-9def-5104e1b7e84c",
                "document_binary_url": "http://dm-store-aat.service.core-compute-aat.internal/documents/dfff6f3b-dc6f-4638-9def-5104e1b7e84c/binary",
                "document_filename": "prl-5427_1.png"
            },
            "additionalDocumentsList": [],
            "caseTypeOfApplication": "FL401",
            "soaIsOrderListEmpty": "Yes",
            "missingAddressWarningText": "",
            "caseCreatedBy": "SOLICITOR",
            "isC8CheckNeeded": null,
            "responsibleForService": null,
            "isOccupationOrderSelected": null,
            "soaServingRespondentsOptionsDA": "applicantLegalRepresentative"
        }
    }
};

