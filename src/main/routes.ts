import fs from 'fs';

import { Application } from 'express';

import { RespondentTaskListGetController } from '../main/steps/respondent/task-list/get';

import AddressLookupPostControllerBase from './app/address/AddressLookupPostControllerBase';
import { FieldPrefix } from './app/case/case';
import { Environment, EventRoutesContext } from './app/case/definition';
import { GetCaseController } from './app/controller/GetCaseController';
import { GetController } from './app/controller/GetController';
import { PostController } from './app/controller/PostController';
import { RespondentSubmitResponseController } from './app/controller/RespondentSubmitResponseController';
import { DocumentManagerController } from './app/document/DocumentManagementController';
import TSDraftController from './app/testingsupport/TSDraftController';
import { PaymentHandler, PaymentValidationHandler } from './modules/payments/paymentController';
import { StepWithContent, stepsWithContent } from './steps/';
import { AccessibilityStatementGetController } from './steps/accessibility-statement/get';
import ApplicantConfirmContactDetailsPostController from './steps/applicant/confirm-contact-details/checkanswers/controller/ApplicantConfirmContactDetailsPostController';
import { SupportYouNeedDuringYourCaseController } from './steps/applicant/support-you-need-during-case/SupportYouNeedDuringCaseController';
import UploadDocumentController from './steps/application-within-proceedings/document-upload/postController';
import { processAWPApplication } from './steps/application-within-proceedings/utils';
import { ApplicationDownloadController } from './steps/c100-rebuild/confirmation-page/ApplicationDownloadController';
import { ContactPreferencesGetController } from './steps/common/contact-preferences/ContactPreferencesGetController';
import { ContactPreferencesPostController } from './steps/common/contact-preferences/ContactPreferencesPostController';
import { ViewAllDocumentsPostController } from './steps/common/controller/ViewAllDocumentsPostController';
import { KeepDetailsPrivatePostController } from './steps/common/keep-details-private/KeepDetailsPrivatePostController';
import { RemoveLegalRepresentativePostController } from './steps/common/remove-legal-representative/RemoveLegalRepresentativePostController';
import CaseDetailsGetController from './steps/common/task-list/controllers/CaseDetailsGetController';
import TaskListGetController from './steps/common/task-list/controllers/TaskListGetController';
import { ContactUsGetController } from './steps/contact-us/get';
import { CookiesGetController } from './steps/cookies/get';
import { ErrorController } from './steps/error/error.controller';
import { PrivacyPolicyGetController } from './steps/privacy-policy/get';
import { CaseActivationPostController } from './steps/prl-cases/CaseActivationPostController';
import DashboardGetController from './steps/prl-cases/dashboard/DashboardGetController';
import RespondentConfirmContactDetailsPostController from './steps/respondent/confirm-contact-details/checkanswers/controller/RespondentConfirmContactDetailsPostController';
import { ConsentPostController } from './steps/respondent/consent-to-application/ConsentPostController';
import { SaveSignOutGetController } from './steps/save-sign-out/get';
import { TasklistGetController } from './steps/tasklistresponse/TasklistGetController';
import { SafetyConcernsPostController } from './steps/tasklistresponse/allegations-of-harm-and-violence/SafetyConcernsPostController';
import { InternationalFactorsPostController } from './steps/tasklistresponse/international-factors/InternationalFactorsPostController';
import { MIAMPostController } from './steps/tasklistresponse/miam/MIAMPostController';
import { ProceedingPostController } from './steps/tasklistresponse/proceedings/ProceedingPostController';
import { TermsAndConditionsGetController } from './steps/terms-and-conditions/get';
import { CreateDraftGetController } from './steps/testing-support/create-draft/get';
import { DeleteDraftGetController } from './steps/testing-support/delete-draft/get';
import { TestingSupportGetController } from './steps/testing-support/get';
import { TimedOutGetController } from './steps/timed-out/get';
import {
  ACCESSIBILITY_STATEMENT,
  ALLEGATION_OF_HARM_VOILENCE,
  APPLICANT,
  APPLICANT_CA_DA_REQUEST,
  APPLICANT_CHECK_ANSWERS,
  APPLICANT_CONTACT_DETAILS_SAVE,
  APPLICANT_DETAILS_KNOWN,
  APPLICANT_KEEP_DETAILS_PRIVATE_SAVE,
  APPLICANT_MIAM_CERTIFICATE,
  APPLICANT_ORDERS_FROM_THE_COURT,
  APPLICANT_TASK_LIST_URL,
  APPLICANT_VIEW_ALL_DOCUMENTS_FROM_BANNER,
  APPLICATION_MADE_IN_THESE_PRCEEDINGS,
  CA_RESPONDENT_GENERATE_C7_DRAFT,
  CA_RESPONDENT_GENERATE_C7_Final,
  CA_RESPONDENT_RESPONSE_SUBMIT,
  CITIZEN_DOWNLOAD_UPLOADED_DOCS,
  CONSENT_SAVE,
  CONSENT_TO_APPLICATION,
  CONTACT_US,
  COOKIES_PAGE,
  CSRF_TOKEN_ERROR_URL,
  DASHBOARD_URL,
  DOCUMENT_MANAGER,
  HOME_URL,
  INTERNATIONAL_FACTORS_SAVE,
  INTERNATIONAL_FACTORS_START,
  MANAGE_DOCUMENTS_DOWNLOAD,
  MIAM_SAVE,
  MIAM_START,
  PRIVACY_POLICY,
  RESPONDENT,
  RESPONDENT_ADDRESS_LOOKUP,
  RESPONDENT_CA_RESPONSE,
  RESPONDENT_CHECK_ANSWERS,
  RESPONDENT_CONTACT_DETAILS_SAVE,
  RESPONDENT_DETAILS_KNOWN,
  RESPONDENT_KEEP_DETAILS_PRIVATE_SAVE,
  RESPONDENT_ORDERS_FROM_THE_COURT,
  RESPONDENT_TASK_LIST_URL,
  RESPONDENT_VIEW_ALL_DOCUMENTS_FROM_BANNER,
  RESPOND_TO_APPLICATION,
  SAVE_AND_SIGN_OUT,
  TERMS_AND_CONDITIONS,
  TIMED_OUT_URL,
  YOUR_APPLICATION_FL401,
  YOUR_APPLICATION_WITNESS_STATEMENT,
  /** C100 Rebuild URLs */
  // eslint-disable-next-line sort-imports
  C100_CREATE_CASE,
  PAYMENT_GATEWAY_ENTRY_URL,
  PAYMENT_RETURN_URL_CALLBACK,
  C100_RETRIVE_CASE,
  C1A_SAFETY_CONCERNS_CHECK_YOUR_ANSWERS_SAVE,
  C100_DOWNLOAD_APPLICATION,
  APPLICANT_VIEW_ALL_DOCUMENTS,
  RESPONDENT_VIEW_ALL_DOCUMENTS,
  PROCEEDING_SAVE,
  PROCEEDINGS_START,
  SUPPORT_YOU_NEED_DURING_CASE_SUMMARY_SAVE,
  CA_DA_SUPPORT_YOU_NEED_DURING_CASE_SAVE,
  C7_SUPPORT_YOU_NEED_DURING_CASE_SAVE,
  RESPONDENT_CHECK_ANSWERS_NO,
  FETCH_CASE_DETAILS,
  PARTY_TASKLIST,
  TESTING_SUPPORT,
  TESTING_SUPPORT_CREATE_DRAFT,
  CREATE_DRAFT,
  TESTING_SUPPORT_DELETE_DRAFT,
  APPLICANT_TASKLIST_CONTACT_PREFERENCES,
  PIN_ACTIVATION_CASE_ACTIVATED_URL,
  RESPONDENT_ALLEGATIONS_OF_HARM_AND_VIOLENCE,
  C7_ATTENDING_THE_COURT,
  APPLICANT_REMOVE_LEGAL_REPRESENTATIVE_START,
  RESPONDENT_REMOVE_LEGAL_REPRESENTATIVE_START,
  APPLICANT_TASKLIST_CONTACT_EMAIL,
  APPLICANT_TASKLIST_CONTACT_POST,
  RESPONSE_TO_CA,
  AOH_TO_CA,
  APPLICATION_WITHIN_PROCEEDINGS_SUPPORTING_DOCUMENT_UPLOAD,
  APPLICATION_WITHIN_PROCEEDINGS_PAYMENT_CALLBACK,
  //C100_DOCUMENT_SUBMISSION,
} from './steps/urls';

export class Routes {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;
    const errorController = new ErrorController();

    app.get(CSRF_TOKEN_ERROR_URL, errorHandler(errorController.CSRFTokenError));
    app.get(HOME_URL, (req, res) => res.redirect(DASHBOARD_URL));
    app.get(DASHBOARD_URL, errorHandler(new DashboardGetController().get));
    app.get(FETCH_CASE_DETAILS, errorHandler(new CaseDetailsGetController().get));
    app.get(PARTY_TASKLIST, errorHandler(new TaskListGetController().get));
    app.get(COOKIES_PAGE, errorHandler(new CookiesGetController().get));
    app.get(PRIVACY_POLICY, errorHandler(new PrivacyPolicyGetController().get));
    app.get(TERMS_AND_CONDITIONS, errorHandler(new TermsAndConditionsGetController().get));
    app.get(TESTING_SUPPORT, errorHandler(new TestingSupportGetController().get));
    app.get(TESTING_SUPPORT_CREATE_DRAFT, errorHandler(new CreateDraftGetController().get));
    app.get(TESTING_SUPPORT_DELETE_DRAFT, errorHandler(new DeleteDraftGetController().get));
    app.get(ACCESSIBILITY_STATEMENT, errorHandler(new AccessibilityStatementGetController().get));
    app.get(CONTACT_US, errorHandler(new ContactUsGetController().get));
    app.get(`${APPLICANT_TASK_LIST_URL}/:caseId`, errorHandler(new GetCaseController().fetchAndRedirectToTasklist));
    app.get(`${RESPOND_TO_APPLICATION}/:caseId`, errorHandler(new GetCaseController().fetchAndRedirectToTasklist));
    app.get(
      `${APPLICANT_VIEW_ALL_DOCUMENTS}/:caseId`,
      errorHandler(new GetCaseController().fetchAndRedirectToTasklist)
    );
    app.get(
      `${RESPONDENT_VIEW_ALL_DOCUMENTS}/:caseId`,
      errorHandler(new GetCaseController().fetchAndRedirectToTasklist)
    );
    app.get(`${CA_RESPONDENT_RESPONSE_SUBMIT}`, errorHandler(new RespondentSubmitResponseController().save));
    app.get(
      `${CA_RESPONDENT_GENERATE_C7_DRAFT}`,
      errorHandler(new RespondentSubmitResponseController().getDraftDocument)
    );
    app.get(SAVE_AND_SIGN_OUT, errorHandler(new SaveSignOutGetController().get));
    app.get(TIMED_OUT_URL, errorHandler(new TimedOutGetController().get));
    app.get(RESPONDENT_TASK_LIST_URL, errorHandler(new RespondentTaskListGetController().load));
    //app.get(`${CONSENT_TO_APPLICATION}/:caseId`, errorHandler(new ConsentGetController().getConsent));
    app.post('/redirect/tasklistresponse', (req, res) => res.redirect(RESPOND_TO_APPLICATION));
    app.get(C100_CREATE_CASE, errorHandler(new GetCaseController().createC100ApplicantCase));
    app.get(C100_RETRIVE_CASE, errorHandler(new GetCaseController().getC100ApplicantCase));
    app.get(C100_DOWNLOAD_APPLICATION, errorHandler(new ApplicationDownloadController().download));

    //Tasklist event common get controller routes
    app.get(
      `${RESPONDENT_DETAILS_KNOWN}/:caseId`,
      errorHandler(new TasklistGetController(EventRoutesContext.KEEP_DETAILS_PRIVATE_RESPONDENT).get)
    );
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
    app.get(`${RESPONDENT_TASK_LIST_URL}/:caseId`, errorHandler(new GetCaseController().fetchAndRedirectToTasklist));

    app.get(
      `${RESPONDENT_VIEW_ALL_DOCUMENTS_FROM_BANNER}`,
      errorHandler(new ViewAllDocumentsPostController().setAllDocumentsViewed)
    );
    app.get(
      `${RESPOND_TO_APPLICATION}/flag/updateFlag`,
      errorHandler(new ViewAllDocumentsPostController().setResponseInitiatedFlag)
    );
    app.get(
      `${APPLICANT_VIEW_ALL_DOCUMENTS_FROM_BANNER}`,
      errorHandler(new ViewAllDocumentsPostController().setAllDocumentsViewed)
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
    app.get(
      `${C7_ATTENDING_THE_COURT}/:caseId`,
      errorHandler(new TasklistGetController(EventRoutesContext.SUPPORT_DURING_CASE).get)
    );

    //C100 related routes
    app.get(
      `${APPLICANT_TASKLIST_CONTACT_PREFERENCES}/:caseId`,
      errorHandler(new ContactPreferencesGetController().get)
    );
    app.post(CREATE_DRAFT, errorHandler(TSDraftController.post));
    app.post(`${CREATE_DRAFT}/createC100Draft`, errorHandler(TSDraftController.createTSC100Draft));
    app.post(`${CREATE_DRAFT}/deleteC100Draft`, errorHandler(TSDraftController.deleteTSC100Draft));

    for (const step of stepsWithContent) {
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

        const documentManagerController = new DocumentManagerController(step.form.fields);
        app.post(DOCUMENT_MANAGER, errorHandler(documentManagerController.post));
        app.get(
          `${DOCUMENT_MANAGER}/deleteDocument/:documentId`,
          errorHandler(documentManagerController.deleteDocument)
        );
        app.post(`${DOCUMENT_MANAGER}/generatePdf`, errorHandler(documentManagerController.generatePdf));
        app.get(`${CA_RESPONDENT_GENERATE_C7_Final}`, errorHandler(documentManagerController.get));
        app.post(
          `${DOCUMENT_MANAGER}/clearUploadDocumentFormData`,
          errorHandler(documentManagerController.clearUploadDocumentFormData)
        );
        app.post(
          APPLICATION_WITHIN_PROCEEDINGS_SUPPORTING_DOCUMENT_UPLOAD,
          errorHandler(new UploadDocumentController(step.form.fields).post)
        );
        app.get(YOUR_APPLICATION_FL401, errorHandler(documentManagerController.get));
        app.get(YOUR_APPLICATION_WITNESS_STATEMENT, errorHandler(documentManagerController.get));
        app.get(`${APPLICANT}${APPLICANT_CA_DA_REQUEST}`, errorHandler(documentManagerController.get));
        app.get(APPLICANT_CA_DA_REQUEST, errorHandler(documentManagerController.get));
        app.get(RESPONSE_TO_CA, errorHandler(documentManagerController.get));
        app.get(AOH_TO_CA, errorHandler(documentManagerController.get));
        app.get(`${APPLICANT_ORDERS_FROM_THE_COURT}/:uid`, errorHandler(documentManagerController.get));
        app.get(`${RESPONDENT_ORDERS_FROM_THE_COURT}/:uid`, errorHandler(documentManagerController.get));

        app.get(`${APPLICANT}${APPLICANT_MIAM_CERTIFICATE}`, errorHandler(documentManagerController.get));
        app.get(`${RESPONDENT}${APPLICANT_MIAM_CERTIFICATE}`, errorHandler(documentManagerController.get));
        app.get(ALLEGATION_OF_HARM_VOILENCE, errorHandler(documentManagerController.get));
        app.get(`${APPLICATION_MADE_IN_THESE_PRCEEDINGS}/:uid`, errorHandler(documentManagerController.get));
        app.get(`${CITIZEN_DOWNLOAD_UPLOADED_DOCS}/:uid`, errorHandler(documentManagerController.get));
        app.get(`${MANAGE_DOCUMENTS_DOWNLOAD}/:uid`, errorHandler(documentManagerController.get));
        app.get(`${APPLICANT}${RESPONDENT_CA_RESPONSE}/:uid`, errorHandler(documentManagerController.get));

        app.get(`${CONSENT_SAVE}`, errorHandler(new ConsentPostController(step.form.fields).post));
        app.get(
          `${RESPONDENT_KEEP_DETAILS_PRIVATE_SAVE}`,
          errorHandler(new KeepDetailsPrivatePostController(step.form.fields).post)
        );
        app.get(
          `${APPLICANT_KEEP_DETAILS_PRIVATE_SAVE}`,
          errorHandler(new KeepDetailsPrivatePostController(step.form.fields).post)
        );
        app.get(
          `${RESPONDENT_CONTACT_DETAILS_SAVE}`,
          errorHandler(new RespondentConfirmContactDetailsPostController(step.form.fields).post)
        );
        app.post(
          `${RESPONDENT_ADDRESS_LOOKUP}`,
          errorHandler(new AddressLookupPostControllerBase(step.form.fields, FieldPrefix.RESPONDENT).post)
        );
        app.get(
          `${APPLICANT_CONTACT_DETAILS_SAVE}`,
          errorHandler(new ApplicantConfirmContactDetailsPostController(step.form.fields).post)
        );
        app.get(`${MIAM_SAVE}`, errorHandler(new MIAMPostController(step.form.fields).post));
        app.get(`${PROCEEDING_SAVE}`, errorHandler(new ProceedingPostController(step.form.fields).post));
        app.get(
          `${INTERNATIONAL_FACTORS_SAVE}`,
          errorHandler(new InternationalFactorsPostController(step.form.fields).post)
        );
        app.get(
          SUPPORT_YOU_NEED_DURING_CASE_SUMMARY_SAVE,
          errorHandler(new SupportYouNeedDuringYourCaseController(step.form.fields).post)
        );
        app.get(
          CA_DA_SUPPORT_YOU_NEED_DURING_CASE_SAVE,
          errorHandler(new SupportYouNeedDuringYourCaseController(step.form.fields).post)
        );
        app.get(
          C7_SUPPORT_YOU_NEED_DURING_CASE_SAVE,
          errorHandler(new SupportYouNeedDuringYourCaseController(step.form.fields).post)
        );
        app.get(
          C1A_SAFETY_CONCERNS_CHECK_YOUR_ANSWERS_SAVE,
          errorHandler(new SafetyConcernsPostController(step.form.fields).post)
        );
        app.post(RESPONDENT_CHECK_ANSWERS_NO, errorHandler(new SafetyConcernsPostController(step.form.fields).post));
        app.post(
          `${APPLICANT_TASKLIST_CONTACT_PREFERENCES}`,
          errorHandler(new ContactPreferencesPostController(step.form.fields).post)
        );
        app.post(
          PIN_ACTIVATION_CASE_ACTIVATED_URL,
          errorHandler(new CaseActivationPostController(step.form.fields).post)
        );
        app.post(
          APPLICANT_REMOVE_LEGAL_REPRESENTATIVE_START,
          errorHandler(new RemoveLegalRepresentativePostController(step.form.fields).post)
        );
        app.post(
          RESPONDENT_REMOVE_LEGAL_REPRESENTATIVE_START,
          errorHandler(new RemoveLegalRepresentativePostController(step.form.fields).post)
        );
        app.post(
          `${APPLICANT_TASKLIST_CONTACT_EMAIL}`,
          errorHandler(new ApplicantConfirmContactDetailsPostController(step.form.fields).post)
        );
        app.post(
          `${APPLICANT_TASKLIST_CONTACT_POST}`,
          errorHandler(new ApplicantConfirmContactDetailsPostController(step.form.fields).post)
        );
      }
    }
    /**
     * @Payment_Handler
     */
    app.get(PAYMENT_GATEWAY_ENTRY_URL, errorHandler(PaymentHandler));
    app.get(PAYMENT_RETURN_URL_CALLBACK, errorHandler(PaymentValidationHandler));
    app.get(APPLICATION_WITHIN_PROCEEDINGS_PAYMENT_CALLBACK, errorHandler(processAWPApplication));

    if (app.locals.ENV !== Environment.PRODUCTION) {
      app.get('/api/v1/session', (req, res) => {
        res.json(req.session);
      });
    }
  }

  private routeGuard(step: StepWithContent, httpMethod: string, req, res, next) {
    if (typeof step?.routeGuard?.[httpMethod] === 'function') {
      step.routeGuard[httpMethod].call(this, req, res, next);
    } else {
      next();
    }
  }
}
