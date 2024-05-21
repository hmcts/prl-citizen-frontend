/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { PartyType, YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { applyParms } from '../../../../steps/common/url-parser';
import { UPLOAD_STATEMENT_OF_SERVICE } from '../../../../steps/urls';
import { handleError, removeUploadDocErrors } from '../utils';

@autobind
export default class SOSUploadDocumentPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  private async uploadDocument(req: AppRequest, res: Response): Promise<void> {
    const { session, files } = req;
    const { user, userCase: caseData } = session;
    const client = new CosApiClient(user.accessToken, req.locals.logger);

    if (!files) {
      req.session.errors = handleError(req.session.errors, 'empty');
      return this.redirect(req, res);
    }

    if (caseData?.sos_document?.document_binary_url) {
      req.session.errors = handleError(req.session.errors, 'multipleFiles');
      return this.redirect(req, res);
    }

    try {
      const response = await client.uploadDocument(user, {
        files: [files['statementOfServiceDoc']],
      });

      if (response.status !== 'Success') {
        req.session.errors = handleError(req.session.errors, 'uploadError', true);
        return;
      }

      caseData.sos_document = response.document;
      req.session.errors = removeUploadDocErrors(req.session.errors);
    } catch (e) {
      req.session.errors = handleError(req.session.errors, 'uploadError', true);
    } finally {
      this.redirect(req, res);
    }
  }

  private async submitDocument(req: AppRequest, res: Response): Promise<void> {
    const { user, userCase: caseData } = req.session;
    const fields = typeof this.fields === 'function' ? this.fields(caseData, req) : this.fields;
    const form = new Form(fields);
    const { _csrf, ...formData } = form.getParsedBody(req.body);

    req.url = applyParms(UPLOAD_STATEMENT_OF_SERVICE, {
      partyType: PartyType.APPLICANT,
      context: req.params?.context,
    });
    Object.assign(req.session.userCase, formData);
    req.session.errors = form.getErrors(formData);

    if (!caseData?.sos_document?.document_binary_url) {
      req.session.errors = handleError(req.session.errors, 'empty', true);
    }

    if (req.session.errors.length) {
      return this.redirect(req, res);
    }

    try {
      const client = new CosApiClient(user.accessToken, req.locals.logger);
      const partiesServedDate = `${caseData.sos_partiesServedDate!.day}-${caseData.sos_partiesServedDate!.month}-${
        caseData.sos_partiesServedDate!.year
      }`;
      const response = await client.submitStatementOfService(caseData.id, {
        partiesServed: caseData.sos_partiesServed as string[],
        partiesServedDate,
        citizenSosDocs: caseData.sos_document!,
        isOrder: req.params?.context === 'order' ? YesOrNo.YES : YesOrNo.NO,
      });

      if (response.data !== 'Success') {
        req.session.errors = handleError(req.session.errors, 'uploadError', true);
        return;
      }

      req.session.errors = removeUploadDocErrors(req.session.errors);
    } catch (error) {
      req.session.errors = handleError(req.session.errors, 'uploadError', true);
    } finally {
      this.redirect(req, res);
    }
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { onlyContinue: submitDocument, uploadFile } = req.body;

    if (uploadFile) {
      this.uploadDocument(req, res);
    } else if (submitDocument) {
      this.submitDocument(req, res);
    }
  }
}
