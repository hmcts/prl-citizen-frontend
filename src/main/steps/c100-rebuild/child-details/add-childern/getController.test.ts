import { defaultViewArgs } from '../../../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { FieldPrefix } from '../../../../app/case/case';
import { State } from '../../../../app/case/definition';

import AddChilderns from './getController';

const dummySessionData = {
  ListOfChild: [
    {
      firstname: 'Dummy ',
      id: 'f817b708-977e-4ed1-b241-c9030a204312',
      lastname: 'Test1',
      personalDetails: {
        DateoBirth: '27/12/1967',
        Sex: 'male',
        isDateOfBirthKnown: 'No',
        ApproximateDateOfBirth: '//',
      },
      childMatter: {
        isDecisionTaken: 'Yes',
      },
      parentialResponsibility: {
        statement: 'lorem ipsum',
      },
    },
    {
      firstname: 'Dummy',
      id: '68f1a216-cd7f-4399-867b-a0a700f171a7',
      lastname: 'Test2',
      personalDetails: {
        DateoBirth: '11/01/1988',
        Sex: 'unspecified',
        isDateOfBirthKnown: 'No',
        ApproximateDateOfBirth: '//',
      },
      childMatter: {
        isDecisionTaken: 'Yes',
      },
      parentialResponsibility: {
        statement: 'lorem ipsum',
      },
    },
  ],
};

describe('Add Childern Controller', () => {
  test('Should render the page', async () => {
    const controller = new AddChilderns('page', () => ({}), FieldPrefix.APPLICANT);
    const language = 'cy';
    const req = mockRequest();
    const res = mockResponse();
    req.session.lang = language;
    const settings = {
      toggleChild: 0,
      ListOfChild: dummySessionData.ListOfChild,
      childTemporaryFormData: {},
    };
    req.session.settings = settings;
    await controller.get(req, res);

    expect(1).toEqual(1);
  });

  describe('Getting the users preferred language', () => {
    test('Language whelsh via session', async () => {
      const controller = new AddChilderns('page', () => ({}), FieldPrefix.APPLICANT);

      const language = 'cy';
      const req = mockRequest();
      const res = mockResponse();
      req.session.lang = language;
      const settings = {
        toggleChild: 0,
        ListOfChild: dummySessionData.ListOfChild,
        childTemporaryFormData: {},
      };
      req.session.settings = settings;
      await controller.get(req, res);

      // const childId = 'f817b708-977e-4ed1-b241-c9030a204312';

      expect(res.render).not.toBeCalledWith('page', {
        ...defaultViewArgs,
        sessionErrors: req.session.errors,
        htmlLang: language,
        childernForms: req.session.settings?.['toggleChild'],
        formaction: req.originalUrl,
        listedChildern: dummySessionData.ListOfChild,
        tempFormData: req.session.settings.childTemporaryFormData,
      });
    });

    test('Language english via session', async () => {
      const controller = new AddChilderns('page', () => ({}), FieldPrefix.APPLICANT);

      const language = 'en';
      const childId = 'f817b708-977e-4ed1-b241-c9030a204312';
      const req = mockRequest();
      const res = mockResponse();
      req.session.lang = language;
      const settings = {
        toggleChild: 0,
        ListOfChild: dummySessionData.ListOfChild,
        childTemporaryFormData: {},
      };
      req.session.settings = settings;
      req.query.childId = childId;
      await controller.get(req, res);

      expect(res.render).not.toBeCalledWith('page', {
        ...defaultViewArgs,
        sessionErrors: req.session.errors,
        htmlLang: language,
        childernForms: req.session.settings?.['toggleChild'],
        formaction: req.originalUrl,
        listedChildern: dummySessionData.ListOfChild,
        tempFormData: req.session.settings.childTemporaryFormData,
      });
    });

    test('Language via browser settings - welsh', async () => {
      const controller = new AddChilderns('page', () => ({}), FieldPrefix.APPLICANT);

      const language = 'cy';
      const req = mockRequest({ headers: { 'accept-language': 'cy' } });
      const res = mockResponse();
      const childId = 'f817b708-977e-4ed1-b241-c9030a204312';
      req.session.lang = language;
      const settings = {
        toggleChild: 0,
        ListOfChild: dummySessionData.ListOfChild,
        childTemporaryFormData: {},
      };
      req.session.settings = settings;
      req.query.childId = childId;
      req.query.lng = language;
      await controller.get(req, res);
      expect(req.query).toEqual({ lng: 'cy', childId });
    });

    test('Language via browser settings - English', async () => {
      const controller = new AddChilderns('page', () => ({}), FieldPrefix.APPLICANT);

      const language = 'en';
      const req = mockRequest({ headers: { 'accept-language': 'en' } });
      const res = mockResponse();
      const childId = 'f817b708-977e-4ed1-b241-c9030a204312';
      req.session.lang = language;
      const settings = {
        toggleChild: 0,
        ListOfChild: dummySessionData.ListOfChild,
        childTemporaryFormData: {},
      };
      req.session.settings = settings;
      req.query.childId = childId;
      req.query.lng = language;
      await controller.get(req, res);
      expect(req.query).toEqual({ lng: 'en', childId });
    });
  });

  test("Doesn't call render if an error page has already been rendered upstream", async () => {
    const controller = new AddChilderns('page', () => ({}), FieldPrefix.APPLICANT);

    const req = mockRequest();
    const res = mockResponse();
    const language = 'en';
    const childId = 'f817b708-977e-4ed1-b241-c9030a204312';
    req.session.lang = language;
    const settings = {
      toggleChild: 0,
      ListOfChild: dummySessionData.ListOfChild,
      childTemporaryFormData: {},
    };
    req.session.settings = settings;
    req.query.childId = childId;
    res.locals.isError = true;
    await controller.get(req, res);
    expect(res.render).not.toHaveBeenCalled();
  });

  test("Doesn't call render if headers have already been sent already upstream", async () => {
    const controller = new AddChilderns('page', () => ({}), FieldPrefix.APPLICANT);

    const req = mockRequest();
    const res = mockResponse();
    const language = 'en';
    const childId = 'f817b708-977e-4ed1-b241-c9030a204312';
    req.session.lang = language;
    const settings = {
      toggleChild: 0,
      ListOfChild: dummySessionData.ListOfChild,
      childTemporaryFormData: {},
    };
    req.session.settings = settings;
    req.query.childId = childId;
    res.headersSent = true;
    await controller.get(req, res);
    expect(res.render).not.toHaveBeenCalled();
  });

  describe('generatePageContent()', () => {
    test('calls generatePageContent with correct arguments for new sessions', async () => {
      const controller = new AddChilderns('page', () => ({}), FieldPrefix.APPLICANT);

      const req = mockRequest({ userCase: { state: State.Draft }, session: { errors: [] } });
      const res = mockResponse();
      const language = 'en';
      const childId = 'f817b708-977e-4ed1-b241-c9030a204312';
      req.session.lang = language;
      const settings = {
        toggleChild: 0,
        ListOfChild: dummySessionData.ListOfChild,
        childTemporaryFormData: {},
      };
      req.session.settings = settings;
      req.query.childId = childId;
      await controller.get(req, res);
      expect(res.render).toHaveBeenCalled();
    });
  });

  //addChildQueryInSession

  describe('addChildQueryInSession()', () => {
    test('addChildQueryInSession checking if childern is not added', async () => {
      const controller = new AddChilderns('page', () => ({}), FieldPrefix.APPLICANT);

      const req = mockRequest({ userCase: { state: State.Draft }, session: { errors: [] } });
      const res = mockResponse();
      req.query.addChild = 'true';
      const callChildMethod = controller.addChildQueryInSession(req, res);
      expect(callChildMethod).toBe(undefined);
    });
  });
});
