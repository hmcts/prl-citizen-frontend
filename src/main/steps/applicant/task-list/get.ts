import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';

import { generateContent } from './content';

@autobind
export default class ApplicantTaskListGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }
  public async load(req: AppRequest, res: Response): Promise<void> {
    try {
      const User = req.session.user;
      const caseID = req.session.userCase.id;
      const cosClient = new CosApiClient(User.accessToken, 'https://return-url');
      const hearings = await cosClient.retrieveCaseHearingsByCaseId(caseID, User);
      req.session.userCase.hearingCollection = hearings.caseHearings;

      req.session.save(() => {
        super.get(req, res);
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
