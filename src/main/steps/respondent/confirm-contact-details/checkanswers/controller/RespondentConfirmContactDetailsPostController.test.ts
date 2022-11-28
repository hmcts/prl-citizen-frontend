import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { ConfirmContactDetailsPostController } from '../../../../../steps/common/confirm-contact-details/checkanswers/ConfirmContactDetailsPostController';

import RespondentConfirmContactDetailsPostController from './RespondentConfirmContactDetailsPostController';
jest.mock('autobind-decorator');
jest.mock('express');
jest.mock('../../../../../app/case/case');
jest.mock('../../../../../app/controller/AppRequest');
jest.mock('../../../../../steps/common/common.content');
jest.mock('../../../../../steps/common/confirm-contact-details/checkanswers/ConfirmContactDetailsPostController');

describe('RespondentConfirmContactDetailsPostController', () => {
  let controller;
  let req;
  let res;
  beforeEach(() => {
    let fields;
    req = mockRequest({
      session: {
        userCase: {},
      },
    });
    res = mockResponse();
    controller = new RespondentConfirmContactDetailsPostController(fields);
  });

  test('should extend RespondentConfirmContactDetailsPostController', async () => {
    expect(controller).toBeInstanceOf(RespondentConfirmContactDetailsPostController);
  });

  test('should return 200', async () => {
    controller.post(req, res);
    expect(ConfirmContactDetailsPostController).toBeCalled;
  });
});
