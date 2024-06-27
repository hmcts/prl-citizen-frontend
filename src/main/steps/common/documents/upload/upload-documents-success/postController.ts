/* eslint-disable @typescript-eslint/no-explicit-any */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { AppRequest } from '../../../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../../../app/controller/PostController';
import { applyParms } from '../../../../../steps/common/url-parser';
import { getCasePartyType } from '../../../../../steps/prl-cases/dashboard/utils';
import { FETCH_CASE_DETAILS, UPLOAD_DOCUMENT } from '../../../../../steps/urls';
import { resetUploadDocumentSessionData } from '../../upload/utils';

@autobind
export default class UploadDocumentSuccessPostController extends PostController<AnyObject> {
  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const { returnToCaseView, returnToUploadDoc } = req.body;

    resetUploadDocumentSessionData(req);

    if (returnToCaseView) {
      return this.redirect(req, res, applyParms(FETCH_CASE_DETAILS, { caseId: req.session.userCase.id }));
    }

    if (returnToUploadDoc) {
      this.redirect(
        req,
        res,
        applyParms(UPLOAD_DOCUMENT, { partyType: getCasePartyType(req.session.userCase, req.session.user.id) })
      );
    }
  }
}
