import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100ListOfApplicants } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../../app/form/Form';

@autobind
export class CommonConfidentialityController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(
    req: AppRequest<AnyObject>,
    res: Response,
    redirectURI?: string,
    applicantData?: C100ListOfApplicants
  ): Promise<void> {
    req.session.userCase['appl_allApplicants'] = applicantData as [];
    super.redirect(req as AppRequest<AnyObject>, res as Response, redirectURI as string);
  }
}
