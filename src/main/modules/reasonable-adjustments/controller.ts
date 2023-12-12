import { AxiosError } from 'axios';
import { Response } from 'express';
import _ from 'lodash';

import { CaseType, PartyType } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import { Language } from '../../steps/common/common.content';
import { applyParms } from '../../steps/common/url-parser';
import { getCasePartyType } from '../../steps/prl-cases/dashboard/utils';
import { getPartyDetails } from '../../steps/tasklistresponse/utils';
import {
  DASHBOARD_URL,
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_CONFIRMATION_PAGE,
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_GUIDANCE_PAGE,
} from '../../steps/urls';

import { RADataTransformContext, RASupportContext } from './definitions';

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
    const language = RAProvider.getPreferredLanguage(req) as Language;
    const partyDetails = getPartyDetails(caseData, userDetails.id);

    if (!partyDetails) {
      return ReasonableAdjustementsController.handleError('RA - partyDetails not available', res, partyType);
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
            return ReasonableAdjustementsController.handleError(
              'RA - partyExistingRAFlags not available',
              res,
              partyType
            );
          }

          try {
            return await RAProvider.launch(
              {
                partyName: existingRAFlags.partyName,
                roleOnCase: existingRAFlags.roleOnCase,
                details: RAProvider.utils.preprocessData(existingRAFlags.details, RADataTransformContext.EXTERNAL),
              },
              language,
              res
            );
          } catch (error) {
            ReasonableAdjustementsController.handleError(error, res, partyType);
          }
        } catch (error) {
          ReasonableAdjustementsController.handleError(error, res, partyType);
        }
      }
      ReasonableAdjustementsController.handleError(`RA - common component health status (${status})`, res, partyType);
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

    const caseId = caseData.id!;
    const caseType = caseData.caseTypeOfApplication as CaseType;
    const userDetails = req.session.user;
    const partyType = getCasePartyType(caseData, userDetails.id);

    if (!externalRefId) {
      return ReasonableAdjustementsController.handleError('RA - no external reference ID present', res, partyType);
    }

    try {
      const response = await RAProvider.service.retrievePartyRAFlagsFromCommonComponent(externalRefId);
      console.info('**** response ****', JSON.stringify(response, null, 4));

      if (!response.correlationId) {
        return ReasonableAdjustementsController.handleError('RA - no correlation ID present', res, partyType);
      }

      try {
        await RAProvider.trySettlingRequest(response.correlationId, response.action);

        if (!_.get(response, 'flagsAsSupplied.details') || !_.get(response, 'replacementFlags.details')) {
          return ReasonableAdjustementsController.handleError(
            'RA - no flagsAsSupplied (or) replacementFlags present',
            res,
            partyType
          );
        }

        const partyId = getPartyDetails(caseData, userDetails.id)!.user.idamId;

        try {
          if (response?.flagsAsSupplied?.details?.length) {
            await RAProvider.service.updatePartyRAFlags(
              caseId,
              caseType,
              partyId,
              userDetails.accessToken,
              RASupportContext.MANAGE_SUPPORT,
              RAProvider.utils.preprocessData(response.flagsAsSupplied.details, RADataTransformContext.INTERNAL)
            );
          }

          if (response?.replacementFlags?.details?.length) {
            await RAProvider.service.updatePartyRAFlags(
              caseId,
              caseType,
              partyId,
              userDetails.accessToken,
              RASupportContext.REQUEST_SUPPORT,
              RAProvider.utils.preprocessData(response.replacementFlags.details, RADataTransformContext.INTERNAL)
            );
          }

          return res.redirect(
            applyParms(REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_CONFIRMATION_PAGE, {
              partyType,
            })
          );
        } catch (error) {
          ReasonableAdjustementsController.handleError(error, res, partyType);
        }
      } catch (error) {
        ReasonableAdjustementsController.handleError(error, res, partyType);
      }
    } catch (error) {
      ReasonableAdjustementsController.handleError(error, res, partyType);
    }
  }
}

export const RAController = new ReasonableAdjustementsController();
