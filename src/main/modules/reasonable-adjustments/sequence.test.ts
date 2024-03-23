import { mockRequest } from '../../../test/unit/utils/mockRequest';

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
        ra_disabilityRequirements: ['*'],
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
  });

  test('should contain 1 entries in respondent 1 screen sequence', () => {
    const raSequence = RASequence.getSequence();
    expect(raSequence).toHaveLength(12);

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
    ).toBe('/respondent/reasonable-adjustments/support-during-your-case');
    expect(
      raSequence[2].getNextStep(req.session.userCase, {
        ...req,
        originalUrl: '/c100-rebuild/reasonable-adjustments/special-arrangements',
      })
    ).toBe('/c100-rebuild/reasonable-adjustments/support-during-your-case');

    expect(raSequence[3].url).toBe('/:root/reasonable-adjustments/support-during-your-case');
    expect(raSequence[3].showInSection).toBe('cuira');
    expect(
      raSequence[3].getNextStep(req.session.userCase, {
        ...req,
        originalUrl: '/:root/reasonable-adjustments/support-during-your-case',
      })
    ).toBe('/respondent/reasonable-adjustments/support-during-your-case');
    expect(
      raSequence[3].getNextStep(req.session.userCase, {
        ...req,
        originalUrl: '/c100-rebuild/reasonable-adjustments/support-during-your-case',
      })
    ).toBe('/c100-rebuild/reasonable-adjustments/support-during-your-case');

    expect(raSequence[4].url).toBe('/:root/reasonable-adjustments/documents-support');
    expect(raSequence[4].showInSection).toBe('cuira');
    expect(
      raSequence[4].getNextStep(req.session.userCase, {
        ...req,
        originalUrl: '/:root/reasonable-adjustments/documents-support',
      })
    ).toBe('/respondent/reasonable-adjustments/documents-support');

    expect(raSequence[5].url).toBe('/:root/reasonable-adjustments/communication-help');
    expect(raSequence[5].showInSection).toBe('cuira');
    expect(
      raSequence[5].getNextStep(req.session.userCase, {
        ...req,
        originalUrl: '/:root/reasonable-adjustments/communication-help',
      })
    ).toBe('/respondent/reasonable-adjustments/communication-help');

    expect(raSequence[6].url).toBe('/:root/reasonable-adjustments/support-for-court-hearing');
    expect(raSequence[6].showInSection).toBe('cuira');
    expect(
      raSequence[6].getNextStep(req.session.userCase, {
        ...req,
        originalUrl: '/:root/reasonable-adjustments/support-for-court-hearing',
      })
    ).toBe('/respondent/reasonable-adjustments/support-for-court-hearing');

    expect(raSequence[7].url).toBe('/:root/reasonable-adjustments/needs-during-court-hearing');
    expect(raSequence[7].showInSection).toBe('cuira');
    expect(
      raSequence[7].getNextStep(req.session.userCase, {
        ...req,
        originalUrl: '/:root/reasonable-adjustments/needs-during-court-hearing',
      })
    ).toBe('/respondent/reasonable-adjustments/needs-during-court-hearing');

    expect(raSequence[8].url).toBe('/:root/reasonable-adjustments/needs-in-court');
    expect(raSequence[8].showInSection).toBe('cuira');
    expect(
      raSequence[8].getNextStep(req.session.userCase, {
        ...req,
        originalUrl: '/:root/reasonable-adjustments/needs-in-court',
      })
    ).toBe('/respondent/reasonable-adjustments/needs-in-court');

    expect(raSequence[9].url).toBe('/:root/reasonable-adjustments/review');
    expect(raSequence[9].showInSection).toBe('cuira');
    expect(
      raSequence[9].getNextStep(req.session.userCase, {
        ...req,
        originalUrl: '/:root/reasonable-adjustments/review',
      })
    ).toBe('/tasklistresponse/start');

    expect(raSequence[10].url).toBe('/:partyType/reasonable-adjustments/guidance');
    expect(raSequence[10].showInSection).toBe('cuira');
    expect(
      raSequence[10].getNextStep(req.session.userCase, {
        ...req,
        originalUrl: '/:partyType/reasonable-adjustments/guidance',
      })
    ).toBe('/');

    expect(raSequence[11].url).toBe('/:partyType/reasonable-adjustments/confirmation');
    expect(raSequence[11].showInSection).toBe('cuira');
    expect(
      raSequence[11].getNextStep(req.session.userCase, {
        ...req,
        originalUrl: '/:partyType/reasonable-adjustments/confirmation',
      })
    ).toBe('/');
  });
});
