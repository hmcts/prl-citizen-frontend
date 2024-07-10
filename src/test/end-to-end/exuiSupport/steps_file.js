'use strict';
const LoginPage = require('./pages/Login');

// const CreateCasePage = require('./pages/CreateCase');
// const PeopleInTheCasePage = require('./pages/PeopleInTheCase');
// const UploadDocuments = require('./pages/UploadDocuments');
// const UploadFLDocuments = require('./pages/UploadFLDocuments');
// const TypeOfApplicationEvent = require('./pages/TypeOfApplication');
// const AttendingTheHearing = require('./pages/AttendingTheHearing');
// const Miam = require('./pages/Miam.js');
// const ChildDetails = require('./pages/ChildDetails');
// const ApplicantDetails = require('./pages/ApplicantDetails');
// const CaseName = require('./pages/CaseName');
// const HearingUrgency = require('./pages/HearingUrgency');
// const LitigationCapacity = require('./pages/LitigationCapacity');
// const OtherPeopleInTheCase = require('./pages/OtherPeopleInTheCase');
// const InternationalElement = require('./pages/InternationalElement');
// const RespondentDetails = require('./pages/RespondentDetails');
// const WelshLanguage = require('./pages/WelshLanguage');
// const otherProceedings = require('./pages/OtherProceedings');
// const allegationsOfHarm = require('./pages/allegationsOfHarm');
// const viewPDFApplication = require('./pages/ViewPDFApplication');
// const statementOfTruth = require('./pages/StatementOfTruth');
// const manageDocuments = require('./pages/ManageDocumentsScreens/ManageDocuments');
// const respondentBehaviour = require('./pages/DOScreens/RespondentBehaviour');
// const relationshipToRespondent = require('./pages/DOScreens/RelationshipToRespondent');
// const DOAttendingTheHearing = require('./pages/DOScreens/AttendingTheHearing');
// const applicantsFamily = require('./pages/DOScreens/ApplicantsFamily');
// const withOutNoticeOrder = require('./pages/DOScreens/DaWithoutNoticeOrder');
// const theHome = require('./pages/DOScreens/TheHome');
// const submitAndPay = require('./pages/SubmitAndPay');
// const caseList = require('./pages/CaseList');
// const manageOrders = require('./pages/MOScreens/ManageOrders');
// const manageOrderHearing = require('./pages/ManageOrderHearing');
// const OtherChildrenNotInCase = require('./pages/OtherChildrenNotInCase');
// const ChildrenRelationships = require('./pages/ChildrenRelationships');
// const editAndApproveDraftOrder = require('./pages/EditAndApproveDraftOrder');
// const UploadAdditionalApplications = require('./pages/UploadAdditionalApplications');
// const solicitorWithdrawApplication = require('./pages/WithdrawApplication');
// const solicitorDraftOrder = require('./pages/SolicitorDraftOrder');
// const moveCaseToGateKeeping = require('./pages/MoveCaseToGateKeeping');
// const issueCasePage = require('./pages/IssueCase');
// const solicitorReasonableAdjustment = require('./pages/SolicitorReasonableAdjustment');
// const hearingRequestPage = require('./pages/HearingRequest');
// const amendCaseDetailsPage = require('./pages/AmendCaseDetails');
// const nocDetailsPage = require('./pages/NOCScreens/NocDetails');
// const sendMessagePage = require('./pages/SendMsgScreens/SendMsg');
// const soaPage = require('./pages/SOAScreens/ServiceOfApplication');
// const ManageDocuments = require('./pages/ManageDocumentsScreens/ManageDocuments');
// const reqSupport = require('./pages/ReqSupportScreens/reqSupport');
// const manageFlags = require('./pages/ManageFlagsScreens/manageFlags');
// const createFlags = require('./pages/CreateFlagScreens/createFlags');
// const verifyFlags = require('./pages/CreateFlagScreens/verifySolicitorFlags');
// const caseManagerConfidentialityCheck = require('./pages/SOAScreens/CaseManagerConfidentialityCheck');
// const statementOfService = require('./pages/SOAScreens/StatementOfService');
// const respondentSolicitorMiam = require('./pages/RespondentSolicitorMiam');
// const { ordersApplyingForPageFL401 } = require('./pages/TypeOfApplication');

module.exports = () => {
  return actor({
    loginAsSolicitor() {
      return LoginPage.loginAsSolicitor();
    },
    loginAsRespondentSolicitor() {
      return LoginPage.loginAsRespondentSolicitor();
    },
    loginAsCourtAdmin() {
      return LoginPage.loginAsCourtAdmin();
    },
    loginAsCaseManager() {
      return LoginPage.loginAsCaseManager();
    },
    loginAsStokeCourtAdmin() {
      return LoginPage.loginAsStokeCourtAdmin();
    },
    loginAsSwanseaCourtAdmin() {
      return LoginPage.loginAsSwanseaCourtAdmin();
    },
    loginAsCourtAdminTSSolicitorApplication() {
      return LoginPage.loginAsCourtAdminTSSolicitorApplication();
    },
   
    loginAsJudge() {
      return LoginPage.loginAsJudge();
    },
    loginAsLegalAdviser() {
      return LoginPage.loginAsLegalAdviser();
    },
    loginAsOldCourtAdmin() {
      return LoginPage.loginAsOldCourtAdmin();
    }
   
  });
};
