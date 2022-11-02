/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100RebuildPartyDetails, ChildrenDetails, RelationshipToChildren } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { getRespndentDetails, updateRespondentDetails } from '../util';

import { getFormFields } from './content';

@autobind
export default class RespondentsRelationshipToChildPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const childId = req.params.childId as ChildrenDetails['id'];
    const respondentId = req.params.respondentId as C100RebuildPartyDetails['id'];
    const form = new Form(getFormFields().fields as FormFields);
    const { onlycontinue, saveAndComeLater, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    const respondentDetails = getRespndentDetails(
      req.session.userCase.resp_Respondents!,
      respondentId
    ) as C100RebuildPartyDetails;
    const otherRelationshipTypeSelected =
      formData['otherRelationshipTypeDetails'] !== ''
        ? formData['otherRelationshipTypeDetails']
        : formData['relationshipType'];

    const existingRelationshipToChildren: RelationshipToChildren[] =
      respondentDetails.relationshipDetails.relationshipToChildren;

    const updateOnExistingRelationshipToChild = existingRelationshipToChildren.find(
      relationshipToChildObject => relationshipToChildObject.childId === childId
    );

    if (updateOnExistingRelationshipToChild !== undefined || '') {
      updateOnExistingRelationshipToChild!.relationshipType = otherRelationshipTypeSelected;
    } else {
      if (existingRelationshipToChildren[0].childId === '') {
        existingRelationshipToChildren[0].childId = childId;
        existingRelationshipToChildren[0].relationshipType = otherRelationshipTypeSelected;
      } else {
        const commentData = {} as RelationshipToChildren;
        commentData.childId = childId;
        commentData.relationshipType = otherRelationshipTypeSelected;
        existingRelationshipToChildren.push(commentData);
      }
    }

    req.session.userCase.resp_Respondents = updateRespondentDetails(
      req.session.userCase.resp_Respondents!,
      respondentDetails
    );
    if (onlycontinue) {
      req.session.errors = form.getErrors(formData);
      return super.redirect(req, res);
    } else if (saveAndComeLater) {
      super.saveAndComeLater(req, res, { cd_children: req.session.userCase.cd_children });
    }
  }
}
