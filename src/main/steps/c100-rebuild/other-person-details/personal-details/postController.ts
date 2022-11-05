/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100RebuildPartyDetails } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { getOtherPersonDetails, transformFormData, updateOtherPersonDetails } from '../util';

import { getFormFields } from './content';

@autobind
export default class PersonaldetailsPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const otherPersonId = req.params.otherPersonId as C100RebuildPartyDetails['id'];
    const form = new Form(getFormFields().fields as FormFields);
    const { onlycontinue, saveAndComeLater, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    const otherPersonsDetails = getOtherPersonDetails(
      req.session.userCase.oprs_otherPersons!,
      otherPersonId
    ) as C100RebuildPartyDetails;

    Object.assign(otherPersonsDetails.personalDetails, transformFormData('personalDetails', formData));
    req.session.userCase.oprs_otherPersons = updateOtherPersonDetails(
      req.session.userCase.oprs_otherPersons!,
      otherPersonsDetails
    );

    if (onlycontinue) {
      req.session.errors = form.getErrors(formData);
      return super.redirect(req, res);
    } else if (saveAndComeLater) {
      super.saveAndComeLater(req, res, { oprs_otherPersons: req.session.userCase.oprs_otherPersons });
    }
  }
}
