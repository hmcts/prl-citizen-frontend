/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { CaseEvent, CaseType } from '../../../../app/case/definition';
import type { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { getCasePartyType } from '../../../prl-cases/dashboard/utils';
import { getPartyDetails, mapDataInSession } from '../../../tasklistresponse/utils';
import { RESPOND_TO_APPLICATION } from '../../../urls';

import { prepareRequest } from './safetyConcernMapper';
@autobind
export default class AohPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest, res: Response): Promise<void> {
    const { user, userCase } = req.session;
    const partyType = getCasePartyType(userCase, user.id);
    const partyDetails = getPartyDetails(userCase, user.id);
    const client = new CosApiClient(user.accessToken, req.locals.logger);

    if (partyDetails) {
      Object.assign(partyDetails.response, { respondingCitizenAoH: prepareRequest(userCase) });
      try {
        req.session.userCase = await client.updateCaseData(
          userCase.id,
          partyDetails,
          partyType,
          userCase.caseTypeOfApplication as CaseType,
          CaseEvent.SAFETY_CONCERNS
        );
        mapDataInSession(req.session.userCase, user.id);
        req.session.save(() => res.redirect(RESPOND_TO_APPLICATION));
      } catch (error) {
        throw new Error('SafetyConcernsPostController - Case could not be updated.');
      }
    }
  }
}
