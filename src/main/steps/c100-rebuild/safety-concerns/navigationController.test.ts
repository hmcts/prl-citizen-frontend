import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { C1AAbuseTypes, C1ASafteyConcernsAbout } from '../../../app/case/definition';
import { applyParms } from '../../common/url-parser';
import {
  C100_C1A_CHILD_ABDUCTION_THREATS,
  C100_C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION,
  C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT,
  C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD,
  C100_C1A_SAFETY_CONCERNS_CONCERN_ABOUT,
  C100_C1A_SAFETY_CONCERNS_NOFEEDBACK,
  C100_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS,
  C100_C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS,
  C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE,
  C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE,
} from '../../urls';
import { C100Sequence } from '../c100sequence';

import SafteyConcernsNavigationController from './navigationController';

const session = {
  params: {},
  session: {
    userCase: {},
  },
};
let caseData;

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
    expect(SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_CONCERN_ABOUT, caseData)).toBe(
      C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD
    );
  });

  test('From children report abuse screen -> navigate to children physical abuse screen', async () => {
    expect(SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD, caseData)).toBe(
      applyParms(C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { abuseType: C1AAbuseTypes.PHYSICAL_ABUSE })
    );
  });

  test('From children physical abuse screen -> navigate to financial abuse screen', async () => {
    expect(
      SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, caseData, {
        abuseType: C1AAbuseTypes.PHYSICAL_ABUSE,
      })
    ).toBe(applyParms(C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { abuseType: C1AAbuseTypes.FINANCIAL_ABUSE }));
  });

  test('From children financial abuse screen -> navigate to children abduction screen', async () => {
    expect(
      SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, caseData, {
        abuseType: C1AAbuseTypes.FINANCIAL_ABUSE,
      })
    ).toBe(C100_C1A_SAFETY_CONCERNS_ABDUCTION_CHILD_LOCATION);
  });

  test('From children last abduction screen -> navigate to other concerns screen', async () => {
    expect(SafteyConcernsNavigationController.getNextUrl(C100_C1A_CHILD_ABDUCTION_THREATS, caseData)).toBe(
      C100_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS
    );
    expect(SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_PREVIOUS_ABDUCTIONS, caseData)).toBe(
      C100_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS
    );
  });
});

describe('SafteyConcernsNavigationController for only applicant', () => {
  beforeEach(() => {
    caseData = dummyRequest(C1ASafteyConcernsAbout.APPLICANT).session.userCase;
  });

  test('From safety concern about screen -> navigate to the applicant report abuse screen', async () => {
    expect(SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_CONCERN_ABOUT, caseData)).toBe(
      C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT
    );
  });

  test('From applicant report abuse screen -> navigate to applicant psychological abuse screen', async () => {
    expect(
      SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT, caseData)
    ).toBe(
      applyParms(C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE, { abuseType: C1AAbuseTypes.PSYCHOLOGICAL_ABUSE })
    );
  });

  test('From applicant psychological abuse screen -> navigate to emotional abuse screen', async () => {
    expect(
      SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE, caseData, {
        abuseType: C1AAbuseTypes.PSYCHOLOGICAL_ABUSE,
      })
    ).toBe(applyParms(C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE, { abuseType: C1AAbuseTypes.EMOTIONAL_ABUSE }));
  });

  test('From applicant emotional abuse screen -> navigate to somethingElse abuse screen', async () => {
    expect(
      SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE, caseData, {
        abuseType: C1AAbuseTypes.EMOTIONAL_ABUSE,
      })
    ).toBe(applyParms(C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE, { abuseType: C1AAbuseTypes.SOMETHING_ELSE }));
  });

  test('From applicant somethingElse abuse screen -> navigate to children guidelines screen', async () => {
    expect(
      SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE, caseData, {
        abuseType: C1AAbuseTypes.SOMETHING_ELSE,
      })
    ).toBe(C100_C1A_SAFETY_CONCERNS_NOFEEDBACK);
  });

  test('From children guidelines screen -> navigate to the children report abuse screen', async () => {
    expect(C100Sequence[84].getNextStep({})).toBe(C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD);
  });

  test('From children report abuse screen -> navigate to other concerns screen', async () => {
    expect(SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD, caseData)).toBe(
      C100_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS
    );
  });

  test('When someother abuse along with witnessingDomesticAbuse is selected as children abuse, from children report abuse screen -> navigate to children emotional abuse screen -> From children emotional abuse screen -> navigate to other concerns screen', async () => {
    caseData.c1A_concernAboutChild = ['emotionalAbuse', 'witnessingDomesticAbuse'];
    expect(SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD, caseData)).toBe(
      applyParms(C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { abuseType: C1AAbuseTypes.EMOTIONAL_ABUSE })
    );
    expect(
      SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, caseData, {
        abuseType: C1AAbuseTypes.EMOTIONAL_ABUSE,
      })
    ).toBe(C100_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS);
  });
});

describe('SafteyConcernsNavigationController for both children and applicant', () => {
  beforeEach(() => {
    caseData = dummyRequest('both').session.userCase;
  });

  test('From safety concern about screen -> navigate to the children report abuse screen', async () => {
    expect(SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_CONCERN_ABOUT, caseData)).toBe(
      C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD
    );
  });

  test('From children report abuse screen -> navigate to children physical abuse screen', async () => {
    expect(SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD, caseData)).toBe(
      applyParms(C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { abuseType: C1AAbuseTypes.PHYSICAL_ABUSE })
    );
  });

  test('From children physical abuse screen -> navigate to financial abuse screen', async () => {
    expect(
      SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, caseData, {
        abuseType: C1AAbuseTypes.PHYSICAL_ABUSE,
      })
    ).toBe(applyParms(C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { abuseType: C1AAbuseTypes.FINANCIAL_ABUSE }));
  });

  test('From children financial abuse screen -> navigate to the applicant report abuse screen', async () => {
    expect(
      SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, caseData, {
        abuseType: C1AAbuseTypes.FINANCIAL_ABUSE,
      })
    ).toBe(C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT);
  });

  test('From applicant report abuse screen -> navigate to applicant somethingElse abuse screen', async () => {
    expect(
      SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT, caseData)
    ).toBe(applyParms(C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE, { abuseType: C1AAbuseTypes.SOMETHING_ELSE }));
  });

  test('From applicant somethingElse abuse screen -> navigate to other concerns screen', async () => {
    expect(
      SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE, caseData, {
        abuseType: C1AAbuseTypes.SOMETHING_ELSE,
      })
    ).toBe(C100_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS);
  });

  test('When only somethingElse is selected as children abuse, from children report abuse screen -> navigate to the applicant report abuse screen -> From applicant report abuse screen -> navigate to applicant somethingElse abuse screen -> navigate to other concerns screen', async () => {
    caseData.c1A_concernAboutChild = ['somethingElse'];
    expect(SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD, caseData)).toBe(
      C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT
    );
    expect(
      SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT, caseData)
    ).toBe(applyParms(C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE, { abuseType: C1AAbuseTypes.SOMETHING_ELSE }));
    expect(
      SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE, caseData, {
        abuseType: C1AAbuseTypes.SOMETHING_ELSE,
      })
    ).toBe(C100_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS);
  });

  test('When navigation controller is called from someother screen -> navigate to the same screen', async () => {
    expect(SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS, caseData)).toBe(
      C100_C1A_SAFETY_CONCERNS_OTHER_CONCERNS_DRUGS
    );
  });
});
