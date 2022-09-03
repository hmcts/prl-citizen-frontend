import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../../../app/case/case';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../app/controller/GetController';
import { Language, generatePageContent } from '../../../steps/common/common.content';

@autobind
export default class AddChilderns extends GetController {
  constructor(
    protected readonly view: string,
    protected readonly content: TranslationFn,
    protected readonly fieldPrefix: FieldPrefix
  ) {
    super(view, content);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (res.locals.isError || res.headersSent) {
      return;
    }

    const language = super.getPreferredLanguage(req) as Language;

    const content = generatePageContent({
      language,
      pageContent: this.content,
      userCase: req.session?.userCase,
      userEmail: req.session?.user?.email,
    });

    const sessionErrors = req.session?.errors || [];
    if (req.session.settings.ListOfChild.length > 0) {
      req.session.userCase['childernDetails'] = req['session']['settings']['ListOfChild'];
    }
    if (req.session?.errors) {
      req.session.errors = undefined;
    }

    res.render(this.view, {
      ...content,
      sessionErrors,
      htmlLang: language,
    });
  }
}
