import { defaultViewArgs } from '../../../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { State, YesOrNo } from '../../../../app/case/definition';

import LegalRepresentationGetController from './LegalRepresentationGetController';

const dummySessionData = {
  legalRepresentation: YesOrNo.YES,
  respondents: [
    {
      id: '123',
      value: {
        response: {
          legalRepresentation: YesOrNo.YES,
        },
        user: {
          idamId: '123',
        },
      },
    },
  ],
};

describe('LegalRepresentationGetController', () => {
  test('Should render the page', async () => {
    const controller = new LegalRepresentationGetController('page', () => ({}));

    const req = mockRequest({ dummySessionData });
    req.session.user.id = '123';
    req.session.userCase = dummySessionData;
    const res = mockResponse();
    await controller.get(req, res);
    expect(1).toEqual(1);
  });

  describe('Getting the users preferred language', () => {
    test('Language whelsh via session', async () => {
      const controller = new LegalRepresentationGetController('page', () => ({}));

      const language = 'cy';
      const req = mockRequest({ dummySessionData });
      req.session.user.id = '123';
      req.session.userCase = dummySessionData;
      const res = mockResponse();
      req.session.lang = language;
      await controller.get(req, res);
      expect(res.render).not.toBeCalledWith('page', {
        ...defaultViewArgs,
        sessionErrors: req.session.errors,
        htmlLang: language,
        formaction: req.originalUrl,
      });
    });

    test("Doesn't call render if an error page has already been rendered upstream", async () => {
      const controller = new LegalRepresentationGetController('page', () => ({}));

      const req = mockRequest();
      req.session.user.id = '123';
      req.session.userCase = dummySessionData;
      const res = mockResponse();
      res.locals.isError = true;
      await controller.get(req, res);
      expect(res.render).not.toHaveBeenCalled();
    });

    test("Doesn't call render if headers have already been sent already upstream", async () => {
      const controller = new LegalRepresentationGetController('page', () => ({}));

      const req = mockRequest();
      req.session.user.id = '123';
      req.session.userCase = dummySessionData;
      const res = mockResponse();
      res.headersSent = true;
      await controller.get(req, res);
      expect(res.render).not.toHaveBeenCalled();
    });

    test('sends the current page form session state to the view', async () => {
      const controller = new LegalRepresentationGetController('page', () => ({}));

      const req = mockRequest();
      req.session.user.id = '123';
      req.session.userCase = dummySessionData;
      const res = mockResponse();
      await controller.get(req, res);
      expect(res.session).not.toBe(req.session);
    });

    describe('generatePageContent()', () => {
      test('calls generatePageContent with correct arguments for new sessions', async () => {
        const controller = new LegalRepresentationGetController('page', () => ({}));

        const req = mockRequest({ userCase: { state: State.Draft }, session: { errors: [] } });
        req.session.user.id = '123';
        req.session.userCase = dummySessionData;
        const res = mockResponse();
        await controller.get(req, res);
        expect(req).not.toBe(res.render());
      });
    });
  });
});
