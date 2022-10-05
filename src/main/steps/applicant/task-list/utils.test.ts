import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { CaseWithId } from '../../../app/case/case';
import { SectionStatus, State, YesOrNo } from '../../../app/case/definition';

import {
  getApplicantAllegationsOfHarmAndViolence,
  getApplicantResponseToRequestForChildArrangements,
  getApplicantViewAllOrdersFromTheCourtAllDocuments,
  getConfirmOrEditYourContactDetails,
  getKeepYourDetailsPrivateStatus,
  getMiamStatus,
  getViewAllDocuments,
  getYourApplication,
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
    ])('should return correct status %#', async ({ data, expected }) => {
      console.log(data);
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
          miamStart: undefined,
          miamWillingness: undefined,
        },
        expected: 'TO_DO',
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getMiamStatus(data)).toBe(expected);
    });
  });
});
