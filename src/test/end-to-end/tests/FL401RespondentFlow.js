const testConfig = require('../config');
const DataSetup = require('../exuiSupport/restApiData/CaseDataSetupV2');
const accessCodeExtrator = require('../exuiSupport/restApiData/accessCodeExtractor/index')

const dataSetupManager = require('../exuiSupport/restApiData/DataSetupManager')


const respondentEvents = require('../pages/FL401RespondentEvents');

Feature('FL401 - Respondent flow');


let caseId = null;
let accessCode = null;
Scenario('FL401 Respondent flow Data setup', async ({ I }) => {

    const dataSetupObj = dataSetupManager.getDataSetupForScenario('FL401_APPLICANT_RESPONDENT_FLOW_2');

    while (dataSetupObj.state === 'running') {
        await I.wait('2');
        console.log(`Datasetup ${dataSetupObj.state} caseId: ${dataSetupObj.caseId} : waiting for datasetup to complete`)
    }
    caseId = dataSetupObj.caseId;
    accessCode = await dataSetupObj.getRespondentAccessCode(caseId);

}).retry(testConfig.TestRetryScenarios);

Scenario('FL401 Activate case as respondent @nightly', async ({ I }) => {

    await I.loginAsCitizen();
    await I.navigateToAcitivateAccessCodePage();
    await I.fillAndSubmitActivateAccessCode(caseId, accessCode);
    await I.confirmAccessCodeActivated();


}).retry(testConfig.TestRetryScenarios);


Scenario('Fl401 Respondent - Keep details private', async ({ I }) => {
    await I.loginAsCitizen();
    await respondentEvents.clickActiveCaseLink(caseId);
    await respondentEvents.eventKeepYourDetailsPrivate();

}).retry({ retries: 3, minTimeout: 30000 });


Scenario('Fl401 Respondent - Confirm or edit contact details', async ({ I }) => {
    await I.loginAsCitizen();
    await respondentEvents.clickActiveCaseLink(caseId);
    await respondentEvents.eventConfirmOrEditYourContactDetails();

}).retry({ retries: 3, minTimeout: 30000 });



Scenario('Fl401 Respondent - Support you need during your case', async ({ I }) => {
    await I.loginAsCitizen();
    await respondentEvents.clickActiveCaseLink(caseId);
    await respondentEvents.eventSupportYouNeedDuringYourCase();

}).retry({ retries: 3, minTimeout: 30000 });

Scenario('Fl401 Respondent - Upload documents', async ({ I }) => {
    await I.loginAsCitizen();
    await respondentEvents.clickActiveCaseLink(caseId);
    await respondentEvents.eventUploadDocuments('Your position statement');
    await respondentEvents.eventUploadDocuments('Your witness statements');

}).retry({ retries: 3, minTimeout: 30000 });



Scenario('Fl401 Respondent - View all documents from court', async ({ I }) => {
    await I.loginAsCitizen();
    await respondentEvents.clickActiveCaseLink(caseId);
    await respondentEvents.verifyViewAllDocuments(['witness statements', 'position statements']);

}).retry({ retries: 3, minTimeout: 30000 });



