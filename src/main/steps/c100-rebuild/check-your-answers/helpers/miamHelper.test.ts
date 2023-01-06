/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Urls from '../../../urls';
import { enContent } from '../content';
import {
  MiamHelper,
  MiamHelperDynamicEnteriesMapper,
  miamOnlyChildFieldParser,
  miamOnlyParentFieldParser,
  miamParentAndChildFieldParser,
} from '../helpers/miamHelper';

/* eslint-disable @typescript-eslint/ban-types */
describe('MiamHelperDynamicEnteriesMapper Test cases', () => {
  enum selectors {
    DOMESTIC = 'domesticViolence',
    CHILD_PROTECTION = 'childProtection',
    URGENT = 'urgentHearing',
    PREV_MIAM = 'previousMIAMOrExempt',
    EXEMPT = 'validExemption',
    NONE = 'none',
  }
  const userCase = {
    miam_domesticAbuse: [
      'domesticViolence',
      'childProtection',
      'urgentHearing',
      'previousMIAMOrExempt',
      'validExemption',
    ],
  };

  test('domesticViolence Mapper Test case', () => {
    const pagedata = MiamHelperDynamicEnteriesMapper(selectors.DOMESTIC, enContent.keys, Urls, userCase);
    expect(pagedata.toString()).toBe(
      {
        changeUrl: '/c100-rebuild/miam/domestic-abuse',
        key: undefined,
        valueHtml:
          '<ul><li>undefined</li><li>undefined</li><li>undefined</li><li>undefined</li><li>undefined</li></ul>',
      }.toString()
    );
  });

  test('urgentHearing Mapper Test case', () => {
    const pagedata = MiamHelperDynamicEnteriesMapper(selectors.URGENT, enContent.keys, Urls, userCase);
    expect(pagedata.toString()).toBe(
      {
        changeUrl: '/c100-rebuild/miam/domestic-abuse',
        key: 'urgentHearing',
        valueHtml:
          '<ul><li>urgentHearing</li><li>urgentHearing</li><li>urgentHearing</li><li>urgentHearing</li><li>urgentHearing</li></ul>',
      }.toString()
    );
  });

  test('childProtection Mapper Test case', () => {
    const pagedata = MiamHelperDynamicEnteriesMapper(selectors.CHILD_PROTECTION, enContent.keys, Urls, userCase);
    expect(pagedata.toString()).toBe(
      {
        changeUrl: '/c100-rebuild/miam/domestic-abuse',
        key: undefined,
        valueHtml:
          '<ul><li>undefined</li><li>undefined</li><li>undefined</li><li>undefined</li><li>undefined</li></ul>',
      }.toString()
    );
  });
});

describe('Miam Fields parser', () => {
  test('miamOnlyChildFieldParser parser for miam', () => {
    const userCase = {
      miam_childProtectionEvidence: ['localAuthorityCp', 'childProtectionCpPlan'],
    };
    const fields = miamOnlyChildFieldParser(userCase, enContent.keys, 'miam_childProtectionEvidence');
    expect(fields).not.toBe(undefined);
  });

  test('miam_nonAttendanceReasons parser for miam', () => {
    const sessionKey = 'miam_nonAttendanceReasons';
    const allKeys = enContent.keys;
    allKeys['domesticViolenceHead'] = 'Domestic voilence';
    const userCase = {
      miam_nonAttendanceReasons: ['domesticViolence', 'critcialTest'],
      miam_nonAttendanceReasons_domesticViolence_subfields: ['domesticViolenceHead'],
      miam_nonAttendanceReasons_critcialTest_subfields: ['domesticViolenceHead'],
    };
    const str = miamParentAndChildFieldParser(userCase, enContent.keys, sessionKey);
    expect(str).toBe(
      '<ul><li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">Domestic voilence</li><li class="govuk-!-padding-top-1 govuk-!-padding-bottom-1">Domestic voilence</li></ul>'
    );
  });

  test('miam_nonAttendanceReasons domestic violence parser for miam', () => {
    const userCase = {
      miam_nonAttendanceReasons: ['domesticViolence'],
      sessionKey: 'miam_nonAttendanceReasons',
      miam_nonAttendanceReasons_domesticViolence_subfields: 'miam_nonAttendanceReasons_domesticViolence_subfields',
    };
    miamOnlyParentFieldParser(userCase, enContent.keys, 'miam_nonAttendanceReasons');
  });
});

describe('Miam Fields parser - InstanceOfMiamHelper miamExemptionParser', () => {
  test('miam_nonAttendanceReasons domesticViolence parser for miamExemptionParser', () => {
    const userCase = {
      miam_nonAttendanceReasons: ['domesticViolence'],
    };
    MiamHelper.miamExemptionParser(userCase, enContent.keys);
  });

  test('miam_nonAttendanceReasons urgentHearing parser for miamExemptionParser', () => {
    const userCase = {
      miam_nonAttendanceReasons: ['urgentHearing'],
    };
    MiamHelper.miamExemptionParser(userCase, enContent.keys);
  });

  test('miam_nonAttendanceReasons childProtection parser for miamExemptionParser', () => {
    const userCase = {
      miam_nonAttendanceReasons: ['childProtection'],
    };
    MiamHelper.miamExemptionParser(userCase, enContent.keys);
  });

  test('miam_nonAttendanceReasons previousMIAMOrExempt parser for miamExemptionParser', () => {
    const userCase = {
      miam_nonAttendanceReasons: ['previousMIAMOrExempt'],
    };
    MiamHelper.miamExemptionParser(userCase, enContent.keys);
  });

  test('miam_nonAttendanceReasons validExemption parser for miamExemptionParser', () => {
    const userCase = {
      miam_nonAttendanceReasons: ['validExemption'],
    };
    MiamHelper.miamExemptionParser(userCase, enContent.keys);
  });
  test('miam_nonAttendanceReasons noReason parser for miamExemptionParser', () => {
    const userCase = {
      miam_nonAttendanceReasons: ['noReason'],
    };
    MiamHelper.miamExemptionParser(userCase, enContent.keys);
  });
  test('miam_nonAttendanceReasons - empty value for miamExemptionParser', () => {
    const userCase = {
      miam_nonAttendanceReasons: [''],
    };
    MiamHelper.miamExemptionParser(userCase, enContent.keys);
  });
  test('miam_nonAttendanceReasons - passed empty usercase for miamExemptionParser', () => {
    const userCase = {};
    MiamHelper.miamExemptionParser(userCase, enContent.keys);
  });
});
describe('Miam Fields parser - InstanceOfMiamHelper miamExemptionParserDynamicEnteries', () => {
  test('miam_nonAttendanceReasons domestic violence parser for miam', () => {
    const userCase = {
      miam_nonAttendanceReasons: ['domesticViolence'],
    };
    MiamHelper.miamExemptionParserDynamicEnteries(userCase, enContent.keys, 'miam_nonAttendanceReasons');
  });
  test('miam_nonAttendanceReasons - empty userCase parser for miam', () => {
    const userCase = {};
    MiamHelper.miamExemptionParserDynamicEnteries(userCase, enContent.keys, '');
  });
});
