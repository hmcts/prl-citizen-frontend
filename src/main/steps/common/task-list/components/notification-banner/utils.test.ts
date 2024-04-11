import { CaseWithId } from '../../../../../app/case/case';
import { Applicant, CaseType, Respondent, State } from '../../../../../app/case/definition';
import { UserDetails } from '../../../../../app/controller/AppRequest';

import {
  BannerNotification,
  hasResponseBeenSubmitted,
  isApplicantLIPServingRespondent,
  isPrimaryApplicant,
  notificationBanner,
} from './utils';

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
    BannerNotification.FINAL_ORDER,
    BannerNotification.DA_RESPONDENT_BANNER,
    BannerNotification.GIVE_RESPONDENT_THEIR_DOCUMENTS,
    BannerNotification.CA_PERSONAL_SERVICE,
    BannerNotification.RESPONSE_SUBMITTED,
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

  test('hasResponseBeenSubmitted should return true if response document is present', () => {
    expect(
      hasResponseBeenSubmitted(
        {
          citizenDocuments: [
            {
              partyId: '1',
              partyName: null,
              partyType: 'respondent',
              categoryId: 'respondentApplication',
              uploadedBy: 'test user',
              uploadedDate: '2024-03-11T16:24:33.122506',
              reviewedDate: '2024-03-11T16:24:33.122506',
              document: {
                document_url: 'MOCK_DOCUMENT_URL',
                document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                document_filename: 'MOCK_FILENAME',
                document_hash: null,
                category_id: 'respondentApplication',
                document_creation_date: '2024-03-11T16:24:33.122506',
              },
              documentWelsh: null,
            },
          ],
        } as unknown as CaseWithId,
        {
          id: '1',
          value: {
            user: {
              idamId: '1',
            },
          },
        } as Respondent
      )
    ).toBe(true);
  });

  test('hasResponseBeenSubmitted should return false if response document is notpresent', () => {
    expect(
      hasResponseBeenSubmitted(
        {
          citizenDocuments: [
            {
              partyId: '1',
              partyName: null,
              partyType: 'respondent',
              categoryId: 'positionStatements',
              uploadedBy: 'test user',
              uploadedDate: '2024-03-11T16:24:33.122506',
              reviewedDate: '2024-03-11T16:24:33.122506',
              document: {
                document_url: 'MOCK_DOCUMENT_URL',
                document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                document_filename: 'MOCK_FILENAME',
                document_hash: null,
                category_id: 'positionStatements',
                document_creation_date: '2024-03-11T16:24:33.122506',
              },
              documentWelsh: null,
            },
          ],
        } as unknown as CaseWithId,
        {
          id: '1',
          value: {
            user: {
              idamId: '1',
            },
          },
        } as Respondent
      )
    ).toBe(false);
  });
});
