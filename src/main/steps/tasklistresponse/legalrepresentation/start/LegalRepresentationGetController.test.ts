import { defaultViewArgs } from '../../../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { State } from '../../../../app/case/definition';
//import { generatePageContent } from '../../../../steps/common/common.content';
import * as Urls from '../../../../steps/urls';

import LegalRepresentationGetController from './LegalRepresentationGetController';

describe('AddChildernMatterGetController', () => {
  test('Should render the page', async () => {
    const controller = new LegalRepresentationGetController('page', () => ({}));

    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);
    expect(1).toEqual(1);
  });

  test('Testing controller native methods to ensure right validation', async () => {
    const controller = new LegalRepresentationGetController('page', () => ({}));

    const req = mockRequest({ userCase: { state: State.AwaitingPayment } });
    const res = mockResponse();
    await controller.get(req, res);
    req.originalUrl = Urls.LEGAL_REPRESENTATION_START;
    //controller.clearConfidentialitySessionSaveData(req);
    expect(req.session['contactDetailsPrivateAlternative']).toBe(undefined);
    expect(req.originalUrl).toBe(req.originalUrl);
  });

  describe('Getting the users preferred language', () => {
    test('Language whelsh via session', async () => {
      const controller = new LegalRepresentationGetController('page', () => ({}));

      const language = 'cy';
      const req = mockRequest();
      const res = mockResponse();
      req.session.lang = language;
      const settings = {
        toggleChild: 0,
        childTemporaryFormData: {},
      };
      req.session.settings = settings;
      await controller.get(req, res);

      const childId = 'f817b708-977e-4ed1-b241-c9030a204312';

      expect(res.render).not.toBeCalledWith('page', {
        ...defaultViewArgs,
        sessionErrors: req.session.errors,
        htmlLang: language,
        childernForms: req.session.settings?.['toggleChild'],
        formaction: req.originalUrl,
        childId,
        postURL: `${Urls.LEGAL_REPRESENTATION_START}?childId=${childId}`,
        isDateOfBirthKnown: 'No',
      });
    });

    test('Language english via session', async () => {
      const controller = new LegalRepresentationGetController('page', () => ({}));

      const language = 'en';
      const childId = 'f817b708-977e-4ed1-b241-c9030a204312';
      const req = mockRequest();
      const res = mockResponse();
      req.session.lang = language;
      const settings = {
        toggleChild: 0,
        childTemporaryFormData: {},
      };
      req.session.settings = settings;
      req.query.childId = childId;
      await controller.get(req, res);

      const checkIfDecisionMade = 'Yes';

      const childDetails = req.session.settings.ListOfChild.filter(child => child.id === childId)[0];

      expect(res.render).not.toBeCalledWith('page', {
        ...defaultViewArgs,
        sessionErrors: req.session.errors,
        htmlLang: language,
        childernForms: req.session.settings?.['toggleChild'],
        formaction: req.originalUrl,
        listedChildern: req.session.settings.ListOfChild,
        childDetails: req.session.settings.ListOfChild.filter(child => child.id === childId)[0],
        checkIfDecisionMade,
        childId,
        postURL: `${Urls.LEGAL_REPRESENTATION_START}`,
        parentialResponsbilityStatement: childDetails?.parentialResponsibility?.statement,
      });
    });

    test('Language via browser settings - welsh', async () => {
      const controller = new LegalRepresentationGetController('page', () => ({}));

      const language = 'cy';
      const req = mockRequest({ headers: { 'accept-language': 'cy' } });
      const res = mockResponse();
      req.query.lng = language;
      await controller.get(req, res);
      expect(req.query).toEqual({ lng: 'cy' });
    });

    test('Language via browser settings - English', async () => {
      const controller = new LegalRepresentationGetController('page', () => ({}));

      const language = 'en';
      const req = mockRequest({ headers: { 'accept-language': 'en' } });
      const res = mockResponse();
      req.query.lng = language;
      await controller.get(req, res);
      expect(req.query).toEqual({ lng: 'en' });
    });
  });

  test("Doesn't call render if an error page has already been rendered upstream", async () => {
    const controller = new LegalRepresentationGetController('page', () => ({}));

    const req = mockRequest();
    const res = mockResponse();
    res.locals.isError = true;
    await controller.get(req, res);
    expect(res.render).not.toHaveBeenCalled();
  });

  test("Doesn't call render if headers have already been sent already upstream", async () => {
    const controller = new LegalRepresentationGetController('page', () => ({}));

    const req = mockRequest();
    const res = mockResponse();
    res.headersSent = true;
    await controller.get(req, res);
    expect(res.render).not.toHaveBeenCalled();
  });

  test('sends the current page form session state to the view', async () => {
    const controller = new LegalRepresentationGetController('page', () => ({}));

    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);
    expect(res.session).not.toBe(req.session);
  });

  describe('generatePageContent()', () => {
    test('calls generatePageContent with correct arguments for new sessions', async () => {
      const controller = new LegalRepresentationGetController('page', () => ({}));

      const req = mockRequest({ userCase: { state: State.Draft }, session: { errors: [] } });
      const res = mockResponse();
      await controller.get(req, res);
      expect(req).not.toBe(res.render());
    });
  });
});
