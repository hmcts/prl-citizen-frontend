// eslint-disable-next-line import/no-unresolved
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject } from '../../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { applyParms } from '../../../../../steps/common/url-parser';
import {
  C100_APPLICANT_ADD_APPLICANTS,
  C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_DETAILS_KNOW,
} from '../../../../urls';
import { CommonConfidentialityController } from '../common/postController';

@autobind
export default class FeebackPostController extends CommonConfidentialityController {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { applicantId } = req.params;
    const currentApplicant = req.session.userCase.appl_allApplicants?.findIndex(
      applicant => applicant.id === applicantId
    ) as number;
    let nextURI = '' as string;
    if (req.session.userCase.appl_allApplicants) {
      if (currentApplicant < req.session.userCase.appl_allApplicants?.length - 1) {
        nextURI = applyParms(C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_DETAILS_KNOW, {
          applicantId: req.session.userCase.appl_allApplicants[currentApplicant + 1].id!,
        });
      } else {
        nextURI = C100_APPLICANT_ADD_APPLICANTS;
      }
    }

    super.redirect(req, res, nextURI);
  }
}
