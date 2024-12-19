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
  test('should contain 1 entries in respondent 1 screen sequence', () => {
    const sequence = C8RefugeSequence.getSequence();
    expect(sequence).toHaveLength(5);

    expect(sequence[0].url).toBe('/:root/refuge/staying-in-refuge/:id?');
    expect(sequence[0].showInSection).toBe('c100');
    expect(sequence[0].getNextStep(refugeMockData.session.userCase, refugeMockData)).toBe(
      '/applicant/confirm-contact-details/addressdetails'
    );

    expect(sequence[1].url).toBe('/:root/refuge/keeping-details-safe/:id?');
    expect(sequence[1].showInSection).toBe('c100');
    expect(sequence[1].getNextStep(refugeMockData.session.userCase, refugeMockData)).toBe(
      '/applicant/refuge/upload-refuge-document'
    );

    expect(sequence[2].url).toBe('/:root/refuge/upload-refuge-document/:removeFileId?');
    expect(sequence[2].showInSection).toBe('c100');
    expect(sequence[2].getNextStep(refugeMockData.session.userCase, refugeMockData)).toBe(
      '/applicant/confirm-contact-details/addressdetails'
    );

    expect(sequence[3].url).toBe('/:root/refuge/upload-refuge-document/:id/:removeFileId?');
    expect(sequence[3].showInSection).toBe('c100');
    expect(sequence[3].getNextStep(refugeMockData.session.userCase, refugeMockData)).toBe(
      '/applicant/confirm-contact-details/addressdetails'
    );

    expect(sequence[4].url).toBe('/:root/refuge/refuge-document-already-uploaded/:id?');
    expect(sequence[4].showInSection).toBe('c100');
    expect(sequence[4].getNextStep(refugeMockData.session.userCase, refugeMockData)).toBe(
      '/applicant/confirm-contact-details/addressdetails'
    );
  });
});
