// eslint-disable-next-line import/no-unresolved
import { C100ListOfApplicants, YesOrNo } from 'app/case/definition';
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import { applyParms } from '../../../../../steps/common/url-parser';
import {
  C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START,
  C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START_ALTERATIVE,
} from '../../../../urls';
import { CommonConfidentialityController } from '../common/postController';

@autobind
export default class DetailKnownController extends CommonConfidentialityController {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const form = new Form(<FormFields>this.fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);
    req.session.errors = form.getErrors(formData);
    let redirectURI = req.originalUrl;
    let applicantData = req.session.userCase['appl_allApplicants'] as C100ListOfApplicants;
    if (req.params['applicantId']) {
      if (req.body['detailsKnown'] && req.body['detailsKnown'] !== '') {
        const { applicantId } = req['params'];
        const modifiedApplicantDetails = req.session.userCase.appl_allApplicants?.map(applicant => {
          const applicantInformation = applicant;
          if (applicant['id'] === applicantId) {
            applicantInformation['detailsKnown'] = req['body']['detailsKnown'] as string;
          }
          return applicantInformation;
        }) as [];
        applicantData = modifiedApplicantDetails;
        let redirectURIBasedOnSelection = '';
        const { detailsKnown } = req.body;
        switch (detailsKnown) {
          case YesOrNo.YES:
            redirectURIBasedOnSelection = C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START;
            break;
          case YesOrNo.NO:
            redirectURIBasedOnSelection = C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START_ALTERATIVE;
            break;
          default:
            redirectURIBasedOnSelection = C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_START_ALTERATIVE;
        }
        redirectURI = applyParms(redirectURIBasedOnSelection, { applicantId: applicantId as string });
      }
    }
    super.post(
      req as AppRequest<AnyObject>,
      res as Response,
      redirectURI as string,
      applicantData as C100ListOfApplicants
    );
  }
}
