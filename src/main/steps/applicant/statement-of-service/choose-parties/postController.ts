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
import { Form, FormError, FormFields, FormFieldsFn } from '../../../../app/form/Form';

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
      if (req.session.userCase?.['applicantUploadFiles']?.length !== 0) {
        const document = req.session.userCase?.['applicantUploadFiles']![0];
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

      req.session.userCase?.['applicantUploadFiles']?.push(response.document);
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
      const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase, req) : this.fields;
      const form = new Form(fields);
      const { _csrf, ...formData } = form.getParsedBody(req.body);
      const formErrors: FormError[] = form.getErrors(formData);
      if (formErrors.length > 0) {
        return super.redirect(req, res);
      }
      req.session.userCase.sos_partiesServed = formData['sos_partiesServed'];
      req.session.userCase['sos_partiesServedDate-day'] = formData['sos_partiesServedDate-day'];
      req.session.userCase['sos_partiesServedDate-month'] = formData['sos_partiesServedDate-month'];
      req.session.userCase['sos_partiesServedDate-year'] = formData['sos_partiesServedDate-year'];

      // req.session.userCase['sos_partiesServedDate'] = new Date(
      //   formData['sos_partiesServedDate-year'],
      //   formData['sos_partiesServedDate-month'] - 1,
      //   formData['sos_partiesServedDate-day']
      // );
      req.session.save(() =>
        res.redirect(applyParms(APPLICANT_STATEMENT_OF_SERVICE_SUMMARY, { context: req.params.context }))
      );
    }
  }
}
