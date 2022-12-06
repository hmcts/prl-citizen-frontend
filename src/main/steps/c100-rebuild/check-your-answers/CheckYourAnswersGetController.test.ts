import axios from 'axios';

import { checkYourAnswerFlow1 } from '../../../../test/unit/mocks/mocked-requests/check-your-answer-flow-1-mock';
import { checkYourAnswerFlow2 } from '../../../../test/unit/mocks/mocked-requests/check-your-answer-flow-2-mock';
import { checkYourAnswerFlow3 } from '../../../../test/unit/mocks/mocked-requests/check-your-answer-flow-3-mock';
import { checkYourAnswerFlow4 } from '../../../../test/unit/mocks/mocked-requests/check-your-answer-flow-4-mock';
import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CaseApi } from '../../../app/case/C100CaseApi';
import { FieldPrefix } from '../../../app/case/case';

import CheckYourAnswersGetController from './CheckYourAnswersGetController';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);
const req = mockRequest();
const res = mockResponse();

const updateCaserMock = jest.spyOn(CaseApi.prototype, 'updateCase');

describe('DocumentUpload Get Controller', () => {
  const controller = new CheckYourAnswersGetController('page', () => ({}), FieldPrefix.APPLICANT);
  beforeEach(() => {
    jest.clearAllMocks;
    updateCaserMock.mockResolvedValue(req.session.userCase);
  });

  afterEach(() => {
    updateCaserMock.mockClear();
    jest.clearAllMocks;
  });

  test('Should update the before loading Check your answers screen', async () => {
    req.session.userCase.caseId = '1111';
    await controller.get(req, res);

    expect(req.session.userCase.caseId).toEqual('1111');
  });

  test('checkYourAnswerFlow1', async () => {
    const reqs = checkYourAnswerFlow1;
    await controller.get(reqs, res);
    expect(reqs.session.userCase).toEqual(checkYourAnswerFlow1.session.userCase);

    expect(reqs.originalUrl).toEqual('/request');
  });

  test('checkYourAnswerFlow2', async () => {
    const reqs = checkYourAnswerFlow2;

    await controller.get(reqs, res);
    expect(reqs.session.userCase).toEqual(checkYourAnswerFlow2.session.userCase);
    expect(reqs.originalUrl).toEqual('/request');
  });

  test('checkYourAnswerFlow3 Should update the before loading Check your answers screen', async () => {
    const reqs = checkYourAnswerFlow3;
    await controller.get(reqs, res);
    expect(reqs.session.userCase).toEqual(checkYourAnswerFlow3.session.userCase);
    expect(reqs.originalUrl).toEqual('/request');
  });

  test('checkYourAnswerFlow4 Should update the before loading Check your answers screen', async () => {
    const reqs = checkYourAnswerFlow4;
    await controller.get(reqs, res);
    expect(reqs.session.userCase).toEqual(checkYourAnswerFlow4.session.userCase);
    expect(reqs.originalUrl).toEqual('/request');
  });
});
