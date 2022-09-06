import axios, { AxiosInstance } from 'axios';

type PaymentRetrivalDataType = {
  payment_reference: string;
  date_created: string;
  external_reference: string;
  next_url: string;
  status: string;
};

interface PaymentApi {
  getPaymentCredentails(): Promise<PaymentRetrivalDataType>;
}

/* This class is used to create an instance of the axios library with the required headers for the
PaymentSystemAPI */
class PaymentSystemAPIInstance {
  protected AxiosAJAXInstance: AxiosInstance;
  constructor(PaymentURL: string, userSystemAuthToken: string, serviceAuthToken: string) {
    this.AxiosAJAXInstance = axios.create({
      url: PaymentURL,
      headers: {
        Authorization: userSystemAuthToken,
        ServiceAuthorization: serviceAuthToken,
      },
    });
  }
  Instance(): AxiosInstance {
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

  constructor(
    PaymentURL: string,
    userSystemAuthToken: string,
    serviceAuthToken: string,
    caseId: string,
    returnUrl: string,
    applicantCaseName: string
  ) {
    super(PaymentURL, userSystemAuthToken, serviceAuthToken);
    this.caseId = caseId;
    this.returnUrl = returnUrl;
    this.applicantCaseName = applicantCaseName;
  }

  async getPaymentCredentails(): Promise<PaymentRetrivalDataType> {
    const paymentDetailsRequestBody = {
      caseId: this.caseId,
      returnUrl: this.returnUrl,
      applicantCaseName: this.applicantCaseName,
    };
    try {
      const requestPaymentUpdate = await super.Instance().post('', paymentDetailsRequestBody);
      console.log(requestPaymentUpdate);
      return {
        ...requestPaymentUpdate['data'],
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
