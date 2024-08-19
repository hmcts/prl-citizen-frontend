import { Response } from 'express';
import _ from 'lodash';

import { CosApiClient } from '../../app/case/CosApiClient';
import { CaseWithId } from '../../app/case/case';
import {
  AWPApplicationReason,
  AWPApplicationType,
  AWPFeeDetailsRequest,
  CaseType,
  PartyType,
  PaymentErrorContext,
} from '../../app/case/definition';
import { AppRequest, AppSession, UserDetails } from '../../app/controller/AppRequest';
import { PaymentController, PaymentResponse } from '../../modules/payments/paymentController';
import { applyParms } from '../../steps/common/url-parser';
import { getCasePartyType } from '../../steps/prl-cases/dashboard/utils';
import { getPartyDetails } from '../../steps/tasklistresponse/utils';
import {
  APPLICATION_WITHIN_PROCEEDINGS_APPLICATION_SUBMITTED,
  APPLICATION_WITHIN_PROCEEDINGS_CHECK_YOUR_ANSWER,
  APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS,
} from '../../steps/urls';

import { languages as applicationReasonTranslation } from './content';

interface AWPApplicationTypesConfig {
  applicationType: AWPApplicationType;
  applicationReasons: ApplicationReason[];
  applicationFee?: Partial<Record<CaseType, string>>;
  applicationFormUrl: string;
}

interface ApplicationReason {
  reason: AWPApplicationReason;
  applicableCaseTypes: CaseType[];
  applicablePartyType: Partial<Record<CaseType, PartyType[]>>;
}

interface ApplicationDetails {
  applicationType: AWPApplicationType;
  applicationReason: AWPApplicationReason;
  applicationFee: string;
  reasonText: string;
  applicationFormUrl: string;
}

const applicationTypesConfiguration: AWPApplicationTypesConfig[] = [
  {
    applicationType: AWPApplicationType.C2,
    applicationReasons: [
      {
        reason: AWPApplicationReason.DELAY_CANCEL_HEARING_DATE,
        applicableCaseTypes: [CaseType.C100, CaseType.FL401],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
          FL401: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
      {
        reason: AWPApplicationReason.REQUEST_MORE_TIME,
        applicableCaseTypes: [CaseType.C100, CaseType.FL401],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
          FL401: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
      {
        reason: AWPApplicationReason.CHILD_ARRANGEMENTS_ORDER_TO_LIVE_SPEND_TIME,
        applicableCaseTypes: [CaseType.C100],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
      {
        reason: AWPApplicationReason.PROHIBITED_STEPS_ORDER,
        applicableCaseTypes: [CaseType.C100],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
      {
        reason: AWPApplicationReason.SPECIFIC_ISSUE_ORCDER,
        applicableCaseTypes: [CaseType.C100],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
      {
        reason: AWPApplicationReason.SUBMIT_EVIDENCE_COURT_NOT_REQUESTED,
        applicableCaseTypes: [CaseType.C100, CaseType.FL401],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
          FL401: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
      {
        reason: AWPApplicationReason.SHARE_DOCUMENTS_WITH_SOMEONE_ELSE,
        applicableCaseTypes: [CaseType.C100, CaseType.FL401],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
          FL401: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
      {
        reason: AWPApplicationReason.JOIN_OR_LEAVE_CASE,
        applicableCaseTypes: [CaseType.C100, CaseType.FL401],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
          FL401: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
      {
        reason: AWPApplicationReason.REQUEST_TO_WITHDRAW_APPLICATION,
        applicableCaseTypes: [CaseType.C100, CaseType.FL401],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
          FL401: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
      {
        reason: AWPApplicationReason.ASK_COURT_FOR_APPOINTING_EXPERT,
        applicableCaseTypes: [CaseType.C100, CaseType.FL401],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
          FL401: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
      {
        reason: AWPApplicationReason.PERMISSION_FOR_APPLICATION,
        applicableCaseTypes: [CaseType.C100],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
    ],
    applicationFormUrl:
      'https://www.gov.uk/government/publications/form-c2-application-for-permission-to-start-proceedings-for-an-order-or-directions-in-existing-proceedings-to-be-joined-as-or-cease-to-be-a-part',
  },
  {
    applicationType: AWPApplicationType.C1,
    applicationReasons: [
      {
        reason: AWPApplicationReason.REQUEST_PARENTAL_RESPONSIBILITY,
        applicableCaseTypes: [CaseType.C100],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
      {
        reason: AWPApplicationReason.REQUEST_GUARDIAN_FOR_CHILD,
        applicableCaseTypes: [CaseType.C100],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
    ],
    applicationFormUrl: 'https://www.gov.uk/government/publications/form-c1-application-for-an-order',
  },
  {
    applicationType: AWPApplicationType.C3,
    applicationReasons: [
      {
        reason: AWPApplicationReason.ORDER_AUTHORISING_SEARCH,
        applicableCaseTypes: [CaseType.C100],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
    ],
    applicationFormUrl:
      'https://www.gov.uk/government/publications/form-c3-application-for-an-order-authorising-search-for-taking-charge-of-and-delivery-of-a-child',
  },
  {
    applicationType: AWPApplicationType.C4,
    applicationReasons: [
      {
        reason: AWPApplicationReason.ORDER_TO_KNOW_ABOUT_CHILD,
        applicableCaseTypes: [CaseType.C100],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
    ],
    applicationFormUrl:
      'https://www.gov.uk/government/publications/form-c4-application-for-an-order-for-disclosure-of-a-childs-whereabouts',
  },
  {
    applicationType: AWPApplicationType.C79,
    applicationReasons: [
      {
        reason: AWPApplicationReason.ENFORCE_CHILD_ARRANGEMENTS_ORDER,
        applicableCaseTypes: [CaseType.C100],
        applicablePartyType: {
          C100: [PartyType.APPLICANT],
        },
      },
    ],
    applicationFormUrl:
      'https://www.gov.uk/government/publications/form-c79-application-related-to-enforcement-of-a-child-arrangement-order',
  },
  {
    applicationType: AWPApplicationType.D89,
    applicationReasons: [
      {
        reason: AWPApplicationReason.DELIVER_PAPER_TO_OTHER_PARTY,
        applicableCaseTypes: [CaseType.C100, CaseType.FL401],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
          FL401: [PartyType.APPLICANT],
        },
      },
    ],
    applicationFormUrl:
      'https://www.gov.uk/government/publications/form-d89-request-personal-service-of-papers-by-a-court-bailiff',
  },
  {
    applicationType: AWPApplicationType.EX740,
    applicationReasons: [
      {
        reason: AWPApplicationReason.YOU_ACCUSED_SOMEONE,
        applicableCaseTypes: [CaseType.C100, CaseType.FL401],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
          FL401: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
    ],
    applicationFormUrl:
      'https://www.gov.uk/government/publications/accuser-apply-to-the-court-to-consider-whether-to-prevent-prohibit-questioning-cross-examination-in-person-form-ex740',
  },
  {
    applicationType: AWPApplicationType.EX741,
    applicationReasons: [
      {
        reason: AWPApplicationReason.ACCUSED_BY_SOMEONE,
        applicableCaseTypes: [CaseType.C100, CaseType.FL401],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
          FL401: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
    ],
    applicationFormUrl:
      'https://www.gov.uk/government/publications/accused-apply-to-the-court-to-consider-whether-to-prevent-prohibit-questioning-cross-examination-in-person-form-ex741',
  },
  {
    applicationType: AWPApplicationType.FP25,
    applicationReasons: [
      {
        reason: AWPApplicationReason.REQUEST_FOR_ORDER_WITNESS,
        applicableCaseTypes: [CaseType.C100, CaseType.FL401],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
          FL401: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
    ],
    applicationFormUrl: 'https://www.gov.uk/government/publications/form-fp25-witness-summons',
  },
  {
    applicationType: AWPApplicationType.FC600,
    applicationReasons: [
      {
        reason: AWPApplicationReason.REQUEST_COURT_TO_ACT_DURING_DISOBEY,
        applicableCaseTypes: [CaseType.C100, CaseType.FL401],
        applicablePartyType: {
          C100: [PartyType.APPLICANT],
          FL401: [PartyType.APPLICANT],
        },
      },
    ],
    applicationFormUrl:
      'https://www.gov.uk/government/publications/ask-the-court-to-consider-an-allegation-of-contempt-of-court-form-fc600',
  },
  {
    applicationType: AWPApplicationType.N161,
    applicationReasons: [
      {
        reason: AWPApplicationReason.APPEAL_COURT_ORDER,
        applicableCaseTypes: [CaseType.C100, CaseType.FL401],
        applicablePartyType: {
          C100: [PartyType.APPLICANT, PartyType.RESPONDENT],
          FL401: [PartyType.APPLICANT],
        },
      },
    ],
    applicationFormUrl:
      'https://www.gov.uk/government/publications/form-n161-appellants-notice-all-appeals-except-small-claims-track-appeals-and-appeals-to-the-family-division-of-the-high-court',
  },
  {
    applicationType: AWPApplicationType.FL403,
    applicationReasons: [
      {
        reason: AWPApplicationReason.CHANGE_EXTEND_CANCEL_NON_MOLESTATION_OR_OCCUPATION_ORDER,
        applicableCaseTypes: [CaseType.FL401],
        applicablePartyType: {
          FL401: [PartyType.APPLICANT, PartyType.RESPONDENT],
        },
      },
    ],
    applicationFormUrl:
      'https://www.gov.uk/government/publications/form-fl403-application-to-vary-extend-or-discharge-an-order-in-existing-proceedings',
  },
  {
    applicationType: AWPApplicationType.FL407,
    applicationReasons: [
      {
        reason: AWPApplicationReason.REQUEST_FOR_ARREST_WARRENT,
        applicableCaseTypes: [CaseType.FL401],
        applicablePartyType: {
          FL401: [PartyType.APPLICANT],
        },
      },
    ],
    applicationFormUrl:
      'https://www.gov.uk/government/publications/form-fl407a-application-for-a-warrant-of-arrest-forced-marriage-protection-order',
  },
];

export const getApplicationDetails = (
  applicationType: AWPApplicationType,
  applicationReason: AWPApplicationReason,
  caseType: CaseType,
  partyType: PartyType,
  language: string,
  session: AppSession | undefined
): ApplicationDetails | undefined => {
  const awpDetails = session?.applicationSettings?.awpSelectedApplicationDetails;

  if (
    awpDetails?.language === language &&
    awpDetails?.applicationType === applicationType &&
    awpDetails?.applicationReason === applicationReason &&
    awpDetails?.applicationFeeAmount === session?.userCase?.awpFeeDetails?.feeAmount
  ) {
    return session?.applicationSettings?.awpSelectedApplicationDetails;
  }

  let appDetails;
  const application = applicationTypesConfiguration.find(config => config.applicationType === applicationType);

  if (application) {
    const reason = application.applicationReasons.find(reasons => reasons.reason === applicationReason);

    if (
      reason?.applicableCaseTypes?.includes(caseType) &&
      reason.applicablePartyType?.[caseType]?.includes(partyType)
    ) {
      appDetails = {
        applicationType: application.applicationType,
        applicationReason: reason.reason,
        reasonText: applicationReasonTranslation[language][reason.reason]['reasonText'],
        applicationFee: session?.userCase?.awpFeeDetails?.feeAmountText,
        applicationFeeAmount: session?.userCase?.awpFeeDetails?.feeAmount,
        applicationFormUrl: application.applicationFormUrl,
      };
    }
  }

  return appDetails;
};

export const isValidApplicationReason = (
  applicationType: AWPApplicationType,
  reason: AWPApplicationReason,
  caseType: CaseType,
  partyType: PartyType
): boolean => {
  const application = applicationTypesConfiguration.find(
    _application => _application.applicationType === applicationType
  );

  if (application) {
    const applicationReason = application.applicationReasons.find(appReason => appReason.reason === reason);

    if (
      applicationReason?.applicableCaseTypes.includes(caseType) &&
      applicationReason?.applicablePartyType?.[caseType]?.includes(partyType)
    ) {
      return true;
    }
  }

  return false;
};

export const getApplicationListUrl = (partyType: PartyType): string =>
  applyParms(APPLICATION_WITHIN_PROCEEDINGS_LIST_OF_APPLICATIONS, {
    partyType,
    pageNumber: '1',
  });

export const fetchAndSaveFeeCodeDetails = async (
  req: AppRequest,
  userDetails: UserDetails,
  applicationDetails: AWPFeeDetailsRequest
): Promise<string | object | undefined> => {
  return new Promise((resolve, reject) => {
    delete req.session.userCase.awpFeeDetails;

    const client = new CosApiClient(userDetails.accessToken, req.locals.logger);
    client
      .fetchAWPFeeCodeDetails(applicationDetails)
      .then(feeDetails => {
        if (feeDetails?.errorRetrievingResponse) {
          return req.session.save(() => {
            reject(feeDetails.errorRetrievingResponse);
          });
        }

        req.session.userCase.awpFeeDetails = {
          ...feeDetails,
          feeAmountText: `£${feeDetails.feeAmount}`,
        };
        req.session.save(resolve);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const resetAWPApplicationData = (req: AppRequest): void => {
  delete req.session?.applicationSettings?.awpSelectedApplicationDetails;
  delete req.session?.userCase?.awpFeeDetails;
  delete req.session?.userCase?.awp_need_hwf;
  delete req.session?.userCase?.awp_have_hwfReference;
  delete req.session?.userCase?.awp_hwf_referenceNumber;
  delete req.session?.userCase?.awp_completedForm;
  delete req.session?.userCase?.awp_agreementForRequest;
  delete req.session?.userCase?.awp_informOtherParties;
  delete req.session?.userCase?.awp_reasonCantBeInformed;
  delete req.session?.userCase?.awp_uploadedApplicationForms;
  delete req.session?.userCase?.awpFeeDetails;
  delete req.session?.userCase?.awp_cancelDelayHearing;
  delete req.session?.userCase?.awp_isThereReasonForUrgentRequest;
  delete req.session?.userCase?.awp_urgentRequestReason;
  delete req.session?.userCase?.awp_hasSupportingDocuments;
  delete req.session?.userCase?.awp_supportingDocuments;
};

const createAWPApplication = async (
  userDetails: UserDetails,
  caseData: CaseWithId,
  applicationType: AWPApplicationType,
  applicationReason: AWPApplicationReason,
  appRequest: AppRequest,
  appResponse: Response
): Promise<void> => {
  const partyType = getCasePartyType(caseData, userDetails.id);

  appRequest.session.paymentError = { hasError: false, errorContext: null };
  try {
    await new CosApiClient(userDetails.accessToken, appRequest.locals.logger).createAWPApplication(
      userDetails,
      caseData,
      applicationType,
      applicationReason,
      partyType,
      getPartyDetails(caseData, userDetails.id)
    );
    handlePageRedirection('success', partyType, applicationType, applicationReason, appRequest, appResponse);
  } catch (error) {
    appRequest.session.paymentError = { hasError: true, errorContext: PaymentErrorContext.APPLICATION_NOT_SUBMITTED };
    handlePageRedirection('error', partyType, applicationType, applicationReason, appRequest, appResponse);
  }
};

export const processAWPApplication = async (appRequest: AppRequest, appResponse: Response): Promise<void> => {
  const userDetails = appRequest.session.user;
  const caseData = appRequest.session.userCase;
  const applicationType =
    (appRequest.params.applicationType as AWPApplicationType) ?? appRequest.session.userCase.awp_applicationType;
  const applicationReason =
    (appRequest.params.applicationReason as AWPApplicationReason) ?? appRequest.session.userCase.awp_applicationReason;
  const partyType = getCasePartyType(caseData, userDetails.id);

  try {
    if (
      isFreeApplication(caseData) ||
      (caseData?.awp_hwf_referenceNumber && caseData.paymentData?.paymentServiceRequestReference)
    ) {
      return createAWPApplication(userDetails, caseData, applicationType, applicationReason, appRequest, appResponse);
    }

    const caseId = caseData?.id ?? caseData?.caseId;
    const paymentReference = caseData?.paymentData!.paymentReference;

    await PaymentController.getPaymentStatus(userDetails, caseId, paymentReference).then(
      async ({ response }) => {
        appRequest.session.userCase.paymentData = {
          ...appRequest.session.userCase.paymentData,
          ...response,
        } as PaymentResponse;

        createAWPApplication(userDetails, caseData, applicationType, applicationReason, appRequest, appResponse);
      },
      () => {
        appRequest.session.paymentError = { hasError: true, errorContext: PaymentErrorContext.PAYMENT_UNSUCCESSFUL };
        handlePageRedirection('error', partyType, applicationType, applicationReason, appRequest, appResponse);
      }
    );
  } catch (error) {
    appRequest.session.paymentError = { hasError: true, errorContext: PaymentErrorContext.DEFAULT_PAYMENT_ERROR };
    handlePageRedirection('error', partyType, applicationType, applicationReason, appRequest, appResponse);
  }
};

const handlePageRedirection = (
  errorType: string,
  partyType: PartyType,
  applicationType: AWPApplicationType,
  applicationReason: AWPApplicationReason,
  appRequest: AppRequest,
  appResponse: Response
) => {
  delete appRequest.session.userCase?.paymentData;
  delete appRequest.session.userCase?.awp_applicationType;
  delete appRequest.session.userCase?.awp_applicationReason;
  appRequest.session.save(() => {
    setTimeout(() => {
      appRequest.session.paymentError.hasError = false;
      appRequest.session.paymentError.errorContext = null;
      appRequest.session.save();
    }, 1000);
    appResponse.redirect(
      applyParms(
        errorType === 'success'
          ? APPLICATION_WITHIN_PROCEEDINGS_APPLICATION_SUBMITTED
          : APPLICATION_WITHIN_PROCEEDINGS_CHECK_YOUR_ANSWER,
        { partyType, applicationType, applicationReason }
      )
    );
  });
};

export const isFreeApplication = (caseData: Partial<CaseWithId>): boolean =>
  Number(_.get(caseData, 'awpFeeDetails.feeAmount', 0)) <= 0;
