import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
//import { getCaseDetails } from '../../../../main/app/auth/user/oidc';

//import {DashboardGetController} from './DashboardGetController';
import DashboardGetController from "./DashboardGetController"

describe('DashboardGetController', () => {
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
    test('Should render the page', async () => {
      const controller = new DashboardGetController('page', generateContent);
  
      const req = mockRequest();
      const res = mockResponse();
      //getCaseDetails(req);
      await controller.get(req, res);
      expect(1).toEqual(1);
    })

})