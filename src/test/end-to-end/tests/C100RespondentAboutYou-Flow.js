const testConfig = require('../config');
const DataSetup = require('../exuiSupport/restApiData/CaseDataSetupV2');
const accessCodeExtrator = require('../exuiSupport/restApiData/accessCodeExtractor/index')

const dataSetupManager = require('../exuiSupport/restApiData/DataSetupManager')


const respondentEvents = require('../pages/RespondentEvents');

Feature('C100 Respondent About You - flow @nightly @debug');


let caseId = null;
let accessCode = null;
Scenario('C100 Data setup @nightly', async ({ I }) => {

  const dataSetupObj = dataSetupManager.getDataSetupForScenario('C100_RESP_ABOUT_YOU');

  while (dataSetupObj.state === 'running') {
    await I.wait('2');
    console.log(`Datasetup ${dataSetupObj.state} caseId: ${dataSetupObj.caseId} : waiting for datasetup to complete`)
  }
  caseId = dataSetupObj.caseId;
  accessCode = await dataSetupObj.getRespondentAccessCode(caseId);

}).retry(testConfig.TestRetryScenarios);


Scenario('C100 Activate case as respondent @nightly', async ({ I }) => {

  await I.loginAsCitizen();
  await I.navigateToAcitivateAccessCodePage();
  await I.fillAndSubmitActivateAccessCode(caseId, accessCode);
  await I.confirmAccessCodeActivated();


}).retry(testConfig.TestRetryScenarios);


Scenario('C100 Respondent About You journey - Keep details private', async ({ I }) => {
  await I.loginAsPRLCitizen();
  await respondentEvents.clickRespondentLink(caseId);
  await respondentEvents.clickRespondYourDetailsPrivate();

}).retry({ retries: 3, minTimeout: 30000 });


Scenario('C100 Respondent About You journey - Contact Preference', async ({ I }) => {
  await I.loginAsPRLCitizen();
  await respondentEvents.clickRespondentLink(caseId);
  await respondentEvents.completeContactPreference();

}).retry({ retries: 3, minTimeout: 30000 });



Scenario('C100 Respondent About You journey - Contact details', async ({ I }) => {
    await I.loginAsPRLCitizen();
    await respondentEvents.clickRespondentLink(caseId);
    await respondentEvents.clickEditContactDetails();

}).retry({ retries: 3, minTimeout: 30000 });



Scenario('C100 Respondent About You journey - Support needed', async ({ I }) => {
  await I.loginAsPRLCitizen();
  await respondentEvents.clickRespondentLink(caseId);
  await respondentEvents.clickAboutYouSupportYourNeed();

}).retry({ retries: 3, minTimeout: 30000 });

