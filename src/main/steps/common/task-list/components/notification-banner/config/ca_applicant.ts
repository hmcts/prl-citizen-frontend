/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { CaseWithId } from '../../../../../../app/case/case';
import { State, YesOrNo } from '../../../../../../app/case/definition';
import { UserDetails } from '../../../../../../app/controller/AppRequest';
import { NotificationBannerProps } from '../../../../../../steps/common/task-list/definitions';
import { isCaseLinked, isCaseWithdrawn } from '../../../../../../steps/common/task-list/utils';
import { BannerNotification, isApplicantLIPServingRespondent, isPrimaryApplicant, notificationBanner } from '../utils';

export const CA_APPLICANT: NotificationBannerProps[] = [
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
      return caseData?.state === State.CASE_SERVED && isCaseLinked(caseData, userDetails);
    },
  },
  {
    ...notificationBanner[BannerNotification.APPLICATION_CLOSED],
    show: (caseData: Partial<CaseWithId>): boolean => {
      return caseData?.state === State.CASE_CLOSED && !isCaseWithdrawn(caseData);
    },
  },
  {
    ...notificationBanner[BannerNotification.NEW_ORDER],
    show: (caseData: Partial<CaseWithId>): boolean => {
      return caseData?.state !== State.CASE_CLOSED && !!caseData?.orderCollection?.length;
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
];
