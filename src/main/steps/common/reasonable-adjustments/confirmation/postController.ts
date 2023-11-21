import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { getCasePartyType } from '../../../prl-cases/dashboard/utils';
import { PARTY_TASKLIST, RESPOND_TO_APPLICATION } from '../../../urls';
import { applyParms } from '../../url-parser';

@autobind
export default class ReasonableAdjustmentsConfirmationPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { onlyContinue } = req.body;

    if (onlyContinue) {
      const { userCase: caseData, user: userDetails, applicationSettings: appSettings } = req.session;
      const partyType = getCasePartyType(caseData, userDetails.id);

      if (appSettings?.navfromRespondToApplication) {
        return super.redirect(req, res, RESPOND_TO_APPLICATION);
      }

      return super.redirect(req, res, applyParms(PARTY_TASKLIST, { partyType }));
    } else {
      return super.redirect(req, res, req.originalUrl);
    }
  }
}
