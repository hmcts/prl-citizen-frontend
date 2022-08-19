
import {Page, PageSteps, PageStepsConfig} from './pageStepConfig'

interface FlattenedPage extends Page {
  url: string,
  prev: Page,
  next: Page
}

interface FlattenedPageSteps {
[key:string]: FlattenedPage
}

class PageStepConfigurator {
  private pageConfig
  private pageSteps
  constructor(pageConfig: PageSteps[]=[]){
    this.pageConfig = pageConfig
    this.pageSteps = {}
  }
  private clearSteps (pageId){
    this.pageSteps[pageId] = {}
  }


deriveSteps(pageId: string, pageSteps:string[] = []): FlattenedPageSteps {

  // pageSteps = ['C100_REASONABLE_ADJUSTMENTS_DOCUMENT_INFORMATION', 'C100_REASONABLE_ADJUSTMENTS_SUPPORT_COURT']
  this.clearSteps(pageId)
  const filteredPage = this.pageConfig.find(_page=>_page.id === pageId) || {}
  const filteredPageSteps = filteredPage.steps || []
  const steps =  pageSteps.reduce((_pages, pId:string, pageIndex:number, currentArray:string[])=>{
    const page = filteredPageSteps.find(_page=>_page.id === pId)

    if(page){
        const prevPageId = currentArray[pageIndex-1] || ''
        const prevPage = prevPageId && filteredPageSteps.find(_page=>_page.id === prevPageId) || {}
        const nextPageId = currentArray[pageIndex+1] || ''
        const nextPage = nextPageId && filteredPageSteps.find(_page=>_page.id === nextPageId) || {}

        _pages[page.url] = {
        ...page,
        prev: prevPageId ? {...prevPage} : null,
        next: nextPageId ? {...nextPage} : null
        }
    }

    return _pages
  }, {})

  if(Object.values(steps).length) {
    this.pageSteps[pageId] = steps
  }

  return steps
}

  getSteps(pageId: string, selectedPageSteps?: string[]){
    const pageSteps = this.pageSteps[pageId]
    if(!pageSteps && (selectedPageSteps && selectedPageSteps.length)) {
      this.deriveSteps(pageId, selectedPageSteps)
    }
    return this.pageSteps[pageId] || null
  }

  getNextPage(parentPageId: string, stepPageId?: string, selectedPageSteps?: string[]) {
    const pageSteps = this.getSteps(parentPageId, selectedPageSteps)
    return pageSteps ? ((parentPageId && stepPageId) ? pageSteps[stepPageId].next : Object.values(pageSteps)[0]) : null
  }
}

export default new PageStepConfigurator(PageStepsConfig)