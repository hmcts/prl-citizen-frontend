/* eslint-disable import/no-unresolved */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../../app/controller/GetController';
import { getFeesForC100ApplicationSubmission } from '../../../../app/fees/fees-lookup-api';

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    if (req.session.userCase.c100ApplicationFees === undefined) {
      const c100ApplicationFees = (await getFeesForC100ApplicationSubmission(req.session.user, req.locals.logger))
        .feeAmountForC100Application;
      req.session.userCase = {
        ...(req.session.userCase ?? {}),
        c100ApplicationFees,
      };
    }

    const callback = () => super.get(req, res);

    super.saveSessionAndRedirect(req, res, callback);
  }
}
