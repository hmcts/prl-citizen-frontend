import { mockRequest } from '../../../../../test/unit/utils/mockRequest';

import { prepareRequest } from './safetyConcernMapper';

let respondents;

describe('SafetyConcernsMapper', () => {
  const req = mockRequest();
  beforeEach(() => {
    req.session.userCase = {
      ...req.session.userCase,
      c1A_haveSafetyConcerns: 'Yes',
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
    respondents[0].value.response.respondingCitizenAoH = await prepareRequest(req.session.userCase);
    expect(respondents[0].value.response.respondingCitizenAoH).toEqual(
      '{"c1A_haveSafetyConcerns":"Yes","c1A_safetyConernAbout":["children"],"c1A_concernAboutChild":["physicalAbuse","abduction","witnessingDomesticAbuse"],"c1A_concernAboutRespondent":["financialAbuse","somethingElse"],"c1A_keepingSafeStatement":"safe statement","c1A_supervisionAgreementDetails":"Yes, but I prefer that it is supervised","c1A_agreementOtherWaysDetails":"Yes","c1A_otherConcernsDrugs":"Yes","c1A_otherConcernsDrugsDetails":"drugs extra info","c1A_childSafetyConcerns":"Yes","c1A_childSafetyConcernsDetails":"other issues","c1A_abductionReasonOutsideUk":"adb other loc","c1A_childsCurrentLocation":"adb other loc","c1A_childrenMoreThanOnePassport":"Yes","c1A_possessionChildrenPassport":["mother","father","otherPerson"],"c1A_provideOtherDetails":"other","c1A_passportOffice":"Yes","c1A_abductionPassportOfficeNotified":"Yes","c1A_previousAbductionsShortDesc":"prev abd","c1A_policeOrInvestigatorInvolved":"Yes","c1A_policeOrInvestigatorOtherDetails":"prev abd","c1A_childAbductedBefore":"Yes","c1A_safteyConcerns":{"child":{"physicalAbuse":{"behaviourDetails":"pa","behaviourStartDate":"pa","isOngoingBehaviour":"Yes","seekHelpFromPersonOrAgency":"Yes","seekHelpDetails":"pa extra","childrenConcernedAbout":["ec6e380e-5cad-4ee4-ae84-954864789916"]}},"respondent":{"financialAbuse":{"behaviourDetails":"fa","behaviourStartDate":"fa","isOngoingBehaviour":"Yes","seekHelpFromPersonOrAgency":"Yes","seekHelpDetails":"fa extra","childrenConcernedAbout":null},"somethingElse":{"behaviourDetails":"se","behaviourStartDate":"se","isOngoingBehaviour":"No","seekHelpFromPersonOrAgency":"No","seekHelpDetails":"","childrenConcernedAbout":null}}}}'
    );
  });

  test('When safetyconcerns are not present, set respondent saftery concerns data appropriately', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase = {
      ...req.session.userCase,
      c1A_haveSafetyConcerns: 'No',
    };
    respondents[0].value.response.respondingCitizenAoH = await prepareRequest(req.session.userCase);
    expect(respondents[0].value.response.respondingCitizenAoH).toEqual(
      '{"c1A_haveSafetyConcerns":"No","c1A_safetyConernAbout":[],"c1A_concernAboutChild":[],"c1A_concernAboutRespondent":[],"c1A_keepingSafeStatement":"","c1A_supervisionAgreementDetails":"","c1A_agreementOtherWaysDetails":null,"c1A_otherConcernsDrugs":null,"c1A_otherConcernsDrugsDetails":"","c1A_childSafetyConcerns":null,"c1A_childSafetyConcernsDetails":"","c1A_abductionReasonOutsideUk":"","c1A_childsCurrentLocation":"","c1A_childrenMoreThanOnePassport":null,"c1A_possessionChildrenPassport":[],"c1A_provideOtherDetails":"","c1A_passportOffice":null,"c1A_abductionPassportOfficeNotified":null,"c1A_previousAbductionsShortDesc":"","c1A_policeOrInvestigatorInvolved":null,"c1A_policeOrInvestigatorOtherDetails":"","c1A_childAbductedBefore":null,"c1A_safteyConcerns":{}}'
    );
  });

  test('When safetyconcerns are present with no abductions and witnessing domestic abuse, set respondent saftery concerns data appropriately', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase = {
      ...req.session.userCase,
      c1A_haveSafetyConcerns: 'Yes',
      c1A_concernAboutChild: ['physicalAbuse'],
    };
    respondents[0].value.response.respondingCitizenAoH = await prepareRequest(req.session.userCase);
    expect(respondents[0].value.response.respondingCitizenAoH).toEqual(
      '{"c1A_haveSafetyConcerns":"Yes","c1A_safetyConernAbout":["children"],"c1A_concernAboutChild":["physicalAbuse"],"c1A_concernAboutRespondent":[],"c1A_keepingSafeStatement":"safe statement","c1A_supervisionAgreementDetails":"Yes, but I prefer that it is supervised","c1A_agreementOtherWaysDetails":"Yes","c1A_otherConcernsDrugs":"Yes","c1A_otherConcernsDrugsDetails":"drugs extra info","c1A_childSafetyConcerns":"Yes","c1A_childSafetyConcernsDetails":"other issues","c1A_abductionReasonOutsideUk":"","c1A_childsCurrentLocation":"","c1A_childrenMoreThanOnePassport":null,"c1A_possessionChildrenPassport":[],"c1A_provideOtherDetails":"","c1A_passportOffice":null,"c1A_abductionPassportOfficeNotified":null,"c1A_previousAbductionsShortDesc":"","c1A_policeOrInvestigatorInvolved":null,"c1A_policeOrInvestigatorOtherDetails":"","c1A_childAbductedBefore":null,"c1A_safteyConcerns":{"child":{"physicalAbuse":{"behaviourDetails":"pa","behaviourStartDate":"pa","isOngoingBehaviour":"Yes","seekHelpFromPersonOrAgency":"Yes","seekHelpDetails":"pa extra","childrenConcernedAbout":["ec6e380e-5cad-4ee4-ae84-954864789916"]}},"respondent":null}}'
    );
  });

  test('When safetyconcerns are present with no witnessing domestic abuse and child not abducted before, set respondent saftery concerns data appropriately', async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase = {
      ...req.session.userCase,
      c1A_haveSafetyConcerns: 'Yes',
      c1A_concernAboutChild: ['physicalAbuse', 'abduction'],
      c1A_childAbductedBefore: 'No',
    };
    respondents[0].value.response.respondingCitizenAoH = await prepareRequest(req.session.userCase);
    expect(respondents[0].value.response.respondingCitizenAoH).toEqual(
      '{"c1A_haveSafetyConcerns":"Yes","c1A_safetyConernAbout":["children"],"c1A_concernAboutChild":["physicalAbuse","abduction"],"c1A_concernAboutRespondent":[],"c1A_keepingSafeStatement":"safe statement","c1A_supervisionAgreementDetails":"Yes, but I prefer that it is supervised","c1A_agreementOtherWaysDetails":"Yes","c1A_otherConcernsDrugs":"Yes","c1A_otherConcernsDrugsDetails":"drugs extra info","c1A_childSafetyConcerns":"Yes","c1A_childSafetyConcernsDetails":"other issues","c1A_abductionReasonOutsideUk":"adb other loc","c1A_childsCurrentLocation":"adb other loc","c1A_childrenMoreThanOnePassport":"Yes","c1A_possessionChildrenPassport":["mother","father","otherPerson"],"c1A_provideOtherDetails":"other","c1A_passportOffice":"Yes","c1A_abductionPassportOfficeNotified":"Yes","c1A_previousAbductionsShortDesc":"","c1A_policeOrInvestigatorInvolved":null,"c1A_policeOrInvestigatorOtherDetails":"","c1A_childAbductedBefore":"No","c1A_safteyConcerns":{"child":{"physicalAbuse":{"behaviourDetails":"pa","behaviourStartDate":"pa","isOngoingBehaviour":"Yes","seekHelpFromPersonOrAgency":"Yes","seekHelpDetails":"pa extra","childrenConcernedAbout":["ec6e380e-5cad-4ee4-ae84-954864789916"]}},"respondent":null}}'
    );
  });

  test("When safetyconcerns are present with no witnessing domestic abuse and child's passport details not informed, set respondent saftery concerns data appropriately", async () => {
    req.session.user.id = '0c09b130-2eba-4ca8-a910-1f001bac01e7';
    req.session.userCase = {
      ...req.session.userCase,
      c1A_haveSafetyConcerns: 'Yes',
      c1A_concernAboutChild: ['physicalAbuse', 'abduction'],
      c1A_passportOffice: 'No',
    };
    respondents[0].value.response.respondingCitizenAoH = await prepareRequest(req.session.userCase);
    expect(respondents[0].value.response.respondingCitizenAoH).toEqual(
      '{"c1A_haveSafetyConcerns":"Yes","c1A_safetyConernAbout":["children"],"c1A_concernAboutChild":["physicalAbuse","abduction"],"c1A_concernAboutRespondent":[],"c1A_keepingSafeStatement":"safe statement","c1A_supervisionAgreementDetails":"Yes, but I prefer that it is supervised","c1A_agreementOtherWaysDetails":"Yes","c1A_otherConcernsDrugs":"Yes","c1A_otherConcernsDrugsDetails":"drugs extra info","c1A_childSafetyConcerns":"Yes","c1A_childSafetyConcernsDetails":"other issues","c1A_abductionReasonOutsideUk":"adb other loc","c1A_childsCurrentLocation":"adb other loc","c1A_childrenMoreThanOnePassport":null,"c1A_possessionChildrenPassport":[],"c1A_provideOtherDetails":"other","c1A_passportOffice":"No","c1A_abductionPassportOfficeNotified":null,"c1A_previousAbductionsShortDesc":"prev abd","c1A_policeOrInvestigatorInvolved":"Yes","c1A_policeOrInvestigatorOtherDetails":"prev abd","c1A_childAbductedBefore":"Yes","c1A_safteyConcerns":{"child":{"physicalAbuse":{"behaviourDetails":"pa","behaviourStartDate":"pa","isOngoingBehaviour":"Yes","seekHelpFromPersonOrAgency":"Yes","seekHelpDetails":"pa extra","childrenConcernedAbout":["ec6e380e-5cad-4ee4-ae84-954864789916"]}},"respondent":null}}'
    );
  });
});
