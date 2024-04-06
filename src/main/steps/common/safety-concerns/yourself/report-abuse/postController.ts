import autobind from 'autobind-decorator';
import { Response } from 'express';

import { Case } from '../../../../../app/case/case';
import { C1AAbuseTypes, C1ASafteyConcerns } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { transformAbuseFormData } from '../../util';

import { getFormFields } from './content';
import { C100_URL } from '../../../../urls';

@autobind
export default class SafteyConcernsApplicantAbusePostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const abuseType = req.params.abuseType as C1AAbuseTypes;
    const form = new Form(getFormFields(req, abuseType).fields as FormFields);
    const { onlycontinue, saveAndComeLater, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    const C100RebuildJourney=req.originalUrl.startsWith(C100_URL)
    if(C100RebuildJourney){
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
    } else if (saveAndComeLater && C100RebuildJourney) {
      super.saveAndComeLater(req, res, { ...applicantAbuseData });
    }
  } else{
    const respondentAbuseData: Partial<Case> = {
      c1A_safteyConcerns: {
        ...(req.session.userCase?.c1A_safteyConcerns ?? {}),
        respondent: {
          ...((req.session.userCase?.c1A_safteyConcerns?.respondent ?? {}) as C1ASafteyConcerns['respondent']),
          [abuseType]: transformAbuseFormData(formData),
        },
      },
    };

    req.session.userCase = {
      ...(req.session?.userCase ?? {}),
      ...respondentAbuseData,
    };
    if (onlycontinue) {
      super.redirect(req, res);
    }
  }
  
  }
}
