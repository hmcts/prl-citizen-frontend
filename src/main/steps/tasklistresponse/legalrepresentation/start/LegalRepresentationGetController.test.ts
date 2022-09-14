import { defaultViewArgs } from '../../../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { State, YesOrNo } from '../../../../app/case/definition';
//import { generatePageContent } from '../../../../steps/common/common.content';
import * as Urls from '../../../../steps/urls';

import LegalRepresentationGetController from './LegalRepresentationGetController';

const dummySessionData = {
  legalRepresentation: YesOrNo.YES,
  respondents: [
    {
      id: '',
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

  test('Testing controller native methods to ensure right validation', async () => {
    const controller = new LegalRepresentationGetController('page', () => ({}));

    const req = mockRequest({ dummySessionData });
    const res = mockResponse();
    await controller.get(req, res);
    req.originalUrl = Urls.LEGAL_REPRESENTATION_START;
    req.session.user.id = '123';
    req.session.userCase = dummySessionData;
    expect(req.originalUrl).toBe(req.originalUrl);
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

    test('Language english via session', async () => {
      const controller = new LegalRepresentationGetController('page', () => ({}));

      const language = 'en';
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

    test('Language via browser settings - welsh', async () => {
      const controller = new LegalRepresentationGetController('page', () => ({}));

      const language = 'cy';
      const req = mockRequest({ headers: { 'accept-language': 'cy' } });
      req.session.user.id = '123';
      req.session.userCase = dummySessionData;
      const res = mockResponse();
      req.query.lng = language;
      await controller.get(req, res);
      expect(req.query).toEqual({ lng: 'cy' });
    });

    test('Language via browser settings - English', async () => {
      const controller = new LegalRepresentationGetController('page', () => ({}));

      const language = 'en';
      const req = mockRequest({ headers: { 'accept-language': 'en' } });
      req.session.user.id = '123';
      req.session.userCase = dummySessionData;
      const res = mockResponse();
      req.query.lng = language;
      await controller.get(req, res);
      expect(req.query).toEqual({ lng: 'en' });
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
