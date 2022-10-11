import autobind from 'autobind-decorator';
import { Response } from 'express';

import { Respondent } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../app/controller/GetController';

@autobind
export default class DocumentManagementGetController extends GetController {
  constructor(protected readonly view: string, protected readonly content: TranslationFn) {
    super(view, content);
  }
  public async get(req: AppRequest, res: Response): Promise<void> {
    if (res.locals.isError || res.headersSent) {
      return;
    }

    req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
      if (respondent?.value?.user?.idamId === req.session?.user.id) {
        req.session.userCase.start = undefined;
        req.session.userCase.applicantUploadFiles = undefined;
        req.session.userCase.declarationCheck = undefined;
      }
    });
  }
}
