/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Urls from '../../../urls';
import { enContent } from '../content';

import { MiamHelperDynamicEnteriesMapper, miamOnlyChildFieldParser } from './miamHelper';

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
    expect(fields).toBe(1);
  });
});
