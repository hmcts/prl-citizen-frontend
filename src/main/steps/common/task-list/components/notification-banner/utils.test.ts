import { CaseWithId, CitizenNotification } from '../../../../../app/case/case';
import { Applicant, CaseType, PartyDetails, PartyType, Respondent, State } from '../../../../../app/case/definition';
import { UserDetails } from '../../../../../app/controller/AppRequest';
import { CitizenApplicationPacks, CitizenDocuments } from '../../../documents/definitions';

import { NOTIFICATION_BASE_CONFIG } from './config';
import { languages as content } from './content/base.content';
import { NotificationID, NotificationType } from './definitions';
import {
  findC7ResponseDocument,
  findNotification,
  getNotificationConfig,
  getOrderNotificationHeading,
  hasMoreThanOneApplicant,
  isApplicationPackAvailable,
  isCafcassCymruServed,
  isCafcassServed,
  isPartyServed,
  isPersonalServiceByCourt,
  showNotification,
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
            idamId: '123456',
          },
        },
      } as unknown as Applicant,
      {
        id: '1234567',
        value: {
          user: {
            email: 'string',
            idamId: '123456',
          },
        },
      } as unknown as Applicant,
    ],
  } as CaseWithId;

  test.each([
    NotificationType.APPLICATION_NOT_STARTED,
    NotificationType.APPLICATION_IN_PROGRESS,
    NotificationType.APPLICATION_SUBMITTED,
    NotificationType.APPLICATION_WITHDRAWN,
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
    NotificationType.ORDER_PERSONAL_SERVICE,
  ])('should have show as false by default', notification => {
    expect(NOTIFICATION_BASE_CONFIG.find(config => config.id === notification)?.show!()).toBe(false);
  });

  describe('getCRNF2NewOrderHeading', () => {
    test('should return correct translation for heading when multiple final orders', () => {
      expect(
        getOrderNotificationHeading(
          {
            id: 'CRNF2_APPLICANT_RESPONDENT',
            show: true,
            multiple: true,
            final: true,
            new: false,
          } as CitizenNotification,
          content.en.common
        )
      ).toBe('final');
    });

    test('should return correct translation for heading when multiple orders', () => {
      expect(
        getOrderNotificationHeading(
          {
            id: 'CRNF2_APPLICANT_RESPONDENT',
            show: true,
            multiple: true,
            final: false,
            new: false,
          } as CitizenNotification,
          content.en.common
        )
      ).toBe('new');
    });

    test('should return correct translation for heading when single final order', () => {
      expect(
        getOrderNotificationHeading(
          {
            id: 'CRNF2_APPLICANT_RESPONDENT',
            show: true,
            multiple: false,
            final: true,
            new: false,
          } as CitizenNotification,
          content.en.common
        )
      ).toBe('a final');
    });

    test('should return correct translation for heading when single order', () => {
      expect(
        getOrderNotificationHeading(
          {
            id: 'CRNF2_APPLICANT_RESPONDENT',
            show: true,
            multiple: false,
            final: false,
            new: false,
          } as CitizenNotification,
          content.en.common
        )
      ).toBe('a new');
    });

    test('should return correct translation for heading when new and final order', () => {
      expect(
        getOrderNotificationHeading(
          {
            id: 'CRNF2_APPLICANT_RESPONDENT',
            show: true,
            new: true,
            multiple: false,
            final: true,
          } as CitizenNotification,
          content.en.common
        )
      ).toBe('new and final');
    });
  });

  describe('getNotificationConfig', () => {
    test('should return correct configs for CA applicant', () => {
      const config = getNotificationConfig(
        'C100' as CaseType,
        'applicant' as PartyType,
        {
          respondents: [
            {
              id: '1',
              value: {} as PartyDetails,
            },
          ],
        } as CaseWithId
      );

      expect(config).toHaveLength(12);
      expect(config[0].id).toBe('applicationNotStarted');
      expect(config[1].id).toBe('applicationInProgress');
      expect(config[2].id).toBe('applicationSubmitted');
      expect(config[3].id).toBe('applicationWithdrawn');
      expect(config[4].id).toBe('applicationServedByCourtPersonalNonPersonalService');
      expect(config[5].id).toBe('viewResponseToApplication');
      expect(config[6].id).toBe('applicantToPersonallyServeRespondent');
      expect(config[7].id).toBe('applicationIssuedByCourtPersonalService');
      expect(config[8].id).toBe('submitFM5');
      expect(config[9].id).toBe('applicationClosed');
      expect(config[10].id).toBe('orderNonPersonalService');
      expect(config[11].id).toBe('orderPersonalService');
    });

    test('should return correct configs for CA respondent', () => {
      const config = getNotificationConfig('C100' as CaseType, 'respondent' as PartyType, {} as CaseWithId);

      expect(config).toHaveLength(3);
      expect(config[0].id).toBe('applicationServedByCourtToRespondent');
      expect(config[1].id).toBe('submitFM5');
      expect(config[2].id).toBe('orderNonPersonalService');
    });

    test('should return correct configs for DA applicant', () => {
      const config = getNotificationConfig('FL401' as CaseType, 'applicant' as PartyType, {} as CaseWithId);

      expect(config).toHaveLength(3);
      expect(config[0].id).toBe('newOrder');
      expect(config[1].id).toBe('finalOrder');
      expect(config[2].id).toBe('orderPersonalService');
    });

    test('should return correct configs for DA respondent', () => {
      const config = getNotificationConfig('FL401' as CaseType, 'respondent' as PartyType, {} as CaseWithId);

      expect(config).toHaveLength(3);
      expect(config[0].id).toBe('newOrder');
      expect(config[1].id).toBe('finalOrder');
      expect(config[2].id).toBe('daRespondentBanner');
    });
  });

  describe('isPartyServed', () => {
    test('should return true when party in application pack', () => {
      data.citizenApplicationPacks = [
        {
          partyId: '123456',
          wasCafcassServed: true,
          applicantSoaPack: [
            {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'positionStatements',
              document_creation_date: '01/01/2024',
            },
          ],
        },
      ] as unknown as CitizenApplicationPacks[];
      expect(isPartyServed(data, { id: '123456' } as UserDetails)).toBe(true);
    });

    test('should return false when party not served in application pack', () => {
      data.citizenApplicationPacks = [
        {
          partyId: '123',
          wasCafcassServed: true,
          applicantSoaPack: [
            {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'positionStatements',
              document_creation_date: '01/01/2024',
            },
          ],
        },
      ] as unknown as CitizenApplicationPacks[];
      expect(isPartyServed(data, { id: '1234' } as UserDetails)).toBe(false);
    });
  });

  describe('isApplicationPackAvailable', () => {
    test('should return correct application pack when party in application pack', () => {
      data.citizenApplicationPacks = [
        {
          partyId: '123456',
          wasCafcassServed: true,
          applicantSoaPack: [
            {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'positionStatements',
              document_creation_date: '01/01/2024',
            },
          ],
        },
      ] as unknown as CitizenApplicationPacks[];
      expect(isApplicationPackAvailable(data, 'applicant' as PartyType)).toStrictEqual([
        {
          category_id: 'positionStatements',
          document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
          document_creation_date: '01/01/2024',
          document_filename: 'MOCK_FILENAME',
          document_hash: null,
          document_url: 'MOCK_DOCUMENT_URL',
        },
      ]);
    });

    test('should return false when party not served in application pack', () => {
      data.citizenApplicationPacks = [
        {
          partyId: '123',
          wasCafcassServed: true,
          applicantSoaPack: [
            {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'positionStatements',
              document_creation_date: '01/01/2024',
            },
          ],
        },
      ] as unknown as CitizenApplicationPacks[];
      expect(isApplicationPackAvailable(data, 'respondent' as PartyType)).toBe(false);
    });
  });

  describe('isPersonalServiceByCourt', () => {
    test('should return true when personal service is present in notification', () => {
      data.citizenNotifications = [
        {
          id: 'CAN4_SOA_PERS_NONPERS_APPLICANT',
          show: true,
          personalService: true,
        },
      ] as unknown as CitizenNotification[];
      expect(isPersonalServiceByCourt(data)).toBe(true);
    });

    test('should return false when personal service is not present in notification', () => {
      data.citizenNotifications = [
        {
          id: 'CAN4_SOA_PERS_NONPERS_APPLICANT',
          show: true,
        },
      ] as unknown as CitizenNotification[];
      expect(isPersonalServiceByCourt(data)).toBe(false);
    });
  });

  describe('isCafcassServed', () => {
    test('should return true when wasCafcassServed is present in application pack', () => {
      data.citizenApplicationPacks = [
        {
          partyId: '123',
          wasCafcassServed: true,
          applicantSoaPack: [
            {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'positionStatements',
              document_creation_date: '01/01/2024',
            },
          ],
        },
      ] as unknown as CitizenApplicationPacks[];
      expect(isCafcassServed(data)).toBe(true);
    });

    test('should return false when wasCafcassServed is not present in application pack', () => {
      data.citizenApplicationPacks = [
        {
          partyId: '123',
          wasCafcassServed: false,
          applicantSoaPack: [
            {
              document_url: 'MOCK_DOCUMENT_URL',
              document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
              document_filename: 'MOCK_FILENAME',
              document_hash: null,
              category_id: 'positionStatements',
              document_creation_date: '01/01/2024',
            },
          ],
        },
      ] as unknown as CitizenApplicationPacks[];
      expect(isCafcassServed(data)).toBe(false);
    });

    describe('isCafcassCymruServed', () => {
      test('should return true when wasCafcassCymruServed is present in application pack', () => {
        data.citizenApplicationPacks = [
          {
            partyId: '123',
            wasCafcassCymruServed: true,
            applicantSoaPack: [
              {
                document_url: 'MOCK_DOCUMENT_URL',
                document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                document_filename: 'MOCK_FILENAME',
                document_hash: null,
                category_id: 'positionStatements',
                document_creation_date: '01/01/2024',
              },
            ],
          },
        ] as unknown as CitizenApplicationPacks[];
        expect(isCafcassCymruServed(data)).toBe(true);
      });

      test('should return false when wasCafcassCymruServed is not present in application pack', () => {
        data.citizenApplicationPacks = [
          {
            partyId: '123',
            wasCafcassCymruServed: false,
            applicantSoaPack: [
              {
                document_url: 'MOCK_DOCUMENT_URL',
                document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
                document_filename: 'MOCK_FILENAME',
                document_hash: null,
                category_id: 'positionStatements',
                document_creation_date: '01/01/2024',
              },
            ],
          },
        ] as unknown as CitizenApplicationPacks[];
        expect(isCafcassCymruServed(data)).toBe(false);
      });
    });
  });

  describe('showNotification', () => {
    test('should return true when show is true in notification', () => {
      data.citizenNotifications = [
        {
          id: 'CAN4_SOA_PERS_NONPERS_APPLICANT',
          show: true,
        },
      ] as unknown as CitizenNotification[];
      expect(showNotification('applicationServedByCourtPersonalNonPersonalService' as NotificationType, data)).toBe(
        true
      );
    });

    test('should return false when show is false in notification', () => {
      data.citizenNotifications = [
        {
          id: 'CAN4_SOA_PERS_NONPERS_APPLICANT',
          show: false,
        },
      ] as unknown as CitizenNotification[];
      expect(showNotification('CAN4_SOA_PERS_NONPERS_APPLICANT' as NotificationType, data)).toBe(false);
    });
  });

  describe('findNotification', () => {
    test('should find correct notification details', () => {
      data.citizenNotifications = [
        {
          id: 'CAN4_SOA_PERS_NONPERS_APPLICANT',
          show: true,
        },
      ] as unknown as CitizenNotification[];
      expect(findNotification(data, 'CAN4_SOA_PERS_NONPERS_APPLICANT' as NotificationID)).toStrictEqual({
        id: 'CAN4_SOA_PERS_NONPERS_APPLICANT',
        show: true,
      });
    });
  });

  describe('hasMoreThanOneApplicant', () => {
    test('should return true if more than one applicant', () => {
      expect(hasMoreThanOneApplicant(data)).toBe(true);
    });

    test('should return false if not more than one applicant', () => {
      expect(hasMoreThanOneApplicant({} as CaseWithId)).toBe(false);
    });
  });

  describe('findC7ResponseDocument', () => {
    test('should return C7 response document', () => {
      data.citizenDocuments = [
        {
          partyId: '1234',
          partyType: 'respondent',
          categoryId: 'respondentApplication',
          uploadedBy: 'test user2',
          uploadedDate: '2024-03-11T16:24:33.122506',
          reviewedDate: null,
          document: {
            document_url: 'MOCK_DOCUMENT_URL',
            document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
            document_filename: 'MOCK_FILENAME',
            document_hash: null,
            category_id: 'respondentApplication',
            document_creation_date: '01/01/2024',
          },
          documentWelsh: null,
        },
      ] as CitizenDocuments[];
      expect(
        findC7ResponseDocument(data, {
          value: {
            user: {
              idamId: '1234',
            },
          },
        } as Respondent)
      ).toStrictEqual({
        categoryId: 'respondentApplication',
        document: {
          category_id: 'respondentApplication',
          document_binary_url: 'MOCK_DOCUMENT_BINARY_URL',
          document_creation_date: '01/01/2024',
          document_filename: 'MOCK_FILENAME',
          document_hash: null,
          document_url: 'MOCK_DOCUMENT_URL',
        },
        documentWelsh: null,
        partyId: '1234',
        partyType: 'respondent',
        reviewedDate: null,
        uploadedBy: 'test user2',
        uploadedDate: '2024-03-11T16:24:33.122506',
      });
    });
  });
});
