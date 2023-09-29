import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { CaseWithId } from '../../../app/case/case';
import { SectionStatus, State, YesOrNo } from '../../../app/case/definition';

import {
  getApplicantAllegationsOfHarmAndViolence,
  getApplicantResponseToRequestForChildArrangements,
  getApplicantViewAllHearingsFromTheCourt,
  getApplicantViewAllOrdersFromTheCourtAllDocuments,
  getConfirmOrEditYourContactDetails,
  getKeepYourDetailsPrivateStatus,
  getMiamStatus,
  getSupportYourNeedsDetails,
  getViewAllDocuments,
  getYourApplication,
  getYourWitnessStatement,
} from './utils';

const userCase: CaseWithId = {
  ...mockUserCase,
  id: '123',
  state: State.Submitted,
  serviceType: '',
};

describe('utils', () => {
  describe('getKeepYourDetailsPrivateStatus', () => {
    test.each([
      {
        data: {
          ...mockUserCase,
          detailsKnown: undefined,
          startAlternative: undefined,
        },
        expected: SectionStatus.TO_DO,
      },
      {
        data: {
          ...mockUserCase,
          detailsKnown: 'undefined',
          startAlternative: 'undefined',
        },
        expected: SectionStatus.TO_DO,
      },
      {
        data: {
          ...mockUserCase,
          detailsKnown: 'undefined',
          startAlternative: undefined,
        },
        expected: SectionStatus.TO_DO,
      },
      {
        data: {
          ...mockUserCase,
          applicantsFL401: {
            ...mockUserCase.applicantsFL401,
            response: {
              ...mockUserCase.applicantsFL401!.response,
              keepDetailsPrivate: {
                confidentiality: ['address'],
                otherPeopleKnowYourContactDetails: 'Yes',
              },
            },
          },
        } as unknown as CaseWithId,
        expected: SectionStatus.COMPLETED,
      },
      {
        data: {
          ...mockUserCase,
          applicantsFL401: {
            ...mockUserCase.applicantsFL401,
            response: {
              ...mockUserCase.applicantsFL401!.response,
              keepDetailsPrivate: {
                otherPeopleKnowYourContactDetails: 'Yes',
              },
            },
          },
        } as unknown as CaseWithId,
        expected: SectionStatus.IN_PROGRESS,
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getKeepYourDetailsPrivateStatus({ ...userCase, ...data }, '123456')).toBe(expected);
    });
  });
  describe('getConfirmOrEditYourContactDetails', () => {
    test.each([
      {
        data: {
          ...mockUserCase,
          citizenUserFullName: undefined,
          citizenUserDateOfBirth: undefined,
        },
        expected: SectionStatus.IN_PROGRESS,
      },
      {
        data: {
          ...mockUserCase,
          citizenUserFullName: YesOrNo.NO,
        },
        expected: SectionStatus.IN_PROGRESS,
      },
      {
        data: {
          ...mockUserCase,
          applicantsFL401: {
            ...mockUserCase.applicantsFL401,
            dateOfBirth: '1/1/2022',
            placeOfBirth: 'London',
          },
        } as unknown as CaseWithId,
        expected: SectionStatus.COMPLETED,
      },
      {
        data: {
          citizenUserFullName: 'Test',
          citizenUserDateOfBirth: {
            year: 'string',
            month: 'string',
            day: 'string',
          },
          citizenUserPlaceOfBirth: 'string',
        },
        expected: SectionStatus.IN_PROGRESS,
      },
      {
        data: {
          ...mockUserCase,
          caseTypeOfApplication: 'C100',
          respondents: [
            {
              id: '123456',
              value: {
                user: {
                  idamId: '123456',
                  email: 'test@example.net',
                },
                dateOfBirth: '1/1/2022',
                placeOfBirth: 'London',
                firstName: 'firstname',
                lastName: 'lastName',
              },
            },
          ],
        } as unknown as CaseWithId,
        expected: SectionStatus.COMPLETED,
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getConfirmOrEditYourContactDetails({ ...userCase, ...data }, '123456')).toBe(expected);
    });
  });
  describe('getYourApplication', () => {
    test.each([
      {
        data: {
          ...mockUserCase,
          doYouConsent: YesOrNo.NO,
          courtPermission: YesOrNo.NO,
        },
        expected: SectionStatus.DOWNLOAD,
      },
      { data: { ...mockUserCase, doYouConsent: YesOrNo.NO }, expected: SectionStatus.DOWNLOAD },
    ])('should return correct status %#', async ({ expected }) => {
      expect(getYourApplication()).toBe(expected);
    });
  });
  describe('getApplicantAllegationsOfHarmAndViolence', () => {
    test.each([
      {
        data: {
          ...mockUserCase,
          allegationsOfHarmYesNo: '',
        },
        expected: false,
      },
      {
        data: {
          ...mockUserCase,
          allegationsOfHarmYesNo: 'yes',
        },
        expected: true,
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getApplicantAllegationsOfHarmAndViolence({ ...userCase, ...data })).toBe(expected);
    });
  });
  describe('getApplicantResponseToRequestForChildArrangements', () => {
    test.each([
      {
        data: {
          ...mockUserCase,
          childrenKnownToLocalAuthority: '',
        },
        expected: false,
      },
      {
        data: {
          ...mockUserCase,
          childrenKnownToLocalAuthority: 'YesOrNo.NO',
        },
        expected: true,
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getApplicantResponseToRequestForChildArrangements({ ...userCase, ...data })).toBe(expected);
    });
  });

  describe('getApplicantViewAllOrdersFromTheCourtAllDocuments', () => {
    test.each([
      {
        data: {
          ...mockUserCase,
          orderCollection: [],
        },
        expected: false,
      },
      {
        data: {
          ...mockUserCase,
          orderCollection: [
            {
              id: '1234',
              value: {
                dateCreated: 'date',
                orderType: 'type',
                orderDocument: {
                  document_url: 'string',
                  document_filename: 'string',
                  document_binary_url: 'string',
                  document_hash: 'string',
                },
                orderDocumentWelsh: {
                  document_url: 'string',
                  document_filename: 'string',
                  document_binary_url: 'string',
                  document_hash: 'string',
                },
                otherDetails: {
                  createdBy: 'string',
                  orderCreatedDate: 'string',
                  orderMadeDate: 'string',
                  orderRecipients: 'string',
                },
              },
            },
          ],
        },
        expected: true,
      },
      {
        data: {
          ...mockUserCase,
          orderCollection: [],
        },
        expected: false,
      },
      {
        data: {
          ...mockUserCase,
          orderCollection: [],
        },
        expected: false,
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getApplicantViewAllOrdersFromTheCourtAllDocuments({ ...userCase, ...data })).toBe(expected);
    });
  });
  describe('getYourSafetyStatus', () => {
    test.each([
      {
        data: {
          ...mockUserCase,
        },
        expected: SectionStatus.READY_TO_VIEW,
      },
    ])('should return correct status %#', async ({ expected }) => {
      expect(getViewAllDocuments()).toBe(expected);
    });
  });
  describe('getMiamStatus', () => {
    test.each([
      {
        data: {
          ...mockUserCase,
          miamStart: 'Yes',
          miamWillingness: 'Yes',
        },
        expected: 'COMPLETED',
      },
      {
        data: {
          ...mockUserCase,
          miamStart: '',
          miamWillingness: '',
        },
        expected: 'TO_DO',
      },
      {
        data: {
          ...mockUserCase,
          miamStart: 'Yes',
          miamWillingness: undefined,
        },
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          ...mockUserCase,
          miamStart: undefined,
          miamWillingness: 'Yes',
        },
        expected: 'IN_PROGRESS',
      },
      {
        data: {
          ...mockUserCase,
          miamStart: undefined,
          miamWillingness: undefined,
        },
        expected: 'TO_DO',
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getMiamStatus(data)).toBe(expected);
    });
  });

  describe('getSupportYourNeedsDetails', () => {
    test.each([
      {
        data: {
          ...mockUserCase,
          languageRequirements: ['test'],
          reasonableAdjustments: ['test'],
          helpCommunication: ['test'],
          courtHearing: ['test'],
          docsSupport: ['test'],
          courtComfort: ['test'],
          safetyArrangements: ['tes'],
          attendingToCourt: ['test'],
        },
        expected: 'COMPLETED',
      },
      {
        data: {
          ...mockUserCase,
          languageRequirements: undefined,
          reasonableAdjustments: undefined,
          helpCommunication: undefined,
          courtHearing: undefined,
          docsSupport: undefined,
          courtComfort: undefined,
          safetyArrangements: undefined,
          travellingToCourt: undefined,
          unableForCourtProceedings: undefined,
        },
        expected: 'TO_DO',
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getSupportYourNeedsDetails(data)).toBe(expected);
    });
  });

  describe('getApplicantViewAllHearingsFromTheCourt', () => {
    test.each([
      {
        data: {
          ...mockUserCase,
          hearingCollection: [{ hearingID: 123 }],
        },
        expected: 'READY_TO_VIEW',
      },
      {
        data: {
          ...mockUserCase,
        },
        expected: 'TO_DO',
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getApplicantViewAllHearingsFromTheCourt(data)).toBe(expected);
    });
  });

  describe('getYourWitnessStatement', () => {
    test.each([
      {
        data: {
          ...mockUserCase,
          citizenUploadedDocumentList: [
            {
              id: '',
              value: {
                documentType: 'Your witness statements',
              },
            },
          ],
        } as unknown as CaseWithId,
        expected: 'DOWNLOAD',
      },
      {
        data: {
          ...mockUserCase,
        } as unknown as CaseWithId,
        expected: 'NOT_AVAILABLE_YET',
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getYourWitnessStatement(data)).toBe(expected);
    });
  });
});
