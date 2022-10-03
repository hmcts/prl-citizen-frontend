import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../../app/controller/GetController';
import { Language, generatePageContent } from '../../../common/common.content';
import { C100_CHILDERN_DETAILS_ADD } from '../../../urls';

@autobind
export default class AddChildern extends GetController {
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
    if (!req.session.userCase.hasOwnProperty('tempChildernFormData')) {
      req.session.userCase['tempChildernFormData'] = {
        TempFirstName: '',
        TempLastName: '',
      };
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
    super.clearConfidentialitySessionSaveData(req);
    const checkIFNotRemoveQuery = req.query.hasOwnProperty('action') && req.query.hasOwnProperty('childId');
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
    if (req.query.hasOwnProperty('action') && req.query.hasOwnProperty('childId')) {
      const { action, childId } = req.query;
      switch (action) {
        case 'remove':
          if (req.session.userCase.hasOwnProperty('childern') && req.session.userCase.childern) {
            req.session.userCase['childern'] = req.session.userCase.childern.filter(child => child['id'] !== childId);
            return req.session.save(err => {
              if (err) {
                console.log(err);
              }
              res.redirect(C100_CHILDERN_DETAILS_ADD);
            });
          }
          break;

        default:
          res.redirect('error');
      }
    }
  };
}
