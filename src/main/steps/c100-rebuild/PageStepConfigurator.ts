import { Page, PageSteps, PageStepsConfig } from './pageStepConfig';

interface FlattenedPage extends Page {
  url: string;
  prev: Page;
  next: Page;
}

interface FlattenedPageSteps {
  [key: string]: FlattenedPage;
}

class PageStepConfigurator {
  private pageConfig;
  private pageSteps;
  constructor(pageConfig: PageSteps[]) {
    this.pageConfig = pageConfig;
    this.pageSteps = {};
  }

  clearSteps(mainPageId) {
    delete this.pageSteps[mainPageId];
  }

  deriveSteps(mainPageId: string, selectedPageSteps: string[] = []): FlattenedPageSteps | null {
    this.clearSteps(mainPageId);
    const filteredPage = this.pageConfig.find(_page => _page.id === mainPageId);
    if (!filteredPage) {
      return null;
    }
    const steps = selectedPageSteps.reduce((_pages, pId: string, pageIndex: number, currentArray: string[]) => {
      const page = filteredPage?.steps.find(_page => _page.id === pId);

      if (page) {
        const prevPageId = currentArray[pageIndex - 1] || '';
        const prevPage = (prevPageId && filteredPage?.steps.find(_page => _page.id === prevPageId)) || {};
        const nextPageId = currentArray[pageIndex + 1] || '';
        const nextPage = (nextPageId && filteredPage?.steps.find(_page => _page.id === nextPageId)) || {};

        _pages[page.url] = {
          ...page,
          prev: prevPageId ? { ...prevPage } : null,
          next: nextPageId ? { ...nextPage } : null,
        };
      }

      return _pages;
    }, {});
    const hasSteps = Object.values(steps).length;

    if (hasSteps) {
      this.pageSteps[mainPageId] = steps;
    }

    return hasSteps ? steps : null;
  }

  getSteps(mainPageId: string, selectedPageSteps?: string[]) {
    const pageSteps = this.pageSteps[mainPageId];
    if (!pageSteps && selectedPageSteps && selectedPageSteps.length) {
      this.deriveSteps(mainPageId, selectedPageSteps);
    }
    return this.pageSteps[mainPageId] || null;
  }

  getNextPage(mainPageId: string, stepPageId?: string | null, selectedPageSteps?: string[]) {
    const pageSteps = this.getSteps(mainPageId, selectedPageSteps);
    return pageSteps
      ? mainPageId && stepPageId
        ? pageSteps[stepPageId]
          ? pageSteps[stepPageId].next
          : null
        : Object.values(pageSteps)[0]
      : null;
  }
}

export default new PageStepConfigurator(PageStepsConfig);
