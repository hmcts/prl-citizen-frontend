import path from 'path';

import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController } from '../../../../app/controller/GetController';
import { generateContent } from '../content';

@autobind
export default class TaskListGetController extends GetController {
  constructor() {
    super(path.join(__dirname, '../template'), generateContent);
  }

  load(req: AppRequest, res: Response): void {
    req.session.applicationSettings = {
      ...req.session.applicationSettings,
      navfromRespondToApplication: false,
    };

    req.session.save(() => {
      super.get(req, res);
    });
  }
}
