import type { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { Applicant, Respondent, YesOrNo } from '../../../app/case/definition';
import { toApiFormat } from '../../../app/case/to-api-format';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import { APPLICANT_VIEW_ALL_DOCUMENTS, RESPONDENT_VIEW_ALL_DOCUMENTS } from '../../../steps/urls';

export class ViewAllDocumentsPostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public static async setAllDocumentsViewedC100Respondent(req: AppRequest<AnyObject>): Promise<void> {
    req.session.userCase.respondents?.forEach((respondent: Respondent) => {
      if (respondent?.value.user?.idamId === req.session?.user?.id) {
        if (respondent.value.response && respondent.value.response.citizenFlags) {
          respondent.value.response.citizenFlags.isAllDocumentsViewed = YesOrNo.YES;
        }
      }
    });
  }

  public static async setAllDocumentsViewedC100Applicant(req: AppRequest<AnyObject>): Promise<void> {
    req.session.userCase.applicants?.forEach((applicant: Applicant) => {
      if (applicant?.value.user?.idamId === req.session?.user?.id) {
        if (applicant.value.response && applicant.value.response.citizenFlags) {
          applicant.value.response.citizenFlags.isAllDocumentsViewed = YesOrNo.YES;
        }
      }
    });
  }

  public static async setAllDocumentsViewedFL401Respondent(req: AppRequest<AnyObject>): Promise<void> {
    if (
      req?.session?.userCase.respondentsFL401?.response &&
      req?.session?.userCase.respondentsFL401?.response.citizenFlags
    ) {
      req.session.userCase.respondentsFL401.response.citizenFlags.isAllDocumentsViewed = YesOrNo.YES;
    }
  }

  public async setAllDocumentsViewed(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const isRespondent = req.url.includes('respondent');

    const client = new CosApiClient(req.session.user.accessToken, 'http://localhost:3001');
    const caseDataFromCos = await client.retrieveByCaseId(req?.session?.userCase.id, req.session.user);
    Object.assign(req.session.userCase, caseDataFromCos);

    if (req.session.userCase?.caseTypeOfApplication === 'C100') {
      if (isRespondent) {
        ViewAllDocumentsPostController.setAllDocumentsViewedC100Respondent(req);
      } else {
        ViewAllDocumentsPostController.setAllDocumentsViewedC100Applicant(req);
      }
    } else {
      if (isRespondent) {
        ViewAllDocumentsPostController.setAllDocumentsViewedFL401Respondent(req);
      } else {
        if (
          req?.session?.userCase.applicantsFL401?.response &&
          req?.session?.userCase.applicantsFL401?.response.citizenFlags
        ) {
          req.session.userCase.applicantsFL401.response.citizenFlags.isAllDocumentsViewed = YesOrNo.YES;
        }
      }
    }

    const data = toApiFormat(req?.session?.userCase);
    data.id = req?.session?.userCase.id;

    const updatedCaseDataFromCos = await client.updateCase(
      req.session.user,
      req?.session?.userCase.id,
      data,
      'legalRepresentation'
    );
    Object.assign(req.session.userCase, updatedCaseDataFromCos);

    let redirectUrl;
    if (isRespondent) {
      redirectUrl = RESPONDENT_VIEW_ALL_DOCUMENTS;
    } else {
      redirectUrl = APPLICANT_VIEW_ALL_DOCUMENTS;
    }
    req.session.save(() => res.redirect(redirectUrl));
  }
}
