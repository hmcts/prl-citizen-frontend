import config from 'config';

import { CommonComponentMasterFlagCode, CommonComponentServiceID } from '../../app/case/definition';
import { applyParms } from '../../steps/common/url-parser';
import {
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_CALLBACK_URL,
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_FETCH_DATA_URL,
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_POST_URL,
  REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_SIGN_OUT_URl,
} from '../../steps/urls';

import { RAData, RAPostResponse, RARequestPayload } from './interface';

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
        hmctsServiceId: CommonComponentServiceID.RA,
        callbackUrl: applyParms(REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_CALLBACK_URL, { baseUrl: appBaseUrl }),
        logoutUrl: applyParms(REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_SIGN_OUT_URl, { baseUrl: appBaseUrl }),
        masterFlagCode: CommonComponentMasterFlagCode.RA,
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
      throw new Error(error);
    }
  }

  async getRAData(referenceId: string): Promise<RAData> {
    try {
      const response = await RAProvider.APIClient()!.get<RAData>(
        applyParms(REASONABLE_ADJUSTMENTS_COMMON_COMPONENT_FETCH_DATA_URL, {
          baseUrl: config.get('services.reasonableAdjustments.url'),
          id: referenceId,
        })
      );

      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export const RAService = new ReasonableAdjustmentsService();
