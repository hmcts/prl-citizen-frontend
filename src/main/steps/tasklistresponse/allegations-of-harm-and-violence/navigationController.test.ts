import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { C1AAbuseTypes, C1ASafteyConcernsAbout } from '../../../app/case/definition';
import { applyParms } from '../../common/url-parser';
import {
  C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT,
  C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD,
  C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE,
  C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE,
  RESPONDENT_YOUR_CHILD_CONCERNS,
} from '../../urls';

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
    expect(SafteyConcernsNavigationController.getNextUrl(RESPONDENT_YOUR_CHILD_CONCERNS, caseData)).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/your-or-child-safety-concerns'
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
    ).toBe('/tasklistresponse/allegations-of-harm-and-violence/child/report-abuse/:abuseType');
  });
});

describe('SafteyConcernsNavigationController for only applicant', () => {
  beforeEach(() => {
    caseData = dummyRequest(C1ASafteyConcernsAbout.APPLICANT).session.userCase;
  });

  test('From safety concern about screen -> navigate to the applicant report abuse screen', async () => {
    expect(SafteyConcernsNavigationController.getNextUrl(RESPONDENT_YOUR_CHILD_CONCERNS, caseData)).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/your-or-child-safety-concerns'
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
});

test('When someother abuse along with witnessingDomesticAbuse is selected as children abuse, from children report abuse screen -> navigate to children emotional abuse screen -> From children emotional abuse screen -> navigate to other concerns screen', async () => {
  caseData.c1A_concernAboutChild = ['emotionalAbuse', 'witnessingDomesticAbuse'];
  expect(SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD, caseData)).toBe(
    applyParms(C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { abuseType: C1AAbuseTypes.EMOTIONAL_ABUSE })
  );
});

describe('SafteyConcernsNavigationController for both children and applicant', () => {
  beforeEach(() => {
    caseData = dummyRequest('both').session.userCase;
  });

  test('From safety concern about screen -> navigate to the children report abuse screen', async () => {
    expect(SafteyConcernsNavigationController.getNextUrl(RESPONDENT_YOUR_CHILD_CONCERNS, caseData)).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/your-or-child-safety-concerns'
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
    ).toBe('/tasklistresponse/allegations-of-harm-and-violence/child/report-abuse/:abuseType');
  });

  test('From children financial abuse screen -> navigate to the applicant report abuse screen', async () => {
    expect(
      SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, caseData, {
        abuseType: C1AAbuseTypes.FINANCIAL_ABUSE,
      })
    ).toBe('/tasklistresponse/allegations-of-harm-and-violence/child/report-abuse/:abuseType');
  });

  test('From applicant report abuse screen -> navigate to applicant somethingElse abuse screen', async () => {
    expect(
      SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT, caseData)
    ).toBe(applyParms(C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE, { abuseType: C1AAbuseTypes.SOMETHING_ELSE }));
  });

  test('When only somethingElse is selected as children abuse, from children report abuse screen -> navigate to the applicant report abuse screen -> From applicant report abuse screen -> navigate to applicant somethingElse abuse screen -> navigate to other concerns screen', async () => {
    caseData.c1A_concernAboutChild = ['somethingElse'];
    expect(SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD, caseData)).toBe(
      C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT
    );
    expect(
      SafteyConcernsNavigationController.getNextUrl(C100_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_APPLICANT, caseData)
    ).toBe(applyParms(C100_C1A_SAFETY_CONCERNS_REPORT_APPLICANT_ABUSE, { abuseType: C1AAbuseTypes.SOMETHING_ELSE }));
  });
});
