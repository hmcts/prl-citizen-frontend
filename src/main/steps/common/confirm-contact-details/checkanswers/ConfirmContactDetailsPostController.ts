import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { CosApiClient } from '../../../../app/case/CosApiClient';
import { Applicant, CaseType, Respondent } from '../../../../app/case/definition';
import { toApiFormat } from '../../../../app/case/to-api-format';
import { AppRequest } from '../../../../app/controller/AppRequest';
import { AnyObject } from '../../../../app/controller/PostController';
import {
  APPLICANT_TASK_LIST_URL,
  C100_APPLICANT_TASKLIST,
  RESPONDENT_TASK_LIST_URL,
  RESPOND_TO_APPLICATION,
} from '../../../../steps/urls';

import {
  prepareRequest,
  //setContactDetails
} from './ContactDetailsMapper';

@autobind
export class ConfirmContactDetailsPostController {
  // constructor(protected readonly fields: FormFields | FormFieldsFn) {
  //   super(fields);
  // }

  public async c100Respondent(req: AppRequest<AnyObject>): Promise<void> {
    req.session.userCase?.respondents?.forEach((respondent: Respondent) => {
      if (respondent?.value?.user?.idamId === req.session?.user.id) {
        const { response, address, ...rest } = prepareRequest(req.session.userCase);
        respondent.value = {
          ...respondent.value,
          ...rest,
          address: {
            ...respondent.value.address,
            ...address,
          },
          response: {
            ...respondent.value.response,
            ...response,
          },
        };
      }
    });
  }

  public async c100Apllicant(req: AppRequest<AnyObject>): Promise<void> {
    req.session.userCase?.applicants?.forEach((applicant: Applicant) => {
      if (applicant?.value?.user?.idamId === req.session?.user.id) {
        //Object.assign(applicant.value, setContactDetails(applicant.value, req));
        // applicant.value = prepareRequest(req.session.userCase) as PartyDetails;
        const { response, address, ...rest } = prepareRequest(req.session.userCase);
        applicant.value = {
          ...applicant.value,
          ...rest,
          address: {
            ...applicant.value.address,
            ...address,
          },
          response: {
            ...applicant.value.response,
            ...response,
          },
        };
      }
    });
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
        this.c100Apllicant(req);
      }
    } else {
      if (
        req.url.includes('respondent') &&
        req.session.userCase?.respondentsFL401?.user?.idamId === req.session?.user.id
      ) {
        const { response, address, ...rest } = prepareRequest(req.session.userCase);
        req.session.userCase.respondentsFL401 = {
          ...req.session.userCase.respondentsFL401,
          ...rest,
          address: {
            ...req.session.userCase.respondentsFL401.address,
            ...address,
          },
          response: {
            ...req.session.userCase.respondentsFL401.response,
            ...response,
          },
        };
      } else {
        if (req.session.userCase?.applicantsFL401?.user?.idamId === req.session?.user.id) {
          const { response, address, ...rest } = prepareRequest(req.session.userCase);
          req.session.userCase.applicantsFL401 = {
            ...req.session.userCase.applicantsFL401,
            ...rest,
            address: {
              ...req.session.userCase.applicantsFL401.address,
              ...address,
            },
            response: {
              ...req.session.userCase.applicantsFL401.response,
              ...response,
            },
          };
        }
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
      redirectUrl = req.session.applicationSettings?.navfromRespondToApplication
        ? RESPOND_TO_APPLICATION
        : RESPONDENT_TASK_LIST_URL;
    } else {
      if (req.session.userCase.caseTypeOfApplication === CaseType.C100) {
        redirectUrl = C100_APPLICANT_TASKLIST;
      } else {
        redirectUrl = APPLICANT_TASK_LIST_URL;
      }
    }

    req.session.save(() => res.redirect(redirectUrl));
  }
}
