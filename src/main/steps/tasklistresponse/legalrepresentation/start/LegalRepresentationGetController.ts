import autobind from 'autobind-decorator';
import { Response } from 'express';

import { Respondent } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../../app/controller/GetController';
import { Language, generatePageContent } from '../../../../steps/common/common.content';

@autobind
export default class LegalRepresentationGetController extends GetController {
  constructor(protected readonly view: string, protected readonly content: TranslationFn) {
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
    });
    if (!req.session.errors) {
      req.session.errors = [];
    }
    const sessionErrors = req.session?.errors || [];
    let formaction = '';
    req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
      if (respondent?.value?.user?.idamId === req.session?.user.id) {
        formaction = respondent.value.response.legalRepresentation || req.session.userCase.legalRepresentation || '';
      }
    });
    res.render(this.view, {
      ...content,
      sessionErrors,
      htmlLang: language,
      formaction,
      userIdamId: req.session?.user?.id,
    });
  }
}
