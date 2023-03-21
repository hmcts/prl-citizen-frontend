import { CaseWithId } from '../case/case';
import { AppRequest } from '../controller/AppRequest';
import { AnyObject, PostController } from '../controller/PostController';
import { FormFields, FormFieldsFn } from '../form/Form';
import autobind from 'autobind-decorator';
import type { Response } from 'express';
import { C100_CASE_NAME, HOME_URL } from '../../steps/urls';

@autobind
export class TSDraftController extends PostController<AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {
    super(fields);
  }

  public async post(req: AppRequest, res: Response): Promise<void> {
    this.redirect(req, res, HOME_URL);
  }

  public async createC100Draft(req: AppRequest<AnyObject>, res: Response): Promise<void> {
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
          res.redirect(C100_CASE_NAME);
        });
      } catch (e) {
        throw new Error('C100 draft case could not be created');
      }
    }

    // const client = new CosApiClient(loggedInCitizen.accessToken, 'http://localhost:3001');
    // const response = await client.generateUserUploadedStatementDocument(
    //   loggedInCitizen,
    //   generateAndUploadDocumentRequest
    // );
    // if (response.status !== 200) {
    //   if (!req.session.errors) {
    //     req.session.errors = [];
    //   }
    //   req.session.errors?.push({ errorType: 'C100 draft could not be created', propertyName: 'Create C100 draft' });
    // } else {
    //   const caseDetailsFromCos = await client.retrieveByCaseId(req.session.userCase.id, loggedInCitizen);
    //   Object.assign(req.session.userCase, caseDetailsFromCos);
    //   req.session.errors = [];
    //   this.redirect(req, res, C100_CHECK_YOUR_ANSWER);
    // }
  }
}
