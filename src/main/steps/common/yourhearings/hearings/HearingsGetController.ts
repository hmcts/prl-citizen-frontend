import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../../app/controller/GetController';
import { ordinalNumberMapCy, ordinalNumberMapEn } from '../../../../steps/constants';
import { Language, generatePageContent } from '../../../common/common.content';

@autobind
export default class HearingsGetController {
  private parent;
  constructor(protected readonly view: string, protected readonly content: TranslationFn) {
    this.parent = new GetController(view, content);
  }
  public async get(req: AppRequest, res: Response): Promise<void> {
    if (res.locals.isError || res.headersSent) {
      return;
    }

    const language = this.parent.getPreferredLanguage(req) as Language;

    const ordinalNumberMap = language === 'cy' ? ordinalNumberMapCy : ordinalNumberMapEn;

    const content = generatePageContent({
      language,
      pageContent: this.content,
      userCase: req.session?.userCase,
    });
    if (!req.session.errors) {
      req.session.errors = [];
    }
    const sessionErrors = req.session?.errors || [];
    let formaction: YesOrNo | undefined;

    //make a call to the cosclient to get the hearings
    const citizenUser = req.session.user;
    const cosApiClient = new CosApiClient(citizenUser.accessToken, 'https://return-url');
    const caseHearings = await cosApiClient.getAllHearingsForCitizenCase(req.session.user, req.session.userCase.id);
    console.log('retrieved caseHEARINGdata for case : ' + JSON.stringify(caseHearings));
    // if(caseHearings.caseHearings){
    //   req.session.userCase.hearingCollection = caseHearings.caseHearings;
    // }
    const userCase = req.session.userCase;

    res.render(this.view, {
      ...content,
      sessionErrors,
      htmlLang: language,
      formaction,
      userIdamId: req.session?.user?.id,
      ordinalNumberMap,
      userCase,
    });
  }
}
