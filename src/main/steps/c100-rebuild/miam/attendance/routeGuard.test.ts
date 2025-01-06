import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('miam > attendance > routeGuard', () => {
  const req = mockRequest();
  const res = mockResponse();
  const next = jest.fn();
  beforeEach(() => {
    req.session.userCase = {
      miam_nonAttendanceReasons: ['domesticViolence', 'urgentHearing'],
      miam_domesticAbuse: ['policeInvolvement'],
      miam_domesticAbuse_policeInvolvement_subfields: ['evidenceOfSection24Notice'],
      miam_urgency: 'freedomPhysicalSafetyInFamily',
      miam_haveDocSigned: 'Yes',
      miam_certificate: {
        id: '1234',
        url: 'MOCK_URL',
        filename: 'MOCK_FILENAME',
        binaryUrl: 'MOCK_BINARY_URL',
      },
    };
  });

  test('should clean miam valid reason when attendance is yes', async () => {
    req.body = {
      miam_attendance: 'Yes',
    };

    await routeGuard.post(req, res, next);
    expect(req.session.userCase).toStrictEqual({
      miam_domesticAbuse: [],
      miam_domesticAbuseEvidenceDocs: [],
      miam_domesticAbuse_courtInvolvement_subfields: [],
      miam_domesticAbuse_letterFromAuthority_subfields: [],
      miam_domesticAbuse_letterFromSupportService_subfields: [],
      miam_domesticAbuse_letterOfBeingVictim_subfields: [],
      miam_domesticAbuse_policeInvolvement_subfields: [],
      miam_haveDocSigned: 'Yes',
      miam_nonAttendanceReasons: [],
      miam_certificate: {
        id: '1234',
        url: 'MOCK_URL',
        filename: 'MOCK_FILENAME',
        binaryUrl: 'MOCK_BINARY_URL',
      },
    });
    expect(next).toHaveBeenCalled();
  });

  test('should clean miam document when attendance is no', async () => {
    req.body = {
      miam_attendance: 'No',
    };

    await routeGuard.post(req, res, next);
    expect(req.session.userCase).toStrictEqual({
      miam_nonAttendanceReasons: ['domesticViolence', 'urgentHearing'],
      miam_domesticAbuse: ['policeInvolvement'],
      miam_domesticAbuse_policeInvolvement_subfields: ['evidenceOfSection24Notice'],
      miam_urgency: 'freedomPhysicalSafetyInFamily',
    });
    expect(next).toHaveBeenCalled();
  });
});
