import { DateTime } from 'luxon';

import { Case } from '../../../../app/case/case';
import { AppRequest } from '../../../../app/controller/AppRequest';

import { generateHearingDaySchedule, generateHearingTimeDisplayText } from './utils';

describe('Generate hearing time display text', () => {
  test('should return time with offset when in BST', () => {
    const utcDate = DateTime.fromISO('2025-10-22T08:00:00Z', { zone: 'utc' });
    const londonDateTime = utcDate.setZone('Europe/London');
    const result = generateHearingTimeDisplayText(londonDateTime);
    expect(result).toBe('9:00 am');
  });

  test('should return time without offset when in GMT', () => {
    const utcDate = DateTime.fromISO('2025-01-22T14:30:00Z', { zone: 'utc' });
    const londonDateTime = utcDate.setZone('Europe/London');
    const result = generateHearingTimeDisplayText(londonDateTime);
    expect(result).toBe('2:30 pm');
  });

  test('should handle midday correctly', () => {
    const utcDate = DateTime.fromISO('2025-06-22T11:00:00Z', { zone: 'utc' });
    const londonDateTime = utcDate.setZone('Europe/London');
    const result = generateHearingTimeDisplayText(londonDateTime);
    expect(result).toBe('12:00 pm');
  });
});

describe('generateHearingDaySchedule', () => {
  jest.mock('./utils', () => ({
    generateHearingTimeDisplayText: jest.fn().mockReturnValue('12:00pm'),
  }));
  jest.mock('./utils', () => ({
    generateHearingScheduleDisplayText: jest.fn().mockReturnValue('2 hours 30 minutes'),
  }));
  const mockReq = {
    session: {
      lang: 'en',
    },
  };

  const mockHearing = {
    hearingDaySchedule: [
      {
        hearingStartDateTime: '2024-10-28T12:00:00Z',
        hearingEndDateTime: '2024-10-28T14:30:00Z',
        hearingJudgeName: 'Judge Judy',
        hearingVenueName: 'Crown Court',
        hearingVenueAddress: '123 Law St',
        hearingRoomId: 'Room 5',
      },
    ],
  };

  it('should correctly calculate the duration in hours and minutes', () => {
    const hearingDays = [];

    const result = generateHearingDaySchedule(
      mockHearing,
      mockReq as unknown as AppRequest<Partial<Case>>, // Corrected line
      hearingDays,
      'In-person'
    );

    expect(result).toHaveLength(1);

    const schedule = result[0];

    expect(schedule.durationInDayOrHours).toBe(2);
    expect(schedule.minutes).toBe(30);
  });
});
