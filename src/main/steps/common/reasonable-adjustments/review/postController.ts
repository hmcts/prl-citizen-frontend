import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { CaseEvent, CaseType, PartyType } from '../../../../app/case/definition';
import type { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { RAProvider } from '../../../../modules/reasonable-adjustments';
import { getPartyDetails, mapDataInSession } from '../../../../steps/tasklistresponse/utils';

@autobind
export default class RARespondentPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest, res: Response): Promise<void> {
    try {
      const { user, userCase } = req.session;
      const partyDetails = getPartyDetails(userCase, user.id);
      const client = new CosApiClient(user.accessToken, req.locals.logger);
      if (partyDetails) {
        Object.assign(partyDetails.response, { supportYouNeed: RAProvider.utils.prepareRARespondentRequest(userCase) });
        req.session.userCase = await client.updateCaseData(
          userCase.id,
          partyDetails,
          PartyType.RESPONDENT,
          userCase.caseTypeOfApplication as CaseType,
          CaseEvent.SUPPORT_YOU_DURING_CASE
        );
        mapDataInSession(req.session.userCase, user.id);

        req.session.save(() => super.redirect(req, res));
      }
    } catch (err) {
      throw new Error('RA for respondent while submit response - Case could not be updated.');
    }
  }
}
