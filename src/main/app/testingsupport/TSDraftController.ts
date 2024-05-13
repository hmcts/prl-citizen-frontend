import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { C100_CHECK_YOUR_ANSWER, HOME_URL } from '../../steps/urls';
import { CaseWithId } from '../case/case';
import { AppRequest } from '../controller/AppRequest';
import { AnyObject } from '../controller/PostController';

@autobind
class TSDraftController {
  public async post(req: AppRequest, res: Response): Promise<void> {
    res.redirect(HOME_URL);
  }

  public async createTSC100Draft(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    try {
      const newCaseId = (await req.locals.C100Api.createCaseTestingSupport()) as unknown as string;
      req.session.userCase = (await req.locals.C100Api.retrieveCaseById(newCaseId)) as CaseWithId;
      req.session.save(() => {
        res.redirect(C100_CHECK_YOUR_ANSWER);
      });
    } catch (e) {
      throw new Error('C100case could not be created');
    }
  }

  public async deleteTSC100Draft(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const data = req.body['ids'] as string;
    const value = data.split(',');
    for (const element of value) {
      try {
        const caseData = req.session.userCase || {};
        caseData.caseId = element;
        await req.locals.C100Api.deleteCase(caseData, req.session);
      } catch (e) {
        throw new Error('C100case could not be deleted');
      }
    }
    req.session.save(() => {
      res.redirect(HOME_URL);
    });
  }
}

export default new TSDraftController();
