import config from 'config';

import { getServiceAuthToken } from '../../app/auth/service/get-service-auth-token';
import { CaseData, CaseType, PartyDetails } from '../../app/case/definition';
import { UserDetails } from '../../app/controller/AppRequest';
import { applyParms } from '../../steps/common/url-parser';
import {
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_CALLBACK_URL,
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_FETCH_DATA_URL,
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_POST_URL,
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_SIGN_OUT_URl,
  REASONABLE_ADJUSTMENTS_MANAGE_SUPPORT_FLAGS,
  REASONABLE_ADJUSTMENTS_REQUEST_SUPPORT_FLAGS,
  REASONABLE_ADJUSTMENTS_RETRIEVE_SUPPORT_FLAGS,
} from '../../steps/urls';

import { RACommonComponent, RAData, RAFlags, RAPostResponse, RARequestPayload } from './definitions';

import { RAProvider } from './index';

export class ReasonableAdjustmentsService {
  async getCommonComponentUrl(
    correlationId: RARequestPayload['correlationId'],
    payload: RARequestPayload['existingFlags'],
    language: RARequestPayload['language']
  ): Promise<RAPostResponse> {
    try {
      const appBaseUrl = RAProvider.getAppBaseUrl();
      const requestData: RARequestPayload = {
        hmctsServiceId: RACommonComponent.SERVICE_ID,
        callbackUrl: applyParms(REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_CALLBACK_URL, { baseUrl: appBaseUrl }),
        logoutUrl: applyParms(REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_SIGN_OUT_URl, { baseUrl: appBaseUrl }),
        masterFlagCode: RACommonComponent.MASTER_FLAG_CODE,
        correlationId,
        existingFlags: payload,
        language,
      };
      console.info(' **** request ****', JSON.stringify(requestData, null, 4));
      const response = await RAProvider.APIClient()!.post<RAPostResponse>(
        applyParms(REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_POST_URL, {
          baseUrl: config.get('services.reasonableAdjustments.url'),
        }),
        requestData
      );

      return response.data;
    } catch (error) {
      RAProvider.log('error', error);
      throw new Error('Could not fetch CUIRA component URL - getCommonComponentUrl');
    }
  }

  async retrievePartyRAFlagsFromCommonComponent(referenceId: string): Promise<RAData> {
    try {
      const response = await RAProvider.APIClient()!.get<RAData>(
        applyParms(REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_FETCH_DATA_URL, {
          baseUrl: config.get('services.reasonableAdjustments.url'),
          id: referenceId,
        })
      );

      return response.data;
    } catch (error) {
      RAProvider.log('error', error);
      throw new Error('Could not fetch party RA flags from CC - retrievePartyRAFlagsFromCommonComponent');
    }
  }

  async retrieveExistingPartyRAFlags(
    caseId: CaseData['id'],
    partyId: PartyDetails['user']['idamId'],
    userAccessToken: UserDetails['accessToken']
  ): Promise<RAFlags> {
    try {
      const response = await RAProvider.APIClient()!.get(
        applyParms(REASONABLE_ADJUSTMENTS_RETRIEVE_SUPPORT_FLAGS, {
          baseUrl: config.get('services.cos.url'),
          caseId,
          partyId,
        }),
        {
          headers: {
            Authorization: 'Bearer ' + userAccessToken,
            ServiceAuthorization: 'Bearer ' + getServiceAuthToken(),
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      RAProvider.log('error', error);
      throw new Error('Could not fetch party RA flags - retrieveExistingPartyRAFlags');
    }
  }

  async updatePartyRAFlags(
    caseId: CaseData['id'],
    caseTypeOfApplication: CaseType,
    partyId: PartyDetails['user']['idamId'],
    userAccessToken: UserDetails['accessToken'],
    supportContext: string,
    flags: RAFlags['details']
  ): Promise<string> {
    try {
      const data = {
        caseTypeOfApplication,
        partyIdamId: partyId,
        partyExternalFlags: {
          details: flags,
        },
      };
      const url =
        supportContext === 'manage'
          ? applyParms(REASONABLE_ADJUSTMENTS_MANAGE_SUPPORT_FLAGS, {
              baseUrl: config.get('services.cos.url'),
              caseId,
              eventId: RAProvider.utils.getUpdateFlagsEventID(caseTypeOfApplication, supportContext),
            })
          : applyParms(REASONABLE_ADJUSTMENTS_REQUEST_SUPPORT_FLAGS, {
              baseUrl: config.get('services.cos.url'),
              caseId,
              eventId: RAProvider.utils.getUpdateFlagsEventID(caseTypeOfApplication, supportContext),
            });
      const response = await RAProvider.APIClient()!.post(url, data, {
        headers: {
          Authorization: 'Bearer ' + userAccessToken,
          ServiceAuthorization: 'Bearer ' + getServiceAuthToken(),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      RAProvider.log('error', error);
      throw new Error('Could not update party RA flags - updatePartyRAFlags');
    }
  }
}

export const RAService = new ReasonableAdjustmentsService();
