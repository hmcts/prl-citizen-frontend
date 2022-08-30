import fs from 'fs';

import { Application } from 'express';
import multer from 'multer';

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
  APPLICATION_MADE_IN_THESE_PRCEEDINGS,
  CONTACT_US,
  COOKIES_PAGE,
  DIGITAL_DOWNLOADS,
  DOCUMENT_MANAGER,
  DRUG_ALCOHOL_TESTS,
  HOME_URL,
  LETTER_FROM_SCHOOL,
  MEDICAL_RECORDS,
  MEDICAL_REPORTS,
  PATERNITY_TEST_REPORTS,
  POLICE_DISCLOSURE,
  PRIVACY_POLICY,
  RESPONDENT,
  RESPONDENT_ORDERS_FROM_THE_COURT,
  TENANCY_AND_MORTGAGE_AVAILABILITY,
  TERMS_AND_CONDITIONS,
  WITNESS_AVAILABILITY,
  YOUR_APPLICATION_FL401,
  YOUR_APPLICATION_WITNESS_STATEMENT,
  YOUR_WITNESS_STATEMENTS,
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
        app.get(`${TENANCY_AND_MORTGAGE_AVAILABILITY}/:uid`, errorHandler(documentManagerController.get));
        app.get(`${POLICE_DISCLOSURE}/:uid`, errorHandler(documentManagerController.get));
        app.get(`${DRUG_ALCOHOL_TESTS}/:uid`, errorHandler(documentManagerController.get));
        app.get(`${PATERNITY_TEST_REPORTS}/:uid`, errorHandler(documentManagerController.get));
        app.get(`${DIGITAL_DOWNLOADS}/:uid`, errorHandler(documentManagerController.get));
        app.get(`${YOUR_WITNESS_STATEMENTS}/:uid`, errorHandler(documentManagerController.get));
        app.get(`${WITNESS_AVAILABILITY}/:uid`, errorHandler(documentManagerController.get));
        app.get(`${APPLICATION_MADE_IN_THESE_PRCEEDINGS}/:uid`, errorHandler(documentManagerController.get));
        app.get(`${LETTER_FROM_SCHOOL}/:uid`, errorHandler(documentManagerController.get));
        app.get(`${MEDICAL_RECORDS}/:uid`, errorHandler(documentManagerController.get));
        app.get(`${MEDICAL_REPORTS}/:uid`, errorHandler(documentManagerController.get));
      }
    }

    // app.get(KEEP_ALIVE_URL, errorHandler(new KeepAliveController().get));

    // app.use(errorController.notFound as unknown as RequestHandler);
  }
}
