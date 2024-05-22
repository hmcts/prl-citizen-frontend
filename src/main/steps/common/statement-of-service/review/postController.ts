/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';

@autobind
export default class SOSReviewPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  private async submitDocument(req: AppRequest, res: Response): Promise<void> {
    const { user, userCase: caseData } = req.session;
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase, req) : this.fields;
    const form = new Form(fields);
    const { _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.errors = form.getErrors(formData);

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
        return this.redirect(req, res, req.url);
      }

      this.redirect(req, res);
    } catch (error) {
      this.redirect(req, res, req.url);
    }
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { onlyContinue: submitDocument } = req.body;

    if (submitDocument) {
      this.submitDocument(req, res);
    }
  }
}
