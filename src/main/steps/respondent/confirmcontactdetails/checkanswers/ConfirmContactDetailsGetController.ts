import autobind from 'autobind-decorator';
import { Response } from 'express';
import { getCaseApi } from '../../../../app/case/CaseApi';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { GetController } from '../../../../app/controller/GetController';
//import { LanguagePreference } from '../../../../app/case/definition';
@autobind
export default class ConfirmContactDetailsGetController extends GetController {

  public async get(req: AppRequest, res: Response): Promise<void> {
    let redirect = false;
    
    if (req.session?.user) {
      res.locals.isLoggedIn = true;
      req.locals.api = getCaseApi(req.session.user, req.locals.logger);
      if (!req.session.userCase) {
   
        //const languagePreference =
        //req.session['lang'] === 'cy' ? LanguagePreference.WELSH : LanguagePreference.ENGLISH;
        // req.session.userCase = await req.locals.api.getOrCreateCase(
        // res.locals.serviceType,
        // req.session.user,
        // languagePreference
        // );
        //setting the applicant's preferred language in session
        //req.session['lang'] =
        //req.session.userCase.applicant1LanguagePreference === LanguagePreference.WELSH ? 'cy' : 'en';
      }
      //return next();
    }
    //console.log("BEFORE call to getCaseById method====1111====>>");
    //res.locals.isLoggedIn = true;
    //req.locals.api = getCaseApi(req.session.user, req.locals.logger);
    //await req.locals.api.getCases();
    //req.session.userCase = await req.locals.api.getCaseById('1651759489115676');
    //console.log("userCase===1111====>>"+JSON.stringify(req.session.userCase));
    //console.log("AFTER call to getCaseById method======1111======>>>");

    //console.log("BEFORE call to getCaseById method====1111====>>");

    
    
    const callback = redirect ? undefined : () => super.get(req, res);
    super.saveSessionAndRedirect(req, res, callback);
  }
}
