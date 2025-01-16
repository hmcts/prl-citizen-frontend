import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

describe('common > safety concerns > concerns for safety > route guard', () => {
  test('should data for previous abductions when abducted before is no', async () => {
    const req = mockRequest({
      body: {
        c1A_haveSafetyConcerns: 'No',
      },
      session: {
        userCase: {
          c1A_safetyConernAbout: ['children'],
          c1A_concernAboutChild: ['physicalAbuse', 'abduction', 'witnessingDomesticAbuse'],
          c1A_concernAboutRespondent: ['financialAbuse', 'somethingElse'],
          c1A_safteyConcerns: {
            child: {
              physicalAbuse: {
                behaviourDetails: 'pa',
                behaviourStartDate: 'pa',
                isOngoingBehaviour: 'Yes',
                seekHelpFromPersonOrAgency: 'Yes',
                seekHelpDetails: 'pa extra',
                childrenConcernedAbout: ['ec6e380e-5cad-4ee4-ae84-954864789916'],
              },
            },
            respondent: {
              financialAbuse: {
                behaviourDetails: 'fa',
                behaviourStartDate: 'fa',
                isOngoingBehaviour: 'Yes',
                seekHelpFromPersonOrAgency: 'Yes',
                seekHelpDetails: 'fa extra',
                childrenConcernedAbout: null,
              },
              somethingElse: {
                behaviourDetails: 'se',
                behaviourStartDate: 'se',
                isOngoingBehaviour: 'No',
                seekHelpFromPersonOrAgency: 'No',
                seekHelpDetails: '',
                childrenConcernedAbout: null,
              },
            },
          },
          c1A_abductionReasonOutsideUk: 'adb other loc',
          c1A_childsCurrentLocation: 'adb other loc',
          c1A_passportOffice: 'Yes',
          c1A_childrenMoreThanOnePassport: 'Yes',
          c1A_possessionChildrenPassport: ['mother', 'father', 'otherPerson'],
          c1A_provideOtherDetails: 'other',
          c1A_abductionPassportOfficeNotified: 'Yes',
          c1A_childAbductedBefore: 'Yes',
          c1A_previousAbductionsShortDesc: 'prev abd',
          c1A_policeOrInvestigatorInvolved: 'Yes',
          c1A_policeOrInvestigatorOtherDetails: 'prev abd',
          c1A_otherConcernsDrugs: 'Yes',
          c1A_otherConcernsDrugsDetails: 'drugs extra info',
          c1A_childSafetyConcerns: 'Yes',
          c1A_childSafetyConcernsDetails: 'other issues',
          c1A_keepingSafeStatement: 'safe statement',
          c1A_supervisionAgreementDetails: 'Yes, but I prefer that it is supervised',
          c1A_agreementOtherWaysDetails: 'Yes',
        },
      },
    });
    const res = mockResponse();
    const next = jest.fn();

    await routeGuard.post(req, res, next);
    expect(req.session.userCase).toStrictEqual({});
  });
});
