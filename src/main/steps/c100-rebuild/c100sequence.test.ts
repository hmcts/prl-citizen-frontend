import { YesOrNo } from '../../app/case/definition';

import PageStepConfigurator from './PageStepConfigurator';
import { C100Sequence } from './c100sequence';

describe('C100Sequence', () => {
  test('should contain 1 entries in c100 screen sequence', () => {
    expect(C100Sequence).toHaveLength(21);
    expect(C100Sequence[0].url).toBe('/c100-rebuild/confidentiality/details-know');
    expect(C100Sequence[0].showInSection).toBe('c100');
    expect(C100Sequence[0].getNextStep({ detailsKnown: YesOrNo.YES })).toBe(
      '/c100-rebuild/confidentiality/start-alternative'
    );
    expect(C100Sequence[0].getNextStep({ detailsKnown: YesOrNo.NO })).toBe('/c100-rebuild/confidentiality/start');

    expect(C100Sequence[1].url).toBe('/c100-rebuild/confidentiality/feedback');
    expect(C100Sequence[1].showInSection).toBe('c100');
    expect(C100Sequence[1].getNextStep({})).toBe('/c100-rebuild/international-elements/start');

    expect(C100Sequence[2].url).toBe('/c100-rebuild/confidentiality/feedbackno');
    expect(C100Sequence[2].showInSection).toBe('c100');
    expect(C100Sequence[2].getNextStep({})).toBe('/c100-rebuild/international-elements/start');

    expect(C100Sequence[3].url).toBe('/c100-rebuild/confidentiality/start');
    expect(C100Sequence[3].showInSection).toBe('c100');
    expect(C100Sequence[3].getNextStep({ start: YesOrNo.YES })).toBe('/c100-rebuild/confidentiality/feedback');
    expect(C100Sequence[3].getNextStep({ start: YesOrNo.NO })).toBe('/c100-rebuild/confidentiality/feedbackno');

    expect(C100Sequence[4].url).toBe('/c100-rebuild/confidentiality/start-alternative');
    expect(C100Sequence[4].showInSection).toBe('c100');
    expect(C100Sequence[4].getNextStep({ startAlternative: YesOrNo.YES })).toBe(
      '/c100-rebuild/confidentiality/feedback'
    );

    expect(C100Sequence[4].url).toBe('/c100-rebuild/confidentiality/start-alternative');
    expect(C100Sequence[4].showInSection).toBe('c100');
    expect(C100Sequence[4].getNextStep({})).toBe('/c100-rebuild/confidentiality/feedbackno');

    expect(C100Sequence[5].url).toBe('/c100-rebuild/international-elements/start');
    expect(C100Sequence[5].showInSection).toBe('c100');
    expect(C100Sequence[5].getNextStep({})).toBe('/c100-rebuild/international-elements/parents');

    expect(C100Sequence[6].url).toBe('/c100-rebuild/international-elements/parents');
    expect(C100Sequence[6].showInSection).toBe('c100');
    expect(C100Sequence[6].getNextStep({})).toBe('/c100-rebuild/international-elements/jurisdiction');

    expect(C100Sequence[7].url).toBe('/c100-rebuild/international-elements/jurisdiction');
    expect(C100Sequence[7].showInSection).toBe('c100');
    expect(C100Sequence[7].getNextStep({})).toBe('/c100-rebuild/international-elements/request');

    expect(C100Sequence[8].url).toBe('/c100-rebuild/international-elements/request');
    expect(C100Sequence[8].showInSection).toBe('c100');
    expect(C100Sequence[8].getNextStep({})).toBe('/c100-rebuild/reasonable-adjustments/attending-court');

    expect(C100Sequence[9].url).toBe('/c100-rebuild/reasonable-adjustments/attending-court');
    expect(C100Sequence[9].showInSection).toBe('c100');
    expect(C100Sequence[9].getNextStep({})).toBe('/c100-rebuild/reasonable-adjustments/language-requirements');

    expect(C100Sequence[10].url).toBe('/c100-rebuild/reasonable-adjustments/language-requirements');
    expect(C100Sequence[10].showInSection).toBe('c100');
    expect(C100Sequence[10].getNextStep({})).toBe('/c100-rebuild/reasonable-adjustments/special-arrangements');

    expect(C100Sequence[11].url).toBe('/c100-rebuild/reasonable-adjustments/special-arrangements');
    expect(C100Sequence[11].showInSection).toBe('c100');
    expect(C100Sequence[11].getNextStep({})).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements');

    expect(C100Sequence[12].url).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements');
    expect(C100Sequence[12].showInSection).toBe('c100');
    expect(
      C100Sequence[12].getNextStep({
        disabilityRequirements: [
          'documentsHelp',
          'communicationHelp',
          'extraSupport',
          'feelComfortableSupport',
          'helpTravellingMovingBuildingSupport',
        ],
      })
    ).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements/document-information');

    expect(C100Sequence[13].url).toBe(
      '/c100-rebuild/reasonable-adjustments/disability-requirements/document-information'
    );
    expect(C100Sequence[13].showInSection).toBe('c100');
    expect(
      C100Sequence[13].getNextStep({
        disabilityRequirements: [
          'documentsHelp',
          'communicationHelp',
          'extraSupport',
          'feelComfortableSupport',
          'helpTravellingMovingBuildingSupport',
        ],
      })
    ).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements/communication-help');

    expect(C100Sequence[14].url).toBe(
      '/c100-rebuild/reasonable-adjustments/disability-requirements/communication-help'
    );
    expect(C100Sequence[14].showInSection).toBe('c100');
    expect(
      C100Sequence[14].getNextStep({
        disabilityRequirements: [
          'documentsHelp',
          'communicationHelp',
          'extraSupport',
          'feelComfortableSupport',
          'helpTravellingMovingBuildingSupport',
        ],
      })
    ).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements/support-court');

    expect(C100Sequence[15].url).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements/support-court');
    expect(C100Sequence[15].showInSection).toBe('c100');
    expect(
      C100Sequence[15].getNextStep({
        disabilityRequirements: [
          'documentsHelp',
          'communicationHelp',
          'extraSupport',
          'feelComfortableSupport',
          'helpTravellingMovingBuildingSupport',
        ],
      })
    ).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements/feel-comfortable');

    expect(C100Sequence[16].url).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements/feel-comfortable');
    expect(C100Sequence[16].showInSection).toBe('c100');
    expect(
      C100Sequence[16].getNextStep({
        disabilityRequirements: [
          'documentsHelp',
          'communicationHelp',
          'extraSupport',
          'feelComfortableSupport',
          'helpTravellingMovingBuildingSupport',
        ],
      })
    ).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements/travelling-court');

    expect(C100Sequence[17].url).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements/travelling-court');
    expect(C100Sequence[17].showInSection).toBe('c100');
    expect(
      C100Sequence[17].getNextStep({
        disabilityRequirements: [
          'documentsHelp',
          'communicationHelp',
          'extraSupport',
          'feelComfortableSupport',
          'helpTravellingMovingBuildingSupport',
        ],
      })
    ).toBe('/c100-rebuild/confidentiality/details-know');

    PageStepConfigurator.clearSteps('/c100-rebuild/reasonable-adjustments/disability-requirements');
    expect(C100Sequence[12].url).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements');
    expect(C100Sequence[12].showInSection).toBe('c100');
    expect(C100Sequence[12].getNextStep({ disabilityRequirements: ['dummyPage'] })).toBe(
      '/c100-rebuild/confidentiality/details-know'
    );

    PageStepConfigurator.clearSteps('/c100-rebuild/reasonable-adjustments/disability-requirements');
    expect(C100Sequence[13].url).toBe(
      '/c100-rebuild/reasonable-adjustments/disability-requirements/document-information'
    );
    expect(C100Sequence[13].showInSection).toBe('c100');
    expect(C100Sequence[13].getNextStep({ disabilityRequirements: ['documentsHelp'] })).toBe(
      '/c100-rebuild/confidentiality/details-know'
    );

    PageStepConfigurator.clearSteps('/c100-rebuild/reasonable-adjustments/disability-requirements');
    expect(C100Sequence[14].url).toBe(
      '/c100-rebuild/reasonable-adjustments/disability-requirements/communication-help'
    );
    expect(C100Sequence[14].showInSection).toBe('c100');
    expect(C100Sequence[14].getNextStep({ disabilityRequirements: ['communicationHelp'] })).toBe(
      '/c100-rebuild/confidentiality/details-know'
    );

    PageStepConfigurator.clearSteps('/c100-rebuild/reasonable-adjustments/disability-requirements');
    expect(C100Sequence[15].url).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements/support-court');
    expect(C100Sequence[15].showInSection).toBe('c100');
    expect(C100Sequence[15].getNextStep({ disabilityRequirements: ['extraSupport'] })).toBe(
      '/c100-rebuild/confidentiality/details-know'
    );

    PageStepConfigurator.clearSteps('/c100-rebuild/reasonable-adjustments/disability-requirements');
    expect(C100Sequence[16].url).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements/feel-comfortable');
    expect(C100Sequence[16].showInSection).toBe('c100');
    expect(C100Sequence[16].getNextStep({ disabilityRequirements: ['feelComfortableSupport'] })).toBe(
      '/c100-rebuild/confidentiality/details-know'
    );

    PageStepConfigurator.clearSteps('/c100-rebuild/reasonable-adjustments/disability-requirements');
    expect(C100Sequence[17].url).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements/travelling-court');
    expect(C100Sequence[17].showInSection).toBe('c100');
    expect(
      C100Sequence[17].getNextStep({
        disabilityRequirements: ['helpTravellingMovingBuildingSupport', 'communicationHelp'],
      })
    ).toBe('/c100-rebuild/reasonable-adjustments/disability-requirements/communication-help');

    expect(C100Sequence[18].url).toBe('/c100-rebuild/help-with-fees/need-help-with-fees');
    expect(C100Sequence[18].showInSection).toBe('c100');
    expect(C100Sequence[18].getNextStep({ needHelpWithFees: YesOrNo.YES })).toBe(
      '/c100-rebuild/help-with-fees/fees-applied'
    );
    expect(C100Sequence[18].getNextStep({ needHelpWithFees: YesOrNo.NO })).toBe(
      '/c100-rebuild/help-with-fees/hwf-guidance'
    );

    expect(C100Sequence[19].url).toBe('/c100-rebuild/help-with-fees/fees-applied');
    expect(C100Sequence[19].showInSection).toBe('c100');
    expect(C100Sequence[19].getNextStep({})).toBe('/c100-rebuild/help-with-fees/hwf-guidance');

    expect(C100Sequence[20].url).toBe('/c100-rebuild/help-with-fees/hwf-guidance');
    expect(C100Sequence[20].showInSection).toBe('c100');
    expect(C100Sequence[20].getNextStep({})).toBe('/c100-rebuild/confidentiality/details-know');
  });
});
