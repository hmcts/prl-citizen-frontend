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

const token = 'eyJ0eXAiOiJKV1QiLCJraWQiOiJaNEJjalZnZnZ1NVpleEt6QkVFbE1TbTQzTHM9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJhYmR1bC5kYWltQGhtY3RzLm5ldCIsImN0cyI6Ik9BVVRIMl9TVEFURUxFU1NfR1JBTlQiLCJhdXRoX2xldmVsIjowLCJhdWRpdFRyYWNraW5nSWQiOiJjNTkyMDU2NC0wZWI3LTQyZTAtOGQ3MC01NWU5ZDI4ODE2MDItMjEyNjczNDQiLCJpc3MiOiJodHRwczovL2Zvcmdlcm9jay1hbS5zZXJ2aWNlLmNvcmUtY29tcHV0ZS1pZGFtLWRlbW8uaW50ZXJuYWw6ODQ0My9vcGVuYW0vb2F1dGgyL3JlYWxtcy9yb290L3JlYWxtcy9obWN0cyIsInRva2VuTmFtZSI6ImFjY2Vzc190b2tlbiIsInRva2VuX3R5cGUiOiJCZWFyZXIiLCJhdXRoR3JhbnRJZCI6ImlpOGU5OWZ0ejFnVlowWjVMdzNVQlo3bUlKayIsImF1ZCI6ImNtY19jaXRpemVuIiwibmJmIjoxNjYyNzE4MTcwLCJncmFudF90eXBlIjoiYXV0aG9yaXphdGlvbl9jb2RlIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIl0sImF1dGhfdGltZSI6MTY2MjcxODE2OSwicmVhbG0iOiIvaG1jdHMiLCJleHAiOjE2NjI3NDY5NzAsImlhdCI6MTY2MjcxODE3MCwiZXhwaXJlc19pbiI6Mjg4MDAsImp0aSI6Ii1pOWVkdURGNkt0cS0xUi04U3k1RzBibXlhayJ9.XYJu4a_ZHMdMBkApD3_wQO_zaKvMBDBjs5-SOI5cD6TdpzeXyTYcqqFr0it8ek2UHEDQkffFtYcd2HeP9rdfAx1mQ6LfnL6YEyBXo6w3TtYgk6NMdRHcHWF96_1ovXTg1oWm3sIYV_RKGxaSbXitTVq4ps9J2YL4ZiOBuR-nXeGM5jLvK0A1qvkqq3o7Ma6jZ4tDNjNgNvBzaWT3C_r1zEMOUofKMeWuZ5RuvwWeWAWx8aesc22adE2fOR6zDM_V5jagBGP1arAQXrIIuk3zc3d7f3d0UJ4nMiisL0YNVEwyXlL7oL5AncfqD789DWTcVuOqUYx8M-f1eGqZDQxH6g';

/* This class is used to create an instance of the axios library with the required headers for the
PaymentSystemAPI */
export class PaymentSystemAPIInstance {
  protected AxiosAJAXInstance: AxiosInstance;
  constructor(PaymentURL: string, userSystemAuthToken: string, serviceAuthToken: string) {
    userSystemAuthToken = token;
    this.AxiosAJAXInstance = axios.create({
      baseURL: PaymentURL,
      headers: {
        Authorization: `Bearer ${userSystemAuthToken}`,
        ServiceAuthorization: serviceAuthToken,
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
    userSystemAuthToken = token;
    this.AxiosAJAXInstance = axios.create({
      baseURL: PaymentURL,
      headers: {
        Authorization: `Bearer ${userSystemAuthToken}`,
        ServiceAuthorization: serviceAuthToken,
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
      const { payment_reference, date_created, external_reference, next_url, status }: PaymentRetrivalDataType =
        requestPaymentUpdate['data'];

      return {
        payment_reference,
        date_created,
        external_reference,
        next_url,
        status,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
