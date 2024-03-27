import type { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { Respondent, YesOrNo } from '../../../app/case/definition';
import { toApiFormat } from '../../../app/case/to-api-format';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject } from '../../../app/controller/PostController';
import { RESPOND_TO_APPLICATION } from '../../../steps/urls';

export class ViewAllDocumentsPostController {
  public async setResponseInitiatedFlag(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const client = new CosApiClient(req.session.user.accessToken, 'http://localhost:3001');
    const caseDataFromCos = await client.retrieveByCaseId(req?.session?.userCase.id, req.session.user);
    Object.assign(req.session.userCase, caseDataFromCos);
    req.session.userCase.respondents?.forEach((respondent: Respondent) => {
      if (respondent?.value.user?.idamId === req.session?.user?.id) {
        if (respondent.value.response && respondent.value.response.citizenFlags) {
          respondent.value.response.citizenFlags.isResponseInitiated = YesOrNo.YES;
        }
      }
    });
    const data = toApiFormat(req?.session?.userCase);
    data.id = req?.session?.userCase.id;

    const updatedCaseDataFromCos = await client.updateCase(
      req.session.user,
      req?.session?.userCase.id,
      data,
      'citizen-case-update'
    );
    Object.assign(req.session.userCase, updatedCaseDataFromCos);
    req.session.applicationSettings = {
      ...req.session.applicationSettings,
      navfromRespondToApplication: true,
    };

    req.session.save(() => res.redirect(RESPOND_TO_APPLICATION));
  }
}
