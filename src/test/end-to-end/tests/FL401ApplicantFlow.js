const testConfig = require('../config');
const DataSetup = require('../exuiSupport/restApiData/CaseDataSetupV2');
const accessCodeExtrator = require('../exuiSupport/restApiData/accessCodeExtractor/index')

const dataSetupManager = require('../exuiSupport/restApiData/DataSetupManager')


const applicantEvents = require('../pages/FL401ApplicantEvents');

Feature('FL401 - Applicant flow @debug');


let caseId = null;
let accessCode = null;
Scenario('FL401  Applicant flow Data setup', async ({ I }) => {

    const dataSetupObj = dataSetupManager.getDataSetupForScenario('FL401_APPLICANT_RESPONDENT_FLOW_1');

    while (dataSetupObj.state === 'running') {
        await I.wait('2');
        console.log(`Datasetup ${dataSetupObj.state} caseId: ${dataSetupObj.caseId} : waiting for datasetup to complete`)
    }
    caseId = dataSetupObj.caseId;
    accessCode = await dataSetupObj.getApplicantAccessCode(caseId);

}).retry(testConfig.TestRetryScenarios);

Scenario('FL401 Activate case as applicant @nightly', async ({ I }) => {

    await I.loginAsPRLCitizen();
    await I.navigateToAcitivateAccessCodePage();
    await I.fillAndSubmitActivateAccessCode(caseId, accessCode);
    await I.confirmAccessCodeActivated();


}).retry(testConfig.TestRetryScenarios);


// Scenario('C100 Activate case as respondent @nightly @debug', async ({ I }) => {

//     await I.loginAsCitizen();
//     await I.navigateToAcitivateAccessCodePage();
//     await I.fillAndSubmitActivateAccessCode(caseId, accessCode);
//     await I.confirmAccessCodeActivated();


// }).retry(testConfig.TestRetryScenarios);


Scenario('Fl401 applicant - Keep details private', async ({ I }) => {
    await I.loginAsPRLCitizen();
    await applicantEvents.clickActiveCaseLink(caseId);
    await applicantEvents.eventKeepYourDetailsPrivate();

}).retry({ retries: 3, minTimeout: 30000 });


Scenario('Fl401 applicant - Confirm or edit contact details', async ({ I }) => {
    await I.loginAsPRLCitizen();
    await applicantEvents.clickActiveCaseLink(caseId);
    await applicantEvents.eventConfirmOrEditYourContactDetails();

}).retry({ retries: 3, minTimeout: 30000 });



Scenario('Fl401 applicant - Support you need during your case', async ({ I }) => {
    await I.loginAsPRLCitizen();
    await applicantEvents.clickActiveCaseLink(caseId);
    await applicantEvents.eventSupportYouNeedDuringYourCase();

}).retry({ retries: 3, minTimeout: 30000 });

Scenario('Fl401 applicant - Upload documents', async ({ I }) => {
    await I.loginAsPRLCitizen();
    await applicantEvents.clickActiveCaseLink(caseId);
    await applicantEvents.eventUploadDocuments('Your position statement');
    await applicantEvents.eventUploadDocuments('Your witness statements');

}).retry({ retries: 3, minTimeout: 30000 });



Scenario('Fl401 applicant - View all documents from court', async ({ I }) => {
    await I.loginAsPRLCitizen();
    await applicantEvents.clickActiveCaseLink(caseId);
    await applicantEvents.verifyViewAllDocuments(['witness statements', 'position statements']);

}).retry({ retries: 3, minTimeout: 30000 });



// Scenario('Fl401 applicant - Witness statement', async ({ I }) => {
//     await I.loginAsPRLCitizen();
//     await respondentEvents.clickRespondentLink(caseId);
//     await respondentEvents.clickAboutYouSupportYourNeed();

// }).retry({ retries: 3, minTimeout: 30000 });


// Scenario('Fl401 applicant - Check details of your court hearings', async ({ I }) => {
//     await I.loginAsPRLCitizen();
//     await respondentEvents.clickRespondentLink(caseId);
//     await respondentEvents.clickAboutYouSupportYourNeed();

// }).retry({ retries: 3, minTimeout: 30000 });


