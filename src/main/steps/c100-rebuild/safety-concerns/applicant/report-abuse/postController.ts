import autobind from 'autobind-decorator';
import { Response } from 'express';

import { Case } from '../../../../../app/case/case';
import { C1AAbuseTypes, C1ASafteyConcerns } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { transformAbuseFormData } from '../../util';

import { getFormFields } from './content';

@autobind
export default class SafteyConcernsApplicantAbusePostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const abuseType = req.query.type as C1AAbuseTypes;
    const form = new Form(getFormFields().fields as FormFields);
    const { onlycontinue, saveAndComeLater, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    const applicantAbuseData: Partial<Case> = {
      c1A_safteyConcerns: {
        ...(req.session.userCase?.c1A_safteyConcerns ?? {}),
        applicant: {
          ...((req.session.userCase?.c1A_safteyConcerns?.applicant ?? {}) as C1ASafteyConcerns['applicant']),
          [abuseType]: transformAbuseFormData(formData),
        },
      },
    };

    req.session.userCase = {
      ...(req.session?.userCase ?? {}),
      ...applicantAbuseData,
    };

    if (onlycontinue) {
      super.redirect(req, res);
    } else if (saveAndComeLater) {
      super.saveAndComeLater(req, res, { ...applicantAbuseData });
    }
  }
}
