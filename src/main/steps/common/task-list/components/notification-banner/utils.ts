/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */

import _ from 'lodash';

import { UserDetails } from '../../../../../app/controller/AppRequest';
import { hasApplicationPacks } from '../../../../../steps/common/documents/view/utils';
import { getPartyDetails } from '../../../../../steps/tasklistresponse/utils';
import { CitizenDocuments, DocumentCategory } from '../../../documents/definitions';
import { doesCaseHaveId, isCaseSubmitted, isDraftCase } from '../../utils';

import { CaseWithId, CitizenNotification } from './../../../../../app/case/case';
import { CaseType, PartyType, Respondent, State } from './../../../../../app/case/definition';
import {
  CA_APPLICANT_CONFIG,
  CA_RESPONDENT_CONFIG,
  DA_APPLICANT_CONFIG,
  DA_RESPONDENT_CONFIG,
  NOTIFICATION_BASE_CONFIG,
} from './config';
import {
  NotificationBannerContent,
  NotificationBannerProps,
  NotificationID,
  NotificationType,
  OrderTypeId,
} from './definitions';

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

      return baseConfig ? { ...baseConfig, ...notificationConfig } : null;
    })
    .filter(notificationConfig => notificationConfig !== null);
};

export const isPartyServed = (caseData: Partial<CaseWithId>, userDetails: UserDetails): boolean => {
  return !!(
    caseData?.citizenApplicationPacks?.length &&
    caseData.citizenApplicationPacks[0] &&
    getPartyDetails(caseData as CaseWithId, userDetails.id)?.partyId === caseData.citizenApplicationPacks[0].partyId
  );
};

/*** */

const NotificationTypeIDMap = {
  [NotificationType.APPLICATION_SERVED_BY_COURT_PERSONAL_NONPERSONAL_SERVICE]:
    NotificationID.APPLICATION_SERVED_BY_COURT_PERSONAL_NONPERSONAL_SERVICE,
  [NotificationType.APPLICATION_SERVED_BY_COURT_TO_RESPONDENT]:
    NotificationID.APPLICATION_SERVED_BY_COURT_TO_RESPONDENT,
  [NotificationType.APPLICATION_SERVED_BY_COURT_TO_DA_RESPONDENT]:
    NotificationID.APPLICATION_SERVED_BY_COURT_TO_DA_RESPONDENT,
  [NotificationType.VIEW_RESPONSE_TO_APPLICATION]: NotificationID.VIEW_RESPONSE_TO_APPLICATION,
  [NotificationType.VIEW_RESPONDENT_AOH]: NotificationID.VIEW_RESPONDENT_AOH,
  [NotificationType.VIEW_RESPONDENT_RESPONSE_AOH]: NotificationID.VIEW_RESPONDENT_RESPONSE_AOH,
  [NotificationType.APPLICANT_TO_PERSONALLY_SERVE_RESPONDENT]: NotificationID.APPLICANT_TO_PERSONALLY_SERVE_RESPONDENT,
  [NotificationType.APPLICANT_TO_PERSONALLY_SERVE_DA_RESPONDENT]:
    NotificationID.APPLICANT_TO_PERSONALLY_SERVE_DA_RESPONDENT,
  [NotificationType.APPLICATION_SERVED_BY_SOLICITOR_BAILIFF_TO_RESPONDENT]:
    NotificationID.APPLICATION_SERVED_BY_SOLICITOR_BAILIFF_TO_RESPONDENT,
  [NotificationType.APPLICATION_SERVED_BY_COURT_ADMIN_BAILIFF_TO_DA_RESPONDENT]:
    NotificationID.APPLICATION_SERVED_BY_COURT_ADMIN_BAILIFF_TO_DA_RESPONDENT,
  [NotificationType.APPLICATION_ISSUED_BY_COURT_PERSONAL_SERVICE]:
    NotificationID.APPLICATION_ISSUED_BY_COURT_PERSONAL_SERVICE,
  [NotificationType.SUMBIT_FM5]: NotificationID.SUMBIT_FM5,
  [NotificationType.ORDER_SOS_PERSONAL_SERVICE_BY_COURT_ADMIN_BAILIFF]:
    NotificationID.ORDER_SOS_PERSONAL_SERVICE_BY_COURT_ADMIN_BAILIFF,
  [NotificationType.ORDER_NON_PERSONAL_SERVICE]: NotificationID.ORDER_NON_PERSONAL_SERVICE,
  [NotificationType.ORDER_PERSONAL_SERVICE]: NotificationID.ORDER_PERSONAL_SERVICE,
  [NotificationType.APPLICATION_SERVED_BY_COURT_PERSONAL_NONPERSONAL_SERVICE_TO_DA_APPLICANT]:
    NotificationID.APPLICATION_SERVED_BY_COURT_PERSONAL_NONPERSONAL_SERVICE_TO_DA_APPLICANT,
  [NotificationType.ORDER_SOS_PERSONAL_SERVICE_BY_COURT_ADMIN_BAILIFF_TO_DA_RESPONDENT]:
    NotificationID.ORDER_SOS_PERSONAL_SERVICE_BY_COURT_ADMIN_BAILIFF_TO_DA_RESPONDENT,
  [NotificationType.SERVE_DOCUMENTS]: NotificationID.SERVE_DOCUMENTS,
};

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
  findNotification(caseData, NotificationID.APPLICATION_SERVED_BY_COURT_PERSONAL_NONPERSONAL_SERVICE)
    ?.personalService ?? false;

export const isCafcassServed = (caseData: CaseWithId): boolean =>
  hasApplicationPacks(caseData) && _.get(caseData.citizenApplicationPacks![0], 'wasCafcassServed', false);

export const isCafcassCymruServed = (caseData: CaseWithId): boolean =>
  hasApplicationPacks(caseData) && _.get(caseData.citizenApplicationPacks![0], 'wasCafcassCymruServed', false);

export const showNotification = (notificationType: NotificationType, caseData: CaseWithId): boolean => {
  const notificationId = NotificationTypeIDMap?.[notificationType];

  return notificationId ? findNotification(caseData, notificationId)?.show ?? false : false;
};
export function showPreDashBoardNotification(notificationType: NotificationType, caseData: CaseWithId): boolean {
  let allowNotification = false;
  switch (notificationType) {
    case NotificationType.APPLICATION_NOT_STARTED:
      allowNotification = !caseData || !doesCaseHaveId(caseData);
      break;
    case NotificationType.APPLICATION_IN_PROGRESS:
      allowNotification = isDraftCase(caseData);
      break;
    case NotificationType.APPLICATION_SUBMITTED:
      allowNotification = isCaseSubmitted(caseData);
      break;
    case NotificationType.APPLICATION_WITHDRAWN:
      allowNotification = caseData?.state === State.CASE_WITHDRAWN;
      break;
  }
  return allowNotification;
}

export const findNotification = (
  caseData: CaseWithId,
  notificationId: NotificationID
): CitizenNotification | undefined => {
  return caseData?.citizenNotifications?.find(notification => notification.id === notificationId);
};

export const hasMoreThanOneApplicant = (caseData: CaseWithId): boolean => {
  return _.get(caseData, 'applicants', []).length > 1;
};

export const findC7ResponseDocument = (caseData: CaseWithId, respondent: Respondent): CitizenDocuments | undefined => {
  return caseData?.respondentDocuments?.find(
    document =>
      (document.partyId === respondent.value.user.idamId || document.solicitorRepresentedPartyId === respondent.id) &&
      document.categoryId === DocumentCategory.RESPONDENT_C7_RESPONSE_TO_APPLICATION
  );
};

export const findC1ADocument = (caseData: CaseWithId, respondent: Respondent): CitizenDocuments | undefined => {
  return caseData?.respondentDocuments?.find(
    document =>
      (document.partyId === respondent.value.user.idamId || document.solicitorRepresentedPartyId === respondent.id) &&
      document.categoryId === DocumentCategory.RESPONDENT_RESPOND_TO_C1A
  );
};

export const findResponseToC1ADocument = (
  caseData: CaseWithId,
  respondent: Respondent
): CitizenDocuments | undefined => {
  return caseData?.respondentDocuments?.find(
    document =>
      (document.partyId === respondent.value.user.idamId || document.solicitorRepresentedPartyId === respondent.id) &&
      document.categoryId === DocumentCategory.RESPONDENT_C1A_RESPONSE_TO_APPLICATION
  );
};

export const getOrderNotificationHeading = (
  notification: CitizenNotification,
  commonContent: NotificationBannerContent['common']
): string => {
  if (notification.new && notification.final) {
    return `${commonContent.new} ${commonContent.and} ${commonContent.final}`;
  } else if (notification.multiple && notification.final) {
    return commonContent.final;
  } else if (notification.multiple && !notification.final) {
    return commonContent.new;
  } else if (!notification.multiple && notification.final) {
    return `${commonContent.a} ${commonContent.final}`;
  } else {
    return `${commonContent.a} ${commonContent.new}`;
  }
};

export const getBannerContentForRespondent = (
  caseData: CaseWithId,
  commonContent: Record<string, string>
): { respondent: string; has: string } => {
  let respondent = '';
  let has = '';
  if (caseData.respondents?.length) {
    if (caseData.respondents?.length === 1) {
      respondent = commonContent.respondent;
      has = commonContent.has;
    } else {
      respondent = commonContent.respondents;
      has = commonContent.have;
    }
  }
  return { respondent, has };
};

export const isOrderWithPowerOfArrest = (caseData: CaseWithId): boolean => {
  const orderTypeId = findNotification(
    caseData,
    NotificationID.ORDER_SOS_PERSONAL_SERVICE_BY_COURT_ADMIN_BAILIFF_TO_DA_RESPONDENT
  )?.orderTypeId as OrderTypeId | undefined;

  return orderTypeId
    ? [OrderTypeId.POWER_OF_ARREST, OrderTypeId.OCCUPATION_WITH_POWER_OF_ARREST, OrderTypeId.NON_MOLESTATION].includes(
        orderTypeId
      )
    : false;
};

export const parseC100ReturnUrl = (returnUrl: string): string => {
  if (returnUrl?.includes('?lng')) {
    return returnUrl?.replace('&validApplication=true', '');
  } else {
    return returnUrl?.replace('?validApplication=true', '');
  }
};
