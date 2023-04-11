import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { CosApiClient } from '../../../app/case/CosApiClient';
import { Applicant, Respondent, YesOrNo } from '../../../app/case/definition';
import { toApiFormat } from '../../../app/case/to-api-format';
import { AppRequest } from '../../../app/controller/AppRequest';
import { AnyObject, PostController } from '../../../app/controller/PostController';
import { FormFields, FormFieldsFn } from '../../../app/form/Form';
import {
  APPLICANT_PRIVATE_DETAILS_CONFIRMED,
  APPLICANT_PRIVATE_DETAILS_NOT_CONFIRMED,
  RESPONDENT_PRIVATE_DETAILS_CONFIRMED,
  RESPONDENT_PRIVATE_DETAILS_NOT_CONFIRMED,
} from '../../../steps/urls';

import { mapConfidentialListToFields, prepareKeepDetailsPrivateRequest } from './KeepYourDetailsPrivateMapper';

@autobind
export class KeepDetailsPrivatePostController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async c100Respondent(req: AppRequest<AnyObject>): Promise<void> {
    req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
      if (respondent?.value?.user?.idamId === req.session?.user.id) {
        respondent.value.response = prepareKeepDetailsPrivateRequest(req).response!;
      }
    });
  }

  public async c100Applicant(req: AppRequest<AnyObject>): Promise<void> {
    req.session.userCase?.applicants?.forEach((applicant: Applicant) => {
      if (applicant?.value?.user?.idamId === req.session?.user.id) {
        const preparedRequest = prepareKeepDetailsPrivateRequest(req);
        applicant.value.response = preparedRequest.response!;
        Object.assign(applicant.value, {
          ...mapConfidentialListToFields(preparedRequest),
        });
      }
    });
  }

  public async FL401Respondent(req: AppRequest<AnyObject>): Promise<void> {
    if (req.session.userCase?.respondentsFL401?.user?.idamId === req.session?.user.id) {
      req.session.userCase.respondentsFL401.response = prepareKeepDetailsPrivateRequest(req).response!;
    }
  }

  public async FL401Applicant(req: AppRequest<AnyObject>): Promise<void> {
    if (req.session.userCase?.applicantsFL401?.user?.idamId === req.session?.user.id) {
      req.session.userCase.applicantsFL401.response = prepareKeepDetailsPrivateRequest(req).response!;
    }
  }

  public async post(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const loggedInCitizen = req.session.user;
    const caseReference = req.session.userCase.id;
    const client = new CosApiClient(loggedInCitizen.accessToken, 'https://return-url');

    const caseDataFromCos = await client.retrieveByCaseId(caseReference, loggedInCitizen);
    Object.assign(req.session.userCase, caseDataFromCos);
    if (req.session.userCase.caseTypeOfApplication === 'C100') {
      if (req.url.includes('respondent')) {
        this.c100Respondent(req);
      } else {
        this.c100Applicant(req);
      }
    } else {
      if (req.url.includes('respondent')) {
        this.FL401Respondent(req);
      } else {
        this.FL401Applicant(req);
      }
    }

    const caseData = toApiFormat(req?.session?.userCase);
    caseData.id = caseReference;
    const updatedCaseDataFromCos = await client.updateCase(
      loggedInCitizen,
      caseReference,
      caseData,
      'linkCitizenAccount'
    );
    Object.assign(req.session.userCase, updatedCaseDataFromCos);

    let redirectUrl;
    if (req.url.includes('respondent')) {
      redirectUrl = RESPONDENT_PRIVATE_DETAILS_CONFIRMED;
    } else {
      redirectUrl = APPLICANT_PRIVATE_DETAILS_CONFIRMED;
    }

    if (req.session.userCase.startAlternative === YesOrNo.NO) {
      if (req.url.includes('respondent')) {
        redirectUrl = RESPONDENT_PRIVATE_DETAILS_NOT_CONFIRMED;
      } else {
        redirectUrl = APPLICANT_PRIVATE_DETAILS_NOT_CONFIRMED;
      }
    }
    req.session.save(() => res.redirect(redirectUrl));
  }
}
