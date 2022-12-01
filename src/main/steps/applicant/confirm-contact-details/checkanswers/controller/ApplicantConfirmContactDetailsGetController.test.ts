import { ApplicantConfirmContactDetailsGetController } from './ApplicantConfirmContactDetailsGetController';
jest.mock('autobind-decorator');
jest.mock('express');
jest.mock('../../../../../app/case/case');
jest.mock('../../../../../app/controller/AppRequest');
jest.mock('../../../../../steps/common/common.content');
jest.mock('../../../../../steps/common/confirm-contact-details/checkanswers/ConfirmContactDetailsGetController');

describe('ApplicantConfirmContactDetailsGetController', () => {
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
    controller = new ApplicantConfirmContactDetailsGetController('page', generateContent);
  });

  test('should extend ApplicantConfirmContactDetailsGetController', async () => {
    expect(controller).toBeInstanceOf(ApplicantConfirmContactDetailsGetController);
  });
});
