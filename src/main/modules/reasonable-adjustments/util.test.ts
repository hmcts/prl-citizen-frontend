import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { CaseType, YesOrNo } from '../../app/case/definition';
import { languages as intermediaryRequirementsLanguages } from '../../steps/common/reasonable-adjustments/intermediary/content';
import { languages as specialArrangementsLanguages } from '../../steps/common/reasonable-adjustments/special-arrangements/content';
import { languages as supportDuringCaseLanguages } from '../../steps/common/reasonable-adjustments/support-during-your-case/content';

import { RAUtility } from './util';
import {
  languages as languageRequirementsLanguages
} from "../../steps/common/reasonable-adjustments/language-requirements/content";

describe('RA util', () => {
  describe('cleanSessionForLocalComponent', () => {
    test('should clean session for document support', () => {
      const req = mockRequest({
        body: {
          ra_assistanceRequirements: YesOrNo.NO,
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
          ra_assistanceRequirements: YesOrNo.NO,
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
          ra_assistanceRequirements: YesOrNo.NO,
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
          ra_assistanceRequirements: YesOrNo.NO,
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
          ra_assistanceRequirements: YesOrNo.NO,
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

    test('should clean session for intermediary support when no is selected', () => {
      const req = mockRequest({
        body: {
          ra_intermediaryRequirements: YesOrNo.NO,
        },
        session: {
          userCase: {
            ra_intermediaryRequired_subfield: 'test',
          },
        },
      });

      const cleanedUserCase = RAUtility.cleanSessionForLocalComponent(req);

      expect(cleanedUserCase.ra_intermediaryRequired_subfield).toBe(undefined);
    });

    test('should clean session for disability subfield when no is selected', () => {
      const req = mockRequest({
        body: {
          ra_assistanceRequirements: YesOrNo.NO,
        },
        session: {
          userCase: {
            ra_assistanceRequirements_subfield: 'test',
          },
        },
      });

      const cleanedUserCase = RAUtility.cleanSessionForLocalComponent(req);

      expect(cleanedUserCase.ra_assistanceRequirements_subfield).toBe(undefined);
    });

    test('should not clean disability subfield when yes', () => {
      const req = mockRequest({
        body: {
          ra_assistanceRequirements: YesOrNo.YES,
        },
        session: {
          userCase: {
            ra_assistanceRequirements: YesOrNo.YES,
            ra_assistanceRequirements_subfield: 'Needs wheelchair access',
          },
        },
      });

      const result = RAUtility.cleanSessionForLocalComponent(req);

      expect(result.ra_assistanceRequirements_subfield).toBe('Needs wheelchair access');
    });

    test('should clear subfield after changing yes to no', () => {
      const req = mockRequest({
        body: {
          ra_assistanceRequirements: YesOrNo.NO,
        },
        session: {
          userCase: {
            ra_assistanceRequirements: YesOrNo.YES,
            ra_assistanceRequirements_subfield: 'Some details',
          },
        },
      });

      const cleanedUserCase = RAUtility.cleanSessionForLocalComponent(req);
      expect(cleanedUserCase.ra_assistanceRequirements_subfield).toBe(undefined);
    });

    test('should clean session for all support requirements when no support is selected', () => {
      const req = mockRequest({
        body: {
          ra_assistanceRequirements: YesOrNo.NO,
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

  describe('prepareCaseNoteText', () => {
    test('should return case note text', () => {
      const req = mockRequest({
        session: {
          userCase: {
            ra_typeOfHearing: ['videohearings', 'phonehearings', 'languageinterpreter'],
            ra_needInterpreterInCertainLanguage_subfield: 'Polish',
            ra_languageNeeds: ['speakwelsh', 'readandwritewelsh'],
            ra_specialArrangements: ['waitingroom', 'separateexitentry'],
            ra_intermediaryRequirements: YesOrNo.YES,
            ra_intermediaryRequired_subfield: 'test',
            ra_assistanceRequirements: YesOrNo.YES,
            ra_assistanceRequirements_subfield: 'test',
          },
        },
      });

      const languageRequirementsEn = languageRequirementsLanguages.en();
      const specialArrangementsEn = specialArrangementsLanguages.en();
      const intermediaryRequirementsEn = intermediaryRequirementsLanguages.en();
      const supportDuringCaseEn = supportDuringCaseLanguages.en();

      const expected =
        `${languageRequirementsEn.needInterpreterInCertainLanguage}` +
        '\nPolish\n\n' +
        `${specialArrangementsEn.headingTitle}` +
        '\n' +
        `${specialArrangementsEn.separateWaitingRoom}` +
        '\n' +
        `${specialArrangementsEn.separateExitEntrance}` +
        '\n\n' +
        `${intermediaryRequirementsEn.headingTitle}` +
        '\n' +
        `${YesOrNo.YES}` +
        '\ntest\n\n' +
        `${supportDuringCaseEn.headingTitle}` +
        '\n' +
        `${YesOrNo.YES}` +
        '\ntest\n\n';

      expect(RAUtility.prepareCaseNoteText(req.session.userCase)).toBe(expected);
    });

    test('should return case note text without new RA subfields', () => {
      const req = mockRequest({
        session: {
          userCase: {
            ra_typeOfHearing: ['nohearings'],
            ra_noVideoAndPhoneHearing_subfield: 'test',
            ra_languageNeeds: ['noLanguageRequirements'],
            ra_specialArrangements: ['waitingroom'],
            ra_intermediaryRequirements: YesOrNo.NO,
            ra_assistanceRequirements: YesOrNo.NO,
          },
        },
      });

      const specialArrangementsEn = specialArrangementsLanguages.en();
      const intermediaryRequirementsEn = intermediaryRequirementsLanguages.en();
      const supportDuringCaseEn = supportDuringCaseLanguages.en();

      const expected =
        `${specialArrangementsEn.headingTitle}` +
        '\n' +
        `${specialArrangementsEn.separateWaitingRoom}` +
        '\n\n' +
        `${intermediaryRequirementsEn.headingTitle}` +
        '\n' +
        `${YesOrNo.NO}` +
        '\n\n' +
        `${supportDuringCaseEn.headingTitle}` +
        '\n' +
        `${YesOrNo.NO}` +
        '\n\n';

      expect(RAUtility.prepareCaseNoteText(req.session.userCase)).toBe(expected);
    });

    test('should handle empty case note sections', () => {
      const req = mockRequest({
        session: {
          userCase: {},
        },
      });

      expect(RAUtility.prepareCaseNoteText(req.session.userCase)).toBe('');
    });
  });
});
