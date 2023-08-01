import autobind from 'autobind-decorator';
import { Response } from 'express';

import { PartyType } from '../../../../app/case/definition';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject } from '../../../../app/controller/PostController';
import { getCasePartyType } from '../../../../steps/prl-cases/dashboard/utils';
import { APPLICANT, RESPONDENT, VIEW_ALL_DOCUMENTS } from '../../../../steps/urls';

@autobind
export default class AllDocumentsGetController {
  public async get(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    req.session.applicationSettings = {
      ...req.session.applicationSettings,
      docType: req.params.docType,
      docToView: {
        uploadedBy: req.params.uploadedBy,
        partyName: req.params.partyName,
      },
    };

    const url =
      getCasePartyType(req.session.userCase, req.session.user.id) === PartyType.APPLICANT ? APPLICANT : RESPONDENT;

    req.session.save(error => {
      if (error) {
        throw error;
      }
      res.redirect(url + VIEW_ALL_DOCUMENTS + '/' + req.params.docType);
    });
  }
}
