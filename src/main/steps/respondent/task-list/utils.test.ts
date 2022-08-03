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
          applicant1FullName: undefined,
          applicant1DateOfBirth: undefined,
          applicant1PlaceOfBirth: undefined,
        },
        expected: SectionStatus.NOT_STARTED,
      },
      {
        data: {
          ...mockUserCase,
          applicant1FullName: 'Test',
          applicant1DateOfBirth: date,
          applicant1PlaceOfBirth: 'date',
        },
        expected: SectionStatus.COMPLETED,
      },
      { data: { ...mockUserCase, applicant1FullName: 'Test' }, expected: SectionStatus.IN_PROGRESS },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getConfirmOrEditYourContactDetails({ ...userCase, ...data })).toBe(expected);
    });
  });
  describe('getConsentToApplicationStatus', () => {
    test.each([
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
          //applicant1PlaceOfBirth: '10-10-2015',
        },
        expected: SectionStatus.COMPLETED,
      },
      { data: { ...mockUserCase, doYouConsent: YesOrNo.NO }, expected: SectionStatus.IN_PROGRESS },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getConsentToApplicationStatus({ ...userCase, ...data })).toBe(expected);
    });
  });
  describe('getCurrentOrOtherProceedingsStatus', () => {
    test.each([
      {
        data: {
          ...mockUserCase,
          proceedingsStart: undefined,
          proceedingsStartOrder: undefined,
          emergencyOrderOptions: undefined,
          supervisionOrderOption: undefined,
          careOrderOptions: undefined,
          childAbductionOrderOption: undefined,
          caOrderOption: undefined,
          financialOrderOption: undefined,
          nonmolestationOrderOption: undefined,
          occupationalOrderOptions: undefined,
          marraigeOrderOptions: undefined,
          restrainingOrderOptions: undefined,
          injuctiveOrderOptions: undefined,
          underTakingOrderOptions: undefined,
        },
        expected: SectionStatus.TO_DO,
      },
      {
        data: {
          ...mockUserCase,
          proceedingsStart: 'undefined',
          proceedingsStartOrder: 'undefined',
          emergencyOrderOptions: YesOrNo.NO,
          supervisionOrderOption: YesOrNo.NO,
          careOrderOptions: YesOrNo.NO,
          childAbductionOrderOption: YesOrNo.NO,
          caOrderOption: YesOrNo.NO,
          financialOrderOption: YesOrNo.NO,
          nonmolestationOrderOption: YesOrNo.NO,
          occupationalOrderOptions: YesOrNo.NO,
          marraigeOrderOptions: YesOrNo.NO,
          restrainingOrderOptions: YesOrNo.NO,
          injuctiveOrderOptions: YesOrNo.NO,
          underTakingOrderOptions: YesOrNo.NO,
        },
        expected: SectionStatus.COMPLETED,
      },
      {
        data: {
          ...mockUserCase,
          proceedingsStart: 'undefined',
          proceedingsStartOrder: 'undefined',
          emergencyOrderOptions: undefined,
          supervisionOrderOption: YesOrNo.NO,
          careOrderOptions: undefined,
          childAbductionOrderOption: undefined,
          caOrderOption: undefined,
          financialOrderOption: undefined,
          nonmolestationOrderOption: undefined,
          occupationalOrderOptions: undefined,
          marraigeOrderOptions: undefined,
          restrainingOrderOptions: undefined,
          injuctiveOrderOptions: undefined,
          underTakingOrderOptions: undefined,
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
      expect(getKeepYourDetailsPrivateStatus({ ...userCase, ...data })).toBe(expected);
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
