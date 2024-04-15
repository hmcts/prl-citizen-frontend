/* eslint-disable @typescript-eslint/no-explicit-any */

import autobind from 'autobind-decorator';

import { CosApiClient } from '../../app/case/CosApiClient';
import { CaseWithId, HearingData } from '../../app/case/case';
import { YesOrNo } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { mapDataInSession } from '../tasklistresponse/utils';

@autobind
export default class CaseDataController {
  constructor(protected readonly fetchDataFor = ['hearingDetails']) {}

  private isDataRequired(fetchDataFor: string): boolean {
    return this.fetchDataFor.includes(fetchDataFor);
  }

  private async saveDataInSession(
    req: AppRequest,
    caseData: CaseWithId,
    hearingData: HearingData | null
  ): Promise<void> {
    const hearingCollection = {
      hearingCollection: [],
    };

    req.session.userCaseList = [];

    if (this.isDataRequired('hearingDetails')) {
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
        !err ? resolve() : reject(err);
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
      const { caseData, hearingData } = await client.retrieveCaseAndHearings(
        caseId,
        this.isDataRequired('hearingDetails') ? YesOrNo.YES : YesOrNo.NO
      );

      await this.saveDataInSession(req, caseData, hearingData);
      return Promise.resolve({
        caseData,
        hearingData,
      });
    } catch (error) {
      throw new Error('FetchCaseDataController: Data could not be retrieved.');
    }
  }
}
