import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { getSystemUser } from '../../../app/auth/user/oidc';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { Respondent, YesOrNo } from '../../../app/case/definition';
import { toApiFormat } from '../../../app/case/to-api-format';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { RESPONDENT_PRIVATE_DETAILS_CONFIRMED, RESPONDENT_PRIVATE_DETAILS_NOT_CONFIRMED } from '../../../steps/urls';

import { setKeepYourDetailsPrivate } from './KeepYourDetailsPrivateMapper';

@autobind
export class KeepDetailsPrivatePostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const caseworkerUser = await getSystemUser();
    const caseReference = req.session.userCase.id;

    const client = new CosApiClient(caseworkerUser.accessToken, 'https://return-url');

    const caseDataFromCos = await client.retrieveByCaseId(caseReference, caseworkerUser);
    Object.assign(req.session.userCase, caseDataFromCos);

    req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
      if (respondent?.value?.user?.idamId === req.session?.user.id) {
        Object.assign(respondent, setKeepYourDetailsPrivate(respondent, req));
      }
    });

    const caseData = toApiFormat(req?.session?.userCase);
    caseData.id = caseReference;
    const updatedCaseDataFromCos = await client.updateCase(
      caseworkerUser,
      caseReference as string,
      caseData,
      'keepYourDetailsPrivate'
    );
    Object.assign(req.session.userCase, updatedCaseDataFromCos);

    let redirectUrl = RESPONDENT_PRIVATE_DETAILS_CONFIRMED;

    if (req.session.userCase.startAlternative === YesOrNo.NO) {
      redirectUrl = RESPONDENT_PRIVATE_DETAILS_NOT_CONFIRMED;
    }

    req.session.save(() => res.redirect(redirectUrl));
  }
}
