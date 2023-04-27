import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { CaseEvent, CaseType, PartyType } from '../../../app/case/definition';
import type { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { RESPOND_TO_APPLICATION } from '../../../steps/urls';

import { prepareRequest } from './SafetyConcernsMapper';
@autobind
export class SafetyConcernsPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest, res: Response): Promise<void> {
    const { user, userCase } = req.session;
    const partyType = getCasePartyType(userCase, user.id);

    const client = new CosApiClient(user.accessToken, 'https://return-url');

    if (partyType === PartyType.RESPONDENT) {
      const respondent = userCase.respondents?.find(_respondent => _respondent?.value?.user?.idamId === user.id);
      if (respondent) {
        Object.assign(respondent.value.response, { safetyConcerns: prepareRequest(userCase) });
        try {
          req.session.userCase = await client.updateCaseData(
            user,
            userCase.id,
            respondent.value,
            partyType,
            userCase.caseTypeOfApplication as CaseType,
            CaseEvent.SAFETY_CONCERNS
          );
          req.session.save(() => res.redirect(RESPOND_TO_APPLICATION));
        } catch (error) {
          throw new Error('SafetyConcernsPostController - Case could not be updated.');
        }
      }
    }
  }
}
