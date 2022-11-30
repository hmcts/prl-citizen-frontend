import axios from 'axios';

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
});
