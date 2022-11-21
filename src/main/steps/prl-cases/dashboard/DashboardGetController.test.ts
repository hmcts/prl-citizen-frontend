import * as oidc from '../../../../main/app/auth/user/oidc';
import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';

import DashboardGetController from './DashboardGetController';

const languages = {
  en: {
    text: 'english',
  },
  cy: {
    text: 'welsh',
  },
};
const getCaseDetailsMock = jest.spyOn(oidc, 'getCaseDetails');
const generateContent = content => languages[content.language];
describe('DashboardGetController', () => {
  const controller = new DashboardGetController('page', generateContent);
  const req = mockRequest();
  const res = mockResponse();
  req.session.userCaseList = [{ ...req.session.userCase }];
  beforeEach(() => {
    getCaseDetailsMock.mockResolvedValue(req.session.userCaseList);
  });

  afterEach(() => {
    getCaseDetailsMock.mockClear();
  });

  test('Should able to render the view', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    let flag = false;
    try {
      await controller.get(req, res);
    } catch (err) {
      flag = true;
    }
    expect(flag).toBe(false);
  });
});
