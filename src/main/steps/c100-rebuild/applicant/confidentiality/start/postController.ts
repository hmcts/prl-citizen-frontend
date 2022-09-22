// eslint-disable-next-line import/no-unresolved
import { C100ListOfApplicants, YesOrNo } from 'app/case/definition';
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject } from '../../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../../app/form/Form';
import {
  C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_FEEDBACK,
  C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_FEEDBACK_NO,
} from '../../../../urls';
import { CommonConfidentialityController } from '../common/postController';

@autobind
export default class StartPostController extends CommonConfidentialityController {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const form = new Form(<FormFields>this.fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);
    req.session.errors = form.getErrors(formData);
    let redirectURI = req.originalUrl;
    let applicantData = req.session.userCase['allApplicants'] as C100ListOfApplicants;
    if (req.query['applicantId']) {
      if (req.body['start'] && req.body['start'] !== '') {
        const { applicantId } = req['query'];
        const modifiedApplicantDetails = req.session.userCase.allApplicants?.map(applicant => {
          const applicantInformation = applicant;
          if (applicant['id'] === applicantId) {
            applicantInformation['start'] = req['body']['start'] as string;
            if (req.body['start'] === YesOrNo.NO) {
              applicantInformation['contactDetailsPrivate'] = [] as [];
            } else {
              if ((req['body']['contactDetailsPrivate'] as []) && req.body['contactDetailsPrivate'] !== '') {
                const contactDetailSelection = req['body']['contactDetailsPrivate'] as [];
                applicantInformation['contactDetailsPrivate'] = contactDetailSelection.filter(
                  details => details !== ''
                );
              }
            }
          }
          return applicantInformation;
        }) as [];
        applicantData = modifiedApplicantDetails;
        let redirectURIBasedOnSelection = '';
        const { start } = req.body;
        switch (start) {
          case YesOrNo.YES:
            redirectURIBasedOnSelection = C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_FEEDBACK;
            break;
          case YesOrNo.NO:
            redirectURIBasedOnSelection = C100_APPLICANT_ADD_APPLICANTS_CONFIDENTIALITY_FEEDBACK_NO;
            break;
        }
        redirectURI = redirectURIBasedOnSelection + `?applicantId=${applicantId}`;
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
