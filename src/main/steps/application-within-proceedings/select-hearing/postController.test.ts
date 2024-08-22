import axios from 'axios';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import * as steps from '../../../steps';

import SelectHearingPostController from './postController';

const getNextStepUrlMock = jest.spyOn(steps, 'getNextStepUrl');

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

describe('Document upload controller', () => {
  let req = mockRequest({
    body: {
      onlycontinue: 'true',
    },
    params: {
      applicationType: 'C2',
      applicationReason: 'delay-or-cancel-hearing-date',
      childId: '1234',
    },
    session: {
      userCase: {
        hearingCollection: [
          {
            hearingType: 'ABA5-FOF',
            hearingTypeValue: 'Finding of Fact',
            nextHearingDate: '2023-07-13T10:55:47.329703',
            urgentFlag: true,
          },
        ],
      },
    },
  });

  afterEach(() => {
    getNextStepUrlMock.mockClear();
  });

  test('Should redirect correctly if onlycontinue selected', async () => {
    const mockForm = {
      fields: {
        field: {
          type: 'file',
        },
      },
      submit: {
        text: l => l.continue,
      },
    };
    const controller = new SelectHearingPostController(mockForm.fields);

    const res = mockResponse();
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalledWith('/dashboard');
  });

  test('Should not call redirect if no onlycontinue', async () => {
    const mockForm = {
      fields: {
        field: {
          type: 'file',
        },
      },
      submit: {
        text: l => l.continue,
      },
    };
    req.body.onlycontinue = undefined;
    const controller = new SelectHearingPostController(mockForm.fields);

    const res = mockResponse();
    await controller.post(req, res);

    expect(res.redirect).not.toHaveBeenCalled();
  });

  describe('when there is an error in saving session', () => {
    test('should throw an error', async () => {
      const controller = new SelectHearingPostController({});
      const res = mockResponse();
      req = mockRequest({
        params: {
          applicationType: 'C2',
          applicationReason: 'delay-or-cancel-hearing-date',
        },
        session: {
          user: { email: 'test@example.com' },
          userCase: {
            hearingCollection: [
              {
                hearingType: '',
                hearingTypeValue: '',
                nextHearingDate: '',
                urgentFlag: null,
              },
            ],
          },
          save: jest.fn(done => done('MOCK_ERROR')),
        },
      });

      try {
        await controller.post(req, res);
      } catch (err) {
        //eslint-disable-next-line jest/no-conditional-expect
        expect(err).toBe('MOCK_ERROR');
      }
    });
  });
});
