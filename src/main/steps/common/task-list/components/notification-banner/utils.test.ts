import { CaseWithId } from '../../../../../app/case/case';
import { Respondent } from '../../../../../app/case/definition';

import { BannerNotification, hasResponseBeenSubmitted, notificationBanner } from './utils';

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
    BannerNotification.NEW_DOCUMENT,
    BannerNotification.FINAL_ORDER,
    BannerNotification.DA_RESPONDENT_BANNER,
    BannerNotification.RESPONSE_SUBMITTED,
  ])('should have show as false by default', notification => {
    expect(notificationBanner[notification].show()).toBe(false);
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
