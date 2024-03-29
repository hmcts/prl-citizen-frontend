import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { PRL_C1AAbuseTypes, PRL_C1ASafteyConcernsAbout } from '../../../app/case/definition';
import { applyParms } from '../../common/url-parser';
import {
  PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD,
  PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_RESPONDENT,
  PRL_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE,
  PRL_C1A_SAFETY_CONCERNS_REPORT_RESPONDENT_ABUSE,
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

const dummyRequest = (concernFor: PRL_C1ASafteyConcernsAbout | 'both') => {
  switch (concernFor) {
    case 'children': {
      Object.assign(session.session.userCase, {
        PRL_c1A_safetyConernAbout: ['children'],
        PRL_c1A_concernAboutChild: ['physicalAbuse', 'financialAbuse', 'abduction', 'somethingElse'],
      });
      break;
    }
    case 'applicant': {
      Object.assign(session.session.userCase, {
        PRL_c1A_safetyConernAbout: ['applicant'],
        PRL_c1A_concernAboutChild: ['witnessingDomesticAbuse'],
        PRL_c1A_concernAboutRespondent: ['psychologicalAbuse', 'emotionalAbuse', 'somethingElse'],
      });
      break;
    }
    case 'respondent': {
      Object.assign(session.session.userCase, {
        PRL_c1A_safetyConernAbout: ['respondent'],
        PRL_c1A_concernAboutChild: ['witnessingDomesticAbuse'],
        PRL_c1A_concernAboutRespondent: ['psychologicalAbuse', 'emotionalAbuse', 'somethingElse'],
      });
      break;
    }
    default: {
      Object.assign(session.session.userCase, {
        PRL_c1A_safetyConernAbout: ['children', 'applicant', 'respondent'],
        PRL_c1A_concernAboutChild: ['physicalAbuse', 'financialAbuse'],
        PRL_c1A_concernAboutRespondent: ['somethingElse'],
      });
      break;
    }
  }

  return mockRequest(session);
};

describe('SafteyConcernsNavigationController for only children', () => {
  beforeEach(() => {
    caseData = dummyRequest(PRL_C1ASafteyConcernsAbout.CHILDREN).session.userCase;
  });

  test('From safety concern about screen -> navigate to the children report abuse screen', async () => {
    expect(SafteyConcernsNavigationController.getNextUrl(RESPONDENT_YOUR_CHILD_CONCERNS, caseData)).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/your-or-child-safety-concerns'
    );
  });

  test('From children report abuse screen -> navigate to children physical abuse screen', async () => {
    expect(SafteyConcernsNavigationController.getNextUrl(PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD, caseData)).toBe(
      applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { abuseType: PRL_C1AAbuseTypes.PHYSICAL_ABUSE })
    );
  });

  test('From children physical abuse screen -> navigate to financial abuse screen', async () => {
    expect(
      SafteyConcernsNavigationController.getNextUrl(PRL_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, caseData, {
        abuseType: PRL_C1AAbuseTypes.PHYSICAL_ABUSE,
      })
    ).toBe('/tasklistresponse/allegations-of-harm-and-violence/child/report-abuse/financialAbuse');
  });
});

describe('SafteyConcernsNavigationController for only respondent', () => {
  beforeEach(() => {
    caseData = dummyRequest(PRL_C1ASafteyConcernsAbout.RESPONDENT).session.userCase;
  });

  test('From safety concern about screen -> navigate to the respondent report abuse screen', async () => {
    expect(SafteyConcernsNavigationController.getNextUrl(RESPONDENT_YOUR_CHILD_CONCERNS, caseData)).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/your-or-child-safety-concerns'
    );
  });

  test('From respondent report abuse screen -> navigate to respondent psychological abuse screen', async () => {
    expect(
      SafteyConcernsNavigationController.getNextUrl(PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_RESPONDENT, caseData)
    ).toBe(
      applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_RESPONDENT_ABUSE, { abuseType: PRL_C1AAbuseTypes.PSYCHOLOGICAL_ABUSE })
    );
  });

  test('From respondent psychological abuse screen -> navigate to emotional abuse screen', async () => {
    expect(
      SafteyConcernsNavigationController.getNextUrl(PRL_C1A_SAFETY_CONCERNS_REPORT_RESPONDENT_ABUSE, caseData, {
        abuseType: PRL_C1AAbuseTypes.PSYCHOLOGICAL_ABUSE,
      })
    ).toBe(
      applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_RESPONDENT_ABUSE, { abuseType: PRL_C1AAbuseTypes.EMOTIONAL_ABUSE })
    );
  });

  test('From respondent emotional abuse screen -> navigate to somethingElse abuse screen', async () => {
    expect(
      SafteyConcernsNavigationController.getNextUrl(PRL_C1A_SAFETY_CONCERNS_REPORT_RESPONDENT_ABUSE, caseData, {
        abuseType: PRL_C1AAbuseTypes.EMOTIONAL_ABUSE,
      })
    ).toBe(
      applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_RESPONDENT_ABUSE, { abuseType: PRL_C1AAbuseTypes.SOMETHING_ELSE })
    );
  });

  test('When someother abuse along with witnessingDomesticAbuse is selected as children abuse, from children report abuse screen -> navigate to children emotional abuse screen -> From children emotional abuse screen -> navigate to other concerns screen', async () => {
    caseData.PRL_c1A_concernAboutChild = ['emotionalAbuse', 'witnessingDomesticAbuse'];
    expect(SafteyConcernsNavigationController.getNextUrl(PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD, caseData)).toBe(
      applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { abuseType: PRL_C1AAbuseTypes.EMOTIONAL_ABUSE })
    );
  });
});

describe('SafteyConcernsNavigationController for both children and respondent', () => {
  beforeEach(() => {
    caseData = dummyRequest('both').session.userCase;
  });

  test('From safety concern about screen -> navigate to the children report abuse screen', async () => {
    expect(SafteyConcernsNavigationController.getNextUrl(RESPONDENT_YOUR_CHILD_CONCERNS, caseData)).toBe(
      '/tasklistresponse/allegations-of-harm-and-violence/your-or-child-safety-concerns'
    );
  });

  test('From children report abuse screen -> navigate to children physical abuse screen', async () => {
    expect(SafteyConcernsNavigationController.getNextUrl(PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD, caseData)).toBe(
      applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, { abuseType: PRL_C1AAbuseTypes.PHYSICAL_ABUSE })
    );
  });

  test('From children physical abuse screen -> navigate to financial abuse screen', async () => {
    expect(
      SafteyConcernsNavigationController.getNextUrl(PRL_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, caseData, {
        abuseType: PRL_C1AAbuseTypes.PHYSICAL_ABUSE,
      })
    ).toBe('/tasklistresponse/allegations-of-harm-and-violence/child/report-abuse/financialAbuse');
  });

  test('From children financial abuse screen -> navigate to the respondent report abuse screen', async () => {
    expect(
      SafteyConcernsNavigationController.getNextUrl(PRL_C1A_SAFETY_CONCERNS_REPORT_CHILD_ABUSE, caseData, {
        abuseType: PRL_C1AAbuseTypes.FINANCIAL_ABUSE,
      })
    ).toBe('/tasklistresponse/allegations-of-harm-and-violence/respondent/concerns-about');
  });

  test('From respondent report abuse screen -> navigate to respondent somethingElse abuse screen', async () => {
    expect(
      SafteyConcernsNavigationController.getNextUrl(PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_RESPONDENT, caseData)
    ).toBe(
      applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_RESPONDENT_ABUSE, { abuseType: PRL_C1AAbuseTypes.SOMETHING_ELSE })
    );
  });

  test('When only somethingElse is selected as children abuse, from children report abuse screen -> navigate to the respondent report abuse screen -> From respondent report abuse screen -> navigate to respondent somethingElse abuse screen -> navigate to other concerns screen', async () => {
    caseData.PRL_c1A_concernAboutChild = ['somethingElse'];
    expect(SafteyConcernsNavigationController.getNextUrl(PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_CHILD, caseData)).toBe(
      PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_RESPONDENT
    );
    expect(
      SafteyConcernsNavigationController.getNextUrl(PRL_C1A_SAFETY_CONCERNS_CONCERNS_ABOUT_RESPONDENT, caseData)
    ).toBe(
      applyParms(PRL_C1A_SAFETY_CONCERNS_REPORT_RESPONDENT_ABUSE, { abuseType: PRL_C1AAbuseTypes.SOMETHING_ELSE })
    );
  });
});
