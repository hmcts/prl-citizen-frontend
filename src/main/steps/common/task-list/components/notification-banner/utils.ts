/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import _ from 'lodash';

import { UserDetails } from '../../../../../app/controller/AppRequest';
import { hasApplicationPacks } from '../../../../../steps/common/documents/view/utils';
import { getPartyDetails } from '../../../../../steps/tasklistresponse/utils';

import { CaseWithId, CitizenNotification } from './../../../../../app/case/case';
import { CaseType, PartyType, YesOrNo } from './../../../../../app/case/definition';
import {
  CA_APPLICANT_CONFIG,
  CA_RESPONDENT_CONFIG,
  DA_APPLICANT_CONFIG,
  DA_RESPONDENT_CONFIG,
  NOTIFICATION_BASE_CONFIG,
} from './config';
import { languages as content } from './content';
import { NotificationBannerProps, NotificationID, NotificationType } from './definitions';

export const getNotificationConfig = (
  caseType: CaseType,
  partyType: PartyType,
  caseData: CaseWithId
): NotificationBannerProps[] | [] => {
  const config = {
    [CaseType.C100]: {
      [PartyType.APPLICANT]: CA_APPLICANT_CONFIG(caseData),
      [PartyType.RESPONDENT]: CA_RESPONDENT_CONFIG(),
    },
    [CaseType.FL401]: {
      [PartyType.APPLICANT]: DA_APPLICANT_CONFIG(),
      [PartyType.RESPONDENT]: DA_RESPONDENT_CONFIG(),
    },
  };

  return (config?.[caseType]?.[partyType] ?? [])
    .map(notificationConfig => {
      const baseConfig = NOTIFICATION_BASE_CONFIG.find(
        baseNotificationConfig => baseNotificationConfig.id === notificationConfig.id
      );

      return baseConfig ? { ...baseConfig, notificationConfig } : null;
    })
    .filter(notificationConfig => notificationConfig !== null);
};

export const getNotificationContent = (
  notficationType: NotificationType,
  caseType: CaseType,
  language: string,
  partyType: PartyType
) => {
  const translation = content[language];

  return {
    title: translation.title,
    ...translation?.[caseType]?.[partyType]?.[notficationType],
  };
};

export const isApplicantLIPServingRespondent = (caseData: Partial<CaseWithId>): boolean => {
  return caseData.applicants?.[0].value?.response?.citizenFlags?.isApplicationToBeServed === YesOrNo.YES;
};

export const isPrimaryApplicant = (caseData: Partial<CaseWithId>, userDetails: UserDetails): boolean => {
  return caseData.applicants?.[0].value.user.idamId === userDetails.id;
};

export const isPartyServed = (caseData: Partial<CaseWithId>, userDetails: UserDetails): boolean => {
  return !!(
    caseData?.citizenApplicationPacks?.length &&
    caseData.citizenApplicationPacks[0] &&
    getPartyDetails(caseData as CaseWithId, userDetails.id)?.partyId === caseData.citizenApplicationPacks[0].partyId
  );
};

/*** */

export const isApplicationPackAvailable = (caseData: Partial<CaseWithId>, partyType: PartyType): boolean => {
  return (
    hasApplicationPacks(caseData as CaseWithId) &&
    (_.get(
      caseData.citizenApplicationPacks![0],
      partyType === PartyType.APPLICANT ? 'applicantSoaPack' : 'respondentSoaPack',
      false
    ) as boolean)
  );
};

export const isPersonalServiceByCourt = (caseData: CaseWithId): boolean =>
  hasApplicationPacks(caseData as CaseWithId) &&
  _.get(caseData.citizenApplicationPacks![0], 'isPersonalService', false);

export const isCafcassServed = (caseData: CaseWithId): boolean =>
  hasApplicationPacks(caseData as CaseWithId) && _.get(caseData.citizenApplicationPacks![0], 'wasCafcassServed', false);

export const isCafcassCymruServed = (caseData: CaseWithId): boolean =>
  hasApplicationPacks(caseData as CaseWithId) &&
  _.get(caseData.citizenApplicationPacks![0], 'wasCafcassCymruServed', false);

export function showNotification(notificationType: NotificationType, caseData: CaseWithId): boolean {
  let notificationId;

  switch (notificationType) {
    case NotificationType.APPLICATION_SERVED_FOR_APPLICANT:
      {
        notificationId = NotificationID.APPLICATION_SERVED_FOR_APPLICANT;
      }
      break;
    case NotificationType.APPLICATION_SERVED_FOR_RESPONDENT:
      {
        notificationId = NotificationID.APPLICATION_SERVED_FOR_RESPONDENT;
      }
      break;
    case NotificationType.SUMBIT_FM5:
      {
        notificationId = NotificationID.SUMBIT_FM5;
      }
      break;
  }

  return notificationId
    ? caseData?.citizenNotifications?.find(notification => notification.id === notificationId)?.show ?? false
    : false;
}

export const getCRNF2NewOrderHeading = (notification: CitizenNotification, translations): string => {
  if (notification.newAndFinalOrder) {
    return `${translations.new} ${translations.and} ${translations.final}`;
  } else if (notification.isMultipleOrders && notification.isFinalOrder) {
    return translations.final;
  } else if (notification.isMultipleOrders && !notification.isFinalOrder) {
    return translations.new;
  } else if (!notification.isMultipleOrders && notification.isFinalOrder) {
    return `${translations.a} ${translations.final}`;
  } else {
    return `${translations.a} ${translations.new}`;
  }
};
