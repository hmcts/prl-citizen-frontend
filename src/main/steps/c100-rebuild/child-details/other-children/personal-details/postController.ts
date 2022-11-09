/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { OtherChildrenDetails } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { getChildDetails, transformOtherChildFormData, updateChildDetails } from '../../util';

import { getFormFields } from './content';

@autobind
export default class PersonaldetailsPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const childId = req.params.childId as OtherChildrenDetails['id'];
    const form = new Form(getFormFields().fields as FormFields);
    const { onlycontinue, saveAndComeLater, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    const childDetails = getChildDetails(req.session.userCase.ocd_otherChildren!, childId) as OtherChildrenDetails;

    Object.assign(childDetails.personalDetails, transformOtherChildFormData('personalDetails', formData));
    req.session.userCase.ocd_otherChildren = updateChildDetails(req.session.userCase.ocd_otherChildren!, childDetails);

    if (onlycontinue) {
      req.session.errors = form.getErrors(formData);
      return super.redirect(req, res);
    } else if (saveAndComeLater) {
      super.saveAndComeLater(req, res, { ocd_otherChildren: req.session.userCase.ocd_otherChildren });
    }
  }
}
