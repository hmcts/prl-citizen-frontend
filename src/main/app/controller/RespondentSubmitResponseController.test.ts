import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
import { CA_RESPONDENT_RESPONSE_CONFIRMATION } from '../../steps/urls';
import { CosApiClient } from '../case/CosApiClient';

import { RespondentSubmitResponseController } from './RespondentSubmitResponseController';

describe('RespondentSubmitResponseController', () => {
  const controller = new RespondentSubmitResponseController();
  const req = mockRequest();
  const res = mockResponse();
  const submitRespondentResponseMock = jest.spyOn(CosApiClient.prototype, 'submitRespondentResponse');
  beforeEach(() => {
    submitRespondentResponseMock.mockResolvedValue(req.session.userCase);
  });
  afterEach(() => {
    submitRespondentResponseMock.mockClear();
  });
  test('Save', async () => {
    req.session.userCase.id = '12234567890';
    await controller.save(req, res);
    expect(res.redirect).toHaveBeenCalledWith(CA_RESPONDENT_RESPONSE_CONFIRMATION);
  });
});
