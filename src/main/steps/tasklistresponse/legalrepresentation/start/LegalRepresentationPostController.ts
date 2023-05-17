import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { CaseEvent, CaseType, YesOrNo } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';
import { getPartyDetails, mapDataInSession } from '../../../../steps/tasklistresponse/utils';
import {
  LEGAL_REPRESENTATION_SOLICITOR_DIRECT,
  LEGAL_REPRESENTATION_SOLICITOR_NOT_DIRECT,
  LEGAL_REPRESENTATION_START,
} from '../../../urls';

@autobind
export default class LegalRepresentationPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);
    const redirectUrl = LEGAL_REPRESENTATION_START;

    if (!req.body.legalRepresentation) {
      req.session.errors?.push({
        propertyName: 'legalRepresentation',
        errorType: 'required',
      });
      super.redirect(req, res, redirectUrl);
    }
    req.session.errors = [];
    const { user, userCase } = req.session;
    const partyType = getCasePartyType(userCase, user.id);
    const partyDetails = getPartyDetails(userCase, user.id);
    const client = new CosApiClient(user.accessToken, 'https://return-url');
    if (partyDetails && formData.legalRepresentation) {
      const returnUrl =
        formData.legalRepresentation === YesOrNo.YES
          ? LEGAL_REPRESENTATION_SOLICITOR_DIRECT
          : LEGAL_REPRESENTATION_SOLICITOR_NOT_DIRECT;
      req.session.userCase.legalRepresentation = formData.legalRepresentation;
      Object.assign(partyDetails.response, { legalRepresentation: formData.legalRepresentation });
      try {
        req.session.userCase = await client.updateCaseData(
          user,
          userCase.id,
          partyDetails,
          partyType,
          userCase.caseTypeOfApplication as CaseType,
          CaseEvent.LEGAL_REPRESENTATION
        );
        mapDataInSession(req.session.userCase, user.id);
        req.session.save(() => res.redirect(returnUrl));
      } catch (error) {
        throw new Error('MIAMPostController - Case could not be updated.');
      }
    }
  }
}
