/* eslint-disable import/no-unresolved */
import { FieldPrefix } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../../app/controller/GetController';
import { getFeesForC100ApplicationSubmission } from '../../../../app/fees/fees-lookup-api';

import autobind from 'autobind-decorator';
import { Response } from 'express';

@autobind
export default class NeedHelpWithFeesGetController extends GetController {
  constructor(
    protected readonly view: string,
    protected readonly content: TranslationFn,
    protected readonly fieldPrefix: FieldPrefix
  ) {
    super(view, content);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    req.session.userCase.c100ApplicationFees = await (
      await getFeesForC100ApplicationSubmission(req.session.user, req.locals.logger)
    ).amount;

    res.redirect(req.url);
  }
}
