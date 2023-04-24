import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController } from '../../../app/controller/GetController';

import { generateContent } from './content';
@autobind
export class RespondentTaskListGetController extends GetController {
  constructor() {
    super(__dirname + '/template', generateContent);
  }

  public async load(req: AppRequest, res: Response): Promise<void> {
    req.session.applicationSettings = {
      ...req.session.applicationSettings,
      navfromRespondToApplication: false,
    };

    req.session.save(() => {
      super.get(req, res);
    });
  }
}
