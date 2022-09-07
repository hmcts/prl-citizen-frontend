// import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
// import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
// import autobind from 'autobind-decorator';
// import { Response } from 'express';

// import { FieldPrefix } from '../../../../app/case/case';
// import { AppRequest } from '../../../../app/controller/AppRequest';
// import { CommonContent } from '../../../../steps/common/common.content';
// import ConfirmContactDetailsGetController from '../../../../steps/common/confirm-contact-details/checkanswers/ConfirmContactDetailsGetController';
import RespondentConfirmContactDetailsGetController from './RespondentConfirmContactDetailsGetController';
jest.mock('autobind-decorator');
jest.mock('express');
jest.mock('../../../../app/case/case');
jest.mock('../../../../app/controller/AppRequest');
jest.mock('../../../../steps/common/common.content');
jest.mock('../../../../steps/common/confirm-contact-details/checkanswers/ConfirmContactDetailsGetController');

describe('RespondentConfirmContactDetailsGetController', () => {
  let controller;

  beforeEach(() => {
    controller = new RespondentConfirmContactDetailsGetController();
  });

  test('should extend RespondentConfirmContactDetailsGetController', async () => {
    expect(controller).toBeInstanceOf(RespondentConfirmContactDetailsGetController);
  });
});
