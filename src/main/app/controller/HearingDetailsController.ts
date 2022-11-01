import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { APPLICANT_TASK_LIST_URL, RESPONDENT_TASK_LIST_URL } from '../../../main/steps/urls';
import { CosApiClient } from '../case/CosApiClient';
import { YesOrNo } from '../case/definition';
import type { AppRequest } from '../controller/AppRequest';
import { AnyObject, PostController } from '../controller/PostController';
import { Form, FormFields, FormFieldsFn } from '../form/Form';

@autobind
export class HearingDetailsController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async sendHearingDetailsNotification(req: AppRequest, res: Response): Promise<void> {
    let isApplicant;
    if (req.query && req.query.isApplicant) {
      isApplicant = req.query.isApplicant;
    }

    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);

    const { _csrf, ...formData } = form.getParsedBody(req.body);
    const caseworkerUser = req.session.user;
    req.session.errors = form.getErrors(formData);

    const partyName = this.getPartyName(isApplicant, req);
    const caseId = req.session.userCase.id;
    const partyId = req.session.user.id;

    const client = new CosApiClient(caseworkerUser.accessToken, 'http://localhost:3001');

    const hearingNotificationStatusFromCos = await client.HearingDetailsNotification(
      caseworkerUser,
      caseId,
      partyName,
      'hearings-notification',
      partyId
    );
    if ('SUCCESS' !== hearingNotificationStatusFromCos) {
      req.session.errors.push({ errorType: 'Notification could not be sent', propertyName: '' });
    } else {
      this.redirect(req, res, this.setRedirectUrl(isApplicant));
    }
  }

  private setRedirectUrl(isApplicant) {
    let redirectUrl = '';
    if (YesOrNo.YES === isApplicant) {
      redirectUrl = APPLICANT_TASK_LIST_URL;
    } else {
      redirectUrl = RESPONDENT_TASK_LIST_URL;
    }
    return redirectUrl;
  }

  private getPartyName(isApplicant, req: AppRequest<AnyObject>) {
    let partyName = '';
    if (YesOrNo.YES === isApplicant) {
      if (req.session.userCase?.caseTypeOfApplication === 'C100') {
        req.session.userCase?.applicants?.forEach(applicant => {
          if (applicant.value?.user?.idamId === req.session.user.id) {
            partyName = applicant.value?.firstName + ' ' + applicant.value?.lastName;
          }
        });
      } else {
        if (req.session.userCase?.applicantsFL401?.user?.idamId === req.session.user.id) {
          partyName =
            req.session.userCase.applicantsFL401?.firstName + ' ' + req.session.userCase.applicantsFL401?.lastName;
        }
      }
    } else {
      if (req.session.userCase?.caseTypeOfApplication === 'C100') {
        req.session.userCase?.respondents?.forEach(respondent => {
          if (respondent.value?.user?.idamId === req.session.user.id) {
            partyName = respondent.value?.firstName + ' ' + respondent.value?.lastName;
          }
        });
      } else {
        if (req.session.userCase?.respondentsFL401?.user?.idamId === req.session.user.id) {
          partyName =
            req.session.userCase.respondentsFL401?.firstName + ' ' + req.session.userCase.respondentsFL401?.lastName;
        }
      }
    }
    return partyName;
  }
}
