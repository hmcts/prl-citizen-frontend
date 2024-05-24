/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { CaseEvent, CaseType, PartyType } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { getPartyDetails, mapDataInSession } from '../../../tasklistresponse/utils';
import { prepareRespondToAOHRequest } from '../respondToAOHMapper';

@autobind
export default class RespondToAohReviewPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    if (req.body.saveAndContinue) {
      const caseData = req.session.userCase;
      const userDetails = req.session.user;
      const partyDetails = getPartyDetails(caseData, req.session.user.id);
      const client = new CosApiClient(req.session.user.accessToken, req.locals.logger);

      try {
        if (partyDetails) {
          Object.assign(partyDetails.response, { ...prepareRespondToAOHRequest(caseData) });
          req.session.userCase = await client.updateCaseData(
            caseData.id,
            partyDetails,
            PartyType.RESPONDENT,
            caseData.caseTypeOfApplication as CaseType,
            CaseEvent.CITIZEN_RESPONSE_TO_AOH
          );
          mapDataInSession(req.session.userCase, userDetails.id);
          super.redirect(req, res);
        }
      } catch (error) {
        client.logError(error);
        throw new Error('Error occured, failed to save response to AOH. - RespondToAohReviewPostController');
      }
    }
  }
}
