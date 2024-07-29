import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getCaseDetails } from '../../../app/auth/user/oidc';
import { State } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';
import { RAProvider } from '../../../modules/reasonable-adjustments';
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
      await RAProvider.resetData(req);

      req.session.userCaseList = await getCaseDetails(req);

      clean(req.session);
      req.session.save(() => {
        super.get(req, res);
      });
    } catch (e) {
      super.get(req, res);
    }
  }

  public async ammendSession(req: AppRequest, res: Response): Promise<void> {
    try {
      await getCaseDetails(req);

      if (req.params.context === 'add') {
        req.session.userCase = {
          id: 'dummyCaseId',
          state: State.AosDrafted,
        };
      } else {
        clean(req.session);
      }

      req.session.save(error => {
        req.locals.logger.error('*** Error ammendSession *** ' + error);
        res.json(req.session);
      });
    } catch (e) {
      super.get(req, res);
    }
  }
}

function clean(session) {
  delete session.userCase;
}
