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
} from '../../../../steps/urls';

@autobind
export default class LegalRepresentationPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { user, userCase: caseData } = req.session;
    const client = new CosApiClient(user.accessToken, req.locals.logger);

    try {
      const fields = typeof this.fields === 'function' ? this.fields(caseData, req) : this.fields;
      const form = new Form(fields);
      const { _csrf, ...formData } = form.getParsedBody(req.body);

      req.session.errors = form.getErrors(formData);

      if (!caseData || req.session.errors.length) {
        return this.redirect(req, res);
      }

      const partyType = getCasePartyType(caseData, user.id);
      const partyDetails = getPartyDetails(caseData, user.id)!;

      Object.assign(partyDetails.response, { legalRepresentation: formData.legalRepresentation });

      req.session.userCase = await client.updateCaseData(
        caseData.id,
        partyDetails,
        partyType,
        caseData.caseTypeOfApplication as CaseType,
        CaseEvent.LEGAL_REPRESENTATION
      );
      mapDataInSession(req.session.userCase, user.id);

      req.session.save(() => {
        res.redirect(
          formData.legalRepresentation === YesOrNo.YES
            ? LEGAL_REPRESENTATION_SOLICITOR_DIRECT
            : LEGAL_REPRESENTATION_SOLICITOR_NOT_DIRECT
        );
      });
    } catch (error) {
      client.logError(error);
      throw new Error('Error occured, case could not be updated. - LegalRepresentationPostController');
    }
  }
}
