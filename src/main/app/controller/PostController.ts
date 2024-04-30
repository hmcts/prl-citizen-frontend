// eslint-disable-next-line import/no-unresolved
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getNextStepUrl } from '../../steps';
import PreProcessCaseData from '../../steps/c100-rebuild/PreProcessCaseData';
import { applyParms } from '../../steps/common/url-parser';
import { C100_URL, PARTY_TASKLIST } from '../../steps/urls';
import { Case, CaseWithId } from '../case/case';
import { PartyType } from '../case/definition';
import { Form, FormFields, FormFieldsFn } from '../form/Form';
import { ValidationError } from '../form/validation';

import { AppRequest } from './AppRequest';
console.info('** FOR SONAR **');
@autobind
export class PostController<T extends AnyObject> {
  //protected ALLOWED_RETURN_URLS: string[] = [CHECK_ANSWERS_URL];
  constructor(protected readonly fields: FormFields | FormFieldsFn) {}
  /**
   * Parse the form body and decide whether this is a save and sign out, save and continue or session time out
   */
  public async post(req: AppRequest<T>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase, req) : this.fields;
    const form = new Form(fields);

    const { _csrf, ...formData } = form.getParsedBody(req.body);

    if (req.body.onlyContinue) {
      await this.onlyContinue(req, res, form, formData);
    } else if (req.body.saveAndComeLater) {
      await this.saveAndComeLater(req, res, formData);
    } else {
      await this.saveAndContinue(req, res, form, formData);
    }
  }

  private async saveAndContinue(req: AppRequest<T>, res: Response, form: Form, formData: Partial<Case>): Promise<void> {
    req.session.userCase = {
      ...(req.session.userCase ?? {}),
      ...formData,
    };

    req.session.errors = form.getErrors(formData);
    this.filterErrorsForSaveAsDraft(req);

    if (req.session.errors.length) {
      return this.redirect(req, res);
    }

    req.session.userCase = {
      ...PreProcessCaseData.clean(this.fields, req, formData, req.session.userCase, !req.path.startsWith(C100_URL)),
    };

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

  protected redirect(req: AppRequest<T>, res: Response, nextUrl?: string): void {
    let target;
    if (req.session.errors?.length) {
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
        await req.locals.C100Api.saveC100DraftApplication(
          req.session.userCase!.caseId!,
          req.session.userCase,
          req.originalUrl
        );
        //update latest reutrn URL in the session
        req.session.userCase.c100RebuildReturnUrl = req.originalUrl;
        req.session.save(() => {
          res.redirect(applyParms(PARTY_TASKLIST, { partyType: PartyType.APPLICANT }));
        });
      } catch (e) {
        this.redirect(req, res, req.originalUrl);
      }
    } else {
      this.redirect(req, res, req.originalUrl);
    }
  }
}

export type AnyObject = Record<string, unknown>;
