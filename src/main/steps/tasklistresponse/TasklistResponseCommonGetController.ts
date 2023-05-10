import { Response } from 'express';

import { CosApiClient } from '../../app/case/CosApiClient';
import { AppRequest } from '../../app/controller/AppRequest';
import { mapDataInSession } from './utils';
import { APPLICANT_CHECK_ANSWERS, APPLICANT_DETAILS_KNOWN, C7_ATTENDING_THE_COURT, CONSENT_TO_APPLICATION, INTERNATIONAL_FACTORS_START , MIAM_START , PROCEEDINGS_START , RESPONDENT_ALLEGATIONS_OF_HARM_AND_VIOLENCE, RESPONDENT_CHECK_ANSWERS, RESPONDENT_DETAILS_KNOWN } from '../../steps/urls';
import { EventRoutes } from '../../app/case/definition';
import autobind from 'autobind-decorator';
@autobind
export class TasklistresponseCommonGetController {
//   constructor(context1){
//     this.context = context1;
//    }
 constructor(protected readonly context: EventRoutes){}
  public async get(req: AppRequest, res: Response): Promise<void> {
    try {
      let redirectUrl;
      const citizenUser = req.session.user;
      const caseId = req.params?.caseId;
      const client = new CosApiClient(citizenUser.accessToken, 'https://return-url');

      req.session.userCase = await client.retrieveByCaseId(caseId, citizenUser);
      mapDataInSession(req.session.userCase, citizenUser.id);
      switch(this.context){
        case EventRoutes.INTERNATIONAL_FACTORS_RESPONSE:
            redirectUrl = INTERNATIONAL_FACTORS_START;
            break;
        case EventRoutes.MIAM_RESPONSE:
            redirectUrl = MIAM_START;
            break;
        case EventRoutes.PROCEEDINGS_RESPONSE:
            redirectUrl = PROCEEDINGS_START;
            break;
        case EventRoutes.SAFETY_CONCERNS_RESPONSE:
            redirectUrl = RESPONDENT_ALLEGATIONS_OF_HARM_AND_VIOLENCE;
            break;
        case EventRoutes.CONSENT_RESPONSE:
            redirectUrl = CONSENT_TO_APPLICATION;
            break;
        case EventRoutes.SUPPORT_DURING_CASE:
            redirectUrl = C7_ATTENDING_THE_COURT;
            break;
        case EventRoutes.KEEP_DETAILS_PRIVATE_APPLICANT:
            redirectUrl = APPLICANT_DETAILS_KNOWN;
            break;
        case EventRoutes.KEEP_DETAILS_PRIVATE_RESPONDENT:
            redirectUrl = RESPONDENT_DETAILS_KNOWN;
            break;
        case EventRoutes.CONFIRM_CONTACT_DETAILS_APPLICANT:
            redirectUrl = APPLICANT_CHECK_ANSWERS;
            break;
        case EventRoutes.CONFIRM_CONTACT_DETAILS_RESPONDENT:
            redirectUrl = RESPONDENT_CHECK_ANSWERS;
            break;
        
      }      
      req.session.save(() => res.redirect(redirectUrl));
    } catch (err) {
      throw new Error('Case Data could not be retrieved.');
    }
  }
}