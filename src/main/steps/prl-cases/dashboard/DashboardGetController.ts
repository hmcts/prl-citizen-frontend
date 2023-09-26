import autobind from 'autobind-decorator';
import { Response } from 'express';
import _ from 'lodash';

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
      removeCaseData(req.session, async () => {
        await BreadcrumbController.enable(req.session);
        req.session.userCaseList = await getCaseDetails(req);
        req.session.save(() => {
          super.get(req, res);
        });
      });
    } catch (e) {
      super.get(req, res);
    }
  }
}

function removeCaseData(session, callback) {
  delete session.userCase;
  session.save(() => {
    session.reload(() => {
      if (_.isFunction(callback)) {
        callback();
      }
    });
  });
}
