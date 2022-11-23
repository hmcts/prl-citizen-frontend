import axios, { AxiosInstance } from 'axios';

type PaymentRetrivalDataType = {
  payment_reference: string;
  date_created: string;
  external_reference: string;
  next_url: string;
  status: string;
  serviceRequestReference: string;
};

interface PaymentApi {
  getPaymentCredentails(): Promise<PaymentRetrivalDataType>;
}

//const token = 'INSERT_TOKEN_HERE';

/* This class is used to create an instance of the axios library with the required headers for the
PaymentSystemAPI */
export class PaymentSystemAPIInstance {
  protected AxiosAJAXInstance: AxiosInstance;
  constructor(PaymentURL: string, userSystemAuthToken: string, serviceAuthToken: string) {
    //userSystemAuthToken = token;
    this.AxiosAJAXInstance = axios.create({
      baseURL: PaymentURL,
      headers: {
        Authorization: `Bearer ${userSystemAuthToken}`,
        ServiceAuthorization: `Bearer ${serviceAuthToken}`,
      },
    });
  }
  Instance(): AxiosInstance {
    return this.AxiosAJAXInstance;
  }
}

/* This class is used to create an instance of the axios library with the required headers for the
PaymentSystemAPI */
export class CheckPaymentStatusApi {
  protected AxiosAJAXInstance: AxiosInstance;
  constructor(PaymentURL: string, userSystemAuthToken: string, serviceAuthToken: string) {
    //userSystemAuthToken = token;
    this.AxiosAJAXInstance = axios.create({
      baseURL: PaymentURL,
      headers: {
        Authorization: `Bearer ${userSystemAuthToken}`,
        ServiceAuthorization: `Bearer ${serviceAuthToken}`,
        'Content-Type': 'application/json',
      },
    });
  }
  PaymentStatusInstance(): AxiosInstance {
    return this.AxiosAJAXInstance;
  }
}

/* The PaymentTaskResolver class is a child class of the PaymentSystemAPIInstance class. It implements
the PaymentApi interface. It has a constructor that takes in the URL, userSystemAuthToken,
serviceAuthToken, and caseId. It also has a property called PaymentAjaxInstance that is set to the
instance of the PaymentSystemAPIInstance class. It also has a method called
RequestPaymentInformation that is async and returns a promise */
export class PaymentTaskResolver extends PaymentSystemAPIInstance implements PaymentApi {
  protected caseId: string;
  protected returnUrl: string;
  protected applicantCaseName: string;
  protected hwfRefNumber: string;

  constructor(
    PaymentURL: string,
    userSystemAuthToken: string,
    serviceAuthToken: string,
    caseId: string,
    returnUrl: string,
    applicantCaseName: string,
    hwfRefNumber: string
  ) {
    super(PaymentURL, userSystemAuthToken, serviceAuthToken);
    this.caseId = caseId;
    this.returnUrl = returnUrl;
    this.applicantCaseName = applicantCaseName;
    this.hwfRefNumber = hwfRefNumber;
  }

  async getPaymentCredentails(): Promise<PaymentRetrivalDataType> {
    const paymentDetailsRequestBody = {
      caseId: this.caseId,
      returnUrl: this.returnUrl,
      applicantCaseName: this.applicantCaseName,
      hwfRefNumber: this.hwfRefNumber,
    };
    try {
      const requestPaymentUpdate = await super.Instance().post('', paymentDetailsRequestBody);
      const {
        payment_reference,
        date_created,
        external_reference,
        next_url,
        serviceRequestReference,
      }: PaymentRetrivalDataType = requestPaymentUpdate['data'];

      return {
        payment_reference,
        date_created,
        external_reference,
        next_url,
        status,
        serviceRequestReference,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
