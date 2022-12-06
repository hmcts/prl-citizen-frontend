import { Response } from 'express';

import { CaseWithId } from '../../app/case/case';
import {
  APPLICANT,
  APPLICANT_TASK_LIST_URL,
  APPLICANT_VIEW_ALL_DOCUMENTS,
  C100_CASE_NAME,
  DASHBOARD_URL,
  RESPONDENT,
  RESPONDENT_TASK_LIST_URL,
  RESPONDENT_VIEW_ALL_DOCUMENTS,
  RESPOND_TO_APPLICATION,
  RESPONSE_TASKLIST,
  SIGN_IN_URL,
  VIEW_ALL_DOCUMENTS,
} from '../../steps/urls';
import { CosApiClient } from '../case/CosApiClient';

import { AppRequest } from './AppRequest';

export class GetCaseController {
  //constructor(protected readonly view: string, protected readonly content: TranslationFn) {}

  public async getApplicantCase(req: AppRequest, res: Response): Promise<void> {
    req.session.userCase = await GetCaseController.assignUserCase(req, undefined);
    req.session.save(() => res.redirect(APPLICANT_TASK_LIST_URL));
  }

  public async getRespondentCase(req: AppRequest, res: Response): Promise<void> {
    req.session.userCase = await GetCaseController.assignUserCase(req, undefined);
    req.session.save(() => res.redirect(RESPONDENT_TASK_LIST_URL));
  }

  private static async assignUserCase(req: AppRequest, id): Promise<CaseWithId> {
    const caseReference = req.params?.caseId ?? id;
    if (req.params?.caseId || id) {
      const citizenUser = req.session.user;
      const client = new CosApiClient(citizenUser.accessToken, 'https://return-url');
      const caseDataFromCos = await client.retrieveByCaseId(caseReference, citizenUser);
      req.session.userCase = caseDataFromCos;
    }
    if (!req.session?.userCase) {
      req.session?.userCaseList.forEach((element: CaseWithId) => {
        if (element?.id.toString() === caseReference) {
          req.session.userCase = element;
        }
      });
    }
    if (req.session?.userCase) {
      req.session.userCaseList = [];
    }
    return req.session.userCase;
  }

  public async createC100ApplicantCase(req: AppRequest, res: Response): Promise<void> {
    const userDeatils = req?.session?.user;
    if (userDeatils) {
      try {
        const { id: caseId, caseTypeOfApplication } = await req.locals.C100Api.createCase();

        req.session.userCase = {
          caseId,
          caseTypeOfApplication,
        } as CaseWithId;
        req.session.userCaseList = [];
        req.session.save(() => {
          res.redirect(C100_CASE_NAME);
        });
      } catch (e) {
        throw new Error('case could not be created-createC100ApplicantCase');
      }
    }
  }

  public async getC100ApplicantCase(req: AppRequest, res: Response): Promise<void> {
    try {
      const caseData = await req.locals.C100Api.retrieveCaseById(req.params?.caseId);
      const { caseId, c100RebuildReturnUrl, ...rest } = caseData;

      if (caseId) {
        req.session.userCase = {
          caseId,
          ...rest,
        };
      }
      if (c100RebuildReturnUrl !== '') {
        req.session.userCaseList = [];
      }
      req.session.save(() => {
        res.redirect(c100RebuildReturnUrl ?? DASHBOARD_URL);
      });
    } catch (error) {
      throw new Error('Error in retriving the case - getC100ApplicantCase');
    }
  }

  public async fetchAndRedirectToTasklist(req: AppRequest, res: Response): Promise<void> {
    if (!req.session.user) {
      res.redirect(SIGN_IN_URL + '?callback=' + req.originalUrl);
    } else {
      const caseId = req.originalUrl.split('/').pop();
      if (caseId) {
        let url = DASHBOARD_URL;
        req.session.userCase = await GetCaseController.assignUserCase(req, caseId);
        if (req.originalUrl.includes(RESPONDENT)) {
          if (req.originalUrl.includes(RESPONDENT_TASK_LIST_URL)) {
            url = RESPONDENT_TASK_LIST_URL;
          } else if (req.originalUrl.includes(VIEW_ALL_DOCUMENTS)) {
            url = RESPONDENT_VIEW_ALL_DOCUMENTS;
          }
        } else if (req.originalUrl.includes(APPLICANT)) {
          if (req.originalUrl.includes(APPLICANT_TASK_LIST_URL)) {
            url = APPLICANT_TASK_LIST_URL;
          } else if (req.originalUrl.includes(VIEW_ALL_DOCUMENTS)) {
            url = APPLICANT_VIEW_ALL_DOCUMENTS;
          }
        } else if (req.originalUrl.includes(RESPONSE_TASKLIST)) {
          url = RESPOND_TO_APPLICATION;
        }
        req.session.save(() => res.redirect(url));
      } else {
        res.redirect(DASHBOARD_URL);
      }
    }
  }
}
