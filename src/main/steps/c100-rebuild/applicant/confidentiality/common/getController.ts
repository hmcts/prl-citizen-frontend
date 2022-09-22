import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../../../../../app/case/case';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../../../app/controller/GetController';
import { Language, generatePageContent } from '../../../../../steps/common/common.content';

@autobind
export class CommonConfidentialityController extends GetController {
  constructor(
    protected readonly view: string,
    protected readonly content: TranslationFn,
    protected readonly fieldPrefix: FieldPrefix
  ) {
    super(view, content);
  }

  public async get(req: AppRequest, res: Response, routedField?: object): Promise<void> {
    if (res.locals.isError || res.headersSent) {
      return;
    }

    if (!req.query.hasOwnProperty('applicantId')) {
      res.render('error');
    } else {
      const language = super.getPreferredLanguage(req) as Language;

      const content = generatePageContent({
        language,
        pageContent: this.content,
        userCase: req.session?.userCase,
        userEmail: req.session?.user?.email,
        userId: req.query?.['applicantId'] as string,
      });

      const sessionErrors = req.session?.errors || [];

      if (req.session?.errors) {
        req.session.errors = undefined;
      }
      super.clearConfidentialitySessionSaveData(req);

      res.render(this.view, {
        ...content,
        sessionErrors,
        htmlLang: language,
        ...routedField,
      });
    }
  }
}
