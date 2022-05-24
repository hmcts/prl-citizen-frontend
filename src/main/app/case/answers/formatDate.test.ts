import { CaseDate } from '../case';

import { getFormattedDate } from './formatDate';

describe('Format case date', () => {
  it('returns a formatted case date when date is set', () => {
    expect(getFormattedDate({ year: '1999', month: '12', day: '31' })).toBe('31 December 1999');
  });

  it('returns a single day digit date when date is set', () => {
    expect(getFormattedDate({ year: '1999', month: '12', day: '1' })).toBe('1 December 1999');
  });

  it('returns false when the date is not set', () => {
    expect(getFormattedDate(undefined)).toBe('');
  });

  it('returns blank when the date is incomplete', () => {
    expect(getFormattedDate({ year: '', month: '', day: '' } as unknown as CaseDate)).toBe('');
  });
});
