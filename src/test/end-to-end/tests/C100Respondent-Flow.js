const testConfig = require('../config');

const CaseDataSetup = require('../exuiSupport/restApiData/CaseDataSetupV2');
const dataSetupManager = require('../exuiSupport/restApiData/DataSetupManager')
const xuiCaseList = require('../exuiSupport/pages/CaseList');
const xuiCaseFlags = require('../exuiSupport/pages/CaseFlags')

Feature('C100 Respondent - flow @debug');

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



Scenario('C100 Respondent - Respond to application- journey', async ({ I }) => {
  await I.loginAsCitizen();
  await I.respondentTaskList(caseId);
}).retry({ retries: 3, minTimeout: 30000 });

Scenario('C100 Respondent - Validate support requests in EXUI', async ({ I }) => {
  await I.loginAsCourtAdminTSSolicitorApplication();
  await xuiCaseList.searchForCasesWithId(caseId);
  // await applicantEvents.verifyViewAllDocuments(['witness statements', 'position statements']);
  await xuiCaseFlags.validateCaseFlagsDisplayed('respondentfn fn respondentone ln', [
    { name: 'A different type of chair' },
    { name: 'Documents in a specified colour' }
  ]);

}).retry({ retries: 3, minTimeout: 30000 });

