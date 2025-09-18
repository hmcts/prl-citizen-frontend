// import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
// import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
// import autobind from 'autobind-decorator';
// import { Response } from 'express';

// import { FieldPrefix } from '../../../../app/case/case';
// import { AppRequest } from '../../../../app/controller/AppRequest';
// import { CommonContent } from '../../../../steps/common/common.content';
// import ConfirmContactDetailsGetController from '../../../../steps/common/confirm-contact-details/checkanswers/ConfirmContactDetailsGetController';
import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import * as commonContent from '../../../../steps/common/common.content';

import ConfirmContactDetailsGetController from './ConfirmContactDetailsGetController';
jest.mock('autobind-decorator');
jest.mock('express');
jest.mock('../../../../app/case/case');
jest.mock('../../../../app/controller/AppRequest');
jest.mock('../../../../steps/common/common.content');
jest.mock('../../../../steps/common/confirm-contact-details/checkanswers/ConfirmContactDetailsGetController');

describe('ConfirmContactDetailsGetController', () => {
  let controller;

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

    const generateContent = content => languages[content.language];
    controller = new ConfirmContactDetailsGetController('page', generateContent);
  });

  test('should extend ConfirmContactDetailsGetController', async () => {
    expect(controller).toBeInstanceOf(ConfirmContactDetailsGetController);
  });
  test('should', async () => {
    const req = mockRequest({ session: { userCase: { email: 'test@example.com' } } });
    const res = mockResponse();
    jest
      .spyOn(commonContent, 'generatePageContent')
      .mockReturnValueOnce({ breadcrumbs: [{ id: 'home', href: '/test' }] });
    await controller.get(req, res);
    expect(res.redirect).toHaveBeenCalled;
  });
});
