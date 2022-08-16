import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../../app/controller/GetController';
import { Language, generatePageContent } from '../../../../steps/common/common.content';

@autobind
export default class Personaldetails extends GetController {
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

    if (!req.query.hasOwnProperty('childId')) {
      res.render('error');
    } else {
      const { childId } = req.query;
      const childDetails = req.session.settings.ListOfChild.filter(child => child.id === childId)[0];

      const language = super.getPreferredLanguage(req) as Language;

      const content = generatePageContent({
        language,
        pageContent: this.content,
        userCase: req.session?.userCase,
        userEmail: req.session?.user?.email,
      });

      const sessionErrors = req.session?.errors || [];

      if (req.session?.errors) {
        req.session.errors = undefined;
      }
      super.clearConfidentialitySessionSaveData(req);

      const sexOfChild = childDetails?.personalDetails?.Sex;
      const dobOfchild = childDetails?.personalDetails?.DateoBirth?.split('/');
      const dob = {
        year: dobOfchild?.[2],
        month: dobOfchild?.[1],
        day: dobOfchild?.[0],
      };

      res.render(this.view, {
        ...content,
        sessionErrors,
        htmlLang: language,
        childernForms: req.session.settings?.['toggleChild'],
        formaction: req.originalUrl,
        listedChildern: req.session.settings.ListOfChild,
        childDetails,
        sexOfChild,
        dob,
      });
    }
  }
}
