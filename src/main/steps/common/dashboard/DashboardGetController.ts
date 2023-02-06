import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getCaseDetails } from '../../../app/auth/user/oidc';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';

import { generateContent } from './content';

@autobind
export default class DashboardGetController extends GetController {
  constructor() {
    super(`${__dirname}/template`, generateContent);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    try {
      req.session.userCaseList = await getCaseDetails(req);
      req.session.save();
    } finally {
      super.get(req, res);
    }
  }
}
