import { mockRequest } from '../../utils/mockRequest';

export const safetyConcernsMockData = mockRequest({
  params: {},
  session: {
    userCase: {
      c1A_childAbductedBefore: 'No',
      c1A_safetyConernAbout: ['children', 'applicant'],
      c1A_concernAboutChild: ['physicalAbuse', 'financialAbuse', 'abduction'],
      c1A_concernAboutApplicant: ['somethingElse'],
    },
  },
});
