import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { CaseEvent, CaseType, YesOrNo } from '../../../../app/case/definition';
import type { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields } from '../../../../app/form/Form';
import { applyParms } from '../../../../steps/common/url-parser';
import { getCasePartyType } from '../../../prl-cases/dashboard/utils';
import { getPartyDetails } from '../../../tasklistresponse/utils';
import { REMOVE_LEGAL_REPRESENTATIVE_CONFIRM } from '../../../urls';

@autobind
export default class RemoveLegalRepresentativePostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields) {
    super(fields);
  }

  public async post(req: AppRequest, res: Response): Promise<void> {
    const form = new Form(this.fields);
    const { _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.userCase = {
      ...req.session.userCase,
      declarationCheck: formData.declarationCheck,
    };
    req.session.errors = form.getErrors(formData);

    if (req.session.errors.length) {
      return this.redirect(req, res);
    }

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
        req.session.save(() => res.redirect(applyParms(REMOVE_LEGAL_REPRESENTATIVE_CONFIRM, { partyType })));
      } catch (error) {
        throw new Error('RemoveLegalRepresentativePostController - Case could not be updated.');
      }
    }
  }
}
