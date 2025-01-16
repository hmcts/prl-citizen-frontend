import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { C1AAbuseTypes } from '../../../../../app/case/definition';

import { routeGuard } from './routeGuard';

describe('common > safety-concerns > child > concerns-about > route guard', () => {
  test('should delete child abuse data for abuse types that are not selected', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();

    req.body.c1A_concernAboutChild = [C1AAbuseTypes.EMOTIONAL_ABUSE];
    req.session.userCase = {
      c1A_concernAboutChild: [C1AAbuseTypes.EMOTIONAL_ABUSE],
      c1A_safteyConcerns: {
        child: {
          emotionalAbuse: {
            behaviourDetails: 'test',
            behaviourStartDate: 'test',
          },
          physicalAbuse: {
            behaviourDetails: 'test',
            behaviourStartDate: 'test',
          },
        },
      },
      c1A_abductionReasonOutsideUk: 'test',
      c1A_childsCurrentLocation: 'test',
      c1A_childrenMoreThanOnePassport: 'test',
      c1A_possessionChildrenPassport: 'test',
      c1A_provideOtherDetails: 'test',
      c1A_passportOffice: 'test',
      c1A_abductionPassportOfficeNotified: 'test',
      c1A_previousAbductionsShortDesc: 'test',
      c1A_policeOrInvestigatorInvolved: 'test',
      c1A_policeOrInvestigatorOtherDetails: 'test',
      c1A_childAbductedBefore: 'test',
    };
    await routeGuard.post(req, res, next);

    expect(req.session.userCase).toStrictEqual({
      c1A_concernAboutChild: [C1AAbuseTypes.EMOTIONAL_ABUSE],
      c1A_safteyConcerns: {
        child: {
          emotionalAbuse: {
            behaviourDetails: 'test',
            behaviourStartDate: 'test',
          },
        },
      },
    });
    expect(req.session.save).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});
