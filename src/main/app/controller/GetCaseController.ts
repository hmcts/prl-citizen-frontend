import { Response } from 'express';

import { CaseWithId } from '../../app/case/case';
import { PartyType } from '../../app/case/definition';
import { applyParms } from '../../steps/common/url-parser';
import { mapDataInSession } from '../../steps/tasklistresponse/utils';
import {
  APPLICANT,
  APPLICANT_TASK_LIST_URL,
  APPLICANT_VIEW_ALL_DOCUMENTS,
  C100_CHILD_ADDRESS,
  DASHBOARD_URL,
  PARTY_TASKLIST,
  PageLink,
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
  constructor() {
    console.info('** FOR SONAR **');
  }

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
      mapDataInSession(req.session.userCase, req.session.user.id);
    }

    return req.session.userCase;
  }

  public async createC100ApplicantCase(req: AppRequest, res: Response): Promise<void> {
    const userDeatils = req?.session?.user;
    if (userDeatils) {
      try {
        const {
          id: caseId,
          caseTypeOfApplication,
          state,
          noOfDaysRemainingToSubmitCase,
        } = await req.locals.C100Api.createCase();

        req.session.userCase = {
          caseId,
          caseTypeOfApplication,
          state,
          noOfDaysRemainingToSubmitCase,
        } as CaseWithId;
        req.session.userCaseList = [];
        req.session.save(() => {
          res.redirect(C100_CHILD_ADDRESS);
        });
      } catch (e) {
        throw new Error('case could not be created-createC100ApplicantCase');
      }
    }
  }

  public async getC100ApplicantCase(req: AppRequest, res: Response): Promise<void> {
    try {
      const caseData = await req.locals.C100Api.retrieveCaseById(req.params?.caseId);

      req.session.userCase = caseData;
      req.session.save(() => {
        res.redirect(applyParms(PARTY_TASKLIST, { partyType: PartyType.APPLICANT }));
      });
    } catch (error) {
      res.redirect(DASHBOARD_URL);
      throw new Error('Error in retriving the case - getC100ApplicantCase');
    }
  }

  public async fetchAndRedirectToTasklist(req: AppRequest, res: Response): Promise<void> {
    if (!req.session.user) {
      res.redirect(SIGN_IN_URL + '?callback=' + req.originalUrl);
    } else {
      const caseId = req.originalUrl.split('/').pop() ?? '';
      if (parseInt(caseId)) {
        const url = this.getRedirectUrl(req);
        req.session.userCase = await GetCaseController.assignUserCase(req, caseId);
        req.session.save(() => res.redirect(url));
      } else {
        res.redirect(DASHBOARD_URL);
      }
    }
  }

  private getRedirectUrl(req: AppRequest): PageLink {
    let url = DASHBOARD_URL;
    if (req.originalUrl.includes(VIEW_ALL_DOCUMENTS)) {
      if (req.originalUrl.includes(RESPONDENT)) {
        url = RESPONDENT_VIEW_ALL_DOCUMENTS;
      } else if (req.originalUrl.includes(APPLICANT)) {
        url = APPLICANT_VIEW_ALL_DOCUMENTS;
      }
    } else if (req.originalUrl.includes(RESPONDENT_TASK_LIST_URL)) {
      url = RESPONDENT_TASK_LIST_URL;
    } else if (req.originalUrl.includes(APPLICANT_TASK_LIST_URL)) {
      url = APPLICANT_TASK_LIST_URL;
    } else if (req.originalUrl.includes(RESPONSE_TASKLIST)) {
      url = RESPOND_TO_APPLICATION;
    }

    return url;
  }
}
