import axios, { AxiosInstance } from 'axios';
import config from 'config';
import { Response } from 'express';
import type { LoggerInstance } from 'winston';

import { getTokenFromApi } from '../../app/auth/service/get-service-auth-token';
import { Case, CaseWithId } from '../../app/case/case';
import { AWPApplicationType, C100_CASE_EVENT, PartyType, PaymentErrorContext } from '../../app/case/definition';
import { AppRequest, UserDetails } from '../../app/controller/AppRequest';
import { applyParms } from '../../steps/common/url-parser';
import {
  C100_CHECK_YOUR_ANSWER,
  C100_CONFIRMATIONPAGE,
  CREATE_PAYMENT,
  GET_PAYMENT_STATUS,
  PAYMENT_BASE_URL,
} from '../../steps/urls';

import { CheckPaymentStatusApi, PaymentTaskResolver } from './paymentApi';
import { PaymentHelper } from './paymentHelper';

const SUCCESS = 'Success';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const PaymentHandler = async (req: AppRequest, res: Response) => {
  try {
    const paymentHelperTranspiler = await new PaymentHelper().SystemCredentailsToApiData(req);
    const { Authorization, ServiceAuthorization, returnUrL, caseId, applicantCaseName, hwfRefNumber, feeType } =
      paymentHelperTranspiler;
    const paymentApiEndpoint = config.get('services.cos.url');
    const createPaymentEndpoint = '/fees-and-payment-apis/create-payment';
    const baseURL = paymentApiEndpoint + createPaymentEndpoint;

    const paymentCreator = new PaymentTaskResolver(
      baseURL,
      Authorization,
      ServiceAuthorization,
      caseId,
      returnUrL,
      applicantCaseName as string,
      hwfRefNumber as string,
      feeType
    );
    const response = await paymentCreator.getPaymentCredentails();

    req.session.userCase.paymentDetails = response;
    //if previous payment is success then invoke submit case else redirect gov.uk
    //if help with fees opted then submit case & redirect to confirmation page
    if (hwfRefNumber && response?.serviceRequestReference) {
      //help with fess, submit case without payment
      submitCase(
        req,
        res,
        req.session.userCase!.caseId!,
        req.session.userCase,
        req.originalUrl,
        C100_CASE_EVENT.CASE_SUBMIT_WITH_HWF
      );
    } else if (response?.serviceRequestReference && response?.payment_reference && response?.status === SUCCESS) {
      //previous payment is success, retry submit case with 'citizen-case-submit' & reidrect confirmation page
      submitCase(
        req,
        res,
        req.session.userCase!.caseId!,
        req.session.userCase,
        req.originalUrl,
        C100_CASE_EVENT.CASE_SUBMIT
      );
    } else if (response['next_url']) {
      //redirect to gov pay for making payment
      res.redirect(response['next_url']);
    } else {
      //redirect to check your answers with error
      populateError(
        req,
        res,
        'Error in create service request/payment reference',
        PaymentErrorContext.DEFAULT_PAYMENT_ERROR
      );
    }
  } catch (e) {
    req.locals.logger.error(e);
    populateError(
      req,
      res,
      'Error in create service request/payment reference',
      PaymentErrorContext.DEFAULT_PAYMENT_ERROR
    );
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const PaymentValidationHandler = async (req: AppRequest, res: Response) => {
  if (!req.params.hasOwnProperty('status') && !req.params.hasOwnProperty('paymentId')) {
    res.status(500);
  } else {
    try {
      const { caseId } = req.session.userCase;
      const PaymentURL =
        config.get('services.cos.url') +
        `/fees-and-payment-apis/retrievePaymentStatus/${req.session.userCase?.paymentDetails?.['payment_reference']}/${caseId}`;
      const paymentHelperTranspiler = await new PaymentHelper().SystemCredentailsToApiData(req);
      const { Authorization, ServiceAuthorization } = paymentHelperTranspiler;
      const checkPayment = await new CheckPaymentStatusApi(PaymentURL, Authorization, ServiceAuthorization)
        .PaymentStatusInstance()
        .get('');
      const paymentStatus = checkPayment['data']['status'];
      if (paymentStatus && paymentStatus === SUCCESS) {
        req.session.userCase.paymentSuccessDetails = checkPayment['data'];
        //Invoke update case with 'citizen-case-submit' event & reidrect confirmation page
        submitCase(
          req,
          res,
          req.session.userCase!.caseId!,
          req.session.userCase,
          req.originalUrl,
          C100_CASE_EVENT.CASE_SUBMIT
        );
      } else {
        populateError(req, res, 'Error in retreive payment status', PaymentErrorContext.PAYMENT_UNSUCCESSFUL);
      }
    } catch (error) {
      req.locals.logger.error(error);
      populateError(req, res, 'Error in retreive payment status', PaymentErrorContext.PAYMENT_UNSUCCESSFUL);
    }
  }
};

export async function submitCase(
  req: AppRequest,
  res: Response,
  caseId: string,
  caseData: Partial<Case>,
  returnUrl: string,
  caseEvent: C100_CASE_EVENT
): Promise<void> {
  try {
    req.session.paymentError = { hasError: false, errorContext: null };
    const updatedCase = await req.locals.C100Api.submitC100Case(caseId, caseData, returnUrl, caseEvent);
    //update final document in session for download on confirmation
    req.session.userCase.finalDocument = updatedCase.data?.draftOrderDoc;
    //save & redirect to confirmation page
    req.session.save(() => {
      res.redirect(C100_CONFIRMATIONPAGE);
    });
  } catch (e) {
    req.locals.logger.error(e);
    populateError(req, res, 'Error in submit case', PaymentErrorContext.APPLICATION_NOT_SUBMITTED);
  }
}

const populateError = (req: AppRequest, res: Response, errorMsg: string, errorContext: PaymentErrorContext) => {
  req.locals.logger.error(errorMsg);
  req.session.paymentError = { hasError: true, errorContext };
  req.session.save(() => {
    res.redirect(C100_CHECK_YOUR_ANSWER);
  });
};
interface PaymentData {
  caseId: string;
  returnUrl: string;
  applicantCaseName: string;
  hwfRefNumber?: string;
  feeType: string;
  awpType?: AWPApplicationType;
  partyType?: PartyType;
}

export interface PaymentResponse {
  paymentReference: string;
  paymentDate: string;
  externalReference: string;
  nextActionUrl: string;
  paymentStatus: string;
  paymentServiceRequestReference: string;
}

interface TransformedPaymentResponse {
  context: string;
  response?: Partial<PaymentResponse>;
  redirectUrl?: string;
  error?: string;
}

interface PaymentStatusResponse {
  status: string;
  response?: Partial<PaymentResponse>;
  error?: string;
}

export class PaymentController {
  constructor(private readonly client: AxiosInstance, private readonly logger: LoggerInstance) {}

  static async getPaymentStatus(
    userDetails: UserDetails,
    caseId: CaseWithId['id'],
    paymentReference: string
  ): Promise<PaymentStatusResponse> {
    try {
      const serviceAuthToken = await getTokenFromApi();
      const response = await axios.get(
        applyParms(`${config.get('services.cos.url')}${GET_PAYMENT_STATUS}`, { paymentReference, caseId }),
        {
          headers: {
            Authorization: `Bearer ${userDetails.accessToken}`,
            ServiceAuthorization: `Bearer ${serviceAuthToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data?.status === 'Success') {
        return Promise.resolve({
          status: 'success',
          response: response.data,
        });
      }

      return Promise.reject({
        status: response.data.status,
        response: response.data,
      });
    } catch (error) {
      return Promise.reject({
        status: 'failed',
        error,
      });
    }
  }

  private async invokeCreatePaymentAPI(paymentRequest: PaymentData): Promise<PaymentResponse | void> {
    try {
      const response = await this.client.post(CREATE_PAYMENT, paymentRequest);

      return {
        paymentReference: response.data.payment_reference,
        paymentDate: response.data.date_created,
        externalReference: response.data.external_reference,
        nextActionUrl: response.data.next_url,
        paymentStatus: response.data.status,
        paymentServiceRequestReference: response.data.serviceRequestReference,
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  public async initiatePayment(paymentData: PaymentData): Promise<TransformedPaymentResponse> {
    try {
      const response = await this.invokeCreatePaymentAPI(paymentData);

      if (paymentData.hwfRefNumber && response?.paymentServiceRequestReference) {
        return Promise.resolve({
          context: 'PAYMENT_SUCCESS_HWF',
          response,
        });
      }

      if (
        response?.paymentStatus === 'Success' &&
        response?.paymentServiceRequestReference &&
        response?.paymentReference
      ) {
        return Promise.resolve({
          context: 'PAYMENT_SUCCESS',
          response,
        });
      }

      if (response?.nextActionUrl) {
        return Promise.resolve({
          context: 'PAYMENT_REDIRECT',
          response,
          redirectUrl: response?.nextActionUrl,
        });
      }

      return Promise.reject({
        context: 'CREATE_PAYMENT',
        error: '',
      });
    } catch (error) {
      this.logger.error(error);
      return Promise.reject({
        context: 'CREATE_PAYMENT',
        error,
      });
    }
  }
}

export const PaymentAPI = async (accessToken: string, logger: LoggerInstance): Promise<PaymentController> => {
  try {
    const serviceAuthToken = await getTokenFromApi();
    return new PaymentController(
      axios.create({
        baseURL: `${config.get('services.cos.url')}${PAYMENT_BASE_URL}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          ServiceAuthorization: `Bearer ${serviceAuthToken}`,
        },
      }),
      logger
    );
  } catch (error) {
    logger.error(error);
    throw error;
  }
};
