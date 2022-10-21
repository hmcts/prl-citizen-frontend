import autobind from 'autobind-decorator';
import { Response } from 'express';

import { DASHBOARD_URL } from '../../../../main/steps/urls';
import { RetreiveDraftCase } from '../../../app/case/C100CaseApi';
import { FieldPrefix } from '../../../app/case/case';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../app/controller/GetController';

@autobind
export default class GetCaseDetails extends GetController {
  constructor(
    protected readonly view: string,
    protected readonly content: TranslationFn,
    protected readonly fieldPrefix: FieldPrefix
  ) {
    super(view, content);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    try {
      const caseData: RetreiveDraftCase = await req.locals.C100Api.retrieveCase();
      if (caseData) {
        req.session.userCase = {
          ...(req.session.userCase ?? {}),
          ...caseData,
          caseId: caseData.id,
        };
      }

      req.session.save(() => {
        res.redirect(caseData.c100RebuildReturnUrl ?? DASHBOARD_URL);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
