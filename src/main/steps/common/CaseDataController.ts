/* eslint-disable @typescript-eslint/no-explicit-any */

import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CosApiClient } from '../../app/case/CosApiClient';
import { CaseWithId, HearingData } from '../../app/case/case';
import { PartyType, YesOrNo } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { DASHBOARD_URL, PARTY_TASKLIST } from '../../steps/urls';
import { mapDataInSession } from '../tasklistresponse/utils';

import { applyParms } from './url-parser';

@autobind
export default class CaseDataController {
  constructor(protected readonly fetchDataFor = ['caseAndHearingDetails']) {}

  private isDataRequired(fetchDataFor: string): boolean {
    return this.fetchDataFor.includes(fetchDataFor);
  }

  public async saveDataInSession(
    req: AppRequest,
    caseData: CaseWithId,
    hearingData: HearingData | null
  ): Promise<void> {
    const hearingCollection = {
      hearingCollection: [],
    };

    req.session.userCaseList = [];

    if (this.isDataRequired('caseAndHearingDetails') || this.isDataRequired('hearingDetails')) {
      if (hearingData?.caseHearings) {
        Object.assign(hearingCollection, {
          hearingCollection: hearingData.caseHearings,
        });
      }
    } else if (req.session.userCase?.hearingCollection?.length) {
      Object.assign(hearingCollection, {
        hearingCollection: req.session.userCase.hearingCollection,
      });
    }

    if (caseData) {
      req.session.userCase = {
        ...caseData,
        ...hearingCollection,
      };
      mapDataInSession(req.session.userCase, req.session.user.id);
    }

    return new Promise((resolve, reject) => {
      req.session.save(err => {
        !err ? resolve() : reject(new Error(err));
      });
    });
  }

  public async fetchAndSaveData(req: AppRequest): Promise<{ caseData: CaseWithId; hearingData: HearingData | null }> {
    const client = new CosApiClient(req.session.user.accessToken, req.locals.logger);
    const userDetails = req.session.user;
    const caseId = req.params.caseId ?? req.session?.userCase?.id ?? null;

    if (!caseId || !userDetails) {
      throw new Error('FetchCaseDataController: caseId or userDetails not present.');
    }

    try {
      const response = await client.retrieveCaseAndHearings(
        caseId,
        this.isDataRequired('caseAndHearingDetails') ? YesOrNo.YES : YesOrNo.NO
      );

      if (this.isDataRequired('hearingDetails')) {
        response.hearingData = (await client.retrieveCaseHearingsByCaseId(caseId)).hearingData;
      }

      await this.saveDataInSession(req, response.caseData, response.hearingData);

      return Promise.resolve({
        caseData: response.caseData,
        hearingData: response.hearingData,
      });
    } catch (error) {
      throw new Error('FetchCaseDataController: Data could not be retrieved.');
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
}
