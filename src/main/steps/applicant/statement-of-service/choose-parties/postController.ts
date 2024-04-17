/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { handleError, removeUploadDocErrors } from '../../../../../main/steps/common/documents/upload/utils';
import { applyParms } from '../../../../../main/steps/common/url-parser';
import { APPLICANT_STATEMENT_OF_SERVICE } from '../../../../../main/steps/urls';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { CaseWithId } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../app/form/Form';

@autobind
export default class UploadSosPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  private setRedirectUrl(req: AppRequest<Partial<CaseWithId>>) {
    return applyParms(APPLICANT_STATEMENT_OF_SERVICE, {
      context: req.params.context,
    });
  }

  private initializeData(caseData: Partial<CaseWithId>): void {
    if (!caseData?.applicantUploadFiles) {
      caseData['applicantUploadFiles'] = [];
    }
  }

  private async uploadDocument(req: AppRequest, res: Response): Promise<void> {
    const { session, files } = req;
    const { user, userCase: caseData } = session;
    const client = new CosApiClient(user.accessToken, req.locals.logger);
    const redirectUrl = this.setRedirectUrl(req);

    req.url = redirectUrl;
    this.initializeData(caseData);

    if (!files) {
      req.session.errors = handleError(req.session.errors, 'empty');
      return this.redirect(req, res, redirectUrl);
    }

    try {
      const response = await client.uploadStatementDocument(user, {
        files: [files['files[]']],
      });

      if (response.status !== 'Success') {
        req.session.errors = handleError(req.session.errors, 'uploadError', true);
        return;
      }

      req.session.userCase?.['applicantUploadFiles']?.push(response.document);
      req.session.errors = removeUploadDocErrors(req.session.errors);
    } catch (e) {
      req.session.errors = handleError(req.session.errors, 'uploadError', true);
    } finally {
      this.redirect(req, res, redirectUrl);
    }
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { onlyContinue: uploadFile } = req.body;

    if (uploadFile) {
      this.uploadDocument(req, res);
    }
  }
}
