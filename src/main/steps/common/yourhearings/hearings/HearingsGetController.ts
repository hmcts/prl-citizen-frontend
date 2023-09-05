import autobind from 'autobind-decorator';
import { Response } from 'express';

//import { CosApiClient } from '../../../../app/case/CosApiClient';
import { PartyType } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';
import { APPLICANT_YOURHEARINGS_HEARINGS, RESPONDENT_YOURHEARINGS_HEARINGS } from '../../../urls';

@autobind
export class HearingsGetController {
  public async get(req: AppRequest, res: Response): Promise<void> {
    const partyType = getCasePartyType(req.session.userCase, req.session.user.id);
    let redirectUrl;
    if (partyType === PartyType.APPLICANT) {
      redirectUrl = APPLICANT_YOURHEARINGS_HEARINGS;
    } else {
      redirectUrl = RESPONDENT_YOURHEARINGS_HEARINGS;
    }
    //const sessionErrors = req.session?.errors || [];
    //let formaction: YesOrNo | undefined;

    //make a call to the cosclient to get the hearings
    //const citizenUser = req.session.user;
    //const cosApiClient = new CosApiClient(citizenUser.accessToken, 'http://localhost:3001');
    //const caseHearingDataFromCos = await cosApiClient.retrieveCaseHearingsByCaseId(req.session.userCase, citizenUser);
    //console.log('retrieved caseHEARINGdata for case : ' + JSON.stringify(caseHearingDataFromCos));
    //req.session.userCase.hearingCollection = caseHearingDataFromCos.hearingCollection;
    //const userCase = req.session.userCase;

    req.session.save(() => res.redirect(redirectUrl));
  }
}
