import { Response } from 'express';

import { State } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { CommonContent } from '../common.content';

import { generateContent } from './content';

import { SignedOutGetController, SignedOutPostController } from './index';

jest.mock('./../breadcrumb/BreadcrumbController', () => ({
  add: jest.fn(),
  get: jest.fn(() => []),
}));

describe('Signed Out Controllers', () => {
  let req: Partial<AppRequest>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      query: {},
      session: {
        id: '123',
        cookie: {} as never,
        regenerate: jest.fn(),
        destroy: jest.fn(),
        reload: jest.fn(),
        resetMaxAge: jest.fn(),
        save: jest.fn(),
        touch: jest.fn(),
        userCase: { id: '123', state: State.Applicant2Approved },
        user: { accessToken: 'token', email: 'test@example.com', givenName: 'John', familyName: 'Doe', id: 'id123' },
        enableC100CaseProgressionTrainTrack: false,
        enableCaseTrainTrack: false,
        testingSupport: false,
        paymentError: {} as never,
        userCaseList: [],
        eligibility: {} as never,
        lang: 'en',
        errors: undefined,
        addresses: [],
        accessCodeLoginIn: true,
        c100RebuildLdFlag: false,
      },
      originalUrl: '/some-url',
    };

    res = {
      locals: {},
      headersSent: false,
      render: jest.fn(),
      redirect: jest.fn(),
      status: jest.fn().mockReturnThis(), // if controller calls res.status().render()
    };
  });
  describe('SignedOutGetController', () => {
    it('should call render with the correct template and content', async () => {
      const content = { language: 'en' } as CommonContent;
      const controller = new SignedOutGetController();

      // Call the get method
      await controller.get(req as AppRequest, res as Response);

      // Expect res.render to be called with template and content
      expect(res.render).toHaveBeenCalledWith(
        expect.stringContaining('template'), // template path
        expect.objectContaining({ ...generateContent(content) }) // content
      );
    });
  });

  describe('SignedOutPostController', () => {
    it('should redirect to /receiver after post', async () => {
      const controller = new SignedOutPostController();

      // Call the post method
      await controller.post(req as AppRequest, res as Response);

      // Expect redirect to have been called
      expect(res.redirect).toHaveBeenCalledWith('/receiver');
    });
  });
});
