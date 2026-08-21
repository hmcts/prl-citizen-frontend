import axios from 'axios';
import config from 'config';

import { CheckPaymentStatusApi, PaymentSystemAPIInstance, PaymentTaskResolver } from './paymentApi';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockPost = jest.fn();
const mockToken = 'Bearer authToken';
const mockServiceToken = 'Bearer serviceToken';

const paymentURL: string = config.get('services.cos.url');

beforeEach(() => {
  mockPost.mockReset();
  mockedAxios.create.mockReturnValue({ post: mockPost } as never);
});

/* Testing the CheckPaymentStatusApi class. */
describe('CheckPaymentStatusApi class testing', () => {
  test('Should be an Instance of Axios', async () => {
    const InstanceOfCheckPaymentStatusApi = new CheckPaymentStatusApi('', mockToken, mockServiceToken);
    // const checkPayment = await new CheckPaymentStatusApi('', mockToken, mockServiceToken)
    //     .PaymentStatusInstance()
    //     .get('');
    // const paymentStatus = checkPayment['data']['status'];
    expect(InstanceOfCheckPaymentStatusApi).toBeInstanceOf(CheckPaymentStatusApi);

    const InstanceOfCheckPaymentStatusApi2 = jest.spyOn(
      new CheckPaymentStatusApi('', mockToken, mockServiceToken),
      'PaymentStatusInstance'
    );
    expect(InstanceOfCheckPaymentStatusApi2).toHaveBeenCalledTimes(0);
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
  const hwfRefNumber = 'HWF-1234';
  const feeType = 'C100_SUBMISSION_FEE';
  test('Should be an Instance of Axios', async () => {
    mockPost.mockRejectedValue({ status: 405 });

    const InstanceOfPaymentSystemAPIInstance = new PaymentTaskResolver(
      paymentURL,
      mockToken,
      mockServiceToken,
      dummyCaseID,
      dummyreturnUrl,
      hwfRefNumber,
      feeType
    );
    const fetchData = await InstanceOfPaymentSystemAPIInstance.getPaymentCredentails();
    //due to credential failure it must fail;
    expect(fetchData.next_url).toEqual(undefined);
    expect(fetchData.date_created).toEqual(undefined);
    expect(fetchData.external_reference).toEqual(undefined);
    expect(fetchData.payment_reference).toEqual(undefined);
    expect(fetchData.status).toEqual(405);
    expect(fetchData.serviceRequestReference).toEqual(undefined);
  });
});
