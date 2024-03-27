/* eslint-disable @typescript-eslint/no-explicit-any */
import config from 'config';

import { getServiceAuthToken } from '../../app/auth/service/get-service-auth-token';
import { CaseWithId } from '../../app/case/case';
import { CaseData, CaseType, PartyDetails } from '../../app/case/definition';
import { UserDetails } from '../../app/controller/AppRequest';
import { applyParms } from '../../steps/common/url-parser';
import {
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_CALLBACK_URL,
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_FETCH_DATA_URL,
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_HEALTH_CHECK_URL,
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_POST_URL,
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_SIGN_OUT_URl,
  REASONABLE_ADJUSTMENTS_MANAGE_SUPPORT_FLAGS,
  REASONABLE_ADJUSTMENTS_RETRIEVE_SUPPORT_FLAGS,
  REASONABLE_ADJUSTMENTS_SUBMIT_LANGUAGE_REQ,
} from '../../steps/urls';

import { RACommonComponent, RAData, RAFlags, RAPostResponse, RARequestPayload, RASupportContext } from './definitions';

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
        callbackUrl: applyParms(REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_CALLBACK_URL, { appBaseUrl }),
        logoutUrl: applyParms(REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_SIGN_OUT_URl, { appBaseUrl }),
        masterFlagCode: RACommonComponent.MASTER_FLAG_CODE,
        correlationId,
        existingFlags: payload,
        language,
      };
      console.info(' **** request ****', JSON.stringify(requestData, null, 4));
      const response = await RAProvider.APIClient()!.post<RAPostResponse>(
        REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_POST_URL,
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
      const response = await RAProvider.APIClient()!.get<RAFlags>(
        applyParms(REASONABLE_ADJUSTMENTS_RETRIEVE_SUPPORT_FLAGS, {
          appBaseUrl: config.get('services.cos.url'),
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
    partyIdamId: PartyDetails['user']['idamId'],
    userAccessToken: UserDetails['accessToken'],
    supportContext: RASupportContext,
    flags: RAFlags['details']
  ): Promise<string> {
    try {
      const data = {
        caseTypeOfApplication,
        partyIdamId,
        partyExternalFlags: {
          details: flags,
        },
      };
      const response = await RAProvider.APIClient()!.post<string>(
        applyParms(REASONABLE_ADJUSTMENTS_MANAGE_SUPPORT_FLAGS, {
          appBaseUrl: config.get('services.cos.url'),
          caseId,
          eventId: RAProvider.utils.getUpdateFlagsEventID(caseTypeOfApplication, supportContext),
        }),
        data,
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
      throw new Error('Could not update party RA flags - updatePartyRAFlags');
    }
  }

  async retrieveCommonComponentHealthStatus(): Promise<string> {
    try {
      const response = await RAProvider.APIClient()!.get<Record<string, any>>(
        REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_HEALTH_CHECK_URL,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.status;
    } catch (error) {
      RAProvider.log('error', error);
      throw new Error('Could not fetch common component health status - retrieveCommonComponentHealthStatus');
    }
  }

  async saveLanguagePrefAndSpecialArrangements(
    caseData: CaseWithId,
    partyIdamId: PartyDetails['user']['idamId'],
    userAccessToken: UserDetails['accessToken'],
    supportContext: RASupportContext
  ): Promise<any> {
    try {
      const caseTypeOfApplication = caseData.caseTypeOfApplication as CaseType;
      const data = {
        languageSupportCaseNotesRequest: {
          languageSupportNotes: caseData.ra_languageReqAndSpecialArrangements,
          partyIdamId,
        },
      };
      const response = await RAProvider.APIClient()!.post<string>(
        applyParms(REASONABLE_ADJUSTMENTS_SUBMIT_LANGUAGE_REQ, {
          caseId: caseData.id,
          eventId: RAProvider.utils.getUpdateFlagsEventID(caseTypeOfApplication, supportContext),
        }),
        data,
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
      throw new Error('Could not save RA language pref - saveLanguagePrefAndSpecialArrangements');
    }
  }
}

export const RAService = new ReasonableAdjustmentsService();
