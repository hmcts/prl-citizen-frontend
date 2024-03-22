import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { CaseWithId } from '../../../app/case/case';
import { State } from '../../../app/case/definition';

import {
  getApplicantAllegationsOfHarmAndViolence,
  getApplicantPartyDetails,
  getSupportYourNeedsDetails,
} from './utils';

const userCase: CaseWithId = {
  ...mockUserCase,
  id: '123',
  state: State.SUBMITTED_PAID,
  serviceType: '',
};

describe('utils', () => {
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
  test('getApplicantPartyDetails', () => {
    const data = {
      id: '12',
      state: State.CASE_SUBMITTED_NOT_PAID,
    };

    expect(getApplicantPartyDetails(userCase, data.id)).toStrictEqual(undefined);
  });
});
