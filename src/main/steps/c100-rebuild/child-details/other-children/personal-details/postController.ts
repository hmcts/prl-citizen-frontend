/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { ChildrenDetails } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { getChildDetails, transformFormData, updateChildDetails } from '../../util';

import { getFormFields } from './content';

@autobind
export default class PersonaldetailsPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const childId = req.params.childId as ChildrenDetails['id'];
    const form = new Form(getFormFields().fields as FormFields);
    const { onlycontinue, saveAndComeLater, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    const childDetails = getChildDetails(req.session.userCase.cd_otherChildren!, childId) as ChildrenDetails;

    Object.assign(childDetails.personalDetails, transformFormData('personalDetails', formData));
    req.session.userCase.cd_otherChildren = updateChildDetails(req.session.userCase.cd_otherChildren!, childDetails);

    if (onlycontinue) {
      req.session.errors = form.getErrors(formData);
      return super.redirect(req, res);
    } else if (saveAndComeLater) {
      super.saveAndComeLater(req, res, { cd_otherChildren: req.session.userCase.cd_otherChildren });
    }
  }
}
