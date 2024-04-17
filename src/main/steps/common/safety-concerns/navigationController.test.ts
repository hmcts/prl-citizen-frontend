import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { C1AAbuseTypes, C1ASafteyConcernsAbout, RootContext } from '../../../app/case/definition';
import { applyParms } from '../../common/url-parser';
import {
  C1A_CHILD_ABDUCTION_THREATS,
  C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION,
  C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD,
  C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_YOURSELF,
  C1A_SAFETY_CONCERNS_CONCERN_ABOUT,
  C1A_SAFETY_CONCERNS_NOFEEDBACK,
  C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS,
  C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS,
  C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE,
  C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE,
  PageLink,
} from '../../urls';

import SafteyConcernsNavigationController from './navigationController';

const session = {
  params: {},
  session: {
    userCase: {},
  },
};
let caseData;
const req = mockRequest();

test('When someother abuse along with witnessingDomesticAbuse is selected as children abuse, from children report abuse screen -> navigate to children emotional abuse screen -> From children emotional abuse screen -> navigate to other concerns screen', async () => {
  req.session.userCase.c1A_safetyConernAbout = C1ASafteyConcernsAbout.CHILDREN;
  req.session.userCase.c1A_concernAboutChild = ['emotionalAbuse', 'witnessingDomesticAbuse'];
  // caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.APPLICANT];
  // caseData.c1A_concernAboutApplicant= ['psychologicalAbuse', 'emotionalAbuse', 'somethingElse']
  req.originalUrl = '/c100-rebuild';
  expect(
    SafteyConcernsNavigationController.getNextUrl(
      applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD, { root: RootContext.C100_REBUILD }) as PageLink,
      req.session.userCase,
      req,
      req.param
    )
  ).toBe(
    applyParms(applyParms(C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { root: RootContext.C100_REBUILD }) as PageLink, {
      abuseType: C1AAbuseTypes.EMOTIONAL_ABUSE,
    })
  );
  expect(
    SafteyConcernsNavigationController.getNextUrl(
      applyParms(C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { root: RootContext.C100_REBUILD }) as PageLink,
      req.session.userCase,
      req,
      {
        root: RootContext.C100_REBUILD,
        abuseType: C1AAbuseTypes.EMOTIONAL_ABUSE,
      }
    )
  ).toBe('/c100-rebuild/safety-concerns/yourself/concerns-about');
});
test('When abuction abuse along with witnessingDomesticAbuse is selected as children abuse, from children report abuse screen -> navigate to children emotional abuse screen -> From children emotional abuse screen -> navigate to other concerns screen', async () => {
  req.session.userCase.c1A_safetyConernAbout = C1ASafteyConcernsAbout.CHILDREN;
  req.session.userCase.c1A_concernAboutChild = ['abduction', 'witnessingDomesticAbuse'];
  // caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.APPLICANT];
  // caseData.c1A_concernAboutApplicant= ['psychologicalAbuse', 'emotionalAbuse', 'somethingElse']
  req.originalUrl = '/c100-rebuild';
  expect(
    SafteyConcernsNavigationController.getNextUrl(
      applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD, { root: RootContext.C100_REBUILD }) as PageLink,
      req.session.userCase,
      req,
      req.param
    )
  ).toBe('/c100-rebuild/safety-concerns/abduction/child-location');
  expect(
    SafteyConcernsNavigationController.getNextUrl(
      '/c100-rebuild/safety-concerns/abduction/threats',
      req.session.userCase,
      req,
      {
        root: RootContext.C100_REBUILD,
        abuseType: C1AAbuseTypes.ABDUCTION,
      }
    )
  ).toBe('/c100-rebuild/safety-concerns/yourself/concerns-about');
});
test('For respondent journey When abduction abuse along with witnessingDomesticAbuse is selected as children abuse, from children report abuse screen -> navigate to children emotional abuse screen -> From children emotional abuse screen -> navigate to other concerns screen', async () => {
  req.session.userCase.c1A_safetyConernAbout = C1ASafteyConcernsAbout.CHILDREN;
  req.session.userCase.c1A_concernAboutChild = ['abduction', 'witnessingDomesticAbuse'];
  // caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.APPLICANT];
  // caseData.c1A_concernAboutApplicant= ['psychologicalAbuse', 'emotionalAbuse', 'somethingElse']
  req.originalUrl = '/tasklistresponse';
  expect(
    SafteyConcernsNavigationController.getNextUrl(
      applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD, { root: RootContext.RESPONDENT }) as PageLink,
      req.session.userCase,
      req,
      req.param
    )
  ).toBe('/tasklistresponse/safety-concerns/abduction/child-location');
  expect(
    SafteyConcernsNavigationController.getNextUrl(
      '/tasklistresponse/safety-concerns/abduction/threats',
      req.session.userCase,
      req,
      {
        root: RootContext.RESPONDENT,
        abuseType: C1AAbuseTypes.ABDUCTION,
      }
    )
  ).toBe('/tasklistresponse/safety-concerns/yourself/concerns-about');
});

const dummyRequest = (concernFor: C1ASafteyConcernsAbout | 'both') => {
  switch (concernFor) {
    case 'children': {
      Object.assign(session.session.userCase, {
        c1A_safetyConernAbout: ['children'],
        c1A_concernAboutChild: ['physicalAbuse', 'financialAbuse', 'abduction', 'somethingElse'],
      });
      break;
    }
    case 'applicant': {
      Object.assign(session.session.userCase, {
        c1A_safetyConernAbout: ['applicant'],
        c1A_concernAboutChild: ['witnessingDomesticAbuse'],
        c1A_concernAboutApplicant: ['psychologicalAbuse', 'emotionalAbuse', 'somethingElse'],
      });
      break;
    }
    default: {
      Object.assign(session.session.userCase, {
        c1A_safetyConernAbout: ['children', 'applicant'],
        c1A_concernAboutChild: ['physicalAbuse', 'financialAbuse'],
        c1A_concernAboutApplicant: ['somethingElse'],
      });
      break;
    }
  }

  return mockRequest(session);
};

describe('SafteyConcernsNavigationController for only children', () => {
  beforeEach(() => {
    caseData = dummyRequest(C1ASafteyConcernsAbout.CHILDREN).session.userCase;
  });

  test('From safety concern about screen -> navigate to the children report abuse screen', async () => {
    caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.CHILDREN];
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_SAFETY_CONCERNS_CONCERN_ABOUT, { root: RootContext.RESPONDENT }) as PageLink,
        caseData,
        req,
        req.param
      )
    ).toBe(applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD, { root: RootContext.RESPONDENT }) as PageLink);
  });
  test('For Applicant case From safety concern about screen -> navigate to the children report abuse screen', async () => {
    caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.CHILDREN];
    req.originalUrl = '/c100-rebuild';
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_SAFETY_CONCERNS_CONCERN_ABOUT, { root: RootContext.C100_REBUILD }) as PageLink,
        caseData,
        req,
        req.param
      )
    ).toBe(applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD, { root: RootContext.C100_REBUILD }) as PageLink);
  });

  test('From children report abuse screen -> navigate to children physical abuse screen', async () => {
    caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.CHILDREN];
    caseData.c1A_concernAboutChild = ['physicalAbuse', 'financialAbuse', 'abduction', 'somethingElse'];
    req.originalUrl = '/not-c100-rebuild';
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD, { root: RootContext.RESPONDENT }) as PageLink,
        caseData,
        req,
        req.param
      )
    ).toBe(
      applyParms(C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, {
        root: RootContext.RESPONDENT,
        abuseType: C1AAbuseTypes.PHYSICAL_ABUSE,
      })
    );
  });

  test('From children physical abuse screen -> navigate to financial abuse screen', async () => {
    caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.CHILDREN];
    req.originalUrl = '/not-c100-rebuild';
    caseData.c1A_concernAboutChild = ['physicalAbuse', 'financialAbuse', 'abduction', 'somethingElse'];
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { root: RootContext.RESPONDENT }) as PageLink,
        caseData,
        req,
        {
          abuseType: C1AAbuseTypes.PHYSICAL_ABUSE,
        }
      )
    ).toBe(
      applyParms(C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, {
        root: RootContext.RESPONDENT,
        abuseType: C1AAbuseTypes.FINANCIAL_ABUSE,
      })
    );
  });

  test('From children financial abuse screen -> navigate to children abduction screen', async () => {
    caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.CHILDREN];
    caseData.c1A_concernAboutChild = ['physicalAbuse', 'financialAbuse', 'abduction', 'somethingElse'];
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { root: RootContext.RESPONDENT }) as PageLink,
        caseData,
        req,
        {
          abuseType: C1AAbuseTypes.FINANCIAL_ABUSE,
        }
      )
    ).toBe(applyParms(C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION, { root: RootContext.RESPONDENT }) as PageLink);
  });

  test('From children last abduction screen -> navigate to other concerns screen', async () => {
    caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.CHILDREN];
    caseData.c1A_concernAboutChild = ['physicalAbuse', 'financialAbuse', 'abduction', 'somethingElse'];
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_CHILD_ABDUCTION_THREATS, { root: RootContext.RESPONDENT }) as PageLink,
        caseData,
        req,
        { root: RootContext.RESPONDENT, abuseType: C1AAbuseTypes.ABDUCTION }
      )
    ).toBe(applyParms(C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS, { root: RootContext.RESPONDENT }) as PageLink);
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS, { root: RootContext.RESPONDENT }) as PageLink,
        caseData,
        req,
        { root: RootContext.RESPONDENT, abuseType: C1AAbuseTypes.ABDUCTION }
      )
    ).toBe(applyParms(C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS, { root: RootContext.RESPONDENT }) as PageLink);
  });

  test('For applicant case From children report abuse screen -> navigate to children physical abuse screen', async () => {
    caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.CHILDREN];
    caseData.c1A_concernAboutChild = ['physicalAbuse', 'financialAbuse', 'abduction', 'somethingElse'];
    req.originalUrl = '/c100-rebuild';
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD, { root: RootContext.C100_REBUILD }) as PageLink,
        caseData,
        req,
        req.param
      )
    ).toBe(
      applyParms(C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, {
        root: RootContext.C100_REBUILD,
        abuseType: C1AAbuseTypes.PHYSICAL_ABUSE,
      })
    );
  });

  test('For applicant case From children physical abuse screen -> navigate to financial abuse screen', async () => {
    caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.CHILDREN];
    req.originalUrl = '/c100-rebuild';
    caseData.c1A_concernAboutChild = ['physicalAbuse', 'financialAbuse', 'abduction', 'somethingElse'];
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { root: RootContext.C100_REBUILD }) as PageLink,
        caseData,
        req,
        {
          abuseType: C1AAbuseTypes.PHYSICAL_ABUSE,
        }
      )
    ).toBe(
      applyParms(C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, {
        root: RootContext.C100_REBUILD,
        abuseType: C1AAbuseTypes.FINANCIAL_ABUSE,
      })
    );
  });

  test('For applicant case From children financial abuse screen -> navigate to children abduction screen', async () => {
    caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.CHILDREN];
    caseData.c1A_concernAboutChild = ['physicalAbuse', 'financialAbuse', 'abduction', 'somethingElse'];
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { root: RootContext.C100_REBUILD }) as PageLink,
        caseData,
        req,
        {
          abuseType: C1AAbuseTypes.FINANCIAL_ABUSE,
        }
      )
    ).toBe(applyParms(C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION, { root: RootContext.C100_REBUILD }) as PageLink);
  });

  test('For applicant case From children last abduction screen -> navigate to other concerns screen', async () => {
    caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.CHILDREN];
    req.originalUrl = '/c100-rebuild';
    caseData.c1A_concernAboutChild = ['physicalAbuse', 'financialAbuse', 'abduction', 'somethingElse'];
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_CHILD_ABDUCTION_THREATS, { root: RootContext.C100_REBUILD }) as PageLink,
        caseData,
        req,
        { root: RootContext.C100_REBUILD, abuseType: C1AAbuseTypes.ABDUCTION }
      )
    ).toBe(applyParms(C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS, { root: RootContext.C100_REBUILD }) as PageLink);
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS, { root: RootContext.C100_REBUILD }) as PageLink,
        caseData,
        req,
        { root: RootContext.C100_REBUILD, abuseType: C1AAbuseTypes.ABDUCTION }
      )
    ).toBe(applyParms(C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS, { root: RootContext.C100_REBUILD }) as PageLink);
  });
});

describe('SafteyConcernsNavigationController for only applicant', () => {
  beforeEach(() => {
    caseData = dummyRequest(C1ASafteyConcernsAbout.APPLICANT).session.userCase;
  });

  test('From safety concern about screen -> navigate to the applicant report abuse screen', async () => {
    caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.APPLICANT];
    req.originalUrl = '/c100-rebuild';
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_SAFETY_CONCERNS_CONCERN_ABOUT, { root: RootContext.C100_REBUILD }) as PageLink,
        caseData,
        req,
        req.params
      )
    ).toBe(applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_YOURSELF, { root: RootContext.C100_REBUILD }) as PageLink);
  });

  test('From applicant report abuse screen -> navigate to applicant psychological abuse screen', async () => {
    caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.APPLICANT];
    caseData.c1A_concernAboutApplicant = ['psychologicalAbuse', 'emotionalAbuse', 'somethingElse'];
    req.originalUrl = '/c100-rebuild';
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_YOURSELF, { root: RootContext.C100_REBUILD }) as PageLink,
        caseData,
        req,
        req.param
      )
    ).toBe(
      applyParms(C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE, {
        root: RootContext.C100_REBUILD,
        abuseType: C1AAbuseTypes.PSYCHOLOGICAL_ABUSE,
      })
    );
  });

  test('From applicant psychological abuse screen -> navigate to emotional abuse screen', async () => {
    caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.APPLICANT];
    caseData.c1A_concernAboutApplicant = ['psychologicalAbuse', 'emotionalAbuse', 'somethingElse'];
    req.originalUrl = '/c100-rebuild';
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE, { root: RootContext.C100_REBUILD }) as PageLink,
        caseData,
        req,
        {
          root: RootContext.C100_REBUILD,
          abuseType: C1AAbuseTypes.PSYCHOLOGICAL_ABUSE,
        }
      )
    ).toBe(
      applyParms(C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE, {
        root: RootContext.C100_REBUILD,
        abuseType: C1AAbuseTypes.EMOTIONAL_ABUSE,
      }) as PageLink
    );
  });

  test('From applicant emotional abuse screen -> navigate to somethingElse abuse screen', async () => {
    caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.APPLICANT];
    caseData.c1A_concernAboutApplicant = ['psychologicalAbuse', 'emotionalAbuse', 'somethingElse'];
    req.originalUrl = '/c100-rebuild';
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE, { root: RootContext.C100_REBUILD }) as PageLink,
        caseData,
        req,
        {
          root: RootContext.C100_REBUILD,
          abuseType: C1AAbuseTypes.EMOTIONAL_ABUSE,
        }
      )
    ).toBe(
      applyParms(C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE, {
        root: RootContext.C100_REBUILD,
        abuseType: C1AAbuseTypes.SOMETHING_ELSE,
      })
    );
  });

  test('From applicant somethingElse abuse screen -> navigate to children guidelines screen', async () => {
    caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.APPLICANT];
    caseData.c1A_concernAboutApplicant = ['psychologicalAbuse', 'emotionalAbuse', 'somethingElse'];
    req.originalUrl = '/c100-rebuild';
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE, { root: RootContext.C100_REBUILD }) as PageLink,
        caseData,
        req,
        {
          root: RootContext.C100_REBUILD,
          abuseType: C1AAbuseTypes.SOMETHING_ELSE,
        }
      )
    ).toBe(applyParms(C1A_SAFETY_CONCERNS_NOFEEDBACK, { root: RootContext.C100_REBUILD }) as PageLink);
  });

  test('From children report abuse screen -> navigate to other concerns screen', async () => {
    caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.APPLICANT];
    caseData.c1A_concernAboutApplicant = ['psychologicalAbuse', 'emotionalAbuse', 'somethingElse'];
    req.originalUrl = '/c100-rebuild';
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD, { root: RootContext.C100_REBUILD }) as PageLink,
        caseData,
        req,
        req.param
      )
    ).toBe(applyParms(C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS, { root: RootContext.C100_REBUILD }) as PageLink);
  });

  test('When someother abuse along with witnessingDomesticAbuse is selected as children abuse, from children report abuse screen -> navigate to children emotional abuse screen -> From children emotional abuse screen -> navigate to other concerns screen', async () => {
    caseData.c1A_concernAboutChild = ['emotionalAbuse', 'witnessingDomesticAbuse'];
    // caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.APPLICANT];
    // caseData.c1A_concernAboutApplicant= ['psychologicalAbuse', 'emotionalAbuse', 'somethingElse']
    req.originalUrl = '/c100-rebuild';
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD, { root: RootContext.C100_REBUILD }) as PageLink,
        caseData,
        req,
        req.param
      )
    ).toBe(
      applyParms(applyParms(C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { root: RootContext.C100_REBUILD }) as PageLink, {
        abuseType: C1AAbuseTypes.EMOTIONAL_ABUSE,
      })
    );
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { root: RootContext.C100_REBUILD }) as PageLink,
        caseData,
        req,
        {
          root: RootContext.C100_REBUILD,
          abuseType: C1AAbuseTypes.EMOTIONAL_ABUSE,
        }
      )
    ).toBe(applyParms(C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS, { root: RootContext.C100_REBUILD }) as PageLink);
  });
});

describe('SafteyConcernsNavigationController for both children and applicant', () => {
  beforeEach(() => {
    caseData = dummyRequest('both').session.userCase;
  });

  test('From safety concern about screen -> navigate to the children report abuse screen', async () => {
    expect(SafteyConcernsNavigationController.getNextUrl(C1A_SAFETY_CONCERNS_CONCERN_ABOUT, caseData)).toBe(
      '/tasklistresponse/safety-concerns/concern-about'
    );
  });

  test('From children report abuse screen -> navigate to children emotionalAbuse screen', async () => {
    caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.CHILDREN, C1ASafteyConcernsAbout.APPLICANT];
    req.originalUrl = '/c100-rebuild';
    caseData.c1A_concernAboutChild = ['emotionalAbuse', 'financialAbuse'];
    caseData.c1A_concernAboutApplicant = ['psychologicalAbuse', 'emotionalAbuse', 'somethingElse'];
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD, { root: RootContext.C100_REBUILD }) as PageLink,
        caseData,
        req,
        req.param
      )
    ).toBe(
      applyParms(C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, {
        root: RootContext.C100_REBUILD,
        abuseType: C1AAbuseTypes.EMOTIONAL_ABUSE,
      })
    );
  });

  test('From children physical abuse screen -> navigate to financial abuse screen', async () => {
    caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.CHILDREN, C1ASafteyConcernsAbout.APPLICANT];
    req.originalUrl = '/c100-rebuild';
    caseData.c1A_concernAboutChild = ['emotionalAbuse', 'financialAbuse'];
    caseData.c1A_concernAboutApplicant = ['psychologicalAbuse', 'emotionalAbuse', 'somethingElse'];
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { root: RootContext.C100_REBUILD }) as PageLink,
        caseData,
        req,
        {
          abuseType: C1AAbuseTypes.EMOTIONAL_ABUSE,
        }
      )
    ).toBe(
      applyParms(C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, {
        root: RootContext.C100_REBUILD,
        abuseType: C1AAbuseTypes.FINANCIAL_ABUSE,
      })
    );
  });

  test('From children financial abuse screen -> navigate to the applicant report abuse screen', async () => {
    caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.CHILDREN, C1ASafteyConcernsAbout.APPLICANT];
    req.originalUrl = '/c100-rebuild';
    caseData.c1A_concernAboutChild = ['emotionalAbuse', 'financialAbuse'];
    caseData.c1A_concernAboutApplicant = ['psychologicalAbuse', 'emotionalAbuse', 'somethingElse'];
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { root: RootContext.C100_REBUILD }) as PageLink,
        caseData,
        req,
        {
          root: RootContext.C100_REBUILD,
          abuseType: C1AAbuseTypes.FINANCIAL_ABUSE,
        }
      )
    ).toBe(
      applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_YOURSELF, {
        root: RootContext.C100_REBUILD,
      })
    );
  });

  test('From applicant report abuse screen -> navigate to applicant somethingElse abuse screen', async () => {
    caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.CHILDREN, C1ASafteyConcernsAbout.APPLICANT];
    req.originalUrl = '/c100-rebuild';
    caseData.c1A_concernAboutChild = ['emotionalAbuse', 'financialAbuse'];
    caseData.c1A_concernAboutApplicant = ['somethingElse'];
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_YOURSELF, {
          root: RootContext.C100_REBUILD,
        }) as PageLink,
        caseData,
        req,
        req.param
      )
    ).toBe(
      applyParms(C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE, {
        root: RootContext.C100_REBUILD,
        abuseType: C1AAbuseTypes.SOMETHING_ELSE,
      })
    );
  });

  test('From applicant somethingElse abuse screen -> navigate to other concerns screen', async () => {
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE, { root: RootContext.C100_REBUILD }) as PageLink,
        caseData,
        req,
        {
          root: RootContext.C100_REBUILD,
          abuseType: C1AAbuseTypes.SOMETHING_ELSE,
        }
      )
    ).toBe(applyParms(C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS, { root: RootContext.C100_REBUILD }) as PageLink);
  });

  test('When only somethingElse is selected as children abuse, from children report abuse screen -> navigate to the applicant report abuse screen -> From applicant report abuse screen -> navigate to applicant somethingElse abuse screen -> navigate to other concerns screen', async () => {
    caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.CHILDREN, C1ASafteyConcernsAbout.RESPONDENT];
    req.originalUrl = '/tasklistResponse';
    caseData.c1A_concernAboutChild = ['somethingElse'];
    caseData.c1A_concernAboutRespondent = ['psychologicalAbuse'];
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD, { root: RootContext.RESPONDENT }) as PageLink,
        caseData,
        req,
        req.param
      )
    ).toBe(applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_YOURSELF, { root: RootContext.RESPONDENT }) as PageLink);
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_YOURSELF, { root: RootContext.RESPONDENT }) as PageLink,
        caseData,
        req,
        req.param
      )
    ).toBe(
      applyParms(C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE, {
        root: RootContext.RESPONDENT,
        abuseType: C1AAbuseTypes.PSYCHOLOGICAL_ABUSE,
      })
    );
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE, { root: RootContext.RESPONDENT }) as PageLink,
        caseData,
        req,
        {
          abuseType: C1AAbuseTypes.PSYCHOLOGICAL_ABUSE,
        }
      )
    ).toBe(applyParms(C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS, { root: RootContext.RESPONDENT }) as PageLink);
  });

  test('When navigation controller is called from someother screen -> navigate to the same screen', async () => {
    expect(SafteyConcernsNavigationController.getNextUrl(C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS, caseData)).toBe(
      applyParms(C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS, { root: RootContext.RESPONDENT }) as PageLink
    );
  });

  test('From safety concern about screen -> navigate to the respondent report abuse screen', async () => {
    caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.CHILDREN, C1ASafteyConcernsAbout.RESPONDENT];
    req.originalUrl = '/tasklistResponse';
    caseData.c1A_concernAboutChild = ['emotionalAbuse', 'financialAbuse'];
    caseData.c1A_concernAboutRespondent = ['psychologicalAbuse', 'emotionalAbuse', 'somethingElse'];
    caseData.c1A_concernAboutChild = ['somethingElse'];
    caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.RESPONDENT];
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_SAFETY_CONCERNS_CONCERN_ABOUT, { root: RootContext.RESPONDENT }) as PageLink,
        caseData,
        req,
        req.params
      )
    ).toBe(applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_YOURSELF, { root: RootContext.RESPONDENT }) as PageLink);
  });
  test('From respondent report abuse screen -> navigate to respondent psychological abuse screen', async () => {
    caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.CHILDREN, C1ASafteyConcernsAbout.RESPONDENT];
    req.originalUrl = '/tasklistResponse';
    caseData.c1A_concernAboutChild = ['emotionalAbuse', 'financialAbuse'];
    caseData.c1A_concernAboutRespondent = ['psychologicalAbuse', 'emotionalAbuse', 'somethingElse'];
    caseData.c1A_concernAboutChild = ['somethingElse'];
    caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.RESPONDENT];
    caseData.c1A_concernAboutRespondent = ['psychologicalAbuse', 'financialAbuse', 'abduction', 'somethingElse'];
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_YOURSELF, { root: RootContext.RESPONDENT }) as PageLink,
        caseData,
        req,
        req.param
      )
    ).toBe(
      applyParms(C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE, {
        root: RootContext.RESPONDENT,
        abuseType: C1AAbuseTypes.PSYCHOLOGICAL_ABUSE,
      })
    );
  });

  test('From respondent psychological abuse screen -> navigate to emotional abuse screen', async () => {
    caseData.c1A_safetyConernAbout = [C1ASafteyConcernsAbout.RESPONDENT];
    caseData.c1A_concernAboutRespondent = ['psychologicalAbuse', 'emotionalAbuse', 'abduction', 'somethingElse'];
    expect(
      SafteyConcernsNavigationController.getNextUrl(
        applyParms(C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE, { root: RootContext.RESPONDENT }) as PageLink,
        caseData,
        req,
        {
          abuseType: C1AAbuseTypes.PSYCHOLOGICAL_ABUSE,
        }
      )
    ).toBe(
      applyParms(C1A_SAFETY_CONCERNS_REPORT_YOURSELF_ABUSE, {
        root: RootContext.RESPONDENT,
        abuseType: C1AAbuseTypes.EMOTIONAL_ABUSE,
      })
    );
  });
});
