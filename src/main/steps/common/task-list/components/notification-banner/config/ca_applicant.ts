/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { generateResponseNotifications } from '..';
import { CaseWithId } from '../../../../../../app/case/case';
import { State } from '../../../../../../app/case/definition';
import { UserDetails } from '../../../../../../app/controller/AppRequest';
import { hasOrders } from '../../../../../../steps/common/documents/view/utils';
import { isCaseLinked, isCaseWithdrawn } from '../../../../../../steps/common/task-list/utils';
import { NotificationBannerProps, NotificationType } from '../definitions';
import { isApplicantLIPServingRespondent, isPrimaryApplicant, showNotification } from '../utils';

export const CA_APPLICANT_CONFIG = (userCase: CaseWithId): NotificationBannerProps[] => [
  {
    id: NotificationType.APPLICATION_NOT_STARTED,
    show: (notificationType: NotificationType, caseData: CaseWithId): boolean => {
      return !caseData;
    },
  },
  {
    id: NotificationType.APPLICATION_IN_PROGRESS,
    show: (notificationType: NotificationType, caseData: CaseWithId): boolean => {
      return caseData?.state === State.CASE_DRAFT;
    },
  },
  {
    id: NotificationType.APPLICATION_SUBMITTED,
    show: (notificationType: NotificationType, caseData: CaseWithId): boolean => {
      return caseData?.state === State.CASE_SUBMITTED_PAID || caseData?.state === State.CASE_SUBMITTED_NOT_PAID;
    },
  },
  {
    id: NotificationType.APPLICATION_WITHDRAWN,
    show: (notificationType: NotificationType, caseData: CaseWithId): boolean => {
      return isCaseWithdrawn(caseData);
    },
  },
  {
    id: NotificationType.APPLICATION_SERVED_FOR_APPLICANT,
    show: showNotification,
  },
  {
    id: NotificationType.APPLICATION_CLOSED,
    show: (notificationType: NotificationType, caseData: CaseWithId): boolean => {
      return caseData?.state === State.ALL_FINAL_ORDERS_ISSUED && !isCaseWithdrawn(caseData);
    },
  },
  {
    id: NotificationType.NEW_ORDER,
    show: (notificationType: NotificationType, caseData: CaseWithId): boolean => {
      return caseData?.state !== State.ALL_FINAL_ORDERS_ISSUED && hasOrders(caseData as CaseWithId);
    },
  },
  {
    id: NotificationType.GIVE_RESPONDENT_THEIR_DOCUMENTS,
    show: (notificationType: NotificationType, caseData: CaseWithId, userDetails: UserDetails): boolean => {
      return (
        isCaseLinked(caseData, userDetails) &&
        isPrimaryApplicant(caseData, userDetails) &&
        isApplicantLIPServingRespondent(caseData)
      );
    },
  },
  {
    id: NotificationType.CA_PERSONAL_SERVICE,
    show: (notificationType: NotificationType, caseData: CaseWithId, userDetails: UserDetails): boolean => {
      return (
        isCaseLinked(caseData, userDetails) &&
        !isPrimaryApplicant(caseData, userDetails) &&
        isApplicantLIPServingRespondent(caseData)
      );
    },
  },
  ...generateResponseNotifications(userCase),
  {
    id: NotificationType.SUMBIT_FM5,
    show: showNotification,
  },
];
