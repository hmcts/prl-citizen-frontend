import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('RA > documents-support > routeGuard', () => {
  test('should update userCase, save and call next', () => {
    const req = mockRequest({
      body: {
        ra_disabilityRequirements: ['test'],
      },
      session: {
        userCase: {
          ra_documentInformation: ['largeprintdocs', 'other'],
          ra_largePrintDocuments_subfield: 'test',
          ra_documentHelpOther_subfield: 'test',
        },
      },
    });
    const res = mockResponse();
    const mockNext = jest.fn();
    routeGuard.post(req, res, mockNext);
    expect(req.session.save).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
    expect(req.session.userCase.ra_documentInformation).toStrictEqual(['largeprintdocs', 'other']);
    expect(req.session.userCase.ra_largePrintDocuments_subfield).toBe(undefined);
    expect(req.session.userCase.ra_documentHelpOther_subfield).toBe(undefined);
  });

  test('should update userCase to remove subfields, save and call next', () => {
    const req = mockRequest({
      body: {
        ra_disabilityRequirements: ['docsformat'],
      },
      session: {
        userCase: {
          ra_documentInformation: ['largeprintdocs', 'other'],
          ra_largePrintDocuments_subfield: 'test',
          ra_documentHelpOther_subfield: 'test',
        },
      },
    });
    const res = mockResponse();
    const mockNext = jest.fn();
    routeGuard.post(req, res, mockNext);
    expect(req.session.save).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalled();
    expect(req.session.userCase.ra_documentInformation).toStrictEqual(['largeprintdocs', 'other']);
    expect(req.session.userCase.ra_largePrintDocuments_subfield).toBe(undefined);
    expect(req.session.userCase.ra_documentHelpOther_subfield).toBe(undefined);
  });
});
