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
  SEXUAL_ABUSE,
  DOMESTIC_ABUSE_RISK_NO,
  RESPOND_TO_APPLICATION,
} from '../../../urls';

@autobind
export default class DomesticAbusePostController extends PostController<AnyObject> {
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
    if (formData.respondentSafetyConcerns?.domesticAbuseDetails && req.session.userCase.respondentSafetyConcerns?.domesticAbuseDetails) {
      req.session.userCase.respondentSafetyConcerns.domesticAbuseDetails = formData.respondentSafetyConcerns.domesticAbuseDetails;
      let returnUrl = DOMESTIC_ABUSE_RISK_NO;
      console.log('1' + returnUrl);
      console.log('1' + formData.respondentSafetyConcerns.domesticAbuseDetails);

      if (formData.respondentSafetyConcerns.domesticAbuseDetails === YesOrNo.YES) {
        console.log('2' + returnUrl);

        returnUrl = SEXUAL_ABUSE;
      }
      console.log('3' + returnUrl);
      res.redirect(returnUrl);
      req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
        if (respondent?.value?.user?.idamId === req.session?.user.id) {
            if (formData.respondentSafetyConcerns?.domesticAbuseDetails && respondent.value.response.respondentSafetyConcerns) {
          respondent.value.response.respondentSafetyConcerns.domesticAbuseDetails = formData.respondentSafetyConcerns.domesticAbuseDetails;
        }
    }
        
      });

      const eventId = 'citizenSafetyConcerns';
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
