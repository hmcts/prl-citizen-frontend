import { GetController } from 'app/controller/GetController';
import { Response } from 'express';

import { Respondent } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { MIAM_START } from '../../urls';

import { getMIAMDetails } from './MIAMMapper';

export class MIAMGetController extends GetController{
  public async getMIAM(req: AppRequest, res: Response): Promise<void> {
    req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
      if (
        respondent?.value?.user?.idamId === req.session?.user.id &&
        respondent?.value?.response &&
        respondent?.value?.response?.miam
      ) {
        //get the details from db and store in request session //
        Object.assign(req.session.userCase, getMIAMDetails(respondent, req));
      }
    });
    req.session.save(() => res.redirect(MIAM_START));
  }
}