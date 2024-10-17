import fs from 'fs';

import { Application } from 'express';

import { EventRoutesContext } from './app/case/definition';
import { GetController } from './app/controller/GetController';
import { PostController } from './app/controller/PostController';
import { RespondentSubmitResponseController } from './app/controller/RespondentSubmitResponseController';
import TSDraftController from './app/testingsupport/TSDraftController';
import { PaymentHandler, PaymentValidationHandler } from './modules/payments/paymentController';
import { RAProvider } from './modules/reasonable-adjustments';
import { StepWithContent, getStepsWithContent, stepsWithContent } from './steps/';
import UploadDocumentController from './steps/application-within-proceedings/document-upload/postController';
import { processAWPApplication } from './steps/application-within-proceedings/utils';
import CaseDataController from './steps/common/CaseDataController';
import DownloadDocumentController from './steps/common/documents/download/DownloadDocumentController';
import { C8RefugeSequence } from './steps/common/refuge/sequence';
import { AohSequence } from './steps/common/safety-concerns/sequence';
import CaseDetailsGetController from './steps/common/task-list/controllers/CaseDetailsGetController';
import TaskListGetController from './steps/common/task-list/controllers/TaskListGetController';
import { ErrorController } from './steps/error/error.controller';
import DashboardGetController from './steps/prl-cases/dashboard/DashboardGetController';
import { TasklistGetController } from './steps/tasklistresponse/TasklistGetController';
import {
  APPLICANT_CHECK_ANSWERS,
  APPLICATION_WITHIN_PROCEEDINGS_PAYMENT_CALLBACK,
  APPLICATION_WITHIN_PROCEEDINGS_SUPPORTING_DOCUMENT_UPLOAD,
  C100_RETRIVE_CASE,
  CA_RESPONDENT_GENERATE_C7_DRAFT,
  CONSENT_TO_APPLICATION,
  CREATE_DRAFT,
  CSRF_TOKEN_ERROR_URL,
  DASHBOARD_URL,
  DETAILS_KNOWN,
  DOWNLOAD_DOCUMENT,
  DOWNLOAD_DOCUMENT_BY_TYPE,
  FETCH_CASE_DETAILS,
  FETCH_HEARING_DETAILS,
  HOME_URL,
  INTERNATIONAL_FACTORS_START,
  LOCAL_API_SESSION,
  MIAM_START,
  PARTY_TASKLIST,
  PAYMENT_GATEWAY_ENTRY_URL,
  PAYMENT_RETURN_URL_CALLBACK,
  PROCEEDINGS_START,
  RESPONDENT_CHECK_ANSWERS,
  RESPOND_TO_APPLICATION,
} from './steps/urls';

export class Routes {
  public async enableFor(app: Application): Promise<void> {
    const { errorHandler } = app.locals;
    const errorController = new ErrorController();

    app.get(LOCAL_API_SESSION, (req, res) => {
      res.json(req.session);
    });
    app.get(CSRF_TOKEN_ERROR_URL, errorHandler(errorController.CSRFTokenError));
    app.get(HOME_URL, (req, res) => res.redirect(DASHBOARD_URL));
    app.get(DASHBOARD_URL, errorHandler(new DashboardGetController().get));
    app.get(FETCH_CASE_DETAILS, errorHandler(new CaseDetailsGetController().get)); //remove application settings part?
    app.get(PARTY_TASKLIST, errorHandler(new TaskListGetController().load));

    app.get(
      `${CA_RESPONDENT_GENERATE_C7_DRAFT}`,
      errorHandler(new RespondentSubmitResponseController().generateAndDownloadC7ResponseDraftDocument)
    );
    app.post('/redirect/tasklistresponse', (req, res) => res.redirect(RESPOND_TO_APPLICATION));
    app.get(C100_RETRIVE_CASE, errorHandler(new CaseDataController().getC100ApplicantCase));
    //Tasklist event common get controller routes
    app.get(
      `${DETAILS_KNOWN}/:caseId`,
      errorHandler(new TasklistGetController(EventRoutesContext.KEEP_DETAILS_PRIVATE).get)
    );
    app.get(FETCH_HEARING_DETAILS, errorHandler(new TasklistGetController(EventRoutesContext.HEARINGS).get)); //use sequence? is caseId needed here?
    app.get(
      `${RESPONDENT_CHECK_ANSWERS}/:caseId`,
      errorHandler(new TasklistGetController(EventRoutesContext.CONFIRM_CONTACT_DETAILS_RESPONDENT).get)
    );

    app.get(
      `${APPLICANT_CHECK_ANSWERS}/:caseId`,
      errorHandler(new TasklistGetController(EventRoutesContext.CONFIRM_CONTACT_DETAILS_APPLICANT).get)
    );

    // Common get controller for tasklist response events
    app.get(`${MIAM_START}/:caseId`, errorHandler(new TasklistGetController(EventRoutesContext.MIAM_RESPONSE).get));
    app.get(
      `${PROCEEDINGS_START}/:caseId`,
      errorHandler(new TasklistGetController(EventRoutesContext.PROCEEDINGS_RESPONSE).get)
    );
    app.get(
      `${CONSENT_TO_APPLICATION}/:caseId`,
      errorHandler(new TasklistGetController(EventRoutesContext.CONSENT_RESPONSE).get)
    );
    app.get(
      `${INTERNATIONAL_FACTORS_START}/:caseId`,
      errorHandler(new TasklistGetController(EventRoutesContext.INTERNATIONAL_FACTORS_RESPONSE).get)
    );
    app.get(DOWNLOAD_DOCUMENT_BY_TYPE, errorHandler(new DownloadDocumentController().download));
    app.get(DOWNLOAD_DOCUMENT, errorHandler(new DownloadDocumentController().download));

    //C100 related routes
    app.post(CREATE_DRAFT, errorHandler(TSDraftController.post));
    app.post(`${CREATE_DRAFT}/createC100Draft`, errorHandler(TSDraftController.createTSC100Draft));
    app.post(`${CREATE_DRAFT}/deleteC100Draft`, errorHandler(TSDraftController.deleteTSC100Draft));
    const steps = [
      ...stepsWithContent,
      ...getStepsWithContent(AohSequence.getSequence(), '/common'),
      ...getStepsWithContent(await RAProvider.getSequence(), '/common'),
      ...getStepsWithContent(C8RefugeSequence.getSequence(), '/common'),
    ];

    for (const step of steps) {
      const files = fs.readdirSync(`${step.stepDir}`);
      const getControllerFileName = files.find(item => /get/i.test(item) && !/test/i.test(item));
      const getController = getControllerFileName
        ? require(`${step.stepDir}/${getControllerFileName}`).default
        : step.getController ?? GetController;

      if (step && getController) {
        app.get(
          step.url,
          this.routeGuard.bind(this, step, 'get'),
          errorHandler(new getController(step.view, step.generateContent).get)
        );
      }
      if (step.form) {
        const postControllerFileName = files.find(item => /post/i.test(item) && !/test/i.test(item));
        const postController = postControllerFileName
          ? require(`${step.stepDir}/${postControllerFileName}`).default
          : step.postController ?? PostController;
        app.post(
          step.url,
          // eslint-disable-next-line prettier/prettier
          this.routeGuard.bind(this, step, 'post'),
          errorHandler(new postController(step.form.fields).post)
        );
        app.post(
          APPLICATION_WITHIN_PROCEEDINGS_SUPPORTING_DOCUMENT_UPLOAD,
          errorHandler(new UploadDocumentController(step.form.fields).post)
        );
      }
    }
    /**
     * @Payment_Handler
     */
    app.get(PAYMENT_GATEWAY_ENTRY_URL, errorHandler(PaymentHandler));
    app.get(PAYMENT_RETURN_URL_CALLBACK, errorHandler(PaymentValidationHandler));
    app.get(APPLICATION_WITHIN_PROCEEDINGS_PAYMENT_CALLBACK, errorHandler(processAWPApplication));
  }

  private routeGuard(step: StepWithContent, httpMethod: string, req, res, next) {
    if (typeof step?.routeGuard?.[httpMethod] === 'function') {
      step.routeGuard[httpMethod].call(this, req, res, next);
    } else {
      next();
    }
  }
}
