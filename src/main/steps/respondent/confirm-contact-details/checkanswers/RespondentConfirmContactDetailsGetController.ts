import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { ConfirmContactDetailsGetController } from '../../../../steps/common/confirm-contact-details/checkanswers/ConfirmContactDetailsGetController';

@autobind
export class RespondentConfirmContactDetailsGetController extends ConfirmContactDetailsGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    req.session.userCase.citizenRole = FieldPrefix.RESPONDENT;
    super.get(req, res);
  }
}
