/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types */
// import autobind from 'autobind-decorator';
// import express, { Response } from 'express';
// import { ErrorHandler } from 'modules/error-handler';
// import { OidcMiddleware } from 'modules/oidc';
// // import { mockRequest } from '../../../test/unit/utils/mockRequest';
// import { AppRequest } from '../../app/controller/AppRequest';
// import { AnyObject, PostController } from '../../app/controller/PostController';
// //import { FormFields, FormFieldsFn } from '../../app/form/Form';

// import { C100_CHECK_YOUR_ANSWER, CREATE_DRAFT } from '../urls';

/* The UploadDocumentController class extends the PostController class and overrides the
PostDocumentUploader method */
//@autobind
// export default class draftCaseController extends PostController<AnyObject> {

//   // constructor() {
//   //   super();
//   // }
 
// //    req: AppRequest<AnyObject>=mockRequest({ session: { userCase:{
// //     caseId:1679269512474296,
// //     caseTypeOfApplication:"C100",
// //     state:"AWAITING_SUBMISSION_TO_HMCTS",
// //     noOfDaysRemainingToSubmitCase:28,
// //     applicantCaseName:"John Smith",
// //     saveAndContinue:"true",
// //     c100RebuildChildPostCode:"TW31ND",
// //     sq_writtenAgreement:"Yes",
// //     too_courtOrder:[
// //        "whoChildLiveWith"
// //     ],
// //     onlycontinue:"true",
// //     too_shortStatement:"\r\n    any previous parenting plans between you and the other people in the case\r\n    what happened in the previous agreements, and if they broke down\r\n    why you are bringing this matter to the court\r\n    what you would like the court to do\r\n",
// //     co_certificate:{
// //        id:"ab678e13-7e94-461d-968b-299a63d1237a",
// //        url:"http://dm-store-aat.service.core-compute-aat.internal/documents/ab678e13-7e94-461d-968b-299a63d1237a",
// //        filename:"applicant__consent_order_draft__19032023.png",
// //        binaryUrl:"http://dm-store-aat.service.core-compute-aat.internal/documents/ab678e13-7e94-461d-968b-299a63d1237a/binary"
// //     },
// //     hu_urgentHearingReasons:"No",
// //     hwn_hearingPart1:"No",
// //     c100TempFirstName:"",
// //     c100TempLastName:"",
// //     cd_children:[
// //        {
// //           id:"4ef8e487-77df-4a67-b5e0-942398b6df2e",
// //           firstName:"child",
// //           lastName:"child",
// //           personalDetails:{
// //              dateOfBirth:{
// //                 year:"2022",
// //                 month:"09",
// //                 day:"09"
// //              },
// //              isDateOfBirthUnknown:"",
// //              approxDateOfBirth:{
// //                 "day":"",
// //                 "month":"",
// //                 "year":""
// //              },
// //              gender:"Female",
// //              otherGenderDetails:""
// //           },
// //           childMatters:{
// //              needsResolution:"whoChildLiveWith"
// //           },
// //           parentialResponsibility:{
// //              statement:"child mother"
// //           },
// //           liveWith:[
// //              {
// //                 id:"d961df6d-90db-46aa-8def-c42b2db4a258",
// //                 firstName:"applicant",
// //                 lastName:"applicant",
// //                 partyType:"applicant"
// //              },
// //              {
// //                 id:"c009e054-a813-4001-bb70-fe58c3a0aa88",
// //                 firstName:"respondent",
// //                 lastName:"respondent",
// //                 partyType:"respondent"
// //              }
// //           ]
// //        }
// //     ],
// //     cd_childrenKnownToSocialServices:"No",
// //     cd_childrenSubjectOfProtectionPlan:"No",
// //     ocd_hasOtherChildren:"No",
// //     appl_allApplicants:[
// //        {
// //           id:"d961df6d-90db-46aa-8def-c42b2db4a258",
// //           applicantFirstName:"applicant",
// //           applicantLastName:"applicant",
// //           detailsKnown:"No",
// //           startAlternative:"Yes",
// //           start:"",
// //           contactDetailsPrivate:[
             
// //           ],
// //           contactDetailsPrivateAlternative:[
// //              "address"
// //           ],
// //           relationshipDetails:{
// //              relationshipToChildren:[
// //                 {
// //                    childId:"4ef8e487-77df-4a67-b5e0-942398b6df2e",
// //                    relationshipType:"Mother",
// //                    otherRelationshipTypeDetails:""
// //                 }
// //              ]
// //           },
// //           personalDetails:{
// //              haveYouChangeName:"No",
// //              applPreviousName:"",
// //              dateOfBirth:{
// //                 year:"2000",
// //                 month:"09",
// //                 day:"09"
// //              },
// //              gender:"Female",
// //              otherGenderDetails:"",
// //              applicantPlaceOfBirth:"city"
// //           },
// //           applicantContactDetail:{
// //              canProvideEmail:"Yes",
// //              emailAddress:"a.b@c.com",
// //              canProvideTelephoneNumber:"No",
// //              telephoneNumber:"",
// //              canNotProvideTelephoneNumberReason:"no phnoe",
// //              canLeaveVoiceMail:"No",
// //              applicantContactPreferences:"digital"
// //           },
// //           applicantAddressPostcode:"TW3 1NL",
// //           applicantAddress1:"FIRSTCARE PRACTICE, THE BLENHEIM CENTRE, PRINCE REGENT ROAD",
// //           applicantAddress2:"",
// //           applicantAddressTown:"HOUNSLOW",
// //           applicantAddressCounty:"LONDON BOROUGH OF HOUNSLOW",
// //           country:"United Kingdom",
// //           applicantSelectedAddress:1,
// //           applicantAddressHistory:"Yes",
// //           applicantProvideDetailsOfPreviousAddresses:""
// //        }
// //     ],
// //     resp_Respondents:[
// //        {
// //           id:"c009e054-a813-4001-bb70-fe58c3a0aa88",
// //           firstName:"respondent",
// //           lastName:"respondent",
// //           personalDetails:{
// //              dateOfBirth:{
// //                 year:"2000",
// //                 month:"09",
// //                 day:"09"
// //              },
// //              isDateOfBirthUnknown:"",
// //              approxDateOfBirth:{
// //                 day:"",
// //                 month:"",
// //                 year:""
// //              },
// //              gender:"Male",
// //              otherGenderDetails:"",
// //              hasNameChanged:"no",
// //              previousFullName:"",
// //              respondentPlaceOfBirth:"",
// //              respondentPlaceOfBirthUnknown:"Yes"
// //           },
// //           address:{
// //              AddressLine1:"210 BARCLAYS BANK PLC, HIGH STREET",
// //              AddressLine2:"",
// //              PostTown:"HOUNSLOW",
// //              County:"LONDON BOROUGH OF HOUNSLOW",
// //              PostCode:"TW3 1DL",
// //              Country:"United Kingdom",
// //              addressHistory:"yes",
// //              provideDetailsOfPreviousAddresses:""
// //           },
// //           relationshipDetails:{
// //              relationshipToChildren:[
// //                 {
// //                    childId:"4ef8e487-77df-4a67-b5e0-942398b6df2e",
// //                    relationshipType:"Father",
// //                    otherRelationshipTypeDetails:""
// //                 }
// //              ]
// //           },
// //           contactDetails:{
// //              emailAddress:"b.c@gmail.com",
// //              telephoneNumber:"",
// //              donKnowTelephoneNumber:"Yes"
// //           }
// //        }
// //     ],
// //     oprs_otherPersonCheck:"No",
// //     op_childrenInvolvedCourtCase:"No",
// //     op_courtOrderProtection:"No",
// //     c1A_haveSafetyConcerns:"No",
// //     ie_internationalStart:"No",
// //     ie_internationalParents:"No",
// //     ie_internationalJurisdiction:"No",
// //     ie_internationalRequest:"No",
// //     ra_typeOfHearing:[
// //        "noVideoAndPhoneHearing"
// //     ],
// //     ra_noVideoAndPhoneHearing_subfield:"cant",
// //     ra_languageNeeds:[
// //        "noLanguageRequirements"
// //     ],
// //     ra_specialArrangements:[
// //        "noSafetyRequirements"
// //     ],
// //     ra_disabilityRequirements:[
// //        "noSupportRequired"
// //     ],
// //     c100ApplicationFees:"232.00",
// //     hwf_needHelpWithFees:"Yes",
// //     hwf_feesAppliedDetails:"Yes",
// //     helpWithFeesReferenceNumber:"HWF-A1B-23C"
// //  } } })
      
//   public async post(checkYourAnswerFlow1: AppRequest<AnyObject>, res: Response): Promise<void> {

//     this.redirect(checkYourAnswerFlow1, res, C100_CHECK_YOUR_ANSWER)

    
//   }

 

  
// }
// export default express.Router()
//   .get(CREATE_DRAFT,
//     ErrorHandler(async (req: express.Request, res: express.Response) => {
//       res.render(CREATE_DRAFT)
//     })
//   )
//   .post(CREATE_DRAFT,
//     OidcMiddleware.requestHandler(new DraftService(), 'claim', 100, (value: any): DraftClaim => {
//       return new DraftClaim().deserialize(value)
//     }),
//     ErrorHandling.apply(async (req: express.Request, res: express.Response) => {
//       const draft: Draft<DraftClaim> = res.locals.claimDraft
//       const user: User = res.locals.user

//       draft.document = new DraftClaim().deserialize(prepareClaimDraft(user.email, await featureToggles.isHelpWithFeesEnabled()))
//       await new DraftService().save(draft, user.bearerToken)

//       res.redirect(ClaimPaths.checkAndSendPage.uri)
//     })
//   )