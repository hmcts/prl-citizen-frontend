/*import { CaseWithId } from '../../../../../app/case/case';
import { Applicant, CaseType, CitizenNotificationId, State } from '../../../../../app/case/definition';
import { UserDetails } from '../../../../../app/controller/AppRequest';*/

import { NOTIFICATION_BASE_CONFIG } from './config';
import { languages as content } from './content';
import { NotificationType } from './definitions';
//import { getCRNF2NewOrderHeading, isApplicantLIPServingRespondent, isPrimaryApplicant } from './utils';

describe('notification Banner', () => {
  /*const data = {
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
  } as Partial<CaseWithId>;*/

  test.each([
    NotificationType.APPLICATION_NOT_STARTED,
    NotificationType.APPLICATION_IN_PROGRESS,
    NotificationType.APPLICATION_SUBMITTED,
    NotificationType.APPLICATION_WITHDRAWN,
    NotificationType.WITHDRAWAL_REQ_REJECTED,
    NotificationType.APPLICATION_SENT_TO_LOCAL_COURT,
    NotificationType.APPLICATION_SENT_TO_GATE_KEEPING,
    NotificationType.APPLICATION_SERVED_BY_COURT_PERSONAL_NONPERSONAL_SERVICE,
    NotificationType.APPLICATION_CLOSED,
    NotificationType.NEW_ORDER,
    NotificationType.FINAL_ORDER,
    NotificationType.DA_RESPONDENT_BANNER,
    NotificationType.APPLICANT_TO_PERSONALLY_SERVE_RESPONDENT,
    NotificationType.APPLICATION_ISSUED_BY_COURT_PERSONAL_SERVICE,
    NotificationType.VIEW_RESPONSE_TO_APPLICATION,
    NotificationType.APPLICATION_SERVED_BY_COURT_TO_RESPONDENT,
    NotificationType.SUMBIT_FM5,
    NotificationType.CRNF2_NEW_ORDER,
  ])('should have show as false by default', notification => {
    expect(NOTIFICATION_BASE_CONFIG.find(config => config.id === notification)?.show()).toBe(false);
  });

  /*test('isPrimaryApplicant should return true when user is first applicant', () => {
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

  describe('getCRNF2NewOrderHeading', () => {
    test('should return correct translation for heading when multiple final orders', () => {
      expect(
        getCRNF2NewOrderHeading(
          {
            id: 'CRNF2_APPLICANT_RESPONDENT' as CitizenNotificationId,
            show: true,
            isMultipleOrders: true,
            isFinalOrder: true,
          },
          content.en
        )
      ).toBe('final');
    });

    test('should return correct translation for heading when multiple orders', () => {
      expect(
        getCRNF2NewOrderHeading(
          {
            id: 'CRNF2_APPLICANT_RESPONDENT' as CitizenNotificationId,
            show: true,
            isMultipleOrders: true,
            isFinalOrder: false,
          },
          content.en
        )
      ).toBe('new');
    });

    test('should return correct translation for heading when single final order', () => {
      expect(
        getCRNF2NewOrderHeading(
          {
            id: 'CRNF2_APPLICANT_RESPONDENT' as CitizenNotificationId,
            show: true,
            isMultipleOrders: false,
            isFinalOrder: true,
          },
          content.en
        )
      ).toBe('a final');
    });

    test('should return correct translation for heading when single order', () => {
      expect(
        getCRNF2NewOrderHeading(
          {
            id: 'CRNF2_APPLICANT_RESPONDENT' as CitizenNotificationId,
            show: true,
            isMultipleOrders: false,
            isFinalOrder: false,
          },
          content.en
        )
      ).toBe('a new');
    });

    test('should return correct translation for heading when new and final order', () => {
      expect(
        getCRNF2NewOrderHeading(
          {
            id: 'CRNF2_APPLICANT_RESPONDENT' as CitizenNotificationId,
            show: true,
            newAndFinalOrder: true,
          },
          content.en
        )
      ).toBe('new and final');
    });
  });
});
*/