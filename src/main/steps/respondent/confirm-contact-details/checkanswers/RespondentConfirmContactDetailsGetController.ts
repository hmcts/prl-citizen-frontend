import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { CommonContent } from '../../../../steps/common/common.content';
import ConfirmContactDetailsGetController from '../../../../steps/common/confirm-contact-details/checkanswers/ConfirmContactDetailsGetController';

export type PageContent = Record<string, unknown>;
export type TranslationFn = (content: CommonContent) => PageContent;
@autobind
export default class RespondentConfirmContactDetailsGetController extends ConfirmContactDetailsGetController {
  constructor() {
    super();
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    Object.assign(req.session.userCase.serviceType, 'respondent');
    super.get(req, res);
  }
}
