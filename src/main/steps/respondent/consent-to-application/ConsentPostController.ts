import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { CaseEvent, CaseType } from '../../../app/case/definition';
import type { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { getPartyDetails, mapDataInSession } from '../../../steps/tasklistresponse/utils';
import { RESPOND_TO_APPLICATION } from '../../urls';

import { prepareConsentRequest } from './ConsentMapper';

@autobind
export class ConsentPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }
  public async post(req: AppRequest, res: Response): Promise<void> {
    const { user, userCase } = req.session;
    const partyType = getCasePartyType(userCase, user.id);
    const partyDetails = getPartyDetails(userCase, user.id)?.partyDetails;
    const client = new CosApiClient(user.accessToken, req.locals.logger);

    if (partyDetails) {
      Object.assign(partyDetails.response, { consent: prepareConsentRequest(userCase) });
      try {
        req.session.userCase = await client.updateCaseData(
          userCase.id,
          partyDetails,
          partyType,
          userCase.caseTypeOfApplication as CaseType,
          CaseEvent.CONSENT_TO_APPLICATION
        );
        mapDataInSession(req.session.userCase, user.id);
        req.session.save(() => res.redirect(RESPOND_TO_APPLICATION));
      } catch (error) {
        throw new Error('ConstentToApplication - Case could not be updated.');
      }
    }
  }
}
