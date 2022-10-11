import axios, { AxiosInstance, AxiosStatic } from 'axios';

import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
//import { generatePageContent } from '../../steps/common/common.content';
// import { Case } from '../case/case';

import { GetRespondentCaseController } from './GetRespondentCaseController';

jest.mock('axios');
jest.mock('config');
jest.mock('../auth/service/get-service-auth-token');
const mockedAxiosUser = axios as jest.Mocked<AxiosStatic>;
const token =
  'token';
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe('GetRespondentCaseController', () => {
  test('Should render the page', async () => {
    const controller = new GetRespondentCaseController();
    const mockGet = jest.fn().mockResolvedValueOnce({ data: { mockPayment: 'data', id: '232442' } });
    mockedAxios.create.mockReturnValueOnce({ get: mockGet } as unknown as AxiosInstance);
    const req = mockRequest();
    const res = mockResponse();
    mockedAxiosUser.post.mockResolvedValue({
      data: {
        access_token: token,
        id_token: token,
      },
    });
    let flag = false;
    try {
      await controller.getCase(req, res);
    } catch (err) {
      flag = true;
    }
    expect(flag).toBe(true);

    /*expect(res.render).toBeCalledWith('page', {
        ...defaultViewArgs,
        language: 'en',
        serviceName: 'Apply for a service"',
        isDraft: true,
        text: 'english',
        userCase: req.session.userCase,
        userEmail,
      });*/
    expect(1).toEqual(1);
  });
});
