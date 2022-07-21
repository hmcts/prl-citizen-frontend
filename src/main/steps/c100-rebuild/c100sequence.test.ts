import { C100Sequence } from './c100sequence';

describe('C100Sequence', () => {
  test('should contain 1 entries in c100 screen sequence', () => {
    expect(C100Sequence).toHaveLength(2);
    expect(C100Sequence[0].url).toBe('/confidentiality/details-know');
    expect(C100Sequence[0].showInSection).toBe('c100');
    expect(C100Sequence[0].getNextStep({})).toBe('/confidentiality/details-know');

    expect(C100Sequence[1].url).toBe('/confidentiality/start');
    expect(C100Sequence[1].showInSection).toBe('c100');
    expect(C100Sequence[1].getNextStep({})).toBe('/confidentiality/start');
  });
});
