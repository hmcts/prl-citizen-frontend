// eslint-disable-next-line import/no-unresolved
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getNextStepUrl } from '../../steps';
import { RESPONDENT_TASK_LIST_URL, SAVE_AND_SIGN_OUT, UPLOAD_DOCUMENT_SUCCESS } from '../../steps/urls';
import { getSystemUser } from '../auth/user/oidc';
import { getCaseApi } from '../case/CaseApi';
import { CosApiClient } from '../case/CosApiClient';
import { Case, CaseWithId } from '../case/case';
import { CITIZEN_SAVE_AND_CLOSE, CITIZEN_UPDATE, CaseData } from '../case/definition';
import { toApiFormat } from '../case/to-api-format';
import { Form, FormFields, FormFieldsFn } from '../form/Form';
import { ValidationError } from '../form/validation';

import { AppRequest } from './AppRequest';

@autobind
export class PostController<T extends AnyObject> {
  //protected ALLOWED_RETURN_URLS: string[] = [CHECK_ANSWERS_URL];
  constructor(protected readonly fields: FormFields | FormFieldsFn) {}
  /**
   * Parse the form body and decide whether this is a save and sign out, save and continue or session time out
   */
  public async post(req: AppRequest<T>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);

    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);

    if (req.body.saveAndSignOut) {
      await this.saveAndSignOut(req, res, formData);
    } else if (req.body.saveBeforeSessionTimeout) {
      await this.saveBeforeSessionTimeout(req, res, formData);
    } else if (req.body.accessCodeCheck) {
      await this.checkCaseAccessCode(req, res, form, formData);
    } else {
      await this.saveAndContinue(req, res, form, formData);
    }
  }

  private async saveAndSignOut(req: AppRequest<T>, res: Response, formData: Partial<Case>): Promise<void> {
    try {
      await this.save(req, formData, CITIZEN_SAVE_AND_CLOSE);
    } catch {
      // ignore
    }
    res.redirect(SAVE_AND_SIGN_OUT);
  }

  private async saveBeforeSessionTimeout(req: AppRequest<T>, res: Response, formData: Partial<Case>): Promise<void> {
    try {
      await this.save(req, formData, this.getEventName(req));
    } catch {
      // ignore
    }
    res.end();
  }

  private async saveAndContinue(req: AppRequest<T>, res: Response, form: Form, formData: Partial<Case>): Promise<void> {
    Object.assign(req.session.userCase, formData);
    req.session.errors = form.getErrors(formData);
    console.log('errors are:', req.session.errors);
    this.filterErrorsForSaveAsDraft(req);

    if (req.session.errors.length) {
      return this.redirect(req, res);
    }

    const data = toApiFormat(formData);

    if (Object.keys(data).length !== 0) {
      req.session.userCase = await this.saveData(req, formData, this.getEventName(req), data);
    }

    if (req.originalUrl.includes(UPLOAD_DOCUMENT_SUCCESS)) {
      if (req?.session?.userCase?.applicantUploadFiles) {
        req.session.userCase['applicantUploadFiles'] = [];
      }
    }

    //this.checkReturnUrlAndRedirect(req, res, this.ALLOWED_RETURN_URLS);
    this.redirect(req, res);
  }

  protected filterErrorsForSaveAsDraft(req: AppRequest<T>): void {
    if (req.body.saveAsDraft) {
      // skip empty field errors in case of save as draft
      req.session.errors = req.session.errors?.filter(
        item =>
          item.errorType !== ValidationError.REQUIRED &&
          item.errorType !== ValidationError.NOT_SELECTED &&
          item.errorType !== ValidationError.NOT_UPLOADED
      );
    }
  }

  protected async save(req: AppRequest<T>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    try {
      Object.assign(req.session.userCase, formData);
      // call here to get the case details //
      const caseworkerUser = await getSystemUser();
      req.locals.api = getCaseApi(caseworkerUser, req.locals.logger);
      const caseReference = req.session.userCase.caseCode;
      const caseData = await req.locals.api.getCaseById(caseReference as string);
      console.log('case details ====> ' + JSON.stringify(caseData));
      req.session.userCase = await req.locals.api.triggerEvent(req.session.userCase.id, formData, eventName);
    } catch (err) {
      req.locals.logger.error('Error saving', err);
      req.session.errors = req.session.errors || [];
      req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
    }
    return req.session.userCase;
  }

  protected async saveData(
    req: AppRequest<T>,
    formData: Partial<Case>,
    eventName: string,
    data: Partial<CaseData>
  ): Promise<CaseWithId> {
    try {
      console.log(eventName);
      //Object.assign(req.session.userCase, formData);
      req.session.userCase = await req.locals.api.triggerEventWithData(
        req.session.userCase.id,
        formData,
        eventName,
        data
      );
    } catch (err) {
      req.locals.logger.error('Error saving', err);
      req.session.errors = req.session.errors || [];
      req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
    }
    return req.session.userCase;
  }

  protected redirect(req: AppRequest<T>, res: Response, nextUrl?: string): void {
    let target;
    if (req.body['saveAsDraft']) {
      //redirects to task-list page in case of save-as-draft button click
      req.session.returnUrl = undefined;
      target = RESPONDENT_TASK_LIST_URL; //changed from task_list_url to respondent_taskList_url
    } else if (req.session.errors?.length) {
      //redirects to same page in case of validation errors
      target = req.url;
    } else {
      //redirects to input nextUrl if present otherwise calls getNextStepUrl to get the next step url
      target = nextUrl || getNextStepUrl(req, req.session.userCase);
    }

    req.session.save(err => {
      if (err) {
        throw err;
      }
      res.redirect(target);
    });
  }

  // method to check if there is a returnUrl in session and
  // it is one of the allowed redirects from current page
  protected checkReturnUrlAndRedirect(req: AppRequest<T>, res: Response, allowedReturnUrls: string[]): void {
    const returnUrl = req.session.returnUrl;
    if (returnUrl && allowedReturnUrls.includes(returnUrl)) {
      req.session.returnUrl = undefined;
      this.redirect(req, res, returnUrl);
    } else {
      this.redirect(req, res);
    }
  }

  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected getEventName(req: AppRequest): string {
    return CITIZEN_UPDATE;
  }

  private async checkCaseAccessCode(
    req: AppRequest<T>,
    res: Response,
    form: Form,
    formData: Partial<CaseWithId>
  ): Promise<void> {
    // if (req?.session?.userCase) {
    //   Object.assign(req?.session?.userCase, formData);
    // } else {
    //   const initData = { id: ' ', state: State.successAuthentication, serviceType: '', ...formData };
    //   req.session.userCase = initData;
    // }
    /*
    const caseworkerUser = await getSystemUser();
        const caseReference = formData.caseCode?.replace(/-/g, '');
        const accessCode = formData.accessCode?.replace(/-/g, '');
        // req.locals.api = getCaseApi(caseworkerUser, req.locals.logger);
        req.session.errors = form.getErrors(formData);

        try {
          if (!req.session.errors.length) {
            const client = new CosApiClient(caseworkerUser.accessToken, 'http://localhost:3001');
            const accessCodeValidated = await client.validateAccessCode(caseReference as string, accessCode as string, caseworkerUser);
            console.log(accessCodeValidated);
            if (accessCodeValidated === 'linked') {
              req.session.errors.push({ errorType: 'accesscodeAlreadyLinked', propertyName: 'accessCode' });
            } else if (accessCodeValidated !== 'valid') {
              req.session.errors.push({ errorType: 'invalidAccessCode', propertyName: 'accessCode' });
            }
          }
        } catch (err) {
          req.session.errors.push({ errorType: 'invalidReference', propertyName: 'caseCode' });
        }

      if (req.session.errors.length) {
        req.session.accessCodeLoginIn = false;
      } else {
        const initData = {
          id: formData.id || '',
          state: State.successAuthentication,
          serviceType: '',
          ...formData,
        };
        req.session.userCase = initData;
        req.session.accessCodeLoginIn = true;
      }

      this.redirect(req, res);
    }
  }*/

    // if (req?.session?.userCase) {
    //   Object.assign(req?.session?.userCase, formData);
    // } else {
    //   const initData = { id: ' ', state: State.successAuthentication, serviceType: '', ...formData };
    //   req.session.userCase = initData;
    // }

    const caseworkerUser = await getSystemUser();
    const caseReference = formData.caseCode?.replace(/-/g, '');
    const accessCode = formData.accessCode?.replace(/-/g, '');
    // req.locals.api = getCaseApi(caseworkerUser, req.locals.logger);
    req.session.errors = form.getErrors(formData);

    try {
      if (!req.session.errors.length) {
        //const caseData = await req.locals.api.getCaseById(caseReference as string);

        const client = new CosApiClient(caseworkerUser.accessToken, 'https://return-url');
        const caseDataFromCos = await client.retrieveByCaseId(caseReference as string, caseworkerUser);
        req.session.userCase = caseDataFromCos;
        //console.log('caseDataFromCos=======>' + JSON.stringify(caseDataFromCos));

        // const updatedCaseDataFromCos = await client.updateCase(
        //   caseworkerUser,
        //   caseReference as string,
        //   caseDataFromCos,
        //   'internal-update-application-tab'
        // );

        // let accessCodeMatched = false;
        // let accessCodeLinked = false;
        // if (caseData.respondentCaseInvites !== null) {
        //   caseData.respondentCaseInvites?.forEach(obj => {
        //     Object.entries(obj).forEach(([key, value]) => {
        //       console.log(key);
        //       Object.entries(value).forEach(([key1, value1]) => {
        //         if (key1 === 'hasLinked' && value1 === 'Yes') {
        //           accessCodeLinked = true;
        //         } else {
        //           accessCodeLinked = false;
        //         }
        //         if (key1 === 'accessCode' && value1 === formData.accessCode) {
        //           accessCodeMatched = true;
        //         }
        //       });
        //     });
        //   });
        // }
        // if (caseData.applicantCaseInvites !== null) {
        //   caseData.applicantCaseInvites?.forEach(obj => {
        //     Object.entries(obj).forEach(([key, value]) => {
        //       console.log(key);
        //       Object.entries(value).forEach(([key1, value1]) => {
        //         if (key1 === 'hasLinked' && value1 === 'Yes') {
        //           accessCodeLinked = true;
        //         } else {
        //           accessCodeLinked = false;
        //         }
        //         if (key1 === 'accessCode' && value1 === formData.accessCode) {
        //           accessCodeMatched = true;
        //         }
        //       });
        //     });
        //   });
        // }
        // if (!accessCodeMatched) {
        //   req.session.errors.push({ errorType: 'invalidAccessCode', propertyName: 'accessCode' });
        // }
        // if (accessCodeLinked) {
        //   req.session.errors.push({ errorType: 'accesscodeAlreadyLinked', propertyName: 'accessCode' });
        // }
        const accessCodeValidated = await client.validateAccessCode(caseReference as string, accessCode as string, caseworkerUser);
        console.log(accessCodeValidated);
        if (accessCodeValidated === 'linked') {
          req.session.errors.push({ errorType: 'accesscodeAlreadyLinked', propertyName: 'accessCode' });
        } else if (accessCodeValidated !== 'valid') {
          req.session.errors.push({ errorType: 'invalidAccessCode', propertyName: 'accessCode' });
        }
      }
    } catch (err) {
      console.log('Retrieving case failed with error: ' + err);
      req.session.errors.push({ errorType: 'invalidReference', propertyName: 'caseCode' });
    }

    req.session.errors = form.getErrors(formData);
    if (req.session.errors.length) {
      req.session.accessCodeLoginIn = false;
    } else {
      req.session.accessCodeLoginIn = true;
    }
    this.redirect(req, res);
  }
}

export type AnyObject = Record<string, unknown>;
