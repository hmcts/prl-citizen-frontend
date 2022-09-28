import { Response } from 'express';

import { AppRequest } from '../../../app/controller/AppRequest';
import { C100_START } from '../../urls';

export class LandingPageController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const userDeatils = req?.session?.user;
    if (userDeatils) {
      try {
        const { id: caseId } = await req.locals.C100Api.createCase();
        req.session.userCase = {
          ...(req.session.userCase || {}),
          caseId,
        };
        req.session.save(() => {
          res.redirect(C100_START);
        });
      } catch (e) {
        // Handle error here
      }
    }
  }
}
