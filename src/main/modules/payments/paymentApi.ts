import axios, { AxiosInstance } from 'axios';

type PaymentRetrivalDataType = {
  payment_reference: string;
  date_created: string;
  external_reference: string;
  next_url: string;
  status: string;
};

interface PaymentApi {
  RequestPaymentInformation(): Promise<void>;
  getPaymentCredentails(): Promise<PaymentRetrivalDataType>;
}

/* This class is used to create an instance of the axios library with the required headers for the
PaymentSystemAPI */
class PaymentSystemAPIInstance {
  protected AxiosInstance;
  constructor(URL: string, userSystemAuthToken: string, serviceAuthToken: string, caseId: string) {
    this.AxiosInstance = axios.create({
      url: URL,
      headers: {
        userSystemAuthToken,
        serviceAuthToken,
        caseId,
      },
    });
  }
  Instance(): AxiosInstance {
    return this.AxiosInstance();
  }
}

/* The PaymentTaskResolver class is a child class of the PaymentSystemAPIInstance class. It implements
the PaymentApi interface. It has a constructor that takes in the URL, userSystemAuthToken,
serviceAuthToken, and caseId. It also has a property called PaymentAjaxInstance that is set to the
instance of the PaymentSystemAPIInstance class. It also has a method called
RequestPaymentInformation that is async and returns a promise */
export class PaymentTaskResolver extends PaymentSystemAPIInstance implements PaymentApi {
  protected PaymentAjaxInstance;

  constructor(URL: string, userSystemAuthToken: string, serviceAuthToken: string, caseId: string) {
    super(URL, userSystemAuthToken, serviceAuthToken, caseId);
    this.PaymentAjaxInstance = super.Instance();
  }
  async RequestPaymentInformation(): Promise<void> {}

  async getPaymentCredentails(): Promise<PaymentRetrivalDataType> {
    return {
      payment_reference: 'string',
      date_created: 'string',
      external_reference: 'string',
      next_url: 'string',
      status: 'string',
    };
  }
}
