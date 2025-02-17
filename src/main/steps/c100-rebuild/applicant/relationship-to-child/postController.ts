/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { C100Applicant } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { cleanOtherRelationshipDetails } from '../../../c100-rebuild/people/util';
import { getApplicantDetails, updateApplicantDetails } from '../util';

import { getFormFields } from './content';

@autobind
export default class ApplicantRelationshipToChildPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const childId = req.params.childId;
    const applicantId = req.params.applicantId as C100Applicant['id'];
    const form = new Form(getFormFields(req.session.userCase, applicantId, childId).fields as FormFields);
    const { onlycontinue, saveAndComeLater, ...formFields } = req.body;
    const { _csrf, ...formData } = form.getParsedBody(formFields);
    const { relationshipType, otherRelationshipTypeDetails } = formData as Record<string, any>;
    const applicantDetails = getApplicantDetails(
      req.session.userCase.appl_allApplicants!,
      applicantId
    ) as C100Applicant;

    const otherRelationshipDetails = cleanOtherRelationshipDetails(relationshipType, otherRelationshipTypeDetails);

    if (applicantDetails.relationshipDetails!.relationshipToChildren.length) {
      const matchingChildRelationshipIndex = applicantDetails.relationshipDetails!.relationshipToChildren.findIndex(
        relationshipToChildObject => relationshipToChildObject.childId === childId
      );

      if (matchingChildRelationshipIndex >= 0) {
        applicantDetails.relationshipDetails!.relationshipToChildren[matchingChildRelationshipIndex] = {
          childId,
          relationshipType,
          otherRelationshipTypeDetails: otherRelationshipDetails,
        };
      } else {
        pushRelationshipDataToRespondent(applicantDetails, childId, relationshipType, otherRelationshipDetails);
      }
    } else {
      pushRelationshipDataToRespondent(applicantDetails, childId, relationshipType, otherRelationshipDetails);
    }

    req.session.userCase.appl_allApplicants = updateApplicantDetails(
      req.session.userCase.appl_allApplicants!,
      applicantDetails
    );
    if (onlycontinue) {
      req.session.errors = form.getErrors(formData);
      return super.redirect(req, res);
    } else if (saveAndComeLater) {
      super.saveAndComeLater(req, res, { cd_children: req.session.userCase.cd_children });
    }
  }
}
function pushRelationshipDataToRespondent(
  applicantDetails: C100Applicant,
  childId: string,
  relationshipType: any,
  otherRelationshipTypeDetails: any
) {
  applicantDetails.relationshipDetails!.relationshipToChildren.push({
    childId,
    relationshipType,
    otherRelationshipTypeDetails,
  });
}
