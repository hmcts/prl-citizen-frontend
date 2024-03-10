import { Case } from 'app/case/case';
import { AppRequest } from 'app/controller/AppRequest';
import { C100_CASE_EVENT} from '../../../app/case/definition';
import {
  C100_HELP_WITH_FEES_NEED_HELP_WITH_FEES,
  PageLink,
} from '../../urls';

class RANavigationController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getNextUrl(currentUrl: PageLink,req: AppRequest<Partial<Case>> | undefined): PageLink {
    let nextUrl: PageLink;
    if(!req){
      nextUrl = currentUrl
    }
    else{
    try{
      req.locals.C100Api.updateCase(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        req.session.userCase?.caseId as string,
        req.session.userCase,
        req.originalUrl,
        C100_CASE_EVENT.CASE_UPDATE
      );
       req.session.save(); 
      nextUrl = C100_HELP_WITH_FEES_NEED_HELP_WITH_FEES
      }
      catch(error){
        req.locals.logger.error('error in update case', error);
        nextUrl = currentUrl
      }
    }
    return nextUrl;
  }

}

export default new RANavigationController();
