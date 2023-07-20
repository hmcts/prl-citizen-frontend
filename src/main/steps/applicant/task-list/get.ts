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
      const citizenUser = req.session.user;
      const caseId = req.session.userCase.id;
      const client = new CosApiClient(citizenUser.accessToken, 'https://return-url');
      const hearings = await client.retrieveCaseHearingsByCaseId(citizenUser, caseId);
      req.session.userCase = {
        ...req.session.userCase,
        hearingCollection: hearings.caseHearings,
      };
    } catch (error) {
      throw new Error(error);
    } finally {
      req.session.applicationSettings = {
        ...req.session.applicationSettings,
        navfromRespondToApplication: false,
      };

      req.session.save(() => {
        super.get(req, res);
      });
    }
  }
}
