import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { State, YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../../app/controller/GetController';
import { Language, generatePageContent } from '../../../common/common.content';

@autobind
export default class HearingsGetController extends GetController {
  constructor(protected readonly view: string, protected readonly content: TranslationFn) {
    console.log('LOCAL HearingsGetController constructor method.....');
    super(view, content);
  }
  public async get(req: AppRequest, res: Response): Promise<void> {
    console.log('LOCAL HearingsGetController get method.....');

    if (res.locals.isError || res.headersSent) {
      return;
    }

    const language = super.getPreferredLanguage(req) as Language;

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
    req.session.userCase = { id: '1234', state: State.AwaitingHWFDecision };
    const citizenUser = req.session.user;
    const cosApiClient = new CosApiClient(citizenUser.accessToken, 'http://localhost:3001');
    const caseHearingDataFromCos = await cosApiClient.retrieveCaseHearingsByCaseId(
      req.session.userCase.id,
      citizenUser
    );
    console.log('retrieved caseHEARINGdata for case : ' + JSON.stringify(caseHearingDataFromCos));
    req.session.userCase = caseHearingDataFromCos;

    const ordinalNumberMap = new Map<number, string>([
      [1, 'First'],
      [2, 'Second'],
      [3, 'Third'],
      [4, 'Fourth'],
      [5, 'Fifth'],
      [6, 'Sixth'],
      [7, 'Seventh'],
      [8, 'Eighth'],
      [9, 'Ninth'],
      [10, 'Tenth'],
      [11, 'Eleventh'],
      [12, 'Twelfth'],
      [13, 'Thirteenth'],
      [14, 'Fourteenth'],
      [15, 'Fifteenth'],
      [16, 'Sixteenth'],
      [17, 'Seventeenth'],
      [18, 'Eighteenth'],
      [19, 'Nineteenth'],
      [20, 'Twentieth'],
    ]);
    res.render(this.view, {
      ...content,
      sessionErrors,
      htmlLang: language,
      formaction,
      userIdamId: req.session?.user?.id,
      ordinalNumberMap,
    });
  }
}
