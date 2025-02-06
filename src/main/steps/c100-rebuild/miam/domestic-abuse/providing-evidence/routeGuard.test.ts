import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('miam > domestic-abuse > providing-evidence > routeGuard', () => {
  test('should clean miam domestic abuse evidence documents when not providing evidence', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();
    req.body = {
      miam_canProvideDomesticAbuseEvidence: 'No',
    };
    req.session.userCase = {
      miam_nonAttendanceReasons: ['domesticViolence'],
      miam_domesticAbuse: ['policeInvolvement'],
      miam_domesticAbuse_policeInvolvement_subfields: ['evidenceOfSection24Notice'],
      miam_domesticAbuseEvidenceDocs: [
        {
          id: '1234',
          url: 'MOCK_URL',
          filename: 'MOCK_FILENAME',
          binaryUrl: 'MOCK_BINARY_URL',
        },
      ],
    };

    await routeGuard.post(req, res, next);
    expect(req.session.userCase).toStrictEqual({
      miam_nonAttendanceReasons: ['domesticViolence'],
      miam_domesticAbuse: ['policeInvolvement'],
      miam_domesticAbuse_policeInvolvement_subfields: ['evidenceOfSection24Notice'],
      miam_domesticAbuseEvidenceDocs: [],
    });
    expect(next).toHaveBeenCalled();
  });
});
