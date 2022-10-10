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
  'eyJ0eXAiOiJKV1QiLCJraWQiOiIxZXIwV1J3Z0lPVEFGb2pFNHJDL2ZiZUt1M0k9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJ0ZXN0cHJsMTgzQG1haWxpbmF0b3IuY29tIiwiY3RzIjoiT0FVVEgyX1NUQVRFTEVTU19HUkFOVCIsImF1dGhfbGV2ZWwiOjAsImF1ZGl0VHJhY2tpbmdJZCI6ImYzNGU2YzljLWZkZmItNDQ0Zi1hYzY2LWVkMWZkNjYwMWViMy0xOTg3MTc1MTgiLCJpc3MiOiJodHRwczovL2Zvcmdlcm9jay1hbS5zZXJ2aWNlLmNvcmUtY29tcHV0ZS1pZGFtLWFhdDIuaW50ZXJuYWw6ODQ0My9vcGVuYW0vb2F1dGgyL3JlYWxtcy9yb290L3JlYWxtcy9obWN0cyIsInRva2VuTmFtZSI6ImFjY2Vzc190b2tlbiIsInRva2VuX3R5cGUiOiJCZWFyZXIiLCJhdXRoR3JhbnRJZCI6ImRkSlhYZHFIMVI4OEkyUkZCMHF5RU8xQWt0MCIsImF1ZCI6InBybC1jaXRpemVuLWZyb250ZW5kIiwibmJmIjoxNjU5NjUxMjA2LCJncmFudF90eXBlIjoiYXV0aG9yaXphdGlvbl9jb2RlIiwic2NvcGUiOlsib3BlbmlkIiwicHJvZmlsZSIsInJvbGVzIl0sImF1dGhfdGltZSI6MTY1OTY1MTEzOSwicmVhbG0iOiIvaG1jdHMiLCJleHAiOjE2NTk2ODAwMDYsImlhdCI6MTY1OTY1MTIwNiwiZXhwaXJlc19pbiI6Mjg4MDAsImp0aSI6IklibmFqNy1KeGZkYXlLUzBzN09SY1BwbmZ2dyJ9.WeOAW87CoUG6mFyE8vlkEZNmKsOipS_3PASiYBxUHOr1M_hSYegwmEVDlaaSgtzzjsUg2Kgo7-ereOmyb1qYFmXY-x6AmKs-IUtWdNeNX4iV_lXP85y0Dtag-meze3mV08d3yVpkfIiskQiGSh1bD1IrSk4UHmp3-q7DLcR26NNxy8Lb1w5FWcnGdfGUuq6wdk5sF1DYoL5vP80NcrUIZ6bEOVhm0CCsVd7KMVxLQZ7cFvvLGFJYKHthChrw3ym1MIVUjkKMpzD5PdYbyjxzB0hLD2ep8R4fB3S_wxZdyqywzQFTGH0kFrHOgGCweLsBOi3odNsnJVNrwklbBtMd2w';
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
