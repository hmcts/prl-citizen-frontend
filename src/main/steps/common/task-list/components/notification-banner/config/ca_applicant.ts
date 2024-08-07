/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { generateResponseNotifications } from '..';
import { CaseWithId } from '../../../../../../app/case/case';
import { State, YesOrNo } from '../../../../../../app/case/definition';
import { UserDetails } from '../../../../../../app/controller/AppRequest';
import { hasOrders } from '../../../../../../steps/common/documents/view/utils';
import { NotificationBannerProps } from '../../../../../../steps/common/task-list/definitions';
import { isCaseLinked, isCaseWithdrawn } from '../../../../../../steps/common/task-list/utils';
import { BannerNotification, isApplicantLIPServingRespondent, isPrimaryApplicant, notificationBanner } from '../utils';

export const CA_APPLICANT = (userCase: Partial<CaseWithId>): NotificationBannerProps[] => [
  {
    ...notificationBanner[BannerNotification.APPLICATION_NOT_STARTED],
    show: (caseData: Partial<CaseWithId>): boolean => {
      return !caseData;
    },
  },
  {
    ...notificationBanner[BannerNotification.APPLICATION_IN_PROGRESS],
    show: (caseData: Partial<CaseWithId>): boolean => {
      return caseData?.state === State.CASE_DRAFT;
    },
  },
  {
    ...notificationBanner[BannerNotification.APPLICATION_SUBMITTED],
    show: (caseData: Partial<CaseWithId>): boolean => {
      return caseData?.state === State.CASE_SUBMITTED_PAID || caseData?.state === State.CASE_SUBMITTED_NOT_PAID;
    },
  },
  {
    ...notificationBanner[BannerNotification.APPLICATION_WITHDRAWN],
    show: isCaseWithdrawn,
  },
  {
    ...notificationBanner[BannerNotification.WITHDRAWAL_REQ_REJECTED],
    show: (caseData: Partial<CaseWithId>): boolean => {
      return !!caseData?.orderCollection?.find(
        order =>
          order.value?.orderTypeId === 'blankOrderOrDirectionsWithdraw' &&
          order.value?.withdrawnRequestType === 'Withdrawn application' &&
          order.value?.isWithdrawnRequestApproved === YesOrNo.NO
      );
    },
  },
  {
    ...notificationBanner[BannerNotification.APPLICATION_SENT_TO_LOCAL_COURT],
    show: (caseData: Partial<CaseWithId>): boolean => {
      return caseData?.state === State.CASE_ISSUED_TO_LOCAL_COURT;
    },
  },
  {
    ...notificationBanner[BannerNotification.APPLICATION_SENT_TO_GATE_KEEPING],
    show: (caseData: Partial<CaseWithId>): boolean => {
      return caseData?.state === State.CASE_GATE_KEEPING;
    },
  },
  {
    ...notificationBanner[BannerNotification.APPLICATION_SERVED_LINKED],
    show: (caseData: Partial<CaseWithId>, userDetails: UserDetails): boolean => {
      return (
        caseData?.state === State.CASE_SERVED &&
        isCaseLinked(caseData, userDetails) &&
        !isApplicantLIPServingRespondent(caseData)
      );
    },
  },
  {
    ...notificationBanner[BannerNotification.APPLICATION_CLOSED],
    show: (caseData: Partial<CaseWithId>): boolean => {
      return caseData?.state === State.ALL_FINAL_ORDERS_ISSUED && !isCaseWithdrawn(caseData);
    },
  },
  {
    ...notificationBanner[BannerNotification.NEW_ORDER],
    show: (caseData: Partial<CaseWithId>): boolean => {
      return caseData?.state !== State.ALL_FINAL_ORDERS_ISSUED && hasOrders(caseData as CaseWithId);
    },
  },
  {
    ...notificationBanner[BannerNotification.GIVE_RESPONDENT_THEIR_DOCUMENTS],
    show: (caseData: Partial<CaseWithId>, userDetails: UserDetails): boolean => {
      return (
        isCaseLinked(caseData, userDetails) &&
        isPrimaryApplicant(caseData, userDetails) &&
        isApplicantLIPServingRespondent(caseData)
      );
    },
  },
  {
    ...notificationBanner[BannerNotification.CA_PERSONAL_SERVICE],
    show: (caseData: Partial<CaseWithId>, userDetails: UserDetails): boolean => {
      return (
        isCaseLinked(caseData, userDetails) &&
        !isPrimaryApplicant(caseData, userDetails) &&
        isApplicantLIPServingRespondent(caseData)
      );
    },
  },
  ...generateResponseNotifications(userCase),
  {
    ...notificationBanner[BannerNotification.SUMBIT_FM5],
    show: (caseData: Partial<CaseWithId>): boolean => {
      const notification = caseData?.citizenNotifications?.find(
        citizenNotification => citizenNotification.id === 'CAN_10'
      );

      return notification?.show ?? false;
    },
  },
];
