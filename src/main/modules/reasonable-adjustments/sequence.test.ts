import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { YesOrNo } from '../../app/case/definition';

import { RASequence } from './sequence';

describe('RA > sequence', () => {
  const req = mockRequest({
    session: {
      userCase: {
        ra_typeOfHearing: ['ra_typeOfHearing'],
        ra_noVideoAndPhoneHearing_subfield: ['ra_noVideoAndPhoneHearing_subfield'],
        safetyArrangements: ['safetyArrangements'],
        ra_specialArrangementsOther_subfield: ['ra_specialArrangementsOther_subfield'],
        ra_languageNeeds: ['ra_languageNeeds'],
        ra_needInterpreterInCertainLanguage_subfield: ['ra_needInterpreterInCertainLanguage_subfield'],
        ra_disabilityRequirements: YesOrNo.NO,
        ra_documentInformation: ['ra_documentInformation'],
        ra_specifiedColorDocuments_subfield: ['ra_specifiedColorDocuments_subfield'],
        ra_largePrintDocuments_subfield: ['ra_largePrintDocuments_subfield'],
        ra_documentHelpOther_subfield: ['ra_documentHelpOther_subfield'],
        ra_communicationHelp: ['ra_communicationHelp'],
        ra_signLanguageInterpreter_subfield: ['ra_signLanguageInterpreter_subfield'],
        ra_communicationHelpOther_subfield: ['ra_communicationHelpOther_subfield'],
        ra_supportCourt: ['ra_supportCourt'],
        ra_supportWorkerCarer_subfield: ['ra_supportWorkerCarer_subfield'],
        ra_friendFamilyMember_subfield: ['ra_friendFamilyMember_subfield'],
        ra_therapyAnimal_subfield: ['ra_therapyAnimal_subfield'],
        ra_supportCourtOther_subfield: ['ra_supportCourtOther_subfield'],
        ra_feelComportable: ['ra_feelComportable'],
        ra_appropriateLighting_subfield: ['ra_appropriateLighting_subfield'],
        ra_feelComportableOther_subfield: ['ra_feelComportableOther_subfield'],
        ra_travellingCourt: ['ra_travellingCourt'],
        ra_parkingSpace_subfield: ['ra_parkingSpace_subfield'],
        ra_differentTypeChair_subfield: ['ra_differentTypeChair_subfield'],
        ra_travellingCourtOther_subfield: ['ra_travellingCourtOther_subfield'],
      },
    },
    params: {
      partyType: 'applicant',
    },
  });

  test('should contain 1 entries in respondent 1 screen sequence', () => {
    const raSequence = RASequence.getSequence();
    expect(raSequence).toHaveLength(11);

    expect(raSequence[0].url).toBe('/:root/reasonable-adjustments/attending-court');
    expect(raSequence[0].showInSection).toBe('cuira');
    expect(
      raSequence[0].getNextStep(req.session.userCase, {
        ...req,
        originalUrl: '/:root/reasonable-adjustments/attending-court',
      })
    ).toBe('/respondent/reasonable-adjustments/language-requirements');
    expect(
      raSequence[0].getNextStep(req.session.userCase, {
        ...req,
        originalUrl: '/c100-rebuild/reasonable-adjustments/attending-court',
      })
    ).toBe('/c100-rebuild/reasonable-adjustments/language-requirements');

    expect(raSequence[1].url).toBe('/:root/reasonable-adjustments/language-requirements');
    expect(raSequence[1].showInSection).toBe('cuira');
    expect(
      raSequence[1].getNextStep(req.session.userCase, {
        ...req,
        originalUrl: '/:root/reasonable-adjustments/language-requirements',
      })
    ).toBe('/respondent/reasonable-adjustments/special-arrangements');
    expect(
      raSequence[1].getNextStep(req.session.userCase, {
        ...req,
        originalUrl: '/c100-rebuild/reasonable-adjustments/language-requirements',
      })
    ).toBe('/c100-rebuild/reasonable-adjustments/special-arrangements');

    expect(raSequence[2].url).toBe('/:root/reasonable-adjustments/special-arrangements');
    expect(raSequence[2].showInSection).toBe('cuira');
    expect(
      raSequence[2].getNextStep(req.session.userCase, {
        ...req,
        originalUrl: '/:root/reasonable-adjustments/special-arrangements',
      })
    ).toBe('/respondent/reasonable-adjustments/intermediary');
    expect(
      raSequence[2].getNextStep(req.session.userCase, {
        ...req,
        originalUrl: '/c100-rebuild/reasonable-adjustments/special-arrangements',
      })
    ).toBe('/c100-rebuild/reasonable-adjustments/intermediary');

    expect(raSequence[3].url).toBe('/:root/reasonable-adjustments/intermediary');
    expect(raSequence[3].showInSection).toBe('cuira');
    expect(
      raSequence[3].getNextStep(req.session.userCase, {
        ...req,
        originalUrl: '/:root/reasonable-adjustments/intermediary',
      })
    ).toBe('/respondent/reasonable-adjustments/support-during-your-case');
    expect(
      raSequence[3].getNextStep(req.session.userCase, {
        ...req,
        originalUrl: '/c100-rebuild/reasonable-adjustments/intermediary',
      })
    ).toBe('/c100-rebuild/reasonable-adjustments/support-during-your-case');

    expect(raSequence[4].url).toBe('/:root/reasonable-adjustments/support-during-your-case');
    expect(raSequence[4].showInSection).toBe('cuira');
    expect(
      raSequence[4].getNextStep(req.session.userCase, {
        ...req,
        originalUrl: '/:root/reasonable-adjustments/support-during-your-case',
      })
    ).toBe('/:root/reasonable-adjustments/support-during-your-case');
    expect(
      raSequence[4].getNextStep(req.session.userCase, {
        ...req,
        originalUrl: '/c100-rebuild/reasonable-adjustments/support-during-your-case',
      })
    ).toBe('/c100-rebuild/help-with-fees/need-help-with-fees');

    expect(raSequence[5].url).toBe('/:root/reasonable-adjustments/review');
    expect(raSequence[5].showInSection).toBe('cuira');
    expect(
      raSequence[5].getNextStep(req.session.userCase, {
        ...req,
        originalUrl: '/:root/reasonable-adjustments/review',
      })
    ).toBe('/tasklistresponse/start');

    expect(raSequence[6].url).toBe('/:partyType/reasonable-adjustments/intro');
    expect(raSequence[6].showInSection).toBe('cuira');
    expect(
      raSequence[6].getNextStep(req.session.userCase, {
        ...req,
        originalUrl: '/:partyType/reasonable-adjustments/intro',
      })
    ).toBe('/applicant/reasonable-adjustments/language-requirements-and-special-arrangements');

    expect(raSequence[7].url).toBe('/:partyType/reasonable-adjustments/language-requirements-and-special-arrangements');
    expect(raSequence[7].showInSection).toBe('cuira');
    expect(
      raSequence[7].getNextStep(
        {
          ra_languageReqAndSpecialArrangements: 'ra_languageReqAndSpecialArrangements',
        },
        {
          ...req,
          originalUrl: '/:partyType/reasonable-adjustments/language-requirements-and-special-arrangements',
        }
      )
    ).toBe('/applicant/reasonable-adjustments/language-requirements-and-special-arrangements/review');
    expect(
      raSequence[7].getNextStep(req.session.userCase, {
        ...req,
        originalUrl: '/:partyType/reasonable-adjustments/language-requirements-and-special-arrangements',
      })
    ).toBe('/reasonable-adjustments/launch');

    expect(raSequence[8].url).toBe(
      '/:partyType/reasonable-adjustments/language-requirements-and-special-arrangements/review'
    );
    expect(raSequence[8].showInSection).toBe('cuira');
    expect(
      raSequence[8].getNextStep(req.session.userCase, {
        ...req,
        originalUrl: '/:partyType/reasonable-adjustments/language-requirements-and-special-arrangements/review',
      })
    ).toBe('/reasonable-adjustments/launch');

    expect(raSequence[9].url).toBe('/:partyType/reasonable-adjustments/confirmation');
    expect(raSequence[9].showInSection).toBe('cuira');
    expect(
      raSequence[9].getNextStep(
        { id: '1234' },
        {
          ...req,
          originalUrl: '/:partyType/reasonable-adjustments/confirmation',
        }
      )
    ).toBe('/case/1234');

    expect(raSequence[10].url).toBe('/reasonable-adjustments/error');
    expect(raSequence[10].showInSection).toBe('cuira');
    expect(
      raSequence[10].getNextStep(
        { id: '1234' },
        {
          ...req,
          originalUrl: '/:partyType/reasonable-adjustments/error',
        }
      )
    ).toBe('/case/1234');
  });
});
