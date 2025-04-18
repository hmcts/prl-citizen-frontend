/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100RebuildPartyDetails } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { getPartyDetails, updatePartyDetails } from '../../people/util';

import { getFormFields } from './content';

@autobind
export default class OtherPersonConfidentialityPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const otherPersonId = req.params.otherPersonId;
    const form = new Form(getFormFields(req.session.userCase, otherPersonId).fields as FormFields);
    const { onlycontinue, saveAndComeLater, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    const { confidentiality } = formData as Record<string, any>;
    req.session.errors = form.getErrors(formData);

    if (req.session.errors.length) {
      return this.redirect(req, res);
    }

    req.session.userCase.oprs_otherPersons = updatePartyDetails(
      {
        ...(getPartyDetails(otherPersonId, req.session.userCase.oprs_otherPersons) as C100RebuildPartyDetails),
        isOtherPersonAddressConfidential: confidentiality,
      },
      req.session.userCase.oprs_otherPersons
    ) as C100RebuildPartyDetails[];

    if (onlycontinue) {
      return super.redirect(req, res);
    } else if (saveAndComeLater) {
      super.saveAndComeLater(req, res, { oprs_otherPersons: req.session.userCase.oprs_otherPersons });
    }
  }
}
