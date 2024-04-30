import autobind from 'autobind-decorator';
import { Response } from 'express';

import { CaseWithId, FieldPrefix } from '../../../app/case/case';
import { AppRequest } from '../../../app/controller/AppRequest';
import { GetController, TranslationFn } from '../../../app/controller/GetController';
import { C100_CHILD_ADDRESS } from '../../urls';

@autobind
export default class C100StartGetController extends GetController {
  constructor(
    protected readonly view: string,
    protected readonly content: TranslationFn,
    protected readonly fieldPrefix: FieldPrefix
  ) {
    super(view, content);
  }

  public async get(req: AppRequest, res: Response): Promise<void> {
    const userDeatils = req?.session?.user;
    if (userDeatils) {
      try {
        const {
          id: caseId,
          caseTypeOfApplication,
          state,
          noOfDaysRemainingToSubmitCase,
        } = await req.locals.C100Api.createCase();

        req.session.userCase = {
          caseId,
          caseTypeOfApplication,
          state,
          noOfDaysRemainingToSubmitCase,
        } as CaseWithId;
        req.session.userCaseList = [];
        req.session.save(() => {
          res.redirect(C100_CHILD_ADDRESS);
        });
      } catch (e) {
        throw new Error('case could not be created-createC100ApplicantCase');
      }
    }
  }
}
