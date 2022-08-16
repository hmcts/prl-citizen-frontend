import fs from 'fs';

import { Application } from 'express';

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
  APPLICANT_VIEW_ALL_ORDERS_FROM_THE_COURT,
  CONTACT_US,
  COOKIES_PAGE,
  HOME_URL,
  // KEEP_ALIVE_URL,
  PRIVACY_POLICY,
  TERMS_AND_CONDITIONS,
  YOUR_APPLICATION_FL401,
  YOUR_APPLICATION_WITNESS_STATEMENT,
  // SAVE_AND_SIGN_OUT,
  // TIMED_OUT_URL,
  // RESPONDENT_TASK_LIST_URL
} from './steps/urls';

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
    const documentManagerController = new DocumentManagerController();
    app.get(YOUR_APPLICATION_FL401, errorHandler(documentManagerController.get));
    app.get(YOUR_APPLICATION_WITNESS_STATEMENT, errorHandler(documentManagerController.get));

    app.get(`${APPLICANT_VIEW_ALL_ORDERS_FROM_THE_COURT}/:uid`, errorHandler(documentManagerController.get));

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
      }
    }

    // app.get(KEEP_ALIVE_URL, errorHandler(new KeepAliveController().get));

    // app.use(errorController.notFound as unknown as RequestHandler);
  }
}
