import mockUserCase from '../../../../test/unit/utils/mockUserCase';
import { CaseWithId } from '../../../app/case/case';
import { SectionStatus, State, YesOrNo } from '../../../app/case/definition';

import {
  getConfirmOrEditYourContactDetails,
  getConsentToApplicationStatus,
  getCurrentOrOtherProceedingsStatus,
  getInternationalFactorsStatus,
  getKeepYourDetailsPrivateStatus,
  getMiamStatus,
  getYourSafetyStatus,
} from './utils';

const userCase: CaseWithId = {
  id: '123',
  state: State.Submitted,
  serviceType: '',
  caseTypeOfApplication: 'C100',
};
let partyDetails;

describe('utils', () => {
  describe('getConfirmOrEditYourContactDetails', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      partyDetails = [
        {
          id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          value: {
            firstName: 'TestUser',
            lastName: 'Citizen',
            email: 'abc@example.net',
            user: {
              idamId: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
              email: 'test@example.net',
            },
          },
        },
      ];
    });
    test('getConfirmOrEditYourContactDetails IN_PROGRESS', async () => {
      userCase.respondents = partyDetails;
      expect(getConfirmOrEditYourContactDetails(userCase, '0c09b130-2eba-4ca8-a910-1f001bac01e6')).toBe(
        SectionStatus.IN_PROGRESS
      );
    });

    test('getConfirmOrEditYourContactDetails COMPLETED', async () => {
      partyDetails[0].value.firstName = 'TestUser';
      partyDetails[0].value.lastName = 'Citizen';
      partyDetails[0].value.placeOfBirth = 'London';
      partyDetails[0].value.dateOfBirth = '11-11-2011';
      partyDetails[0].value.address = {
        AddressLine1: 'string',
        AddressLine2: 'string',
        PostTown: 'string',
        County: 'string',
        PostCode: 'string',
      };
      partyDetails[0].value.email = 'dummy';
      partyDetails[0].value.phoneNumber = 'dummy';
      partyDetails[0].value.liveInRefuge = 'No';

      userCase.respondents = partyDetails;
      expect(getConfirmOrEditYourContactDetails(userCase, '0c09b130-2eba-4ca8-a910-1f001bac01e6')).toBe(
        SectionStatus.COMPLETED
      );
    });

    test('getConfirmOrEditYourContactDetails TO_DO', async () => {
      partyDetails[0].value.firstName = undefined;
      partyDetails[0].value.lastName = undefined;
      partyDetails[0].value.placeOfBirth = undefined;
      partyDetails[0].value.dateOfBirth = undefined;
      partyDetails[0].value.address = {
        AddressLine1: '',
        AddressLine2: '',
        PostTown: '',
        County: '',
        PostCode: '',
      };
      partyDetails[0].value.email = undefined;
      userCase.respondents = partyDetails;
      expect(getConfirmOrEditYourContactDetails(userCase, '0c09b130-2eba-4ca8-a910-1f001bac01e6')).toBe(
        SectionStatus.TO_DO
      );
    });
  });

  describe('getConsentToApplicationStatus', () => {
    beforeEach(() => {
      jest.clearAllMocks();

      const tempresponse = {
        legalRepresentation: 'No',
        consent: {
          consentToTheApplication: undefined,
          applicationReceivedDate: undefined,
          permissionFromCourt: undefined,
        },
      };

      partyDetails = [
        {
          id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          value: {
            firstName: 'TestUser',
            lastName: 'Citizen',
            email: 'abc@example.net',
            legalRepresentation: 'Yes',
            response: tempresponse,
            user: {
              idamId: '123456',
              email: 'test@example.net',
            },
          },
        },
      ];
    });

    test('getConsentToApplicationStatus TO_DO', async () => {
      userCase.respondents = partyDetails;
      expect(getConsentToApplicationStatus(userCase, '123456')).toBe(SectionStatus.TO_DO);
    });

    test('getConsentToApplicationStatus IN_PROGRESS', async () => {
      partyDetails[0].value.response.consent.consentToTheApplication = 'Yes';
      partyDetails[0].value.response.consent.applicationReceivedDate = '2023/10/16';

      userCase.respondents = partyDetails;
      expect(getConsentToApplicationStatus(userCase, '123456')).toBe(SectionStatus.IN_PROGRESS);
    });

    test('getConsentToApplicationStatus COMPLETED', async () => {
      partyDetails[0].value.response.consent.consentToTheApplication = 'Yes';
      partyDetails[0].value.response.consent.applicationReceivedDate = '2022/09/15';
      partyDetails[0].value.response.consent.permissionFromCourt = 'No';

      userCase.respondents = partyDetails;
      expect(getConsentToApplicationStatus(userCase, '123456')).toBe(SectionStatus.COMPLETED);
    });
  });

  describe('getCurrentOrOtherProceedingsStatus', () => {
    test.each([
      {
        data: {
          ...mockUserCase,
          proceedingsStart: undefined,
          proceedingsStartOrder: undefined,
        },
        expected: SectionStatus.TO_DO,
      },
      {
        data: {
          ...mockUserCase,
          proceedingsStart: YesOrNo.NO,
          proceedingsStartOrder: YesOrNo.NO,
        },
        expected: SectionStatus.COMPLETED,
      },
      {
        data: {
          ...mockUserCase,
          proceedingsStart: YesOrNo.NO,
          proceedingsStartOrder: YesOrNo.NO,
        },
        expected: SectionStatus.COMPLETED,
      },
      {
        data: {
          ...mockUserCase,
          proceedingsStart: YesOrNo.NO,
          proceedingsStartOrder: YesOrNo.NO,
        },
        expected: SectionStatus.COMPLETED,
      },
      {
        data: {
          ...mockUserCase,
          proceedingsStart: YesOrNo.YES,
          proceedingsStartOrder: YesOrNo.NO,
        },
        expected: SectionStatus.COMPLETED,
      },
    ])('should return correct status %#', async ({ data, expected }) => {
      expect(getCurrentOrOtherProceedingsStatus({ ...userCase, ...data })).toBe(expected);
    });
  });

  describe('getInternationalFactorsStatus', () => {
    beforeEach(() => {
      jest.clearAllMocks();

      const tempresponse = {
        citizenInternationalElements: {
          childrenLiveOutsideOfEnWl: undefined,
          childrenLiveOutsideOfEnWlDetails: undefined,
          parentsAnyOneLiveOutsideEnWl: undefined,
          parentsAnyOneLiveOutsideEnWlDetails: null,
          anotherPersonOrderOutsideEnWl: undefined,
          anotherPersonOrderOutsideEnWlDetails: null,
          anotherCountryAskedInformation: undefined,
          anotherCountryAskedInformationDetaails: null,
        },
      };

      partyDetails = [
        {
          id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          value: {
            firstName: 'TestUser',
            lastName: 'Citizen',
            email: 'abc@example.net',
            legalRepresentation: 'Yes',
            response: tempresponse,
            user: {
              idamId: '123456',
              email: 'test@example.net',
            },
          },
        },
      ];
    });

    test('getInternationalFactorsStatus TO_DO', async () => {
      userCase.respondents = partyDetails;
      expect(getInternationalFactorsStatus(userCase, '123456')).toBe(SectionStatus.TO_DO);
    });

    test('getInternationalFactorsStatus IN_PROGRESS', async () => {
      const inprogressresponse = {
        citizenInternationalElements: {
          childrenLiveOutsideOfEnWl: 'Yes',
          childrenLiveOutsideOfEnWlDetails: 'test1',
          parentsAnyOneLiveOutsideEnWl: 'Yes',
        },
      };
      partyDetails[0].value.response = inprogressresponse;
      userCase.respondents = partyDetails;
      expect(getInternationalFactorsStatus(userCase, '123456')).toBe(SectionStatus.IN_PROGRESS);
    });

    test('getInternationalFactorsStatus COMPLETED', async () => {
      const completedresponse = {
        citizenInternationalElements: {
          childrenLiveOutsideOfEnWl: 'Yes',
          childrenLiveOutsideOfEnWlDetails: 'test1',
          parentsAnyOneLiveOutsideEnWl: 'Yes',
          parentsAnyOneLiveOutsideEnWlDetails: 'test2',
          anotherPersonOrderOutsideEnWl: 'Yes',
          anotherPersonOrderOutsideEnWlDetails: 'test3',
          anotherCountryAskedInformation: 'Yes',
          anotherCountryAskedInformationDetaails: 'test4',
        },
      };
      partyDetails[0].value.response = completedresponse;
      userCase.respondents = partyDetails;
      expect(getInternationalFactorsStatus(userCase, '123456')).toBe(SectionStatus.COMPLETED);
    });

    test('getInternationalFactorsStatus COMPLETED with NO cases', async () => {
      const completedresponse = {
        citizenInternationalElements: {
          childrenLiveOutsideOfEnWl: YesOrNo.NO,
          parentsAnyOneLiveOutsideEnWl: YesOrNo.NO,
          anotherPersonOrderOutsideEnWl: YesOrNo.NO,
          anotherCountryAskedInformation: YesOrNo.NO,
        },
      };
      partyDetails[0].value.response = completedresponse;
      userCase.respondents = partyDetails;
      expect(getInternationalFactorsStatus(userCase, '123456')).toBe(SectionStatus.COMPLETED);
    });
  });

  describe('getKeepYourDetailsPrivateStatus', () => {
    beforeEach(() => {
      jest.clearAllMocks();

      const tempresponse = {
        legalRepresentation: 'No',
        keepDetailsPrivate: {
          otherPeopleKnowYourContactDetails: undefined,
          confidentiality: undefined,
          confidentialityList: null,
        },
      };

      partyDetails = [
        {
          id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          value: {
            firstName: 'TestUser',
            lastName: 'Citizen',
            email: 'abc@example.net',
            legalRepresentation: 'Yes',
            response: tempresponse,
            user: {
              idamId: '123456',
              email: 'test@example.net',
            },
          },
        },
      ];
    });

    test('getKeepYourDetailsPrivateStatus TO_DO', async () => {
      userCase.respondents = partyDetails;
      expect(getKeepYourDetailsPrivateStatus(userCase, '123456')).toBe(SectionStatus.TO_DO);
    });

    test('getKeepYourDetailsPrivateStatus IN_PROGRESS', async () => {
      const inprogressresponse = {
        legalRepresentation: 'No',
        keepDetailsPrivate: {
          otherPeopleKnowYourContactDetails: 'No',
        },
      };
      partyDetails[0].value.response = inprogressresponse;
      userCase.respondents = partyDetails;
      expect(getKeepYourDetailsPrivateStatus(userCase, '123456')).toBe(SectionStatus.IN_PROGRESS);
    });

    test('getKeepYourDetailsPrivateStatus COMPLETED', async () => {
      const completedresponse = {
        legalRepresentation: 'No',
        keepDetailsPrivate: {
          otherPeopleKnowYourContactDetails: 'No',
          confidentiality: 'Yes',
          confidentialityList: ['address', 'phoneNumber'],
        },
      };
      partyDetails[0].value.response = completedresponse;
      userCase.respondents = partyDetails;
      expect(getKeepYourDetailsPrivateStatus(userCase, '123456')).toBe(SectionStatus.COMPLETED);
    });
  });

  describe('getMiamStatus', () => {
    beforeEach(() => {
      jest.clearAllMocks();

      const tempresponse = {
        miam: {
          attendedMiam: undefined,
          willingToAttendMiam: null,
          reasonNotAttendingMiam: undefined,
        },
      };

      partyDetails = [
        {
          id: '0c09b130-2eba-4ca8-a910-1f001bac01e6',
          value: {
            firstName: 'TestUser',
            lastName: 'Citizen',
            email: 'abc@example.net',
            legalRepresentation: 'Yes',
            response: tempresponse,
            user: {
              idamId: '123456',
              email: 'test@example.net',
            },
          },
        },
      ];
    });

    test('getMiamStatus TO_DO', async () => {
      userCase.respondents = partyDetails;
      expect(getMiamStatus(userCase, '123456')).toBe(SectionStatus.TO_DO);
    });

    test('getMiamStatus IN_PROGRESS', async () => {
      const completedresponse = {
        miam: {
          attendedMiam: 'No',
          willingToAttendMiam: 'No',
          reasonNotAttendingMiam: '',
        },
      };
      partyDetails[0].value.response = completedresponse;
      userCase.respondents = partyDetails;
      expect(getMiamStatus(userCase, '123456')).toBe(SectionStatus.IN_PROGRESS);
    });

    test('getMiamStatus COMPLETED, did not attend', async () => {
      const completedresponse = {
        miam: {
          attendedMiam: 'No',
          willingToAttendMiam: 'No',
          reasonNotAttendingMiam: 'dummy_value',
        },
      };
      partyDetails[0].value.response = completedresponse;
      userCase.respondents = partyDetails;
      expect(getMiamStatus(userCase, '123456')).toBe(SectionStatus.COMPLETED);
    });

    test('getMiamStatus COMPLETED, attended', async () => {
      const completedresponse = {
        miam: {
          attendedMiam: 'Yes',
          willingToAttendMiam: undefined,
          reasonNotAttendingMiam: undefined,
        },
      };
      partyDetails[0].value.response = completedresponse;
      userCase.respondents = partyDetails;
      expect(getMiamStatus(userCase, '123456')).toBe(SectionStatus.COMPLETED);
    });

    test('getMiamStatus COMPLETED, yet to attend', async () => {
      const completedresponse = {
        miam: {
          attendedMiam: 'No',
          willingToAttendMiam: 'Yes',
          reasonNotAttendingMiam: undefined,
        },
      };
      partyDetails[0].value.response = completedresponse;
      userCase.respondents = partyDetails;
      expect(getMiamStatus(userCase, '123456')).toBe(SectionStatus.COMPLETED);
    });
  });

  describe('getYourSafetyStatus', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('getYourSafetyStatus TO_DO', async () => {
      userCase.respondents = partyDetails;
      userCase.safetyConcerns = undefined;
      expect(getYourSafetyStatus(userCase)).toBe(SectionStatus.TO_DO);
    });

    test('getYourSafetyStatus COMPLETED', async () => {
      userCase.respondents = partyDetails;
      userCase.safetyConcerns = 'sometestvalue';
      expect(getYourSafetyStatus(userCase)).toBe(SectionStatus.COMPLETED);
    });
  });
});
