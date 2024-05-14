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
import PayAndSubmitPostController from './steps/c100-rebuild/check-your-answers/PayAndSubmitPostController';
import CaseDataController from './steps/common/CaseDataController';
import DownloadDocumentController from './steps/common/documents/download/DownloadDocumentController';
import CaseDetailsGetController from './steps/common/task-list/controllers/CaseDetailsGetController';
import TaskListGetController from './steps/common/task-list/controllers/TaskListGetController';
import { ErrorController } from './steps/error/error.controller';
import DashboardGetController from './steps/prl-cases/dashboard/DashboardGetController';
import { TasklistGetController } from './steps/tasklistresponse/TasklistGetController';
import { SafetyConcernsPostController } from './steps/tasklistresponse/allegations-of-harm-and-violence/SafetyConcernsPostController';
import { ResponseSummaryConfirmationPostController } from './steps/tasklistresponse/summary/postControllerAfterPcq';
import {
  APPLICANT_CHECK_ANSWERS,
  APPLICANT_DETAILS_KNOWN,
  C100_CHECK_YOUR_ANSWER_REDIRECT,
  C100_RETRIVE_CASE,
  C1A_SAFETY_CONCERNS_CHECK_YOUR_ANSWERS_SAVE,
  CA_RESPONDENT_GENERATE_C7_DRAFT,
  CONSENT_TO_APPLICATION,
  CREATE_DRAFT,
  CSRF_TOKEN_ERROR_URL,
  DASHBOARD_URL,
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
  RESPONDENT_ALLEGATIONS_OF_HARM_AND_VIOLENCE,
  RESPONDENT_CHECK_ANSWERS,
  RESPONDENT_CHECK_ANSWERS_NO,
  RESPONDENT_DETAILS_KNOWN,
  RESPONDENT_TO_APPLICATION_SUMMARY_REDIRECT,
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
      `${RESPONDENT_DETAILS_KNOWN}/:caseId`,
      errorHandler(new TasklistGetController(EventRoutesContext.KEEP_DETAILS_PRIVATE_RESPONDENT).get)
    );
    app.get(FETCH_HEARING_DETAILS, errorHandler(new TasklistGetController(EventRoutesContext.HEARINGS).get)); //use sequence? is caseId needed here?
    app.get(
      `${APPLICANT_DETAILS_KNOWN}/:caseId`,
      errorHandler(new TasklistGetController(EventRoutesContext.KEEP_DETAILS_PRIVATE_APPLICANT).get)
    );
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
      `${RESPONDENT_ALLEGATIONS_OF_HARM_AND_VIOLENCE}/:caseId`,
      errorHandler(new TasklistGetController(EventRoutesContext.SAFETY_CONCERNS_RESPONSE).get)
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

    const steps = [...stepsWithContent, ...getStepsWithContent(await RAProvider.getSequence(), '/common')];

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
        app.get(
          C1A_SAFETY_CONCERNS_CHECK_YOUR_ANSWERS_SAVE,
          errorHandler(new SafetyConcernsPostController(step.form.fields).post)
        );
        app.get(
          RESPONDENT_TO_APPLICATION_SUMMARY_REDIRECT,
          errorHandler(new ResponseSummaryConfirmationPostController(step.form.fields).post)
        );
        app.get(C100_CHECK_YOUR_ANSWER_REDIRECT, errorHandler(new PayAndSubmitPostController(step.form.fields).post));
        app.post(RESPONDENT_CHECK_ANSWERS_NO, errorHandler(new SafetyConcernsPostController(step.form.fields).post));
      }
    }
    /**
     * @Payment_Handler
     */
    app.get(PAYMENT_GATEWAY_ENTRY_URL, errorHandler(PaymentHandler));
    app.get(PAYMENT_RETURN_URL_CALLBACK, errorHandler(PaymentValidationHandler));
  }

  private routeGuard(step: StepWithContent, httpMethod: string, req, res, next) {
    if (typeof step?.routeGuard?.[httpMethod] === 'function') {
      step.routeGuard[httpMethod].call(this, req, res, next);
    } else {
      next();
    }
  }
}
