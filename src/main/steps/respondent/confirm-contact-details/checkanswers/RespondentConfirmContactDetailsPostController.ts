import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { CommonContent } from '../../../../steps/common/common.content';
import { ConfirmContactDetailsPostController } from '../../../../steps/common/confirm-contact-details/checkanswers/ConfirmContactDetailsPostController';

export type PageContent = Record<string, unknown>;
export type TranslationFn = (content: CommonContent) => PageContent;
@autobind
export default class RespondentConfirmContactDetailsPostController extends ConfirmContactDetailsPostController {
  public async post(req: AppRequest, res: Response): Promise<void> {
    req.session.userCase.citizenRole = FieldPrefix.RESPONDENT;
    super.post(req, res);
  }
}
