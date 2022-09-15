import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { Respondent, YesOrNo } from '../../../../app/case/definition';
import { toApiFormat } from '../../../../app/case/to-api-format';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import {
  LEGAL_REPRESENTATION_SOLICITOR_DIRECT,
  LEGAL_REPRESENTATION_SOLICITOR_NOT_DIRECT,
  LEGAL_REPRESENTATION_START,
  RESPOND_TO_APPLICATION,
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
    if (!req.body.legalRepresentation) {
      req.session.errors?.push({
        propertyName: 'legalRepresentation',
        errorType: 'required',
      });
      const redirectUrl = LEGAL_REPRESENTATION_START;
      super.redirect(req, res, redirectUrl);
    } else if (formData.legalRepresentation) {
      req.session.userCase.legalRepresentation = formData.legalRepresentation;
      let returnUrl = LEGAL_REPRESENTATION_SOLICITOR_NOT_DIRECT;
      if (formData.legalRepresentation === YesOrNo.YES) {
        returnUrl = LEGAL_REPRESENTATION_SOLICITOR_DIRECT;
      }
      res.redirect(returnUrl);
      req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
        if (respondent?.value?.user?.idamId === req.session?.user.id) {
          respondent.value.response.legalRepresentation = formData.legalRepresentation;
        }
      });
      req.session.errors = [];
      const eventId = 'consentToTheApplication';
      const caseReference = req.session.userCase.id;
      const caseData = toApiFormat(req?.session?.userCase);
      caseData.id = req.session.userCase?.id;
      const client = new CosApiClient(req.session.user.accessToken, 'https://return-url');
      const updatedCaseDataFromCos = await client.updateCase(req.session.user, caseReference, caseData, eventId);
      Object.assign(req.session.userCase, updatedCaseDataFromCos);

      req.session.save(() => res.redirect(RESPOND_TO_APPLICATION));
    }
    this.redirect(req, res);
  }
}
