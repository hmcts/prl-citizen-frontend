import { CaseProgressionStage, progressBarStage } from './utils';

describe('progress-bar', () => {
  test.each([
    CaseProgressionStage.APPLICATION_SUBMITTED,
    CaseProgressionStage.CAFCASS_SAFETY_CHECKS,
    CaseProgressionStage.RESPONSE_SUBMITTED,
    CaseProgressionStage.HEARING_AND_COURT_ORDERS,
    CaseProgressionStage.CASE_OPENED,
    CaseProgressionStage.FINAL_ORDER,
    CaseProgressionStage.CASE_CLOSED,
  ])('stages should have isInProgress and isComplete as false by default', notification => {
    expect(progressBarStage[notification].isInProgress()).toBe(false);
    expect(progressBarStage[notification].isComplete()).toBe(false);
  });
});
