import autobind from 'autobind-decorator';
import { Response } from 'express';
import Negotiator from 'negotiator';

import { CosApiClient } from '../../app/case/CosApiClient';
import { LanguageToggle } from '../../modules/i18n';
import { CommonContent, Language, generatePageContent } from '../../steps/common/common.content';
import { RESPONSE_CITIZEN_INTERNATIONAL_ELEMENTS, RESPONSE_MIAM_ELEMENTS } from '../../steps/constants';
import { getInternationalFactorsDetails } from '../../steps/tasklistresponse/international-factors/InternationalFactorsMapper';
import { getMIAMDetails } from '../../steps/tasklistresponse/miam/MIAMMapper';
import * as Urls from '../../steps/urls';
import { CITIZEN_UPDATE, Respondent } from '../case/definition';

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

    const name = this.getName(req) as string;
    const language = this.getPreferredLanguage(req) as Language;
    const captionValue = this.getCaption(req) as string;
    const document_type = this.getDocumentType(req) as string;
    const byApplicant = req.query['byApplicant'] as string;
    const addresses = req.session?.addresses;
    const content = generatePageContent({
      language,
      pageContent: this.content,
      userCase: req.session?.userCase,
      userEmail: req.session?.user?.email,
      caption: captionValue,
      document_type,
      userCaseList: req.session?.userCaseList,
      addresses,
      name,
      userIdamId: req.session?.user?.id,
      byApplicant,
    });

    const sessionErrors = req.session?.errors || [];

    if (req.session?.errors) {
      req.session.errors = undefined;
    }

    res.render(this.view, {
      ...content,
      sessionErrors,
      htmlLang: language,
      caption: captionValue,
      document_type,
      name,
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

  private getCaption(req: AppRequest) {
    const caption = req.query['caption'] as string;
    return caption;
  }
  private getDocumentType(req: AppRequest) {
    const caption = req.query['document_type'] as string;
    return caption;
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

  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected getEventName(req: AppRequest): string {
    return CITIZEN_UPDATE;
  }

  public async getCaseDataFromCCDAndMapFields(
    req: AppRequest,
    res: Response,
    element: string,
    redirectUrl: string
  ): Promise<void> {
    const loggedInCitizen = req.session.user;
    const caseReference = req.params?.caseId;

    const client = new CosApiClient(loggedInCitizen.accessToken, 'https://return-url');

    const caseDataFromCos = await client.retrieveByCaseId(caseReference, loggedInCitizen);
    Object.assign(req.session.userCase, caseDataFromCos);

    req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
      if (
        respondent?.value?.user?.idamId === req.session?.user.id &&
        respondent?.value?.response &&
        respondent?.value?.response[`${element}`]
      ) {
        if (element === RESPONSE_MIAM_ELEMENTS && redirectUrl === Urls.MIAM_START) {
          Object.assign(req.session.userCase, getMIAMDetails(respondent, req));
        }
        if (element === RESPONSE_CITIZEN_INTERNATIONAL_ELEMENTS && redirectUrl === Urls.INTERNATIONAL_FACTORS_START) {
          Object.assign(req.session.userCase, getInternationalFactorsDetails(respondent, req));
        }
      }
    });
    req.session.save(() => res.redirect(redirectUrl));
  }

  private getName(req: AppRequest) {
    const caption = req.query['name'] as string;
    return caption;
  }
}
