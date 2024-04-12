import autobind from 'autobind-decorator';
import { Response } from 'express';

import { FieldPrefix } from '../../../../../main/app/case/case';
import { AppRequest } from '../../../../../main/app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../../../main/app/controller/GetController';
import { APPLICANT_STATEMENT_OF_SERVICE } from '../../../../../main/steps/urls';
import { applyParms } from '../../../../steps/common/url-parser';

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyType = any;

@autobind
export default class DocumentUpload extends GetController {
  constructor(
    protected readonly view: string,
    protected readonly content: TranslationFn,
    protected readonly fieldPrefix: FieldPrefix
  ) {
    super(view, content);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    if (res.headersSent || res.locals.isError) {
      return;
    }
    // if (!req.session.userCase.partiesServed) {
    //   req.session.errors?.push({
    //     propertyName: 'partiesServed',
    //     errorType: 'required',
    //   });
    // }
    // if (
    //   !(
    //     req.session.userCase['partiesServedDate-day'] ||
    //     req.session.userCase['partiesServedDate-month'] ||
    //     req.session.userCase['partiesServedDate-year']
    //   )
    // ) {
    //   req.session.errors?.push({
    //     propertyName: 'partiesServedDate',
    //     errorType: 'required',
    //   });
    // }
    // if (!req.session.userCase.applicantUploadFiles || req.session.userCase.applicantUploadFiles.length === 0) {
    //   req.session.errors?.push({
    //     propertyName: 'document',
    //     errorType: 'required',
    //   });
    // }
    if (req.session.errors && req.session.errors.length > 0) {
      req.session.save(err => {
        if (err) {
          throw err;
        }
        res.redirect(`${applyParms(APPLICANT_STATEMENT_OF_SERVICE, { context: req.params.context })}`);
      });
    } else {
      super.get(req, res);
    }
  }
}
