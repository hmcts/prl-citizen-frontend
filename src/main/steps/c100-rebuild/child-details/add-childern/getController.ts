import autobind from 'autobind-decorator';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { FieldPrefix } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../../app/controller/GetController';
import { Language, generatePageContent } from '../../../../steps/common/common.content';

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
    const listOfChild = req.session.settings.ListOfChild.length
      ? req.session.settings.ListOfChild
      : [{ id: uuidv4().toString(), firstname: '', lastname: '' }];
    if (req.session?.errors) {
      req.session.errors = undefined;
    }
    super.clearConfidentialitySessionSaveData(req);

    this.addChildQueryInSession(req, res);
    res.render(this.view, {
      ...content,
      sessionErrors,
      htmlLang: language,
      childernForms: req.session.settings?.['toggleChild'],
      formaction: req.originalUrl,
      listedChildern: listOfChild,
    });
  }

  public addChildQueryInSession = (req: AppRequest, res: Response) => {
    if (req.query.hasOwnProperty('addChild')) {
      const { addChild } = req.query;
      switch (addChild) {
        case 'true':
          console.log({ addChild });
          break;

        default:
          res.render('error');
      }
    }
  };
}
