import RespondentConfirmContactDetailsPostController from './RespondentConfirmContactDetailsPostController';
jest.mock('autobind-decorator');
jest.mock('express');
jest.mock('../../../../../app/case/case');
jest.mock('../../../../../app/controller/AppRequest');
jest.mock('../../../../../steps/common/common.content');
jest.mock('../../../../../steps/common/confirm-contact-details/checkanswers/ConfirmContactDetailsPostController');

describe('RespondentConfirmContactDetailsPostController', () => {
  let controller;

  beforeEach(() => {
    let fields;
    //const userEmail = 'test@example.com';
    controller = new RespondentConfirmContactDetailsPostController(fields);
  });

  test('should extend RespondentConfirmContactDetailsPostController', async () => {
    expect(controller).toBeInstanceOf(RespondentConfirmContactDetailsPostController);
  });
});
