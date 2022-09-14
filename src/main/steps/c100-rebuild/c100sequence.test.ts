import { YesOrNo } from '../../app/case/definition';

import PageStepConfigurator from './PageStepConfigurator';
import { C100Sequence } from './c100sequence';

describe('C100Sequence', () => {
  test('should contain 1 entries in c100 screen sequence', () => {
    expect(C100Sequence).toHaveLength(37);
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

    expect(C100Sequence[18].url).toBe('/c100-rebuild/confidentiality/details-know');
    expect(C100Sequence[18].showInSection).toBe('c100');
    expect(C100Sequence[18].getNextStep({})).toBe('/c100-rebuild/hearing-without-notice/hearing-part1');

    expect(C100Sequence[19].url).toBe('/c100-rebuild/hearing-without-notice/hearing-part1');
    expect(C100Sequence[19].showInSection).toBe('c100');
    expect(C100Sequence[19].getNextStep({})).toBe('/c100-rebuild/hearing-without-notice/hearing-part2');

    expect(C100Sequence[20].url).toBe('/c100-rebuild/hearing-without-notice/hearing-part2');
    expect(C100Sequence[20].showInSection).toBe('c100');
    expect(C100Sequence[20].getNextStep({})).toBe('/c100-rebuild/typeoforder/select-courtorder');

    expect(C100Sequence[21].url).toBe('/c100-rebuild/typeoforder/select-courtorder');
    expect(C100Sequence[21].showInSection).toBe('c100');
    expect(C100Sequence[21].getNextStep({})).toBe('/c100-rebuild/typeoforder/caorder');
    expect(C100Sequence[22].url).toBe('/c100-rebuild/typeoforder/caorder');
    expect(C100Sequence[22].showInSection).toBe('c100');
    expect(C100Sequence[22].getNextStep({})).toBe('/c100-rebuild/typeoforder/shortstatement');

    expect(C100Sequence[23].url).toBe('/c100-rebuild/typeoforder/shortstatement');
    expect(C100Sequence[23].showInSection).toBe('c100');
    expect(C100Sequence[23].getNextStep({})).toBe('/c100-rebuild/confidentiality/details-know');

    expect(C100Sequence[24].url).toBe('/c100-rebuild/other-proceedings/current-previous-proceedings');
    expect(C100Sequence[24].showInSection).toBe('c100');
    expect(C100Sequence[24].getNextStep({})).toBe('/c100-rebuild/other-proceedings/proceeding-details');

    expect(C100Sequence[25].url).toBe('/c100-rebuild/other-proceedings/proceeding-details');
    expect(C100Sequence[25].showInSection).toBe('c100');
    expect(C100Sequence[25].getNextStep({})).toBe('/c100-rebuild/other-proceedings/current-previous-proceedings');

    expect(C100Sequence[26].url).toBe('/c100-rebuild/start');
    expect(C100Sequence[26].showInSection).toBe('c100');
    expect(C100Sequence[26].getNextStep({})).toBe('/c100-rebuild/confidentiality/details-know');

    expect(C100Sequence[27].url).toBe('/c100-rebuild/help-with-fees/need-help-with-fees');
    expect(C100Sequence[27].showInSection).toBe('c100');
    expect(C100Sequence[27].getNextStep({ needHelpWithFees: YesOrNo.YES })).toBe(
      '/c100-rebuild/help-with-fees/fees-applied'
    );
    expect(C100Sequence[27].getNextStep({ needHelpWithFees: YesOrNo.NO })).toBe(
      '/c100-rebuild/help-with-fees/hwf-guidance'
    );

    expect(C100Sequence[28].url).toBe('/c100-rebuild/help-with-fees/fees-applied');
    expect(C100Sequence[28].showInSection).toBe('c100');
    expect(C100Sequence[28].getNextStep({})).toBe('/c100-rebuild/help-with-fees/hwf-guidance');

    expect(C100Sequence[29].url).toBe('/c100-rebuild/help-with-fees/hwf-guidance');
    expect(C100Sequence[29].showInSection).toBe('c100');
    expect(C100Sequence[29].getNextStep({})).toBe('/c100-rebuild/confidentiality/details-know');

    expect(C100Sequence[30].url).toBe('/c100-rebuild/child-details/add-childern');
    expect(C100Sequence[30].showInSection).toBe('c100');
    expect(C100Sequence[30].getNextStep({})).toBe('/c100-rebuild/child-details/personal-details');

    expect(C100Sequence[31].url).toBe('/c100-rebuild/child-details/personal-details');
    expect(C100Sequence[31].showInSection).toBe('c100');
    expect(C100Sequence[31].getNextStep({})).toBe('/c100-rebuild/child-details/child-matters');

    expect(C100Sequence[32].url).toBe('/c100-rebuild/child-details/child-matters');
    expect(C100Sequence[32].showInSection).toBe('c100');
    expect(C100Sequence[32].getNextStep({})).toBe('/c100-rebuild/child-details/parental-responsibility');

    expect(C100Sequence[33].url).toBe('/c100-rebuild/child-details/parental-responsibility');
    expect(C100Sequence[33].showInSection).toBe('c100');
    expect(C100Sequence[33].getNextStep({})).toBe('/c100-rebuild/child-details/further-information');

    expect(C100Sequence[34].url).toBe('/c100-rebuild/child-details/further-information');
    expect(C100Sequence[34].showInSection).toBe('c100');
    expect(C100Sequence[34].getNextStep({})).toBe('/c100-rebuild/confidentiality/details-know');

    expect(C100Sequence[35].url).toBe('/c100-rebuild/confirmation-page');
    expect(C100Sequence[35].showInSection).toBe('c100');
    expect(C100Sequence[35].getNextStep({})).toBe('/c100-rebuild/confirmation-page');
  });
});
