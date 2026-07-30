import { mockRequest } from '../../../../test/unit/utils/mockRequest';

import { C8RefugeSequence } from './sequence';

const refugeMockData = mockRequest({
  params: {
    root: '/respondent',
  },
  session: {
    userCase: {},
  },
});

describe('C8 refuge > sequence', () => {
  test('should contain 2 entries in refuge sequence', () => {
    const sequence = C8RefugeSequence.getSequence();
    expect(sequence).toHaveLength(2);

    expect(sequence[0].url).toBe('/:root/refuge/staying-in-refuge/:id?');
    expect(sequence[0].showInSection).toBe('c100');
    expect(sequence[0].getNextStep(refugeMockData.session.userCase, refugeMockData)).toBe(
      '/applicant/confirm-contact-details/addressdetails'
    );

    expect(sequence[1].url).toBe('/:root/refuge/keeping-details-safe/:id?');
    expect(sequence[1].showInSection).toBe('c100');
    expect(sequence[1].getNextStep(refugeMockData.session.userCase, refugeMockData)).toBe(
      '/applicant/confirm-contact-details/addressdetails'
    );
  });
});
