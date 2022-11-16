/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { ChildrenDetails, PartyType } from '../../../app/case/definition';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { PartyDetailsVariant, getPartyDetails, transformPartyDetails, updatePartyDetails } from '../people/util';

import { getFormFields } from './personal-details/content';

@autobind
export default class ChildDetailsPostController {
  private parent;

  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    this.parent = new PostController(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const childId = req.params.childId as ChildrenDetails['id'];
    const form = new Form(getFormFields().fields as FormFields);
    const { _ctx, onlycontinue, saveAndComeLater, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    let data;

    if (_ctx === 'pd') {
      data = {
        personalDetails: transformPartyDetails(
          PartyType.CHILDREN,
          PartyDetailsVariant.PERSONAL_DETAILS,
          formData
        ) as ChildrenDetails['personalDetails'],
      };
    } else if (_ctx === 'pr') {
      data = {
        parentialResponsibility: transformPartyDetails(
          PartyType.CHILDREN,
          PartyDetailsVariant.PARENTAL_RESPONSIBILITY,
          formData
        ) as ChildrenDetails['parentialResponsibility'],
      };
    }

    req.session.userCase.cd_children = updatePartyDetails(req.session.userCase.cd_children, {
      ...(getPartyDetails(req.session.userCase.cd_children!, childId) as ChildrenDetails),
      ...data,
    }) as ChildrenDetails[];

    if (onlycontinue) {
      req.session.errors = form.getErrors(formData);
      return this.parent.redirect(req, res);
    } else if (saveAndComeLater) {
      this.parent.saveAndComeLater(req, res, { cd_children: req.session.userCase.cd_children });
    }
  }
}
