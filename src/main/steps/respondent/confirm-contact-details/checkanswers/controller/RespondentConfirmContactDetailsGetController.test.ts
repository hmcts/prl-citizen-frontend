import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import ConfirmContactDetailsGetController from '../ConfirmContactDetailsGetController';

import { RespondentConfirmContactDetailsGetController } from './RespondentConfirmContactDetailsGetController';
jest.mock('autobind-decorator');
jest.mock('express');
jest.mock('../../../../../app/case/case');
jest.mock('../../../../../app/controller/AppRequest');
jest.mock('../../../../../steps/common/common.content');
jest.mock('../../../../../steps/common/confirm-contact-details/checkanswers/ConfirmContactDetailsGetController');

describe('RespondentConfirmContactDetailsGetController', () => {
  let controller;
  let req;
  let res;
  beforeEach(() => {
    const languages = {
      en: {
        text: 'english',
      },
      cy: {
        text: 'welsh',
      },
    };
    //const userEmail = 'test@example.com';
    req = mockRequest({
      session: {
        userCase: {},
      },
    });
    res = mockResponse();
    const generateContent = content => languages[content.language];
    controller = new RespondentConfirmContactDetailsGetController('page', generateContent);
  });

  test('should extend RespondentConfirmContactDetailsGetController', async () => {
    expect(controller).toBeInstanceOf(RespondentConfirmContactDetailsGetController);
  });

  test('should return 200', async () => {
    controller.get(req, res);
    expect(ConfirmContactDetailsGetController).toBeCalled;
  });
});
