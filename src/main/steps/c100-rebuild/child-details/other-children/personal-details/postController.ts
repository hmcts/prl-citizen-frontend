/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { OtherChildrenDetails, PartyType } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { PartyDetailsVariant, getPartyDetails, transformPartyDetails, updatePartyDetails } from '../../../people/util';

import { getFormFields } from './content';

@autobind
export default class PersonaldetailsPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const childId = req.params.childId;
    let language=req.acceptsLanguages();
    const form = new Form(getFormFields(req.session.userCase, childId,language).fields as FormFields);
    const { onlycontinue, saveAndComeLater, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);

    req.session.userCase.ocd_otherChildren = updatePartyDetails(
      {
        ...(getPartyDetails(childId, req.session.userCase.ocd_otherChildren) as OtherChildrenDetails),
        personalDetails: transformPartyDetails(
          PartyType.OTHER_CHILDREN,
          PartyDetailsVariant.PERSONAL_DETAILS,
          formData
        ) as OtherChildrenDetails['personalDetails'],
      },
      req.session.userCase.ocd_otherChildren
    ) as OtherChildrenDetails[];

    if (onlycontinue) {
      req.session.errors = form.getErrors(formData);
      return super.redirect(req, res);
    } else if (saveAndComeLater) {
      super.saveAndComeLater(req, res, { ocd_otherChildren: req.session.userCase.ocd_otherChildren });
    }
  }
}
