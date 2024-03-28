import { AxiosError } from 'axios';
import { Response } from 'express';
import _ from 'lodash';

import { AppRequest } from '../../app/controller/AppRequest';
import { Language } from '../../steps/common/common.content';
import { applyParms } from '../../steps/common/url-parser';
import { getCasePartyType } from '../../steps/prl-cases/dashboard/utils';
import { getPartyDetails } from '../../steps/tasklistresponse/utils';
import { REASONABLE_ADJUSTMENTS_ERROR, REASONABLE_ADJUSTMENTS_SUCCESS_CONFIRMATION } from '../../steps/urls';

import { RADataTransformContext, RAFlags } from './definitions';

import { RAProvider } from './index';

export class ReasonableAdjustementsController {
  protected static handleError(error: string | AxiosError, res: Response): void {
    RAProvider.log('error', error);
    return res.redirect(REASONABLE_ADJUSTMENTS_ERROR);
  }

  async launch(req: AppRequest, res: Response): Promise<void> {
    const caseData = req.session.userCase;

    if (!caseData) {
      return ReasonableAdjustementsController.handleError('RA - caseData not available', res);
    }

    const userDetails = req.session.user;
    const language = RAProvider.getPreferredLanguage(req) as Language;
    const partyDetails = getPartyDetails(caseData, userDetails.id);

    if (!partyDetails) {
      return ReasonableAdjustementsController.handleError('RA - partyDetails not available', res);
    }

    try {
      const status = await RAProvider.service.retrieveCommonComponentHealthStatus();

      if (status === 'UP') {
        try {
          const existingRAFlags = await RAProvider.service.retrieveExistingPartyRAFlags(
            caseData.id!,
            partyDetails.user.idamId,
            userDetails.accessToken
          );
          console.info(existingRAFlags);

          if (!existingRAFlags) {
            return ReasonableAdjustementsController.handleError('RA - partyExistingRAFlags not available', res);
          }

          try {
            return await RAProvider.launch(
              {
                partyName: existingRAFlags.partyName,
                roleOnCase: existingRAFlags.roleOnCase,
                details: RAProvider.utils.preprocessData(
                  existingRAFlags.details,
                  RADataTransformContext.EXTERNAL
                ) as RAFlags['details'],
              },
              language,
              req,
              res
            );
          } catch (error) {
            return ReasonableAdjustementsController.handleError(error, res);
          }
        } catch (error) {
          return ReasonableAdjustementsController.handleError(error, res);
        }
      }
      return ReasonableAdjustementsController.handleError(`RA - common component health status (${status})`, res);
    } catch (error) {
      ReasonableAdjustementsController.handleError(error, res);
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

    if (!externalRefId) {
      return ReasonableAdjustementsController.handleError('RA - no external reference ID present', res);
    }

    try {
      const response = await RAProvider.service.retrievePartyRAFlagsFromCommonComponent(externalRefId);
      console.info('**** response ****', JSON.stringify(response, null, 4));

      if (!response.correlationId) {
        return ReasonableAdjustementsController.handleError('RA - no correlation ID present', res);
      }

      try {
        await RAProvider.trySettlingRequest(req, response.correlationId, response.action);

        if (!_.get(response, 'flagsAsSupplied.details') || !_.get(response, 'replacementFlags.details')) {
          return ReasonableAdjustementsController.handleError(
            'RA - no flagsAsSupplied (or) replacementFlags present',
            res
          );
        }

        try {
          await RAProvider.utils.updatePartyRAFlags(caseData, userDetails, response);

          return res.redirect(
            applyParms(REASONABLE_ADJUSTMENTS_SUCCESS_CONFIRMATION, {
              partyType,
            })
          );
        } catch (error) {
          ReasonableAdjustementsController.handleError(error, res);
        }
      } catch (error) {
        ReasonableAdjustementsController.handleError(error, res);
      }
    } catch (error) {
      ReasonableAdjustementsController.handleError(error, res);
    }
  }

  handleBackNavigation(req: AppRequest, res: Response): void {
    res.redirect(RAProvider.utils.getNavigationUrl(req));
  }
}

export const RAController = new ReasonableAdjustementsController();
