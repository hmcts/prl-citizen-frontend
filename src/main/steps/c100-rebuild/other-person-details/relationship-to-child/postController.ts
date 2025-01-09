/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100RebuildPartyDetails } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { cleanOtherRelationshipDetails, getPartyDetails, updatePartyDetails } from '../../people/util';

import { getFormFields } from './content';

@autobind
export default class OtherPersonsRelationshipToChildPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const childId = req.params.childId;
    const otherPersonId = req.params.otherPersonId;
    const form = new Form(getFormFields(req.session.userCase, otherPersonId, childId).fields as FormFields);
    const { onlycontinue, saveAndComeLater, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    const { relationshipType, otherRelationshipTypeDetails } = formData as Record<string, any>;
    const otherPersonDetails = getPartyDetails(
      otherPersonId,
      req.session.userCase.oprs_otherPersons
    ) as C100RebuildPartyDetails;

    const otherRelationshipDetails = cleanOtherRelationshipDetails(relationshipType, otherRelationshipTypeDetails);

    if (otherPersonDetails.relationshipDetails.relationshipToChildren.length) {
      const matchingChildRelationshipIndex = otherPersonDetails.relationshipDetails.relationshipToChildren.findIndex(
        relationshipToChildObject => relationshipToChildObject.childId === childId
      );

      if (matchingChildRelationshipIndex >= 0) {
        otherPersonDetails.relationshipDetails.relationshipToChildren[matchingChildRelationshipIndex] = {
          childId,
          relationshipType,
          otherRelationshipTypeDetails: otherRelationshipDetails,
        };
      } else {
        pushRelationshipDataToOtherPerson(otherPersonDetails, childId, relationshipType, otherRelationshipDetails);
      }
    } else {
      pushRelationshipDataToOtherPerson(otherPersonDetails, childId, relationshipType, otherRelationshipDetails);
    }

    req.session.userCase.oprs_otherPersons = updatePartyDetails(
      otherPersonDetails,
      req.session.userCase.oprs_otherPersons
    ) as C100RebuildPartyDetails[];

    if (onlycontinue) {
      req.session.errors = form.getErrors(formData);
      return super.redirect(req, res);
    } else if (saveAndComeLater) {
      super.saveAndComeLater(req, res, { cd_children: req.session.userCase.cd_children });
    }
  }
}

function pushRelationshipDataToOtherPerson(
  otherPersonDetails: C100RebuildPartyDetails,
  childId: string,
  relationshipType: any,
  otherRelationshipTypeDetails: any
) {
  otherPersonDetails.relationshipDetails.relationshipToChildren.push({
    childId,
    relationshipType,
    otherRelationshipTypeDetails,
  });
}
