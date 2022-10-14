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
      const responseBody: RetreiveDraftCase[] = await req.locals.C100Api.retrieveCase();
      if (responseBody.length) {
        const retreivedDraftCase = responseBody[0];
        let c100RebuildInternationalElementsObj = retreivedDraftCase.c100RebuildInternationalElements;
        let c100RebuildReasonableAdjustmentsObj = retreivedDraftCase.c100RebuildReasonableAdjustments;
        let c100RebuildTypeOfOrderObj = retreivedDraftCase.c100RebuildTypeOfOrder;
        let c100RebuildHearingWithoutNoticeObj = retreivedDraftCase.c100RebuildHearingWithoutNotice;
        let c100RebuildOtherProceedingsObj = retreivedDraftCase.c100RebuildOtherProceedings;

        c100RebuildInternationalElementsObj = {
          ...(c100RebuildInternationalElementsObj ?? {}),
        };
        c100RebuildReasonableAdjustmentsObj = {
          ...(c100RebuildReasonableAdjustmentsObj ?? {}),
        };
        c100RebuildTypeOfOrderObj = {
          ...(c100RebuildTypeOfOrderObj ?? {}),
        };
        c100RebuildHearingWithoutNoticeObj = {
          ...(c100RebuildHearingWithoutNoticeObj ?? {}),
        };
        c100RebuildOtherProceedingsObj = {
          ...(c100RebuildOtherProceedingsObj ?? {}),
        };
        req.session.userCase = {
          ...(req.session.userCase ?? {}),
        };
        req.session.userCase.caseId = retreivedDraftCase.id;

        Object.assign(req.session.userCase, this.recoverJsonFromRecord(c100RebuildInternationalElementsObj));
        Object.assign(req.session.userCase, this.recoverJsonFromRecord(c100RebuildReasonableAdjustmentsObj));
        Object.assign(req.session.userCase, this.recoverJsonFromRecord(c100RebuildTypeOfOrderObj));
        Object.assign(req.session.userCase, this.recoverJsonFromRecord(c100RebuildHearingWithoutNoticeObj));
        Object.assign(req.session.userCase, this.recoverJsonFromRecord(c100RebuildOtherProceedingsObj));

        const returnURL = retreivedDraftCase.c100RebuildReturnUrl;

        req.session.save(() => {
          res.redirect(returnURL);
        });
      } else {
        req.session.save(() => {
          console.info('No case is present for this user');
          res.redirect(DASHBOARD_URL);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  public recoverJsonFromRecord(queryParams: Record<string, string>): string {
    let str = '';
    Object.entries(queryParams).forEach(([, value]) => {
      str = str + value;
    });
    if (str !== '') {
      str = JSON.parse(str);
    }
    return str;
  }
}
