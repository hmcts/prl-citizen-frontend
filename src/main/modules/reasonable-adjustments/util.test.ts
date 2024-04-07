import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { CaseType } from '../../app/case/definition';

import { RAUtility } from './util';

describe('RA util', () => {
  describe('cleanSessionForLocalComponent', () => {
    test('should clean session for document support', () => {
      const req = mockRequest({
        body: {
          ra_disabilityRequirements: ['MOCK_SUPPORT_REQUIREMENT'],
        },
        session: {
          userCase: {
            ra_documentInformation: ['specifiedColorDocuments', 'largePrintDocuments', 'other'],
            ra_specifiedColorDocuments_subfield: 'test',
            ra_largePrintDocuments_subfield: 'test',
            ra_documentHelpOther_subfield: 'test',
          },
        },
      });

      const cleanedUserCase = RAUtility.cleanSessionForLocalComponent(req);

      expect(cleanedUserCase.ra_documentInformation).toStrictEqual([]);
      expect(cleanedUserCase.ra_specifiedColorDocuments_subfield).toBe(undefined);
      expect(cleanedUserCase.ra_largePrintDocuments_subfield).toBe(undefined);
      expect(cleanedUserCase.ra_documentHelpOther_subfield).toBe(undefined);
    });

    test('should clean session for communication help', () => {
      const req = mockRequest({
        body: {
          ra_disabilityRequirements: ['MOCK_SUPPORT_REQUIREMENT'],
        },
        session: {
          userCase: {
            ra_communicationHelp: ['signLanguageInterpreter', 'other'],
            ra_signLanguageInterpreter_subfield: 'test',
            ra_communicationHelpOther_subfield: 'test',
          },
        },
      });

      const cleanedUserCase = RAUtility.cleanSessionForLocalComponent(req);

      expect(cleanedUserCase.ra_communicationHelp).toStrictEqual([]);
      expect(cleanedUserCase.ra_signLanguageInterpreter_subfield).toBe(undefined);
      expect(cleanedUserCase.ra_communicationHelpOther_subfield).toBe(undefined);
    });

    test('should clean session for support for court hearing', () => {
      const req = mockRequest({
        body: {
          ra_disabilityRequirements: ['MOCK_SUPPORT_REQUIREMENT'],
        },
        session: {
          userCase: {
            ra_supportCourt: ['supportWorkerCarer', 'friendFamilyMember', 'therapyAnimal', 'other'],
            ra_supportWorkerCarer_subfield: 'test',
            ra_friendFamilyMember_subfield: 'test',
            ra_therapyAnimal_subfield: 'test',
            ra_supportCourtOther_subfield: 'test',
          },
        },
      });

      const cleanedUserCase = RAUtility.cleanSessionForLocalComponent(req);

      expect(cleanedUserCase.ra_supportCourt).toStrictEqual([]);
      expect(cleanedUserCase.ra_supportWorkerCarer_subfield).toBe(undefined);
      expect(cleanedUserCase.ra_friendFamilyMember_subfield).toBe(undefined);
      expect(cleanedUserCase.ra_therapyAnimal_subfield).toBe(undefined);
      expect(cleanedUserCase.ra_supportCourtOther_subfield).toBe(undefined);
    });

    test('should clean session for needs during court hearing', () => {
      const req = mockRequest({
        body: {
          ra_disabilityRequirements: ['MOCK_SUPPORT_REQUIREMENT'],
        },
        session: {
          userCase: {
            ra_feelComportable: ['appropriateLighting', 'other'],
            ra_appropriateLighting_subfield: 'test',
            ra_feelComportableOther_subfield: 'test',
          },
        },
      });

      const cleanedUserCase = RAUtility.cleanSessionForLocalComponent(req);

      expect(cleanedUserCase.ra_feelComportable).toStrictEqual([]);
      expect(cleanedUserCase.ra_appropriateLighting_subfield).toBe(undefined);
      expect(cleanedUserCase.ra_feelComportableOther_subfield).toBe(undefined);
    });

    test('should clean session for needs in court', () => {
      const req = mockRequest({
        body: {
          ra_disabilityRequirements: ['MOCK_SUPPORT_REQUIREMENT'],
        },
        session: {
          userCase: {
            ra_travellingCourt: ['parkingSpace', 'differentTypeChair', 'other'],
            ra_parkingSpace_subfield: 'test',
            ra_differentTypeChair_subfield: 'test',
            ra_travellingCourtOther_subfield: 'test',
          },
        },
      });

      const cleanedUserCase = RAUtility.cleanSessionForLocalComponent(req);

      expect(cleanedUserCase.ra_travellingCourt).toStrictEqual([]);
      expect(cleanedUserCase.ra_parkingSpace_subfield).toBe(undefined);
      expect(cleanedUserCase.ra_differentTypeChair_subfield).toBe(undefined);
      expect(cleanedUserCase.ra_travellingCourtOther_subfield).toBe(undefined);
    });

    test('should clean session for all support requirements when no support is selected', () => {
      const req = mockRequest({
        body: {
          ra_disabilityRequirements: ['noSupportRequired'],
        },
        session: {
          userCase: {
            ra_documentInformation: ['specifiedColorDocuments', 'largePrintDocuments', 'other'],
            ra_specifiedColorDocuments_subfield: 'test',
            ra_largePrintDocuments_subfield: 'test',
            ra_documentHelpOther_subfield: 'test',
            ra_communicationHelp: ['signLanguageInterpreter', 'other'],
            ra_signLanguageInterpreter_subfield: 'test',
            ra_communicationHelpOther_subfield: 'test',
            ra_supportCourt: ['supportWorkerCarer', 'friendFamilyMember', 'therapyAnimal', 'other'],
            ra_supportWorkerCarer_subfield: 'test',
            ra_friendFamilyMember_subfield: 'test',
            ra_therapyAnimal_subfield: 'test',
            ra_supportCourtOther_subfield: 'test',
            ra_feelComportable: ['appropriateLighting', 'other'],
            ra_appropriateLighting_subfield: 'test',
            ra_feelComportableOther_subfield: 'test',
            ra_travellingCourt: ['parkingSpace', 'differentTypeChair', 'other'],
            ra_parkingSpace_subfield: 'test',
            ra_differentTypeChair_subfield: 'test',
            ra_travellingCourtOther_subfield: 'test',
          },
        },
      });

      const cleanedUserCase = RAUtility.cleanSessionForLocalComponent(req);

      expect(cleanedUserCase.ra_documentInformation).toStrictEqual([]);
      expect(cleanedUserCase.ra_specifiedColorDocuments_subfield).toBe(undefined);
      expect(cleanedUserCase.ra_largePrintDocuments_subfield).toBe(undefined);
      expect(cleanedUserCase.ra_documentHelpOther_subfield).toBe(undefined);

      expect(cleanedUserCase.ra_communicationHelp).toStrictEqual([]);
      expect(cleanedUserCase.ra_signLanguageInterpreter_subfield).toBe(undefined);
      expect(cleanedUserCase.ra_communicationHelpOther_subfield).toBe(undefined);

      expect(cleanedUserCase.ra_supportCourt).toStrictEqual([]);
      expect(cleanedUserCase.ra_supportWorkerCarer_subfield).toBe(undefined);
      expect(cleanedUserCase.ra_friendFamilyMember_subfield).toBe(undefined);
      expect(cleanedUserCase.ra_therapyAnimal_subfield).toBe(undefined);
      expect(cleanedUserCase.ra_supportCourtOther_subfield).toBe(undefined);

      expect(cleanedUserCase.ra_feelComportable).toStrictEqual([]);
      expect(cleanedUserCase.ra_appropriateLighting_subfield).toBe(undefined);
      expect(cleanedUserCase.ra_feelComportableOther_subfield).toBe(undefined);
      expect(cleanedUserCase.ra_travellingCourt).toStrictEqual([]);

      expect(cleanedUserCase.ra_parkingSpace_subfield).toBe(undefined);
      expect(cleanedUserCase.ra_differentTypeChair_subfield).toBe(undefined);
      expect(cleanedUserCase.ra_travellingCourtOther_subfield).toBe(undefined);
    });
  });

  describe('getNavigationUrl', () => {
    test('should return correct url when navfromRespondToApplication present', () => {
      expect(
        RAUtility.getNavigationUrl(
          mockRequest({
            session: {
              applicationSettings: {
                navfromRespondToApplication: true,
              },
            },
          })
        )
      ).toBe('/tasklistresponse/start');
    });

    test('should return correct url when navfromRespondToApplication not present', () => {
      expect(
        RAUtility.getNavigationUrl(
          mockRequest({
            session: {
              userCase: {
                caseTypeOfApplication: 'FL401',
              },
            },
          })
        )
      ).toBe('/task-list/applicant');
    });
  });

  describe('getUpdateFlagsEventID', () => {
    test('should return correct event for c100 manage support', () => {
      expect(RAUtility.getUpdateFlagsEventID('C100' as CaseType, 'manage')).toBe('c100ManageSupport');
    });

    test('should return correct event for c100 request support', () => {
      expect(RAUtility.getUpdateFlagsEventID('C100' as CaseType, 'request')).toBe('c100RequestSupport');
    });

    test('should return correct event for fl401 manage support', () => {
      expect(RAUtility.getUpdateFlagsEventID('FL401' as CaseType, 'manage')).toBe('fl401ManageSupport');
    });

    test('should return correct event for fl401 request support', () => {
      expect(RAUtility.getUpdateFlagsEventID('FL401' as CaseType, 'request')).toBe('fl401RequestSupport');
    });
  });
});
