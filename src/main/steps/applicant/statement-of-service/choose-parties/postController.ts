/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { handleError, removeUploadDocErrors } from '../../../../../main/steps/common/documents/upload/utils';
import { applyParms } from '../../../../../main/steps/common/url-parser';
import { APPLICANT_STATEMENT_OF_SERVICE, APPLICANT_STATEMENT_OF_SERVICE_SUMMARY } from '../../../../../main/steps/urls';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { CaseWithId } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';

import { getFormFields } from './content';

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

  private async uploadDocument(req: AppRequest, res: Response): Promise<void> {
    const { session, files } = req;
    const { user } = session;
    const client = new CosApiClient(user.accessToken, req.locals.logger);
    const redirectUrl = this.setRedirectUrl(req);

    req.url = redirectUrl;

    if (!files) {
      req.session.errors = handleError(req.session.errors, 'empty');
      return this.redirect(req, res, redirectUrl);
    }

    try {
      if (req.session.userCase.statementOfServiceDocument) {
        const document = req.session.userCase.statementOfServiceDocument;
        const documentId = document.document_url.substring(document.document_url.lastIndexOf('/') + 1) as string;
        await client.deleteCitizenStatementDocument(documentId);
      }
      const response = await client.uploadStatementDocument(user, {
        files: [files['files[]']],
      });
      if (response.status !== 'Success') {
        req.session.errors = handleError(req.session.errors, 'uploadError', true);
        return;
      }
      req.session.userCase.statementOfServiceDocument = response.document;
      req.session.errors = removeUploadDocErrors(req.session.errors);
    } catch (e) {
      req.session.errors = handleError(req.session.errors, 'uploadError', true);
    } finally {
      this.redirect(req, res, redirectUrl);
    }
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const uploadFile = req.body.uploadFile;

    if (uploadFile) {
      this.uploadDocument(req, res);
    } else {
      const form = new Form(getFormFields(req.session.userCase).fields as FormFields);
      const { _csrf, ...formData } = form.getParsedBody(req.body);
      if (!req.session.errors) {
        req.session.errors = [];
      }
      req.session.errors = form.getErrors(formData);
      if (req.session.errors.length > 0) {
        req.session.save(() =>
          res.redirect(applyParms(APPLICANT_STATEMENT_OF_SERVICE_SUMMARY, { context: req.params.context }))
        );
        return;
      }
      req.session.userCase.sos_partiesServed = formData['sos_partiesServed'];
      req.session.userCase.sos_partiesServedDate = formData['sos_partiesServedDate'];
      req.session.save(() =>
        res.redirect(applyParms(APPLICANT_STATEMENT_OF_SERVICE_SUMMARY, { context: req.params.context }))
      );
    }
  }
}
