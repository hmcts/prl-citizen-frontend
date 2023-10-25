import { AxiosError } from 'axios';
import { Response } from 'express';

import { PartyType } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { Language } from '../../steps/common/common.content';
import { getPartyName } from '../../steps/common/task-list/utils';
import { applyParms } from '../../steps/common/url-parser';
import { getCasePartyType } from '../../steps/prl-cases/dashboard/utils';
import {
  DASHBOARD_URL,
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_CONFIRMATION_PAGE,
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_GUIDANCE_PAGE,
} from '../../steps/urls';

import { RAProvider } from './index';

export class ReasonableAdjustementsController {
  protected static handleError(error: string | AxiosError, res: Response, partyType?: PartyType | undefined): void {
    RAProvider.log('error', error);
    if (partyType) {
      return res.redirect(
        applyParms(REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_GUIDANCE_PAGE, {
          partyType,
        })
      );
    }
    res.redirect(DASHBOARD_URL);
  }

  async launch(req: AppRequest, res: Response): Promise<void> {
    const caseData = req.session.userCase;

    if (!caseData) {
      return ReasonableAdjustementsController.handleError('RA - caseData not available', res);
    }

    const userDetails = req.session.user;
    const partyType = getCasePartyType(caseData, userDetails.id);
    try {
      const language = RAProvider.getPreferredLanguage(req) as Language;

      await RAProvider.launch(
        {
          partyName: getPartyName(caseData, partyType, userDetails),
          roleOnCase: partyType,
        },
        language,
        res
      );
    } catch (error) {
      ReasonableAdjustementsController.handleError(error, res, partyType);
    }
  }

  async fetchData(req: AppRequest, res: Response): Promise<void> {
    const externalRefId = req.params.id;
    console.info(externalRefId);
    const caseData = req.session.userCase;

    if (!caseData) {
      return ReasonableAdjustementsController.handleError('RA - caseData not available', res);
    }

    const userDetails = req.session.user;
    const partyType = getCasePartyType(caseData, userDetails.id);
    try {
      if (externalRefId) {
        const response = await RAProvider.service.getRAData(externalRefId);
        console.info('**** response ****', JSON.stringify(response, null, 4))
        RAProvider.trySettlingRequest(response.correlationId, response.action).then(
          () => {
            // saving the data temp, will be revisited during story implementation
            req.session.userCase = {
              ...req.session.userCase,
              ra_cc: response,
            };

            req.session.save(() => {
              res.redirect(
                applyParms(REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_CONFIRMATION_PAGE, {
                  partyType,
                })
              );
            });
          },
          error => {
            ReasonableAdjustementsController.handleError(error, res, partyType);
          }
        );
      } else {
        ReasonableAdjustementsController.handleError('RA - no external reference ID present', res, partyType);
      }
    } catch (error) {
      ReasonableAdjustementsController.handleError(error, res);
    }
  }
}

export const RAController = new ReasonableAdjustementsController();
