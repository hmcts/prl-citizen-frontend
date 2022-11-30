import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100Address, C100RebuildPartyDetails, PartyType } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { PartyDetailsVariant, getPartyDetails, transformPartyDetails, updatePartyDetails } from '../../../people/util';

import { getUpdatedForm } from './content';

@autobind
export default class ManualAddressPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { respondentId } = req.params;
    const form = new Form(getUpdatedForm().fields as FormFields);
    const { onlycontinue, saveAndComeLater, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);

    req.session.userCase.resp_Respondents = updatePartyDetails(
      {
        ...(getPartyDetails(respondentId, req.session.userCase.resp_Respondents) as C100RebuildPartyDetails),
        address: transformPartyDetails(PartyType.RESPONDENT, PartyDetailsVariant.ADDRESS, formData) as C100Address,
        addressUnknown: formData['addressUnknown'],
      },
      req.session.userCase.resp_Respondents
    ) as C100RebuildPartyDetails[];

    if (onlycontinue) {
      req.session.errors = form.getErrors(formData);
      return this.redirect(req, res);
    } else if (saveAndComeLater) {
      this.saveAndComeLater(req, res, req.session.userCase);
    }
  }
}
