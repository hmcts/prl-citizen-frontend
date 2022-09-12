import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getSystemUser } from '../../../../app/auth/user/oidc';
import { CosApiClient } from '../../../../app/case/CosApiClient';
import { Respondent, YesOrNo } from '../../../../app/case/definition';
import { toApiFormat } from '../../../../app/case/to-api-format';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import {
  LEGAL_REPRESENTATION_SOLICITOR_DIRECT,
  LEGAL_REPRESENTATION_SOLICITOR_NOT_DIRECT,
  RESPOND_TO_APPLICATION,
} from '../../../urls';

@autobind
export default class LegalRepresentationPostControllerBase extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    //const postcode = req.body[`${this.fieldPrefix}AddressPostcode`] as string; , protected readonly fieldPrefix: FieldPrefix
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);
    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);
    console.log('form : ' + JSON.stringify(form));
    console.log('fields : ' + JSON.stringify(fields));
    console.log('form Data : ' + JSON.stringify(formData));
    if (formData.legalRepresentation) {
      req.session.userCase.legalRepresentation = formData.legalRepresentation;
      let returnUrl = LEGAL_REPRESENTATION_SOLICITOR_NOT_DIRECT;
      console.log('1' + returnUrl);
      console.log('1' + formData.legalRepresentation);

      if (formData.legalRepresentation === YesOrNo.YES) {
        console.log('2' + returnUrl);

        returnUrl = LEGAL_REPRESENTATION_SOLICITOR_DIRECT;
      }
      console.log('3' + returnUrl);
      res.redirect(returnUrl);
      req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
        if (respondent?.value?.user?.idamId === req.session?.user.id) {
          respondent.value.response.legalRepresentation = formData.legalRepresentation;
        }
      });
      console.log(JSON.stringify(req.session.userCase?.respondents));

      const eventId = 'consentToTheApplication';
      const caseworkerUser = await getSystemUser();
      const caseReference = req.session.userCase.id;
      const caseData = toApiFormat(req?.session?.userCase);
      caseData.id = req.session.userCase?.id;
      const client = new CosApiClient(caseworkerUser.accessToken, 'https://return-url');
      const updatedCaseDataFromCos = await client.updateCase(
        caseworkerUser,
        caseReference as string,
        caseData,
        eventId
      );
      Object.assign(req.session.userCase, updatedCaseDataFromCos);

      req.session.save(() => res.redirect(RESPOND_TO_APPLICATION));
    }
    req.session.errors = [];
    this.redirect(req, res);
  }
}
