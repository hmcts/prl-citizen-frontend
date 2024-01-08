import PageStepConfigurator from './PageStepConfigurator';
import { PageSteps, PageStepsConfig } from './pageStepConfig';
const miamGeneralReasonsConfig: PageSteps = PageStepsConfig[0];

describe('PageStepConfigurator', () => {
  test('getSteps should return null when clearSteps is invoked', () => {
    PageStepConfigurator.clearSteps(miamGeneralReasonsConfig.id);
    expect(PageStepConfigurator.getSteps(miamGeneralReasonsConfig.id)).toBe(null);
  });
});