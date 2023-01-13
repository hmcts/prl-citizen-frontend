/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100Applicant } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { getApplicantDetails, transformFormData, updateApplicantDetails } from '../util';

import { getFormFields } from './content';

@autobind
export default class PersonaldetailsPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const applicantId = req.params.applicantId as C100Applicant['id'];
    let language=req.acceptsLanguages();
    const form = new Form(getFormFields(req.session.userCase, applicantId,language).fields as FormFields);
    const { onlycontinue, saveAndComeLater, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    const applicantPersonDetails = getApplicantDetails(
      req.session.userCase.appl_allApplicants!,
      applicantId
    ) as C100Applicant;
    Object.assign(applicantPersonDetails.personalDetails, transformFormData('personalDetails', formData));
    req.session.userCase.appl_allApplicants = updateApplicantDetails(
      req.session.userCase.appl_allApplicants!,
      applicantPersonDetails
    );

    if (onlycontinue) {
      req.session.errors = form.getErrors(formData);
      return super.redirect(req, res);
    } else if (saveAndComeLater) {
      super.saveAndComeLater(req, res, { appl_allApplicants: req.session.userCase.appl_allApplicants });
    }
  }
}
