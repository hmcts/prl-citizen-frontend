import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { CommonContent } from '../../../common/common.content';
import { ConfirmContactDetailsPostController } from '../../../common/confirm-contact-details/checkanswers/ConfirmContactDetailsPostController';

export type PageContent = Record<string, unknown>;
export type TranslationFn = (content: CommonContent) => PageContent;
@autobind
export default class ApplicantConfirmContactDetailsPostController extends ConfirmContactDetailsPostController {
  public async post(req: AppRequest, res: Response): Promise<void> {
    super.post(req, res);
  }
}
