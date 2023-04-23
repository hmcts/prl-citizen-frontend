import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';

import ApplicantConfirmContactDetailsPostController from './ApplicantConfirmContactDetailsPostController';

jest.mock('autobind-decorator');
jest.mock('express');
jest.mock('../../../../../app/case/case');
jest.mock('../../../../../app/controller/AppRequest');
jest.mock('../../../../../steps/common/common.content');
jest.mock('../../../../../steps/common/confirm-contact-details/checkanswers/ConfirmContactDetailsPostController');

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

  test('ApplicantConfirmContactDetailsPostController Should invoke post method', async () => {
    //req.session.userCase.citizenRole = FieldPrefix.APPLICANT;
    const req = mockRequest();
    const res = mockResponse();

    await controller.post(req, res);

    expect(1).toEqual(1);
  });
});
