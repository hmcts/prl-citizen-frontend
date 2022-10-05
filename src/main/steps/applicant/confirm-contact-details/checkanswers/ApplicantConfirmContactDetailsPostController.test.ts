// import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
// import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
// import autobind from 'autobind-decorator';
// import { Response } from 'express';

// import { FieldPrefix } from '../../../../app/case/case';
// import { AppRequest } from '../../../../app/controller/AppRequest';
// import { CommonContent } from '../../../../steps/common/common.content';
// import ConfirmContactDetailsPostController from '../../../../steps/common/confirm-contact-details/checkanswers/ConfirmContactDetailsPostController';
import ApplicantConfirmContactDetailsPostController from './ApplicantConfirmContactDetailsPostController';
jest.mock('autobind-decorator');
jest.mock('express');
jest.mock('../../../../app/case/case');
jest.mock('../../../../app/controller/AppRequest');
jest.mock('../../../../steps/common/common.content');
jest.mock('../../../../steps/common/confirm-contact-details/checkanswers/ConfirmContactDetailsPostController');

describe('ApplicantConfirmContactDetailsPostController', () => {
  let controller;

  beforeEach(() => {
    let fields;
    //const userEmail = 'test@example.com';
    controller = new ApplicantConfirmContactDetailsPostController(fields);
  });

  test('should extend ApplicantConfirmContactDetailsPostController', async () => {
    expect(controller).toBeInstanceOf(ApplicantConfirmContactDetailsPostController);
  });
});
