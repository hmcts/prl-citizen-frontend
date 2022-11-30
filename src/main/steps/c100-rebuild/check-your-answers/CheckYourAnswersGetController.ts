import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../../../app/case/case';
import { C100_CASE_EVENT } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../app/controller/GetController';

@autobind
export default class CheckYourAnswersGetController extends GetController {
  constructor(
    protected readonly view: string,
    protected readonly content: TranslationFn,
    protected readonly fieldPrefix: FieldPrefix
  ) {
    super(view, content);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    await req.locals.C100Api.updateCase(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      req.session.userCase!.caseId!,
      req.session.userCase,
      req.originalUrl,
      C100_CASE_EVENT.CASE_UPDATE
    );
    super.get(req, res);
  }
}
