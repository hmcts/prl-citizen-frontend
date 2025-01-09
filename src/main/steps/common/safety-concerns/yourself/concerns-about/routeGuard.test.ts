import { mockRequest } from '../../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../../test/unit/utils/mockResponse';
import { C1AAbuseTypes } from '../../../../../app/case/definition';

import { routeGuard } from './routeGuard';

describe('common > safety-concerns > child > concerns-about > route guard', () => {
  test('should delete child abuse data for abuse types that are not selected for applicant', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();

    req.body.c1A_concernAboutApplicant = [C1AAbuseTypes.EMOTIONAL_ABUSE];
    req.session.userCase = {
      c1A_concernAboutApplicant: [C1AAbuseTypes.EMOTIONAL_ABUSE],
      c1A_safteyConcerns: {
        applicant: {
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
    };
    req.originalUrl = '/c100-rebuild/safety-concerns/yourself/concerns-about/emotionalAbuse';
    await routeGuard.post(req, res, next);

    expect(req.session.userCase).toStrictEqual({
      c1A_concernAboutApplicant: [C1AAbuseTypes.EMOTIONAL_ABUSE],
      c1A_safteyConcerns: {
        applicant: {
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

  test('should delete child abuse data for abuse types that are not selected for respondent', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();

    req.body.c1A_concernAboutApplicant = [C1AAbuseTypes.EMOTIONAL_ABUSE];
    req.session.userCase = {
      c1A_concernAboutApplicant: [C1AAbuseTypes.EMOTIONAL_ABUSE],
      c1A_safteyConcerns: {
        respondent: {
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
    };
    req.originalUrl = '/respondent/safety-concerns/yourself/concerns-about/emotionalAbuse';
    await routeGuard.post(req, res, next);

    expect(req.session.userCase).toStrictEqual({
      c1A_concernAboutApplicant: [C1AAbuseTypes.EMOTIONAL_ABUSE],
      c1A_safteyConcerns: {
        respondent: {
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
