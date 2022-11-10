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
export default class ContactDetailsPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const respondentId = req.params.respondentId as C100RebuildPartyDetails['id'];
    const form = new Form(getFormFields().fields as FormFields);
    const { onlycontinue, saveAndComeLater, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    const { donKnowEmailAddress, emailAddress, telephoneNumber, donKnowTelephoneNumber } = formData as Record<
      string,
      any
    >;
    const respondentContactDetails = getPartyDetails(
      req.session.userCase.resp_Respondents!,
      respondentId
    ) as C100RebuildPartyDetails;
    respondentContactDetails.contactDetails = {
      donKnowEmailAddress,
      emailAddress,
      telephoneNumber,
      donKnowTelephoneNumber,
    };
    req.session.userCase.resp_Respondents = updatePartyDetails(
      req.session.userCase.resp_Respondents!,
      respondentContactDetails
    ) as C100RebuildPartyDetails[];

    if (onlycontinue) {
      req.session.errors = form.getErrors(formData);
      return super.redirect(req, res);
    } else if (saveAndComeLater) {
      super.saveAndComeLater(req, res, { resp_Respondents: req.session.userCase.resp_Respondents });
    }
  }
}
