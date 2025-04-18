/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';
import _ from 'lodash';

import { ChildrenDetails } from '../../../../../app/case/definition';
import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { getPartyDetails, updatePartyDetails } from '../../../people/util';
import { getPeople } from '../utils';

import { getFormFields } from './content';

@autobind
export default class ChildMainlyLiveWithPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const childId = req.params.childId;
    const form = new Form(getFormFields(req.session.userCase, childId).fields as FormFields);
    const { onlycontinue, saveAndComeLater, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    const { mainlyLiveWith } = formData as Record<string, any>;
    req.session.errors = form.getErrors(formData);

    if (req.session.errors.length) {
      return this.redirect(req, res);
    }

    req.session.userCase.cd_children = updatePartyDetails(
      {
        ...(getPartyDetails(childId, req.session.userCase.cd_children) as ChildrenDetails),
        mainlyLiveWith: getPeople(req.session.userCase).find(person =>
          _.isString(mainlyLiveWith) ? mainlyLiveWith === person.id : mainlyLiveWith.id === person.id
        ),
      },
      req.session.userCase.cd_children
    ) as ChildrenDetails[];

    if (onlycontinue) {
      return super.redirect(req, res);
    } else if (saveAndComeLater) {
      super.saveAndComeLater(req, res, { cd_children: req.session.userCase.cd_children });
    }
  }
}
