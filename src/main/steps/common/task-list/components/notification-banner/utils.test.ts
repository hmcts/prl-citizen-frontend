import { CaseWithId } from '../../../../../app/case/case';
import { Applicant, CaseType, State } from '../../../../../app/case/definition';
import { UserDetails } from '../../../../../app/controller/AppRequest';

import { BannerNotification, isApplicantLIPServingRespondent, isPrimaryApplicant, notificationBanner } from './utils';

describe('notification Banner', () => {
  const data = {
    id: '12',
    state: State.CASE_DRAFT,
    caseTypeOfApplication: CaseType.C100,
    applicants: [
      {
        id: '123456',
        value: {
          user: {
            email: 'string',
            idamId: '123',
          },
        },
      } as unknown as Applicant,
      {
        id: '1234567',
        value: {
          user: {
            email: 'string',
            idamId: '1233',
          },
        },
      } as unknown as Applicant,
    ],
  } as Partial<CaseWithId>;

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
    BannerNotification.NEW_DOCUMENT,
    BannerNotification.FINAL_ORDER,
    BannerNotification.DA_RESPONDENT_BANNER,
    BannerNotification.GIVE_RESPONDENT_THEIR_DOCUMENTS,
    BannerNotification.CA_PERSONAL_SERVICE,
  ])('should have show as false by default', notification => {
    expect(notificationBanner[notification].show()).toBe(false);
  });

  test('isPrimaryApplicant should return true when user is first applicant', () => {
    expect(isPrimaryApplicant(data, { id: '123' } as UserDetails)).toBe(true);
  });

  test('isPrimaryApplicant should return false when user is not first applicant', () => {
    expect(isPrimaryApplicant(data, { id: '1234' } as UserDetails)).toBe(false);
  });

  test('isApplicantLIPServingRespondent should return true when isApplicationToBeServed flag is present', () => {
    const applicant = {
      id: '123456',
      value: {
        user: {
          email: 'string',
          idamId: '123',
        },
        response: {
          citizenFlags: {
            isApplicationToBeServed: 'Yes',
          },
        },
      },
    } as unknown as Applicant;

    expect(
      isApplicantLIPServingRespondent({
        ...data,
        state: 'PREPARE_FOR_HEARING_CONDUCT_HEARING',
        applicants: [applicant],
      } as Partial<CaseWithId>)
    ).toBe(true);
  });

  test('isApplicantLIPServingRespondent should return false when isApplicationToBeServed flag is not present', () => {
    expect(
      isApplicantLIPServingRespondent({
        ...data,
        state: 'PREPARE_FOR_HEARING_CONDUCT_HEARING',
      } as Partial<CaseWithId>)
    ).toBe(false);
  });
});
