import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { C1AAbuseTypes, C1ASafteyConcernsAbout } from '../../../../app/case/definition';

import { routeGuard } from './routeGuard';

describe('common > safety-concerns > concern-about > route guard', () => {
  let res;
  let req;
  const next = jest.fn();

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
  });

  test('should delete child abuse data and call next when children are not included in safety concerns', async () => {
    req.body.c1A_safetyConernAbout = [];
    req.session.userCase = {
      c1A_concernAboutChild: [C1AAbuseTypes.EMOTIONAL_ABUSE],
      c1A_safteyConcerns: {
        child: {
          emotionalAbuse: {
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

    expect(req.session.userCase).toStrictEqual({ c1A_safteyConcerns: { child: {} } });
    expect(req.session.save).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  test('should delete applicant abuse data and call next when applicant is not included in safety concerns', async () => {
    req.body.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.CHILDREN];
    req.originalUrl = '/c100-rebuild/concern-about';
    req.session.userCase = {
      c1A_concernAboutApplicant: [C1AAbuseTypes.EMOTIONAL_ABUSE],
      c1A_safteyConcerns: {
        applicant: {
          emotionalAbuse: {
            behaviourDetails: 'test',
            behaviourStartDate: 'test',
          },
        },
      },
    };

    await routeGuard.post(req, res, next);

    expect(req.session.userCase).toStrictEqual({ c1A_safteyConcerns: { applicant: {} } });
    expect(req.session.save).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  test('should delete respondent abuse data and call next when respondent is not included in safety concerns', async () => {
    req.body.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.CHILDREN];
    req.originalUrl = '/respondent/concern-about';
    req.session.userCase = {
      c1A_concernAboutRespondent: [C1AAbuseTypes.EMOTIONAL_ABUSE],
      c1A_safteyConcerns: {
        respondent: {
          emotionalAbuse: {
            behaviourDetails: 'test',
            behaviourStartDate: 'test',
          },
        },
      },
    };

    await routeGuard.post(req, res, next);

    expect(req.session.userCase).toStrictEqual({ c1A_safteyConcerns: { respondent: {} } });
    expect(req.session.save).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  test('should not delete any data and call next when child and applicant are included in safety concerns', async () => {
    req.body.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.CHILDREN, C1ASafteyConcernsAbout.APPLICANT];
    req.session.userCase = {
      c1A_concernAboutChild: [C1AAbuseTypes.EMOTIONAL_ABUSE],
      c1A_concernAboutApplicant: [C1AAbuseTypes.EMOTIONAL_ABUSE],
      c1A_safteyConcerns: {
        child: {
          emotionalAbuse: {
            behaviourDetails: 'test',
            behaviourStartDate: 'test',
          },
        },
        applicant: {
          emotionalAbuse: {
            behaviourDetails: 'test',
            behaviourStartDate: 'test',
          },
        },
      },
    };
    req.originalUrl = '/c100-rebuild/concern-about';

    await routeGuard.post(req, res, next);

    expect(req.session.userCase).toStrictEqual({
      c1A_concernAboutChild: [C1AAbuseTypes.EMOTIONAL_ABUSE],
      c1A_concernAboutApplicant: [C1AAbuseTypes.EMOTIONAL_ABUSE],
      c1A_safteyConcerns: {
        child: {
          emotionalAbuse: {
            behaviourDetails: 'test',
            behaviourStartDate: 'test',
          },
        },
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
});
