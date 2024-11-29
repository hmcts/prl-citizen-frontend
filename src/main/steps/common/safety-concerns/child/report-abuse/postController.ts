import autobind from 'autobind-decorator';
import { Response } from 'express';

import { Case } from '../../../../../app/case/case';
import { C1AAbuseTypes, C1ASafteyConcerns, YesOrNo } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { C100_URL } from '../../../../../steps/urls';
import { transformAbuseFormData } from '../../util';

import { getFormFields } from './content';

@autobind
export default class SafteyConcernsAbusePostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const abuseType = req.params.abuseType as C1AAbuseTypes;
    const C100RebuildJourney = req.originalUrl.startsWith(C100_URL);
    const form = new Form(getFormFields(req.session.userCase, abuseType, C100RebuildJourney).fields as FormFields);
    const { onlycontinue, saveAndComeLater, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);

    if (req.body['seekHelpFromPersonOrAgency'] === YesOrNo.NO) {
      delete formData['seekHelpDetails'];
    }

    const childAbuseData: Partial<Case> = {
      c1A_safteyConcerns: {
        ...(req.session.userCase?.c1A_safteyConcerns ?? {}),
        child: {
          ...((req.session.userCase?.c1A_safteyConcerns?.child ?? {}) as C1ASafteyConcerns['child']),
          [abuseType]: transformAbuseFormData(formData),
        },
      },
    };

    req.session.userCase = {
      ...(req.session?.userCase ?? {}),
      ...childAbuseData,
    };

    if (onlycontinue) {
      super.redirect(req, res);
    } else if (saveAndComeLater) {
      super.saveAndComeLater(req, res, { ...childAbuseData });
    }
  }
}
