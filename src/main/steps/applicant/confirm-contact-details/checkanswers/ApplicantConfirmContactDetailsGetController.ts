import autobind from 'autobind-decorator';
import { Response } from 'express';
import { FieldPrefix } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { CommonContent } from '../../../../steps/common/common.content';
import ConfirmContactDetailsGetController from '../../../../steps/common/confirm-contact-details/checkanswers/ConfirmContactDetailsGetController';

export type PageContent = Record<string, unknown>;
export type TranslationFn = (content: CommonContent) => PageContent;
@autobind
export default class ApplicantConfirmContactDetailsGetController extends ConfirmContactDetailsGetController {
  constructor() {
    super();
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    req.session.userCase.citizenRole = FieldPrefix.APPLICANT;
    super.get(req, res);
  }
}
