import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { Respondent } from '../../../app/case/definition';
import { toApiFormat } from '../../../app/case/to-api-format';
import type { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { EVENT_INTERNATIONAL_ELEMENT, URL_PATTERN_INTERNATIONAL_FACTORS } from '../../../steps/constants';
import { RESPOND_TO_APPLICATION } from '../../../steps/urls';

import { setInternationalFactorsDetails } from './InternationalFactorsMapper';
@autobind
export class InternationalFactorsPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }
  public async post(req: AppRequest, res: Response): Promise<void> {
    try {
      const loggedInUserFromSession = req.session.user;
      const ccdCaseNumber = req.session.userCase.id;

      const client = new CosApiClient(loggedInUserFromSession.accessToken, 'https://return-url');

      const caseDataFromCos = await client.retrieveByCaseId(ccdCaseNumber, loggedInUserFromSession);
      Object.assign(req.session.userCase, caseDataFromCos);

      req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
        if (respondent?.value?.user?.idamId === req.session?.user.id) {
          if (req.url.includes(URL_PATTERN_INTERNATIONAL_FACTORS)) {
            setInternationalFactorsDetails(respondent, req);
          }
        }
      });

      const caseData = toApiFormat(req?.session?.userCase);
      caseData.id = ccdCaseNumber;
      const updatedCaseDataFromCos = await client.updateCase(
        loggedInUserFromSession,
        ccdCaseNumber,
        caseData,
        EVENT_INTERNATIONAL_ELEMENT
      );
      Object.assign(req.session.userCase, updatedCaseDataFromCos);

      req.session.save(() => res.redirect(RESPOND_TO_APPLICATION));
    } catch (err) {
      throw new Error('InternationalFactorsPostController - Case could not be updated.');
    }
  }
}
