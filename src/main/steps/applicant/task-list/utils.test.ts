import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { CaseWithId } from '../../../app/case/case';
import { State } from '../../../app/case/definition';

import { getApplicantAllegationsOfHarmAndViolence, getApplicantPartyDetails } from './utils';

const userCase: CaseWithId = {
  ...mockUserCase,
  id: '123',
  state: State.Submitted,
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

  test('getApplicantPartyDetails', () => {
    const data = {
      id: '12',
      state: State.CASE_SUBMITTED_NOT_PAID,
    };

    expect(getApplicantPartyDetails(userCase, data.id)).toStrictEqual(undefined);
  });
});
