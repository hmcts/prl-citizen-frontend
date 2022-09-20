import autobind from 'autobind-decorator';
import type { Response } from 'express';

//import { getSystemUser } from '../../../app/auth/user/oidc';
import { CosApiClient } from '../../../app/case/CosApiClient';
import { Respondent } from '../../../app/case/definition';
import { toApiFormat } from '../../../app/case/to-api-format';
import type { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { RESPONDENT_TASK_LIST_URL } from '../../urls';

import { setMIAMDetails } from './MIAMMapper';

@autobind
export class MIAMPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }
  public async post(req: AppRequest, res: Response): Promise<void> {
    const caseworkerUser = req.session.user;
    const caseReference = req.session.userCase.id;
    let eventId = '';

    const client = new CosApiClient(caseworkerUser.accessToken, 'https://return-url');

    const caseDataFromCos = await client.retrieveByCaseId(caseReference, caseworkerUser);
    Object.assign(req.session.userCase, caseDataFromCos);

    req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
      if (respondent?.value?.user?.idamId === req.session?.user.id) {
        if (req.url.includes('miam')) {
          Object.assign(respondent, setMIAMDetails(respondent, req));
          eventId = 'respondentMiam';
        }
      }
    });

    const caseData = toApiFormat(req?.session?.userCase);
    caseData.id = caseReference;
    const updatedCaseDataFromCos = await client.updateCase(caseworkerUser, caseReference as string, caseData, eventId);
    Object.assign(req.session.userCase, updatedCaseDataFromCos);

    req.session.save(() => res.redirect(RESPONDENT_TASK_LIST_URL));
  }
}
