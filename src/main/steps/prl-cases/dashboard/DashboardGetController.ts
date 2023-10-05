import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getCaseDetails } from '../../../app/auth/user/oidc';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';
import BreadcrumbController from '../../common/breadcrumb/BreadcrumbController';

import { generateContent } from './content';

@autobind
export default class DashboardGetController extends GetController {
  constructor() {
    super(`${__dirname}/template`, generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    try {
      await BreadcrumbController.enable(req.session);
      req.session.userCaseList = await getCaseDetails(req);
      clean(req.session);
      req.session.save(() => {
        super.get(req, res);
      });
    } catch (e) {
      super.get(req, res);
    }
  }
}

function clean(session) {
  delete session.userCase;
  delete session.applicationSettings;
}
