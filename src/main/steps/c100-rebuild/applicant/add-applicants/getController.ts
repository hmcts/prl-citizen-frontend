import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../../app/controller/GetController';
import { Language, generatePageContent } from '../../../../steps/common/common.content';
import { C100_APPLICANT_ADD_APPLICANTS } from '../../../urls';

@autobind
export default class AddApplicants extends GetController {
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
    if (!req.session.userCase.hasOwnProperty('applicantTemporaryFormData')) {
      req.session.userCase['applicantTemporaryFormData'] = {
        TempFirstName: '',
        TempLastName: '',
      };
    }
    if (!req.session.userCase.hasOwnProperty('appl_allApplicants')) {
      req.session.userCase['appl_allApplicants'] = [];
    }
    const language = super.getPreferredLanguage(req) as Language;

    const content = generatePageContent({
      language,
      pageContent: this.content,
      userCase: req.session?.userCase,
      userEmail: req.session?.user?.email,
      additionalData: {
        req,
      },
    });

    const sessionErrors = req.session?.errors || [];
    if (req.session?.errors) {
      req.session.errors = undefined;
    }
    const checkIFNotRemoveQuery = req.query.hasOwnProperty('action') && req.query.hasOwnProperty('applicantId');
    if (checkIFNotRemoveQuery) {
      this.removeApplicantUsingId(req, res);
    } else {
      res.render(this.view, {
        ...content,
        sessionErrors,
        htmlLang: language,
        tempFirstName: '',
        tempLastName: '',
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public removeApplicantUsingId = (req: AppRequest, res: Response) => {
    if (req.query.hasOwnProperty('action') && req.query.hasOwnProperty('applicantId')) {
      const { action, applicantId } = req.query;
      switch (action) {
        case 'remove':
          if (req.session.userCase.hasOwnProperty('appl_allApplicants') && req.session.userCase.appl_allApplicants) {
            req.session.userCase['appl_allApplicants'] = req.session.userCase.appl_allApplicants.filter(
              applicant => applicant['id'] !== applicantId
            );
            return req.session.save(err => {
              if (err) {
                req.locals.logger.error(err);
              }
              res.redirect(C100_APPLICANT_ADD_APPLICANTS);
            });
          }
          break;

        default:
          res.redirect('error');
      }
    }
  };
}
