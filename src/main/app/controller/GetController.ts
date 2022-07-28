import autobind from 'autobind-decorator';
import { Response } from 'express';
import Negotiator from 'negotiator';

import { LanguageToggle } from '../../modules/i18n';
import { CommonContent, Language, generatePageContent } from '../../steps/common/common.content';
import * as Urls from '../../steps/urls';
import { getSystemUser } from '../auth/user/oidc';
import { CosApiClient } from '../case/CosApiClient';
// import { Case, CaseWithId } from '../case/case';
//import { CosApiClient } from '../case/CosApiClient';
import { CITIZEN_UPDATE } from '../case/definition';

import { AppRequest } from './AppRequest';

export type PageContent = Record<string, unknown>;
export type TranslationFn = (content: CommonContent) => PageContent;

@autobind
export class GetController {
  constructor(protected readonly view: string, protected readonly content: TranslationFn) {}

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (res.locals.isError || res.headersSent) {
      // If there's an async error, it will have already rendered an error page upstream,
      // so we don't want to call render again
      return;
    }

    const language = this.getPreferredLanguage(req) as Language;

    // const addresses = req.session?.addresses;
    const content = generatePageContent({
      language,
      pageContent: this.content,
      userCase: req.session?.userCase,
      userEmail: req.session?.user?.email,
      // addresses,
    });

    const sessionErrors = req.session?.errors || [];

    if (req.session?.errors) {
      req.session.errors = undefined;
    }

    /**
     *     const caseData = await req.locals.api.getCaseById(caseReference as string);
    console.log(caseData);
     */

    await this.getUpdatedCaseData(req);
    this.mapApiDataToCaseData(req);

    res.render(this.view, {
      ...content,
      sessionErrors,
      htmlLang: language,
      // isDraft: req.session?.userCase?.state ? req.session.userCase.state === State.Draft : true,
      // getNextIncompleteStepUrl: () => getNextIncompleteStepUrl(req),
    });
  }

  private getPreferredLanguage(req: AppRequest) {
    // User selected language
    const requestedLanguage = req.query['lng'] as string;
    if (LanguageToggle.supportedLanguages.includes(requestedLanguage)) {
      return requestedLanguage;
    }

    // Saved session language
    if (req.session?.lang) {
      return req.session.lang;
    }

    // Browsers default language
    const negotiator = new Negotiator(req);
    return negotiator.language(LanguageToggle.supportedLanguages) || 'en';
  }

  public parseAndSetReturnUrl(req: AppRequest): void {
    if (req.query.returnUrl) {
      if (Object.values(Urls).find(item => item === `${req.query.returnUrl}`)) {
        req.session.returnUrl = `${req.query.returnUrl}`;
      }
    }
  }

  //eslint-disable-next-line @typescript-eslint/ban-types
  public saveSessionAndRedirect(req: AppRequest, res: Response, callback?: Function): void {
    req.session.save(err => {
      if (err) {
        throw err;
      }
      if (callback) {
        callback();
      } else {
        res.redirect(req.url);
      }
    });
  }

  /**
   * It takes a request object, and returns a promise that resolves to void
   * @param {AppRequest} req - AppRequest - This is the request object that is passed to the function. It
   * contains the session object, which is where the userCase object is stored.
   */
  public async getUpdatedCaseData(req: AppRequest): Promise<void> {
    try {
      if (req.originalUrl === Urls.RESPONDENT_TASK_LIST_URL) {
        const caseworkerUser = await getSystemUser();
        const client = new CosApiClient(caseworkerUser.accessToken, 'http://return-url');
        const caseDataFromCos = await client.retrieveByCaseId(req.session.userCase['id'] as string, caseworkerUser);
        const getCaseData = caseDataFromCos;
        getCaseData.respondents = this.mapRespondendAccordingtoIDAM(req);
        req.session.apiCaseData = getCaseData;
      }
    } catch (error) {
      console.log(error);
    }
  }

  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected getEventName(req: AppRequest): string {
    return CITIZEN_UPDATE;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public mapRespondendAccordingtoIDAM(req: AppRequest) {
    if (req.session.apiCaseData?.hasOwnProperty('respondents')) {
      // const systemUserId = '4aaca0b1-a100-43d7-bfdd-c0cdfe2fd413';
      return [req.session.apiCaseData?.['respondents'][0]];
    } else {
      return [];
    }
  }

  public mapApiDataToCaseData(req: AppRequest): void {
    if (req.session['apiCaseData']?.hasOwnProperty('respondents')) {
      const respondentDetails = req.session.apiCaseData?.['respondents'][0]['value'];
      console.log(respondentDetails);
    }
  }
}
