import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { CaseEvent, CaseType, PartyType } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields } from '../../../../app/form/Form';
import { getCasePartyType } from '../../../prl-cases/dashboard/utils';
import { getPartyDetails, mapDataInSession } from '../../../tasklistresponse/utils';
import { mapConfidentialListToFields, prepareKeepDetailsPrivateRequest } from '../KeepYourDetailsPrivateMapper';

@autobind
export default class KeepDetailsPrivatePostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const form = new Form(this.fields);
    const { _csrf, ...formData } = form.getParsedBody(req.body);

    req.session.userCase = {
      ...req.session.userCase,
      startAlternative: formData.startAlternative,
      contactDetailsPrivate: formData.contactDetailsPrivate,
    };
    req.session.errors = form.getErrors(formData);

    if (req.session.errors.length) {
      return this.redirect(req, res);
    }

    const { user, userCase } = req.session;
    const partyType = getCasePartyType(userCase, user.id);
    const partyDetails = getPartyDetails(userCase, user.id);
    const client = new CosApiClient(user.accessToken, req.locals.logger);

    if (partyDetails) {
      const request = prepareKeepDetailsPrivateRequest(userCase);
      if (userCase.caseTypeOfApplication === CaseType.C100 && partyType === PartyType.APPLICANT) {
        Object.assign(partyDetails, mapConfidentialListToFields(request));
      }
      Object.assign(partyDetails.response, { keepDetailsPrivate: request });
      try {
        req.session.userCase = await client.updateCaseData(
          userCase.id,
          partyDetails,
          partyType,
          userCase.caseTypeOfApplication as CaseType,
          CaseEvent.KEEP_DETAILS_PRIVATE
        );
        mapDataInSession(req.session.userCase, user.id);
        super.redirect(req, res);
      } catch (error) {
        throw new Error('KeepDetailsPrivatePostController - Case could not be updated.');
      }
    }
  }
}
