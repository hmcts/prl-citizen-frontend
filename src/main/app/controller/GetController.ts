import autobind from 'autobind-decorator';
import { Response } from 'express';
import Negotiator from 'negotiator';

import { LanguageToggle } from '../../modules/i18n';
import BreadcrumbController from '../../steps/common/breadcrumb/BreadcrumbController';
import { CommonContent, Language, generatePageContent } from '../../steps/common/common.content';
import * as Urls from '../../steps/urls';
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

    const name = this.getName(req);
    const language = this.getPreferredLanguage(req) as Language;
    const captionValue = this.getCaption(req);
    const document_type = this.getDocumentType(req);
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
      additionalData: {
        req,
        user: {
          fullname: `${req.session.user?.givenName} ${req.session.user?.familyName}`,
        },
      },
    });

    const sessionErrors = req.session?.errors || [];

    if (req.session?.errors) {
      req.session.errors = undefined;
    }

    if (!req.session.hasOwnProperty('paymentError')) {
      req.session.paymentError = { hasError: false, errorContext: null };
    }
    /**
     * Added for C100 Rebuild
     * Handled scenario where caption is not present as query param
     */
    if (content?.breadcrumb) {
      const { id, href } = content.breadcrumb as Record<string, string>;
      await BreadcrumbController.add({ id, href }, req.session);
    }

    const viewData = {
      ...content,
      sessionErrors,
      htmlLang: language,
      caseId: req.session.userCase?.caseId || req.session.userCase?.id,
      paymentError: req.session.paymentError,
      document_type,
      breadcrumbs: BreadcrumbController.get(req.session, language),
      name,
    };
    //Add caption only if it exists else it will be rendered by specific page
    if (captionValue) {
      Object.assign(viewData, { caption: captionValue });
    }
    res.render(this.view, viewData);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected getPreferredLanguage(req: AppRequest) {
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

  private getName(req: AppRequest) {
    const caption = req.query['name'] as string;
    return caption;
  }
}
