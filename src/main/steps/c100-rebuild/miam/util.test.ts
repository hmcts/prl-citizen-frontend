import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { MiamNonAttendReason } from '../../../app/case/definition';

import { isAllowed } from './util';

const dummyRequest = mockRequest({
  query: {},
  session: {
    userCase: {
      miam_nonAttendanceReasons: ['childProtection', 'urgentHearing', 'validExemption'],
    },
  },
});

const dummyEmptyRequest = mockRequest({
  query: {},
  session: {
    userCase: {
      miam_nonAttendanceReasons: [],
    },
  },
});

const dummyNullRequest = mockRequest({
  query: {},
  session: {
    userCase: {},
  },
});

describe('isAllowed method', () => {
  test('isAllowed method should return true if the MIAM reason is valid when the respective reason details capture page is loaded', async () => {
    expect(isAllowed(MiamNonAttendReason.URGENT, dummyRequest.session.userCase)).toBe(true);
  });

  test('isAllowed method should return false if the MIAM reason is in valid when the respective reason details capture page is loaded', async () => {
    expect(isAllowed(MiamNonAttendReason.PREV_MIAM, dummyRequest.session.userCase)).toBe(false);
  });

  test('isAllowed metod should return false if value is null or undefined', async () => {
    expect(isAllowed(MiamNonAttendReason.PREV_MIAM, dummyEmptyRequest.session.userCase)).toBe(false);
  });

  test('isAllowed metod should return false if value is undefined', async () => {
    expect(isAllowed(MiamNonAttendReason.PREV_MIAM, dummyNullRequest.session.userCase)).toBe(false);
  });
});
