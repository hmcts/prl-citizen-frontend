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
        const prevPageId = this.checkAndReturnPageId(currentArray[pageIndex - 1]);
        const prevPage = this.checkAndReturnPage(prevPageId, filteredPage);
        const nextPageId = this.checkAndReturnPageId(currentArray[pageIndex + 1]);
        const nextPage = this.checkAndReturnPage(nextPageId, filteredPage);

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
    if (!pageSteps && selectedPageSteps?.length) {
      this.deriveSteps(mainPageId, selectedPageSteps);
    }
    return this.pageSteps[mainPageId] || null;
  }

  getNextPage(mainPageId: string, stepPageId?: string | null, selectedPageSteps?: string[]) {
    const pageSteps = this.getSteps(mainPageId, selectedPageSteps);
    return this.checkPageSteps(pageSteps, mainPageId, stepPageId);
  }

  private checkAndReturnPageId(pageId: string): string {
    if (!pageId) {
      return '';
    }
    return pageId;
  }

  private checkAndReturnPage(pageId: string, filteredPageParam) {
    if (!pageId) {
      return;
    }
    if (!filteredPageParam?.steps.find(_page => _page.id === pageId)) {
      return {};
    }
    return filteredPageParam?.steps.find(_page => _page.id === pageId);
  }

  private checkPageSteps(pageStepsParam, mainPageIdParam: string, stepPageIdParam?: string | null) {
    if (!pageStepsParam) {
      return null;
    }
    if (!(mainPageIdParam && stepPageIdParam)) {
      return Object.values(pageStepsParam)[0];
    }
    if (!pageStepsParam[stepPageIdParam]) {
      return null;
    }
    return pageStepsParam[stepPageIdParam].next;
  }
}

export default new PageStepConfigurator(PageStepsConfig);
