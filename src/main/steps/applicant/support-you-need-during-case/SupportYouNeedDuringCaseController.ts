import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { Case } from '../../../app/case/case';
import { Applicant, Respondent } from '../../../app/case/definition';
import { toApiFormat } from '../../../app/case/to-api-format';
import type { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { APPLICANT_TASK_LIST_URL, RESPONDENT_TASK_LIST_URL, RESPOND_TO_APPLICATION } from '../../../steps/urls';

import { setSupportDetails } from './SupportYouNeedDuringYourCaseService';
@autobind
export class SupportYouNeedDuringYourCaseController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }
  public async post(req: AppRequest, res: Response): Promise<void> {
    try {
      const caseworkerUser = req.session.user;
      const caseReference = req.session.userCase.id;

      const client = new CosApiClient(caseworkerUser.accessToken, 'https://return-url');

      const caseDataFromCos = await client.retrieveByCaseId(caseReference, caseworkerUser);
      Object.assign(req.session.userCase, caseDataFromCos);
      if (req.url.includes('respondent') || req.url.includes('tasklistresponse')) {
        this.getSupportYouNeedForRespondent(req);
      } else if (req.url.includes('applicant')) {
        this.getSupportYouNeedForApplicant(req);
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

  private getSupportYouNeedForApplicant(req: AppRequest<Partial<Case>>) {
    if ('C100' === req.session.userCase.caseTypeOfApplication) {
      req.session.userCase?.applicants?.forEach((applicant: Applicant) => {
        if (applicant?.value?.user?.idamId === req.session?.user.id) {
          if (req.url.includes('support-you-need-during-case')) {
            applicant.value.response = {
              ...applicant.value.response,
              ...setSupportDetails(req),
            };
          }
        }
      });
    } else {
      if (req.url.includes('support-you-need-during-case')) {
        req.session.userCase.applicantsFL401!.response = {
          ...req.session.userCase.applicantsFL401!.response,
          ...setSupportDetails(req),
        };
      }
    }
  }

  private getSupportYouNeedForRespondent(req: AppRequest<Partial<Case>>) {
    if ('C100' === req.session.userCase.caseTypeOfApplication) {
      req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
        respondent.value.response = {
          ...respondent.value.response,
          ...setSupportDetails(req),
        };
      });
    } else {
      req.session.userCase.respondentsFL401!.response = {
        ...req.session.userCase.respondentsFL401!.response,
        ...setSupportDetails(req),
      };
    }
  }
}
