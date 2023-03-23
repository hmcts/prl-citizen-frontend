import { mockRequest } from '../../../../test/unit/utils/mockRequest';

jest.mock('axios');
jest.mock('config');
import BreadcrumbController from './BreadcrumbController';

describe('BreadcrumbController', () => {
  let req;
  beforeEach(() => {
    req = mockRequest({
      session: {
        userCase: {},
        userCaseList: [
          {
            id: '1234',
          },
        ],
        applicationSettings: {
          breadcrumbs: [],
        },
      },
      params: {
        caseId: '1234',
      },
    });
    jest.clearAllMocks();
  });

  describe('enable', () => {
    test('should set breadcrumbs to an empty array on the session', async () => {
      // req.session.applicationSettings.breadcrumbs = [];
      await BreadcrumbController.enable(req.session);
      expect(req.session.applicationSettings?.breadcrumbs).toEqual([]);
      expect(req.session.save).toHaveBeenCalledTimes(1);
    });

    test('should resolve if session is falsy', async () => {
      const result = await BreadcrumbController.enable(req.session);
      expect(result).toBeUndefined();
      expect(req.applicationSettings?.breadcrumbs).toBeUndefined();
    });

    test('should resolve if there is no session', async () => {
      req.session = null;
      const result = await BreadcrumbController.enable(req.session);
      expect(result).toBeUndefined();
    });
  });

  describe('add', () => {
    test('should add a new breadcrumb to the session', async () => {
      const id = 'home';
      const href = '/';
      await BreadcrumbController.add({ id, href }, req.session);
      expect(req.session.applicationSettings?.breadcrumbs).toEqual([{ id, href }]);
      expect(req.session.save).toHaveBeenCalledTimes(1);
    });
    test('should update an existing breadcrumb in the session', async () => {
      const id = 'home';
      const href = '/';
      req.session.applicationSettings = { breadcrumbs: [{ id, href }] };
      await BreadcrumbController.add({ id, href: '/new' }, req.session);
      expect(req.session.applicationSettings?.breadcrumbs).toEqual([{ id, href: '/new' }]);
      expect(req.session.save).toHaveBeenCalledTimes(1);
    });
    test('should remove all breadcrumbs after the updated breadcrumb', async () => {
      const id = 'home';
      const href = '/';
      const id2 = 'about';
      const href2 = '/about';
      req.session.applicationSettings = {
        breadcrumbs: [
          { id, href },
          { id: id2, href: href2 },
        ],
      };
      await BreadcrumbController.add({ id, href: '/new' }, req.session);
      expect(req.session.applicationSettings?.breadcrumbs).toEqual([{ id, href: '/new' }]);
      expect(req.session.save).toHaveBeenCalledTimes(1);
    });
    test('should resolve if breadcrumbs are not defined in session', async () => {
      req.session.applicationSettings = {
        breadcrumbs: [],
      };
      const result = await BreadcrumbController.add({ id: 'home', href: '/' }, req.session);
      expect(result).toBeUndefined();
    });
    test('should resolve if there is no session', async () => {
      req.session = null;
      const result = await BreadcrumbController.add({ id: 'home', href: '/' }, req.session);
      expect(result).toBeUndefined();
    });
  });

  describe('get', () => {
    test('should return an empty array if no breadcrumbs are defined in session', () => {
      const result = BreadcrumbController.get(req.session, 'en');
      expect(result).toEqual([]);
    });

    test('should return an array of breadcrumbs with text based on the provided language', () => {
      const id = 'home';
      const href = '/';
      req.session.applicationSettings = {
        breadcrumbs: [{ id, href }],
      };
      const result = BreadcrumbController.get(req.session, 'en');
      expect(result).toEqual([{ id, href, text: 'Home' }]);
    });
  });
});
