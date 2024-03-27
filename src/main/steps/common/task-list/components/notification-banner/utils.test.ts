import { BannerNotification, notificationBanner } from './utils';

describe('notification Banner', () => {
  test.each([
    BannerNotification.APPLICATION_NOT_STARTED,
    BannerNotification.APPLICATION_IN_PROGRESS,
    BannerNotification.APPLICATION_SUBMITTED,
    BannerNotification.APPLICATION_WITHDRAWN,
    BannerNotification.WITHDRAWAL_REQ_REJECTED,
    BannerNotification.APPLICATION_SENT_TO_LOCAL_COURT,
    BannerNotification.APPLICATION_SENT_TO_GATE_KEEPING,
    BannerNotification.APPLICATION_SERVED_LINKED,
    BannerNotification.APPLICATION_CLOSED,
    BannerNotification.NEW_ORDER,
    BannerNotification.FINAL_ORDER,
    BannerNotification.DA_RESPONDENT_BANNER,
  ])('should have show as false by default', notification => {
    expect(notificationBanner[notification].show()).toBe(false);
  });
});
