import autobind from 'autobind-decorator';
import { Response } from 'express';

import { Case } from '../../../../../app/case/case';
import { C1AAbuseTypes, C1ASafteyConcerns, C1ASafteyConcernsAbuse } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';

import { getDataShape, getFormFields } from './content';

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
    const dataToSave: Partial<Case> = {
      c1A_safteyConcerns: {
        ...(req.session.userCase?.c1A_safteyConcerns ?? {}),
        applicant: {
          ...((req.session.userCase?.c1A_safteyConcerns?.applicant ?? {}) as C1ASafteyConcerns['applicant']),
          [abuseType]: this.transformFormData(formData),
        },
      },
    };

    req.session.userCase = {
      ...(req.session?.userCase ?? {}),
      ...dataToSave,
    };

    req.session.errors = form.getErrors(formData);

    if (req.session.errors.length) {
      return this.redirect(req, res);
    }

    if (onlycontinue) {
      super.redirect(req, res);
    } else if (saveAndComeLater) {
      super.saveAndComeLater(req, res, { ...dataToSave });
    }
  }

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  private transformFormData(formData: Record<string, any>): C1ASafteyConcernsAbuse {
    return Object.keys(getDataShape()).reduce((transformedData: C1ASafteyConcernsAbuse, fieldName) => {
      if (fieldName in formData && !(fieldName in transformedData)) {
        transformedData[fieldName] = formData[fieldName];
      }

      return transformedData;
    }, {});
  }
}
