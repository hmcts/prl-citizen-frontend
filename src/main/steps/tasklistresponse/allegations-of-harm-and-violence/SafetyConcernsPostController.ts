import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { Respondent } from '../../../app/case/definition';
import { toApiFormat } from '../../../app/case/to-api-format';
import type { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { EVENT_RESPONDENT_MIAM } from '../../../steps/constants';
import { RESPOND_TO_APPLICATION } from '../../../steps/urls';

import { setSafetyConcerns } from './SafetyConcernsMapper';
@autobind
export class SafetyConcernsPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }
  public async post(req: AppRequest, res: Response): Promise<void> {
    try {
      const caseworkerUser = req.session.user;
      const caseReference = req.session.userCase.id;

      const client = new CosApiClient(caseworkerUser.accessToken, 'https://return-url');

      const caseDataFromCos = await client.retrieveByCaseId(caseReference, caseworkerUser);
      Object.assign(req.session.userCase, caseDataFromCos);

      // console.log(req.session.userCase);
      req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
        if (respondent?.value?.user?.idamId === req.session?.user.id) {
          if (req.url.includes('allegations-of-harm-and-violence')) {
            setSafetyConcerns(respondent, req);
          }
        }
      });

      const caseData = toApiFormat(req?.session?.userCase);
      caseData.id = caseReference;
      const updatedCaseDataFromCos = await client.updateCase(
        caseworkerUser,
        caseReference,
        caseData,
        EVENT_RESPONDENT_MIAM
      );
      Object.assign(req.session.userCase, updatedCaseDataFromCos);
      req.session.save(() => res.redirect(RESPOND_TO_APPLICATION));
    } catch (err) {
      throw new Error('SafetyConcernsPostController - Case could not be updated.');
    }
  }
}
