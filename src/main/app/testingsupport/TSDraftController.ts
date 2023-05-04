import autobind from 'autobind-decorator';
import type { Response } from 'express';

import { C100_CHECK_YOUR_ANSWER, HOME_URL } from '../../steps/urls';
import { CaseWithId } from '../case/case';
import { C100_CASE_EVENT } from '../case/definition';
import { AppRequest } from '../controller/AppRequest';
import { AnyObject, PostController } from '../controller/PostController';
import { FormFields, FormFieldsFn } from '../form/Form';

@autobind
export class TSDraftController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest, res: Response): Promise<void> {
    this.redirect(req, res, HOME_URL);
  }

  public async createTSC100Draft(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    try {
      const newCaseId = (await req.locals.C100Api.createCaseTestingSupport()) as unknown as string;
      req.session.userCase = (await req.locals.C100Api.retrieveCaseById(newCaseId)) as CaseWithId;
      req.session.save(() => {
        res.redirect(C100_CHECK_YOUR_ANSWER);
      });
    } catch (e) {
      throw new Error('C100case could not be created');
    }
  }

  public async deleteTSC100Draft(req: AppRequest<AnyObject>, res: Response): Promise<void> {
    const data = req.body['ids'] as string;
    const value = data.split(',');
    value.forEach(element => {
      this.deleteC100Draft(req, element, res);
    });
  }

  private async deleteC100Draft(req: AppRequest<AnyObject>, element: string, res: Response<any, Record<string, any>>) {
    try {
      const caseData = {};
      await req.locals.C100Api.updateCase(element, caseData, HOME_URL, C100_CASE_EVENT.DELETE_CASE);
      req.session.save(() => {
        res.redirect(HOME_URL);
      });
    } catch (e) {
      throw new Error('C100case could not be deleted');
    }
  }
}
