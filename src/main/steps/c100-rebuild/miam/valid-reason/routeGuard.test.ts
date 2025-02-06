import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('miam > valid reason > routeGuard', () => {
  const req = mockRequest();
  const res = mockResponse();
  const next = jest.fn();
  beforeEach(() => {
    req.session.userCase = {
      miam_nonAttendanceReasons: ['domesticViolence', 'urgentHearing'],
      miam_domesticAbuse: ['policeInvolvement'],
      miam_domesticAbuse_policeInvolvement_subfields: ['evidenceOfSection24Notice'],
      miam_urgency: 'freedomPhysicalSafetyInFamily',
    };
  });

  test('should not clean miam exemptions when valid reason is yes', async () => {
    req.body = {
      miam_validReason: 'Yes',
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

  test('should clean miam exemptions when valid reason is no', async () => {
    req.body = {
      miam_validReason: 'No',
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
      miam_nonAttendanceReasons: [],
    });
    expect(next).toHaveBeenCalled();
  });
});
