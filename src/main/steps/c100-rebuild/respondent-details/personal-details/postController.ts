/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100RebuildPartyDetails, PartyType } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { PartyDetailsVariant, getPartyDetails, transformPartyDetails, updatePartyDetails } from '../../people/util';

import { getFormFields } from './content';

@autobind
export default class PersonaldetailsPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const respondentId = req.params.respondentId;
    let language=req.acceptsLanguages();
    const form = new Form(getFormFields(req.session.userCase, respondentId,language).fields as FormFields);
    const { onlycontinue, saveAndComeLater, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);

    req.session.userCase.resp_Respondents = updatePartyDetails(
      {
        ...(getPartyDetails(respondentId, req.session.userCase.resp_Respondents) as C100RebuildPartyDetails),
        personalDetails: transformPartyDetails(
          PartyType.RESPONDENT,
          PartyDetailsVariant.PERSONAL_DETAILS,
          formData
        ) as C100RebuildPartyDetails['personalDetails'],
      },
      req.session.userCase.resp_Respondents
    ) as C100RebuildPartyDetails[];

    if (onlycontinue) {
      req.session.errors = form.getErrors(formData);
      return super.redirect(req, res);
    } else if (saveAndComeLater) {
      super.saveAndComeLater(req, res, { resp_Respondents: req.session.userCase.resp_Respondents });
    }
  }
}
