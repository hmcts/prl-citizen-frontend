import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../../app/controller/GetController';
import { Language, generatePageContent } from '../../../../steps/common/common.content';
import {C100_OTHER_PROCEEDINGS_EMERGENCY_UPLOAD} from '../../../urls'

@autobind
export default class EmergencyDocumentUpload extends GetController {
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

    const { orderType } = req.query;

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

    res.render(this.view, {
      ...content,
      sessionErrors,
      htmlLang: language,
      orderType,
      postURL: C100_OTHER_PROCEEDINGS_EMERGENCY_UPLOAD,
    });
  }
}
