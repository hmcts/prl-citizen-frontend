/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import {
  C100RebuildPartyDetails,
  ChildrenDetails,
  OtherChildrenDetails,
  PartyType,
} from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormContent, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { getFormFields as getAddChildrenFormFields } from '../child-details/add-children/content';
import { getFormFields as getAddOtherChildrenFormFields } from '../child-details/other-children/names/content';
import { getFormFields as getAddOtherPersonFormFields } from '../other-person-details/add-other-persons/content';
import { getFormFields as getAddRespondentsFormFields } from '../respondent-details/add-respondents/content';

import { CaseWithId } from './../../../app/case/case';
import { getDataShape, transformAddPeople } from './util';

type ContextReference = {
  dataReference: string;
  context: PartyType;
  formRef: (caseData: Partial<CaseWithId>) => FormContent;
};
type FeatureContext = { [key: string]: ContextReference };

@autobind
export default class AddPersonPostController {
  private parent;
  private request: AppRequest<AnyObject>;
  private featureContext: FeatureContext;
  private contextReference: ContextReference;

  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    this.parent = new PostController(fields);
    this.request = {} as AppRequest<AnyObject>;
    this.featureContext = {
      cd: {
        dataReference: 'cd_children',
        context: PartyType.CHILDREN,
        formRef: getAddChildrenFormFields,
      },
      oc: {
        dataReference: 'ocd_otherChildren',
        context: PartyType.OTHER_CHILDREN,
        formRef: getAddOtherChildrenFormFields,
      },
      resp: {
        dataReference: 'resp_Respondents',
        context: PartyType.RESPONDENT,
        formRef: getAddRespondentsFormFields,
      },
      op: {
        dataReference: 'oprs_otherPersons',
        context: PartyType.OTHER_PERSON,
        formRef: getAddOtherPersonFormFields,
      },
    };
    this.contextReference = {} as ContextReference;
  }

  private addPerson(firstName, lastName) {
    Object.assign(this.request.session.userCase, { c100TempFirstName: '', c100TempLastName: '' });
    this.request.session.userCase[this.contextReference.dataReference] = [
      ...(this.request.session.userCase[this.contextReference.dataReference] ?? []),
      {
        ...(getDataShape(this.contextReference.context) as
          | ChildrenDetails
          | OtherChildrenDetails
          | C100RebuildPartyDetails),
        firstName,
        lastName,
      },
    ];
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { _ctx, add, remove: removePersonId, onlycontinue, saveAndComeLater, ...formFields } = req.body;

    this.request = req;
    this.contextReference = this.featureContext[_ctx as string];

    const { dataReference, context, formRef } = this.contextReference;

    req.session.errors = [];
    if (removePersonId) {
      req.session.userCase[dataReference] = req.session.userCase[dataReference]?.filter(
        person => person.id !== removePersonId
      );
      return this.parent.redirect(req, res, req.originalUrl);
    }

    const form = new Form(formRef(req.session.userCase).fields as FormFields);
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    const { c100TempFirstName, c100TempLastName, ...rest } = formData;

    req.session.userCase = {
      ...req.session.userCase,
      c100TempFirstName,
      c100TempLastName,
    };

    const fullName = c100TempFirstName && c100TempLastName;

    if (add) {
      if (fullName) {
        req.session.errors = form.getErrors(formData);
        if (!req.session.errors.length) {
          this.addPerson(c100TempFirstName, c100TempLastName);
        }
      } else {
        req.session.errors = form
          .getErrors(formData)
          .filter(error => ['c100TempFirstName', 'c100TempLastName'].includes(error.propertyName));
      }

      return this.parent.redirect(req, res, req.originalUrl);
    } else if (onlycontinue) {
      return this.addWithOnlyContinue(
        req,
        dataReference,
        context,
        rest,
        form,
        formData,
        c100TempFirstName,
        c100TempLastName,
        res
      );
    } else if (saveAndComeLater) {
      req.session.userCase[dataReference] = transformAddPeople(context, rest, req.session.userCase[dataReference]);

      if (fullName) {
        this.addPerson(c100TempFirstName, c100TempLastName);
      }

      this.parent.saveAndComeLater(req, res, req.session.userCase);
    }
  }

  private addWithOnlyContinue(
    req: AppRequest<AnyObject>,
    dataReference: string,
    context: PartyType,
    rest: {
      saveAndSignOut?: string | undefined;
      accessCodeCheck?: string | undefined;
      editAddress?: string | undefined;
      saveBeforeSessionTimeout?: string | undefined;
      sendToApplicant2ForReview?: string | undefined;
      addAnotherName?: string | undefined;
      addAnotherNameHidden?: string | undefined;
      paymentSuccessDetails?:
        | {
            amount: string;
            reference: string;
            ccd_case_number: string;
            case_reference: string;
            channel: string;
            method: string;
            status: string;
            external_reference: string;
            payment_group_reference: string;
          }
        | undefined;
      paymentDetails?:
        | {
            payment_reference: string;
            date_created: string;
            external_reference: string;
            next_url: string;
            status: string;
            serviceRequestReference: string;
          }
        | undefined;
      id?: string | undefined;
      state?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').State
        | undefined;
      applicantTemporaryFormData?: { TempFirstName?: unknown; TempLastName?: unknown } | undefined;
      children?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').Child[]
        | undefined;
      miamTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').MiamTable
        | undefined;
      applicants?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').Applicant[]
        | undefined;
      applicantsFL401?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').PartyDetails
        | undefined;
      respondentsFL401?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').PartyDetails
        | undefined;
      caseStatus?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').CaseStatus
        | undefined;
      welshNeeds?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').WelshNeed[]
        | undefined;
      respondents?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').Respondent[]
        | undefined;
      consentOrder?: string | undefined;
      isCaseUrgent?: string | undefined;
      isWelshNeeded?: string | undefined;
      natureOfOrder?: string | undefined;
      applicantTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').ApplicantTable[]
        | undefined;
      othersToNotify?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').OthersToNotify[]
        | undefined;
      urgencyDetails?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').UrgencyDetails
        | undefined;
      allegationOfHarm?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').AllegationOfHarm
        | undefined;
      dateOfSubmission?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').DateOfSubmission
        | undefined;
      interpreterNeeds?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').InterpreterNeed[]
        | undefined;
      applicantCaseName?: string | undefined;
      childDetailsTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').ChildDetailsTable[]
        | undefined;
      jurisdictionIssue?: string | undefined;
      ordersApplyingFor?: string[] | undefined;
      applicationDetails?: string | undefined;
      familyMediatorMiam?: string | undefined;
      setOutReasonsBelow?: string | undefined;
      specialArrangement?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').SpecialArrangement
        | undefined;
      adjustmentsRequired?: string | undefined;
      confidentialDetails?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').ConfidentialDetails
        | undefined;
      existingProceedings?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').ExistingProceedings[]
        | undefined;
      otherDocuments?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').OtherDocuments[]
        | undefined;
      hearingUrgencyTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').HearingUrgencyTable
        | undefined;
      isDisabilityPresent?: string | undefined;
      isInterpreterNeeded?: string | undefined;
      miamExemptionsTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').MiamExemptionsTable
        | undefined;
      isIntermediaryNeeded?: string | undefined;
      allocatedJudgeDetails?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').AllocatedJudgeDetails
        | undefined;
      applicantAttendedMiam?: string | undefined;
      caseTypeOfApplication?: string | undefined;
      claimingExemptionMiam?: string | undefined;
      miamCertificationDocumentUpload?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').Document
        | undefined;
      c1ADocument?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').Document
        | undefined;
      draftConsentOrderFile?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').DraftConsentOrderFile
        | undefined;
      otherProceedingsTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').OtherProceedingsTable
        | undefined;
      allegationsOfHarmYesNo?: string | undefined;
      childDetailsExtraTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').ChildDetailsExtraTable
        | undefined;
      reasonsForIntermediary?: string | undefined;
      typeOfApplicationTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').TypeOfApplicationTable
        | undefined;
      litigationCapacityTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').LitigationCapacityTable
        | undefined;
      miamExemptionsChecklist?: string[] | undefined;
      attendingTheHearingTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').AttendingTheHearingTable
        | undefined;
      caseUrgencyTimeAndReason?: string | undefined;
      welshLanguageRequirement?: string | undefined;
      internationalElementTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').InternationalElementTable
        | undefined;
      litigationCapacityFactors?: string | undefined;
      miamOtherGroundsChecklist?: string | undefined;
      otherPeopleInTheCaseTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').OtherPeopleInTheCaseTable[]
        | undefined;
      otherProceedingEmptyTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').OtherProceedingEmptyTable
        | undefined;
      requestToForeignAuthority?: string | undefined;
      effortsMadeWithRespondents?: string | undefined;
      jurisdictionIssueGiveReason?: string | undefined;
      litigationCapacityReferrals?: string | undefined;
      specialArrangementsRequired?: string | undefined;
      habitualResidentInOtherState?: string | undefined;
      otherProceedingsDetailsTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').OtherProceedingsDetailsTable[]
        | undefined;
      summaryTabForOrderAppliedFor?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').SummaryTabForOrderAppliedFor
        | undefined;
      typeOfChildArrangementsOrder?: string | undefined;
      applicationPermissionRequired?: string | undefined;
      childrenKnownToLocalAuthority?: string | undefined;
      isSpecialArrangementsRequired?: string | undefined;
      otherProceedingsForSummaryTab?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').OtherProceedingsForSummaryTab[]
        | undefined;
      allegationsOfHarmOverviewTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').AllegationsOfHarmOverviewTable
        | undefined;
      doYouNeedAWithoutNoticeHearing?: string | undefined;
      litigationCapacityOtherFactors?: string | undefined;
      welshLanguageRequirementsTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').WelshLanguageRequirementsTable
        | undefined;
      miamPreviousAttendanceChecklist?: string | undefined;
      areRespondentsAwareOfProceedings?: string | undefined;
      reasonsForApplicationWithoutNotice?: string | undefined;
      allegationsOfHarmDomesticAbuseTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').AllegationsOfHarmDomesticAbuseTable
        | undefined;
      allegationsOfHarmOtherConcernsTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').AllegationsOfHarmOtherConcernsTable
        | undefined;
      applicationPermissionRequiredReason?: string | undefined;
      requestToForeignAuthorityGiveReason?: string | undefined;
      welshLanguageRequirementApplication?: string | undefined;
      allegationsOfHarmChildAbductionTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').AllegationsOfHarmChildAbductionTable
        | undefined;
      childrenSubjectOfChildProtectionPlan?: string | undefined;
      childrenKnownToLocalAuthorityTextArea?: string | undefined;
      doYouRequireAHearingWithReducedNotice?: string | undefined;
      litigationCapacityOtherFactorsDetails?: string | undefined;
      c100ConfidentialityStatementDisclaimer?: string[] | undefined;
      habitualResidentInOtherStateGiveReason?: string | undefined;
      languageRequirementApplicationNeedWelsh?: string | undefined;
      previousOrOngoingProceedingsForChildren?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesNoDontKnow
        | undefined;
      welshLanguageRequirementApplicationNeedEnglish?: string | undefined;
      serviceType?: string | undefined;
      claimNumber?: string | undefined;
      caseCode?: string | undefined;
      accessCode?: string | undefined;
      detailsKnown?: string | undefined;
      startAlternative?: string | undefined;
      contactDetailsPrivate?: string[] | undefined;
      miamStart?: string | undefined;
      miamWillingness?: string | undefined;
      miamNotWillingExplnation?: string | undefined;
      doYouConsent?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      applicationReceivedDate?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/case').CaseDate
        | undefined;
      courtPermission?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      reasonForNotConsenting?: string | undefined;
      courtOrderDetails?: string | undefined;
      start?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      parents?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      jurisdiction?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      request?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      iFactorsJurisdictionProvideDetails?: string | undefined;
      iFactorsStartProvideDetails?: string | undefined;
      iFactorsRequestProvideDetails?: string | undefined;
      iFactorsParentsProvideDetails?: string | undefined;
      confirmcontactdetails?: string | undefined;
      respondentName?: string | undefined;
      respondentFirstName?: string | undefined;
      respondentLastName?: string | undefined;
      caseInvites?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').CaseInvite[]
        | undefined;
      orderCollection?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').ListValue<
            import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').PRLDocument
          >[]
        | undefined;
      hearingCollection?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').HearingsList[]
        | undefined;
      documentsGenerated?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').ListValue<
            import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').PRLDocument
          >[]
        | undefined;
      yourchildconcernsstart?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      cameoutofallegationsharmwithNo?: boolean | undefined;
      documentText?: string | undefined;
      applicantUploadFiles?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/case').UploadedFile[]
        | undefined;
      declarationCheck?: string | undefined;
      finalDocument?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').Document
        | undefined;
      fl401UploadWitnessDocuments?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').Fl401UploadWitnessDocuments[]
        | undefined;
      citizenUploadedDocumentList?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').UploadDocumentList[]
        | undefined;
      respondentUploadFiles?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/case').UploadedFile[]
        | undefined;
      proceedingsCourtCase?: string | undefined;
      proceedingsStart?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      proceedingsCourtOrder?: string | undefined;
      proceedingsStartOrder?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      courtProceedingsInvolved?: string | undefined;
      supervisionOrderOption?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      supervisionOrder?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').orderInterface
        | undefined;
      emergencyOrderOptions?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      emergencyOrder?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').orderInterface
        | undefined;
      careOrderOptions?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      careOrder?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').orderInterface
        | undefined;
      childAbductionOrderOption?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      childAbductionOrder?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').orderInterface
        | undefined;
      caOrderOption?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      caOrder?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').orderInterface
        | undefined;
      financialOrderOption?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      financialOrder?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').orderInterface
        | undefined;
      nonmolestationOrderOption?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      nonmolestationOrder?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').orderInterface
        | undefined;
      occupationalOrderOptions?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      occupationOrder?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').orderInterface
        | undefined;
      marraigeOrderOptions?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      marraigeOrder?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').orderInterface
        | undefined;
      restrainingOrderOptions?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      restrainingOrder?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').orderInterface
        | undefined;
      injuctiveOrderOptions?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      injuctiveOrder?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').orderInterface
        | undefined;
      underTakingOrderOptions?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      underTakingOrder?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').orderInterface
        | undefined;
      citizenUserFullName?: string | undefined;
      citizenUserFirstNames?: string | undefined;
      citizenUserLastNames?: string | undefined;
      applicant1HasOtherNames?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      citizenUserAdditionalName?: string | undefined;
      applicant1AdditionalNames?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').OtherName[]
        | undefined;
      citizenUserEmailAddress?: string | undefined;
      citizenUserEmailAddressText?: string | undefined;
      citizenUserSafeToCall?: string | undefined;
      citizenUserPhoneNumber?: string | undefined;
      citizenUserPhoneNumberText?: string | undefined;
      citizenUserDateOfBirth?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/case').CaseDate
        | undefined;
      citizenUserDateOfBirthText?: string | undefined;
      applicant1Occupation?: string | undefined;
      citizenUserSelectAddress?: string | undefined;
      citizenUserPlaceOfBirth?: string | undefined;
      citizenUserPlaceOfBirthText?: string | undefined;
      citizenUserAddress1?: string | undefined;
      citizenUserAddress2?: string | undefined;
      citizenUserAddressTown?: string | undefined;
      citizenUserAddressCounty?: string | undefined;
      citizenUserAddressPostcode?: string | undefined;
      citizenUserAddressText?: string | undefined;
      citizenUserAddressHistory?: string | undefined;
      isAtAddressLessThan5Years?: string | undefined;
      applicant1ContactDetails?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').ContactDetails[]
        | undefined;
      applicant1ContactDetailsConsent?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      citizenUserManualAddress1?: string | undefined;
      citizenUserManualAddress2?: string | undefined;
      citizenUserManualAddressTown?: string | undefined;
      citizenUserManualAddressCounty?: string | undefined;
      citizenUserManualAddressPostcode?: string | undefined;
      languageDetails?: string | undefined;
      helpCommunication?: string[] | undefined;
      describeOtherNeed?: string | undefined;
      safetyArrangements?: string[] | undefined;
      safetyArrangementsDetails?: string | undefined;
      travellingOtherDetails?: string | undefined;
      unableForCourtProceedings?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      courtProceedingProvideDetails?: string | undefined;
      attendingToCourt?: string[] | undefined;
      respondentConcernedonChildAbout?: string | undefined;
      ConcernedonSelfAbout?: string | undefined;
      hearingDetails?: string | undefined;
      languageRequirements?: string[] | undefined;
      reasonableAdjustments?: string[] | undefined;
      docsSupport?: string[] | undefined;
      docsDetails?: string | undefined;
      largePrintDetails?: string | undefined;
      otherDetails?: string | undefined;
      describeSignLanguageDetails?: string | undefined;
      courtHearing?: string[] | undefined;
      supportWorkerDetails?: string | undefined;
      familyProviderDetails?: string | undefined;
      therapyDetails?: string | undefined;
      communicationSupportOther?: string | undefined;
      courtComfort?: string[] | undefined;
      lightingProvideDetails?: string | undefined;
      otherProvideDetails?: string | undefined;
      travellingToCourt?: string[] | undefined;
      parkingDetails?: string | undefined;
      differentChairDetails?: string | undefined;
      safetyConcerns?: string | undefined;
      citizenRole?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/case').FieldPrefix
        | undefined;
      orderWithoutGivingNoticeToRespondent?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').WithoutNoticeOrderDetails
        | undefined;
      legalRepresentation?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      courtProceedingsOrders?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').ProceedingsOrderTypes[]
        | undefined;
      otherProceedings?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').OtherProceedings
        | undefined;
      doesOrderClosesCase?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      selectTypeOfOrder?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').SelectTypeOfOrderEnum
        | undefined;
      citizenResponseC7DocumentList?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').ResponseDocumentList[]
        | undefined;
      reasonableAdjustmentsPages?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').ReasonableAdjustments[]
        | undefined;
      respondentDocsSupportPage?: string[] | undefined;
      respondentHelpCommunicationPage?: string[] | undefined;
      respondentCourtHearingPage?: string[] | undefined;
      respondentCourtComfortPage?: string[] | undefined;
      respondentTravellingToCourtPage?: string[] | undefined;
      contactDetailsPrivateAlternative?: string | undefined;
      c100ApplicationFees?: string | undefined;
      ra_disabilityRequirements?: string[] | undefined;
      hwf_needHelpWithFees?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      hwf_feesAppliedDetails?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      caseId?: string | undefined;
      c1A_haveSafetyConcerns?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      PRL_c1A_haveSafetyConcerns?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      op_courtProceedingsOrders?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').C100OrderTypes[]
        | undefined;
      op_otherProceedings?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').OtherProceedings
        | undefined;
      c1A_safetyConernAbout?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').C1ASafteyConcernsAbout[]
        | undefined;
      PRL_c1A_safetyConernAbout?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').PRL_C1ASafteyConcernsAbout[]
        | undefined;
      c1A_safteyConcerns?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').C1ASafteyConcerns
        | undefined;
      PRL_c1A_safteyConcerns?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').PRL_C1ASafteyConcerns
        | undefined;
      PRL_c1A_abductionReasonOutsideUk?: string | undefined;
      PRL_c1A_childsCurrentLocation?: string | undefined;
      PRL_c1A_childrenMoreThanOnePassport?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      PRL_c1A_possessionChildrenPassport?: string[] | undefined;
      PRL_c1A_provideOtherDetails?: string | undefined;
      miam_otherProceedings?: string | undefined;
      miam_haveDocSigned?: string | undefined;
      miam_consent?: string | undefined;
      miam_attendance?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      miam_validReason?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      miam_certificate?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').C100DocumentInfo
        | undefined;
      miam_mediatorDocument?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      miam_nonAttendanceReasons?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').MiamNonAttendReason[]
        | undefined;
      miam_domesticAbuse?: string[] | undefined;
      miam_childProtectionEvidence?: string[] | undefined;
      miam_urgency?: string[] | undefined;
      miam_previousAttendance?: string[] | undefined;
      miam_notAttendingReasons?: string[] | undefined;
      hu_urgentHearingReasons?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      c1A_passportOffice?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      PRL_c1A_passportOffice?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      PRL_c1A_abductionPassportOfficeNotified?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      PRL_c1A_previousAbductionsShortDesc?: string | undefined;
      PRL_c1A_policeOrInvestigatorInvolved?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      PRL_c1A_policeOrInvestigatorOtherDetails?: string | undefined;
      PRL_c1A_childAbductedBefore?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      PRL_c1A_otherConcernsDrugs?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      PRL_c1A_otherConcernsDrugsDetails?: string | undefined;
      PRL_c1A_childSafetyConcerns?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      PRL_c1A_childSafetyConcernsDetails?: string | undefined;
      PRL_c1A_keepingSafeStatement?: string | undefined;
      PRL_c1A_supervisionAgreementDetails?: string | undefined;
      PRL_c1A_agreementOtherWaysDetails?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      cd_children?: ChildrenDetails[] | undefined;
      ocd_otherChildren?: OtherChildrenDetails[] | undefined;
      ocd_hasOtherChildren?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      sq_writtenAgreement?: string | undefined;
      sq_legalRepresentation?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      sq_legalRepresentationApplication?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      sq_courtPermissionRequired?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      c1A_concernAboutChild?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').C1AAbuseTypes[]
        | undefined;
      PRL_c1A_concernAboutChild?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').PRL_C1AAbuseTypes[]
        | undefined;
      c1A_concernAboutApplicant?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').C1AAbuseTypes[]
        | undefined;
      c1A_concernAboutRespondent?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').C1AAbuseTypes[]
        | undefined;
      PRL_c1A_concernAboutRespondent?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').PRL_C1AAbuseTypes[]
        | undefined;
      c1A_childAbductedBefore?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      co_certificate?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').C100DocumentInfo
        | undefined;
      too_courtOrder?: string[] | undefined;
      too_stopOtherPeopleDoingSomethingSubField?: string[] | undefined;
      too_resolveSpecificIssueSubField?: string[] | undefined;
      otherPersonFirstName?: string | undefined;
      otherPersonLastName?: string | undefined;
      oprs_otherPersonCheck?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      oprs_otherPersons?: C100RebuildPartyDetails[] | undefined;
      resp_Respondents?: C100RebuildPartyDetails[] | undefined;
      appl_allApplicants?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').C100Applicant[]
        | undefined;
      op_childrenInvolvedCourtCase?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      op_courtOrderProtection?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      hwn_hearingPart1?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      c100RebuildChildPostCode?: string | undefined;
      helpWithFeesReferenceNumber?: string | undefined;
    },
    form: Form,
    formData: {
      saveAndSignOut?: string | undefined;
      accessCodeCheck?: string | undefined;
      editAddress?: string | undefined;
      saveBeforeSessionTimeout?: string | undefined;
      sendToApplicant2ForReview?: string | undefined;
      addAnotherName?: string | undefined;
      addAnotherNameHidden?: string | undefined;
      paymentSuccessDetails?:
        | {
            amount: string;
            reference: string;
            ccd_case_number: string;
            case_reference: string;
            channel: string;
            method: string;
            status: string;
            external_reference: string;
            payment_group_reference: string;
          }
        | undefined;
      paymentDetails?:
        | {
            payment_reference: string;
            date_created: string;
            external_reference: string;
            next_url: string;
            status: string;
            serviceRequestReference: string;
          }
        | undefined;
      id?: string | undefined;
      state?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').State
        | undefined;
      applicantTemporaryFormData?: { TempFirstName?: unknown; TempLastName?: unknown } | undefined;
      children?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').Child[]
        | undefined;
      miamTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').MiamTable
        | undefined;
      applicants?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').Applicant[]
        | undefined;
      applicantsFL401?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').PartyDetails
        | undefined;
      respondentsFL401?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').PartyDetails
        | undefined;
      caseStatus?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').CaseStatus
        | undefined;
      welshNeeds?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').WelshNeed[]
        | undefined;
      respondents?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').Respondent[]
        | undefined;
      consentOrder?: string | undefined;
      isCaseUrgent?: string | undefined;
      isWelshNeeded?: string | undefined;
      natureOfOrder?: string | undefined;
      applicantTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').ApplicantTable[]
        | undefined;
      othersToNotify?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').OthersToNotify[]
        | undefined;
      urgencyDetails?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').UrgencyDetails
        | undefined;
      allegationOfHarm?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').AllegationOfHarm
        | undefined;
      dateOfSubmission?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').DateOfSubmission
        | undefined;
      interpreterNeeds?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').InterpreterNeed[]
        | undefined;
      applicantCaseName?: string | undefined;
      childDetailsTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').ChildDetailsTable[]
        | undefined;
      jurisdictionIssue?: string | undefined;
      ordersApplyingFor?: string[] | undefined;
      applicationDetails?: string | undefined;
      familyMediatorMiam?: string | undefined;
      setOutReasonsBelow?: string | undefined;
      specialArrangement?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').SpecialArrangement
        | undefined;
      adjustmentsRequired?: string | undefined;
      confidentialDetails?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').ConfidentialDetails
        | undefined;
      existingProceedings?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').ExistingProceedings[]
        | undefined;
      otherDocuments?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').OtherDocuments[]
        | undefined;
      hearingUrgencyTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').HearingUrgencyTable
        | undefined;
      isDisabilityPresent?: string | undefined;
      isInterpreterNeeded?: string | undefined;
      miamExemptionsTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').MiamExemptionsTable
        | undefined;
      isIntermediaryNeeded?: string | undefined;
      allocatedJudgeDetails?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').AllocatedJudgeDetails
        | undefined;
      applicantAttendedMiam?: string | undefined;
      caseTypeOfApplication?: string | undefined;
      claimingExemptionMiam?: string | undefined;
      miamCertificationDocumentUpload?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').Document
        | undefined;
      c1ADocument?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').Document
        | undefined;
      draftConsentOrderFile?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').DraftConsentOrderFile
        | undefined;
      otherProceedingsTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').OtherProceedingsTable
        | undefined;
      allegationsOfHarmYesNo?: string | undefined;
      childDetailsExtraTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').ChildDetailsExtraTable
        | undefined;
      reasonsForIntermediary?: string | undefined;
      typeOfApplicationTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').TypeOfApplicationTable
        | undefined;
      litigationCapacityTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').LitigationCapacityTable
        | undefined;
      miamExemptionsChecklist?: string[] | undefined;
      attendingTheHearingTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').AttendingTheHearingTable
        | undefined;
      caseUrgencyTimeAndReason?: string | undefined;
      welshLanguageRequirement?: string | undefined;
      internationalElementTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').InternationalElementTable
        | undefined;
      litigationCapacityFactors?: string | undefined;
      miamOtherGroundsChecklist?: string | undefined;
      otherPeopleInTheCaseTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').OtherPeopleInTheCaseTable[]
        | undefined;
      otherProceedingEmptyTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').OtherProceedingEmptyTable
        | undefined;
      requestToForeignAuthority?: string | undefined;
      effortsMadeWithRespondents?: string | undefined;
      jurisdictionIssueGiveReason?: string | undefined;
      litigationCapacityReferrals?: string | undefined;
      specialArrangementsRequired?: string | undefined;
      habitualResidentInOtherState?: string | undefined;
      otherProceedingsDetailsTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').OtherProceedingsDetailsTable[]
        | undefined;
      summaryTabForOrderAppliedFor?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').SummaryTabForOrderAppliedFor
        | undefined;
      typeOfChildArrangementsOrder?: string | undefined;
      applicationPermissionRequired?: string | undefined;
      childrenKnownToLocalAuthority?: string | undefined;
      isSpecialArrangementsRequired?: string | undefined;
      otherProceedingsForSummaryTab?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').OtherProceedingsForSummaryTab[]
        | undefined;
      allegationsOfHarmOverviewTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').AllegationsOfHarmOverviewTable
        | undefined;
      doYouNeedAWithoutNoticeHearing?: string | undefined;
      litigationCapacityOtherFactors?: string | undefined;
      welshLanguageRequirementsTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').WelshLanguageRequirementsTable
        | undefined;
      miamPreviousAttendanceChecklist?: string | undefined;
      areRespondentsAwareOfProceedings?: string | undefined;
      reasonsForApplicationWithoutNotice?: string | undefined;
      allegationsOfHarmDomesticAbuseTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').AllegationsOfHarmDomesticAbuseTable
        | undefined;
      allegationsOfHarmOtherConcernsTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').AllegationsOfHarmOtherConcernsTable
        | undefined;
      applicationPermissionRequiredReason?: string | undefined;
      requestToForeignAuthorityGiveReason?: string | undefined;
      welshLanguageRequirementApplication?: string | undefined;
      allegationsOfHarmChildAbductionTable?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').AllegationsOfHarmChildAbductionTable
        | undefined;
      childrenSubjectOfChildProtectionPlan?: string | undefined;
      childrenKnownToLocalAuthorityTextArea?: string | undefined;
      doYouRequireAHearingWithReducedNotice?: string | undefined;
      litigationCapacityOtherFactorsDetails?: string | undefined;
      c100ConfidentialityStatementDisclaimer?: string[] | undefined;
      habitualResidentInOtherStateGiveReason?: string | undefined;
      languageRequirementApplicationNeedWelsh?: string | undefined;
      previousOrOngoingProceedingsForChildren?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesNoDontKnow
        | undefined;
      welshLanguageRequirementApplicationNeedEnglish?: string | undefined;
      serviceType?: string | undefined;
      claimNumber?: string | undefined;
      caseCode?: string | undefined;
      accessCode?: string | undefined;
      detailsKnown?: string | undefined;
      startAlternative?: string | undefined;
      contactDetailsPrivate?: string[] | undefined;
      miamStart?: string | undefined;
      miamWillingness?: string | undefined;
      miamNotWillingExplnation?: string | undefined;
      doYouConsent?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      applicationReceivedDate?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/case').CaseDate
        | undefined;
      courtPermission?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      reasonForNotConsenting?: string | undefined;
      courtOrderDetails?: string | undefined;
      start?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      parents?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      jurisdiction?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      request?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      iFactorsJurisdictionProvideDetails?: string | undefined;
      iFactorsStartProvideDetails?: string | undefined;
      iFactorsRequestProvideDetails?: string | undefined;
      iFactorsParentsProvideDetails?: string | undefined;
      confirmcontactdetails?: string | undefined;
      respondentName?: string | undefined;
      respondentFirstName?: string | undefined;
      respondentLastName?: string | undefined;
      caseInvites?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').CaseInvite[]
        | undefined;
      orderCollection?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').ListValue<
            import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').PRLDocument
          >[]
        | undefined;
      hearingCollection?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').HearingsList[]
        | undefined;
      documentsGenerated?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').ListValue<
            import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').PRLDocument
          >[]
        | undefined;
      yourchildconcernsstart?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      cameoutofallegationsharmwithNo?: boolean | undefined;
      documentText?: string | undefined;
      applicantUploadFiles?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/case').UploadedFile[]
        | undefined;
      declarationCheck?: string | undefined;
      finalDocument?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').Document
        | undefined;
      fl401UploadWitnessDocuments?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').Fl401UploadWitnessDocuments[]
        | undefined;
      citizenUploadedDocumentList?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').UploadDocumentList[]
        | undefined;
      respondentUploadFiles?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/case').UploadedFile[]
        | undefined;
      proceedingsCourtCase?: string | undefined;
      proceedingsStart?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      proceedingsCourtOrder?: string | undefined;
      proceedingsStartOrder?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      courtProceedingsInvolved?: string | undefined;
      supervisionOrderOption?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      supervisionOrder?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').orderInterface
        | undefined;
      emergencyOrderOptions?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      emergencyOrder?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').orderInterface
        | undefined;
      careOrderOptions?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      careOrder?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').orderInterface
        | undefined;
      childAbductionOrderOption?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      childAbductionOrder?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').orderInterface
        | undefined;
      caOrderOption?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      caOrder?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').orderInterface
        | undefined;
      financialOrderOption?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      financialOrder?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').orderInterface
        | undefined;
      nonmolestationOrderOption?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      nonmolestationOrder?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').orderInterface
        | undefined;
      occupationalOrderOptions?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      occupationOrder?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').orderInterface
        | undefined;
      marraigeOrderOptions?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      marraigeOrder?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').orderInterface
        | undefined;
      restrainingOrderOptions?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      restrainingOrder?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').orderInterface
        | undefined;
      injuctiveOrderOptions?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      injuctiveOrder?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').orderInterface
        | undefined;
      underTakingOrderOptions?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      underTakingOrder?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').orderInterface
        | undefined;
      citizenUserFullName?: string | undefined;
      citizenUserFirstNames?: string | undefined;
      citizenUserLastNames?: string | undefined;
      applicant1HasOtherNames?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      citizenUserAdditionalName?: string | undefined;
      applicant1AdditionalNames?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').OtherName[]
        | undefined;
      citizenUserEmailAddress?: string | undefined;
      citizenUserEmailAddressText?: string | undefined;
      citizenUserSafeToCall?: string | undefined;
      citizenUserPhoneNumber?: string | undefined;
      citizenUserPhoneNumberText?: string | undefined;
      citizenUserDateOfBirth?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/case').CaseDate
        | undefined;
      citizenUserDateOfBirthText?: string | undefined;
      applicant1Occupation?: string | undefined;
      citizenUserSelectAddress?: string | undefined;
      citizenUserPlaceOfBirth?: string | undefined;
      citizenUserPlaceOfBirthText?: string | undefined;
      citizenUserAddress1?: string | undefined;
      citizenUserAddress2?: string | undefined;
      citizenUserAddressTown?: string | undefined;
      citizenUserAddressCounty?: string | undefined;
      citizenUserAddressPostcode?: string | undefined;
      citizenUserAddressText?: string | undefined;
      citizenUserAddressHistory?: string | undefined;
      isAtAddressLessThan5Years?: string | undefined;
      applicant1ContactDetails?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').ContactDetails[]
        | undefined;
      applicant1ContactDetailsConsent?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      citizenUserManualAddress1?: string | undefined;
      citizenUserManualAddress2?: string | undefined;
      citizenUserManualAddressTown?: string | undefined;
      citizenUserManualAddressCounty?: string | undefined;
      citizenUserManualAddressPostcode?: string | undefined;
      languageDetails?: string | undefined;
      helpCommunication?: string[] | undefined;
      describeOtherNeed?: string | undefined;
      safetyArrangements?: string[] | undefined;
      safetyArrangementsDetails?: string | undefined;
      travellingOtherDetails?: string | undefined;
      unableForCourtProceedings?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      courtProceedingProvideDetails?: string | undefined;
      attendingToCourt?: string[] | undefined;
      respondentConcernedonChildAbout?: string | undefined;
      ConcernedonSelfAbout?: string | undefined;
      hearingDetails?: string | undefined;
      languageRequirements?: string[] | undefined;
      reasonableAdjustments?: string[] | undefined;
      docsSupport?: string[] | undefined;
      docsDetails?: string | undefined;
      largePrintDetails?: string | undefined;
      otherDetails?: string | undefined;
      describeSignLanguageDetails?: string | undefined;
      courtHearing?: string[] | undefined;
      supportWorkerDetails?: string | undefined;
      familyProviderDetails?: string | undefined;
      therapyDetails?: string | undefined;
      communicationSupportOther?: string | undefined;
      courtComfort?: string[] | undefined;
      lightingProvideDetails?: string | undefined;
      otherProvideDetails?: string | undefined;
      travellingToCourt?: string[] | undefined;
      parkingDetails?: string | undefined;
      differentChairDetails?: string | undefined;
      safetyConcerns?: string | undefined;
      citizenRole?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/case').FieldPrefix
        | undefined;
      orderWithoutGivingNoticeToRespondent?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').WithoutNoticeOrderDetails
        | undefined;
      legalRepresentation?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      courtProceedingsOrders?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').ProceedingsOrderTypes[]
        | undefined;
      otherProceedings?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').OtherProceedings
        | undefined;
      doesOrderClosesCase?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      selectTypeOfOrder?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').SelectTypeOfOrderEnum
        | undefined;
      citizenResponseC7DocumentList?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').ResponseDocumentList[]
        | undefined;
      reasonableAdjustmentsPages?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').ReasonableAdjustments[]
        | undefined;
      respondentDocsSupportPage?: string[] | undefined;
      respondentHelpCommunicationPage?: string[] | undefined;
      respondentCourtHearingPage?: string[] | undefined;
      respondentCourtComfortPage?: string[] | undefined;
      respondentTravellingToCourtPage?: string[] | undefined;
      contactDetailsPrivateAlternative?: string | undefined;
      c100ApplicationFees?: string | undefined;
      ra_disabilityRequirements?: string[] | undefined;
      hwf_needHelpWithFees?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      hwf_feesAppliedDetails?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      caseId?: string | undefined;
      c1A_haveSafetyConcerns?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      PRL_c1A_haveSafetyConcerns?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      op_courtProceedingsOrders?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').C100OrderTypes[]
        | undefined;
      op_otherProceedings?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').OtherProceedings
        | undefined;
      c1A_safetyConernAbout?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').C1ASafteyConcernsAbout[]
        | undefined;
      PRL_c1A_safetyConernAbout?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').PRL_C1ASafteyConcernsAbout[]
        | undefined;
      c1A_safteyConcerns?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').C1ASafteyConcerns
        | undefined;
      PRL_c1A_safteyConcerns?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').PRL_C1ASafteyConcerns
        | undefined;
      PRL_c1A_abductionReasonOutsideUk?: string | undefined;
      PRL_c1A_childsCurrentLocation?: string | undefined;
      PRL_c1A_childrenMoreThanOnePassport?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      PRL_c1A_possessionChildrenPassport?: string[] | undefined;
      PRL_c1A_provideOtherDetails?: string | undefined;
      miam_otherProceedings?: string | undefined;
      miam_haveDocSigned?: string | undefined;
      miam_consent?: string | undefined;
      miam_attendance?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      miam_validReason?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      miam_certificate?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').C100DocumentInfo
        | undefined;
      miam_mediatorDocument?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      miam_nonAttendanceReasons?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').MiamNonAttendReason[]
        | undefined;
      miam_domesticAbuse?: string[] | undefined;
      miam_childProtectionEvidence?: string[] | undefined;
      miam_urgency?: string[] | undefined;
      miam_previousAttendance?: string[] | undefined;
      miam_notAttendingReasons?: string[] | undefined;
      hu_urgentHearingReasons?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      c1A_passportOffice?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      PRL_c1A_passportOffice?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      PRL_c1A_abductionPassportOfficeNotified?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      PRL_c1A_previousAbductionsShortDesc?: string | undefined;
      PRL_c1A_policeOrInvestigatorInvolved?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      PRL_c1A_policeOrInvestigatorOtherDetails?: string | undefined;
      PRL_c1A_childAbductedBefore?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      PRL_c1A_otherConcernsDrugs?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      PRL_c1A_otherConcernsDrugsDetails?: string | undefined;
      PRL_c1A_childSafetyConcerns?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      PRL_c1A_childSafetyConcernsDetails?: string | undefined;
      PRL_c1A_keepingSafeStatement?: string | undefined;
      PRL_c1A_supervisionAgreementDetails?: string | undefined;
      PRL_c1A_agreementOtherWaysDetails?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      cd_children?: ChildrenDetails[] | undefined;
      ocd_otherChildren?: OtherChildrenDetails[] | undefined;
      ocd_hasOtherChildren?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      sq_writtenAgreement?: string | undefined;
      sq_legalRepresentation?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      sq_legalRepresentationApplication?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      sq_courtPermissionRequired?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      c1A_concernAboutChild?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').C1AAbuseTypes[]
        | undefined;
      PRL_c1A_concernAboutChild?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').PRL_C1AAbuseTypes[]
        | undefined;
      c1A_concernAboutApplicant?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').C1AAbuseTypes[]
        | undefined;
      c1A_concernAboutRespondent?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').C1AAbuseTypes[]
        | undefined;
      PRL_c1A_concernAboutRespondent?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').PRL_C1AAbuseTypes[]
        | undefined;
      c1A_childAbductedBefore?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      co_certificate?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').C100DocumentInfo
        | undefined;
      too_courtOrder?: string[] | undefined;
      too_stopOtherPeopleDoingSomethingSubField?: string[] | undefined;
      too_resolveSpecificIssueSubField?: string[] | undefined;
      otherPersonFirstName?: string | undefined;
      otherPersonLastName?: string | undefined;
      oprs_otherPersonCheck?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      oprs_otherPersons?: C100RebuildPartyDetails[] | undefined;
      c100TempFirstName?: string | undefined;
      c100TempLastName?: string | undefined;
      resp_Respondents?: C100RebuildPartyDetails[] | undefined;
      appl_allApplicants?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').C100Applicant[]
        | undefined;
      op_childrenInvolvedCourtCase?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      op_courtOrderProtection?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      hwn_hearingPart1?:
        | import('/Users/m_2120297/hmcts-repos/prl-citizen-frontend/src/main/app/case/definition').YesOrNo
        | undefined;
      c100RebuildChildPostCode?: string | undefined;
      helpWithFeesReferenceNumber?: string | undefined;
    },
    c100TempFirstName: string | undefined,
    c100TempLastName: string | undefined,
    res: Response<any, Record<string, any>>
  ) {
    req.session.userCase[dataReference] = transformAddPeople(context, rest, req.session.userCase[dataReference]);
    req.session.errors = form.getErrors(formData);

    if (!req.session.errors.length) {
      this.addPerson(c100TempFirstName, c100TempLastName);
    } else if (req.session.userCase[dataReference].length && !c100TempFirstName && !c100TempLastName) {
      req.session.errors = req.session.errors.filter(
        error => !['c100TempFirstName', 'c100TempLastName'].includes(error.propertyName)
      );
    }

    return this.parent.redirect(req, res);
  }
}
