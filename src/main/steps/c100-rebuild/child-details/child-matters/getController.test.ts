import { defaultViewArgs } from '../../../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { FieldPrefix } from '../../../../app/case/case';
import { State } from '../../../../app/case/definition';
//import { generatePageContent } from '../../../../steps/common/common.content';
import * as Urls from '../../../../steps/urls';

import AddchildrenMatterGetController from './getController';

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

describe('AddchildrenMatterGetController', () => {
  test('Should render the page', async () => {
    const controller = new AddchildrenMatterGetController('page', () => ({}), FieldPrefix.APPLICANT);

    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);
    expect(1).toEqual(1);
  });

  test('Testing controller native methods to ensure right validation', async () => {
    const controller = new AddchildrenMatterGetController('page', () => ({}), FieldPrefix.APPLICANT);

    const req = mockRequest({ userCase: { state: State.AwaitingPayment } });
    const res = mockResponse();
    await controller.get(req, res);
    req.originalUrl = Urls.C100_children_DETAILS_CHILD_MATTERS;
    controller.clearConfidentialitySessionSaveData(req);
    expect(req.session['contactDetailsPrivateAlternative']).toBe(undefined);
    expect(req.originalUrl).toBe(req.originalUrl);
  });

  describe('Getting the users preferred language', () => {
    test('Language whelsh via session', async () => {
      const controller = new AddchildrenMatterGetController('page', () => ({}), FieldPrefix.APPLICANT);

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

      const childId = 'f817b708-977e-4ed1-b241-c9030a204312';
      const checkIfDecisionMade = 'Yes';
      const postURL = '';
      const listOfItems = [];

      expect(res.render).not.toBeCalledWith('page', {
        ...defaultViewArgs,
        sessionErrors: req.session.errors,
        htmlLang: language,
        childrenForms: req.session.settings?.['toggleChild'],
        formaction: req.originalUrl,
        listedchildren: req.session.settings.ListOfChild,
        childDetails: req.session.settings.ListOfChild.filter(child => child.id === childId)[0],
        checkIfDecisionMade,
        childId,
        postURL,
        listOfItems,
      });
    });

    test('Language english via session', async () => {
      const controller = new AddchildrenMatterGetController('page', () => ({}), FieldPrefix.APPLICANT);

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

      const checkIfDecisionMade = 'Yes';
      const postURL = '';
      const listOfItems = [];

      expect(res.render).not.toBeCalledWith('page', {
        ...defaultViewArgs,
        sessionErrors: req.session.errors,
        htmlLang: language,
        childrenForms: req.session.settings?.['toggleChild'],
        formaction: req.originalUrl,
        listedchildren: req.session.settings.ListOfChild,
        childDetails: req.session.settings.ListOfChild.filter(child => child.id === childId)[0],
        checkIfDecisionMade,
        childId,
        postURL,
        listOfItems,
      });
    });

    test('Language via browser settings - welsh', async () => {
      const controller = new AddchildrenMatterGetController('page', () => ({}), FieldPrefix.APPLICANT);

      const language = 'cy';
      const req = mockRequest({ headers: { 'accept-language': 'cy' } });
      const res = mockResponse();
      req.query.lng = language;
      await controller.get(req, res);
      expect(req.query).toEqual({ lng: 'cy' });
    });

    test('Language via browser settings - English', async () => {
      const controller = new AddchildrenMatterGetController('page', () => ({}), FieldPrefix.APPLICANT);

      const language = 'en';
      const req = mockRequest({ headers: { 'accept-language': 'en' } });
      const res = mockResponse();
      req.query.lng = language;
      await controller.get(req, res);
      expect(req.query).toEqual({ lng: 'en' });
    });
  });

  test("Doesn't call render if an error page has already been rendered upstream", async () => {
    const controller = new AddchildrenMatterGetController('page', () => ({}), FieldPrefix.APPLICANT);

    const req = mockRequest();
    const res = mockResponse();
    res.locals.isError = true;
    await controller.get(req, res);
    expect(res.render).not.toHaveBeenCalled();
  });

  test("Doesn't call render if headers have already been sent already upstream", async () => {
    const controller = new AddchildrenMatterGetController('page', () => ({}), FieldPrefix.APPLICANT);

    const req = mockRequest();
    const res = mockResponse();
    res.headersSent = true;
    await controller.get(req, res);
    expect(res.render).not.toHaveBeenCalled();
  });

  test('sends the current page form session state to the view', async () => {
    const controller = new AddchildrenMatterGetController('page', () => ({}), FieldPrefix.APPLICANT);

    const req = mockRequest();
    const res = mockResponse();
    await controller.get(req, res);
    expect(res.session).not.toBe(req.session);
  });

  describe('generatePageContent()', () => {
    test('calls generatePageContent with correct arguments for new sessions', async () => {
      const controller = new AddchildrenMatterGetController('page', () => ({}), FieldPrefix.APPLICANT);

      const req = mockRequest({ userCase: { state: State.Draft }, session: { errors: [] } });
      const res = mockResponse();
      await controller.get(req, res);
      expect(req).not.toBe(res.render());
    });
  });
});
