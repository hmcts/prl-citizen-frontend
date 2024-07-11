/* eslint-disable no-await-in-loop */
const testConfig = require('../config');
const dataSetupManager = require('../exuiSupport/restApiData/DataSetupManager')

Feature('C100 Remove legal rep');

let caseId = null;
let accessCode = null;
Scenario('C100 Data setup @nightly', async ({ I }) => {
    const dataSetupObj = dataSetupManager.getDataSetupForScenario('test1');

    while (dataSetupObj.state === 'running') {
        await I.wait('2');
        console.log('waiting for datasetup to complete')
    }
    caseId = dataSetupObj.caseId;
    accessCode = await dataSetupObj.getRespondentAccessCode(caseId);


}).retry(testConfig.TestRetryScenarios);


Scenario('C100 Activate case as citizen @nightly', async ({ I }) => {

    await I.loginAsCitizen();
    await I.navigateToAcitivateAccessCodePage();
    await I.fillAndSubmitActivateAccessCode(caseId, accessCode);
    await I.confirmAccessCodeActivated();


}).retry(testConfig.TestRetryScenarios);