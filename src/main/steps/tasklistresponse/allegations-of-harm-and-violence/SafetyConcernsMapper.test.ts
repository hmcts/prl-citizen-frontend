import { mockRequest } from '../../../../test/unit/utils/mockRequest';

import { mapSafetyConcernsDetails, prepareRequest } from './SafetyConcernsMapper';

let respondents;

describe('SafetyConcernsMapper', () => {
  const req = mockRequest();
  beforeEach(() => {
    req.session.userCase = {
      ...req.session.userCase,
      PRL_c1A_haveSafetyConcerns: 'Yes',
      PRL_c1A_safetyConernAbout: ['children'],
      PRL_c1A_concernAboutChild: ['physicalAbuse', 'abduction', 'witnessingDomesticAbuse'],
      PRL_c1A_concernAboutRespondent: ['financialAbuse', 'somethingElse'],
      PRL_c1A_safteyConcerns: {
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
      PRL_c1A_abductionReasonOutsideUk: 'adb other loc',
      PRL_c1A_childsCurrentLocation: 'adb other loc',
      PRL_c1A_passportOffice: 'Yes',
      PRL_c1A_childrenMoreThanOnePassport: 'Yes',
      PRL_c1A_possessionChildrenPassport: ['mother', 'father', 'otherPerson'],
      PRL_c1A_provideOtherDetails: 'other',
      PRL_c1A_abductionPassportOfficeNotified: 'Yes',
      PRL_c1A_childAbductedBefore: 'Yes',
      PRL_c1A_previousAbductionsShortDesc: 'prev abd',
      PRL_c1A_policeOrInvestigatorInvolved: 'Yes',
      PRL_c1A_policeOrInvestigatorOtherDetails: 'prev abd',
      PRL_c1A_otherConcernsDrugs: 'Yes',
      PRL_c1A_otherConcernsDrugsDetails: 'drugs extra info',
      PRL_c1A_childSafetyConcerns: 'Yes',
      PRL_c1A_childSafetyConcernsDetails: 'other issues',
      PRL_c1A_keepingSafeStatement: 'safe statement',
      PRL_c1A_supervisionAgreementDetails: 'Yes, but I prefer that it is supervised',
      PRL_c1A_agreementOtherWaysDetails: 'Yes',
    };
    respondents = [
      {
        id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
        value: {
          firstName: 'testFirstName',
          lastName: 'Citizen',
          email: 'test@example.net',
          user: {
            idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
            email: 'test1234@example.net',
          },
          response: {},
        },
      },
    ];
  });

  test('When safetyconcerns are present, set respondent saftery concerns data appropriately', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    respondents[0].value.response.safetyConcerns = await prepareRequest(req.session.userCase);
    expect(respondents[0].value.response.safetyConcerns).toEqual(
      expect.objectContaining({
        child: {
          physicalAbuse: {
            behaviourDetails: 'pa',
            behaviourStartDate: 'pa',
            isOngoingBehaviour: 'Yes',
            seekHelpFromPersonOrAgency: 'Yes',
            seekHelpDetails: 'pa extra',
            childrenConcernedAbout: 'ec6e380e-5cad-4ee4-ae84-954864789916',
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
            childrenConcernedAbout: null,
          },
        },
        haveSafetyConcerns: 'Yes',
        safetyConcernAbout: ['children'],
        concernAboutChild: ['physicalAbuse', 'abduction', 'witnessingDomesticAbuse'],
        concernAboutRespondent: ['financialAbuse', 'somethingElse'],
        otherconcerns: {
          c1AkeepingSafeStatement: 'safe statement',
          c1AsupervisionAgreementDetails: 'Yes, but I prefer that it is supervised',
          c1AagreementOtherWaysDetails: 'Yes',
          c1AotherConcernsDrugs: 'Yes',
          c1AotherConcernsDrugsDetails: 'drugs extra info',
          c1AchildSafetyConcerns: 'Yes',
          c1AchildSafetyConcernsDetails: 'other issues',
        },
        abductions: {
          c1AabductionReasonOutsideUk: 'adb other loc',
          c1AchildsCurrentLocation: 'adb other loc',
          c1AchildrenMoreThanOnePassport: 'Yes',
          c1ApossessionChildrenPassport: ['mother', 'father', 'otherPerson'],
          c1AprovideOtherDetails: 'other',
          c1ApassportOffice: 'Yes',
          c1AabductionPassportOfficeNotified: 'Yes',
          c1ApreviousAbductionsShortDesc: 'prev abd',
          c1ApoliceOrInvestigatorInvolved: 'Yes',
          c1ApoliceOrInvestigatorOtherDetails: 'prev abd',
          c1AchildAbductedBefore: 'Yes',
        },
      })
    );
  });

  test('When safetyconcerns are not present, set respondent saftery concerns data appropriately', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase = {
      ...req.session.userCase,
      PRL_c1A_haveSafetyConcerns: 'No',
    };
    respondents[0].value.response.safetyConcerns = await prepareRequest(req.session.userCase);
    expect(respondents[0].value.response.safetyConcerns).toEqual(expect.objectContaining({ haveSafetyConcerns: 'No' }));
  });

  test('When safetyconcerns are present with no abductions and witnessing domestic abuse, set respondent saftery concerns data appropriately', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase = {
      ...req.session.userCase,
      PRL_c1A_haveSafetyConcerns: 'Yes',
      PRL_c1A_concernAboutChild: ['physicalAbuse'],
    };
    respondents[0].value.response.safetyConcerns = await prepareRequest(req.session.userCase);
    expect(respondents[0].value.response.safetyConcerns).toEqual(
      expect.objectContaining({
        child: {
          physicalAbuse: {
            behaviourDetails: 'pa',
            behaviourStartDate: 'pa',
            isOngoingBehaviour: 'Yes',
            seekHelpFromPersonOrAgency: 'Yes',
            seekHelpDetails: 'pa extra',
            childrenConcernedAbout: 'ec6e380e-5cad-4ee4-ae84-954864789916',
          },
        },
        haveSafetyConcerns: 'Yes',
        safetyConcernAbout: ['children'],
        concernAboutChild: ['physicalAbuse'],
        otherconcerns: {
          c1AkeepingSafeStatement: 'safe statement',
          c1AsupervisionAgreementDetails: 'Yes, but I prefer that it is supervised',
          c1AagreementOtherWaysDetails: 'Yes',
          c1AotherConcernsDrugs: 'Yes',
          c1AotherConcernsDrugsDetails: 'drugs extra info',
          c1AchildSafetyConcerns: 'Yes',
          c1AchildSafetyConcernsDetails: 'other issues',
        },
      })
    );
  });

  test('When safetyconcerns are present with no witnessing domestic abuse and child not abducted before, set respondent saftery concerns data appropriately', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase = {
      ...req.session.userCase,
      PRL_c1A_haveSafetyConcerns: 'Yes',
      PRL_c1A_concernAboutChild: ['physicalAbuse', 'abduction'],
      PRL_c1A_childAbductedBefore: 'No',
    };
    respondents[0].value.response.safetyConcerns = await prepareRequest(req.session.userCase);
    expect(respondents[0].value.response.safetyConcerns).toEqual(
      expect.objectContaining({
        child: {
          physicalAbuse: {
            behaviourDetails: 'pa',
            behaviourStartDate: 'pa',
            isOngoingBehaviour: 'Yes',
            seekHelpFromPersonOrAgency: 'Yes',
            seekHelpDetails: 'pa extra',
            childrenConcernedAbout: 'ec6e380e-5cad-4ee4-ae84-954864789916',
          },
        },
        haveSafetyConcerns: 'Yes',
        safetyConcernAbout: ['children'],
        concernAboutChild: ['physicalAbuse', 'abduction'],
        otherconcerns: {
          c1AkeepingSafeStatement: 'safe statement',
          c1AsupervisionAgreementDetails: 'Yes, but I prefer that it is supervised',
          c1AagreementOtherWaysDetails: 'Yes',
          c1AotherConcernsDrugs: 'Yes',
          c1AotherConcernsDrugsDetails: 'drugs extra info',
          c1AchildSafetyConcerns: 'Yes',
          c1AchildSafetyConcernsDetails: 'other issues',
        },
        abductions: {
          c1AabductionReasonOutsideUk: 'adb other loc',
          c1AchildsCurrentLocation: 'adb other loc',
          c1AchildrenMoreThanOnePassport: 'Yes',
          c1ApossessionChildrenPassport: ['mother', 'father', 'otherPerson'],
          c1AprovideOtherDetails: 'other',
          c1ApassportOffice: 'Yes',
          c1AabductionPassportOfficeNotified: 'Yes',
          c1AchildAbductedBefore: 'No',
        },
      })
    );
  });

  test("When safetyconcerns are present with no witnessing domestic abuse and child's passport details not informed, set respondent saftery concerns data appropriately", async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase = {
      ...req.session.userCase,
      PRL_c1A_haveSafetyConcerns: 'Yes',
      PRL_c1A_concernAboutChild: ['physicalAbuse', 'abduction'],
      PRL_c1A_passportOffice: 'No',
    };
    respondents[0].value.response.safetyConcerns = await prepareRequest(req.session.userCase);
    expect(respondents[0].value.response.safetyConcerns).toEqual(
      expect.objectContaining({
        child: {
          physicalAbuse: {
            behaviourDetails: 'pa',
            behaviourStartDate: 'pa',
            isOngoingBehaviour: 'Yes',
            seekHelpFromPersonOrAgency: 'Yes',
            seekHelpDetails: 'pa extra',
            childrenConcernedAbout: 'ec6e380e-5cad-4ee4-ae84-954864789916',
          },
        },
        haveSafetyConcerns: 'Yes',
        safetyConcernAbout: ['children'],
        concernAboutChild: ['physicalAbuse', 'abduction'],
        otherconcerns: {
          c1AkeepingSafeStatement: 'safe statement',
          c1AsupervisionAgreementDetails: 'Yes, but I prefer that it is supervised',
          c1AagreementOtherWaysDetails: 'Yes',
          c1AotherConcernsDrugs: 'Yes',
          c1AotherConcernsDrugsDetails: 'drugs extra info',
          c1AchildSafetyConcerns: 'Yes',
          c1AchildSafetyConcernsDetails: 'other issues',
        },
        abductions: {
          c1AabductionReasonOutsideUk: 'adb other loc',
          c1AchildsCurrentLocation: 'adb other loc',
          c1AprovideOtherDetails: 'other',
          c1ApassportOffice: 'No',
          c1ApreviousAbductionsShortDesc: 'prev abd',
          c1ApoliceOrInvestigatorInvolved: 'Yes',
          c1ApoliceOrInvestigatorOtherDetails: 'prev abd',
          c1AchildAbductedBefore: 'Yes',
        },
      })
    );
  });

  test('Should map saftey concerns data in the usercase when mapSafetyConcernsDetails method is invoked', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    const response = {
      safetyConcerns: {
        child: {
          physicalAbuse: {
            behaviourDetails: 'pa',
            behaviourStartDate: 'pa',
            isOngoingBehaviour: 'Yes',
            seekHelpFromPersonOrAgency: 'Yes',
            seekHelpDetails: 'pa extra',
            childrenConcernedAbout: 'ec6e380e-5cad-4ee4-ae84-954864789916',
          },
        },
        haveSafetyConcerns: 'Yes',
        safetyConcernAbout: ['children'],
        concernAboutChild: ['physicalAbuse'],
        concernAboutRespondent: ['financialAbuse', 'somethingElse'],
        otherconcerns: {
          c1AkeepingSafeStatement: 'safe statement',
          c1AsupervisionAgreementDetails: 'Yes, but I prefer that it is supervised',
          c1AagreementOtherWaysDetails: 'Yes',
          c1AotherConcernsDrugs: 'Yes',
          c1AotherConcernsDrugsDetails: 'drugs extra info',
          c1AchildSafetyConcerns: 'Yes',
          c1AchildSafetyConcernsDetails: 'other issues',
        },
      },
    };
    respondents[0].value.response = response;
    req.session.userCase = mapSafetyConcernsDetails(respondents[0]);

    expect(req.session.userCase).toEqual(
      expect.objectContaining({
        PRL_c1A_haveSafetyConcerns: 'Yes',
        PRL_c1A_safetyConernAbout: ['children'],
        PRL_c1A_concernAboutChild: ['physicalAbuse'],
        PRL_c1A_concernAboutRespondent: ['financialAbuse', 'somethingElse'],
        PRL_c1A_safteyConcerns: {
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
        },
        PRL_c1A_abductionReasonOutsideUk: undefined,
        PRL_c1A_childsCurrentLocation: undefined,
        PRL_c1A_passportOffice: undefined,
        PRL_c1A_childrenMoreThanOnePassport: undefined,
        PRL_c1A_possessionChildrenPassport: undefined,
        PRL_c1A_provideOtherDetails: undefined,
        PRL_c1A_abductionPassportOfficeNotified: undefined,
        PRL_c1A_childAbductedBefore: undefined,
        PRL_c1A_previousAbductionsShortDesc: undefined,
        PRL_c1A_policeOrInvestigatorInvolved: undefined,
        PRL_c1A_policeOrInvestigatorOtherDetails: undefined,
        PRL_c1A_otherConcernsDrugs: 'Yes',
        PRL_c1A_otherConcernsDrugsDetails: 'drugs extra info',
        PRL_c1A_childSafetyConcerns: 'Yes',
        PRL_c1A_childSafetyConcernsDetails: 'other issues',
        PRL_c1A_keepingSafeStatement: 'safe statement',
        PRL_c1A_supervisionAgreementDetails: 'Yes, but I prefer that it is supervised',
        PRL_c1A_agreementOtherWaysDetails: 'Yes',
      })
    );
  });
});
