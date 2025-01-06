const testConfig = require('../config');

const CaseDataSetup = require('../exuiSupport/restApiData/CaseDataSetupV2');
const dataSetupManager = require('../exuiSupport/restApiData/DataSetupManager')

Feature('C100 Respondent - flow');

// let caseId = '1719914949362828';
// let accessCode = null;
Scenario('C100 Data setup @nightly', async ({ I }) => {

  const dataSetupObj = dataSetupManager.getDataSetupForScenario('C100_RESP_FLOW');

  while (dataSetupObj.state === 'running'){
    await I.wait('2');
    console.log('waiting for datasetup to complete')
  }
  caseId = dataSetupObj.caseId;
  accessCode = await dataSetupObj.getRespondentAccessCode(caseId);

}).retry(testConfig.TestRetryScenarios);


Scenario('C100 Activate case as respondent @nightly', async ({ I }) => {

  const caseDataSetup = new CaseDataSetup();
  caseDataSetup.caseId = caseId;
  accessCode = await caseDataSetup.getRespondentAccessCode(caseId);

  await I.loginAsCitizen();
  await I.navigateToAcitivateAccessCodePage();
  await I.fillAndSubmitActivateAccessCode(caseId, accessCode);
  await I.confirmAccessCodeActivated();


}).retry(testConfig.TestRetryScenarios);



caseId = '1719998425248205';
Scenario('C100 Respondent - Respond to application- journey', async ({ I }) => {
  await I.loginAsCitizen();
  await I.respondentTaskList(caseId);
}).retry({ retries: 3, minTimeout: 30000 });

