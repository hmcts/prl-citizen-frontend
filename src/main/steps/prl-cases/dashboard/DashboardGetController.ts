import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getCaseDetails } from '../../../../main/app/auth/user/oidc';
import { AppRequest } from '../../../../main/app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../../main/app/controller/GetController';
import { Language, generatePageContent } from '../../../../main/steps/common/common.content';

@autobind
export default class DashboardGetController extends GetController {
  constructor(protected readonly view: string, protected readonly content: TranslationFn) {
    super(view, content);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    console.log('Inside Dashboard controller');
    req.session.userCaseList = await getCaseDetails(req);

    const language = super.getPreferredLanguage(req) as Language;
    const content = generatePageContent({
      language,
      pageContent: this.content,
      userCase: req.session?.userCase,
      userCaseList: req.session?.userCaseList,
    });
    res.render(this.view, {
      ...content,
      htmlLang: language,
      userIdamId: req.session?.user?.id,
    });
  }
}
