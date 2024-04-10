import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { CaseEvent, CaseType, PartyType, YesOrNo } from '../../../app/case/definition';
import type { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { getCasePartyType } from '../../../steps/prl-cases/dashboard/utils';
import { getPartyDetails } from '../../../steps/tasklistresponse/utils';
import {
  APPLICANT_REMOVE_LEGAL_REPRESENTATIVE_CONFIRM,
  RESPONDENT_REMOVE_LEGAL_REPRESENTATIVE_CONFIRM,
} from '../../urls';

@autobind
export class RemoveLegalRepresentativePostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest, res: Response): Promise<void> {
    const { user, userCase } = req.session;
    const client = new CosApiClient(user.accessToken, req.locals.logger);
    const partyDetails = getPartyDetails(userCase, user.id);
    const partyType = getCasePartyType(userCase, user.id);
    if (partyDetails) {
      Object.assign(partyDetails, { ...partyDetails, isRemoveLegalRepresentativeRequested: YesOrNo.YES });
      try {
        req.session.userCase = await client.updateCaseData(
          userCase.id,
          partyDetails,
          partyType,
          userCase.caseTypeOfApplication as CaseType,
          CaseEvent.CITIZEN_REMOVE_LEGAL_REPRESENTATIVE
        );
        req.session.save(() =>
          res.redirect(
            partyType === PartyType.RESPONDENT
              ? RESPONDENT_REMOVE_LEGAL_REPRESENTATIVE_CONFIRM
              : APPLICANT_REMOVE_LEGAL_REPRESENTATIVE_CONFIRM
          )
        );
      } catch (error) {
        throw new Error('RemoveLegalRepresentativePostController - Case could not be updated.');
      }
    }
  }
}
