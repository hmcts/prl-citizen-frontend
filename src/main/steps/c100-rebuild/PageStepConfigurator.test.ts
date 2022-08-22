import { PageSteps, PageStepsConfig } from './pageStepConfig'
import PageStepConfigurator from './PageStepConfigurator'
const reasonableAdjustmentsConfig: PageSteps = PageStepsConfig[0]

describe('PageStepConfigurator', ()=>{

    test('getSteps should return null when clearSteps is invoked',()=>{
        PageStepConfigurator.clearSteps(reasonableAdjustmentsConfig.id)
        expect(PageStepConfigurator.getSteps(reasonableAdjustmentsConfig.id)).toBe(null);
    })

    test('deriveSteps should return appropriate steps according to selectedPageSteps',()=>{
        PageStepConfigurator.deriveSteps(reasonableAdjustmentsConfig.id, ['documentsHelp', 'extraSupport'])
        const pageSteps = PageStepConfigurator.getSteps(reasonableAdjustmentsConfig.id)
        expect(pageSteps).not.toBe(null);
        expect(Object.values(pageSteps).length).toBe(2);
        expect(pageSteps).toHaveProperty('/c100-rebuild/reasonable-adjustments/disability-requirements/document-information')
        expect(pageSteps).toHaveProperty('/c100-rebuild/reasonable-adjustments/disability-requirements/support-court')
        expect(pageSteps).not.toHaveProperty('/c100-rebuild/reasonable-adjustments/disability-requirements/communication-help')
    })

    test('deriveSteps should return null if inappropraite mainPageId is passed',()=>{
        PageStepConfigurator.deriveSteps('dummyMainPageId', ['documentsHelp', 'extraSupport'])
        const pageSteps = PageStepConfigurator.getSteps('dummyMainPageId')
        expect(pageSteps).toBe(null);
    })

    test('getNextPage should return the next pageurl if applicable',()=>{
        PageStepConfigurator.deriveSteps(reasonableAdjustmentsConfig.id, ['documentsHelp', 'extraSupport'])
        expect(PageStepConfigurator.getNextPage(reasonableAdjustmentsConfig.id)).toHaveProperty('url', '/c100-rebuild/reasonable-adjustments/disability-requirements/document-information');
        expect(PageStepConfigurator.getNextPage(reasonableAdjustmentsConfig.id, '/c100-rebuild/reasonable-adjustments/disability-requirements/document-information')).toHaveProperty('url', '/c100-rebuild/reasonable-adjustments/disability-requirements/support-court');
        expect(PageStepConfigurator.getNextPage(reasonableAdjustmentsConfig.id, '/c100-rebuild/reasonable-adjustments/disability-requirements/support-court')).toBe(null);
    })

    test('getNextPage should return the null when inappropraite mainPageId is passed',()=>{
        PageStepConfigurator.deriveSteps(reasonableAdjustmentsConfig.id, ['documentsHelp', 'extraSupport'])
        expect(PageStepConfigurator.getNextPage('dummyMainPageId')).toBe(null);
    })

    test('getNextPage should return the null when inappropraite stepPageId is passed',()=>{
        PageStepConfigurator.deriveSteps(reasonableAdjustmentsConfig.id, ['documentsHelp', 'extraSupport'])
        expect(PageStepConfigurator.getNextPage(reasonableAdjustmentsConfig.id, 'dummyMainPageId')).toBe(null);
    })
})