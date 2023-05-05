import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { Applicant, Respondent } from '../../../app/case/definition';
import { toApiFormat } from '../../../app/case/to-api-format';
import type { AppRequest } from '../../../app/controller/AppRequest';
// import { AnyObject, PostController } from '../../../app/controller/PostController';
import { APPLICANT_TASK_LIST_URL, RESPONDENT_TASK_LIST_URL, RESPOND_TO_APPLICATION } from '../../../steps/urls';

import { prepareRequest } from './SupportYouNeedDuringYourCaseService';
@autobind
export class SupportYouNeedDuringYourCaseController {
  // constructor(protected readonly fields: FormFields | FormFieldsFn) {
  //   super(fields);
  // }
  public async post(req: AppRequest, res: Response): Promise<void> {
    try {
      const caseworkerUser = req.session.user;
      const caseReference = req.session.userCase.id;

      const client = new CosApiClient(caseworkerUser.accessToken, 'https://return-url');

      const caseDataFromCos = await client.retrieveByCaseId(caseReference, caseworkerUser);
      Object.assign(req.session.userCase, caseDataFromCos);

      if (req.url.includes('respondent') || req.url.includes('tasklistresponse')) {
        if ('C100' === req.session.userCase.caseTypeOfApplication) {
          req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
            if (req.url.includes('support-you-need-during-case')) {
              respondent.value.response['supportYouNeed'] = prepareRequest(req.session.userCase);
            }
            //}
          });
        } else {
          if (req.url.includes('support-you-need-during-case')) {
            req.session.userCase.respondentsFL401!.response['supportYouNeed'] = prepareRequest(req.session.userCase);
          }
        }
      } else if (req.url.includes('applicant')) {
        if ('C100' === req.session.userCase.caseTypeOfApplication) {
          req.session.userCase?.applicants?.forEach((applicant: Applicant) => {
            if (applicant?.value?.user?.idamId === req.session?.user.id) {
              if (req.url.includes('support-you-need-during-case')) {
                applicant.value.response['supportYouNeed'] = prepareRequest(req.session.userCase);
              }
            }
          });
        } else {
          if (req.url.includes('support-you-need-during-case')) {
            req.session.userCase.applicantsFL401!.response['supportYouNeed'] = prepareRequest(req.session.userCase);
          }
        }
      }
      const caseData = toApiFormat(req?.session?.userCase);
      caseData.id = caseReference;
      const updatedCaseDataFromCos = await client.updateCase(
        caseworkerUser,
        caseReference,
        caseData,
        'legalRepresentation'
      );
      Object.assign(req.session.userCase, updatedCaseDataFromCos);
      let return_url = RESPONDENT_TASK_LIST_URL;
      if (req.url.includes('applicant')) {
        return_url = APPLICANT_TASK_LIST_URL;
      } else if (req.url.includes('tasklistresponse')) {
        return_url = RESPOND_TO_APPLICATION;
      }
      req.session.save(() => res.redirect(return_url));
    } catch (err) {
      throw new Error('SafetyConcernsPostController - Case could not be updated.');
    }
  }
}
