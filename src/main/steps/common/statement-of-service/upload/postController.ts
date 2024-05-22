/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { PartyType } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { applyParms } from '../../../../steps/common/url-parser';
import { UPLOAD_STATEMENT_OF_SERVICE } from '../../../../steps/urls';
import { handleError, removeErrors } from '../utils';

@autobind
export default class SOSUploadDocumentPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  private async uploadDocument(req: AppRequest, res: Response): Promise<void> {
    const { session, files } = req;
    const { user, userCase: caseData } = session;

    req.url = applyParms(UPLOAD_STATEMENT_OF_SERVICE, { partyType: PartyType.APPLICANT, context: req.params.context });

    if (caseData?.sos_document?.document_binary_url) {
      req.session.errors = handleError(req.session.errors, 'multipleFiles');
      return this.redirect(req, res);
    }

    if (!files) {
      req.session.errors = handleError(req.session.errors, 'empty');
      return this.redirect(req, res);
    }

    try {
      const client = new CosApiClient(user.accessToken, req.locals.logger);
      const response = await client.uploadDocument(user, {
        files: [files['statementOfServiceDoc']],
      });

      if (response.status !== 'Success') {
        req.session.errors = handleError(req.session.errors, 'uploadError', true);
        return;
      }

      req.session.userCase.sos_document = response.document;
      req.session.errors = removeErrors(req.session.errors);
    } catch (e) {
      req.session.errors = handleError(req.session.errors, 'uploadError', true);
    } finally {
      this.redirect(req, res, req.url);
    }
  }

  private async onContinue(req: AppRequest, res: Response): Promise<void> {
    const { userCase: caseData } = req.session;

    if (!caseData?.sos_document?.document_binary_url) {
      req.session.errors = handleError(req.session.errors, 'empty', true);
    }

    this.redirect(req, res);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { onlyContinue, uploadFile } = req.body;

    if (uploadFile) {
      this.uploadDocument(req, res);
    } else if (onlyContinue) {
      this.onContinue(req, res);
    }
  }
}
