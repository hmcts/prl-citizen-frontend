// eslint-disable-next-line import/no-unresolved
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getNextStepUrl } from '../../steps';
import PreProcessCaseData from '../../steps/c100-rebuild/PreProcessCaseData';
import { ApplicantUploadFiles, RespondentUploadFiles, UploadDocumentSucess } from '../../steps/constants';
import { C100_URL, DASHBOARD_URL, RESPONDENT_TASK_LIST_URL, SAVE_AND_SIGN_OUT } from '../../steps/urls';
import { getSystemUser } from '../auth/user/oidc';
import { getCaseApi } from '../case/CaseApi';
import { CosApiClient } from '../case/CosApiClient';
import { Case, CaseWithId } from '../case/case';
import { C100_CASE_EVENT, CITIZEN_SAVE_AND_CLOSE, CITIZEN_UPDATE, CaseData, State } from '../case/definition';
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
    } else if (req.body.onlyContinue) {
      await this.onlyContinue(req, res, form, formData);
    } else if (req.body.saveAndComeLater) {
      await this.saveAndComeLater(req, res, formData);
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
    req.session.userCase = {
      ...(req.session.userCase ?? {}),
      ...formData,
    };

    req.session.errors = form.getErrors(formData);
    console.log('errors are:', req.session.errors);
    this.filterErrorsForSaveAsDraft(req);

    if (req.session.errors.length) {
      return this.redirect(req, res);
    }

    req.session.userCase = {
      ...PreProcessCaseData.clean(this.fields, formData, req.session.userCase, !req.path.startsWith(C100_URL)),
    };

    if (req.originalUrl.includes(UploadDocumentSucess)) {
      if (req?.session?.userCase?.applicantUploadFiles) {
        req.session.userCase[ApplicantUploadFiles] = [];
      }
      if (req?.session?.userCase?.respondentUploadFiles) {
        req.session.userCase[RespondentUploadFiles] = [];
      }
    }

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
      const citizenUser = req.session.user;
      req.locals.api = getCaseApi(citizenUser, req.locals.logger);
      const caseReference = req.session.userCase.caseCode;
      const caseData = await req.locals.api.getCaseById(caseReference as string);
      console.log('Saving data for case : ' + JSON.stringify(caseData.id));
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
    const caseworkerUser = await getSystemUser();
    const caseReference = formData.caseCode?.replace(/-/g, '');
    const accessCode = formData.accessCode?.replace(/-/g, '');

    req.session.errors = form.getErrors(formData);

    try {
      if (!req.session.errors.length) {
        const client = new CosApiClient(caseworkerUser.accessToken, 'http://localhost:3001');
        const accessCodeValidated = await client.validateAccessCode(
          caseReference as string,
          accessCode as string,
          caseworkerUser
        );
        if (accessCodeValidated === 'Linked') {
          req.session.errors.push({ errorType: 'accesscodeAlreadyLinked', propertyName: 'accessCode' });
        } else if (accessCodeValidated !== 'Valid') {
          req.session.errors.push({ errorType: 'invalidAccessCode', propertyName: 'accessCode' });
        }
      }
    } catch (err) {
      console.log('Retrieving case failed with error: ' + err);
      req.session.errors.push({ errorType: 'invalidReference', propertyName: 'caseCode' });
    }

    if (req.session.errors.length) {
      req.session.accessCodeLoginIn = false;
    } else {
      req.session.accessCodeLoginIn = true;
      if (req?.session?.userCase) {
        Object.assign(req?.session?.userCase, formData);
      } else {
        const initData = {
          id: caseReference as string,
          state: State.successAuthentication,
          serviceType: '',
          ...formData,
        };
        req.session.userCase = initData;
      }
    }
    this.redirect(req, res);
  }

  /**
   * It takes a request, response, form and form data, and then assigns the form data to the user case
   * in the session, and then sets the errors in the session to the errors from the form, and then
   * filters the errors for save as draft, and then if there are errors in the session, it redirects to
   * the same page, otherwise it redirects to the same page
   * @param req - AppRequest<T> - this is the request object that is passed to the controller. It
   * contains the session, the body, the query and the params.
   * @param {Response} res - Response - the response object
   * @param {Form} form - Form - the form object that is being used to render the page
   * @param formData - The data that was submitted by the user
   * @returns a promise.
   */
  private async onlyContinue(req: AppRequest<T>, res: Response, form: Form, formData: Partial<Case>): Promise<void> {
    Object.assign(req.session.userCase, formData);
    req.session.errors = form.getErrors(formData);
    this.filterErrorsForSaveAsDraft(req);
    if (req.session.errors.length) {
      return this.redirect(req, res);
    }

    this.redirect(req, res);
  }

  /** Added for C100 Rebuild */
  protected async saveAndComeLater(
    req: AppRequest<T>,
    res: Response,
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    formData: Partial<CaseWithId> | any
  ): Promise<void> {
    if (req.path.startsWith(C100_URL)) {
      try {
        req.session.errors = [];
        Object.assign(req.session.userCase, formData);
        await req.locals.C100Api.updateCase(
          req.session.userCase!.caseId!,
          req.session.userCase,
          req.originalUrl,
          C100_CASE_EVENT.CASE_UPDATE
        );
        req.session.userCase = {} as CaseWithId;
      } finally {
        this.redirect(req, res, DASHBOARD_URL);
      }
    } else {
      this.redirect(req, res, req.originalUrl);
    }
  }
}

export type AnyObject = Record<string, unknown>;
