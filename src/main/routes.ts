import fs from 'fs';

import { Application } from 'express';
import multer from 'multer';

import { GetCaseController } from './app/controller/GetCaseController';
import { GetController } from './app/controller/GetController';
import { PostController } from './app/controller/PostController';
import { DocumentManagerController } from './app/document/DocumentManagementController';
import { stepsWithContent } from './steps/';
import { AccessibilityStatementGetController } from './steps/accessibility-statement/get';
import { ContactUsGetController } from './steps/contact-us/get';
import { CookiesGetController } from './steps/cookies/get';
import { HomeGetController } from './steps/home/get';
import { PrivacyPolicyGetController } from './steps/privacy-policy/get';
import { TermsAndConditionsGetController } from './steps/terms-and-conditions/get';
// import { RespondentTaskListGetController } from './steps/respondent/task-list/get';
import {
  // CSRF_TOKEN_ERROR_URL,
  ACCESSIBILITY_STATEMENT,
  ALLEGATION_OF_HARM_VOILENCE,
  APPLICANT,
  APPLICANT_CA_DA_REQUEST,
  APPLICANT_MIAM_CERTIFICATE,
  APPLICANT_ORDERS_FROM_THE_COURT,
  APPLICANT_TASK_LIST_URL,
  APPLICATION_MADE_IN_THESE_PRCEEDINGS,
  CITIZEN_DOWNLOAD_UPLOADED_DOCS,
  CONTACT_US,
  COOKIES_PAGE,
  DOCUMENT_MANAGER,
  HOME_URL,
  PRIVACY_POLICY,
  RESPONDENT,
  RESPONDENT_ORDERS_FROM_THE_COURT,
  TERMS_AND_CONDITIONS,
  YOUR_APPLICATION_FL401,
  YOUR_APPLICATION_WITNESS_STATEMENT,
} from './steps/urls';

const handleUploads = multer();

export class Routes {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;

    // app.get(CSRF_TOKEN_ERROR_URL, errorHandler(errorController.CSRFTokenError));
    app.get(HOME_URL, errorHandler(new HomeGetController().get));
    // app.get(RESPONDENT_TASK_LIST_URL, errorHandler(new RespondentTaskListGetController().get));
    app.get(COOKIES_PAGE, errorHandler(new CookiesGetController().get));
    app.get(PRIVACY_POLICY, errorHandler(new PrivacyPolicyGetController().get));
    app.get(TERMS_AND_CONDITIONS, errorHandler(new TermsAndConditionsGetController().get));
    app.get(ACCESSIBILITY_STATEMENT, errorHandler(new AccessibilityStatementGetController().get));
    app.get(CONTACT_US, errorHandler(new ContactUsGetController().get));
    // app.get(SAVE_AND_SIGN_OUT, errorHandler(new SaveSignOutGetController().get));
    // app.get(TIMED_OUT_URL, errorHandler(new TimedOutGetController().get));
    app.get(`${APPLICANT_TASK_LIST_URL}/:caseId`, errorHandler(new GetCaseController().getCase));

    for (const step of stepsWithContent) {
      const files = fs.readdirSync(`${step.stepDir}`);

      const getControllerFileName = files.find(item => /get/i.test(item) && !/test/i.test(item));
      const getController = getControllerFileName
        ? require(`${step.stepDir}/${getControllerFileName}`).default
        : GetController;

      app.get(step.url, errorHandler(new getController(step.view, step.generateContent).get));
      if (step.form) {
        const postControllerFileName = files.find(item => /post/i.test(item) && !/test/i.test(item));
        const postController = postControllerFileName
          ? require(`${step.stepDir}/${postControllerFileName}`).default
          : PostController;

        app.post(step.url, errorHandler(new postController(step.form.fields).post));
        const documentManagerController = new DocumentManagerController(step.form.fields);
        app.post(DOCUMENT_MANAGER, handleUploads.array('files[]', 5), errorHandler(documentManagerController.post));
        app.get(
          `${DOCUMENT_MANAGER}/deleteDocument/:documentId`,
          errorHandler(documentManagerController.deleteDocument)
        );
        app.post(`${DOCUMENT_MANAGER}/generatePdf`, errorHandler(documentManagerController.generatePdf));
        app.get(YOUR_APPLICATION_FL401, errorHandler(documentManagerController.get));
        app.get(YOUR_APPLICATION_WITNESS_STATEMENT, errorHandler(documentManagerController.get));
        app.get(`${APPLICANT}${APPLICANT_CA_DA_REQUEST}`, errorHandler(documentManagerController.get));

        app.get(`${APPLICANT_ORDERS_FROM_THE_COURT}/:uid`, errorHandler(documentManagerController.get));
        app.get(`${RESPONDENT_ORDERS_FROM_THE_COURT}/:uid`, errorHandler(documentManagerController.get));

        app.get(`${APPLICANT}${APPLICANT_MIAM_CERTIFICATE}`, errorHandler(documentManagerController.get));
        app.get(`${RESPONDENT}${APPLICANT_MIAM_CERTIFICATE}`, errorHandler(documentManagerController.get));
        app.get(ALLEGATION_OF_HARM_VOILENCE, errorHandler(documentManagerController.get));
        app.get(`${APPLICATION_MADE_IN_THESE_PRCEEDINGS}/:uid`, errorHandler(documentManagerController.get));
        app.get(`${CITIZEN_DOWNLOAD_UPLOADED_DOCS}/:uid`, errorHandler(documentManagerController.get));
        app.get(APPLICANT_CA_DA_REQUEST, errorHandler(documentManagerController.get));
      }
    }

    // app.get(KEEP_ALIVE_URL, errorHandler(new KeepAliveController().get));

    // app.use(errorController.notFound as unknown as RequestHandler);
  }
}
