import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { CaseDate, CaseWithId } from '../../../app/case/case';
import { SectionStatus, State, YesOrNo } from '../../../app/case/definition';

import {
  getConfirmOrEditYourContactDetails,
  getConsentToApplicationStatus,
  getCurrentOrOtherProceedingsStatus,
  getInternationalFactorsStatus,
  getKeepYourDetailsPrivateStatus,
  getMiamStatus,
  getUploadDocuments,
  getViewAllDocuments,
  getViewAllHearingsFromTheCourt,
  getYourSafetyStatus,
} from './utils';

const userCase: CaseWithId = {
  id: '123',
  state: State.Submitted,
  serviceType: '',
};

describe('utils', () => {
  describe('getConfirmOrEditYourContactDetails', () => {
    const date: CaseDate = {
      year: 'string',
      month: 'string',
      day: 'string',
    };
    test.each([
      {
        data: {
          ...mockUserCase,
          citizenUserFullName: undefined,
          citizenUserDateOfBirth: undefined,
          citizenUserPlaceOfBirth: undefined,
        },
        expected: SectionStatus.IN_PROGRESS,
      },
      {
        data: {
          ...mockUserCase,
          citizenUserFullName: 'Test',
          citizenUserDateOfBirth: date,
          citizenUserPlaceOfBirth: 'date',
        },
        expected: SectionStatus.IN_PROGRESS,
      },
      { data: { ...mockUserCase, citizenUserFullName: 'Test' }, expected: SectionStatus.IN_PROGRESS },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getConfirmOrEditYourContactDetails({ ...userCase, ...data }, '123456')).toBe(expected);
    });
  });
  describe('getConsentToApplicationStatus', () => {
    test.skip.each([
      {
        data: {
          ...mockUserCase,
          doYouConsent: undefined,
          courtPermission: undefined,
          applicationReceivedDate: undefined,
        },
        expected: SectionStatus.TO_DO,
      },
      {
        data: {
          ...mockUserCase,
          doYouConsent: YesOrNo.NO,
          courtPermission: YesOrNo.NO,
          //applicationReceivedDate: '',
          //citizenUserPlaceOfBirth: '10-10-2015',
        },
        expected: SectionStatus.COMPLETED,
      },
      { data: { ...mockUserCase, doYouConsent: YesOrNo.NO }, expected: SectionStatus.IN_PROGRESS },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getConsentToApplicationStatus({ ...userCase, ...data }, '123456')).toBe(expected);
    });
  });
  describe('getCurrentOrOtherProceedingsStatus', () => {
    test.each([
      {
        data: {
          ...mockUserCase,
          proceedingsStart: undefined,
          proceedingsStartOrder: undefined,
        },
        expected: SectionStatus.TO_DO,
      },
      {
        data: {
          ...mockUserCase,
          proceedingsStart: YesOrNo.YES,
          proceedingsStartOrder: YesOrNo.YES,
        },
        expected: SectionStatus.COMPLETED,
      },
      {
        data: {
          ...mockUserCase,
          proceedingsStart: YesOrNo.YES,
          proceedingsStartOrder: YesOrNo.NO,
        },
        expected: SectionStatus.IN_PROGRESS,
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getCurrentOrOtherProceedingsStatus({ ...userCase, ...data })).toBe(expected);
    });
  });
  describe('getInternationalFactorsStatus', () => {
    test.each([
      {
        data: {
          ...mockUserCase,
          start: undefined,
          parents: undefined,
          jurisdiction: undefined,
          request: undefined,
          iFactorsJurisdictionProvideDetails: undefined,
          iFactorsParentsProvideDetails: undefined,
          iFactorsRequestProvideDetails: undefined,
          iFactorsStartProvideDetails: undefined,
        },
        expected: SectionStatus.TO_DO,
      },
      {
        data: {
          ...mockUserCase,
          start: YesOrNo.NO,
          parents: YesOrNo.NO,
          jurisdiction: YesOrNo.NO,
          request: YesOrNo.NO,
          iFactorsJurisdictionProvideDetails: undefined,
          iFactorsParentsProvideDetails: undefined,
          iFactorsRequestProvideDetails: undefined,
          iFactorsStartProvideDetails: undefined,
        },
        expected: SectionStatus.COMPLETED,
      },
      {
        data: {
          ...mockUserCase,
          start: undefined,
          parents: YesOrNo.NO,
          jurisdiction: undefined,
          request: YesOrNo.NO,
          iFactorsJurisdictionProvideDetails: undefined,
          iFactorsParentsProvideDetails: undefined,
          iFactorsRequestProvideDetails: undefined,
          iFactorsStartProvideDetails: undefined,
        },
        expected: SectionStatus.IN_PROGRESS,
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getInternationalFactorsStatus({ ...userCase, ...data })).toBe(expected);
    });
  });
  describe('getKeepYourDetailsPrivateStatus', () => {
    test.skip.each([
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
        expected: SectionStatus.COMPLETED,
      },
      {
        data: {
          ...mockUserCase,
          detailsKnown: 'undefined',
          startAlternative: undefined,
        },
        expected: SectionStatus.IN_PROGRESS,
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getKeepYourDetailsPrivateStatus({ ...userCase, ...data }, '1234567')).toBe(expected);
    });
  });
  describe('getMiamStatus', () => {
    test.each([
      {
        data: {
          ...mockUserCase,
          miamStart: undefined,
          miamWillingness: undefined,
        },
        expected: SectionStatus.TO_DO,
      },
      {
        data: {
          ...mockUserCase,
          miamStart: 'undefined',
          miamWillingness: 'undefined',
        },
        expected: SectionStatus.COMPLETED,
      },
      {
        data: {
          ...mockUserCase,
          miamStart: 'undefined',
          miamWillingness: undefined,
        },
        expected: SectionStatus.IN_PROGRESS,
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getMiamStatus({ ...userCase, ...data })).toBe(expected);
    });
  });
  describe('getYourSafetyStatus', () => {
    test.each([
      {
        data: {
          ...mockUserCase,
          safetyConcerns: undefined,
        },
        expected: SectionStatus.TO_DO,
      },
      {
        data: {
          ...mockUserCase,
          safetyConcerns: 'undefined',
        },
        expected: SectionStatus.COMPLETED,
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getYourSafetyStatus({ ...userCase, ...data })).toBe(expected);
    });
  });
});

test('should return correct status of court hearings', () => {
  expect(
    getViewAllHearingsFromTheCourt({
      ...mockUserCase,
      hearingCollection: [
        {
          prev: [
            {
              date: 'string',
              time: 'string',
              typeOfHearing: 'string',
              courtName: 'string',
              courtAddress: 'string',
              hearingOutcome: 'string',
            },
          ],
          next: {
            date: 'string',
            time: 'string',
            typeOfHearing: 'string',
            courtName: 'string',
            courtAddress: 'string',
            hearingOutcome: 'string',
          },
        },
      ],
    })
  ).toBe(SectionStatus.READY_TO_VIEW);
  expect(getViewAllHearingsFromTheCourt({ ...mockUserCase, hearingCollection: [] })).toBe(
    SectionStatus.NOT_AVAILABLE_YET
  );
});

test('should return correct status of get view all docs', () => {
  expect(getViewAllDocuments()).toBe(SectionStatus.READY_TO_VIEW);
});

test('should return correct status of get upload docs', () => {
  expect(getUploadDocuments()).toBe(SectionStatus.TO_DO);
});
