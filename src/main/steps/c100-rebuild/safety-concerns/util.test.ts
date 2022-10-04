import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { C1AAbuseTypes, C1ASafteyConcernsAbout } from '../../../app/case/definition';

import { isValidAbuseType } from './util';

const dummyRequest = mockRequest({
  session: {
    userCase: {
      c1A_concernAboutChild: ['physicalAbuse', 'psychologicalAbuse'],
      c1A_concernAboutApplicant: ['financialAbuse', 'somethingElse'],
    },
  },
});

describe('C1A Saftey Concerns util', () => {
  test('isValidAbuseType for child should return true if the abuse type is valid', async () => {
    expect(
      isValidAbuseType(C1AAbuseTypes.PHYSICAL_ABUSE, C1ASafteyConcernsAbout.CHILDREN, dummyRequest.session.userCase)
    ).toBe(true);
  });
  test('isValidAbuseType for child should return false if the abuse type is invalid', async () => {
    expect(
      isValidAbuseType(C1AAbuseTypes.SOMETHING_ELSE, C1ASafteyConcernsAbout.CHILDREN, dummyRequest.session.userCase)
    ).toBe(false);
    expect(
      isValidAbuseType(C1AAbuseTypes.EMOTIONAL_ABUSE, C1ASafteyConcernsAbout.CHILDREN, dummyRequest.session.userCase)
    ).toBe(false);
  });
  test('isValidAbuseType for applicant should return true if the abuse type is valid', async () => {
    expect(
      isValidAbuseType(C1AAbuseTypes.FINANCIAL_ABUSE, C1ASafteyConcernsAbout.APPLICANT, dummyRequest.session.userCase)
    ).toBe(true);
  });
  test('isValidAbuseType for applicant should return false if the abuse type is invalid', async () => {
    expect(
      isValidAbuseType(C1AAbuseTypes.SOMETHING_ELSE, C1ASafteyConcernsAbout.CHILDREN, dummyRequest.session.userCase)
    ).toBe(false);
    expect(
      isValidAbuseType(
        C1AAbuseTypes.WITNESSING_DOMESTIC_ABUSE,
        C1ASafteyConcernsAbout.APPLICANT,
        dummyRequest.session.userCase
      )
    ).toBe(false);
  });
});
