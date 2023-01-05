import config from 'config';

import { CheckPaymentStatusApi, PaymentSystemAPIInstance, PaymentTaskResolver } from './paymentApi';

const mockToken = 'Bearer authToken';
const mockServiceToken = 'Bearer serviceToken';

const paymentURL: string = config.get('services.cos.url');

/* Testing the CheckPaymentStatusApi class. */
describe('CheckPaymentStatusApi class testing', () => {
  test('Should be an Instance of Axios', async () => {
    const InstanceOfCheckPaymentStatusApi = new CheckPaymentStatusApi('', mockToken, mockServiceToken);
    expect(InstanceOfCheckPaymentStatusApi).toBeInstanceOf(CheckPaymentStatusApi);
  });
});

/* Testing the PaymentSystemAPIInstance class. */
describe('PaymentSystemAPIInstance class testing', () => {
  test('Should be an Instance of Axios', async () => {
    const InstanceOfPaymentSystemAPIInstance = new PaymentSystemAPIInstance('', mockToken, mockServiceToken);
    expect(InstanceOfPaymentSystemAPIInstance).toBeInstanceOf(PaymentSystemAPIInstance);
  });
});

/* A test case for the PaymentTaskResolver class. */
describe('PaymentTaskResolver class testing', () => {
  const dummyCaseID = '2122323';
  const dummyreturnUrl = 'http://localhost:3001/payment/reciever/callback';
  const applicantCaseName = 'Test';
  const hwfRefNumber = 'HWF-1234';
  test('Should be an Instance of Axios', async () => {
    const InstanceOfPaymentSystemAPIInstance = new PaymentTaskResolver(
      paymentURL,
      mockToken,
      mockServiceToken,
      dummyCaseID,
      dummyreturnUrl,
      applicantCaseName,
      hwfRefNumber
    );
    const fetchData = await InstanceOfPaymentSystemAPIInstance.getPaymentCredentails();
    //due to credential failure it must fail;
    expect(fetchData.next_url).toEqual(undefined);
    expect(fetchData.date_created).toEqual(undefined);
    expect(fetchData.external_reference).toEqual(undefined);
    expect(fetchData.payment_reference).toEqual(undefined);
    expect(fetchData.status).toEqual(undefined);
  });
});
