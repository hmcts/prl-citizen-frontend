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
    //RetreiveDraftCase[] retreveDraftCase =
    const responseBody: RetreiveDraftCase[] = await req.locals.C100Api.retrieveCase(req.session.user);
    const returnURL = responseBody[0].c100RebuildReturnUrl;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //const internationalElements = responseBody[0].c100RebuildInternationalElements;
    req.session.userCase = {
      ...(req.session.userCase ?? {}),
    };
    Object.assign(req.session.userCase, responseBody[0].c100RebuildInternationalElements);
    console.log('return url' + returnURL);
    //const returnURL = req.locals.C100Api.retrieveCase(req.session.user)[0].c100RebuildReturnUrl;
    if (returnURL !== null) {
      // await req.locals.C100Api.updateCase(req.session.userCase!.caseId!, req.session.userCase, req.originalUrl);
      req.session.save(() => {
        res.redirect(returnURL);
      });
    } else {
      req.session.save(() => {
        res.redirect(DASHBOARD_URL);
      });
    }
  }
}
