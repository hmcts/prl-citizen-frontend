/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100RebuildPartyDetails, ChildrenDetails } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { getPartyDetails, updatePartyDetails } from '../../people/util';

import { getFormFields } from './content';

@autobind
export default class RespondentsRelationshipToChildPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const childId = req.params.childId as ChildrenDetails['id'];
    const respondentId = req.params.respondentId as C100RebuildPartyDetails['id'];
    const form = new Form(getFormFields(req.session.userCase, respondentId, childId).fields as FormFields);
    const { onlycontinue, saveAndComeLater, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    const { relationshipType, otherRelationshipTypeDetails } = formData as Record<string, any>;
    const respondentDetails = getPartyDetails(
      respondentId,
      req.session.userCase.resp_Respondents
    ) as C100RebuildPartyDetails;

    if (respondentDetails.relationshipDetails.relationshipToChildren.length) {
      const matchingChildRelationshipIndex = respondentDetails.relationshipDetails.relationshipToChildren.findIndex(
        relationshipToChildObject => relationshipToChildObject.childId === childId
      );

      if (matchingChildRelationshipIndex >= 0) {
        respondentDetails.relationshipDetails.relationshipToChildren[matchingChildRelationshipIndex] = {
          childId,
          relationshipType,
          otherRelationshipTypeDetails,
        };
      } else {
        pushRelationshipDataToRespondent(respondentDetails, childId, relationshipType, otherRelationshipTypeDetails);
      }
    } else {
      pushRelationshipDataToRespondent(respondentDetails, childId, relationshipType, otherRelationshipTypeDetails);
    }

    req.session.userCase.resp_Respondents = updatePartyDetails(
      respondentDetails,
      req.session.userCase.resp_Respondents
    ) as C100RebuildPartyDetails[];
    if (onlycontinue) {
      req.session.errors = form.getErrors(formData);
      return super.redirect(req, res);
    } else if (saveAndComeLater) {
      super.saveAndComeLater(req, res, { cd_children: req.session.userCase.cd_children });
    }
  }
}
function pushRelationshipDataToRespondent(
  respondentDetails: C100RebuildPartyDetails,
  childId: string,
  relationshipType: any,
  otherRelationshipTypeDetails: any
) {
  respondentDetails.relationshipDetails.relationshipToChildren.push({
    childId,
    relationshipType,
    otherRelationshipTypeDetails,
  });
}
